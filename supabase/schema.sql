-- Run this once in your Supabase project's SQL Editor.
-- It creates the two tables the new pages rely on:
--   - public.enrollments  (course registrations, used by /courses/[slug]/enroll and /dashboard)
--   - public.messages     (contact form submissions, used by /contact)

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  course_id text not null,
  created_at timestamptz default now() not null,
  unique (user_id, course_id)
);

alter table public.enrollments enable row level security;

create policy "Users can view their own enrollments"
  on public.enrollments for select
  using (auth.uid() = user_id);

create policy "Users can create their own enrollments"
  on public.enrollments for insert
  with check (auth.uid() = user_id);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now() not null
);

alter table public.messages enable row level security;

create policy "Anyone can submit a contact message"
  on public.messages for insert
  with check (true);
