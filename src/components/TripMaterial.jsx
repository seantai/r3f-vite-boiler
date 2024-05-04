import { useMemo, useRef } from 'react'
import { MeshMatcapMaterial } from 'three'
import CustomShaderMaterial from 'three-custom-shader-material'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector2 } from 'three'

export const TripMaterial = () => {
  const { viewport } = useThree()
  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      res: { value: [viewport.width, viewport.height] },
      mouse: { value: new Vector2() }
    }),
    []
  )
  const shaderRef = useRef()
  useFrame((state) => {
    shaderRef.current.uniforms.time.value = state.clock.getElapsedTime()
    shaderRef.current.uniforms.mouse.value = state.pointer
    console.log(state.pointer)
  })

  return (
    <CustomShaderMaterial
      transparent
      opacity={0.5}
      baseMaterial={MeshMatcapMaterial}
      // receiveShadow
      // visible={false}
      ref={shaderRef}
      uniforms={uniforms}
      vertexShader={`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      // csm_PositionRaw = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      // gl_Position = vec4(-1, -1, 0, 1);
      // if (gl_VertexID == 1) csm_PositionRaw = vec4(3, -1, 0, 1);
      // if (gl_VertexID == 2) csm_PositionRaw = vec4(-1, 3, 0, 1);
      // if (gl_VertexID == 40) csm_PositionRaw = vec4(-1, 3, 0, 1);
      // if (gl_VertexID == 30) csm_PositionRaw = vec4(-1, 3, 0, 1);
      gl_Position = modelMatrix * vec4(position,1.);
    }
    `}
      fragmentShader={`
    uniform vec2 res;
    uniform vec2 mouse;
    uniform float time;
    
    varying vec2 vUv;
    
    
    #define c(r, i) mat2(r, i, -(i), r)
    #define c2(v) mat2(v, -(v).y, (v).x)
    #define rot(a) mat2(cos(a), -sin(a), sin(a), cos(a))
    
    float noise(vec2 uv) {
      vec2 uvI = uv;
      uv = abs(mod(uv, 2.)-1.)-.5;
      mat2 z = c2(uv);
      mat2 a = c(-0.696, 0.136);
      float i;
      for(i = 0.;i<5.;i++) {
        z = inverse(z*z+a);
      }
      uv = z[0];
      uv = fract(uv-.5+time*.1+mouse*.1)-.5;
      return length(uv)*sqrt(2.);
    }
    
    vec3 rgbToHsl(vec3 color) {
      float r = color.r;
      float g = color.g;
      float b = color.b;
      float maxChannel = max(max(r, g), b);
      float minChannel = min(min(r, g), b);
      float h, s, l = (maxChannel + minChannel) / 2.0;
      
      if (maxChannel == minChannel) {
        h = s = 0.0; // achromatic
      } else {
        float d = maxChannel - minChannel;
        s = l > 0.5 ? d / (2.0 - maxChannel - minChannel) : d / (maxChannel + minChannel);
        if (maxChannel == r)
        h = (g - b) / d + (g < b ? 6.0 : 0.0);
      else if (maxChannel == g)
      h = (b - r) / d + 2.0;
    else
    h = (r - g) / d + 4.0;
  h /= 6.0;
}
return vec3(h, s, l);
}

vec3 hslToRgb(vec3 hsl) {
  vec3 rgb;
  float h = hsl.x, s = hsl.y, l = hsl.z;
  float c = (1.0 - abs(2.0 * l - 1.0)) * s;
  float x = c * (1.0 - abs(mod(h * 6.0, 2.0) - 1.0));
  float m = l - c / 2.0;
  if (0.0 <= h && h < 1.0 / 6.0)
  rgb = vec3(c, x, 0.0) + m;
else if (1.0 / 6.0 <= h && h < 1.0 / 3.0)
rgb = vec3(x, c, 0.0) + m;
else if (1.0 / 3.0 <= h && h < 1.0 / 2.0)
rgb = vec3(0.0, c, x) + m;
else if (1.0 / 2.0 <= h && h < 2.0 / 3.0)
rgb = vec3(0.0, x, c) + m;
else if (2.0 / 3.0 <= h && h < 5.0 / 6.0)
rgb = vec3(x, 0.0, c) + m;
else
rgb = vec3(c, 0.0, x) + m;
return rgb;
}

void main() {
  
  // vec2 uv = (gl_FragCoord.xy*2.-res)/res.y*1.;
  vec2 uvI = vUv;
  vec3 n;
  n.x = noise(vUv)-.5;
  n.y = noise(vUv*rot(3.14/4.))-.5;
  n.z = .2;
  n = normalize(n);
  vec3 l = normalize(normalize(vec3(mouse*.5-.5, .5))+vec3(vUv*.5, 0));
  vec4 o = vec4(0);
  o.rgb = n;
  o.g *= .2;
  o.rgb += pow(max(dot(n, l), 0.), 200.);
  o.rgb += pow(max(dot(n, l), 0.), 2.)*.5;
  o = smoothstep(0., 1., o);
  
  vec3 hsl = rgbToHsl(o.rgb);
  
  hsl.y = hsl.y * 0.21 * sin(time); // Reduce saturation
  hsl.z = hsl.z; // Increase lightness
  
  vec3 pastelColor = hslToRgb(hsl);
  
  o.rgb = pastelColor;

  o.a = .3;
  
  csm_DiffuseColor = o;
}

`}
    />
  )
}
