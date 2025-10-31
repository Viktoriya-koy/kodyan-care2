const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    icon: path.join(__dirname, '../web/resources/pulpo-logo.png'),
    title: 'Kodyan Care - Primeros Auxilios Emocionales'
  });

  win.loadFile('../web/index.html');

  // Abrir enlaces externos en el navegador
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

// Menú personalizado
function createMenu() {
  const template = [
    {
      label: 'Kodyan Care',
      submenu: [
        {
          label: 'Inicio',
          click: () => {
            mainWindow.webContents.executeJavaScript(`
              window.scrollTo({ top: 0, behavior: 'smooth' });
            `);
          }
        },
        {
          label: 'Herramientas',
          click: () => {
            mainWindow.webContents.executeJavaScript(`
              document.getElementById('herramientas').scrollIntoView({ behavior: 'smooth' });
            `);
          }
        },
        { type: 'separator' },
        { role: 'quit', label: 'Salir' }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  createWindow();
  createMenu();
});

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
