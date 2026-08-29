import Link from 'next/link';

const reports = [
  { year: '2021', title: 'Youth skills and opportunity', tag: 'Youth', status: 'Evidence available', text: 'Initiatives supporting skills development, enterprise, and access to opportunity.' },
  { year: '2023', title: 'Education and bursary support', tag: 'Education', status: 'Report published', text: 'Education-focused interventions and support for young people across communities.' },
  { year: '2025', title: 'Community impact and inclusion', tag: 'Community', status: 'Ongoing', text: 'Community-facing work, partnerships, and routes for residents to be heard.' },
];

export default function StewardshipPage() {
  return <main><nav className="nav"><Link className="brand" href="/"><span className="brand-mark">DG</span><span>DoingGood <b>Youth Connect</b></span></Link><Link className="text-link" href="/">← Back to DYC</Link></nav><section className="report-hero pattern"><p className="eyebrow">Stewardship report · 2021—2026</p><h1>Progress should be visible.</h1><p>Explore the record, read the evidence, and add your questions or community experience.</p></section><section className="report-list"><div className="report-list-head"><div><p className="eyebrow blue">Five years of service</p><h2>Ideas, action, accountability.</h2></div><span className="prototype-pill">Prototype content</span></div>{reports.map(r=><article className="report-item" key={r.year}><div className="report-year">{r.year}</div><div><span className="report-tag">{r.tag} · {r.status}</span><h3>{r.title}</h3><p>{r.text}</p><div className="report-actions"><button>Ask a question</button><button>Share this report ↗</button></div></div></article>)}</section><footer><span className="brand-mark">DG</span><span>DoingGood Youth Connect</span><span className="footer-note">An initiative of Senator Tokunbo Abiru · Separate from SAIL</span></footer></main>;
}
