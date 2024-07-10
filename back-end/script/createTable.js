import pkg from 'pg';
const { Client } = pkg;

async function createTable() {
  const client = new Client({
    user: 'myusername',
    host: 'localhost',
    database: 'local-discord-like',
    password: 'myuserpassword',
    port: 5432,
  });

  try {
    await client.connect();

    await client.query(`
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        password VARCHAR(50) NOT NULL
        );
    `);

    await client.query(`
        CREATE TABLE IF NOT EXISTS channels (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL UNIQUE
        );
    `);

    await client.query(`
        CREATE TABLE IF NOT EXISTS messages (
            id SERIAL PRIMARY KEY,
            content TEXT NOT NULL,
            "userId" INTEGER REFERENCES users(id),
            "channelId" INTEGER REFERENCES channels(id),
            "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
  } catch (error) {
    console.error(error);
    console.log('Error during database setup');
  } finally {
    await client.end();
    console.log('Database setup complete');
  }
}

export default createTable;
