
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useTexture } from '@react-three/drei';
import { Suspense, useState } from 'react';
import { Box, Boxes, TerminalSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as THREE from 'three';

// Component for a single locker door
function LockerDoor({ position, size, color = "#ea384c", number }) {
  return (
    <group position={position}>
      {/* Door panel */}
      <mesh castShadow>
        <boxGeometry args={[size[0], size[1], 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Number label */}
      <mesh position={[0, 0, 0.03]} castShadow>
        <planeGeometry args={[0.2, 0.2]} />
        <meshStandardMaterial color="white" />
      </mesh>
      
      {/* Lock */}
      <mesh position={[size[0]/3, 0, 0.03]} castShadow>
        <boxGeometry args={[0.15, 0.15, 0.05]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  );
}

// Component for the locker unit
function LockerUnit({ position }) {
  // Define the grid size
  const rows = 5;
  const cols = 9;
  const lockerWidth = 0.8;
  const lockerHeight = 0.8;
  const depth = 0.8;
  
  // Calculate total dimensions
  const totalWidth = cols * lockerWidth;
  const totalHeight = rows * lockerHeight;
  
  return (
    <group position={position}>
      {/* Main cabinet structure */}
      <mesh castShadow receiveShadow position={[0, 0, -depth/2]}>
        <boxGeometry args={[totalWidth + 0.1, totalHeight + 0.1, depth]} />
        <meshStandardMaterial color="#8E9196" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Generate locker doors in a grid */}
      {Array.from({ length: rows }).map((_, row) => (
        Array.from({ length: cols }).map((_, col) => {
          const doorNumber = row * cols + col + 1;
          return (
            <LockerDoor 
              key={`door-${row}-${col}`}
              position={[
                -totalWidth/2 + col * lockerWidth + lockerWidth/2, 
                totalHeight/2 - row * lockerHeight - lockerHeight/2, 
                0
              ]} 
              size={[lockerWidth * 0.9, lockerHeight * 0.9]}
              color="#ea384c"
              number={doorNumber}
            />
          );
        })
      ))}
      
      {/* Roof/Awning */}
      <mesh position={[0, totalHeight/2 + 0.4, 0.4]} castShadow>
        <boxGeometry args={[totalWidth + 0.5, 0.1, depth + 1.2]} />
        <meshStandardMaterial color="#fff" metalness={0.7} roughness={0.2} />
      </mesh>
      
      {/* Sign on top */}
      <mesh position={[0, totalHeight/2 + 0.8, 0]} castShadow>
        <boxGeometry args={[totalWidth, 0.6, 0.05]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
      
      {/* Payment Terminal */}
      <mesh position={[0, 0, depth/2 + 0.1]} castShadow>
        <boxGeometry args={[1, 1.2, 0.3]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      
      {/* Terminal Screen */}
      <mesh position={[0, 0.1, depth/2 + 0.26]} castShadow>
        <planeGeometry args={[0.7, 0.4]} />
        <meshStandardMaterial color="#222" emissive="#333" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

// Floor/Ground component
function Ground() {
  return (
    <mesh 
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, -4, 0]} 
      receiveShadow
    >
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#f0f0f0" />
    </mesh>
  );
}

// Background/Environment component
function Environment() {
  return (
    <>
      {/* Sky */}
      <mesh position={[0, 0, -50]}>
        <planeGeometry args={[200, 100]} />
        <meshBasicMaterial color="#87CEEB" />
      </mesh>
      
      {/* Mountains */}
      <mesh position={[0, 5, -40]}>
        <planeGeometry args={[200, 30]} />
        <meshBasicMaterial color="#6a8caf" />
      </mesh>
      
      {/* Beach */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.01, 10]}>
        <planeGeometry args={[50, 30]} />
        <meshStandardMaterial color="#e6c978" />
      </mesh>
    </>
  );
}

// Main scene component
function Scene({ cameraPosition }) {
  return (
    <>
      {/* Environment */}
      <Environment />
      
      {/* Ground */}
      <Ground />
      
      {/* Locker Unit */}
      <LockerUnit position={[0, 0, 0]} />
      
      {/* Lighting */}
      <ambientLight intensity={0.7} />
      <directionalLight 
        position={[10, 15, 10]} 
        intensity={1.2} 
        castShadow 
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight 
        position={[-10, 10, 5]} 
        intensity={0.8} 
        castShadow
      />
      
      {/* Camera */}
      <PerspectiveCamera makeDefault position={cameraPosition} fov={35} />
      
      {/* Controls */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2.1}
        minDistance={5}
        maxDistance={25}
      />
    </>
  );
}

export default function LockerModel() {
  const [cameraPosition, setCameraPosition] = useState([0, 1, 12]);
  
  // Function to change camera view
  const changeCameraView = (view) => {
    switch (view) {
      case 'front':
        setCameraPosition([0, 0, 12]);
        break;
      case 'top':
        setCameraPosition([0, 10, 5]);
        break;
      case 'side':
        setCameraPosition([12, 0, 0]);
        break;
      case 'perspective':
        setCameraPosition([8, 4, 10]);
        break;
      default:
        setCameraPosition([0, 1, 12]);
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">3D Visualization of Beach Lockers</h1>
        
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          <Button 
            onClick={() => changeCameraView('front')}
            variant="outline" 
            className="flex items-center gap-2"
          >
            <Box size={20} />
            Front View
          </Button>
          <Button 
            onClick={() => changeCameraView('top')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Boxes size={20} />
            Top View
          </Button>
          <Button 
            onClick={() => changeCameraView('side')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <TerminalSquare size={20} />
            Side View
          </Button>
          <Button 
            onClick={() => changeCameraView('perspective')}
            variant="default"
            className="flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 9.5V4a1 1 0 0 1 1-1h5.5" />
              <path d="M2 14.5V20a1 1 0 0 0 1 1h5.5" />
              <path d="M15.5 21H20a1 1 0 0 0 1-1v-5.5" />
              <path d="M15.5 3H20a1 1 0 0 1 1 1v5.5" />
            </svg>
            Perspective
          </Button>
        </div>
        
        <div className="relative flex-grow bg-gray-100 rounded-xl overflow-hidden shadow-lg">
          <Canvas shadows gl={{ antialias: true }}>
            <Suspense fallback={null}>
              <Scene cameraPosition={cameraPosition} />
            </Suspense>
          </Canvas>
          
          <div className="absolute bottom-4 left-4 bg-black/50 p-3 rounded-lg backdrop-blur-sm">
            <p className="text-sm text-white">👆 Use mouse to rotate • 🖐️ Scroll to zoom</p>
          </div>
        </div>
      </div>
      
      <footer className="text-center p-4 text-slate-600 bg-slate-200">
        <p>Beach Locker Management System &copy; 2023-2025</p>
      </footer>
    </div>
  );
}
