import { useThree } from '@react-three/fiber'

export const FooViewScene = () => {
  const { gl } = useThree()
  return (
    <>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshNormalMaterial color="white" />
      </mesh>
    </>
  )
}
