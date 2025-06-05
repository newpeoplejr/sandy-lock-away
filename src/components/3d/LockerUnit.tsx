
import { LockerDoor } from './LockerDoor';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LockerUnitProps {
  position: [number, number, number];
}

export function LockerUnit({ position }: LockerUnitProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Subtle animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.005;
    }
  });
  
  // Define the grid size
  const rows = 5;
  const cols = 9;
  const lockerWidth = 0.8;
  const lockerHeight = 0.8;
  const depth = 1.0;
  
  // Calculate total dimensions
  const totalWidth = cols * lockerWidth;
  const totalHeight = rows * lockerHeight;
  
  return (
    <group ref={groupRef} position={position}>
      {/* Main cabinet structure with better materials */}
      <mesh castShadow receiveShadow position={[0, 0, -depth/2]}>
        <boxGeometry args={[totalWidth + 0.15, totalHeight + 0.15, depth]} />
        <meshStandardMaterial 
          color="#6B7280" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
      
      {/* Side panels for depth */}
      <mesh castShadow receiveShadow position={[-totalWidth/2 - 0.05, 0, -depth/4]}>
        <boxGeometry args={[0.1, totalHeight + 0.2, depth/2]} />
        <meshStandardMaterial 
          color="#4B5563" 
          metalness={0.7} 
          roughness={0.3}
        />
      </mesh>
      
      <mesh castShadow receiveShadow position={[totalWidth/2 + 0.05, 0, -depth/4]}>
        <boxGeometry args={[0.1, totalHeight + 0.2, depth/2]} />
        <meshStandardMaterial 
          color="#4B5563" 
          metalness={0.7} 
          roughness={0.3}
        />
      </mesh>
      
      {/* Generate locker doors in a grid */}
      {Array.from({ length: rows }).map((_, row) => (
        Array.from({ length: cols }).map((_, col) => {
          const doorNumber = row * cols + col + 1;
          // Alternate colors for visual variety
          const colors = ['#DC2626', '#EA580C', '#D97706', '#CA8A04'];
          const colorIndex = (row + col) % colors.length;
          
          return (
            <LockerDoor 
              key={`door-${row}-${col}`}
              position={[
                -totalWidth/2 + col * lockerWidth + lockerWidth/2, 
                totalHeight/2 - row * lockerHeight - lockerHeight/2, 
                0
              ]} 
              size={[lockerWidth * 0.92, lockerHeight * 0.92]}
              color={colors[colorIndex]}
              number={doorNumber}
            />
          );
        })
      ))}
      
      {/* Modern roof/awning */}
      <mesh position={[0, totalHeight/2 + 0.5, 0.6]} castShadow>
        <boxGeometry args={[totalWidth + 1, 0.15, depth + 1.5]} />
        <meshStandardMaterial 
          color="#F8FAFC" 
          metalness={0.9} 
          roughness={0.1}
        />
      </mesh>
      
      {/* Roof supports */}
      {[-totalWidth/3, 0, totalWidth/3].map((x, i) => (
        <mesh key={i} position={[x, totalHeight/2 + 0.3, 0.8]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.6]} />
          <meshStandardMaterial 
            color="#6B7280" 
            metalness={0.8} 
            roughness={0.2}
          />
        </mesh>
      ))}
      
      {/* Company sign */}
      <mesh position={[0, totalHeight/2 + 1, 0]} castShadow>
        <boxGeometry args={[totalWidth * 0.8, 0.8, 0.08]} />
        <meshStandardMaterial 
          color="#1E40AF" 
          metalness={0.1} 
          roughness={0.8}
        />
      </mesh>
      
      {/* Sign text background */}
      <mesh position={[0, totalHeight/2 + 1, 0.05]} castShadow>
        <planeGeometry args={[totalWidth * 0.7, 0.6]} />
        <meshStandardMaterial 
          color="#FFFFFF" 
          metalness={0.0} 
          roughness={0.9}
        />
      </mesh>
      
      {/* Modern payment terminal */}
      <mesh position={[totalWidth/2 + 0.8, 0.5, depth/2 + 0.2]} castShadow>
        <boxGeometry args={[0.6, 1.4, 0.4]} />
        <meshStandardMaterial 
          color="#1F2937" 
          metalness={0.3} 
          roughness={0.7}
        />
      </mesh>
      
      {/* Terminal screen */}
      <mesh position={[totalWidth/2 + 0.81, 0.6, depth/2 + 0.41]} castShadow>
        <planeGeometry args={[0.45, 0.3]} />
        <meshStandardMaterial 
          color="#000000" 
          emissive="#0066CC" 
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Terminal keypad */}
      <mesh position={[totalWidth/2 + 0.81, 0.1, depth/2 + 0.41]} castShadow>
        <planeGeometry args={[0.3, 0.2]} />
        <meshStandardMaterial 
          color="#2D3748" 
          metalness={0.5} 
          roughness={0.8}
        />
      </mesh>
      
      {/* Base platform */}
      <mesh position={[0, -totalHeight/2 - 0.1, 0]} receiveShadow>
        <boxGeometry args={[totalWidth + 0.5, 0.2, depth + 0.3]} />
        <meshStandardMaterial 
          color="#6B7280" 
          metalness={0.6} 
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}
