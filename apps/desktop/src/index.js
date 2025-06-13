const { app, BrowserWindow, net } = require('electron');
const { updateElectronApp } = require('update-electron-app');
updateElectronApp({
  repo: 'jurgenjacobsen/flownRecords',
  updateInterval: '1 hour',
  notifyUser: true,
});

const path = require('node:path');

if (require('electron-squirrel-startup')) {
  app.quit();
}

let splashWindow;
let mainWindow;

const createSplash = () => {
  splashWindow = new BrowserWindow({
    title: 'Flown Records',
    icon: path.join(__dirname, 'assets', 'icon.png'),
    width: 300,
    height: 350,
    frame: true,
    transparent: false,
    backgroundColor: '#00000000',
    alwaysOnTop: false,
    center: true,
    resizable: false,
    hasShadow: true,
    titleBarStyle: 'hidden',
    titleBarOverlay: false,
    autoHideMenuBar: true,
    show: true,
    webPreferences: {
      preload: path.join(__dirname, 'splash.preload.js'),
      devTools: false,
    },
  });

  splashWindow.loadFile(path.join(__dirname, 'splash.html'));
  return splashWindow;
}

const createMain = () => {
  mainWindow = new BrowserWindow({
    title: 'Flown Records',
    icon: path.join(__dirname, 'assets', 'icon.png'),
    autoHideMenuBar: true,
    show: false, // Wait to show until ready
    center: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devTools: true,
    },
  });

  //mainWindow.loadURL(URL);

  const file = path.join(__dirname, '../../web/dist/index.html');
  
  mainWindow.loadFile(file);
  
  
  mainWindow.once('ready-to-show', () => {
    mainWindow.maximize();
    mainWindow.show();
    if (splashWindow) {
      splashWindow.close();
    }
  });
};

app.whenReady().then(async () => {
  splashWindow = createSplash();

  splashWindow.webContents.once('did-finish-load', () => {
    setTimeout(() => {
        createMain();
      }, 2000);
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMain();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});