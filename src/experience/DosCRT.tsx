import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { crtMonitor } from '../data/resume'
import { usePortfolio } from '../data/portfolioContext'
import { CrtIdlePreview } from './CrtScreenUi'

const BEIGE = '#e5e0d8'
const BEIGE_MID = '#d8d0c4'
const BEIGE_DARK = '#c9bfb0'
const BEIGE_SHADOW = '#b5aa98'
const KEY = '#ebe6dc'
const METAL = '#8a8a8a'

function Plastic({
  color = BEIGE,
  roughness = 0.72,
}: {
  color?: string
  roughness?: number
}) {
  return <meshStandardMaterial color={color} roughness={roughness} metalness={0.04} />
}

function Screw({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.008, 0.008, 0.006, 8]} />
      <meshStandardMaterial color="#9a9080" roughness={0.4} metalness={0.45} />
    </mesh>
  )
}

function SpeakerGrille({ position }: { position: [number, number, number] }) {
  const holes = useMemo(() => {
    const pts: [number, number][] = []
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 8; col++) {
        pts.push([-0.055 + col * 0.016, -0.022 + row * 0.014])
      }
    }
    return pts
  }, [])

  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.16, 0.07, 0.018]} />
        <meshStandardMaterial color="#3d3d3d" roughness={0.88} />
      </mesh>
      {holes.map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.01]}>
          <cylinderGeometry args={[0.0045, 0.0045, 0.008, 6]} />
          <meshStandardMaterial color="#151515" roughness={1} />
        </mesh>
      ))}
    </group>
  )
}

function FloppyDrive({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* bay face */}
      <mesh>
        <boxGeometry args={[0.42, 0.07, 0.025]} />
        <meshStandardMaterial color="#333" roughness={0.75} metalness={0.2} />
      </mesh>
      {/* slot */}
      <mesh position={[0, 0.005, 0.014]}>
        <boxGeometry args={[0.34, 0.014, 0.01]} />
        <meshStandardMaterial color="#0d0d0d" roughness={1} />
      </mesh>
      {/* metal shutter hint */}
      <mesh position={[0, 0.005, 0.02]}>
        <boxGeometry args={[0.12, 0.01, 0.004]} />
        <meshStandardMaterial color={METAL} roughness={0.35} metalness={0.55} />
      </mesh>
      {/* eject button */}
      <mesh position={[0.175, 0, 0.016]}>
        <boxGeometry args={[0.035, 0.035, 0.012]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.6} />
      </mesh>
      {/* activity LED */}
      <mesh position={[0.175, -0.022, 0.016]}>
        <boxGeometry args={[0.018, 0.008, 0.006]} />
        <meshStandardMaterial color="#1a1a1a" emissive="#221100" emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}

function KeyCap({
  position,
  w = 0.042,
  d = 0.042,
  h = 0.016,
}: {
  position: [number, number, number]
  w?: number
  d?: number
  h?: number
}) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color={KEY} roughness={0.68} />
      </mesh>
      {/* slightly lighter top face to suggest sculpt */}
      <mesh position={[0, h * 0.52, 0]}>
        <boxGeometry args={[w * 0.88, 0.002, d * 0.88]} />
        <meshStandardMaterial color="#f4f0e8" roughness={0.55} />
      </mesh>
    </group>
  )
}

/** Full vintage desktop with CRT, pizza-box case, keyboard, mouse */
export function DosCRT() {
  const { phase, focusMonitor, monitorFocused, hoveredMonitor, setHoveredMonitor } =
    usePortfolio()
  const screenRef = useRef<THREE.MeshBasicMaterial>(null)
  const screenMesh = useRef<THREE.Mesh>(null)
  const corner = useRef(new THREE.Vector3())
  const { position, rotation } = crtMonitor

  useFrame(({ clock, camera, gl }) => {
    if (screenRef.current) {
      const pulse = 0.55 + Math.sin(clock.elapsedTime * 2.5) * 0.12
      const boost = hoveredMonitor || monitorFocused ? 1.15 : 1
      const g = 0.12 * pulse * boost
      screenRef.current.color.setRGB(0.02 * boost, g, 0.04 * boost)
    }

    const el = document.getElementById('crt-overlay')
    const mesh = screenMesh.current
    if (!el || !mesh || !monitorFocused) return

    const bounds = gl.domElement.getBoundingClientRect()
    const hw = 0.37
    const hh = 0.27
    const locals: [number, number, number][] = [
      [-hw, hh, 0],
      [hw, hh, 0],
      [hw, -hh, 0],
      [-hw, -hh, 0],
    ]
    let minX = Infinity
    let minY = Infinity
    let maxX = -Infinity
    let maxY = -Infinity
    for (const [x, y, z] of locals) {
      corner.current.set(x, y, z)
      mesh.localToWorld(corner.current)
      corner.current.project(camera)
      const px = bounds.left + (corner.current.x * 0.5 + 0.5) * bounds.width
      const py = bounds.top + (-corner.current.y * 0.5 + 0.5) * bounds.height
      minX = Math.min(minX, px)
      maxX = Math.max(maxX, px)
      minY = Math.min(minY, py)
      maxY = Math.max(maxY, py)
    }
    const width = Math.max(0, maxX - minX)
    const height = Math.max(0, maxY - minY)
    el.style.left = `${minX + width * 0.04}px`
    el.style.top = `${minY + height * 0.06}px`
    el.style.width = `${width * 0.92}px`
    el.style.height = `${height * 0.88}px`
  })

  const mouseCord = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.68, 0.035, 0.78),
      new THREE.Vector3(0.55, 0.02, 0.55),
      new THREE.Vector3(0.45, 0.04, 0.15),
      new THREE.Vector3(0.35, 0.08, -0.35),
    ])
    return new THREE.TubeGeometry(curve, 24, 0.006, 6, false)
  }, [])

  const kbCord = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.04, 0.52),
      new THREE.Vector3(-0.05, 0.03, 0.25),
      new THREE.Vector3(-0.12, 0.06, -0.15),
      new THREE.Vector3(-0.2, 0.1, -0.45),
    ])
    return new THREE.TubeGeometry(curve, 20, 0.007, 6, false)
  }, [])

  const mainKeys = useMemo(() => {
    const rows: { z: number; offsets: number[]; widths?: number[] }[] = [
      { z: 0.12, offsets: Array.from({ length: 13 }, (_, i) => -0.3 + i * 0.05) },
      {
        z: 0.065,
        offsets: Array.from({ length: 13 }, (_, i) => -0.285 + i * 0.05),
      },
      {
        z: 0.01,
        offsets: Array.from({ length: 12 }, (_, i) => -0.27 + i * 0.05),
      },
      {
        z: -0.045,
        offsets: Array.from({ length: 11 }, (_, i) => -0.245 + i * 0.05),
      },
    ]
    return rows
  }, [])

  return (
    <group position={position} rotation={rotation}>
      {/* ——— pizza-box system unit ——— */}
      <group position={[0, 0.125, -0.05]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.18, 0.25, 0.98]} />
          <Plastic />
        </mesh>
        {/* recessed front fascia */}
        <mesh position={[0, 0.01, 0.492]} castShadow>
          <boxGeometry args={[1.12, 0.2, 0.02]} />
          <Plastic color={BEIGE_MID} />
        </mesh>
        {/* lower lip / foot rail */}
        <mesh position={[0, -0.115, 0.35]} receiveShadow>
          <boxGeometry args={[1.16, 0.02, 0.7]} />
          <Plastic color={BEIGE_DARK} roughness={0.8} />
        </mesh>
        {/* rubber feet */}
        {[
          [-0.5, -0.13, 0.38],
          [0.5, -0.13, 0.38],
          [-0.5, -0.13, -0.35],
          [0.5, -0.13, -0.35],
        ].map((p, i) => (
          <mesh key={i} position={p as [number, number, number]}>
            <cylinderGeometry args={[0.025, 0.028, 0.012, 10]} />
            <meshStandardMaterial color="#2a2a2a" roughness={0.95} />
          </mesh>
        ))}

        <FloppyDrive position={[-0.12, 0.03, 0.505]} />

        {/* empty drive bay blank */}
        <mesh position={[0.32, 0.03, 0.505]}>
          <boxGeometry args={[0.42, 0.07, 0.02]} />
          <Plastic color={BEIGE_DARK} />
        </mesh>
        <mesh position={[0.32, 0.03, 0.516]}>
          <boxGeometry args={[0.38, 0.01, 0.004]} />
          <meshStandardMaterial color={BEIGE_SHADOW} roughness={0.85} />
        </mesh>

        {/* power rocker */}
        <group position={[0.52, -0.05, 0.505]}>
          <mesh>
            <boxGeometry args={[0.05, 0.035, 0.02]} />
            <meshStandardMaterial color="#333" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.006, 0.008]} rotation={[0.25, 0, 0]}>
            <boxGeometry args={[0.038, 0.012, 0.01]} />
            <meshStandardMaterial color="#555" roughness={0.5} />
          </mesh>
        </group>

        {/* power LED */}
        <mesh position={[0.45, -0.05, 0.508]}>
          <boxGeometry args={[0.02, 0.012, 0.008]} />
          <meshStandardMaterial color="#33ff66" emissive="#22cc44" emissiveIntensity={1.6} />
        </mesh>

        {/* brand badge */}
        <mesh position={[-0.45, -0.06, 0.505]}>
          <boxGeometry args={[0.14, 0.04, 0.008]} />
          <Plastic color={BEIGE_DARK} />
        </mesh>
        <Text
          position={[-0.45, -0.06, 0.512]}
          fontSize={0.018}
          color="#6a6050"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.06}
        >
          FZ-PC
        </Text>

        {/* rear ports panel */}
        <mesh position={[0, 0, -0.495]}>
          <boxGeometry args={[0.7, 0.14, 0.02]} />
          <meshStandardMaterial color="#3a3a3a" roughness={0.8} metalness={0.15} />
        </mesh>
        {[
          [-0.22, 0.02],
          [-0.1, 0.02],
          [0.02, 0.02],
          [0.14, 0.02],
          [0.26, 0.02],
        ].map(([x, y], i) => (
          <mesh key={i} position={[x, y, -0.508]}>
            <boxGeometry args={[0.055, 0.035, 0.012]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.9} metalness={0.3} />
          </mesh>
        ))}

        <Screw position={[-0.55, 0.1, 0.5]} />
        <Screw position={[0.55, 0.1, 0.5]} />
      </group>

      {/* ——— CRT monitor ——— */}
      <group position={[0, 0.74, -0.08]}>
        {/* main body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.08, 0.98, 0.88]} />
          <Plastic />
        </mesh>
        {/* soft edge chamfers */}
        <mesh position={[0, 0.49, 0]} castShadow>
          <boxGeometry args={[1.02, 0.04, 0.82]} />
          <Plastic color={BEIGE_MID} />
        </mesh>
        {/* deep CRT neck / rear taper */}
        <mesh position={[0, 0.02, -0.42]} castShadow>
          <boxGeometry args={[0.78, 0.72, 0.28]} />
          <Plastic color={BEIGE_MID} />
        </mesh>
        <mesh position={[0, 0.02, -0.58]} castShadow>
          <boxGeometry args={[0.55, 0.5, 0.18]} />
          <Plastic color={BEIGE_DARK} />
        </mesh>

        {/* front bezel frame */}
        <mesh position={[0, 0.08, 0.42]} castShadow>
          <boxGeometry args={[0.98, 0.78, 0.1]} />
          <Plastic color={BEIGE_MID} />
        </mesh>
        {/* inner dark mask */}
        <mesh position={[0, 0.1, 0.47]}>
          <boxGeometry args={[0.8, 0.6, 0.04]} />
          <meshStandardMaterial color="#141414" roughness={0.95} />
        </mesh>

        {/* Screen — clickable WebGL plane + HTML UI scaled to fit */}
        <mesh
          ref={screenMesh}
          position={[0, 0.1, 0.495]}
          onClick={(e) => {
            e.stopPropagation()
            if (phase !== 'room' || monitorFocused) return
            focusMonitor()
          }}
          onPointerOver={(e) => {
            e.stopPropagation()
            if (phase !== 'room' || monitorFocused) return
            setHoveredMonitor(true)
            document.body.style.cursor = 'pointer'
          }}
          onPointerOut={() => {
            setHoveredMonitor(false)
            document.body.style.cursor = 'auto'
          }}
        >
          <planeGeometry args={[0.74, 0.54]} />
          <meshBasicMaterial ref={screenRef} color="#062806" toneMapped={false} />
        </mesh>

        {!monitorFocused && <CrtIdlePreview />}

        {/* glass reflection streak */}
        <mesh position={[-0.12, 0.22, 0.52]} rotation={[0, 0, -0.35]} raycast={() => null}>
          <planeGeometry args={[0.08, 0.35]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.05} toneMapped={false} depthWrite={false} />
        </mesh>

        <SpeakerGrille position={[-0.34, -0.34, 0.475]} />
        <SpeakerGrille position={[0.34, -0.34, 0.475]} />

        {/* recessed control bay */}
        <mesh position={[0, -0.34, 0.47]}>
          <boxGeometry args={[0.22, 0.07, 0.03]} />
          <meshStandardMaterial color={BEIGE_SHADOW} roughness={0.85} />
        </mesh>
        {/* brightness / contrast knobs */}
        {[-0.055, 0.01].map((x, i) => (
          <group key={i} position={[x, -0.34, 0.49]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.014, 0.014, 0.02, 12]} />
              <meshStandardMaterial color="#4a4a4a" roughness={0.45} metalness={0.25} />
            </mesh>
            <mesh position={[0, 0, 0.012]} rotation={[Math.PI / 2, 0, 0.4]}>
              <boxGeometry args={[0.004, 0.018, 0.004]} />
              <meshStandardMaterial color="#222" />
            </mesh>
          </group>
        ))}
        {/* power button */}
        <mesh position={[0.065, -0.34, 0.49]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.016, 0.016, 0.018, 14]} />
          <meshStandardMaterial color="#555" roughness={0.5} />
        </mesh>
        {/* power LED */}
        <mesh position={[0.095, -0.34, 0.49]}>
          <sphereGeometry args={[0.005, 8, 8]} />
          <meshStandardMaterial color="#ff4422" emissive="#ff2200" emissiveIntensity={1.8} />
        </mesh>

        {/* top vents */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i} position={[-0.22 + i * 0.06, 0.495, -0.05]}>
            <boxGeometry args={[0.035, 0.01, 0.35]} />
            <meshStandardMaterial color={BEIGE_SHADOW} roughness={0.9} />
          </mesh>
        ))}

        {/* brand plate */}
        <mesh position={[0, 0.42, 0.445]}>
          <boxGeometry args={[0.2, 0.035, 0.01]} />
          <Plastic color={BEIGE_DARK} />
        </mesh>
        <Text
          position={[0, 0.42, 0.452]}
          fontSize={0.016}
          color="#5a5040"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.08}
        >
          FZ DISPLAY
        </Text>

        <Screw position={[-0.48, 0.42, 0.445]} />
        <Screw position={[0.48, 0.42, 0.445]} />
        <Screw position={[-0.48, -0.28, 0.445]} />
        <Screw position={[0.48, -0.28, 0.445]} />

        {/* swivel stand */}
        <mesh position={[0, -0.52, 0.05]} castShadow>
          <cylinderGeometry args={[0.18, 0.26, 0.05, 24]} />
          <Plastic color={BEIGE_DARK} />
        </mesh>
        <mesh position={[0, -0.48, 0.05]} castShadow>
          <cylinderGeometry args={[0.12, 0.14, 0.04, 20]} />
          <Plastic color={BEIGE_MID} />
        </mesh>
        <mesh position={[0, -0.55, 0.05]} receiveShadow>
          <cylinderGeometry args={[0.28, 0.3, 0.025, 24]} />
          <Plastic color={BEIGE_SHADOW} roughness={0.85} />
        </mesh>
      </group>

      {/* ——— keyboard ——— */}
      <group position={[0, 0.035, 0.72]} rotation={[0.08, 0, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.12, 0.045, 0.4]} />
          <Plastic />
        </mesh>
        {/* raised key well */}
        <mesh position={[0, 0.024, 0.01]} receiveShadow>
          <boxGeometry args={[1.06, 0.01, 0.34]} />
          <Plastic color={BEIGE_MID} roughness={0.78} />
        </mesh>
        {/* front lip */}
        <mesh position={[0, 0.005, 0.195]}>
          <boxGeometry args={[1.1, 0.02, 0.02]} />
          <Plastic color={BEIGE_DARK} />
        </mesh>

        {/* F-keys */}
        {Array.from({ length: 12 }).map((_, i) => (
          <KeyCap key={`f${i}`} position={[-0.4 + i * 0.052, 0.035, 0.145]} w={0.04} d={0.035} />
        ))}
        {/* separator bar */}
        <mesh position={[0, 0.03, 0.115]}>
          <boxGeometry args={[0.95, 0.004, 0.008]} />
          <meshStandardMaterial color={BEIGE_SHADOW} />
        </mesh>

        {mainKeys.map((row) =>
          row.offsets.map((x, i) => (
            <KeyCap key={`${row.z}-${i}`} position={[x, 0.035, row.z]} />
          )),
        )}

        {/* spacebar */}
        <KeyCap position={[-0.05, 0.035, -0.1]} w={0.28} d={0.042} />
        {/* enter */}
        <KeyCap position={[0.32, 0.035, 0.01]} w={0.07} d={0.09} />
        {/* shift */}
        <KeyCap position={[-0.34, 0.035, -0.045]} w={0.09} d={0.042} />

        {/* numpad */}
        {Array.from({ length: 4 }).map((_, row) =>
          Array.from({ length: 3 }).map((_, col) => (
            <KeyCap
              key={`n${row}${col}`}
              position={[0.42 + col * 0.05, 0.035, 0.1 - row * 0.05]}
              w={0.042}
            />
          )),
        )}
        <KeyCap position={[0.52, 0.035, -0.05]} w={0.042} d={0.09} />

        {/* lock LEDs */}
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[0.38 + i * 0.04, 0.04, 0.155]}>
            <boxGeometry args={[0.012, 0.006, 0.008]} />
            <meshStandardMaterial
              color={i === 0 ? '#33ff66' : '#1a1a1a'}
              emissive={i === 0 ? '#22aa44' : '#000'}
              emissiveIntensity={i === 0 ? 1.2 : 0}
            />
          </mesh>
        ))}
      </group>

      {/* keyboard cord */}
      <mesh geometry={kbCord}>
        <meshStandardMaterial color="#6a6a6a" roughness={0.85} />
      </mesh>

      {/* ——— mouse ——— */}
      <group position={[0.72, 0.03, 0.78]}>
        <mesh castShadow receiveShadow scale={[1.05, 0.5, 1.35]}>
          <sphereGeometry args={[0.052, 18, 14]} />
          <Plastic />
        </mesh>
        {/* left / right buttons */}
        <mesh position={[-0.018, 0.028, 0.02]} scale={[0.85, 0.35, 1]}>
          <sphereGeometry args={[0.028, 12, 10]} />
          <Plastic color={BEIGE_MID} />
        </mesh>
        <mesh position={[0.018, 0.028, 0.02]} scale={[0.85, 0.35, 1]}>
          <sphereGeometry args={[0.028, 12, 10]} />
          <Plastic color={BEIGE_MID} />
        </mesh>
        {/* button seam */}
        <mesh position={[0, 0.032, 0.015]}>
          <boxGeometry args={[0.003, 0.008, 0.055]} />
          <meshStandardMaterial color={BEIGE_SHADOW} />
        </mesh>
        {/* logo dimple */}
        <mesh position={[0, 0.03, -0.025]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.004, 10]} />
          <Plastic color={BEIGE_DARK} />
        </mesh>
      </group>

      {/* mouse cord */}
      <mesh geometry={mouseCord}>
        <meshStandardMaterial color="#7a7a7a" roughness={0.85} />
      </mesh>
    </group>
  )
}
