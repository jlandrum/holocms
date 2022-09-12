const {ipcRenderer, contextBridge, systemPreferences} = require('electron');
const { v4: uuidv4 } = require("uuid")

contextBridge.exposeInMainWorld('HOLOCMS', {
  accentColor() {
    try {
      const test = ipcRenderer.sendSync('accent-color');
      return `#${test}`;
    } catch {
      return 'hsl(200,50%,20%)'
    }
  },
  require: (callback) => require(callback),
  type: 'electron'
});