import React, { useState } from 'react';
import { registerAsha } from '../services/api';

export default function RegisterAsha() {
  const [ashaId, setAshaId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  async function submit(e) {
    e.preventDefault();
    const res = await registerAsha({ ashaId, name, password });
    setMsg(res.message || JSON.stringify(res));
  }

  return (
    <form onSubmit={submit} style={{ maxWidth: 360 }}>
      <h2>Register ASHA</h2>
      <label>ASHA ID<input value={ashaId} onChange={e=>setAshaId(e.target.value)} required/></label>
      <label>Name<input value={name} onChange={e=>setName(e.target.value)} /></label>
      <label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></label>
      <button type="submit">Register</button>
      {msg && <div>{msg}</div>}
    </form>
  );
}
