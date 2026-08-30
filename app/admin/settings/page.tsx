"use client";

import Link from "next/link";
import "../../globals.css";
import "../admin.css";
import "./settings.css";
import { useState } from "react";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [showKey, setShowKey] = useState(false);

  return <main>
    <nav className="nav"><Link className="brand" href="/"><span className="brand-mark">DG</span><span>DoingGood <b>Youth Connect</b></span></Link><Link className="text-link" href="/admin">← Admin home</Link></nav>
    <section className="settings-hero"><p className="eyebrow yellow">DYC administration · Project settings</p><h1>Connect the services that keep DYC moving.</h1><p>These settings are for administrators. Service credentials belong in the secure hosting environment, never in the public app or GitHub.</p></section>
    <section className="settings-page">
      <div className="settings-head"><div><p className="eyebrow blue">Email delivery</p><h2>Resend</h2></div><span className="settings-status"><i /> Not configured</span></div>
      <div className="settings-notice"><b>What this connection will do</b><p>Send one-time sign-in codes, application updates, approval requests, and important consent notices from DYC.</p></div>
      <form className="settings-card" onSubmit={(event) => { event.preventDefault(); setSaved(true); }}>
        <label>API key <span>Write-only secret</span><input aria-label="Resend API key" type={showKey ? "text" : "password"} placeholder="Paste the Resend key here" autoComplete="new-password" /></label>
        <button type="button" className="show-key" onClick={() => setShowKey(!showKey)}>{showKey ? "Hide key" : "Show while typing"}</button>
        <label>From address<input aria-label="Resend from address" type="email" defaultValue="no-reply@mail.dyc.doinggood.com.ng" /></label>
        <p className="settings-help">Use a Resend key with the minimum required permission. The secret must be saved in the hosting project’s protected environment—not in this page’s frontend.</p>
        <button className="settings-save" type="submit">{saved ? "Submitted for secure configuration ✓" : "Save connection details"}</button>
      </form>
      <div className="settings-checklist"><h3>Before enabling live email</h3><p>✓ Domain authentication completed for <b>mail.dyc.doinggood.com.ng</b></p><p>○ Add <b>RESEND_API_KEY</b> as a hosting secret</p><p>○ Send a test OTP to an administrator</p></div>
      <p className="settings-footnote"><Link href="/admin">Return to Admin home</Link> · Need help? The hosting project owner must complete the final secret entry.</p>
    </section>
  </main>;
}
