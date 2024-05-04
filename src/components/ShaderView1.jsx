import { CameraControls, Sky } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { TripMaterial } from './TripMaterial'
import { useEffect, useRef } from 'react'

export const ShaderView1 = ({ angle = 0 }) => {
  const { viewport } = useThree()
  console.log(viewport)

  const { controls } = useThree()
  const ref = useRef()
  useEffect(() => {
    if (controls) {
      const padding = 0
      controls.fitToBox(ref.current, true, {
        paddingLeft: padding,
        paddingRight: padding,
        paddingTop: padding,
        paddingBottom: padding
      })
    }
  }, [controls])

  return (
    <>
      <mesh rotation-z={angle} ref={ref}>
        {/* <mesh scale={[viewport.width, viewport.height, 1]}> */}
        {/* <planeGeometry /> */}
        <planeGeometry args={[1, 1]} />
        <TripMaterial />
      </mesh>
      <CameraControls makeDefault smoothTime={0.1} mouseButtons={{ left: 0, right: 0, middle: 0 }} />
      {/* <Sky /> */}
    </>
  )
}
