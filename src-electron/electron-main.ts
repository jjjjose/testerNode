import { app, BrowserWindow, ipcMain, nativeTheme } from "electron";
import path from "path";
import os from "os";
import Scan from "./class/Scan";
// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

try {
  if (platform === "win32" && nativeTheme.shouldUseDarkColors === true) {
    require("fs").unlinkSync(
      path.join(app.getPath("userData"), "DevTools Extensions")
    );
  }
} catch (_) {}

let mainWindow: BrowserWindow | undefined;

function createWindow() {
  //poniendo las funcionalidades de electron en el main
  ipcMain.handle("Scan:scanAllApis", async (event, host) => {
    return await Scan.scanAllApis(host);
  });
  ipcMain.handle("Scan:checkStatus", async (event, host, method, protocol) => {
    return await Scan.check(host, method, protocol);
  });
  ipcMain.handle("Scan:bruteForce", async (event, host, dictionaryNumber) => {
    return await Scan.scanSubquest(host, dictionaryNumber);
  });
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, "icons/icon.png"), // tray icon
    width: 1600,
    height: 800,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
  });

  mainWindow.loadURL(process.env.APP_URL);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on("devtools-opened", () => {
      mainWindow?.webContents.closeDevTools();
    });
  }

  mainWindow.on("closed", () => {
    mainWindow = undefined;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === undefined) {
    createWindow();
  }
});
