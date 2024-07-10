import { app, BrowserWindow, ipcMain, Notification } from 'electron';
import path from 'path';
import { io } from 'socket.io-client';

interface Message {
  id: number;
  content: string;
  userId: number;
  channelId: number;
  createdAt: string;
}

if (require('electron-squirrel-startup')) {
  app.quit();
}

const socket = io('http://localhost:3000');

let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Fichier de préchargement pour communiquer entre le processus principal et le processus de rendu.
      preload: path.join(__dirname, 'preload.ts'),
    },
  });

  const devServerUrl = process.env.MAIN_WINDOW_VITE_DEV_SERVER_URL;
  const indexPath = path.join(
    __dirname,
    `../renderer/${process.env.MAIN_WINDOW_VITE_NAME}/index.html`,
  );

  if (devServerUrl) {
    mainWindow.loadURL(devServerUrl);
  } else {
    mainWindow.loadFile(indexPath);
  }

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  const handleMessage = (message: Message) => {
    console.log('Received message', message);
    if (mainWindow) {
      mainWindow.webContents.send('socket-message', message);
    }

    new Notification({
      title: 'New Message',
      body: `From ${message.userId}: ${message.content}`,
    }).show();
  };

  socket.on('message', handleMessage);

  mainWindow.on('close', () => {
    socket.off('message', handleMessage);
    mainWindow = null;
  });

  ipcMain.on('socket-message', (_, message: Message) => {
    socket.emit('message', message);
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
