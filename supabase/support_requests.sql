-- support_requests: messages submitted from the /support page's contact /
-- feedback form (bug reports, feature requests, account help, general
-- feedback). Surfaced to App Store / Play Store reviewers as the site's
-- support contact method.
--
-- NOT applied automatically - see the note in discover_cache.sql for why.
-- Run this against the same Supabase project fynd-pwa uses.
--
-- Holds PII (email, and whatever the visitor writes in the message), so -
-- same as waitlist - RLS is INSERT-only for anon: no public "select" policy
-- is created, so the table is not readable via the anon key at all, only
-- via the Supabase dashboard / a service-role key. Do not add a public read
-- policy here.

create table if not exists support_requests (
  id         uuid primary key default gen_random_uuid(),
  name       text,
  email      text not null,
  category   text not null,   -- 'bug' | 'feature' | 'account' | 'report' | 'other'
  message    text not null,
  source     text,            -- e.g. "support-page" - where the request came from
  created_at timestamptz not null default now()
);

create index if not exists support_requests_created_at_idx
  on support_requests (created_at desc);

alter table support_requests enable row level security;

-- Anyone can submit a request. No select/update/delete policy exists for
-- anon/authenticated - RLS denies those by default, keeping submissions
-- private to the dashboard / service role.
create policy "public insert" on support_requests for insert with check (true);
