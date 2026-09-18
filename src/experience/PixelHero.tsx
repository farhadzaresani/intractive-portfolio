import { useCallback, useRef, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

const EYE_L = new THREE.Vector2(0.415, 0.8)
const EYE_R = new THREE.Vector2(0.528, 0.82)
const RAD_L = new THREE.Vector2(0.036, 0.024)
const RAD_R = new THREE.Vector2(0.038, 0.024)

function comicBalloonShape() {
  const s = new THREE.Shape()
  const w = 0.56
  const h = 0.2
  const r = 0.07
  s.moveTo(-w + r, h)
  s.lineTo(w - r, h)
  s.quadraticCurveTo(w, h, w, h - r)
  s.lineTo(w, -h + r)
  s.quadraticCurveTo(w, -h, w - r, -h)
  s.lineTo(0.04, -h)
  s.lineTo(-0.73, -0.38)
  s.lineTo(-0.16, -h)
  s.lineTo(-w + r, -h)
  s.quadraticCurveTo(-w, -h, -w, -h + r)
  s.lineTo(-w, h - r)
  s.quadraticCurveTo(-w, h, -w + r, h)
  return s
}

const balloonShape = comicBalloonShape()

export function PixelHero() {
  const group = useRef<THREE.Group>(null)
  const look = useRef(new THREE.Vector2())
  const targetLook = useRef(new THREE.Vector2())
  const projected = useRef(new THREE.Vector3())
  const speakUntil = useRef(0)
  const [speaking, setSpeaking] = useState(false)

  const texture = useLoader(THREE.TextureLoader, '/textures/farhad-pixel.png?v=2')

  texture.colorSpace = THREE.SRGBColorSpace
  texture.magFilter = THREE.NearestFilter
  texture.minFilter = THREE.NearestFilter
  texture.generateMipmaps = false
  texture.premultiplyAlpha = false
  texture.needsUpdate = true

  const imgW = texture.image?.width ?? 1287
  const imgH = texture.image?.height ?? 1222
  const aspect = imgW / imgH
  const planeH = 1.5
  const planeW = planeH * aspect

  const onBeforeCompile = useCallback((shader: THREE.WebGLProgramParametersWithUniforms) => {
    shader.uniforms.uLook = { value: look.current }
    shader.uniforms.uEyeL = { value: EYE_L }
    shader.uniforms.uEyeR = { value: EYE_R }
    shader.uniforms.uRadL = { value: RAD_L }
    shader.uniforms.uRadR = { value: RAD_R }
    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
        uniform vec2 uLook;
        uniform vec2 uEyeL;
        uniform vec2 uEyeR;
        uniform vec2 uRadL;
        uniform vec2 uRadR;`,
      )
      .replace(
        '#include <map_fragment>',
        `
        vec2 eyeUv = vMapUv;
        float maskL = 1.0 - smoothstep(0.45, 1.05, length((eyeUv - uEyeL) / uRadL));
        float maskR = 1.0 - smoothstep(0.45, 1.05, length((eyeUv - uEyeR) / uRadR));
        eyeUv -= uLook * 0.011 * max(maskL, maskR);
        vec4 sampledDiffuseColor = texture2D(map, eyeUv);
        diffuseColor *= sampledDiffuseColor;
        `,
      )
  }, [])

  useFrame((state, delta) => {
    if (!group.current) return
    group.current.position.y = 1.2 + Math.sin(state.clock.elapsedTime * 1.2) * 0.01

    group.current.getWorldPosition(projected.current)
    projected.current.project(state.camera)
    const dx = state.pointer.x - projected.current.x
    const dy = state.pointer.y - projected.current.y
    targetLook.current.set(
      THREE.MathUtils.clamp(dx / 0.7, -1, 1),
      THREE.MathUtils.clamp(dy / 0.7, -1, 1),
    )
    look.current.lerp(targetLook.current, 1 - Math.exp(-delta * 8))

    if (speaking && performance.now() > speakUntil.current) setSpeaking(false)
  })

  return (
    <group ref={group} position={[2.05, 1.2, -1.15]}>
      <mesh
        renderOrder={2}
        onClick={(e) => {
          e.stopPropagation()
          speakUntil.current = performance.now() + 4200
          setSpeaking(true)
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto'
        }}
      >
        <planeGeometry args={[planeW, planeH]} />
        <meshBasicMaterial
          map={texture}
          transparent
          alphaTest={0.1}
          depthWrite
          depthTest
          side={THREE.FrontSide}
          toneMapped={false}
          onBeforeCompile={onBeforeCompile}
          customProgramCacheKey={() => 'pixel-eyes-only'}
        />
      </mesh>

      {speaking && (
        <group position={[0.72, 0.7, 0.08]} renderOrder={3}>
          <mesh position={[0.018, -0.018, -0.006]} renderOrder={3}>
            <shapeGeometry args={[balloonShape]} />
            <meshBasicMaterial color="#111111" toneMapped={false} side={THREE.DoubleSide} />
          </mesh>
          <mesh renderOrder={4}>
            <shapeGeometry args={[balloonShape]} />
            <meshBasicMaterial color="#fff8ee" toneMapped={false} side={THREE.DoubleSide} />
          </mesh>
          <Text
            position={[0, 0.055, 0.01]}
            fontSize={0.052}
            color="#111111"
            anchorX="center"
            anchorY="middle"
            maxWidth={1}
          >
            OPEN TO WORK?
          </Text>
          <Text
            position={[0, -0.055, 0.01]}
            fontSize={0.062}
            color="#111111"
            anchorX="center"
            anchorY="middle"
            maxWidth={1}
          >
            NOT RIGHT NOW.
          </Text>
        </group>
      )}
    </group>
  )
}
