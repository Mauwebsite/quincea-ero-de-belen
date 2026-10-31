import {Icon} from './Icon';
import { useState } from 'react';
import { eventConfig as c } from '../data/eventConfig';
export function Trivia() {
  const [index, setIndex] = useState(0), [answers, setAnswers] = useState<string[]>([]), [done, setDone] = useState(false);
  const questions = c.trivia.questions;
  const q = questions[index];
  const hasKey = questions.every(q => q.correctOptionId.length > 0);
  const score = questions.reduce((n, q, i) => n + Number(q.correctOptionId === answers[i]), 0);
  return <section id="trivia" className="section reveal"><img className="section-icon" src="assets/icono_trivia.webp" alt="" loading="lazy"/><span className="eyebrow trivia-label">TRIVIAS</span><h2 className="trivia-heading">¿Qué tanto<br/><em>me conoces?</em></h2>
    {c.trivia.modoDemo && <p className="demo-label">MODO DEMO · Preguntas de ejemplo<br/>Se reemplazarán por las oficiales.</p>}
    {!questions.length ? <p>Próximamente: descubre cuánto conoces a Belén</p> : <div className="quiz panel" aria-live="polite">
      {done ? <><span className="eyebrow">¡COMPLETASTE LA TRIVIA!</span>{hasKey ? <h3 className="score">{score}<span> / {questions.length}</span></h3> : <h3>¡Gracias por participar!</h3>}<p>{c.trivia.modoDemo ? 'Ya conoces un poco más de esta noche.' : '¡Gracias por jugar!'}</p><button className="button" onClick={() => {setDone(false); setIndex(0); setAnswers([]);}}>VOLVER A JUGAR <Icon/></button></> : <>
        <div className="quiz-progress"><span>Pregunta {index + 1} de {questions.length}</span><span>{Math.round((index + 1) / questions.length * 100)}%</span></div><div className="progress-track"><span style={{width: `${(index + 1) / questions.length * 100}%`}}/></div>
        <h3>{q.question.replace(' (EJEMPLO)', '')}</h3><div className="options" role="group" aria-label="Opciones de respuesta">{q.options.map((o, i) => <button key={o.id} className={answers[index] === o.id ? 'selected' : ''} aria-pressed={answers[index] === o.id} onClick={() => setAnswers(a => {const next = [...a]; next[index] = o.id; return next;})}><span>{String.fromCharCode(65 + i)}</span>{o.text}<span className="radio"/></button>)}</div>
        <button className="button primary" disabled={!answers[index]} onClick={() => index === questions.length - 1 ? setDone(true) : setIndex(index + 1)}>{index === questions.length - 1 ? (hasKey ? 'VER RESULTADO' : 'FINALIZAR TRIVIA') : 'SIGUIENTE'} <Icon name="next"/></button>
      </>}
    </div>}
  </section>;
}
