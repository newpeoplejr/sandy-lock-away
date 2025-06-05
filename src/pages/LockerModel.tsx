
import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { Scene } from '@/components/3d/Scene';
import { ViewControls } from '@/components/3d/ViewControls';

export default function LockerModel() {
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([8, 4, 10]);
  
  // Function to change camera view
  const changeCameraView = (view: 'front' | 'top' | 'side' | 'perspective') => {
    switch (view) {
      case 'front':
        setCameraPosition([0, 2, 15]);
        break;
      case 'top':
        setCameraPosition([0, 12, 8]);
        break;
      case 'side':
        setCameraPosition([15, 2, 0]);
        break;
      case 'perspective':
        setCameraPosition([10, 6, 12]);
        break;
      default:
        setCameraPosition([8, 4, 10]);
    }
  };
  
  return (
    <div className="h-screen w-screen bg-gradient-to-b from-sky-400 to-sky-200 overflow-hidden">
      {/* Header overlay */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/30 to-transparent p-6">
        <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-4 drop-shadow-lg">
          3D Beach Lockers Visualization
        </h1>
        <ViewControls onChangeView={changeCameraView} />
      </div>
      
      {/* Full screen canvas */}
      <div className="h-full w-full">
        <Canvas 
          shadows 
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
          }}
          camera={{ fov: 45 }}
        >
          <Suspense fallback={null}>
            <Scene cameraPosition={cameraPosition} />
          </Suspense>
        </Canvas>
        
        {/* Controls hint */}
        <div className="absolute bottom-6 left-6 bg-black/60 p-4 rounded-xl backdrop-blur-md border border-white/20">
          <p className="text-sm text-white flex items-center gap-2">
            <span className="text-lg">🖱️</span> Вращение • 
            <span className="text-lg">🔍</span> Масштаб • 
            <span className="text-lg">✋</span> Перемещение
          </p>
        </div>
        
        {/* Info panel */}
        <div className="absolute bottom-6 right-6 bg-black/60 p-4 rounded-xl backdrop-blur-md border border-white/20 max-w-xs">
          <h3 className="text-white font-semibold mb-2">Beach Locker System</h3>
          <p className="text-white/80 text-sm">
            45 современных шкафчиков для хранения вещей на пляже с терминалом оплаты
          </p>
        </div>
      </div>
    </div>
  );
}
