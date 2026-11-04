"use client";

import { Component, Suspense, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, Environment, Lightformer, Text3D } from "@react-three/drei";
import { BackSide, Group, MathUtils } from "three";
import { ProductBody, ProductFallback } from "./KineticScene";

type Props = { progress: RefObject<number>; rotation: RefObject<number>; paused: boolean; phase: number; turn: number; inspecting: boolean; onReady: () => void; onUnavailable: () => void };
class Boundary extends Component<{children: ReactNode; fallback: ReactNode; onError: () => void},{failed:boolean}> {
  state={failed:false};
  static getDerivedStateFromError(){return {failed:true};}
  componentDidCatch(){this.props.onError();}
  render(){return this.state.failed?this.props.fallback:this.props.children;}
}

function FrameUpdates({phase,turn,paused,inspecting}:{phase:number;turn:number;paused:boolean;inspecting:boolean}){
  const invalidate=useThree(state=>state.invalidate);
  useEffect(()=>{invalidate();},[phase,turn,paused,inspecting,invalidate]);
  return null;
}

function KineticLetter({letter,index,position,wordIndex,progress,paused,sizeValue,inspecting}:{letter:string;index:number;position:number;wordIndex:number;progress:RefObject<number>;paused:boolean;sizeValue:number;inspecting:boolean}) {
  const group=useRef<Group>(null);
  const {viewport,size}=useThree();
  const narrow=size.width<900;
  useFrame((state,delta)=>{
    if(!group.current)return;
    const difference=progress.current*2-wordIndex;
    group.current.visible=!inspecting&&Math.abs(difference)<.85;
    const departure=Math.sin(difference*Math.PI);
    const targetX=position-difference*viewport.width*1.05+departure*(index-1.5)*.2;
    group.current.position.x=paused ? targetX : MathUtils.damp(group.current.position.x,targetX,5,delta);
    const targetY=(narrow?.76:.82)+departure*(index-1.5)*.26;
    group.current.position.y=paused ? targetY : MathUtils.damp(group.current.position.y,targetY,4,delta);
    group.current.rotation.y=paused ? difference*.6 : MathUtils.damp(group.current.rotation.y,difference*.6+state.pointer.x*.055,4,delta);
    group.current.rotation.z=paused ? -.035+departure*(index-1.5)*.16 : MathUtils.damp(group.current.rotation.z,-.035+departure*(index-1.5)*.16,4,delta);
  });
  return <group ref={group} position={[position+wordIndex*viewport.width,.82,-1.2]}>
    <Center key={sizeValue.toFixed(4)}><Text3D font="/fonts/optimer-regular.json" size={sizeValue} height={.23} curveSegments={10} bevelEnabled bevelSize={.012} bevelThickness={.018} bevelSegments={3}>{letter}<meshPhysicalMaterial color={wordIndex===2?"#eadccc":"#785440"} metalness={.52} roughness={.21} clearcoat={.6}/></Text3D></Center>
  </group>;
}

function Word({word,index,progress,paused,inspecting}:{word:string;index:number;progress:RefObject<number>;paused:boolean;inspecting:boolean}) {
  const viewport=useThree(state=>state.viewport);
  const widths:Record<string,number>={W:1.12,H:.86,I:.4,T:.8,E:.78,B:.78,L:.72,N:.9,D:.88,Y:.85,O:.91,U:.88};
  const total=[...word].reduce((sum,letter)=>sum+(widths[letter]??.85),0);
  const sizeValue=Math.min(viewport.height*.3,viewport.width/(total*1.13));
  let edge=-total*sizeValue/2;
  return <>{[...word].map((letter,letterIndex)=>{
    const width=(widths[letter]??.85)*sizeValue;
    const position=edge+width/2;
    edge+=width;
    return <KineticLetter key={`${letterIndex}-${letter}`} letter={letter} index={letterIndex} position={position} wordIndex={index} progress={progress} paused={paused} sizeValue={sizeValue} inspecting={inspecting}/>;
  })}</>;
}

function ObjectInMotion({progress,rotation,paused,inspecting,onReady}:Props){
  const product=useRef<Group>(null);
  const narrow=useThree(state=>state.size.width<900);
  const compact=useThree(state=>state.size.width<700&&state.size.height<760);
  const baseY=inspecting?-1.1:compact?.78:narrow?.58:.25;
  const time=useRef(0);
  useEffect(()=>{onReady();},[onReady]);
  useFrame((state,delta)=>{
    if(!product.current)return;
    const p=progress.current;
    if(!paused)time.current+=Math.min(delta,.04);
    const bend=Math.sin(p*Math.PI);
    const tilt=inspecting?(p>.25&&p<.75?Math.PI+.08:-.08):-.22-bend*(narrow?.43:.86);
    product.current.rotation.z=paused ? tilt : MathUtils.damp(product.current.rotation.z,tilt,4,delta);
    product.current.rotation.y=paused ? .12+rotation.current+p*.27 : MathUtils.damp(product.current.rotation.y,.12+rotation.current+p*.27+state.pointer.x*.12,4,delta);
    product.current.rotation.x=paused ? .08 : MathUtils.damp(product.current.rotation.x,.08+state.pointer.y*.055,4,delta);
    product.current.position.y=paused ? baseY : MathUtils.damp(product.current.position.y,baseY+Math.sin(time.current*.5)*.035,4,delta);
  });
  return <group ref={product} scale={inspecting?(narrow?1.35:1.8):compact?.61:narrow?.72:1.02} position={[narrow?0:.2,baseY,.6]} rotation={[.08,.12,-.22]}><ProductBody opening={progress} hideCap={inspecting}/></group>;
}

export default function ImmersiveScene(props:Props){
  const [supported,setSupported]=useState<boolean|null>(null);
  const [visible,setVisible]=useState(true);
  const [intersecting,setIntersecting]=useState(true);
  const container=useRef<HTMLDivElement>(null);
  useEffect(()=>{if(supported===false)props.onUnavailable();},[supported,props.onUnavailable]);
  useEffect(()=>{
    const canvas=document.createElement('canvas');
    try{const context=canvas.getContext('webgl2');setSupported(Boolean(context));context?.getExtension('WEBGL_lose_context')?.loseContext();}catch{setSupported(false);}
    const update=()=>setVisible(!document.hidden);
    document.addEventListener('visibilitychange',update);
    const observer=new IntersectionObserver(([entry])=>setIntersecting(entry.isIntersecting));
    if(container.current)observer.observe(container.current);
    return()=>{document.removeEventListener('visibilitychange',update);observer.disconnect();};
  },[]);
  return <div ref={container} className="immersive-canvas" role="img" aria-label="Interactive sculptural NURRIE stick: white foundation, pearl ivory casing, rose-gold trim and a revealed blending brush">
    {supported!==true?<ProductFallback/>:<Boundary fallback={<ProductFallback/>} onError={props.onUnavailable}><Canvas camera={{position:[0,.05,8.5],fov:36}} dpr={[1,1.5]} frameloop={!visible||!intersecting?'never':props.paused?'demand':'always'} gl={{alpha:true,antialias:true,powerPreference:'low-power'}} onCreated={({gl})=>gl.domElement.addEventListener('webglcontextlost',()=>setSupported(false),{once:true})}>
      <ambientLight intensity={.55}/><directionalLight position={[-4,6,5]} intensity={3} color="#fff9f1"/><directionalLight position={[4,1,-4]} intensity={2.5} color="#f3cbb0"/>
      <Environment resolution={256} frames={1}><mesh scale={40}><sphereGeometry args={[1,24,24]}/><meshBasicMaterial color="#97877a" side={BackSide}/></mesh><Lightformer intensity={6} position={[-3,2,4]} scale={[.75,7,1]} rotation={[0,.4,0]}/><Lightformer intensity={4} position={[4,1,1]} scale={[.6,5,1]} rotation={[0,-Math.PI/2,0]}/><Lightformer intensity={3} position={[0,5,-2]} scale={[5,3,1]} rotation={[Math.PI/2,0,0]}/><Lightformer intensity={1.3} position={[0,0,6]} scale={[5,5,1]}/></Environment>
      <FrameUpdates phase={props.phase} turn={props.turn} paused={props.paused} inspecting={props.inspecting}/><Suspense fallback={null}>{['WHITE','BLEND','YOU'].map((word,index)=><Word key={word} word={word} index={index} progress={props.progress} paused={props.paused} inspecting={props.inspecting}/>)}<ObjectInMotion {...props}/></Suspense>
    </Canvas></Boundary>}
  </div>;
}
