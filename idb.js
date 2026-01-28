import { openDB } from 'idb';

const DB_NAME = 'asha_offline_db';
const DB_VERSION = 1;

export async function getDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('patients')) {
        db.createObjectStore('patients', { keyPath: 'localId' });
      }
      if (!db.objectStoreNames.contains('queue')) {
        db.createObjectStore('queue', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('meta')) {
        db.createObjectStore('meta');
      }
    }
  });
}

export async function addLocalPatient(patient) {
  const db = await getDB();
  await db.put('patients', patient);
}

export async function getAllLocalPatients() {
  const db = await getDB();
  return db.getAll('patients');
}

export async function addToQueue(op) {
  const db = await getDB();
  return db.add('queue', op);
}

export async function getQueue() {
  const db = await getDB();
  return db.getAll('queue');
}

export async function clearQueue() {
  const db = await getDB();
  const tx = db.transaction('queue', 'readwrite');
  await tx.store.clear();
  await tx.done;
}
