// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// Utilisation de l'IPC Renderer pour communiquer entre le processus principal (main) et le processus de rendu (renderer)

import { IpcRendererEvent, contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('MessageAPI', {
  addMessageListener: (callback: (message: unknown) => void) => {
    const wrappedCallback = (_: IpcRendererEvent, message: unknown) =>
      callback(message);
    ipcRenderer.on('socket-message', wrappedCallback);
    return () => ipcRenderer.off('socket-message', wrappedCallback);
  },
  send(message: unknown) {
    ipcRenderer.send('socket-message', message);
  },
});
