"use client";

import Link from "next/link";
import "../../globals.css";
import "../admin.css";
import "./settings.css";
import { useState } from "react";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  return <main>
    <nav className="nav"><Link className="brand" href="/"><span className="brand-mark">DG</span><span>DoingGood <b>Youth Connect</b></span></Link><Link className="text-link" href="/admin">← Admin home</Link></nav>
    <section className="settings-hero"><p className="eyebrow yellow">DYC administration · Project settings</p><h1>Connect the services that keep DYC moving.</h1><p>These settings are for administrators. Service credentials belong in the secure hosting environment, never in the public app or GitHub.</p></section>
    <section className="settings-page">
      <div className="settings-head"><div><p className="eyebrow blue">Email delivery</p><h2>Cloudflare Worker + Resend</h2></div><span className="settings-status"><i /> Worker connected</span></div>
      <div className="settings-notice"><b>What this connection will do</b><p>Send one-time sign-in codes, application updates, approval requests, and important consent notices from DYC.</p></div>
      <div className="settings-card"><p><b>All DYC messages route through the Worker.</b></p><p className="settings-help">DYC sends only the email type, recipient, and message data to the Worker. The Resend API key remains inside Cloudflare and is never sent to this frontend.</p><p><b>Worker endpoint</b><br /><code>https://throbbing-rain-c43f.credithubng.workers.dev/send</code></p></div>
      <div className="settings-checklist"><h3>Email types ready</h3><p>✓ OTP and verification messages</p><p>✓ Admin invitations and access notices</p><p>✓ Approval, voucher, and consent notifications</p><p>✓ Generic DYC announcements</p></div>
      <p className="settings-footnote"><Link href="/admin">Return to Admin home</Link> · Need help? The hosting project owner must complete the final secret entry.</p>
    </section>
  </main>;
}
