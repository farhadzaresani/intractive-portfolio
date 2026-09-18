import { Text } from '@react-three/drei'
import { education, experience, profile, skills } from '../data/resume'

/** Idle preview drawn in WebGL so it always shows on the CRT */
export function CrtIdlePreview() {
  return (
    <group position={[0, 0.1, 0.5]}>
      <Text
        position={[0, 0.2, 0]}
        fontSize={0.038}
        color="#33ff66"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.04}
        maxWidth={0.68}
        textAlign="center"
      >
        {profile.name.toUpperCase()}
      </Text>
      <Text
        position={[0, 0.145, 0]}
        fontSize={0.022}
        color="#88cc88"
        anchorX="center"
        anchorY="middle"
        maxWidth={0.68}
        textAlign="center"
      >
        {`${profile.title}  ·  ${profile.location}`}
      </Text>
      <Text
        position={[0, 0.05, 0]}
        fontSize={0.018}
        color="#b8ffc8"
        anchorX="center"
        anchorY="middle"
        maxWidth={0.66}
        textAlign="center"
        overflowWrap="break-word"
      >
        {profile.summary.slice(0, 160) + '…'}
      </Text>
      <Text
        position={[0, -0.05, 0]}
        fontSize={0.016}
        color="#9fd9a8"
        anchorX="center"
        anchorY="middle"
        maxWidth={0.66}
        textAlign="left"
        lineHeight={1.35}
      >
        {[
          experience[0] ? `${experience[0].role} @ ${experience[0].company}` : '',
          experience[1] ? `${experience[1].role} @ ${experience[1].company}` : '',
          `Skills: ${[...skills.core, ...skills.frameworks.slice(0, 2)].join(' · ')}`,
          education[0] ? `${education[0].degree} — ${education[0].field}` : '',
        ]
          .filter(Boolean)
          .join('\n')}
      </Text>
      <Text
        position={[0, -0.2, 0]}
        fontSize={0.02}
        color="#33ff66"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
      >
        [ CLICK TO ENTER FZ-DOS ]
      </Text>
    </group>
  )
}
