// Point d'entrée de l'API Express

import pkg from 'pg';
const { Client } = pkg;
import express from 'express';

async function main() {
  const app = express();
  app.use(express.json());

  const client = new Client({
    user: 'myusername',
    host: 'localhost',
    database: 'local-discord-like',
    password: 'myuserpassword',
    port: 5432,
  });

  try {
    await client.connect();
    console.log('Database connection successful');
  } catch (error) {
    console.error('Error during database connection', error);
  }
}

main();
