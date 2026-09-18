import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import type { PanelId } from '../data/resume'
import { usePortfolio } from '../data/portfolioContext'

type Props = {
  id: PanelId
  label: string
  screenColor: string
  position: [number, number, number]
  rotation: [number, number, number]
}

export function InteractiveCRT({
  id,
  label,
  screenColor,
  position,
  rotation,
}: Props) {
  const { openPanel, activePanel, hoveredMonitor, setHoveredMonitor, phase } =
    usePortfolio()
  const screenRef = useRef<THREE.MeshStandardMaterial>(null)
  const active = activePanel === id
  const hovered = hoveredMonitor === id

  const bodyColor = useMemo(() => '#2b2b2b', [])

  useFrame(({ clock }) => {
    if (!screenRef.current) return
    const pulse = 0.55 + Math.sin(clock.elapsedTime * 3 + position[0]) * 0.12
    const boost = hovered || active ? 1.35 : 1
    screenRef.current.emissiveIntensity = pulse * boost
  })

  return (
    <group position={position} rotation={rotation}>
      {/* chassis */}
      <mesh castShadow receiveShadow position={[0, 0, -0.08]}>
        <boxGeometry args={[0.95, 0.85, 0.55]} />
        <meshStandardMaterial color={bodyColor} roughness={0.7} metalness={0.15} />
      </mesh>
      {/* bezel */}
      <mesh position={[0, 0.05, 0.2]}>
        <boxGeometry args={[0.82, 0.62, 0.08]} />
        <meshStandardMaterial color="#121212" roughness={0.9} />
      </mesh>
      {/* screen */}
      <mesh
        position={[0, 0.05, 0.25]}
        onClick={(e) => {
          e.stopPropagation()
          if (phase !== 'room') return
          openPanel(id)
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          if (phase !== 'room') return
          setHoveredMonitor(id)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHoveredMonitor(null)
          document.body.style.cursor = 'auto'
        }}
      >
        <planeGeometry args={[0.7, 0.5]} />
        <meshStandardMaterial
          ref={screenRef}
          color={screenColor}
          emissive={screenColor}
          emissiveIntensity={0.6}
          roughness={0.35}
          metalness={0.1}
        />
      </mesh>
      <Text
        position={[0, 0.05, 0.27]}
        fontSize={0.1}
        color="#0b0b0b"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.04}
      >
        {label}
      </Text>
      {/* stand */}
      <mesh position={[0, -0.55, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 0.35, 8]} />
        <meshStandardMaterial color="#1c1c1c" />
      </mesh>
      <mesh position={[0, -0.75, 0.05]} castShadow receiveShadow>
        <boxGeometry args={[0.55, 0.06, 0.35]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  )
}
