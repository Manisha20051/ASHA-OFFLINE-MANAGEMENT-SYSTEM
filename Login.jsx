import React, { useState } from 'react';
import { login } from '../services/api';

export default function Login({ onLogin }) {
  const [ashaId, setAshaId] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);

  async function submit(e) {
    e.preventDefault();
    const res = await login(ashaId, password);
    if (res.token) {
      localStorage.setItem('token', res.token);
      onLogin(res.token);
    } else {
      setErr(res.message || 'Login failed');
    }
  }

  return (
    <form onSubmit={submit} style={{ maxWidth: 360 }}>
      <h2>ASHA Login</h2>
      <label>ASHA ID<input value={ashaId} onChange={e=>setAshaId(e.target.value)} required/></label>
      <label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></label>
      <button type="submit">Login</button>
      {err && <div style={{color:'red'}}>{err}</div>}
    </form>
  );
}
