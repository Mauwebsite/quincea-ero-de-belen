import {Icon} from './Icon';
import {useEffect,useRef,useState} from 'react';
import {Finale} from './Finale';
export function InvitationClosing(){
  const [finished,setFinished]=useState(false);
  const closing=useRef<HTMLDivElement>(null);
  useEffect(()=>{if(finished){closing.current?.focus({preventScroll:true});closing.current?.scrollIntoView({behavior:document.documentElement.dataset.motion==='on'?'smooth':'instant',block:'start'});}},[finished]);
  return finished ? <div ref={closing} tabIndex={-1} className="closing-result" aria-label="Cierre de la invitación"><Finale/></div> : <section className="section closing-prompt"><span className="eyebrow">UN ÚLTIMO MOMENTO PARA TI</span><h2>La magia <em>continúa</em></h2><button className="button primary" onClick={()=>setFinished(true)}>FINALIZAR AQUÍ <Icon/></button></section>;
}
