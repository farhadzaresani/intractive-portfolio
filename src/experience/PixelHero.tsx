import { useMemo, useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform sampler2D map;
  varying vec2 vUv;
  void main() {
    vec4 tex = texture2D(map, vUv);
    // Honor real alpha if present
    if (tex.a < 0.08) discard;
    // Only drop pure black plate — keep dark clothes
    float luma = max(tex.r, max(tex.g, tex.b));
    if (tex.a > 0.9 && luma < 0.04) discard;
    gl_FragColor = vec4(tex.rgb, tex.a);
  }
`

export function PixelHero() {
  const group = useRef<THREE.Group>(null)
  const texture = useLoader(THREE.TextureLoader, '/textures/farhad-pixel.png?v=9')

  texture.colorSpace = THREE.SRGBColorSpace
  texture.magFilter = THREE.NearestFilter
  texture.minFilter = THREE.NearestFilter
  texture.generateMipmaps = false
  texture.needsUpdate = true

  const uniforms = useMemo(() => ({ map: { value: texture } }), [texture])

  // Keep plane aspect equal to the texture so nothing stretches
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
    <group ref={group} position={[0, 1.2, -1.38]} scale={1}>
      <mesh renderOrder={2}>
        <planeGeometry args={[planeW, planeH]} />
        <shaderMaterial
          transparent
          depthWrite
          depthTest
          side={THREE.FrontSide}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
    </group>
  )
}
