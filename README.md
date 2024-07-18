# My Discord-Like Application

## Prerequisites

- **Node.js**: Ensure you have Node.js version >= 20 installed.

### Launch Front-End

1. Navigate to the front-end directory:
   ```sh
   cd front-end
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the Electron application:

   ```sh
   npm run start
   ```

## Back-End Setup

1. Navigate to the back-end directory:
   ```sh
   cd back-end
   ```
2. Open Docker Desktop application.
3. Launch the server with Docker:
   ```sh
   docker-compose up -d
   ```
4. Install dependencies:
   ```sh
   npm install
   ```
5. Initialize the database:
   ```sh
   npm run db:init
   ```
6. Start the back-end server:
   ```sh
   npm run start:dev
   ```

## Launch Application

1. Ensure Docker Desktop is running.
2. Follow the steps in the Back-End Setup section to start the back-end server.
3. Follow the steps in the Front-End Setup section to start the front-end application.

Now your application should be up and running! If you encounter any issues, ensure all prerequisites are met and that all services are correctly started.

## Implemented Features

- [x] Creation of a Discord-like application in an Electron window using the React framework
- [x] Ability to create multiple separate windows directly by clicking in the File -> New Window section
- [x] Activation of a background mode and use of notifications upon receiving a message
- [x] The WebSocket can send and receive messages in different discussion channels
- [x] Implementation of a database for message storage

### Screenshots App

![Login section](./docs/Screenshots%20/screenshots-1.png 'Login section')
