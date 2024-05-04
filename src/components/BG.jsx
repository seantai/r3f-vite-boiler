import { View } from '@react-three/drei'
import { ShaderView1 } from './ShaderView1'

export const BG = () => {
  return (
    <div className="absolute inset-0 opacity-50 pointer-events-none">
      <View className="h-full -z-10">
        <ShaderView1 />
      </View>
    </div>
  )
}
