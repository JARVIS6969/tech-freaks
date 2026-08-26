-- ─────────────────────────────────────────────────────────────
-- HeritageLens — Supabase PostgreSQL Schema
-- Run this in the Supabase SQL Editor (Project → SQL Editor → New query)
-- Safe to re-run: uses IF NOT EXISTS / DROP ... IF EXISTS guards.
-- ─────────────────────────────────────────────────────────────

-- Extensions
create extension if not exists "uuid-ossp";

-- ─────────────────────────────────────────────
-- 1. heritage_sites
-- ─────────────────────────────────────────────
create table if not exists heritage_sites (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text not null,
  short_description text not null,
  state text not null,
  city text not null,
  latitude double precision not null,
  longitude double precision not null,
  historical_period text not null check (historical_period in ('Ancient','Medieval','Colonial','Modern')),
  construction_date text not null,
  heritage_type text not null check (heritage_type in ('Temple','Fort','Cave','Stupa','Palace','Stepwell')),
  cultural_significance text not null,
  architectural_details text not null,
  historical_facts text[] not null default '{}',
  main_image text not null,
  gallery_images text[] not null default '{}',
  model_3d_url text,
  ar_model_url text,
  vr_tour_url text,
  drone_view_url text,
  historical_reconstruction_url text,
  audio_url text,
  is_unesco boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_heritage_sites_state on heritage_sites (state);
create index if not exists idx_heritage_sites_period on heritage_sites (historical_period);
create index if not exists idx_heritage_sites_type on heritage_sites (heritage_type);

-- ─────────────────────────────────────────────
-- 2. heritage_objects (sub-elements: pillars, shrines, entrances...)
-- ─────────────────────────────────────────────
create table if not exists heritage_objects (
  id uuid primary key default uuid_generate_v4(),
  heritage_site_id uuid not null references heritage_sites(id) on delete cascade,
  name text not null,
  description text not null,
  historical_significance text not null,
  image_url text,
  model_3d_url text,
  ar_model_url text,
  created_at timestamptz not null default now()
);

create index if not exists idx_heritage_objects_site on heritage_objects (heritage_site_id);

-- ─────────────────────────────────────────────
-- 3. users (app profile table; Supabase Auth owns auth.users)
-- ─────────────────────────────────────────────
create table if not exists users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null unique,
  avatar_url text,
  created_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────
-- 4. favorites
-- ─────────────────────────────────────────────
create table if not exists favorites (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  heritage_site_id uuid not null references heritage_sites(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, heritage_site_id)
);

create index if not exists idx_favorites_user on favorites (user_id);

-- ─────────────────────────────────────────────
-- 5. user_explorations
-- ─────────────────────────────────────────────
create table if not exists user_explorations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  heritage_site_id uuid not null references heritage_sites(id) on delete cascade,
  experience_type text not null check (experience_type in ('AR','VR','3D','Drone','Article')),
  explored_at timestamptz not null default now()
);

create index if not exists idx_explorations_user on user_explorations (user_id);
create index if not exists idx_explorations_site on user_explorations (heritage_site_id);

-- ─────────────────────────────────────────────
-- 6. ai_questions
-- ─────────────────────────────────────────────
create table if not exists ai_questions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete set null,
  heritage_site_id uuid not null references heritage_sites(id) on delete cascade,
  question text not null,
  answer text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_ai_questions_site on ai_questions (heritage_site_id);

-- ─────────────────────────────────────────────
-- 7. feedback_reports (used by the /report page's ReportForm)
-- ─────────────────────────────────────────────
create table if not exists feedback_reports (
  id uuid primary key default uuid_generate_v4(),
  issue_type text not null,
  heritage_site_id uuid references heritage_sites(id) on delete set null,
  email text not null,
  details text not null,
  created_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────
-- Row Level Security
-- ─────────────────────────────────────────────

-- Public read-only content: readable by anyone, writable only via service role.
alter table heritage_sites enable row level security;
alter table heritage_objects enable row level security;

drop policy if exists "Public read heritage_sites" on heritage_sites;
create policy "Public read heritage_sites" on heritage_sites
  for select using (true);

drop policy if exists "Public read heritage_objects" on heritage_objects;
create policy "Public read heritage_objects" on heritage_objects
  for select using (true);

-- User-owned data: users can only read/write their own rows.
alter table users enable row level security;
alter table favorites enable row level security;
alter table user_explorations enable row level security;
alter table ai_questions enable row level security;
alter table feedback_reports enable row level security;

drop policy if exists "Users read own profile" on users;
create policy "Users read own profile" on users
  for select using (auth.uid() = id);

drop policy if exists "Users update own profile" on users;
create policy "Users update own profile" on users
  for update using (auth.uid() = id);

drop policy if exists "Users manage own favorites" on favorites;
create policy "Users manage own favorites" on favorites
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users manage own explorations" on user_explorations;
create policy "Users manage own explorations" on user_explorations
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users read own ai_questions" on ai_questions;
create policy "Users read own ai_questions" on ai_questions
  for select using (auth.uid() = user_id or user_id is null);

drop policy if exists "Anyone can insert ai_questions" on ai_questions;
create policy "Anyone can insert ai_questions" on ai_questions
  for insert with check (true);

drop policy if exists "Anyone can submit feedback" on feedback_reports;
create policy "Anyone can submit feedback" on feedback_reports
  for insert with check (true);

-- ─────────────────────────────────────────────
-- Storage buckets (run once — Supabase Storage → or via SQL below)
-- ─────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values
  ('heritage-images', 'heritage-images', true),
  ('heritage-3d-models', 'heritage-3d-models', true),
  ('heritage-audio', 'heritage-audio', true),
  ('heritage-360', 'heritage-360', true),
  ('heritage-reconstructions', 'heritage-reconstructions', true)
on conflict (id) do nothing;
