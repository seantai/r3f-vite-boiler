import { Canvas } from '@react-three/fiber'
import { Bvh, Environment, Sky, View, useGLTF, useTexture } from '@react-three/drei'
import { useRef } from 'react'
import { Kamera } from './components/Kamera'
import { Overlay } from './components/Overlay'
// import { Perf } from 'r3f-perf'
import { RevealBento } from './components/RevealBento'
import Lenis from 'lenis'
import { addEffect } from '@react-three/fiber'

const Scene = () => {
  const Suz = useGLTF('./Suz_Quad.glb')
  const matcapTexture = useTexture('161B1F_C7E0EC_90A5B3_7B8C9B.png')

  // const lenis = new Lenis({ syncTouch: true, infinite: true })
  // addEffect((t) => lenis.raf(t))

  return (
    <>
      {/* <mesh geometry={Suz.nodes.Suz_Quad.geometry}>
        <meshMatcapMaterial matcap={matcapTexture} />
      </mesh>
      <Sky /> */}

      <View.Port />
      {/* <Kamera /> */}

      {/* <Environment files={'neutral.hdr'} /> */}
    </>
  )
}

export default function App() {
  const parent = useRef()

  return (
    <>
      <div className="relative w-full h-full overflow-y-auto" ref={parent}>
        <Canvas
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 1000,
            overflowY: 'auto'
            // ...style,
          }}
          // eventSource={document.body}
          // eventPrefix="client"
          eventSource={parent.current}>
          <Scene />
          <View.Port />
        </Canvas>
        <RevealBento />
      </div>
    </>
  )
}

{
  /* <div className="relative w-full h-full overflow-y-auto" ref={parent}>
      /~
      <Canvas
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none'
          // ...style,
        }}
        eventSource={document.body}
        eventPrefix="client"
        // eventSource={parent.current}
      >
        <Bvh firstHitOnly>
          <Scene />
        </Bvh>
        /~ <Perf /> ~/
      </Canvas>~/
    </div>*/
}
