const path = require('path');

const { app, BrowserWindow, ipcMain, systemPreferences, Menu } = require('electron');
const isDev = require('electron-is-dev');

let win;

console.error('PORT IS ', process.env.PORT);

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 300,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    },    
    title: 'HoloCMS',
    vibrancy: 'fullscreen-ui',
    titleBarStyle: 'hiddenInset'
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? `http://localhost:${process.env.PORT || '3000'}`
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }

  const menuTemplate = [
    {
      label: "Window Manager",      
      submenu: [
        { 
          role: 'quit',
          label: 'Quit', 
        }
      ]
    },
    {
      label: "Edit",
      submenu: [
        { 
          role: 'selectAll',
          label: 'Select All'
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  ipcMain.on('accent-color', (e) => {
    e.returnValue = systemPreferences.getAccentColor();
  })
}

app.whenReady().then(createWindow);

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