const path = require('path')

const { app, BrowserWindow } = require('electron')

async function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      webviewTag: true,
      nodeIntegration: true
    }
  })

  await mainWindow.loadFile(path.join(__dirname, 'index.html'))

  // Open the DevTools.
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.setMenu(null)
  }
}

async function main () {
  if (process.platform === 'linux') {
    // only do this on Linux, where dbus is used instead
    app.commandLine.appendSwitch('disable-features', 'HardwareMediaKeyHandling,MediaSessionService')
  }

  await app.whenReady()
  await createWindow()

  app.on('active', async () => {
    // re-create a window for OSX
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow()
    }
  })

  app.on('window-all-closed', () => {
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
