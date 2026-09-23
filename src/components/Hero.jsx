import { hero, campaign } from '../data/site.js'
import { useInView } from '../hooks/useInView.js'

/** Hero + the campaign view. The reference bans photography and 3D — the proof
 *  is product UI and monospace data, so the schema itself is the hero image. */
export default function Hero() {
  const [ref, inView] = useInView({ threshold: 0.12 })

  return (
    <section className="section hero" id="top">
      <div className="wrap">
        <p className="hero__eyebrow">
          {/* a live indicator, not a bullet: a ring that breathes around a core */}
          <span className="live" aria-hidden="true"><i /><b /></span>
          <span className="eyebrow">{hero.eyebrow}</span>
          <span className="eyebrow hero__live">Live</span>
        </p>

        <h1 className="display">{hero.title}</h1>
        <p className="lead hero__dek">{hero.dek}</p>

        <div className="hero__actions">
          <a className="btn btn--solid" href="#enquiry">{hero.primary}</a>
          <a className="btn btn--ghost" href="#how">{hero.secondary}</a>
        </div>

        <div ref={ref} className={'panel' + (inView ? ' is-in' : '')}>
          <div className="panel__chrome">
            <span className="data panel__id">{campaign.id}</span>
            <span className="panel__status"><i />{campaign.status}</span>
          </div>

          <div className="panel__body">
            <aside className="panel__side">
              <p className="eyebrow panel__sidelabel">Campaign</p>
              {campaign.nav.map((n, i) => (
                <span
                  key={n}
                  className={'panel__nav' + (n === campaign.active ? ' is-on' : '')}
                  style={{ '--d': 120 + i * 40 + 'ms' }}
                >{n}</span>
              ))}
            </aside>

            <div className="panel__main">
              <div className="stats">
                {campaign.stats.map((s, i) => (
                  <div className="stat" key={s.l} style={{ '--d': 200 + i * 60 + 'ms' }}>
                    <b>{s.v}</b>
                    <span className="eyebrow">{s.l}</span>
                  </div>
                ))}
              </div>

              <div className="chart" style={{ '--d': '440ms' }}>
                <p className="eyebrow">Binding response · run 04</p>
                <Sensorgram />
              </div>

              <div className="schema" style={{ '--d': '560ms' }}>
                <pre className="data schema__head">{fmt(campaign.head)}</pre>
                {campaign.rows.map((r, i) => (
                  <pre className="data schema__row" key={r[0]} style={{ '--d': 600 + i * 50 + 'ms' }}>{fmt(r)}</pre>
                ))}
              </div>
            </div>
          </div>

          <div className="panel__term">
            <pre className="data term__cmd" style={{ '--d': '820ms' }}>{campaign.cmd}</pre>
            <pre className="data term__out" style={{ '--d': '960ms' }}>{campaign.out}</pre>
          </div>
        </div>
      </div>
    </section>
  )
}

/* fixed-width columns so the schema reads as a real table, not prose */
const W = [13, 15, 11, 9, 10]
const fmt = (cells) => cells.map((c, i) => String(c).padEnd(W[i])).join('').trimEnd()

/** Four association/dissociation curves. Drawn, not photographed — geometric
 *  primitives and product UI only. */
function Sensorgram() {
  const curves = [1, 0.74, 0.5, 0.29]
  return (
    <svg className="chart__svg" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
      {curves.map((amp, i) => {
        const top = 110 - amp * 88
        const d = `M0 110 C 170 ${110 - amp * 66}, 300 ${top + 6}, 470 ${top} L 560 ${top}` +
                  ` C 700 ${top + amp * 26}, 850 ${110 - amp * 14}, 1000 ${110 - amp * 8}`
        return <path key={i} d={d} fill="none" stroke="var(--accent)" strokeWidth="1.25" opacity={0.28 + amp * 0.52} />
      })}
      <line x1="0" y1="110" x2="1000" y2="110" stroke="var(--hairline)" strokeWidth="1" />
    </svg>
  )
}
