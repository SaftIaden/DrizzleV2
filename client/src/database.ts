import { openDB } from 'idb';

async function openDatabase() {
  const db = await openDB('drizzleDB', 1, {
    upgrade(db) {
      db.createObjectStore('preferences', { keyPath: 'id' });
    },
  });

  return db;
}

export default openDatabase;
