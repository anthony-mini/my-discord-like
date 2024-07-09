import createTables from './createTable.js';
import insertFakeUsers from './insertFakeData.js';

async function initDB() {
  try {
    await createTables();
    await insertFakeUsers();
    console.log('Database initialization complete');
  } catch (error) {
    console.error('Error during database initialization', error);
  }
}

initDB();
