const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  openFloatingWindow: (timer) => ipcRenderer.send("open-floating", timer),
  closeFloatingWindow: () => ipcRenderer.send("close-floating"),
});
