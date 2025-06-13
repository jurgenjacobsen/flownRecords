const { app, BrowserWindow, net } = require('electron');
const { updateElectronApp } = require('update-electron-app');
updateElectronApp({
  repo: 'jurgenjacobsen/flownRecords',
  updateInterval: '1 hour',
  notifyUser: true,
});

const path = require('node:path');

const URL = 'https://flown-records.vercel.app';

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
    frame: false,
    transparent: true,
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
      devTools: false,
    },
  });

  mainWindow.loadURL(URL);
  
  mainWindow.once('ready-to-show', () => {
    mainWindow.maximize();
    mainWindow.show();
  });
};

const checkIfOnline = async () => {
  return new Promise((resolve) => {
    const request = net.request(URL);
    request.on('response', (response) => {
      resolve(response.statusCode >= 200 && response.statusCode < 400);
    });
    request.on('error', () => resolve(false));
    request.end();
  });
};

app.whenReady().then(async () => {
  splashWindow = createSplash();

  const isOnline = await checkIfOnline();

  splashWindow.webContents.once('did-finish-load', () => {
    if (isOnline) {
      setTimeout(() => {
        if (splashWindow) splashWindow.close();
        createMain();
      }, 2000);
    }
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