import { useState } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import LogoStrip from './components/LogoStrip.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Domains from './components/Domains.jsx'
import RunView from './components/RunView.jsx'
import Metrics from './components/Metrics.jsx'
import Enquiry from './components/Enquiry.jsx'
import Faq from './components/Faq.jsx'
import Footer from './components/Footer.jsx'

/** Section order matches Figma frame "Mextropic — Refero v1" top to bottom. */
export default function App() {
  const [picked, setPicked] = useState([])
  const pick = (n) => setPicked((p) => (p.includes(n) ? p : [...p, n]))
  const drop = (n) => setPicked((p) => p.filter((x) => x !== n))

  return (
    <div className="shell">
      <Nav />
      <main>
        <Hero />
        <LogoStrip />
        <HowItWorks />
        <Domains onPick={pick} picked={picked} />
        <RunView />
        <Metrics />
        <Enquiry picked={picked} onRemove={drop} />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}
