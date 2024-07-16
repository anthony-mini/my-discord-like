import { app, BrowserWindow, ipcMain, Menu, Notification } from 'electron';
import path from 'path';
import { io } from 'socket.io-client';
import { Message } from './type/message';

if (require('electron-squirrel-startup')) {
  app.quit();
}

const socket = io('http://localhost:3000');

let windows: BrowserWindow[] = [];

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
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
    windows.forEach((win) => {
      win.webContents.send('socket-message', message);
    });

    if (message.userId !== 1) {
      new Notification({
        title: `📬 Nouveau Message dans le Canal #${message.channelId}`,
        body: `👤 ${message.username} a écrit : \n\n"${message.content}"\n\n🕒 ${new Date().toLocaleTimeString()}`,
      }).show();
    }
  };

  socket.on('message', handleMessage);

  mainWindow.on('close', () => {
    socket.off('message', handleMessage);
    windows = windows.filter((win) => win !== mainWindow);
  });

  ipcMain.on('socket-message', (_, message: Message) => {
    socket.emit('message', message);
  });

  windows.push(mainWindow);
};

// Gestion du menu de l'application pour macOS ajouté la section File pour créer une nouvelle fenêtre

const createMenu = () => {
  const isMac = process.platform === 'darwin';

  const template: Electron.MenuItemConstructorOptions[] = [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: 'about' as const },
              { type: 'separator' as const },
              { role: 'quit' as const },
            ],
          },
        ]
      : []),
    {
      label: 'File',
      submenu: [
        {
          label: 'New Window',
          click: () => {
            createWindow();
          },
        },
        isMac ? { role: 'close' as const } : { role: 'quit' as const },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};

app.on('ready', () => {
  createWindow();
  createMenu();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (windows.length === 0) {
    createWindow();
  }
});
