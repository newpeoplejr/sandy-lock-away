
import { PerspectiveCamera, OrbitControls, Sky, Cloud } from '@react-three/drei';
import { Environment } from './Environment';
import { Ground } from './Ground';
import { LockerUnit } from './LockerUnit';
import * as THREE from 'three';

interface SceneProps {
  cameraPosition: [number, number, number];
}

export function Scene({ cameraPosition }: SceneProps) {
  return (
    <>
      {/* Sky and atmosphere */}
      <Sky
        distance={450000}
        sunPosition={[100, 20, 100]}
        inclination={0}
        azimuth={0.25}
        turbidity={10}
        rayleigh={2}
      />
      
      {/* Clouds */}
      <Cloud
        position={[-20, 15, -30]}
        speed={0.2}
        opacity={0.6}
        width={10}
        depth={8}
      />
      <Cloud
        position={[15, 12, -25]}
        speed={0.15}
        opacity={0.4}
        width={8}
        depth={6}
      />
      
      {/* Environment */}
      <Environment />
      
      {/* Ground */}
      <Ground />
      
      {/* Locker Unit */}
      <LockerUnit position={[0, 0, 0]} />
      
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.3} color="#87CEEB" />
      
      {/* Main sun light */}
      <directionalLight 
        position={[50, 30, 20]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={100}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        color="#FFF8DC"
      />
      
      {/* Fill light */}
      <directionalLight 
        position={[-20, 15, 10]} 
        intensity={0.6} 
        color="#87CEEB"
      />
      
      {/* Rim light */}
      <directionalLight 
        position={[10, 5, -15]} 
        intensity={0.4} 
        color="#FFE4B5"
      />
      
      {/* Point lights for atmosphere */}
      <pointLight position={[0, 10, 15]} intensity={0.3} color="#FFF8DC" />
      <pointLight position={[-10, 5, -10]} intensity={0.2} color="#87CEEB" />
      
      {/* Camera */}
      <PerspectiveCamera makeDefault position={cameraPosition} fov={45} />
      
      {/* Enhanced Controls */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={8}
        maxDistance={35}
        target={[0, 1, 0]}
        enableDamping={true}
        dampingFactor={0.05}
        rotateSpeed={0.5}
        panSpeed={0.8}
        zoomSpeed={0.6}
      />
      
      {/* Fog for depth */}
      <fog attach="fog" args={['#87CEEB', 30, 100]} />
    </>
  );
}
