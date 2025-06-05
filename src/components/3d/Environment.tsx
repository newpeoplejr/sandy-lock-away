
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Environment() {
  const waveRef = useRef<THREE.Mesh>(null);
  
  // Animate water waves
  useFrame((state) => {
    if (waveRef.current) {
      const time = state.clock.elapsedTime;
      waveRef.current.rotation.z = Math.sin(time * 0.2) * 0.01;
      waveRef.current.position.y = Math.sin(time * 0.3) * 0.05 - 4.2;
    }
  });
  
  return (
    <>
      {/* Ocean/Water in the distance */}
      <mesh 
        ref={waveRef}
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -4.2, -30]}
        receiveShadow
      >
        <planeGeometry args={[100, 40]} />
        <meshStandardMaterial 
          color="#0EA5E9" 
          transparent
          opacity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Beach sand area - closer */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.05, 5]} receiveShadow>
        <planeGeometry args={[40, 25]} />
        <meshStandardMaterial 
          color="#F4D03F" 
          metalness={0.1} 
          roughness={0.9}
        />
      </mesh>
      
      {/* Distant mountains */}
      <mesh position={[0, 8, -60]}>
        <coneGeometry args={[15, 20, 8]} />
        <meshStandardMaterial 
          color="#7C3AED" 
          metalness={0.1} 
          roughness={0.8}
        />
      </mesh>
      
      <mesh position={[-20, 6, -65]}>
        <coneGeometry args={[12, 16, 8]} />
        <meshStandardMaterial 
          color="#8B5CF6" 
          metalness={0.1} 
          roughness={0.8}
        />
      </mesh>
      
      <mesh position={[25, 7, -58]}>
        <coneGeometry args={[10, 18, 8]} />
        <meshStandardMaterial 
          color="#A78BFA" 
          metalness={0.1} 
          roughness={0.8}
        />
      </mesh>
      
      {/* Palm trees */}
      <group position={[-8, -2, 8]}>
        {/* Tree trunk */}
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.2, 4, 8]} />
          <meshStandardMaterial 
            color="#8B4513" 
            metalness={0.1} 
            roughness={0.9}
          />
        </mesh>
        
        {/* Palm leaves */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <mesh 
            key={i}
            position={[
              Math.cos((angle * Math.PI) / 180) * 0.1,
              2.2,
              Math.sin((angle * Math.PI) / 180) * 0.1
            ]}
            rotation={[
              Math.cos((angle * Math.PI) / 180) * 0.3,
              (angle * Math.PI) / 180,
              Math.sin((angle * Math.PI) / 180) * 0.2
            ]}
            castShadow
          >
            <boxGeometry args={[0.05, 1.5, 0.3]} />
            <meshStandardMaterial 
              color="#228B22" 
              metalness={0.1} 
              roughness={0.8}
            />
          </mesh>
        ))}
      </group>
      
      {/* Second palm tree */}
      <group position={[10, -2, 6]}>
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.18, 3.5, 8]} />
          <meshStandardMaterial 
            color="#8B4513" 
            metalness={0.1} 
            roughness={0.9}
          />
        </mesh>
        
        {[30, 90, 150, 210, 270, 330].map((angle, i) => (
          <mesh 
            key={i}
            position={[
              Math.cos((angle * Math.PI) / 180) * 0.1,
              1.9,
              Math.sin((angle * Math.PI) / 180) * 0.1
            ]}
            rotation={[
              Math.cos((angle * Math.PI) / 180) * 0.25,
              (angle * Math.PI) / 180,
              Math.sin((angle * Math.PI) / 180) * 0.15
            ]}
            castShadow
          >
            <boxGeometry args={[0.04, 1.3, 0.25]} />
            <meshStandardMaterial 
              color="#32CD32" 
              metalness={0.1} 
              roughness={0.8}
            />
          </mesh>
        ))}
      </group>
      
      {/* Beach umbrella */}
      <group position={[6, -2, 12]}>
        {/* Umbrella pole */}
        <mesh position={[0, 1, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 2, 8]} />
          <meshStandardMaterial 
            color="#8B4513" 
            metalness={0.3} 
            roughness={0.7}
          />
        </mesh>
        
        {/* Umbrella top */}
        <mesh position={[0, 2.2, 0]} castShadow>
          <coneGeometry args={[1.5, 0.8, 16]} />
          <meshStandardMaterial 
            color="#FF6B35" 
            metalness={0.1} 
            roughness={0.8}
          />
        </mesh>
      </group>
    </>
  );
}
