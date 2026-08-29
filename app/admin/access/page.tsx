import Link from "next/link";
import "./access.css";

const rows = [
  ["View civic and stewardship content", "Public", "Public"],
  ["Share public content", "Public", "Public"],
  ["View Youth Voice ideas and responses", "Public", "Public"],
  ["Comment, support, or submit an idea", "Member", "Verified account"],
  ["Share a testimonial", "Member", "Verified account"],
  ["Apply for opportunities and benefits", "Member", "Profile + purpose consent"],
  ["View voucher and application status", "Member", "Verified account"],
  ["Use Ambassador sharing toolkit", "Ambassador", "Approved role"],
  ["View Ambassador activity metrics", "Ambassador", "Own activity only"],
  ["View deeper community insights", "Ambassador", "Approved role + privacy rules"],
  ["Moderate, approve, and import", "Administrator", "Admin role + audit log"],
];

export default function AccessPage() {
  return <main><nav className="nav"><Link className="brand" href="/admin"><span className="brand-mark">DG</span><span>DoingGood <b>Youth Connect</b></span></Link><Link className="text-link" href="/admin">← Admin hub</Link></nav>
    <section className="access-hero"><p className="eyebrow yellow">Administration · Access policy</p><h1>Open sharing. Responsible access.</h1><p>Public content should travel freely. Personal actions, benefits, deeper tools, and administrative controls require the right level of verification.</p></section>
    <section className="access-page"><div className="access-heading"><div><p className="eyebrow blue">Approved access matrix</p><h2>Who can do what</h2></div><span className="policy-pill">Policy draft · ready for backend</span></div>
      <div className="access-note"><b>Sharing is public by default.</b><span>Anyone may share public DYC content. Sharing does not expose private profile information or grant access to restricted actions.</span></div>
      <div className="access-table"><div className="access-row access-header"><span>Activity</span><span>Access level</span><span>Requirement</span></div>{rows.map(([activity,level,requirement])=><div className="access-row" key={activity}><span>{activity}</span><strong className={`level-${level.toLowerCase()}`}>{level}</strong><span className="requirement">{requirement}</span></div>)}</div>
      <div className="access-cards"><article><p className="eyebrow yellow">Ambassador boundary</p><h3>More tools, not private data</h3><p>Ambassadors can access their own sharing links, reach, clicks, referrals, and approved content tools. They cannot view another person’s private profile, political preference, or sensitive attribute.</p></article><article><p className="eyebrow blue">Consent boundary</p><h3>Benefits stay independent</h3><p>Opportunity, civic, SAIL, and political communication consent remain separate. Political consent never determines access to a benefit or opportunity.</p></article></div>
      <div className="access-footer"><Link className="button primary" href="/admin/import">Review contact import</Link><Link className="button secondary" href="/admin">Return to Admin</Link></div>
    </section></main>;
}
