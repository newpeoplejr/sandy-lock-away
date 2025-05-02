
import { LockerDoor } from './LockerDoor';

interface LockerUnitProps {
  position: [number, number, number];
}

export function LockerUnit({ position }: LockerUnitProps) {
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
