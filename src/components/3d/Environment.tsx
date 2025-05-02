
export function Environment() {
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
