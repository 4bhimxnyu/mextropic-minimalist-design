import { useState } from 'react'
import { faqs } from '../data/site.js'

const DEFAULT_OPEN = 0

/** Hover opens that question; with nothing hovered the default returns. Exactly
 *  one is ever open. Click latches, so touch and keyboard are not shut out. */
export default function Faq() {
  const [hovered, setHovered] = useState(null)
  const [pinned, setPinned] = useState(DEFAULT_OPEN)
  const open = hovered !== null ? hovered : pinned

  return (
    <section className="section" id="faq">
      <div className="wrap">
        <div className="head">
          <p className="eyebrow">Resources</p>
          <h2 className="h2">Common questions.</h2>
        </div>

        <div className="faq" onMouseLeave={() => setHovered(null)}>
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div
                className={'faq__row' + (isOpen ? ' is-open' : '')}
                key={f.q}
                onMouseEnter={() => setHovered(i)}
              >
                <button
                  className="faq__q"
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setPinned(isOpen && pinned === i ? -1 : i)}
                  onFocus={() => setHovered(i)}
                >
                  <span>{f.q}</span>
                  <span className="faq__sign" aria-hidden="true">{isOpen ? '–' : '+'}</span>
                </button>
                <div className={'faq__a' + (isOpen ? ' is-open' : '')}>
                  <div><p className="body">{f.a}</p></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
