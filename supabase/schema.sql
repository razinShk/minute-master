-- Minute shop schema. Clerk is the auth provider.
-- user_id / profiles.id stores the Clerk user id from auth.jwt()->>'sub'.
-- Activate Clerk's Supabase integration so session tokens include role=authenticated.

create table public.categories (
  id uuid primary key,
  category_name text not null unique,
  description text not null default '',
  image text
);

create table public.products (
  id uuid primary key,
  name text not null,
  image text,
  brand text,
  price numeric(10, 2) not null,
  category_name text not null references public.categories (category_name),
  description text not null default '',
  review_avg numeric(3, 1) not null default 0,
  review_count integer not null default 0,
  is_best_seller boolean not null default false
);

create index products_category_name_idx on public.products (category_name);

create table public.profiles (
  id text primary key,
  email text not null default '',
  first_name text not null default '',
  last_name text not null default '',
  created_at timestamptz not null default now()
);

create table public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id text not null default (auth.jwt() ->> 'sub') references public.profiles (id) on delete cascade,
  name text not null default '',
  street text not null default '',
  city text not null default '',
  state text not null default '',
  country text not null default '',
  zip_code text not null default '',
  mobile text not null default '',
  created_at timestamptz not null default now()
);

create index addresses_user_id_idx on public.addresses (user_id);

create table public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id text not null default (auth.jwt() ->> 'sub') references public.profiles (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete cascade,
  qty integer not null default 1 check (qty > 0),
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);

create index cart_items_user_id_idx on public.cart_items (user_id);

create table public.wishlist_items (
  id uuid primary key default gen_random_uuid(),
  user_id text not null default (auth.jwt() ->> 'sub') references public.profiles (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);

create index wishlist_items_user_id_idx on public.wishlist_items (user_id);

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.profiles enable row level security;
alter table public.addresses enable row level security;
alter table public.cart_items enable row level security;
alter table public.wishlist_items enable row level security;

create policy "Anyone can read categories"
  on public.categories
  for select
  to anon, authenticated
  using (true);

create policy "Anyone can read products"
  on public.products
  for select
  to anon, authenticated
  using (true);

create policy "Users read their profile"
  on public.profiles
  for select
  to authenticated
  using ((select auth.jwt() ->> 'sub') = id);

create policy "Users insert their profile"
  on public.profiles
  for insert
  to authenticated
  with check ((select auth.jwt() ->> 'sub') = id);

create policy "Users update their profile"
  on public.profiles
  for update
  to authenticated
  using ((select auth.jwt() ->> 'sub') = id)
  with check ((select auth.jwt() ->> 'sub') = id);

create policy "Users read their addresses"
  on public.addresses
  for select
  to authenticated
  using ((select auth.jwt() ->> 'sub') = user_id);

create policy "Users insert their addresses"
  on public.addresses
  for insert
  to authenticated
  with check ((select auth.jwt() ->> 'sub') = user_id);

create policy "Users update their addresses"
  on public.addresses
  for update
  to authenticated
  using ((select auth.jwt() ->> 'sub') = user_id)
  with check ((select auth.jwt() ->> 'sub') = user_id);

create policy "Users delete their addresses"
  on public.addresses
  for delete
  to authenticated
  using ((select auth.jwt() ->> 'sub') = user_id);

create policy "Users read their cart"
  on public.cart_items
  for select
  to authenticated
  using ((select auth.jwt() ->> 'sub') = user_id);

create policy "Users insert their cart"
  on public.cart_items
  for insert
  to authenticated
  with check ((select auth.jwt() ->> 'sub') = user_id);

create policy "Users update their cart"
  on public.cart_items
  for update
  to authenticated
  using ((select auth.jwt() ->> 'sub') = user_id)
  with check ((select auth.jwt() ->> 'sub') = user_id);

create policy "Users delete their cart"
  on public.cart_items
  for delete
  to authenticated
  using ((select auth.jwt() ->> 'sub') = user_id);

create policy "Users read their wishlist"
  on public.wishlist_items
  for select
  to authenticated
  using ((select auth.jwt() ->> 'sub') = user_id);

create policy "Users insert their wishlist"
  on public.wishlist_items
  for insert
  to authenticated
  with check ((select auth.jwt() ->> 'sub') = user_id);

create policy "Users delete their wishlist"
  on public.wishlist_items
  for delete
  to authenticated
  using ((select auth.jwt() ->> 'sub') = user_id);

grant select on public.categories, public.products to anon, authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select, insert, update, delete on public.addresses to authenticated;
grant select, insert, update, delete on public.cart_items to authenticated;
grant select, insert, delete on public.wishlist_items to authenticated;
