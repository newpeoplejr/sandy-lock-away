
import * as THREE from 'three';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

interface LockerDoorProps {
  position: [number, number, number];
  size: [number, number];
  color?: string;
  number: number;
}

export function LockerDoor({ position, size, color = "#DC2626", number }: LockerDoorProps) {
  const doorRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  // Subtle hover animation
  useFrame(() => {
    if (doorRef.current) {
      const targetScale = hovered ? 1.02 : 1;
      doorRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });
  
  return (
    <group 
      ref={doorRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Door panel with rounded edges effect */}
      <mesh castShadow>
        <boxGeometry args={[size[0], size[1], 0.06]} />
        <meshStandardMaterial 
          color={hovered ? new THREE.Color(color).multiplyScalar(1.1) : color}
          metalness={0.2} 
          roughness={0.8}
          envMapIntensity={0.5}
        />
      </mesh>
      
      {/* Door frame */}
      <mesh position={[0, 0, -0.02]} castShadow>
        <boxGeometry args={[size[0] + 0.02, size[1] + 0.02, 0.02]} />
        <meshStandardMaterial 
          color="#374151" 
          metalness={0.6} 
          roughness={0.4}
        />
      </mesh>
      
      {/* Number label with better styling */}
      <mesh position={[0, size[1] * 0.2, 0.04]} castShadow>
        <circleGeometry args={[0.15, 16]} />
        <meshStandardMaterial 
          color="#FFFFFF" 
          metalness={0.1} 
          roughness={0.9}
        />
      </mesh>
      
      {/* 3D Text for number */}
      <Text
        position={[0, size[1] * 0.2, 0.05]}
        fontSize={0.12}
        color="#1F2937"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        {number.toString()}
      </Text>
      
      {/* Modern lock mechanism */}
      <mesh position={[size[0] * 0.3, -size[1] * 0.1, 0.04]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.03, 16]} />
        <meshStandardMaterial 
          color="#1F2937" 
          metalness={0.9} 
          roughness={0.1}
        />
      </mesh>
      
      {/* Lock center */}
      <mesh position={[size[0] * 0.3, -size[1] * 0.1, 0.056]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.01, 8]} />
        <meshStandardMaterial 
          color="#000000" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
      
      {/* Door handle */}
      <mesh position={[size[0] * 0.25, 0, 0.04]} castShadow>
        <boxGeometry args={[0.15, 0.03, 0.02]} />
        <meshStandardMaterial 
          color="#6B7280" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
      
      {/* Ventilation slots */}
      {[-0.1, 0, 0.1].map((offset, i) => (
        <mesh key={i} position={[0, -size[1] * 0.3 + offset, 0.031]} castShadow>
          <boxGeometry args={[size[0] * 0.6, 0.01, 0.005]} />
          <meshStandardMaterial 
            color="#1F2937" 
            metalness={0.5} 
            roughness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}
