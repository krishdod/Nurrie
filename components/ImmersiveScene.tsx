"use client";

import { Component, Suspense, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, Environment, Lightformer, Text3D } from "@react-three/drei";
import { BackSide, Group, MathUtils } from "three";
import { ProductBody, ProductFallback } from "./KineticScene";

type Props = { progress: RefObject<number>; rotation: RefObject<number>; paused: boolean; phase: number; turn: number; onReady: () => void; onUnavailable: () => void };
class Boundary extends Component<{children: ReactNode; fallback: ReactNode; onError: () => void},{failed:boolean}> {
  state={failed:false};
  static getDerivedStateFromError(){return {failed:true};}
  componentDidCatch(){this.props.onError();}
  render(){return this.state.failed?this.props.fallback:this.props.children;}
}

function FrameUpdates({phase,turn,paused}:{phase:number;turn:number;paused:boolean}){
  const invalidate=useThree(state=>state.invalidate);
  useEffect(()=>{invalidate();},[phase,turn,paused,invalidate]);
  return null;
}

function Word({word,index,progress,paused}:{word:string;index:number;progress:RefObject<number>;paused:boolean}) {
  const group=useRef<Group>(null);
  const {viewport,size}=useThree();
  const narrow=size.width<900;
  const sizeValue=Math.min(viewport.height*.3,viewport.width/(word.length*(word==='YOU'?1.08:.81)));
  useFrame((state,delta)=>{
    if(!group.current)return;
    const difference=progress.current*2-index;
    group.current.visible=Math.abs(difference)<.78;
    group.current.position.x=paused ? -difference*viewport.width*1.05 : MathUtils.damp(group.current.position.x,-difference*viewport.width*1.05,4,delta);
    const targetY=(narrow?.76:.82)+Math.sin(difference*Math.PI)*.22;
    group.current.position.y=paused ? targetY : MathUtils.damp(group.current.position.y,targetY,4,delta);
    group.current.rotation.y=paused ? difference*.52 : MathUtils.damp(group.current.rotation.y,difference*.52+state.pointer.x*.045,4,delta);
    group.current.rotation.z=paused ? -.06+difference*.13 : MathUtils.damp(group.current.rotation.z,-.06+difference*.13,4,delta);
  });
  return <group ref={group} position={[index*viewport.width,.15,-1.2]}>
    <Center key={sizeValue.toFixed(4)}><Text3D font="/fonts/optimer-regular.json" size={sizeValue} height={.17} curveSegments={10} bevelEnabled bevelSize={.012} bevelThickness={.018} bevelSegments={3} letterSpacing={-.025}>{word}<meshPhysicalMaterial color={index===2?"#eadccc":"#785440"} metalness={.42} roughness={.22} clearcoat={.5}/></Text3D></Center>
  </group>;
}

function ObjectInMotion({progress,rotation,paused,onReady}:Props){
  const product=useRef<Group>(null);
  const narrow=useThree(state=>state.size.width<900);
  const compact=useThree(state=>state.size.width<700&&state.size.height<760);
  const baseY=compact?.78:narrow?.58:.25;
  const time=useRef(0);
  useEffect(()=>{onReady();},[onReady]);
  useFrame((state,delta)=>{
    if(!product.current)return;
    const p=progress.current;
    if(!paused)time.current+=Math.min(delta,.04);
    const bend=Math.sin(p*Math.PI);
    product.current.rotation.z=paused ? -.22-bend*(narrow?.43:.86) : MathUtils.damp(product.current.rotation.z,-.22-bend*(narrow?.43:.86),4,delta);
    product.current.rotation.y=paused ? .12+rotation.current+p*.27 : MathUtils.damp(product.current.rotation.y,.12+rotation.current+p*.27+state.pointer.x*.12,4,delta);
    product.current.rotation.x=paused ? .08 : MathUtils.damp(product.current.rotation.x,.08+state.pointer.y*.055,4,delta);
    product.current.position.y=paused ? baseY : MathUtils.damp(product.current.position.y,baseY+Math.sin(time.current*.5)*.035,4,delta);
  });
  return <group ref={product} scale={compact?.61:narrow?.72:1.02} position={[narrow?0:.2,baseY,.6]} rotation={[.08,.12,-.22]}><ProductBody opening={progress}/></group>;
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
      <FrameUpdates phase={props.phase} turn={props.turn} paused={props.paused}/><Suspense fallback={null}>{['WHITE','BLEND','YOU'].map((word,index)=><Word key={word} word={word} index={index} progress={props.progress} paused={props.paused}/>)}<ObjectInMotion {...props}/></Suspense>
    </Canvas></Boundary>}
  </div>;
}
