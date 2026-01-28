import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import RegisterAsha from './components/RegisterAsha';
import PatientRegister from './components/PatientRegister';
import { installAutoSync, trySync } from './services/offlineSync';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [status, setStatus] = useState(navigator.onLine ? 'online' : 'offline');

  useEffect(()=>{
    installAutoSync(()=>localStorage.getItem('token'));
    window.addEventListener('online', ()=>setStatus('online'));
    window.addEventListener('offline', ()=>setStatus('offline'));
  },[]);

  async function manualSync() {
    setStatus('syncing');
    const res = await trySync(token);
    setStatus(res.ok ? 'online' : (res.reason || 'sync failed'));
  }

  if (!token) {
    return (
      <div>
        <Login onLogin={t=>setToken(t)} />
        <hr />
        <RegisterAsha />
      </div>
    );
  }

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>Status: {status}</div>
        <div>
          <button onClick={manualSync}>Sync Now</button>
          <button onClick={()=>{localStorage.removeItem('token'); setToken(null);}}>Logout</button>
        </div>
      </div>
      <PatientRegister />
    </div>
  );
}
