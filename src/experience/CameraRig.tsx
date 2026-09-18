import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { cameraViews } from '../data/resume'
import { usePortfolio } from '../data/portfolioContext'

export function CameraRig() {
  const { phase, activePanel } = usePortfolio()
  const lookAt = useRef(new THREE.Vector3(...cameraViews.overview.target))

  useFrame((state, delta) => {
    const key = phase === 'boot' ? 'overview' : activePanel ?? 'overview'
    const view = cameraViews[key]
    const targetPos = new THREE.Vector3(...view.position)
    const targetLook = new THREE.Vector3(...view.target)

    // boot: pull camera slightly farther
    if (phase === 'boot') {
      targetPos.z += 1.4
      targetPos.y += 0.35
    }

    state.camera.position.lerp(targetPos, 1 - Math.exp(-delta * 2.4))
    lookAt.current.lerp(targetLook, 1 - Math.exp(-delta * 2.8))
    state.camera.lookAt(lookAt.current)
  })

  return null
}
