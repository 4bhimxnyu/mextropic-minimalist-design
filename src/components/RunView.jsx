import { useCallback, useEffect, useRef } from 'react'
import { CENSORED, FAILED, legend } from '../data/site.js'
import { useInView } from '../hooks/useInView.js'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

const COLS = 12
const ROWS = 8
const GROW = 2          // px added on every side
const RADIUS = 52       // reaches the 3x3 block around the cursor

/** The 96-well plate.
 *
 *  On entering view every well fades in individually on a diagonal stagger.
 *
 *  On hover, every well whose centre falls inside RADIUS of the cursor grows by
 *  2px on each side. It is a transform, so the grid never reflows - 96 wells
 *  changing layout size would push each other around and jitter the whole plate.
 *
 *  Positions are written straight to the nodes inside one rAF rather than
 *  through state: 96 React re-renders per mousemove would drop frames for no
 *  benefit, since nothing else depends on the value. */
export default function RunView() {
  const [ref, inView] = useInView({ threshold: 0.25 })
  const plate = useRef(null)
  const wells = useRef([])
  const frame = useRef(0)
  const scale = useRef(1.18)
  const reduced = useReducedMotion()

  // the growth is 2px per side of the ACTUAL well, which shrinks with the
  // viewport - deriving the factor keeps it 2px at every width
  const measure = useCallback(() => {
    const w = wells.current[0]
    if (!w) return
    const s = w.getBoundingClientRect().width
    if (s > 0) scale.current = (s + GROW * 2) / s
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure, { passive: true })
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  const apply = useCallback((cx, cy) => {
    const box = plate.current.getBoundingClientRect()
    const cell = box.width / COLS
    for (let i = 0; i < wells.current.length; i++) {
      const el = wells.current[i]
      if (!el) continue
      const r = Math.floor(i / COLS)
      const c = i % COLS
      const wx = (c + 0.5) * cell
      const wy = (r + 0.5) * cell
      const near = cx !== null && Math.hypot(wx - cx, wy - cy) < RADIUS
      el.style.transform = near ? 'scale(' + scale.current + ')' : ''
      el.style.zIndex = near ? '1' : ''
    }
  }, [])

  const onMove = (e) => {
    if (reduced) return
    const box = plate.current.getBoundingClientRect()
    const cx = e.clientX - box.left
    const cy = e.clientY - box.top
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => apply(cx, cy))
  }

  const onLeave = () => {
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => apply(null, null))
  }

  const state = (i) => (FAILED.includes(i) ? 'failed' : CENSORED.includes(i) ? 'censored' : 'returned')

  return (
    <section className="section">
      <div className="wrap">
        <div className="head">
          <p className="eyebrow">Visibility</p>
          <h2 className="h2">Every well accounted for.</h2>
          <p className="lead">Samples, QC and results land as each run clears — one campaign ID, one schema, failures included.</p>
        </div>

        <div className="qc" ref={ref}>
          <div className="plate" ref={plate} onMouseMove={onMove} onMouseLeave={onLeave}>
            {Array.from({ length: COLS * ROWS }, (_, i) => {
              const r = Math.floor(i / COLS)
              const c = i % COLS
              return (
                <span
                  key={i}
                  ref={(el) => { wells.current[i] = el }}
                  className={'well well--' + state(i) + (inView ? ' is-in' : '')}
                  style={{ '--d': (r + c) * 14 + 'ms' }}
                />
              )
            })}
          </div>

          <div className="qc__legend">
            <p className="data qc__id">MXQ-2026-0417 · antibody affinity panel</p>
            {legend.map((l) => (
              <div className="qc__row" key={l.k}>
                <span className={'swatch swatch--' + l.k} />
                <div>
                  <p className="qc__n">{l.n}</p>
                  <p className="small qc__d">{l.d}</p>
                </div>
              </div>
            ))}
            <p className="caption qc__claim">Failures returned. Limits marked. Covariates exposed.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
