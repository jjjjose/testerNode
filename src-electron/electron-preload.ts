import { contextBridge, ipcRenderer } from "electron";

//registrando funciones para inyectar en el renderer
contextBridge.exposeInMainWorld("Scan", {
  // hiHoli: () => ipcRenderer.invoke("Holi:hiHello"),
  // scanByCrt: () => ipcRenderer.invoke("Scan:scanByCrt"),
  // scanByVirusTotal: () => ipcRenderer.invoke("Scan:scanByVirusTotal"),
  // scanByHackertarget: () => ipcRenderer.invoke("Scan:scanByHackertarget"),
  scanAllApis: (host: string) => ipcRenderer.invoke("Scan:scanAllApis", host),
});
