import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from './Button.jsx'
import Badge from './Badge.jsx'

gsap.registerPlugin(ScrollTrigger)

/**
 * Computes the bank sequence from the supplied firing order and bank map.
 * @param {number[]} firingOrder
 * @param {Record<number, 'L'|'R'>} bankMap
 * @returns {Array<'L'|'R'>}
 */
function computeBankSequence(firingOrder, bankMap) {
  return firingOrder.map((cylinder) => bankMap[cylinder])
}

/**
 * @param {{firingOrder:number[], bankMap:Record<number,'L'|'R'>, label:string, isPlaceholder?:boolean}} props
 */
export default function BankAlternation({ firingOrder, bankMap, label, isPlaceholder = false }) {
  const root = useRef(null)
  const crankRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [step, setStep] = useState(8)
  const sequence = computeBankSequence(firingOrder, bankMap)
  const svgTitleText = `${label} crank-pin end view`

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const pulses = gsap.utils.toArray('.bank-pulse')
      gsap.set(pulses, { scale: 1, opacity: 0.72 })

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const rotation = gsap.to(crankRef.current, {
        rotation: 360,
        duration: 7,
        repeat: -1,
        ease: 'none',
        paused: true
      })

      const onScroll = () => {
        if (!root.current) return
        if (playing) rotation.play()
      }

      ScrollTrigger.create({
        trigger: root.current,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: onScroll,
        onEnterBack: onScroll,
        onLeave: () => rotation.pause()
      })

      return () => rotation.kill()
    }, root)

    return () => ctx.revert()
  }, { dependencies: [playing], scope: root })

  function togglePlay() {
    setPlaying((value) => !value)
  }

  function nextStep() {
    setStep((value) => value >= 8 ? 1 : value + 1)
  }

  return (
    <section ref={root} className="bank-demo" aria-labelledby={`${label.replace(/\s+/g, '-').toLowerCase()}-title`}>
      <div className="bank-demo__header">
        <div>
          <div className="badge-row">
            <Badge tone={isPlaceholder ? 'warning' : 'accent'}>{isPlaceholder ? 'PLACEHOLDER DATA' : 'SOURCED DATA'}</Badge>
          </div>
          <h3 id={`${label.replace(/\s+/g, '-').toLowerCase()}-title`}>{label}</h3>
          <p className="muted">Computed bank sequence: <span className="mono">{sequence.join('–')}</span></p>
        </div>
        <div className="demo-controls" aria-label={`${label} playback controls`}>
          <Button onClick={togglePlay} aria-label={playing ? `Pause ${label}` : `Play ${label}`}>
            {playing ? 'Pause' : 'Play'}
          </Button>
          <Button onClick={nextStep} aria-label={`Step ${label} timeline`}>Step</Button>
        </div>
      </div>

      <div className="timeline" role="img" aria-label={`${label}: eight firing events distributed across 720 degrees of crank rotation`}>
        <div className="timeline-scale mono"><span>0°</span><span>90°</span><span>180°</span><span>270°</span><span>360°</span><span>450°</span><span>540°</span><span>630°</span><span>720°</span></div>
        {['L', 'R'].map((bank) => (
          <div className="bank-row" key={bank}>
            <span className="bank-label">{bank === 'L' ? 'LEFT BANK' : 'RIGHT BANK'}</span>
            <div className="bank-track">
              {sequence.map((eventBank, i) => eventBank === bank ? (
                <span
                  key={`${bank}-${i}`}
                  className={`bank-pulse ${i < step ? 'is-active' : ''}`}
                  style={{ left: `${((i + 0.5) / 8) * 100}%` }}
                  title={`Event ${i + 1}: cylinder ${firingOrder[i]}, ${bank} bank`}
                >
                  {firingOrder[i]}
                </span>
              ) : null)}
            </div>
          </div>
        ))}
      </div>

      <div className="crank-figure" aria-label={`${label} crank pin end view`}>
        <svg viewBox="0 0 220 150" role="img" aria-labelledby={`${label.replace(/\s+/g, '-')}-svg-title`}>
          <title id={`${label.replace(/\s+/g, '-')}-svg-title`}>{svgTitleText}</title>
          <g ref={crankRef} transform="translate(110 75)">
            <circle r="49" className="svg-guide" />
            <line x1="-62" x2="62" className="svg-axis" />
            <line y1="-62" y2="62" className="svg-axis" />
            {isPlaceholder ? (
              <>
                <circle cx="-31" cy="0" r="9" className="svg-pin svg-pin--accent" />
                <circle cx="31" cy="0" r="9" className="svg-pin svg-pin--accent" />
                <text x="-44" y="-17" className="svg-text">180°</text>
                <text x="33" y="-17" className="svg-text">180°</text>
              </>
            ) : (
              <>
                <circle cx="0" cy="-31" r="9" className="svg-pin svg-pin--accent" />
                <circle cx="31" cy="0" r="9" className="svg-pin svg-pin--accent" />
                <circle cx="0" cy="31" r="9" className="svg-pin svg-pin--accent" />
                <circle cx="-31" cy="0" r="9" className="svg-pin svg-pin--accent" />
                <text x="35" y="-8" className="svg-text">90°</text>
              </>
            )}
          </g>
        </svg>
      </div>
    </section>
  )
}
