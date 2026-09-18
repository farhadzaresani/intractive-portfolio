import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import * as THREE from 'three'
import { CameraRig } from './CameraRig'
import { TerminalRoom } from './TerminalRoom'

export function Scene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [0, 1.95, 6.6], fov: 42, near: 0.1, far: 40 }}
      gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace
        gl.toneMappingExposure = 1.05
      }}
      style={{ width: '100%', height: '100%' }}
    >
      <color attach="background" args={['#1a0f08']} />
      <fog attach="fog" args={['#1a0f08', 7, 16]} />

      <hemisphereLight args={['#f0c090', '#1a0f08', 0.35]} />
      <ambientLight intensity={0.2} />
      <directionalLight
        castShadow
        position={[3.5, 6, 4]}
        intensity={1.2}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={20}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
      />
      <directionalLight position={[-4, 3, 2]} intensity={0.35} color="#a8c4ff" />
      <directionalLight position={[0, 2.5, -4]} intensity={0.45} color="#d87e0c" />
      <pointLight position={[0, 2.2, 0.5]} intensity={1.1} color="#d87e0c" distance={8} />
      <pointLight position={[-2.2, 1.4, 0.4]} intensity={0.45} color="#2a9d8f" distance={4} />
      <pointLight position={[2.2, 1.4, 0.4]} intensity={0.45} color="#e76f51" distance={4} />

      <Suspense fallback={null}>
        <TerminalRoom />
      </Suspense>
      <CameraRig />
    </Canvas>
  )
}
