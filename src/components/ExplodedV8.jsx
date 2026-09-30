import { useEffect, useMemo, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PARTS = [
  { id: 'valve-covers', label: 'Valve covers', dx: 150, dy: -78, description: 'Valve covers seal the upper valvetrain area and help keep the cylinder head assembly contained.' },
  { id: 'cylinder-heads', label: 'Cylinder heads', dx: 120, dy: -38, description: 'Cylinder heads guide the combustion process and contain the intake and exhaust passages of each bank.' },
  { id: 'pistons-rods', label: 'Pistons + connecting rods', dx: 92, dy: 28, description: 'The pistons and rods turn the combustion force into crankshaft rotation and are arranged in the two V-bank rows.' },
  { id: 'crankshaft', label: 'Crankshaft', dx: 0, dy: 110, description: 'The crankshaft converts the pistons\' reciprocating motion into rotating output at the engine\'s center.' },
  { id: 'engine-block', label: 'Engine block', dx: 0, dy: 0, description: 'The block is the structural base of the engine and positions the cylinders, crankshaft, and head assemblies.' }
]

const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value))
const lerp = (start, end, amount) => start + (end - start) * amount

function getLayerMarkup(part) {
  const commonStroke = '#d9dde2'
  const accent = '#f05a3c'

  if (part.id === 'valve-covers') {
    return (
      <>
        <rect x="170" y="95" width="70" height="26" rx="6" fill="rgba(240,90,60,0.1)" stroke={commonStroke} strokeWidth="2" />
        <rect x="360" y="95" width="70" height="26" rx="6" fill="rgba(240,90,60,0.1)" stroke={commonStroke} strokeWidth="2" />
      </>
    )
  }

  if (part.id === 'cylinder-heads') {
    return (
      <>
        <path d="M 170 120 L 230 120 L 245 250 L 190 250 Z" fill="rgba(217,221,226,0.08)" stroke={commonStroke} strokeWidth="2" />
        <path d="M 470 120 L 410 120 L 395 250 L 450 250 Z" fill="rgba(217,221,226,0.08)" stroke={commonStroke} strokeWidth="2" />
      </>
    )
  }

  if (part.id === 'pistons-rods') {
    return (
      <>
        <path d="M 195 250 L 215 250 L 192 390 L 170 390 Z" fill="rgba(240,90,60,0.12)" stroke={accent} strokeWidth="2" />
        <circle cx="182" cy="392" r="12" fill="rgba(217,221,226,0.15)" stroke={commonStroke} strokeWidth="2" />
        <path d="M 440 250 L 420 250 L 445 390 L 468 390 Z" fill="rgba(240,90,60,0.12)" stroke={accent} strokeWidth="2" />
        <circle cx="456" cy="392" r="12" fill="rgba(217,221,226,0.15)" stroke={commonStroke} strokeWidth="2" />
        <path d="M 225 250 L 260 250 L 275 390 L 245 390 Z" fill="rgba(217,221,226,0.08)" stroke={commonStroke} strokeWidth="2" />
        <path d="M 475 250 L 440 250 L 425 390 L 455 390 Z" fill="rgba(217,221,226,0.08)" stroke={commonStroke} strokeWidth="2" />
      </>
    )
  }

  if (part.id === 'crankshaft') {
    return (
      <>
        <path d="M 182 315 L 518 315" stroke={commonStroke} strokeWidth="8" strokeLinecap="round" />
        <path d="M 192 300 L 508 300" stroke={commonStroke} strokeWidth="2" strokeLinecap="round" opacity="0.85" />
        <circle cx="238" cy="315" r="18" fill="rgba(217,221,226,0.08)" stroke={commonStroke} strokeWidth="3" />
        <circle cx="354" cy="315" r="18" fill="rgba(217,221,226,0.08)" stroke={commonStroke} strokeWidth="3" />
        <circle cx="470" cy="315" r="18" fill="rgba(217,221,226,0.08)" stroke={commonStroke} strokeWidth="3" />
      </>
    )
  }

  return (
    <>
      <path d="M 170 250 L 250 150 L 300 150 L 300 390 L 250 390 L 170 250 Z" fill="rgba(217,221,226,0.12)" stroke={commonStroke} strokeWidth="2" />
      <path d="M 530 250 L 450 150 L 400 150 L 400 390 L 450 390 L 530 250 Z" fill="rgba(217,221,226,0.12)" stroke={commonStroke} strokeWidth="2" />
      <path d="M 250 150 L 450 150 L 500 250 L 200 250 Z" fill="rgba(217,221,226,0.06)" stroke={commonStroke} strokeWidth="2" />
      <path d="M 250 390 L 450 390 L 500 250 L 200 250 Z" fill="rgba(217,221,226,0.03)" stroke={commonStroke} strokeWidth="2" />
      <path d="M 260 170 L 440 170" stroke={commonStroke} strokeWidth="2" opacity="0.8" />
      <path d="M 250 390 L 450 390" stroke={commonStroke} strokeWidth="2" opacity="0.8" />
    </>
  )
}

export default function ExplodedV8() {
  const sectionRef = useRef(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [compactMode, setCompactMode] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches)
    const updateViewport = () => setCompactMode(window.innerWidth < 360)

    updateMotionPreference()
    updateViewport()

    mediaQuery.addEventListener('change', updateMotionPreference)
    window.addEventListener('resize', updateViewport)

    return () => {
      mediaQuery.removeEventListener('change', updateMotionPreference)
      window.removeEventListener('resize', updateViewport)
    }
  }, [])

  const movingParts = useMemo(() => PARTS.filter((part) => part.id !== 'engine-block'), [])

  useGSAP(() => {
    if (typeof window === 'undefined') return
    if (prefersReducedMotion || compactMode) return

    const ctx = gsap.context(() => {
      const easing = gsap.parseEase('power2.inOut')
      const updateLayers = () => {
        const trigger = ScrollTrigger.getById('exploded-v8-trigger')
        if (!trigger) return

        const progress = clamp(trigger.progress, 0, 1)
        const stagger = 0.1
        const span = 1 - (movingParts.length - 1) * stagger

        movingParts.forEach((part, index) => {
          const node = document.querySelector(`[data-layer-id="${part.id}"]`)
          const label = document.querySelector(`[data-label-id="${part.id}"]`)

          if (!node) return

          const start = index * stagger
          const local = clamp((progress - start) / span, 0, 1)
          const eased = easing(local)
          const x = lerp(0, part.dx, eased)
          const y = lerp(0, part.dy, eased)

          gsap.set(node, { x, y })

          if (label) {
            const visible = local > 0.3
            gsap.set(label, {
              autoAlpha: visible ? 1 : 0,
              y: visible ? 0 : 8
            })
          }
        })
      }

      ScrollTrigger.create({
        id: 'exploded-v8-trigger',
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
        onUpdate: updateLayers
      })

      return () => ctx.revert()
    }, [prefersReducedMotion, compactMode, movingParts])

    return () => ctx.revert()
  }, [prefersReducedMotion, compactMode, movingParts])

  return (
    <section ref={sectionRef} className="relative flex justify-center overflow-hidden" style={{ height: '200vh' }}>
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <svg viewBox="0 0 600 600" className="h-full w-full">
          <defs>
            <clipPath id="engine-mask">
              <path d="M 170 250 L 250 150 L 300 150 L 300 390 L 250 390 L 170 250 Z" fill="white" />
              <path d="M 530 250 L 450 150 L 400 150 L 400 390 L 450 390 L 530 250 Z" fill="white" />
            </clipPath>
          </defs>
          <g clipPath="url(#engine-mask)">
            {PARTS.map((part) => (
              <g key={part.id} data-layer-id={part.id} className="transition-all duration-500">
                {getLayerMarkup(part)}
              </g>
            ))}
          </g>
        </svg>
      </div>
      <div className="relative z-10 flex max-w-[90vw] flex-col gap-8 px-4 py-16 text-center sm:max-w-[600px]">
        <h2 className="text-4xl font-bold leading-tight sm:text-5xl">
          Explore the V8 Engine
        </h2>
        <div className="flex flex-col gap-4 text-left sm:flex-row sm:gap-8">
          {PARTS.map((part) => (
            <div key={part.id} data-label-id={part.id} className="transition-all duration-500">
              <h3 className="text-xl font-semibold">{part.label}</h3>
              <p className="mt-2 text-sm text-gray-600">{part.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
