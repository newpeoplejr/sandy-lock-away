
import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { Scene } from '@/components/3d/Scene';
import { ViewControls } from '@/components/3d/ViewControls';

export default function LockerModel() {
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 1, 12]);
  
  // Function to change camera view
  const changeCameraView = (view: 'front' | 'top' | 'side' | 'perspective') => {
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
        
        <ViewControls onChangeView={changeCameraView} />
        
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
