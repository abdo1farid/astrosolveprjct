import { useRef, useEffect } from 'react'

export default function Particles({ className = 'absolute inset-0 pointer-events-none' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let width = (canvas.width = canvas.clientWidth)
    let height = (canvas.height = canvas.clientHeight)

    const particles = []
    const mouse = { x: width / 2, y: height / 2, isDown: false }

    const rand = (a, b) => Math.random() * (b - a) + a

    function createParticle(init) {
      return {
        x: init ? rand(0, width) : mouse.x + rand(-20, 20),
        y: init ? rand(0, height) : mouse.y + rand(-20, 20),
        vx: rand(-0.5, 0.5),
        vy: rand(-0.5, 0.5),
        r: rand(0.6, 2.2),
        hue: rand(190, 210),
        a: rand(0.05, 0.18)
      }
    }

    function init() {
      particles.length = 0
      const count = Math.max(40, Math.floor((width * height) / 15000))
      for (let i = 0; i < count; i++) particles.push(createParticle(true))
    }

    init()

    function onResize() {
      width = canvas.width = canvas.clientWidth
      height = canvas.height = canvas.clientHeight
      init()
    }

    function step() {
      ctx.clearRect(0, 0, width, height)
      for (let p of particles) {
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const d = Math.sqrt(dx * dx + dy * dy) + 0.001
        const force = Math.min(120 / d, 0.7)
        const dir = mouse.isDown ? -1 : 1
        p.vx += (dx / d) * force * 0.02 * dir
        p.vy += (dy / d) * force * 0.02 * dir
        p.vx *= 0.98
        p.vy *= 0.98
        p.x += p.vx
        p.y += p.vy

        if (p.x < -30 || p.x > width + 30 || p.y < -30 || p.y > height + 30) {
          Object.assign(p, createParticle(false))
        }

        ctx.beginPath()
        ctx.fillStyle = `hsla(${p.hue}, 85%, 60%, ${p.a})`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // draw subtle lines between nearby particles and cursor
      for (let i = 0; i < particles.length; i += 5) {
        const p = particles[i]
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < 140) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(56,189,248,${Math.max(0, 0.12 - d / 600)})`
          ctx.lineWidth = 0.5
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
      }

      raf = requestAnimationFrame(step)
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    function onDown() {
      mouse.isDown = true
      for (let i = 0; i < 6; i++) particles.push(createParticle(false))
    }

    function onUp() { mouse.isDown = false }

    let raf = requestAnimationFrame(step)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={ref} className={className} />
}
