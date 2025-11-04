import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Contact() {
  const loc = useLocation();
  const pre = loc.state && loc.state.prefill ? loc.state.prefill : null;
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (pre) {
      setForm(f => ({ ...f, subject: pre.subject || f.subject, message: pre.message || f.message }));
    }
  }, [pre]);

  const submit = (e) => {
    e.preventDefault();
    // Basic client-side validation
    if (!form.name || !form.email || !form.message) {
      setStatus("Please complete all fields.");
      return;
    }
    setStatus("Sending...");
    setTimeout(() => {
      setStatus("Message sent — we'll respond within 48 hours.");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 900);
  };

  return (
    <div className="container">
      <h2>📩 Contact Us</h2>

      <div className="card contact-card" style={{ padding: 20 }}>
        <p>For enquiries, partnership or support, fill the form below and we'll get back to you within 48 hours.</p>
        <form onSubmit={submit} className="contact-form">
          <label>Name</label>
          <input value={form.name} onChange={e=>setForm({...form, name: e.target.value})} type="text" placeholder="Your full name" required />

          <label>Email</label>
          <input value={form.email} onChange={e=>setForm({...form, email: e.target.value})} type="email" placeholder="you@example.com" required />

          <label>Subject</label>
          <input value={form.subject} onChange={e=>setForm({...form, subject: e.target.value})} type="text" placeholder="Subject" />

          <label>Message</label>
          <textarea value={form.message} onChange={e=>setForm({...form, message: e.target.value})} rows={6} placeholder="How can we help?" required />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button type="submit" className="btn">Send Message</button>
          </div>

          {status && <p style={{ marginTop: 12, color: status.startsWith('Message sent') ? 'green' : '#333' }}>{status}</p>}
        </form>
      </div>
    </div>
  );
}
