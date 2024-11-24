const { BrowserWindow } = require('electron');
const path = require('node:path');

let configWindow; // Variável para armazenar a janela da configuração

const createConfigWindow = () => {
  // Cria a segunda janela
  configWindow = new BrowserWindow({
    width: 440,
    height: 499,
    opacity: 0.70,
    movable: true,
    roundedCorners: true,
    resizable: false,         // Impede redimensionamento
    alwaysOnTop: true,        // Garante que a janela fica no topo
    titleBarStyle: 'hidden',
    frame: false,             // Remove a barra de título
    transparent: false,       // Janela transparente (opcional)
    webPreferences: {
      preload: path.join(__dirname, '../preload.js'), // Preload para comunicação entre front e main
      contextIsolation: true, // Recomendado por segurança
      nodeIntegration: false, // Recomendado por segurança
    },
  });

// Carrega o conteúdo da segunda janela
  configWindow.loadFile(path.join(__dirname, 'indexConfig.html')); // Usa path.join para maior segurança

  // Remove a referência à janela quando ela for fechada
  configWindow.on('closed', () => {
    configWindow = null; // Corrige o nome da variável
  });
};

module.exports = { createConfigWindow };
