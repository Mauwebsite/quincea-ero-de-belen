export function Icon({name='arrow'}:{name?:'arrow'|'next'|'down'|'up'|'play'|'back'}) {
 const paths={arrow:'M6 18 18 6M6 6h12v12',next:'M4 12h16m-6-6 6 6-6 6',down:'M12 4v16m-6-6 6 6 6-6',up:'M12 20V4m-6 6 6-6 6 6',play:'m9 5 11 7-11 7Z',back:'M20 12H4m6-6-6 6 6 6'};
 return <svg className="ui-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={paths[name]}/></svg>;
}
