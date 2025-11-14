const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;
let floatWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const url = isDev
    ? "http://localhost:3000"
    : `file://${path.join(
        __dirname,
        ".next",
        "server",
        "pages",
        "index.html"
      )}`;

  mainWindow.loadURL(url);

  mainWindow.on("closed", () => (mainWindow = null));
}

function createFloatingWindow({ minutes, seconds, isRunning }) {
  floatWindow = new BrowserWindow({
    width: 260,
    height: 180,
    alwaysOnTop: true,
    frame: false,
    transparent: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const url = isDev
    ? `http://localhost:3000/floating?minutes=${minutes}&seconds=${seconds}&isRunning=${isRunning}`
    : `file://${path.join(
        __dirname,
        ".next",
        "server",
        "pages",
        "floating.html"
      )}`;

  floatWindow.loadURL(url);

  floatWindow.on("closed", () => {
    floatWindow = null;
  });
}

app.whenReady().then(createMainWindow);

ipcMain.on("open-floating", (event, timer) => {
  if (!floatWindow) createFloatingWindow(timer);
});

ipcMain.on("close-floating", () => {
  if (floatWindow) floatWindow.close();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
});
