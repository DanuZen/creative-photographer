-- Create profiles table
create table public.profiles (
  id uuid references auth.users not null primary key,
  name text not null,
  tagline text,
  email text,
  phone text,
  portrait_image_src text,
  portrait_image_alt text,
  biography_philosophy text,
  biography_background text,
  biography_experience text,
  biography_current_focus text
);

-- Create clients table
create table public.clients (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  category text not null,
  client_list text[] not null, -- Array of client names
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create series table
create table public.series (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  title text not null,
  description text,
  featured boolean default false,
  cover_image_src text,
  cover_image_alt text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create images table
create table public.images (
  id uuid default gen_random_uuid() primary key,
  series_id uuid references public.series(id) on delete cascade not null,
  src text not null,
  alt text,
  width integer,
  height integer,
  title text,
  year text,
  medium text,
  dimensions text,
  project_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.clients enable row level security;
alter table public.series enable row level security;
alter table public.images enable row level security;

-- Create policies (allow public read access)
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Public clients are viewable by everyone." on public.clients for select using (true);
create policy "Public series are viewable by everyone." on public.series for select using (true);
create policy "Public images are viewable by everyone." on public.images for select using (true);
