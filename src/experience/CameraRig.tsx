import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { cameraViews } from '../data/resume'
import { usePortfolio } from '../data/portfolioContext'

export function CameraRig() {
  const { phase, monitorFocused, setViewReady } = usePortfolio()
  const lookAt = useRef(new THREE.Vector3(...cameraViews.overview.target))
  const ready = useRef(false)

  useFrame((state, delta) => {
    const view = monitorFocused ? cameraViews.monitor : cameraViews.overview
    const targetPos = new THREE.Vector3(...view.position)
    const targetLook = new THREE.Vector3(...view.target)

    if (phase === 'boot') {
      targetPos.z += 1.4
      targetPos.y += 0.35
    }

    // Same rate for position and look so the move is a straight push, not a swing
    const k = 1 - Math.exp(-delta * 2.2)
    state.camera.position.lerp(targetPos, k)
    lookAt.current.lerp(targetLook, k)
    state.camera.lookAt(lookAt.current)

    const arrived =
      monitorFocused &&
      state.camera.position.distanceTo(targetPos) < 0.04 &&
      lookAt.current.distanceTo(targetLook) < 0.04

    if (arrived && !ready.current) {
      ready.current = true
      setViewReady(true)
    } else if (!monitorFocused && ready.current) {
      ready.current = false
      setViewReady(false)
    }
  })

  return null
}
