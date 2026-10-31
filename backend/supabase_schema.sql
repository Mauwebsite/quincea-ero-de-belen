-- OPCIONAL: usar únicamente cuando el propietario conecte su Supabase.
-- Tabla para RECOMENDACIONES de canciones. No almacena información sensible innecesaria.
-- IMPORTANTE: si no se conecta, utilizar fallback WhatsApp; nunca falsear guardado.
create table if not exists public.song_suggestions (
  id uuid primary key default gen_random_uuid(),
  song_title text,
  artist text,
  music_url text,
  created_at timestamptz not null default now(),
  constraint has_song_content check (
    nullif(trim(coalesce(song_title, '')), '') is not null
    or nullif(trim(coalesce(music_url, '')), '') is not null
  ),
  constraint title_max_length check (length(coalesce(song_title, '')) <= 160),
  constraint artist_max_length check (length(coalesce(artist, '')) <= 120),
  constraint url_max_length check (length(coalesce(music_url, '')) <= 500)
);
alter table public.song_suggestions enable row level security;
-- Anónimos solo pueden agregar, no leer lo recomendado por otros.
-- Nota: políticas de seguridad, rate limits/CAPTCHA y moderación se deben revisar antes de producción.
drop policy if exists "Allow anonymous insert of song suggestions" on public.song_suggestions;
create policy "Allow anonymous insert of song suggestions"
  on public.song_suggestions
  for insert to anon
  with check (true);
-- No policy SELECT/UPDATE/DELETE para anon. El propietario gestiona las sugerencias desde la consola Supabase.
