import {Soundtrack} from './components/Soundtrack';
import {Icon} from './components/Icon';
import {ScrollAmbience} from './components/ScrollAmbience';
import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { QRCodeSVG } from 'qrcode.react';
import { Envelope } from './components/Envelope';
import { Music } from './components/Music';
import { Trivia } from './components/Trivia';
import { InvitationClosing } from './components/InvitationClosing';
import { eventConfig as c, googleMapsUrl, whatsappRSVPUrl } from './data/eventConfig';
import { remaining, safeHttps } from './lib';
import './styles.css';
function Countdown() {
  const [time, setTime] = useState(() => remaining(c.dateISO));
  useEffect(() => {const timer = setInterval(() => setTime(remaining(c.dateISO)), 1000); return () => clearInterval(timer);}, []);
  return time.ended ? <p className="celebration">¡Llegó la noche de celebrar!</p> : <div className="countdown" aria-label="Tiempo restante para la celebración">{time.values.map((v, i) => <div key={i}><strong>{String(v).padStart(2, '0')}</strong><span>{['días', 'horas', 'minutos', 'segundos'][i]}</span></div>)}</div>;
}
function App() {
  const [open, setOpen] = useState(false);
  useEffect(() => {document.documentElement.dataset.motion='on';},[]);
  const hero = useRef<HTMLHeadingElement>(null);
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const album = safeHttps(c.photoAlbumUrl);
  useEffect(() => {document.body.style.overflow = open ? '' : 'hidden'; if (open) {window.scrollTo(0, 0); hero.current?.focus();} return () => {document.body.style.overflow = '';};}, [open]);
  useEffect(() => {
    if (!open) return;
    const observer = new IntersectionObserver(entries => entries.forEach(e => {if (e.isIntersecting) {e.target.classList.add('visible'); observer.unobserve(e.target);}}), {threshold: .08});
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el)); return () => observer.disconnect();
  }, [open]);
  return <>{c.backgroundAudioUrl && <audio ref={audio} src={c.backgroundAudioUrl} loop preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}/>}
    {!open && <Envelope onOpen={() => setOpen(true)} onStart={() => {audio.current?.play().catch(() => {});}}/>}{open && <>
    <a className="skip" href="#fecha">Saltar a los detalles</a>
    <header className="topbar"><a href="#inicio" className="wordmark">B<span>·</span>XV</a><span>28 NOV · 2026</span><a href="#confirmar">CONFIRMAR <span aria-hidden="true"><Icon/></span></a></header>
    <ScrollAmbience/><main>
      <section id="inicio" className="hero"><div className="hero-art"/><div className="hero-content"><span className="eyebrow">UNA NOCHE PARA BRILLAR</span><h1 tabIndex={-1} ref={hero}><img src="assets/logo-belen-final.webp" alt="Mis XV años · Belén" fetchPriority="high"/></h1><p className="opening-message">{c.openingMessage}</p><a className="hero-scroll" href="#fecha"><span>DESCUBRE LA INVITACIÓN</span><span aria-hidden="true"><Icon name="down"/></span></a></div><span className="hero-side">DISCO · GLAM · MAGIC</span></section>
      <Soundtrack/><section id="fecha" className="section date-section reveal"><span className="eyebrow">RESERVA ESTA NOCHE</span><h2>Noviembre <em>2026</em></h2><div className="date-line"><span>SÁBADO</span><strong>28</strong><span>{c.timeDisplay}<small>LIMA, PERÚ</small></span></div><p className="sr-only">{c.dateDisplay}</p><span className="eyebrow countdown-label">CADA VEZ FALTA MENOS</span><Countdown/><a className="text-button" href="belen-xv.ics" download>AGREGAR A MI CALENDARIO <Icon/></a></section>
      <section className="section dress reveal"><span className="eyebrow">PREPÁRATE PARA BRILLAR</span><h2>Dress <em>code</em></h2><p className="dress-style">Sport Elegante</p><div className="dress-icons"><figure><img src="assets/icono_mujer.png" alt="Atuendo sport elegante para mujer" loading="lazy"/><figcaption>{c.dressCode.womenLabel}</figcaption></figure><span className="vertical-line"/><figure><img src="assets/icono_hombre.png" alt="Atuendo sport elegante para hombre" loading="lazy"/><figcaption>{c.dressCode.menLabel}</figcaption></figure></div><div className="dress-warning"><span className="swatches" aria-hidden="true"><i/><i/><i/></span><p>{c.dressCode.warning}</p></div></section>
      <section id="confirmar" className="section rsvp reveal"><span className="eyebrow">TU PRESENCIA HACE QUE SEA ESPECIAL</span><h2>¿Nos vemos<br/><em>en la pista?</em></h2><p>Me encantará compartir esta noche contigo.</p><a className="button primary" href={whatsappRSVPUrl} target="_blank" rel="noopener noreferrer">CONFIRMAR AQUÍ <Icon/></a></section>
      <Music/><Trivia/>
      <section id="ubicacion" className="section venue reveal"><span className="eyebrow">EL PUNTO DE ENCUENTRO</span><div className="location-mark" aria-hidden="true"><svg viewBox="0 0 48 58"><path d="M24 55S5 34 5 23a19 19 0 1 1 38 0c0 11-19 32-19 32Z"/><circle cx="24" cy="23" r="6"/></svg></div><h2>{c.venueName}</h2><p>{c.venueAddress}</p><a className="button" href={googleMapsUrl} target="_blank" rel="noopener noreferrer">VER UBICACIÓN <Icon/></a></section>
      <section className="section photos reveal"><span className="eyebrow">LOS RECUERDOS SE COMPARTEN</span><h2>¡Comparte<br/><em>tus fotos!</em></h2><p>{c.photoShareMessage}</p>{album ? <><div className="qr"><QRCodeSVG value={album} size={190} marginSize={3}/></div><a className="button primary" href={album} target="_blank" rel="noopener noreferrer">SUBIR FOTOS <Icon/></a></> : <div className="photo-pending panel"><svg width="42" height="42" viewBox="0 0 48 48" aria-hidden="true"><path d="M6 15h9l4-6h10l4 6h9v25H6Z"/><circle cx="24" cy="27" r="8"/></svg><p>Aquí aparecerá el QR<br/>para compartir fotografías</p><button className="button" disabled>ENLACE PRÓXIMAMENTE</button></div>}</section>
      <InvitationClosing/><button className="text-button replay-envelope" onClick={() => setOpen(false)}>VOLVER AL SOBRE</button>
    </main>
    {c.backgroundAudioUrl && <AudioToggle audio={audio} playing={playing}/>}
  </>}</>;
}
function AudioToggle({audio, playing}: {audio: React.RefObject<HTMLAudioElement | null>; playing: boolean}) {const [error, setError] = useState(''); return <div className="audio-control"><button className="button" aria-pressed={playing} onClick={async () => {if (playing) audio.current?.pause(); else {try {await audio.current?.play(); setError('');} catch {setError('Audio no disponible');}}}}>{playing ? 'PAUSAR MÚSICA' : 'ACTIVAR MÚSICA'}</button><span role="status">{error}</span></div>;}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);






