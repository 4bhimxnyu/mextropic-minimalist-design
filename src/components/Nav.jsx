import { useEffect, useRef, useState } from 'react'
import { nav } from '../data/site.js'

export function Logo({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2.30762L21.2308 18.4615H2.76923L12 2.30762Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M12 8.76904L16.1538 15.6921H7.84615L12 8.76904Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  )
}

/** 64px bar, pinned. No bottom border — separation comes from spacing, and a
 *  hairline appears only once content has scrolled under it. */
export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const ticking = useRef(false)
  const bar = useRef(null)

  useEffect(() => {
    const update = () => { ticking.current = false; setSolid(window.scrollY > 8) }
    const onScroll = () => { if (!ticking.current) { ticking.current = true; requestAnimationFrame(update) } }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    const onDown = (e) => { if (bar.current && !bar.current.contains(e.target)) setOpen(false) }
    const mq = window.matchMedia('(min-width: 900px)')
    const onWide = () => { if (mq.matches) setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    mq.addEventListener('change', onWide)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
      mq.removeEventListener('change', onWide)
    }
  }, [open])

  return (
    <header className={'nav' + (solid || open ? ' is-solid' : '')} ref={bar}>
      <div className="nav__inner">
        <a className="nav__brand" href="#top"><Logo /> Mextropic</a>

        <nav className="nav__links" aria-label="Primary">
          {nav.map((l) => <a key={l.label} href={l.href}>{l.label}</a>)}
        </nav>

        <span className="nav__spacer" />

        <a className="nav__call" href="#enquiry">Book a call</a>
        <a className="btn btn--solid" href="#enquiry">Scope an experiment</a>

        <button
          className={'nav__toggle' + (open ? ' is-open' : '')}
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        ><span /><span /><span /></button>

        <div className={'nav__panel' + (open ? ' is-open' : '')}>
          <div className="nav__panel-inner">
            {nav.map((l) => <a key={l.label} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>)}
            <a href="#enquiry" onClick={() => setOpen(false)}>Book a call</a>
          </div>
        </div>
      </div>
    </header>
  )
}
