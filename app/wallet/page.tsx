"use client";
import { useState } from "react";
import Link from "next/link";
import "./wallet.css";

function addMonths(date: Date, months: number) { const next = new Date(date); next.setMonth(next.getMonth() + months); return next; }
function displayDate(date: Date) { return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }); }

export default function WalletPage() {
  const [issuedAt, setIssuedAt] = useState<Date | null>(null);
  const issued = Boolean(issuedAt);
  const expiry = issuedAt ? addMonths(issuedAt, 12) : null;
  return <main>
    <nav className="nav"><Link className="brand" href="/"><span className="brand-mark">DG</span><span>DoingGood <b>Youth Connect</b></span></Link><Link className="text-link" href="/opportunities">← Opportunities</Link></nav>
    <section className="wallet-hero pattern"><p className="eyebrow">Your youth benefit</p><h1>Make room for your next idea.</h1><p>Get time to work, learn and build at SAIL Innovation Lab with a workspace gift from Senator Tokunbo Abiru’s DoingGood initiative.</p></section>
    <section className="wallet-section"><div><p className="eyebrow blue">SAIL Workspace Access</p><h2>A place to do your best work.</h2><p className="wallet-copy">Your ₦150,000 gift helps you book coworking sessions at SAIL Innovation Lab. You can book up to two times each week, choosing either an AM or PM session.</p><div className="journey"><span className="done">Gift available</span><i>→</i><span className={issued ? "done" : ""}>Approved</span><i>→</i><span>Book your seat</span><i>→</i><span>Start creating</span></div></div>
      <div className="voucher-card">{issued && issuedAt && expiry ? <><span className="voucher-status">Your voucher is approved</span><strong>DYC–SAIL–2026–00428</strong><p>Workspace gift<br/><b>₦150,000</b></p><small>Issued {displayDate(issuedAt)}<br/>Valid until {displayDate(expiry)}<br/>Up to 2 bookings each week<br/>Choose an AM or PM session<br/>Book at <em>space.sailfoundation.ng</em></small><a className="button primary" href="https://space.sailfoundation.ng" target="_blank" rel="noreferrer">Book your seat ↗</a></> : <><span className="voucher-status">Approval required</span><h3>Ready to get started?</h3><p>Request your workspace voucher. SAIL Alumni are auto-approved from verified records. Other applicants are reviewed for suitability and genuine need before approval.</p><button className="button primary" onClick={() => setIssuedAt(new Date())}>Request my voucher <span>→</span></button><small>Your voucher is issued only after backend approval.</small></>}</div></section>
    <section className="criteria"><p className="eyebrow yellow">Good to know</p><h2>Fair access for everyone.</h2><p>SAIL Alumni are auto-approved when their alumni record is verified. Other applicants are reviewed by an administrator for suitability and genuine need, because workspace places are limited. Approval is based on merit and is not guaranteed.</p><p>Once approved, the voucher is valid for 12 months from its issuance date. If it is not used for 30 days in a row, it becomes dormant and must be reactivated before the next booking. For secure booking, your email address, phone number and two names must match on DYC and SAIL.</p><a href="https://space.sailfoundation.ng" target="_blank" rel="noreferrer">See SAIL space and booking rules ↗</a></section>
    <footer><span className="brand-mark">DG</span><span>DoingGood Youth Connect</span><span className="footer-note">An initiative of Senator Tokunbo Abiru · Separate from SAIL</span></footer>
  </main>;
}
