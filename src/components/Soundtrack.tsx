import {useEffect,useRef,useState} from 'react';
import {eventConfig as c} from '../data/eventConfig';
import {Icon} from './Icon';
type Player={playVideo:()=>void;destroy:()=>void};
type Youtube={Player:new(el:HTMLElement,config:Record<string,unknown>)=>Player};
let api:Promise<Youtube>|undefined;
function loadApi(){return api??=new Promise<Youtube>((resolve,reject)=>{const w=window as unknown as {YT?:Youtube;onYouTubeIframeAPIReady?:()=>void};if(w.YT?.Player){resolve(w.YT);return;}w.onYouTubeIframeAPIReady=()=>{if(w.YT)resolve(w.YT);};const script=document.createElement('script');script.src='https://www.youtube.com/iframe_api';script.onerror=reject;document.head.append(script);});}
function OfficialPlayer(){
 const host=useRef<HTMLDivElement>(null);const [unavailable,setUnavailable]=useState(false),[blocked,setBlocked]=useState(false);
 useEffect(()=>{let disposed=false;let player:Player|undefined;loadApi().then(yt=>{if(disposed||!host.current)return;const node=document.createElement('div');host.current.append(node);player=new yt.Player(node,{width:'100%',height:203,videoId:c.backgroundYouTubeId,playerVars:{autoplay:1,playsinline:1,loop:1,playlist:c.backgroundYouTubeId,rel:0,origin:location.origin},events:{onReady:()=>{if(!disposed)player?.playVideo();},onError:()=>{if(!disposed)setUnavailable(true);},onAutoplayBlocked:()=>{if(!disposed)setBlocked(true);}}});}).catch(()=>{if(!disposed)setUnavailable(true);});return()=>{disposed=true;player?.destroy();};},[]);
 return <section className="soundtrack section" aria-label="Música de la invitación"><span className="eyebrow">LA MÚSICA DE ESTA NOCHE</span><div ref={host} className="soundtrack-player" hidden={unavailable}/><p role="status">{unavailable?'Esta pista no está disponible en el reproductor. Puedes probar el enlace original.':blocked?'Toca reproducir para activar la música.':'Si la música no comienza, toca reproducir.'}</p><a className="text-button" href={`https://music.youtube.com/watch?v=${c.backgroundYouTubeId}`} target="_blank" rel="noopener noreferrer">ESCUCHAR EN YOUTUBE MUSIC <Icon/></a></section>;
}

export function Soundtrack(){
 const [expanded,setExpanded]=useState(false),[mounted,setMounted]=useState(false);
 return <aside className="music-dock" aria-label="Música de la invitación">{mounted&&<div className={`music-popover ${expanded?'':'is-minimized'}`} id="invitation-music-panel" inert={!expanded}><button className="music-close" onClick={()=>setExpanded(false)} aria-label="Minimizar reproductor">Minimizar</button><OfficialPlayer/></div>}<button className="music-disc" aria-label={expanded?'Minimizar música':'Abrir música'} aria-expanded={expanded} aria-controls="invitation-music-panel" onClick={()=>{setMounted(true);setExpanded(!expanded);}}><span className="record-grooves" aria-hidden="true"><span className="record-label"><Icon name="play"/></span></span></button></aside>;
}
