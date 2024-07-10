import pkg from 'pg';
const { Client } = pkg;
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';

async function main() {
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
    return;
  }

  // Initialize Express
  const app = express();

  // Middleware pour parser les requêtes en JSON
  app.use(express.json());

  // Cors middleware pour autoriser toutes les requêtes
  app.use(cors({ origin: '*' }));

  // ROUTES

  // GET /users
  app.get('/users', async (req, res) => {
    try {
      const result = await client.query('SELECT * FROM users');
      res.json(result.rows);
    } catch (error) {
      console.error('Error retrieving users:', error);
      res.status(500).json({ error: 'Database error' });
    }
  });

  // Create HTTP server
  const server = http.createServer(app);

  // Create Socket.io server and attach it to the HTTP server
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  // Event listener for new connection
  io.on('connection', (socket) => {
    console.log('New connection', socket.id);

    // Event listener for new message
    socket.on('message', async (message) => {
      console.log('message received', message);

      try {
        // Validate message
        if (!message.content || !message.userId || !message.channelId) {
          throw new Error('Invalid message format');
        }

        // Insert message into database
        const result = await client.query(
          'INSERT INTO messages (content, "userId", "channelId") VALUES ($1, $2, $3) RETURNING *',
          [message.content, message.userId, message.channelId],
        );
        console.log('Message saved to database', result.rows[0]);

        // Emit message to all clients
        io.emit('message', result.rows[0]);
      } catch (error) {
        console.error('Error saving message to database', error);
        socket.emit('error', 'Error saving message to database');
      }
    });

    // Event listener for disconnection
    socket.on('disconnect', () => {
      console.log('Client disconnected', socket.id);
    });
  });

  // Start the server on port 3000
  server.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
  });
}

main();
