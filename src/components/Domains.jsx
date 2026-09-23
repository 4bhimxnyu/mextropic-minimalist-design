import { domains } from '../data/site.js'

/** Hovering sweeps a primary wash across the row; clicking scrolls to the form
 *  and carries the domain with it, so the click means something. */
export default function Domains({ onPick, picked = [] }) {
  return (
    <section className="section" id="offer">
      <div className="wrap">
        <div className="head">
          <p className="eyebrow">Assay catalogue</p>
          <h2 className="h2">What we offer.</h2>
          <p className="lead">Configured as one campaign, returned as one schema — whichever domains the question needs.</p>
        </div>

        <div className="domains">
          {domains.map((d) => {
            const on = picked.includes(d.t)
            return (
              <a
                className={'domain' + (on ? ' is-picked' : '')}
                key={d.t}
                href="#enquiry"
                onClick={() => onPick && onPick(d.t)}
              >
                <span className="domain__wash" aria-hidden="true" />
                <span className="domain__t">{d.t}</span>
                <span className="data domain__s">{d.s}</span>
                <span className="domain__add eyebrow">{on ? 'Added' : 'Add'}</span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
