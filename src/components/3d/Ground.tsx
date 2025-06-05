
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Ground() {
  const groundRef = useRef<THREE.Mesh>(null);
  
  // Subtle ground animation
  useFrame((state) => {
    if (groundRef.current) {
      const time = state.clock.elapsedTime;
      // Very subtle breathing effect
      groundRef.current.scale.setScalar(1 + Math.sin(time * 0.5) * 0.001);
    }
  });
  
  return (
    <>
      {/* Main ground */}
      <mesh 
        ref={groundRef}
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -4.1, 0]} 
        receiveShadow
      >
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial 
          color="#E5E7EB" 
          metalness={0.1} 
          roughness={0.9}
        />
      </mesh>
      
      {/* Concrete pad under lockers */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -4.05, 0]} 
        receiveShadow
      >
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial 
          color="#9CA3AF" 
          metalness={0.2} 
          roughness={0.8}
        />
      </mesh>
      
      {/* Decorative border around concrete */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -4.04, 0]} 
        receiveShadow
      >
        <ringGeometry args={[6, 6.2]} />
        <meshStandardMaterial 
          color="#6B7280" 
          metalness={0.3} 
          roughness={0.7}
        />
      </mesh>
    </>
  );
}
