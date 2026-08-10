import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import githubIcon from './assets/GitHub_Invertocat_White_Clearspace.svg';

function AnimatedShape() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.z += delta * 0.1;
      meshRef.current.scale.x = THREE.MathUtils.damp(meshRef.current.scale.x, 1.4, 1.5, delta);
      meshRef.current.scale.y = THREE.MathUtils.damp(meshRef.current.scale.y, 1.4, 1.5, delta);
      meshRef.current.scale.z = THREE.MathUtils.damp(meshRef.current.scale.z, 1.4, 1.5, delta);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} scale={[0, 0, 0]}>
      <torusKnotGeometry args={[1.9, 0.4, 64, 16, 2, 3]} />
        <meshPhysicalMaterial
          color="#008cff"
          roughness={0.25}
          metalness={0.1}
          clearcoat={0.3}
          clearcoatRoughness={0.2}
        />
      </mesh>
    </Float>
  );
}

export default function App() {
  const [isCanvasLoaded, setIsCanvasLoaded] = useState(false);
  const overlayRef = useRef();

  useEffect(() => {
    const baseBlur = 60;

    const applyBlur = () => {
      const scale = (window.visualViewport && typeof window.visualViewport.scale === 'number') ? window.visualViewport.scale : 1;
      const dpr = window.devicePixelRatio || 1;
      const computed = baseBlur / (scale * dpr);
      if (overlayRef.current) {
        overlayRef.current.style.backdropFilter = `blur(${computed}px)`;
        overlayRef.current.style.WebkitBackdropFilter = `blur(${computed}px)`;
      }
    };

    applyBlur();

    const vv = window.visualViewport;
    if (vv && vv.addEventListener) vv.addEventListener('resize', applyBlur);
    window.addEventListener('resize', applyBlur);

    return () => {
      if (vv && vv.removeEventListener) vv.removeEventListener('resize', applyBlur);
      window.removeEventListener('resize', applyBlur);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100dvh', overflow: 'hidden', backgroundColor: '#070b19' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          opacity: isCanvasLoaded ? 1 : 0,
          transition: 'opacity 2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5], fov: 60 }}
          onCreated={() => setIsCanvasLoaded(true)}
          style={{ backgroundColor: '#070b19' }}
        >
          <ambientLight intensity={0.2} />
          <directionalLight position={[5, 5, 5]} intensity={4} color="#ffffff" />
          <directionalLight position={[-5, -5, -2]} intensity={2} color="#3b82f6" />
          <pointLight position={[0, 0, 2]} intensity={3} color="#9dff00" />

          <AnimatedShape />
        </Canvas>
      </div>

      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      
      <div style={{ position: 'absolute', top: '18px', left: 0, right: 0, zIndex: 3, display: 'flex', justifyContent: 'center' }}>
        <span
          style={{
            fontSize: '0.85rem',
            letterSpacing: '1px',
            padding: '6px 16px',
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#ffffff',
            fontFamily: 'sans-serif',
          }}
        >
          Iulian Babiuc
        </span>
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          textAlign: 'center',
          fontFamily: 'sans-serif',
          padding: '0 20px',
        }}
      >
        <h1 style={{ fontSize: '4rem', margin: '0 0 4px', fontWeight: 300 }}>
          <span
            style={{
              fontStyle: 'italic',
              fontFamily: 'serif',
              fontSize: '1.2rem',
              display: 'block',
              lineHeight: '0',
              marginBottom: '4px',
            }}
          >
            aspiring
          </span>
          <span style={{ fontStyle: 'italic', fontFamily: 'serif', lineHeight: '1' }}>
            Software Engineer
          </span>
        </h1>

        <p style={{ maxWidth: '500px', opacity: 0.7, fontSize: '0.9rem', lineHeight: 1.4 }}>
          I build software, experiment with AI, and explore how systems work from the ground up.
        </p>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '16px' }}>
          <a
            href="https://github.com/kfo1a"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            <img src={githubIcon} alt="GitHub" />
          </a>
        </div>
      </div>
    </div>
  );
}