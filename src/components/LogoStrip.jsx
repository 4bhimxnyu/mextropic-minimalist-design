import { institutions } from '../data/site.js'

export default function LogoStrip() {
  return (
    <section className="section strip">
      <div className="wrap">
        <p className="eyebrow">Built by researchers from</p>
        <ul className="strip__list">
          {institutions.map((i) => (
            <li key={i.name}>
              <img src={i.src} alt={i.name} style={{ '--h': i.h + 'px' }} loading="lazy" decoding="async" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
