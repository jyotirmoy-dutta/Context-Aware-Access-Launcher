// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

console.log('Preload script loaded');
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('accessLauncher', {
  getActiveContext: () => ipcRenderer.invoke('get-active-context'),
});
