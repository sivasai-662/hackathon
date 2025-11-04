import { useState } from "react";
import { useTravel } from "../context/TravelContext.jsx";

export default function AuthModal({ onClose }) {
  const { login, register } = useTravel();
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setError("");
    if (tab === "login") {
      const res = login({ email: form.email, password: form.password });
      if (!res.ok) setError(res.message || "Login failed");
      else onClose();
    } else {
      const res = register({ name: form.name, email: form.email, password: form.password });
      if (!res.ok) setError(res.message || "Register failed");
      else onClose();
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal small">
        <header className="modal-header">
          <h3>{tab === 'login' ? 'Login' : 'Register'}</h3>
          <button className="close" onClick={onClose}>✕</button>
        </header>
        <div className="modal-body">
          <div className="tabs">
            <button className={tab==='login'? 'active':''} onClick={()=>setTab('login')}>Login</button>
            <button className={tab==='register'? 'active':''} onClick={()=>setTab('register')}>Register</button>
          </div>
          <form onSubmit={submit} style={{ marginTop: 10 }}>
            {tab === 'register' && (
              <>
                <label>Name</label>
                <input required value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
              </>
            )}
            <label>Email</label>
            <input required type="email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
            <label>Password</label>
            <input required type="password" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} />

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 10 }}>
              <button type="button" className="btn" onClick={onClose}>Cancel</button>
              <button className="btn" type="submit">{tab === 'login' ? 'Login' : 'Create account'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
