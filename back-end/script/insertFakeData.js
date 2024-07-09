import pkg from 'pg';
const { Client } = pkg;

async function insertFakeData() {
  const client = new Client({
    user: 'myusername',
    host: 'localhost',
    database: 'local-discord-like',
    password: 'myuserpassword',
    port: 5432,
  });

  try {
    await client.connect();
    console.log('Connected to the database');

    // Insert fake users
    const users = [
      { username: 'user1', password: 'password1' },
      { username: 'user2', password: 'password2' },
      { username: 'user3', password: 'password3' },
    ];

    for (const user of users) {
      const res = await client.query(
        'SELECT * FROM users WHERE username = $1',
        [user.username],
      );
      if (res.rows.length === 0) {
        await client.query(
          'INSERT INTO users (username, password) VALUES ($1, $2)',
          [user.username, user.password],
        );
        console.log(`Inserted user ${user.username}`);
      } else {
        console.log(`User ${user.username} already exists`);
      }
    }

    // Insert fake channels
    const channels = [
      { title: 'general' },
      { title: 'random' },
      { title: 'help' },
    ];

    for (const channel of channels) {
      const res = await client.query(
        'SELECT * FROM channels WHERE title = $1',
        [channel.title],
      );
      if (res.rows.length === 0) {
        await client.query('INSERT INTO channels (title) VALUES ($1)', [
          channel.title,
        ]);
        console.log(`Inserted channel ${channel.title}`);
      } else {
        console.log(`Channel ${channel.title} already exists`);
      }
    }

    // Insert fake messages
    const messages = [
      { content: 'Hello, this is user1!', userId: 1, channelId: 1 },
      { content: 'Hi, user1! This is user2.', userId: 2, channelId: 1 },
      { content: 'Random message from user3', userId: 3, channelId: 2 },
    ];

    for (const message of messages) {
      await client.query(
        'INSERT INTO messages (content, "userId", "channelId") VALUES ($1, $2, $3)',
        [message.content, message.userId, message.channelId],
      );
      console.log(`Inserted message: ${message.content}`);
    }

    console.log('Fake data inserted successfully');
  } catch (error) {
    console.error('Error during fake data insertion', error);
  } finally {
    await client.end();
    console.log('Disconnected from the database');
  }
}

export default insertFakeData;
