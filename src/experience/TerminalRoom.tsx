import { Text } from '@react-three/drei'
import { monitors } from '../data/resume'
import { DeskProps } from './DeskProps'
import { InteractiveCRT } from './InteractiveCRT'
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

      <VoxelBox args={[2.6, 0.55, 0.06]} position={[0, 2.85, -2.05]} color="#1a1008" />
      <Text
        position={[0, 2.85, -2.0]}
        fontSize={0.14}
        color="#d87e0c"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
      >
        FARHAD ZARE
      </Text>

      {monitors.map((m) => (
        <InteractiveCRT key={m.id} {...m} />
      ))}

      <PixelHero />
    </group>
  )
}
