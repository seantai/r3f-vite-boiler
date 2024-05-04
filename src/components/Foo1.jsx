import { CameraControls, OrbitControls, PerspectiveCamera, Sky } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { TripMaterial } from './TripMaterial'
import { useEffect, useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { MeshMatcapMaterial } from 'three'

export const Foo1 = ({ angle = 0, rotate = 0 }) => {
  const { viewport } = useThree()
  console.log(viewport)

  //event listener that triggers a camera movement

  const { controls } = useThree()
  const ref = useRef()
  useEffect(() => {
    if (controls) {
      const padding = 2
      // controls.fitToBox(ref.current, true, {
      //   paddingLeft: padding,
      //   paddingRight: padding,
      //   paddingTop: padding,
      //   paddingBottom: padding
      // })
    }
  }, [controls])

  useFrame(({ clock }) => {
    if (!ref.current) return
    // ref.current.rotation.z = clock.elapsedTime * 1
  })
  const Suz = useGLTF('./Suz_Quad.glb')
  const matcapTexture = useTexture('161B1F_C7E0EC_90A5B3_7B8C9B.png')
  return (
    <>
      {/* <mesh >
        <meshMatcapMaterial matcap={matcapTexture} />
      </mesh>


  return (
    <>
      <mesh rotation-z={angle} ref={ref}>
        {/* <mesh scale={[viewport.width, viewport.height, 1]}> */}
      {/* <planeGeometry /> */}
      <mesh rotation={[0, 0, rotate]} geometry={Suz.nodes.Suz_Quad.geometry}>
        {/* <planeGeometry args={[1, 1]} /> */}
        <TripMaterial />
      </mesh>
      <PerspectiveCamera makeDefault position={[0, 1, 2]} />
      {/* <OrbitControls /> */}
      {/* <Sky /> */}
    </>
  )
}
