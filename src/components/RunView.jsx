import { useRef, useState } from 'react'
import { CENSORED, FAILED, legend } from '../data/site.js'
import { useInView } from '../hooks/useInView.js'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

const COLS = 12
const ROWS = 8

/** The 96-well plate. Two behaviours:
 *
 *  1. On entering view every well lights individually on a diagonal stagger —
 *     each is plainly its own event, but they read as a single sweep.
 *
 *  2. A frosted lens follows the cursor. In Figma this had to sit off to one
 *     side, because a component cannot lift its overflow above later siblings
 *     and the wells below painted over it. On the web there is no such limit:
 *     the lens is a sibling of the grid, sits above all of it, and is genuinely
 *     centred on the pointer. The backdrop blur has real detail to work on here,
 *     which is why it reads as glass rather than as a flat tint. */
export default function RunView() {
  const [ref, inView] = useInView({ threshold: 0.25 })
  const plate = useRef(null)
  const [lens, setLens] = useState(null)
  const reduced = useReducedMotion()

  const onMove = (e) => {
    if (reduced) return
    const r = plate.current.getBoundingClientRect()
    setLens({ x: e.clientX - r.left, y: e.clientY - r.top })
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
          <div
            className="plate"
            ref={plate}
            onMouseMove={onMove}
            onMouseLeave={() => setLens(null)}
          >
            {Array.from({ length: COLS * ROWS }, (_, i) => {
              const r = Math.floor(i / COLS)
              const c = i % COLS
              return (
                <span
                  key={i}
                  className={'well well--' + state(i) + (inView ? ' is-in' : '')}
                  style={{ '--d': (r + c) * 14 + 'ms' }}
                />
              )
            })}
            {lens && (
              <span
                className="plate__lens"
                aria-hidden="true"
                style={{ left: lens.x + 'px', top: lens.y + 'px' }}
              />
            )}
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
