import React, { useState } from 'react';
import { addLocalPatient, addToQueue } from '../services/idb';
import { nanoid } from 'nanoid';

export default function PatientRegister() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState(null);

  async function submit(e) {
    e.preventDefault();
    const localId = `local_${nanoid()}`;
    const payload = {
      localId,
      name,
      age: Number(age),
      phone,
      updatedAt: new Date().toISOString(),
    };
    await addLocalPatient(payload);
    await addToQueue({ type: 'createPatient', payload, createdAt: new Date().toISOString() });
    setMsg('Saved locally. Will sync when online.');
    setName(''); setAge(''); setPhone('');
  }

  return (
    <form onSubmit={submit} style={{ maxWidth: 420 }}>
      <h2>Register Patient</h2>
      <label>Name<input value={name} onChange={e=>setName(e.target.value)} required /></label>
      <label>Age<input value={age} onChange={e=>setAge(e.target.value)} /></label>
      <label>Phone<input value={phone} onChange={e=>setPhone(e.target.value)} /></label>
      <button type="submit">Save</button>
      {msg && <div>{msg}</div>}
    </form>
  );
}
