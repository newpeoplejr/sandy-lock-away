
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useState } from 'react';
import { Box, Boxes, TerminalSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

// Component for a simple locker
function Locker({ position, color = "#4e7dbe" }) {
  return (
    <group position={position}>
      {/* Base of the locker */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1, 2, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Door */}
      <mesh position={[0.5, 0, 0]} castShadow>
        <boxGeometry args={[0.05, 1.9, 0.9]} />
        <meshStandardMaterial color="#2c4c7c" />
      </mesh>
      
      {/* Handle */}
      <mesh position={[0.55, 0, 0.3]} castShadow>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color="gold" />
      </mesh>
    </group>
  );
}

// Terminal component
function Terminal({ position }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.8, 3, 0.8]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      
      {/* Screen */}
      <mesh position={[0, 0.7, 0.41]} castShadow>
        <boxGeometry args={[0.6, 0.8, 0.01]} />
        <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.2} />
      </mesh>
      
      {/* Scanner */}
      <mesh position={[0, 0, 0.41]} castShadow>
        <boxGeometry args={[0.3, 0.3, 0.05]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </group>
  );
}

// Scene component
function Scene({ cameraPosition }) {
  return (
    <>
      {/* Floor */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -1.01, 0]} 
        receiveShadow
      >
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f0f9ff" />
      </mesh>

      {/* Lockers - Left Front Row */}
      {Array.from({ length: 5 }).map((_, i) => (
        <Locker 
          key={`left-front-${i}`} 
          position={[-6, 0, -4 + i * 1.2 - 2.4]} 
          color="#4e7dbe"
        />
      ))}

      {/* Lockers - Left Back Row */}
      {Array.from({ length: 5 }).map((_, i) => (
        <Locker 
          key={`left-back-${i}`} 
          position={[-6, 0, 4 + i * 1.2 - 2.4]} 
          color="#4e7dbe"
        />
      ))}

      {/* Lockers - Right Front Row */}
      {Array.from({ length: 5 }).map((_, i) => (
        <Locker 
          key={`right-front-${i}`} 
          position={[4, 0, -4 + i * 1.2 - 2.4]} 
          color="#4e7dbe"
        />
      ))}

      {/* Lockers - Right Back Row */}
      {Array.from({ length: 5 }).map((_, i) => (
        <Locker 
          key={`right-back-${i}`} 
          position={[4, 0, 4 + i * 1.2 - 2.4]} 
          color="#4e7dbe"
        />
      ))}

      {/* Terminal in the center */}
      <Terminal position={[0, 0, 0]} />
      
      {/* Scene lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={0.8} castShadow />
      <directionalLight position={[-10, 10, -10]} intensity={0.8} castShadow />

      {/* Camera */}
      <PerspectiveCamera makeDefault position={cameraPosition} />
      
      {/* Controls */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
}

export default function LockerModel() {
  const [cameraPosition, setCameraPosition] = useState([0, 5, 10]);
  
  // Function to change camera view
  const changeCameraView = (view) => {
    switch (view) {
      case 'front':
        setCameraPosition([0, 3, 12]);
        break;
      case 'top':
        setCameraPosition([0, 12, 0]);
        break;
      case 'side':
        setCameraPosition([12, 3, 0]);
        break;
      default:
        setCameraPosition([0, 5, 10]);
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">3D Visualization of Lockers</h1>
        
        <div className="flex flex-wrap gap-4 mb-4 justify-center">
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
        </div>
        
        <div className="relative flex-grow bg-slate-800/50 rounded-xl overflow-hidden backdrop-blur-sm shadow-xl">
          <Canvas shadows>
            <Suspense fallback={null}>
              <Scene cameraPosition={cameraPosition} />
            </Suspense>
          </Canvas>
          
          <div className="absolute bottom-4 left-4 bg-black/50 p-3 rounded-lg backdrop-blur-sm">
            <p className="text-sm text-white">👆 Use mouse to rotate • 🖐️ Scroll to zoom</p>
          </div>
        </div>
      </div>
      
      <footer className="text-center p-4 text-slate-400 bg-slate-900/60">
        <p>Beach Locker Management System &copy; 2023-2025</p>
      </footer>
    </div>
  );
}
