import { getQueue, clearQueue } from './idb';
import { syncPatients } from './api';

export async function trySync(token) {
  if (!navigator.onLine) return { ok: false, reason: 'offline' };
  const queue = await getQueue();
  if (!queue.length) return { ok: true, synced: [] };
  const patients = queue.filter(q => q.type === 'createPatient').map(q => q.payload);
  try {
    const resp = await syncPatients(token, patients);
    await clearQueue();
    return { ok: true, resp };
  } catch (err) {
    return { ok: false, err };
  }
}

export function installAutoSync(getToken) {
  window.addEventListener('online', async () => {
    const token = getToken();
    if (!token) return;
    await trySync(token);
  });
}
