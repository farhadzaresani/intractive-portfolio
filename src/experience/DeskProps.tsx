import { useMemo } from 'react'
import * as THREE from 'three'

function CoffeeCup({ position }: { position: [number, number, number] }) {
  const cupGeom = useMemo(() => {
    const pts = [
      new THREE.Vector2(0.0, 0.0),
      new THREE.Vector2(0.075, 0.0),
      new THREE.Vector2(0.082, 0.015),
      new THREE.Vector2(0.088, 0.12),
      new THREE.Vector2(0.09, 0.2),
      new THREE.Vector2(0.078, 0.205),
      new THREE.Vector2(0.072, 0.195),
      new THREE.Vector2(0.07, 0.12),
      new THREE.Vector2(0.065, 0.03),
      new THREE.Vector2(0.0, 0.025),
    ]
    return new THREE.LatheGeometry(pts, 32)
  }, [])

  const handleCurve = useMemo(
    () =>
      new THREE.CubicBezierCurve3(
        new THREE.Vector3(0.088, 0.155, 0),
        new THREE.Vector3(0.175, 0.17, 0),
        new THREE.Vector3(0.175, 0.04, 0),
        new THREE.Vector3(0.088, 0.045, 0),
      ),
    [],
  )

  const handleGeom = useMemo(
    () => new THREE.TubeGeometry(handleCurve, 24, 0.012, 10, false),
    [handleCurve],
  )

  return (
    <group position={position}>
      <mesh geometry={cupGeom} castShadow receiveShadow>
        <meshStandardMaterial color="#f5efe4" roughness={0.45} metalness={0.02} />
      </mesh>
      <mesh position={[0, 0.155, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.068, 28]} />
        <meshStandardMaterial color="#3c2415" roughness={0.95} />
      </mesh>
      <mesh position={[0.015, 0.158, 0.01]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.025, 16]} />
        <meshStandardMaterial color="#c9a882" roughness={0.85} transparent opacity={0.7} />
      </mesh>
      <mesh geometry={handleGeom} castShadow>
        <meshStandardMaterial color="#f5efe4" roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.005, 0]} receiveShadow>
        <cylinderGeometry args={[0.145, 0.155, 0.016, 28]} />
        <meshStandardMaterial color="#efe6d6" roughness={0.55} />
      </mesh>
      <mesh position={[0, 0.014, 0]} receiveShadow>
        <cylinderGeometry args={[0.095, 0.1, 0.01, 28]} />
        <meshStandardMaterial color="#e5dac8" roughness={0.6} />
      </mesh>
    </group>
  )
}

function PaperAndPen({ position }: { position: [number, number, number] }) {
  const lines = useMemo(() => [0, 1, 2, 3, 4, 5, 6], [])

  return (
    <group position={position} rotation={[0, -0.2, 0]}>
      {/* Sheet */}
      <mesh position={[0, 0.006, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <planeGeometry args={[0.55, 0.72]} />
        <meshStandardMaterial color="#f4efe4" roughness={0.85} />
      </mesh>

      {/* Slight second sheet under for thickness */}
      <mesh position={[0.01, 0.003, -0.01]} rotation={[-Math.PI / 2, 0, 0.04]} receiveShadow>
        <planeGeometry args={[0.55, 0.72]} />
        <meshStandardMaterial color="#e8e0d2" roughness={0.9} />
      </mesh>

      {/* Ruled lines */}
      {lines.map((i) => (
        <mesh
          key={i}
          position={[0, 0.008, -0.24 + i * 0.08]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.44, 0.004]} />
          <meshStandardMaterial color="#c9b8a0" roughness={1} />
        </mesh>
      ))}

      {/* Margin line */}
      <mesh position={[-0.18, 0.008, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[0.58, 0.004]} />
        <meshStandardMaterial color="#e07a6a" roughness={1} />
      </mesh>

      {/* Pen body */}
      <group position={[0.22, 0.02, 0.08]} rotation={[0, 0.35, Math.PI / 2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.38, 12]} />
          <meshStandardMaterial color="#1a3a5c" roughness={0.35} metalness={0.15} />
        </mesh>
        {/* tip — cone points outward from the barrel */}
        <mesh position={[0, -0.21, 0]} rotation={[Math.PI, 0, 0]} castShadow>
          <coneGeometry args={[0.01, 0.05, 10]} />
          <meshStandardMaterial color="#c0c0c0" roughness={0.3} metalness={0.6} />
        </mesh>
        {/* nib */}
        <mesh position={[0, -0.24, 0]} rotation={[Math.PI, 0, 0]} castShadow>
          <coneGeometry args={[0.004, 0.02, 8]} />
          <meshStandardMaterial color="#222" roughness={0.5} />
        </mesh>
        {/* clip at the opposite end */}
        <mesh position={[0.012, 0.14, 0]} castShadow>
          <boxGeometry args={[0.004, 0.08, 0.012]} />
          <meshStandardMaterial color="#b0b0b0" roughness={0.3} metalness={0.5} />
        </mesh>
      </group>
    </group>
  )
}

export function DeskProps() {
  return (
    <group position={[0, 0.79, 0.72]}>
      <PaperAndPen position={[0.05, 0, 0.02]} />
      <CoffeeCup position={[-0.85, 0.0, 0.05]} />
    </group>
  )
}
