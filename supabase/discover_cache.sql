-- discover_places: public, non-user cache of curated place previews shown on
-- the fynd-website homepage's interactive discovery hero. Same trust level as
-- the public HERE/Google Places responses it's built from - not user data.
--
-- NOT applied automatically. Run this against the same Supabase project
-- fynd-pwa uses (Supabase dashboard → SQL editor, or `supabase db push` from
-- a machine with the project linked) before the /api/discover endpoint's
-- cache reads/writes will do anything beyond "always re-fetch."

create table if not exists discover_places (
  -- "here_<HERE id>" - MUST match this format. It's the app's canonical place ID
  -- scheme, and fetchPlaceById() (fynd-pwa/src/services/freePlacesService.ts:505-506)
  -- only resolves cold-open deep links (Fynd not already running) whose ID starts
  -- with "here_" - a raw Google place_id here would 404 the "Open in Fynd" link.
  place_id          text primary key,
  google_place_id   text,                     -- reference only, for re-fetching a photo on cache refresh - never used for deep links
  cache_key         text not null,            -- "city:<lowercased name>" or "geo:<lat>,<lng>" (~1.1km buckets)
  name              text not null,
  category_bucket   text not null,            -- 'food' | 'hidden_gem' | 'culture' | 'outdoors' | 'wellness' | 'nightlife' | 'other'
  lat               double precision not null,
  lng               double precision not null,
  address            text,
  rating            numeric,
  open_now          boolean,
  photo_url         text,                     -- always a real Google Places photo URL, never a stock/placeholder image
  ai_description    text,
  source_types      text[],
  last_refreshed_at timestamptz not null default now(),
  created_at        timestamptz not null default now()
);

create index if not exists idx_discover_places_cache_key
  on discover_places (cache_key, last_refreshed_at desc);

alter table discover_places enable row level security;

-- Public read/write: this table holds no user data, only a shared cache of
-- publicly-sourced place info, so unlike every other table in this project
-- it does not need auth-scoped policies or a service-role key from the
-- calling Cloudflare Function.
create policy "public read"   on discover_places for select using (true);
create policy "public write"  on discover_places for insert with check (true);
create policy "public update" on discover_places for update using (true);
