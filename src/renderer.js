const { app } = require('electron')

const webview = document.getElementById('webview')

webview.addEventListener('dom-ready', () => {
  if (app.isPackaged) {
    webview.openDevTools()
  }
})
