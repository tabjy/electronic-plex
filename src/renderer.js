const development = process.env.NODE_ENV !== 'production'

const webview = document.getElementById('webview')

webview.addEventListener('dom-ready', () => {
  if (development) {
    webview.openDevTools()
  }
})
