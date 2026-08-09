import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import githubIcon from './assets/GitHub_Invertocat_White_Clearspace.svg';

function AnimatedShape() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} scale={1.4}>
        <torusKnotGeometry args={[1.9, 0.4, 128, 32, 2, 3]} />
        <meshPhysicalMaterial
          color="#008cff" /* Deep Royal Blue */
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
  const [isGithubHovered, setIsGithubHovered] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', backgroundColor: '#070b19' /* Midnight Navy */ }}>
      {/* 3D Canvas Layer */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[5, 5, 5]} intensity={4} color="#ffffff" />
          <directionalLight position={[-5, -5, -2]} intensity={2} color="#3b82f6" /* Vibrant Blue Rim Light */ />
          <pointLight position={[0, 0, 2]} intensity={3} color="#9dff00" /* Soft Icy White Light */ />

          <AnimatedShape />
        </Canvas>
      </div>

      {/* Backdrop Blur Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          backdropFilter: 'blur(60px)',
          WebkitBackdropFilter: 'blur(60px)',
          transform: 'scale(1.2)',
          pointerEvents: 'none',
        }}
      />

      {/* Top Header Badge */}
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

      {/* Hero Text Content */}
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

        {/* GitHub Link Button with Hover Effect */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '16px' }}>
          <a
            href="https://github.com/kfo1a"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setIsGithubHovered(true)}
            onMouseLeave={() => setIsGithubHovered(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isGithubHovered ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            <img
              src={githubIcon}
              alt="GitHub"
              style={{
                width: '48px',
                height: '48px',
                padding: '8px',
                boxSizing: 'border-box',
                background: isGithubHovered ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.1)',
                border: isGithubHovered ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '20px',
                boxShadow: isGithubHovered ? '0 8px 20px rgba(0, 0, 0, 0.3)' : '0 2px 5px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
          </a>
        </div>
      </div>
    </div>
  );
}