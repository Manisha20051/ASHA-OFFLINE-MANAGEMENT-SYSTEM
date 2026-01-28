const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

export async function login(ashaId, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ashaId, password })
  });
  return res.json();
}

export async function registerAsha({ ashaId, name, password }) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ashaId, name, password })
  });
  return res.json();
}

export async function syncPatients(token, patients) {
  const res = await fetch(`${API_BASE}/sync`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ patients })
  });
  return res.json();
}
