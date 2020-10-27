const { ipcRenderer } = require('electron')
window.ipcRenderer = ipcRenderer

// TODO ADD A SECURE RENDERER (CONTEXT BRIDGE)