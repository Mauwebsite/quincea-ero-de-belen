export function remaining(date: string, now = Date.now()) {
  const seconds = Math.max(0, Math.floor((new Date(date).getTime() - now) / 1000));
  return { ended: seconds === 0, values: [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60] };
}
export function musicLink(raw: string): {url: string; embed: string} | null {
  try {
    const u = new URL(raw.trim());
    if (u.protocol !== 'https:' || u.username || u.password || u.port) return null;
    if (['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be'].includes(u.hostname)) {
      const id = u.hostname === 'youtu.be' ? u.pathname.slice(1) : u.pathname === '/watch' ? u.searchParams.get('v') : /^\/(shorts|embed)\//.test(u.pathname) ? u.pathname.split('/')[2] : null;
      if (!id || !/^[A-Za-z0-9_-]{11}$/.test(id)) return null;
      return {url: `https://www.youtube.com/watch?v=${id}`, embed: `https://www.youtube-nocookie.com/embed/${id}`};
    }
    if (u.hostname === 'open.spotify.com') {
      const m = u.pathname.match(/^\/(?:intl-[a-z]{2}\/)?(track|album|playlist)\/([A-Za-z0-9]{22})\/?$/);
      if (m) return {url: `https://open.spotify.com/${m[1]}/${m[2]}`, embed: `https://open.spotify.com/embed/${m[1]}/${m[2]}`};
    }
    return null;
  } catch { return null; }
}
export function safeHttps(raw: string) { try { const u = new URL(raw); return u.protocol === 'https:' && !u.username && !u.password ? u.href : ''; } catch { return ''; } }

