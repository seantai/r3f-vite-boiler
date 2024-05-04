import gsap from 'gsap'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const circle = useRef()
  const circle2 = useRef()
  const mouse = useRef({ x: 0, y: 0 })
  const delayedMouse = useRef({ x: 0, y: 0 })
  const size = 48
  const ringWidth = 4
  const smallCircleSize = size - ringWidth * 6
  const lerp = (x, y, a) => x * (1 - a) + y * a

  const moveCircle = (x, y) => {
    gsap.set(circle.current, { x, y, xPercent: -50, yPercent: -50 })
  }

  const manageMouseMove = (e) => {
    mouse.current = { x: e.clientX, y: e.clientY }
    if (circle2.current) {
      circle2.current.style.left = `${mouse.current.x - smallCircleSize / 2}px`
      circle2.current.style.top = `${mouse.current.y - smallCircleSize / 2}px`
    }
  }

  const animate = () => {
    const { x, y } = delayedMouse.current
    delayedMouse.current = {
      x: lerp(x, mouse.current.x, 0.075),
      y: lerp(y, mouse.current.y, 0.075)
    }

    if (delayedMouse.current.x === mouse.current.x && delayedMouse.current.y === mouse.current.y) {
      // Mouse has stopped moving, fade out the ring
      gsap.to(circle.current, { duration: 0.5, opacity: 0 })
    } else {
      // Mouse is moving, reset the ring opacity
      gsap.set(circle.current, { opacity: 1 })
    }

    moveCircle(delayedMouse.current.x, delayedMouse.current.y)
    window.requestAnimationFrame(animate)
  }

  useEffect(() => {
    animate()
    window.addEventListener('mousemove', manageMouseMove)
    return () => window.removeEventListener('mousemove', manageMouseMove)
  }, [])

  return (
    <>
      <div
        ref={circle}
        className="fixed top-0 left-0 bg-none rounded-full z-50 mix-blend-difference pointer-events-none opacity-20"
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          borderWidth: ringWidth,
          borderStyle: 'solid',
          borderColor: 'inherit'
        }}
      />
      <div
        ref={circle2}
        className="fixed bg-[#222] rounded-full z-[45] mix-blend-difference pointer-events-none opacity-40"
        style={{
          width: smallCircleSize,
          height: smallCircleSize,
          borderRadius: '50%'
        }}
      />
    </>
  )
}
