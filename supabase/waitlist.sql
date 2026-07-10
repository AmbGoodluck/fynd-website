-- waitlist: email signups from the homepage's "Join the waitlist" section
-- (get notified when the native iOS/Android app launches).
--
-- NOT applied automatically — see the note in discover_cache.sql for why.
-- Run this against the same Supabase project fynd-pwa uses.
--
-- Unlike discover_places, this table holds PII (an email address). RLS is
-- INSERT-only for anon: no public "select" policy is created, so the table
-- is not readable via the anon key at all — only visible via the Supabase
-- dashboard / a service-role key. Do not add a public read policy here.

create table if not exists waitlist (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  source     text,             -- e.g. "homepage" — where the signup came from
  created_at timestamptz not null default now()
);

alter table waitlist enable row level security;

-- Anyone can add themselves. No select/update/delete policy exists for
-- anon/authenticated — RLS denies those by default, keeping the list private.
create policy "public insert" on waitlist for insert with check (true);
