create table if not exists portfolio_items (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  client_name text,
  industry text,
  service_tier text,
  description text,
  challenge text,
  solution text,
  results jsonb, -- Array of { "value": "50%", "label": "Increase in sales" }
  testimonial jsonb, -- { "quote": "...", "author": "...", "role": "..." }
  hero_image text,
  gallery_images text[],
  tech_stack text[], -- ["Next.js", "Supabase", "Stripe"]
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS
alter table portfolio_items enable row level security;

create policy "Public read access"
  on portfolio_items for select
  using (published = true);

create policy "Admin full access"
  on portfolio_items for all
  using (auth.role() = 'service_role' or auth.email() = 'admin@blacklight.co.za'); -- simplistic admin check for now

-- Trigger for updated_at
create trigger handle_updated_at before update on portfolio_items
  for each row execute procedure moddatetime (updated_at);
