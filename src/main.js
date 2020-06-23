const path = require('path')

const { app, BrowserWindow } = require('electron')

const development = process.env.NODE_ENV !== 'production'

async function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // TODO: enable webview
    },
  })

  await mainWindow.loadFile(path.join(__dirname, 'index.html'))

  // Open the DevTools.
  if (development) {
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.setMenu(null)
  }
}

async function main () {
  await app.whenReady()
  await createWindow()

  app.on('active', async () => {
    // re-create a window for OSX
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow()
    }
  })

  app.on('window-all-closed', function () {
    // don't quit for OSX
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
