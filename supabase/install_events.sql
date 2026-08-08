-- install_events: every visit to /install, so QR codes and links can be
-- compared against each other.
--
-- NOT applied automatically - see the note in discover_cache.sql for why.
-- Run this against the same Supabase project fynd-pwa uses.
--
-- Deliberately anonymous. No IP, no user agent, no cookie, no device id - only
-- which campaign was scanned, roughly what kind of device saw it, and when.
-- That is enough to answer "which poster worked" and nothing more, which keeps
-- this outside the scope of the Privacy Policy's personal-data commitments.
-- Do not add identifying columns here without updating that policy first.

create table if not exists install_events (
  id          uuid primary key default gen_random_uuid(),
  -- Campaign tag from ?src= on the QR code, e.g. "movein-cafeteria".
  source      text not null,
  -- 'ios' | 'android' | 'desktop' | 'other' - derived server-side, coarse on
  -- purpose so it cannot be used to fingerprint anyone.
  platform    text,
  -- Which button was pressed: 'view' (page opened), 'pwa', 'appstore'.
  action      text not null default 'view',
  created_at  timestamptz not null default now()
);

create index if not exists install_events_source_idx
  on install_events (source, created_at desc);

alter table install_events enable row level security;

-- INSERT-only for anon, exactly like waitlist: visitors can record a scan but
-- cannot read the table, so campaign performance is not public.
drop policy if exists "anon can record install events" on install_events;
create policy "anon can record install events"
  on install_events for insert to anon with check (true);

-- Campaign totals. Query from the Supabase dashboard:
--   select * from install_stats;
create or replace view install_stats as
select
  source,
  count(*)                                            as total,
  count(*) filter (where action = 'view')             as page_views,
  count(*) filter (where action = 'pwa')              as pwa_installs,
  count(*) filter (where action = 'appstore')         as appstore_taps,
  count(*) filter (where platform = 'ios')            as ios,
  count(*) filter (where platform = 'android')        as android,
  count(*) filter (where platform = 'desktop')        as desktop,
  min(created_at)                                     as first_seen,
  max(created_at)                                     as last_seen
from install_events
group by source
order by total desc;
