import { useRef } from 'react'
import {  useLoader } from '@react-three/fiber'
import * as THREE from 'three'

export function PixelHero() {
  const group = useRef<THREE.Group>(null)
  const texture = useLoader(THREE.TextureLoader, '/textures/farhad-pixel.png?v=5')

  texture.colorSpace = THREE.SRGBColorSpace
  texture.magFilter = THREE.NearestFilter
  texture.minFilter = THREE.NearestFilter
  texture.generateMipmaps = false
  texture.premultiplyAlpha = false
  texture.needsUpdate = true



  return (
    <group ref={group} position={[0, 1.22, -1.38]} scale={0.95}>
      <mesh renderOrder={2}>
        <planeGeometry args={[1.5, 1.85]} />
        <meshBasicMaterial
          map={texture}
          transparent
          // Lower threshold so dark hand pixels stay solid
          alphaTest={0.02}
          depthWrite
          depthTest
          side={THREE.FrontSide}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}
