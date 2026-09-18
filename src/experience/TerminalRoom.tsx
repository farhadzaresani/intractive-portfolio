import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { DeskProps } from './DeskProps'
import { DosCRT } from './DosCRT'
import { PixelHero } from './PixelHero'

function VoxelBox({
  args,
  position,
  color,
  roughness = 0.85,
}: {
  args: [number, number, number]
  position: [number, number, number]
  color: string
  roughness?: number
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} roughness={roughness} />
    </mesh>
  )
}

function NeonNameSign() {
  const glow = useRef<THREE.PointLight>(null)
  const flicker = useRef(1)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const dip = Math.sin(t * 17.3) > 0.985 ? 0.55 : 1
    const pulse = 0.82 + Math.sin(t * 2.4) * 0.08 + Math.sin(t * 6.1) * 0.04
    flicker.current = THREE.MathUtils.lerp(flicker.current, pulse * dip, 0.25)
    if (glow.current) glow.current.intensity = 1.8 * flicker.current
  })

  const neon = '#ff6a18'
  const hot = '#ffd4a0'

  return (
    <group position={[0, 2.85, -2.0]}>
      <mesh position={[0, 0, -0.05]} castShadow receiveShadow>
        <boxGeometry args={[2.85, 0.72, 0.08]} />
        <meshStandardMaterial color="#0c0806" roughness={0.9} metalness={0.15} />
      </mesh>
      <mesh position={[0, 0, -0.01]}>
        <boxGeometry args={[2.55, 0.48, 0.04]} />
        <meshStandardMaterial color="#160e0a" roughness={0.85} />
      </mesh>

      <Text
        position={[0, 0.01, 0.02]}
        fontSize={0.175}
        color={neon}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.1}
        fillOpacity={0.22}
        outlineWidth={0.04}
        outlineColor={neon}
        outlineOpacity={0.35}
      >
        FARHAD ZARE
      </Text>
      <Text
        position={[0, 0.01, 0.03]}
        fontSize={0.175}
        color={neon}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.1}
        fillOpacity={0.45}
        outlineWidth={0.018}
        outlineColor={neon}
        outlineOpacity={0.7}
      >
        FARHAD ZARE
      </Text>
      <Text
        position={[0, 0.01, 0.045]}
        fontSize={0.175}
        color={hot}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.1}
        outlineWidth={0.006}
        outlineColor={neon}
        outlineOpacity={1}
      >
        FARHAD ZARE
      </Text>

      <pointLight
        ref={glow}
        position={[0, 0, 0.35]}
        color={neon}
        intensity={1.8}
        distance={4.5}
        decay={2}
      />
    </group>
  )
}

export function TerminalRoom() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial color="#3d2918" roughness={0.95} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 1.2]} receiveShadow>
        <planeGeometry args={[14, 0.18]} />
        <meshStandardMaterial color="#d87e0c" roughness={0.7} />
      </mesh>

      <mesh position={[0, 2.2, -2.2]} receiveShadow>
        <boxGeometry args={[12, 4.5, 0.25]} />
        <meshStandardMaterial color="#5a3418" roughness={0.9} />
      </mesh>
      <mesh position={[-5.5, 2.2, 0.5]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[6, 4.5, 0.25]} />
        <meshStandardMaterial color="#4a2c14" roughness={0.9} />
      </mesh>
      <mesh position={[5.5, 2.2, 0.5]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[6, 4.5, 0.25]} />
        <meshStandardMaterial color="#4a2c14" roughness={0.9} />
      </mesh>

      <VoxelBox args={[6.4, 0.14, 1.35]} position={[0, 0.72, 0.45]} color="#6b4a2e" />
      <VoxelBox args={[0.14, 0.72, 1.25]} position={[-3.0, 0.36, 0.45]} color="#4a3220" />
      <VoxelBox args={[0.14, 0.72, 1.25]} position={[3.0, 0.36, 0.45]} color="#4a3220" />

      <DeskProps />

      <VoxelBox args={[1.8, 1.1, 0.08]} position={[-3.2, 2.5, -2.05]} color="#3a2412" />
      <VoxelBox args={[1.8, 1.1, 0.08]} position={[3.2, 2.5, -2.05]} color="#3a2412" />

      <NeonNameSign />

      <DosCRT />
      <PixelHero />
    </group>
  )
}
