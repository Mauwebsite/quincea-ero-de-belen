import {Icon} from './Icon';
import { useState, type FormEvent } from 'react';
import { eventConfig as c } from '../data/eventConfig';
import { musicLink, safeHttps } from '../lib';
export function Music() {
  const [title, setTitle] = useState(''), [artist, setArtist] = useState(''), [url, setUrl] = useState(''), [status, setStatus] = useState(''), [busy, setBusy] = useState(false), [sent, setSent] = useState(false), [preview, setPreview] = useState(false);
  const link = musicLink(url);
  const configured = Boolean(c.musicSuggestions.useSupabaseWhenConfigured && import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
  const message = `Hola, recomiendo para los XV años de Belén: ${title.trim()}${artist.trim() ? ' — ' + artist.trim() : ''}${link ? '\n' + link.url : ''}`;
  async function submit(e: FormEvent) {
    e.preventDefault();
    if (busy || sent) return;
    if (!title.trim() && !link) {setStatus('Escribe una canción o agrega un enlace musical válido.'); return;}
    if (url.trim() && !link) {setStatus('Usa un enlace HTTPS de una canción de YouTube o de Spotify.'); return;}
    if (!configured) {setSent(true); setStatus('Tu recomendación está lista. Abre WhatsApp y envía el mensaje para compartirla.'); return;}
    setBusy(true); setStatus('Enviando recomendación…');
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL.replace(/\/$/, '')}/rest/v1/song_suggestions`, {method: 'POST', headers: {'Content-Type': 'application/json', apikey: import.meta.env.VITE_SUPABASE_ANON_KEY, Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`, Prefer: 'return=minimal'}, body: JSON.stringify({song_title: title.trim() || null, artist: artist.trim() || null, music_url: link?.url || null}), signal: AbortSignal.timeout(15000)});
      if (!response.ok) throw new Error();
      setSent(true); setStatus('¡Gracias! Tu recomendación se guardó correctamente.');
    } catch {setStatus('No pudimos guardarla. Intenta de nuevo o envíala por WhatsApp.');} finally {setBusy(false);}
  }
  const spotifyUrl = safeHttps(c.spotifyCollaborativeUrl);
  let officialSpotify = false;
  if (spotifyUrl) officialSpotify = ['open.spotify.com', 'spotify.link'].includes(new URL(spotifyUrl).hostname);
  if (officialSpotify) return <section id="musica" className="section reveal"><img className="section-icon" src="assets/icono_musica.webp" alt="" loading="lazy"/><span className="eyebrow">LA BANDA SONORA DE LA NOCHE</span><h2><em>Playlist</em></h2><p>¿Qué canción no puede faltar?<br/>Agrégala a nuestra playlist colaborativa.</p><a className="button primary" href={spotifyUrl} target="_blank" rel="noopener noreferrer">AGREGAR CANCIÓN EN SPOTIFY <Icon/></a><p className="spotify-note">Se abrirá Spotify para aceptar la invitación y agregar tus canciones.</p></section>;
  return <section id="musica" className="section reveal"><img className="section-icon" src="assets/icono_musica.webp" alt="" loading="lazy"/><span className="eyebrow">LA BANDA SONORA DE LA NOCHE</span><h2><em>Playlist</em></h2><p>¿Qué canción no puede faltar?<br/>Ayúdame a encender la pista.</p>
    <form className="panel music-form" onSubmit={submit}>
      <label>Canción<input maxLength={160} value={title} onChange={e => {setTitle(e.target.value); setSent(false);}} placeholder="Esa que te hace bailar"/></label>
      <label>Artista <span className="optional">opcional</span><input maxLength={120} value={artist} onChange={e => {setArtist(e.target.value); setSent(false);}} placeholder="Nombre del artista"/></label>
      <label>Enlace de YouTube o Spotify <span className="optional">opcional</span><input type="url" maxLength={500} value={url} onChange={e => {setUrl(e.target.value); setSent(false); setPreview(false);}} placeholder="https://…"/></label>
      {link && <div className="music-preview">{preview ? <><iframe title="Reproductor oficial de la recomendación" src={link.embed} allow="encrypted-media; fullscreen; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin"/><button type="button" className="text-button" onClick={() => setPreview(false)}>CERRAR REPRODUCTOR</button></> : <button type="button" className="button" onClick={() => setPreview(true)}><Icon name="play"/> ABRIR REPRODUCTOR OFICIAL</button>}<small>La disponibilidad depende de la plataforma.</small></div>}
      <button className="button primary" disabled={busy || sent}>{busy ? 'ENVIANDO…' : sent ? 'RECOMENDACIÓN PREPARADA' : configured ? <>RECOMENDAR <Icon/></> : <>PREPARAR RECOMENDACIÓN <Icon/></>}</button>
      {!configured && <small>La recomendación se envía por WhatsApp.</small>}
      <p className="form-status" role="status">{status}</p>
      {((sent && !configured) || status.startsWith('No pudimos')) && <a className="button" href={`https://wa.me/${c.whatsappNumber}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer">ENVIAR POR WHATSAPP <Icon/></a>}
      {sent && <button type="button" className="text-button" onClick={() => {setTitle(''); setArtist(''); setUrl(''); setSent(false); setStatus(''); setPreview(false);}}>OTRA RECOMENDACIÓN</button>}
    </form>
  </section>;
}
