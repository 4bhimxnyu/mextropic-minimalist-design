import { useEffect, useRef, useState } from 'react'
import { metrics } from '../data/site.js'
import { useInView } from '../hooks/useInView.js'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

/** The values load when the section is reached.
 *
 *  In Figma this had to be a stack of text layers HOLD-switched on a timeline,
 *  because keyframes interpolate properties and not text - so it could only ever
 *  be five discrete jumps. On the web there is no such limit, so this tweens the
 *  real number on rAF. Stepping the stack here just reproduced Figma's stutter. */
export default function Metrics() {
  const [ref, inView] = useInView({ threshold: 0.3 })

  return (
    <section className="section">
      <div className="wrap">
        <div className={'metrics' + (inView ? ' is-in' : '')} ref={ref}>
          {metrics.map((m, i) => {
            const target = m.stack[m.stack.length - 1]
            return (
              <div className="metric" key={m.label} style={{ '--d': 60 + i * 90 + 'ms' }}>
                <p className="metric__fig">
                  <Count to={target} run={inView} delay={60 + i * 90} />
                </p>
                <p className="metric__l">{m.label}</p>
                <p className="caption metric__n">{m.note}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/** Tweens the leading number and leaves the rest alone, so "3-4 wks" counts its
 *  3 and keeps the remainder, and "500+" keeps its plus. */
function Count({ to, run, delay, duration = 1100 }) {
  const reduced = useReducedMotion()
  const raf = useRef(0)
  const timer = useRef(0)

  const m = /^(\d+)([\s\S]*)$/.exec(to)
  const target = m ? parseInt(m[1], 10) : null
  const suffix = m ? m[2] : ''
  const [n, setN] = useState(target)

  useEffect(() => {
    if (target === null || reduced) { setN(target); return }
    if (!run) { setN(0); return }

    const ease = (t) => 1 - Math.pow(1 - t, 4)   // moves early, settles long
    let start = 0
    timer.current = setTimeout(() => {
      const step = (ts) => {
        if (!start) start = ts
        const t = Math.min(1, (ts - start) / duration)
        setN(Math.round(ease(t) * target))
        if (t < 1) raf.current = requestAnimationFrame(step)
      }
      raf.current = requestAnimationFrame(step)
    }, delay)

    return () => { clearTimeout(timer.current); cancelAnimationFrame(raf.current) }
  }, [run, target, delay, duration, reduced])

  if (target === null) return <>{to}</>
  // A unit keeps its meaning while counting - "18 hrs" is true on the way to 24.
  // A trailing "+" does not: "18+" asserts more than 18, which is simply wrong.
  // So the plus is withheld until the number is final.
  const plus = suffix.startsWith('+')
  const shown = plus && n < target ? suffix.slice(1) : suffix
  return (
    <span className="count">
      {/* the final string reserves the width so the column cannot reflow mid-count */}
      <span className="count__ghost" aria-hidden="true">{to}</span>
      <span className="count__v">{n}{shown}</span>
    </span>
  )
}
