const { app, BrowserWindow, ipcMain, webFrameMain } = require('electron');
const path = require('node:path');
const { createConfigWindow } = require('../src/configScreen/indexConfig');


if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 440,
    height: 154,
    opacity: 0.70,
    movable: true,
    roundedCorners: true,
    resizable: false,         // Impede redimensionamento
    alwaysOnTop: true,        // Garante que a janela fica no topo
    titleBarStyle: 'hidden',
    frame: false,             // Remove a barra de título
    transparent: false,       // Janela transparente (opcional)
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Preload para comunicação entre front e main
      contextIsolation: true, // Recomendado por segurança
      nodeIntegration: false, // Recomendado por segurança
    },
  });

  // Load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

 
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('open-second-window', () => {
  createConfigWindow(); // Agora funciona sem erro
});



