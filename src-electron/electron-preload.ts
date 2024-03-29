import { contextBridge, ipcRenderer } from "electron";

//registrando funciones para inyectar en el renderer
contextBridge.exposeInMainWorld("Scan", {
  // hiHoli: () => ipcRenderer.invoke("Holi:hiHello"),
  // scanByCrt: () => ipcRenderer.invoke("Scan:scanByCrt"),
  // scanByVirusTotal: () => ipcRenderer.invoke("Scan:scanByVirusTotal"),
  // scanByHackertarget: () => ipcRenderer.invoke("Scan:scanByHackertarget"),
  scanAllApis: (host: string, API_KEY: string) =>
    ipcRenderer.invoke("Scan:scanAllApis", host, API_KEY),
  checkStatus: (host: string, method: string, protocol: string) =>
    ipcRenderer.invoke("Scan:checkStatus", host, method, protocol),
  bruteForce: (host: string, dictionaryNumber: number) =>
    ipcRenderer.invoke("Scan:bruteForce", host, dictionaryNumber),
  verifyAPIvirusTotal: (API_KEY: string) =>
    ipcRenderer.invoke("Scan:verifyAPIvirusTotal", API_KEY),
});
