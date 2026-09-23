// Copy lifted verbatim from Figma frame "Mextropic — Refero v1" (439:18).
// Figures marked UNVERIFIED in SPEC.md are flagged in the UI, not hidden.

export const nav = [
  { label: 'Platform', href: '#how' },
  { label: 'Assay catalogue', href: '#offer' },
  { label: 'How it works', href: '#how' },
  { label: 'About', href: '#footer' },
]

export const hero = {
  eyebrow: 'Wet-lab in the loop',
  title: 'Experiments in weeks, not months.',
  dek: 'From hypothesis to validated results — Mextropic runs the wet-lab work in the loop, so your team moves at the speed of the model, not the bench.',
  primary: 'Talk to our scientific team',
  secondary: 'See how it works',
}

// The product preview in the hero — a campaign view, not a screenshot.
export const campaign = {
  id: 'MXQ-2026-0417  ·  antibody affinity panel',
  status: 'Running',
  nav: ['Overview', 'Samples', 'Runs', 'QC', 'Results', 'Files'],
  active: 'Results',
  stats: [
    { v: '96', l: 'Wells' },
    { v: '81', l: 'Returned' },
    { v: '12', l: 'Censored' },
    { v: '3',  l: 'EXPR_FAIL' },
  ],
  // the schema IS the product, so the preview shows it literally
  head: ['design_id', 'assay', 'value', 'censor', 'flag'],
  rows: [
    ['DSN-00412', 'binding_kd', '3.4 nM',  '—', '—'],
    ['DSN-00413', 'binding_kd', '500 nM',  '>', '—'],
    ['DSN-00414', 'expression', '—',       '—', 'EXPR_FAIL'],
    ['DSN-00415', 'binding_kd', '12.8 nM', '—', '—'],
  ],
  cmd: '$ mextropic results --campaign MXQ-2026-0417 --format parquet',
  out: '✓ 96/96 wells accounted for  ·  12 censored  ·  3 EXPR_FAIL retained',
}

export const institutions = [
  { name: 'IIT Madras', src: '/logos/iit-madras.png', h: 37 },
  { name: 'Stanford',   src: '/logos/stanford.png',   h: 32 },
  { name: 'UCSF',       src: '/logos/ucsf.svg',       h: 28 },
]

export const steps = [
  { n: '01', k: 'Share',   t: 'Tell us what you want to test',
    d: 'The hypothesis, the data you need and your timeline. A scientist reads it, not a sales inbox.' },
  { n: '02', k: 'Scope',   t: 'A scoped quote in 24 hours',
    d: 'Assays, controls, deliverables, timeline and price — enough to decide without a discovery call.' },
  { n: '03', k: 'Run',     t: 'Experiments in our labs',
    d: 'Forward-deployed scientists execute against the agreed controls and QC, on named instruments.' },
  { n: '04', k: 'Deliver', t: 'Data as each run clears QC',
    d: 'Parquet rows streamed per campaign, with failures returned and limits marked — not a final PDF.' },
]

// 12 domains. The dek claims 14 — see SPEC.md, unresolved.
export const domains = [
  { t: 'Binding kinetics & affinity', s: 'SPR, BLI, equilibrium Kᴅ' },
  { t: 'Biophysical developability',  s: 'Aggregation, thermostability, viscosity' },
  { t: 'Cell-based & functional',     s: 'Reporter, proliferation, cytotoxicity' },
  { t: 'Bioprocess & fermentation',   s: 'Expression, titre, scale-down' },
  { t: 'Protein engineering',         s: 'Variant panels, affinity maturation' },
  { t: 'Synthetic biology',           s: 'Construct design, assembly, validation' },
  { t: 'Proteomics',                  s: 'LC-MS/MS, PTM mapping' },
  { t: 'Metabolomics',                s: 'Targeted and untargeted panels' },
  { t: 'Genomics & transcriptomics',  s: 'RNA-seq, coverage, differential' },
  { t: 'Structural biology',          s: 'Crystallography, cryo-EM support' },
  { t: 'Safety & ADMET',              s: 'Cytotox, hERG, microsomal stability' },
  { t: 'Hit identification',          s: 'Screening cascades, counter-screens' },
]

// 96 wells: 81 returned, 12 censored, 3 EXPR_FAIL — matching the legend exactly.
// Fixed positions so the render is deterministic rather than random per load.
export const CENSORED = [4, 9, 17, 25, 33, 38, 46, 57, 65, 70, 81, 88]
export const FAILED   = [26, 52, 79]

export const legend = [
  { k: 'returned',  n: '81 returned',  d: 'Values delivered against agreed controls' },
  { k: 'censored',  n: '12 censored',  d: 'Above limit of detection, marked with >' },
  { k: 'failed',    n: '3 EXPR_FAIL',  d: 'Kept in the dataset, not silently dropped' },
]

export const metrics = [
  { stack: ['0', '125', '250', '375', '500+'],       label: 'Scientists in the lab network', note: 'Define active, affiliated or accessible' },
  { stack: ['0', '20', '40', '60', '79'],            label: 'Assay capabilities',            note: 'Confirm count and categorisation' },
  { stack: ['0 hrs', '6 hrs', '12 hrs', '18 hrs', '24 hrs'], label: 'To a scoped quote',     note: 'Define start point and conditions' },
  { stack: ['0 wks', '1 wk', '2 wks', '3–4 wks'],    label: 'Kickoff to data',               note: 'Clarify assay and study dependencies' },
]

export const faqs = [
  { q: 'Who owns the data and discovery?',
    a: 'The customer owns proprietary discovery. Final IP and legal wording is pending review and approval.' },
  { q: 'How fast can we start?',
    a: 'Send the hypothesis and the readouts you need. A scientist reads it — not a sales inbox — and returns a scoped quote within 24 hours: assays, controls, deliverables, a committed delivery date and a price.' },
  { q: 'What is the typical turnaround?',
    a: 'Three to four weeks from kickoff to data for a standard campaign: construct, expression, purification, QC and assays in one cycle. Results stream as each run clears QC, rather than arriving together at the end.' },
  { q: 'Do you only run the assays listed?',
    a: 'No. The catalogue is a starting point, not a boundary. Bring your own protocol and controls and we execute against them on named instruments, returning the same schema as everything else.' },
  { q: 'Is the first batch really free?',
    a: 'The first batch of pilot data is free, subject to eligibility and the scope agreed in the quote.' },
  { q: 'Where are your labs located?',
    a: 'Operations run from 5900 Balcones Drive, STE 100, Austin, TX 78731. Work is executed across the lab network, and the specific sites and instruments for your campaign are named in the quote before anything starts.' },
  { q: 'How is quality controlled?',
    a: 'Every well is accounted for. Values above the limit of detection carry a > censor, expression failures are returned as EXPR_FAIL rather than silently dropped, and the covariates — plate, run date, instrument — travel with every row.' },
]

export const footerCols = [
  { h: 'Explore',   links: ['Platform', 'Assay catalogue', 'How it works', 'About us'] },
  { h: 'Resources', links: ['FAQ', 'Documentation', 'Insights', 'Scope an experiment'] },
  { h: 'Legal',     links: ['Privacy policy', 'Terms of use', 'Data ownership', 'Confidentiality'] },
]

export const contact = ['sayane@mextropic.com', 'pranav@mextropic.com']
export const office  = ['5900 Balcones Drive, STE 100', 'Austin, TX 78731']
