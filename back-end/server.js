// Point d'entrée de l'API Express

import { Client } from 'pg';

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
}
