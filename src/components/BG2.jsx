import { useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { Vector2 } from 'three'
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera, View } from '@react-three/drei'
// import gsap from 'gsap'

export const BG2 = () => {
  const planeRef = useRef()
  const materialRef = useRef()

  const uniforms = useMemo(() => {
    return {
      uResolution: {
        value: new Vector2(900, 600)
      },
      uMouse: {
        value: new Vector2(0, 0)
      },
      uTime: {
        value: 0
      },
      uOpacity: {
        value: 0
      },
      uHover1: {
        value: false
      },
      uProgress1: {
        value: 0
      }
    }
  }, [])

  return (
    <View className="fixed inset-0 pointer-events-none m-0 p-0">
      <mesh ref={planeRef} scale={[]}>
        <planeGeometry />
        <shaderMaterial
          ref={materialRef}
          uniforms={uniforms}
          vertexShader={`

    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `}
          fragmentShader={`
    
  varying vec2 vUv;
    uniform vec2 uResolution;
    uniform vec2 uMouse;
    uniform float uTime;
    uniform float uOpacity;
    uniform bool uHover1;
    uniform float uProgress1;

    float easeInOutSmoothstep(float edge0, float edge1, float x) {
      // Smoothstep function that eases in and out
      float t = smoothstep(edge0, edge1, x);
      return t * t * (3.0 - 2.0 * t); // Ease in and out
  }

  float easeInOutQuadratic(float x) {
    return x < 0.5 ? 2.0 * x * x : 1.0 - pow(-2.0 * x + 2.0, 2.0) / 2.0;
}

    vec3 screen(vec3 a, vec3 b) {
      return 1.-(1.-a)*(1.-b);
    }
    vec3 draw_circle(vec2 position, vec3 color, float size) {
      float circle = length(position.xy);
      circle = 1.-smoothstep(0.0, size, circle);
      return color*circle;
    }
    mat2 rotate(float angle) {
        return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    }

    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }

    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }

    vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }

    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

      // First corner
      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);

      // Other corners
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);

      //   x0 = x0 - 0.0 + 0.0 * C.xxx;
      //   x1 = x0 - i1  + 1.0 * C.xxx;
      //   x2 = x0 - i2  + 2.0 * C.xxx;
      //   x3 = x0 - 1.0 + 3.0 * C.xxx;
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
      vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

      // Permutations
      i = mod289(i);
      vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y +
                              vec4(0.0, i1.y, i2.y, 1.0)) +
                      i.x + vec4(0.0, i1.x, i2.x, 1.0));

      // Gradients: 7x7 points over a square, mapped onto an octahedron.
      // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
      float n_ = 0.142857142857; // 1.0/7.0
      vec3 ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z * ns.z); //  mod(p,7*7)

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_); // mod(j,N)

      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);

      // vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
      // vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
      vec4 s0 = floor(b0) * 2.0 + 1.0;
      vec4 s1 = floor(b1) * 2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);

      // Normalise gradients
      vec4 norm =
          taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      // Mix final noise value
      vec4 m =
          max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
      m = m * m;
      return 42.0 *
            dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
    }
 
    float easeInOut(float t) {
      return t < 0.5 ? 8.0 * t * t * t : 1.0 - 8.0 * pow(1.0 - t, 3.0);
    }

    void main() {
      vec3 black = vec3(0.114, 0.114, 0.122);
      vec3 uColor1 = vec3(0.69,0.529,1.0);
      vec3 uColor2 = vec3(1.,0.816,0.455);

      vec2 circlePos = vUv-(uMouse);
      vec2 circlePos2 = vUv-(uMouse);
      circlePos.y *= uResolution.y/uResolution.x;
      circlePos2.y *= uResolution.y/uResolution.x;

      circlePos = rotate(uTime*.5)*circlePos;
      circlePos2 = rotate(uTime*.5)*circlePos2;
      circlePos = circlePos+vec2(.035);
      circlePos2 = circlePos2-vec2(.035);

      vec2 transformedUv = rotate(uTime*.15)*vUv;
      float offx = transformedUv.x+sin(transformedUv.y+uTime*.1);
      float offy = transformedUv.y-uTime*0.1-cos(uTime*.1)*.01;
      float n = snoise(vec3(offx, offy, uTime*.1)*1.75)*.05;
      vec3 circle1 = draw_circle(circlePos, uColor1, .3 + n);

      vec3 circle2;
      if (uHover1) {
        uColor2 = mix(vec3(0.69,0.529,1.0), vec3(1.,0.816,0.455), uProgress1);
        circle2 = draw_circle(circlePos2, uColor2, .3 + n);
      } else {
        uColor2 = mix(vec3(1.,0.816,0.455),vec3(0.69,0.529,1.0), uProgress1);
        circle2 = draw_circle(circlePos2, uColor2, .3 + n);
      }

     

    
    
      
      vec3 mixedBackground = screen(screen(circle1, circle2), black);
     
      mixedBackground = mix(black, mixedBackground, .5);
      vec3 mixed = mixedBackground;
    
      gl_FragColor = vec4(mixed, 1.0);

    }
  `}
        />
      </mesh>
      <PerspectiveCamera makeDefault position={[0, 1, 2]} />
    </View>
  )
}
