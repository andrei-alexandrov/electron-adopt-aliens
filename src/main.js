const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    title: "Main window",
    width: 1200,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile(path.join(__dirname, "./front-end/index.html"));
  mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  createMainWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
