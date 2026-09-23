import { steps } from '../data/site.js'
import { useScrollProgress } from '../hooks/useScrollProgress.js'

/** Scroll-driven, and symmetric: the readout steps 0/25/50/75/100 going down and
 *  reverses exactly going up. Progress maps to the SECTION's own extent, never a
 *  fixed viewport window — a fixed window saturates early and then looks dead. */
export default function HowItWorks() {
  const [ref, active] = useScrollProgress(4)

  return (
    <section className="section" id="how" ref={ref}>
      <div className="wrap">
        <div className="head">
          <p className="eyebrow">How it works</p>
          <h2 className="h2">Four steps to data.</h2>
          <p className="lead">One scoped pilot, one set of deliverables, and a number within 24 hours.</p>
        </div>

        <div className="prog">
          <div className="prog__meta">
            <span className="eyebrow">Scroll progress</span>
            <span className="data prog__readout">{active * 25}%</span>
          </div>
          <div className="prog__rail">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={'prog__seg' + (i < active ? ' is-on' : '')} />
            ))}
          </div>
        </div>

        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.n} className={'step' + (i < active ? ' is-on' : '')}>
              <p className="step__meta">
                <span className="eyebrow step__n">{s.n}</span>
                <span className="eyebrow step__k">{s.k}</span>
              </p>
              <h3 className="h3">{s.t}</h3>
              <p className="body">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
