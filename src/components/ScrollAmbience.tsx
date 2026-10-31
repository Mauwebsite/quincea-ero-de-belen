import {useEffect,useRef} from 'react';
import {Confetti} from './Confetti';
export function ScrollAmbience(){
 const layer=useRef<HTMLDivElement>(null);
 useEffect(()=>{let frame=0;const update=()=>{frame=0;layer.current?.style.setProperty('--scroll-drift',`${-(window.scrollY*.035%90)}px`);};const scroll=()=>{if(!frame)frame=requestAnimationFrame(update);};window.addEventListener('scroll',scroll,{passive:true});update();return()=>{window.removeEventListener('scroll',scroll);cancelAnimationFrame(frame);};},[]);
 return <div ref={layer} className="scroll-ambience" aria-hidden="true"><Confetti ambient/></div>;
}
