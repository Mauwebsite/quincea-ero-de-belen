import type {CSSProperties} from 'react';
/** Capas decorativas limitadas: sin timers ni nuevos nodos durante la animación. */
export function Confetti({ambient=false}:{ambient?:boolean}) {
  return <div className={`pointer-events-none absolute inset-0 overflow-hidden ${ambient?'ambient-sparkles':'confetti'}`} aria-hidden="true">
    {Array.from({length:ambient?32:26},(_,i)=><i key={i} style={{'--x':`${8+(i*37%84)}%`,'--delay':`${-i*1.73}s`,'--duration':`${7+i%6}s`,'--drift':`${(i%2?1:-1)*(12+i%25)}px`,'--turn':`${180+i*37}deg`,'--tone':i%3===0?'#f1bcdf':i%3===1?'#e5daed':'#b89acd'} as CSSProperties}/>) }
  </div>;
}
