// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  moveWindow: (deltaX, deltaY) => ipcRenderer.send('move-window', deltaX, deltaY),
  openConfigWindow: () => ipcRenderer.send('open-second-window'),
});
