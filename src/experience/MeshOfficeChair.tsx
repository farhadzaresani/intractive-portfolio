import type { ReactNode } from 'react'

function MeshPanel({
  width,
  height,
  position,
}: {
  width: number
  height: number
  position: [number, number, number]
}) {
  const cols = 7
  const rows = 9
  const lines: ReactNode[] = []

  for (let i = 0; i <= cols; i++) {
    const x = -width / 2 + (i / cols) * width
    lines.push(
      <mesh key={`v${i}`} position={[x, 0, 0.01]} castShadow>
        <boxGeometry args={[0.012, height, 0.012]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.55} metalness={0.25} />
      </mesh>,
    )
  }
  for (let j = 0; j <= rows; j++) {
    const y = -height / 2 + (j / rows) * height
    lines.push(
      <mesh key={`h${j}`} position={[0, y, 0.01]} castShadow>
        <boxGeometry args={[width, 0.012, 0.012]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.55} metalness={0.25} />
      </mesh>,
    )
  }

  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[width, height, 0.03]} />
        <meshStandardMaterial
          color="#2c2c2c"
          roughness={0.85}
          metalness={0.05}
          transparent
          opacity={0.72}
        />
      </mesh>
      {lines}
    </group>
  )
}

export function MeshOfficeChair() {
  return (
    <group position={[0, 0, -1.62]}>
      <mesh position={[0, 0.52, 0.12]} castShadow receiveShadow>
        <boxGeometry args={[0.72, 0.08, 0.62]} />
        <meshStandardMaterial color="#111" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.57, 0.12]} castShadow>
        <boxGeometry args={[0.68, 0.04, 0.58]} />
        <meshStandardMaterial color="#1c1c1c" roughness={0.8} />
      </mesh>

      <mesh position={[-0.34, 1.05, -0.12]} castShadow>
        <boxGeometry args={[0.05, 1.05, 0.05]} />
        <meshStandardMaterial color="#0d0d0d" roughness={0.4} metalness={0.4} />
      </mesh>
      <mesh position={[0.34, 1.05, -0.12]} castShadow>
        <boxGeometry args={[0.05, 1.05, 0.05]} />
        <meshStandardMaterial color="#0d0d0d" roughness={0.4} metalness={0.4} />
      </mesh>

      <mesh position={[0, 1.58, -0.12]} castShadow>
        <boxGeometry args={[0.78, 0.07, 0.07]} />
        <meshStandardMaterial color="#0d0d0d" roughness={0.4} metalness={0.45} />
      </mesh>
      <mesh position={[0, 1.64, -0.12]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.36, 0.035, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#0d0d0d" roughness={0.4} metalness={0.45} />
      </mesh>

      <MeshPanel width={0.62} height={0.85} position={[0, 1.12, -0.1]} />
      <MeshPanel width={0.5} height={0.28} position={[0, 0.78, -0.06]} />

      <mesh position={[-0.42, 0.78, 0.08]} castShadow>
        <boxGeometry args={[0.06, 0.36, 0.06]} />
        <meshStandardMaterial color="#0d0d0d" roughness={0.4} metalness={0.4} />
      </mesh>
      <mesh position={[0.42, 0.78, 0.08]} castShadow>
        <boxGeometry args={[0.06, 0.36, 0.06]} />
        <meshStandardMaterial color="#0d0d0d" roughness={0.4} metalness={0.4} />
      </mesh>
      <mesh position={[-0.42, 0.96, 0.18]} castShadow>
        <boxGeometry args={[0.08, 0.05, 0.42]} />
        <meshStandardMaterial color="#151515" roughness={0.65} />
      </mesh>
      <mesh position={[0.42, 0.96, 0.18]} castShadow>
        <boxGeometry args={[0.08, 0.05, 0.42]} />
        <meshStandardMaterial color="#151515" roughness={0.65} />
      </mesh>

      <mesh position={[0, 0.28, 0.1]} castShadow>
        <cylinderGeometry args={[0.045, 0.05, 0.4, 10]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.3} metalness={0.7} />
      </mesh>

      {[0, 72, 144, 216, 288].map((deg) => {
        const rad = (deg * Math.PI) / 180
        return (
          <group key={deg} rotation={[0, rad, 0]}>
            <mesh position={[0.28, 0.07, 0]} castShadow>
              <boxGeometry args={[0.5, 0.04, 0.06]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.35} metalness={0.5} />
            </mesh>
            <mesh position={[0.5, 0.06, 0]} castShadow>
              <cylinderGeometry args={[0.05, 0.05, 0.06, 10]} />
              <meshStandardMaterial color="#222" roughness={0.5} metalness={0.4} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}
