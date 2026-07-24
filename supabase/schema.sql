create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  username text not null unique check (username ~ '^[a-z0-9_-]{3,28}$'),
  display_name text not null default '',
  bio text not null default '' check (char_length(bio) <= 180),
  avatar_url text not null default '',
  banner_url text not null default '',
  primary_color text not null default '#c8f451',
  background_color text not null default '#0b0f13',
  gradient boolean not null default true,
  blur smallint not null default 18 check (blur between 0 and 32),
  animations boolean not null default true,
  font text not null default 'Manrope',
  layout text not null default 'stacked',
  links jsonb not null default '{}'::jsonb,
  music_url text not null default '',
  autoplay boolean not null default false,
  volume numeric(3,2) not null default .35 check (volume between 0 and 1),
  badge text not null default '',
  status text not null default 'online' check (status in ('online', 'offline')),
  views bigint not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists profiles_user_id_idx on public.profiles(user_id);

alter table public.profiles enable row level security;
drop policy if exists "Public profiles are viewable" on public.profiles;
create policy "Public profiles are viewable" on public.profiles for select using (true);
drop policy if exists "Users can create own profile" on public.profiles;
create policy "Users can create own profile" on public.profiles for insert with check (auth.uid() = user_id);
drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "Users can delete own profile" on public.profiles;
create policy "Users can delete own profile" on public.profiles for delete using (auth.uid() = user_id);

create or replace function public.set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = timezone('utc', now()); return new; end; $$;
drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();

create or replace function public.increment_profile_views(profile_username text)
returns void language sql security definer set search_path = public
as $$ update public.profiles set views = views + 1 where username = profile_username; $$;
revoke all on function public.increment_profile_views(text) from public;
grant execute on function public.increment_profile_views(text) to anon, authenticated;
