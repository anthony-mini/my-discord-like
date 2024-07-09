import pkg from 'pg';
const { Client } = pkg;

async function insertFakeUsers() {
  const client = new Client({
    user: 'myusername',
    host: 'localhost',
    database: 'local-discord-like',
    password: 'myuserpassword',
    port: 5432,
  });

  try {
    await client.connect();

    const users = [
      { username: 'user1', password: 'password1' },
      { username: 'user2', password: 'password2' },
      { username: 'user3', password: 'password3' },
    ];

    // Check if the user already exists before inserting
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
      }
    }

    console.log('Fake users inserted successfully');
  } catch (error) {
    console.error('Error during fake user insertion', error);
  } finally {
    await client.end();
  }
}

export default insertFakeUsers;
