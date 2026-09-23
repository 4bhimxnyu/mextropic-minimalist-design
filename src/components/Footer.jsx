import { Logo } from './Nav.jsx'
import { footerCols, contact, office } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="section footer" id="footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="footer__mark"><Logo /> Mextropic</span>
            <p className="body">Autonomous wet-lab infrastructure for preclinical research.</p>
            <p className="body">{contact.join('  /  ')}</p>
            <address className="small footer__addr">
              {office.map((l) => <span key={l}>{l}</span>)}
            </address>
          </div>

          {footerCols.map((c) => (
            <nav className="footer__col" key={c.h} aria-label={c.h}>
              <p className="eyebrow">{c.h}</p>
              {c.links.map((l) => <a key={l} href="#top">{l}</a>)}
            </nav>
          ))}
        </div>

        <div className="footer__bottom">
          <span className="small">© {new Date().getFullYear()} Mextropic. All rights reserved.</span>
          <span className="small">Built for research teams, not for slide decks.</span>
        </div>
      </div>
    </footer>
  )
}
