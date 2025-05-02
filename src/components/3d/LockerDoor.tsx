
import * as THREE from 'three';

interface LockerDoorProps {
  position: [number, number, number];
  size: [number, number];
  color?: string;
  number: number;
}

export function LockerDoor({ position, size, color = "#ea384c", number }: LockerDoorProps) {
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
