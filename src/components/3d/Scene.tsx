
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { Environment } from './Environment';
import { Ground } from './Ground';
import { LockerUnit } from './LockerUnit';

interface SceneProps {
  cameraPosition: [number, number, number];
}

export function Scene({ cameraPosition }: SceneProps) {
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
