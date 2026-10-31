import {Icon} from './Icon';
import {Confetti} from './Confetti';
import {useEffect,useRef,useState} from 'react';
import {eventConfig as c} from '../data/eventConfig';
export function Finale(){
 const video=useRef<HTMLVideoElement>(null),stage=useRef<HTMLDivElement>(null);
 const [loaded,setLoaded]=useState(false),[playing,setPlaying]=useState(false),[reduced,setReduced]=useState(false);
 useEffect(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)');const change=()=>{setReduced(document.documentElement.dataset.motion==='off');if(document.documentElement.dataset.motion==='off')video.current?.pause();};change();media.addEventListener('change',change);window.addEventListener('invitation-motion',change);const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){setLoaded(true);if(document.documentElement.dataset.motion!=='off')video.current?.play().catch(()=>{});}else video.current?.pause();}),{rootMargin:'100px'});if(stage.current)observer.observe(stage.current);return()=>{observer.disconnect();media.removeEventListener('change',change);window.removeEventListener('invitation-motion',change);};},[]);
 return <section className="finale section visible"><span className="eyebrow">LO MEJOR ES COMPARTIRLO CONTIGO</span><blockquote className="closing-message">{c.closingMessage}</blockquote><div ref={stage} className={`flow-stage ${playing?'is-playing':''}`}><img src={c.visuals.finalePoster} alt="Figura anónima de espaldas con vestido amplio lavanda, lejana bajo una lluvia de estrellas y un aro de luz" loading="lazy"/><video ref={video} src={loaded?(document.createElement('video').canPlayType('video/webm') ? c.visuals.finaleVideo.replace('.mp4','.webm') : c.visuals.finaleVideo):undefined} poster={c.visuals.finalePoster} muted playsInline loop autoPlay={!reduced} preload="none" onPlaying={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onError={()=>setPlaying(false)} aria-label="Cierre cinematográfico con lluvia de estrellas"/><Confetti/>{!playing&&!reduced&&<div className="star-rain" aria-hidden="true">{Array.from({length:24},(_,i)=><i key={i} style={{left:`${16+i*37%68}%`,animationDelay:`${-i*.37}s`}}/>)}</div>}</div></section>;
}





