"use client";

import { PRODUCT } from "@/lib/product";

import { lazy, Suspense, useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowDown, ArrowUpRight, Maximize2, Minimize2, MoveHorizontal, Pause, Play, RotateCw } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Scene=lazy(()=>import('./ImmersiveScene'));
const chapters=[
  {name:'White',title:'White.\nUntil you.',copy:'Meet the colour-changing foundation stick. White at first. Your skin tone as you blend.'},
  {name:'Blend',title:'The change is in your hands.',copy:'Swipe the white formula. Turn to the built-in brush. Blend to reveal the colour.'},
  {name:'You',title:'Becomes you.',copy:'As you apply and blend, the white foundation changes colour, adapting to your skin tone.'},
];

export default function ImmersiveHero({embedded=false}:{embedded?:boolean}){
  const section=useRef<HTMLElement>(null);
  const progress=useRef(0);
  const rotation=useRef(0);
  const pointer=useRef<{id:number;x:number;start:number}|null>(null);
  const [value,setValue]=useState(0);
  const [ready,setReady]=useState(false);
  const [mounted,setMounted]=useState(false);
  const [paused,setPaused]=useState(false);
  const [inspecting,setInspecting]=useState(false);
  const inspectingRef=useRef(false);
  const [reduced,setReduced]=useState(false);
  const [turn,setTurn]=useState(0);
  const readyCallback=useCallback(()=>setReady(true),[]);
  const unavailableCallback=useCallback(()=>setReady(false),[]);
  const update=useCallback((next:number)=>{progress.current=next;setValue(Math.round(next*100)/100);},[]);
  useEffect(()=>{
    const observer=new IntersectionObserver(([entry])=>{
      if(entry.isIntersecting){setMounted(true);observer.disconnect();}
    },{rootMargin:'500px'});
    if(section.current)observer.observe(section.current);
    gsap.registerPlugin(ScrollTrigger);
    const query=window.matchMedia('(prefers-reduced-motion: reduce)');
    const preference=()=>setReduced(query.matches);
    preference();query.addEventListener('change',preference);
    const media=gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)',()=>{
      ScrollTrigger.create({trigger:section.current,start:'top top',end:'bottom bottom',onUpdate:self=>{if(!inspectingRef.current)update(self.progress);}});
    });
    return()=>{observer.disconnect();media.revert();query.removeEventListener('change',preference);};
  },[update]);
  const current=Math.min(2,Math.round(value*2));
  const chooseChapter=(index:number)=>{
    if(reduced||inspecting||!section.current){update(index/2);return;}
    const bounds=section.current.getBoundingClientRect();
    const top=window.scrollY+bounds.top+(bounds.height-window.innerHeight)*index/2;
    window.scrollTo({top,behavior:'smooth'});
  };
  const toggleInspection=()=>{
    const next=!inspecting;
    inspectingRef.current=next;
    setInspecting(next);
    if(!next&&!reduced&&section.current){
      const bounds=section.current.getBoundingClientRect();
      update(Math.max(0,Math.min(1,-bounds.top/Math.max(1,bounds.height-window.innerHeight))));
    }
  };
  const dark=current===2;
  const style={'--journey-ground':dark?'#34231c':'#f2eee7','--journey-ink':dark?'#f2eee7':'#34231c','--journey-progress':value} as CSSProperties;
  const Heading=embedded?'h2':'h1';
  return <section ref={section} id="the-change" className={`immersive-journey ${embedded?'is-embedded':''} ${inspecting?'is-inspecting':''}`} style={style} aria-label="White. Blend. You. Explore the colour-changing foundation stick">
    <div className="immersive-stage">
      <header className="journey-header"><a href="/" className="journey-brand" aria-label="NURRIE home">NURRIE<span>Beauty, becoming.</span></a><nav aria-label="Main navigation"><a href="#the-stick">The object</a><a href="#the-ritual">The ritual</a></nav><a href="#first-access" className="journey-invitation">First access <ArrowUpRight size={18}/></a></header>
      <div className={`journey-object ${ready?'is-ready':''}`} onPointerDown={event=>{if(event.button!==0)return;pointer.current={id:event.pointerId,x:event.clientX,start:rotation.current};event.currentTarget.setPointerCapture(event.pointerId);}} onPointerMove={event=>{if(pointer.current?.id===event.pointerId){rotation.current=pointer.current.start+(event.clientX-pointer.current.x)*.009;setTurn(rotation.current);}}} onPointerUp={()=>{pointer.current=null;}} onPointerCancel={()=>{pointer.current=null;}}>
        {mounted?<Suspense fallback={<div className="journey-fallback"><img src={PRODUCT.fallback} alt="NURRIE white foundation and built-in brush in pearl ivory and rose gold"/></div>}><Scene progress={progress} rotation={rotation} paused={paused||reduced||inspecting} phase={value} turn={turn} inspecting={inspecting} onReady={readyCallback} onUnavailable={unavailableCallback}/></Suspense>:<div className="journey-fallback"><img src={PRODUCT.fallback} alt="NURRIE white foundation and built-in brush in pearl ivory and rose gold"/></div>}
      </div>
      <div className="journey-caption" aria-live="polite"><Heading>{inspecting?['White foundation.','The built-in brush.','Pearl. Rose gold.'][current]:chapters[current].title}</Heading><p>{inspecting?'Drag to explore the details. An artistic preview of the NURRIE stick.':chapters[current].copy}</p></div>
      <button type="button" className="journey-inspect" disabled={!ready&&!inspecting} aria-pressed={inspecting} onClick={toggleInspection}>{inspecting?<Minimize2 size={16}/>:<Maximize2 size={16}/>}<span>{inspecting?'Back to the story':'Inspect the details'}</span></button>
      <div className="journey-touch"><MoveHorizontal size={17}/><span>{ready?'Drag to turn':'Product preview'}</span><button disabled={!ready} aria-label="Rotate the product" onClick={()=>{rotation.current+=Math.PI/2;setTurn(rotation.current);}}><RotateCw size={17}/></button><button disabled={!ready||reduced||inspecting} aria-label={inspecting?'Animation paused for inspection':reduced?'Motion reduced':paused?'Play product animation':'Pause product animation'} aria-pressed={paused||reduced||inspecting} onClick={()=>setPaused(!paused)}>{paused||reduced||inspecting?<Play size={16}/>:<Pause size={16}/>}</button></div>
      <a className="journey-cta button button-rose" href="#first-access">Meet your next favourite <ArrowUpRight size={20}/></a>
      <div className="journey-bottom"><div className="journey-chapters" aria-label="Product story chapters">{chapters.map((chapter,index)=><button key={chapter.name} type="button" aria-pressed={current===index} onClick={()=>chooseChapter(index)}><span>{String(index+1).padStart(2,'0')}</span>{chapter.name}</button>)}</div><a href={embedded?'#the-ritual':'#the-stick'} className="journey-scroll">Explore the ritual <ArrowDown size={16}/></a></div>
      <div className="journey-progress" aria-hidden="true"><span/></div>
    </div>
  </section>;
}
