import {Icon} from './Icon';
import { useEffect, useRef, useState } from 'react';
import {eventConfig as c} from '../data/eventConfig';
export function Envelope({onOpen,onStart}:{onOpen:()=>void;onStart?:()=>void}) {
 const [opening,setOpening]=useState(false),[playing,setPlaying]=useState(false);
 const video=useRef<HTMLVideoElement>(null),timer=useRef<number|undefined>(undefined),done=useRef(false);
 useEffect(()=>()=>window.clearTimeout(timer.current),[]);
 function finish(){if(done.current)return;done.current=true;onOpen();}
 // onStart se llama antes de cualquier await para conservar el gesto del usuario (requisito de iOS para audio).
 async function open(){if(opening)return;setOpening(true);onStart?.();if((document.documentElement.dataset.motion==='off')){finish();return;}timer.current=window.setTimeout(finish,5200);if(video.current){video.current.playbackRate=2.5;try{await video.current.play();}catch{window.clearTimeout(timer.current);timer.current=window.setTimeout(finish,1100);}}else finish();}
 return <div className={`intro flow-intro ${opening?'opening-flow':''}`}><span className="eyebrow intro-label">UNA INVITACIÓN PARA TI</span><p className="intro-title">La magia empieza<br/><em>al abrir.</em></p><button className={`flow-envelope ${playing?'is-playing':''}`} onClick={open} aria-label="Abrir invitación de Belén" disabled={opening}><img src={c.visuals.envelopePoster} alt="Sobre ciruela con destellos plateados y sello de bola disco" fetchPriority="high"/><video ref={video} src={document.createElement('video').canPlayType('video/webm') ? c.visuals.envelopeVideo.replace('.mp4','.webm') : c.visuals.envelopeVideo} poster={c.visuals.envelopePoster} muted playsInline preload="auto" onPlaying={()=>setPlaying(true)} onEnded={finish} onError={()=>{if(opening)finish();}} aria-hidden="true"/></button><p className="intro-caption">Una noche especial está por comenzar</p><button className="button primary" onClick={open} disabled={opening}>{opening?'LA NOCHE TE ESPERA…':'ABRIR INVITACIÓN'}<span aria-hidden="true"><Icon/></span></button><span className="intro-date">BELÉN · 28 NOVIEMBRE 2026</span></div>;
}



