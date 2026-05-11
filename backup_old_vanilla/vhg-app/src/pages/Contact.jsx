import React, { useState, useEffect, useRef } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';


function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", interest: "Site visit", project: "Any project", message: "" });
  const upd = (k, v) => setForm({ ...form, [k]: v });
  const submit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <React.Fragment>
      <Nav />

      <section className="page-hero" data-screen-label="01 Contact Hero">
        <div className="page-hero-inner">
          <div className="breadcrumb"><a href="index.html">Home</a><span>/</span><span>Contact Us</span></div>
          <div className="eyebrow" style={{color:"rgba(255,255,255,0.9)"}}>— Mon–Sat · 9am–7pm IST</div>
          <h1>Let's talk about <em>land,</em><br/>not leads.</h1>
          <p>Whether you're a first-time plot buyer, an NRI investor, or a landowner exploring an alliance — a real human will respond within four business hours.</p>
        </div>
      </section>

      <section className="page-body" data-screen-label="02 Contact Form">
        <div className="contact-grid">
          <div className="contact-form-wrap">
            <div className="eyebrow">— Send us a note</div>
            <h2>Tell us what <em>you're</em> looking for.</h2>
            <p>The more specific, the better — budget range, preferred corridor, timeline. We route every enquiry to the right specialist within four working hours.</p>

            {sent ? (
              <div style={{padding:"60px 0",textAlign:"center"}}>
                <div style={{fontFamily:"var(--display)",fontSize:48,color:"var(--sea)",marginBottom:16}}>Thank you.</div>
                <p style={{color:"var(--ink-2)",fontSize:16,lineHeight:1.6}}>Your enquiry is in. A member of our team will be in touch within four working hours — usually sooner.</p>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div className="form-grid">
                  <div className="field">
                    <label htmlFor="name">Full Name</label>
                    <input id="name" type="text" required value={form.name} onChange={e => upd("name", e.target.value)} placeholder="Your name" />
                  </div>
                  <div className="field">
                    <label htmlFor="phone">Phone</label>
                    <input id="phone" type="tel" required value={form.phone} onChange={e => upd("phone", e.target.value)} placeholder="+91 …" />
                  </div>
                  <div className="field full">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" required value={form.email} onChange={e => upd("email", e.target.value)} placeholder="you@example.com" />
                  </div>
                  <div className="field">
                    <label htmlFor="interest">I'm interested in</label>
                    <select id="interest" value={form.interest} onChange={e => upd("interest", e.target.value)}>
                      <option>Site visit</option>
                      <option>Buying a plot</option>
                      <option>NRI investment</option>
                      <option>Land alliance</option>
                      <option>Channel partnership</option>
                      <option>General enquiry</option>
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="project">Project / Corridor</label>
                    <select id="project" value={form.project} onChange={e => upd("project", e.target.value)}>
                      <option>Any project</option>
                      <option>Vel Serenity · Oragadam</option>
                      <option>Vel Aranya · Hosur</option>
                      <option>Vel Vistas · ECR</option>
                      <option>Vel Pravaaha · Coimbatore</option>
                      <option>Other / Need advice</option>
                    </select>
                  </div>
                  <div className="field full">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" rows="3" value={form.message} onChange={e => upd("message", e.target.value)} placeholder="Budget, timeline, questions…"></textarea>
                  </div>
                </div>
                <button type="submit" className="contact-submit">Send Enquiry →</button>
              </form>
            )}
          </div>

          <aside className="contact-aside">
            <div className="contact-card">
              <div className="label">Head Office</div>
              <h3>Chennai</h3>
              <p>No. 42, Anna Salai, T. Nagar<br/>Chennai, Tamil Nadu 600017</p>
              <p><a href="tel:+914444444444">+91 44 4444 4444</a></p>
            </div>
            <div className="contact-card">
              <div className="label">Regional Office</div>
              <h3>Coimbatore</h3>
              <p>3rd Floor, Avinashi Road<br/>Coimbatore, Tamil Nadu 641018</p>
              <p><a href="tel:+914224444444">+91 422 4444 444</a></p>
            </div>
            <div className="contact-card">
              <div className="label">Sales & Site Visits</div>
              <h3>Speak to a relationship manager</h3>
              <p>Monday–Saturday · 9am–7pm IST</p>
              <p><a href="tel:+919999999999">+91 99999 99999</a><br/><a href="mailto:hello@velhomesglobal.com">hello@velhomesglobal.com</a></p>
            </div>
            <div className="contact-card">
              <div className="label">For NRIs</div>
              <h3>Global Investor Connect</h3>
              <p>Cross-timezone support for buyers in UAE, Singapore, USA, UK, Australia.</p>
              <p><a href="mailto:nri@velhomesglobal.com">nri@velhomesglobal.com</a></p>
            </div>
          </aside>
        </div>

        <div className="contact-map" data-screen-label="03 Map">
          <div className="contact-map-frame">
            <div className="map-label">VHG Head Office · T. Nagar</div>
            <div className="map-pin"></div>
          </div>
        </div>
      </section>

      <Footer />
    </React.Fragment>
  );
}



export default ContactPage;
