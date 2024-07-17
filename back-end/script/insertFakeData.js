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
      { username: 'Alice', password: 'password1' },
      { username: 'Roberto', password: 'password2' },
      { username: 'Jules', password: 'password3' },
      { username: 'Miguellita', password: 'password4' },
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
      { title: 'Channel #1: General' },
      { title: 'Channel #2: Javascript' },
      { title: 'Channel #3: HTML' },
      { title: 'Channel #4: CSS' },
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
      // General channel messages
      {
        content: "Salut ! c'est Alice ! Tu vas bien ?",
        userId: 1,
        channelId: 1,
      },
      { content: 'Salut Alice ! Oui et toi ?', userId: 2, channelId: 1 },
      {
        content: 'Salut tout le monde ! Comment se passe votre journée ?',
        userId: 3,
        channelId: 1,
      },
      {
        content: 'Salut ! Ma journée se passe bien, et la tienne ?',
        userId: 4,
        channelId: 1,
      },
      { content: 'Je vais bien, merci !', userId: 1, channelId: 1 },

      // Javascript channel messages
      {
        content: 'Quelle est la différence entre let et var en Javascript ?',
        userId: 1,
        channelId: 2,
      },
      {
        content:
          'let a une portée de bloc tandis que var a une portée de fonction.',
        userId: 2,
        channelId: 2,
      },
      {
        content: 'Il faut toujours utiliser let ou const au lieu de var.',
        userId: 3,
        channelId: 2,
      },
      {
        content: 'Oui, const est aussi à portée de bloc et immuable.',
        userId: 4,
        channelId: 2,
      },
      { content: 'Merci pour la clarification !', userId: 1, channelId: 2 },

      // HTML channel messages
      {
        content:
          'Quelqu’un peut m’expliquer l’utilité de la balise <div> en HTML ?',
        userId: 2,
        channelId: 3,
      },
      {
        content:
          '<div> est utilisé comme conteneur pour d’autres éléments HTML.',
        userId: 1,
        channelId: 3,
      },
      {
        content:
          "C'est un élément de niveau bloc et il n'a pas de signification propre.",
        userId: 3,
        channelId: 3,
      },
      {
        content:
          'Vous pouvez le styliser avec CSS et le manipuler avec JavaScript.',
        userId: 4,
        channelId: 3,
      },
      { content: 'Compris, merci à tous !', userId: 2, channelId: 3 },

      // CSS channel messages
      {
        content: 'Comment centrer un div horizontalement en CSS ?',
        userId: 3,
        channelId: 4,
      },
      {
        content: 'Vous pouvez utiliser margin: auto;',
        userId: 1,
        channelId: 4,
      },
      {
        content:
          'Une autre façon est d’utiliser flexbox : display: flex; justify-content: center;',
        userId: 2,
        channelId: 4,
      },
      {
        content: 'J’utilise généralement flexbox, c’est plus polyvalent.',
        userId: 4,
        channelId: 4,
      },
      {
        content: 'Merci, je vais essayer les deux méthodes !',
        userId: 3,
        channelId: 4,
      },
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
