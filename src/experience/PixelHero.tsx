import { useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'

export function PixelHero() {
  const group = useRef<THREE.Group>(null)
  // Transparent-background source image (original colors)
  const texture = useLoader(THREE.TextureLoader, '/textures/farhad-hero.png?v=2')

  texture.colorSpace = THREE.SRGBColorSpace
  texture.magFilter = THREE.NearestFilter
  texture.minFilter = THREE.NearestFilter
  texture.generateMipmaps = false
  texture.premultiplyAlpha = false
  texture.needsUpdate = true

  const imgW = texture.image?.width ?? 1448
  const imgH = texture.image?.height ?? 1086
  const aspect = imgW / imgH
  const planeH = 1.25
  const planeW = planeH * aspect

  useFrame(({ clock }) => {
    if (!group.current) return
    group.current.position.y = 1.2 + Math.sin(clock.elapsedTime * 1.2) * 0.02
  })

  return (
    <group ref={group} position={[0, 1.2, -1.38]}>
      <mesh renderOrder={2}>
        <planeGeometry args={[planeW, planeH]} />
        <meshBasicMaterial
          map={texture}
          transparent
          alphaTest={0.1}
          depthWrite
          depthTest
          side={THREE.FrontSide}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}
