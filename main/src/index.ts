import { BrowserWindow, Menu, app, dialog, ipcMain } from 'electron'
// declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

if (require('electron-squirrel-startup'))
  app.quit()

const isDev = process.env.NODE_ENV === 'development'
let mainWindow: BrowserWindow
const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => mainWindow.webContents.send('update:counter', 'add'),
          label: 'Increment'
        }, {
          label: 'decrement',
          click: () => mainWindow.webContents.send('update:counter', 'decr')
        }
      ]
    }
  ])

  Menu.setApplicationMenu(menu)

  if (isDev) {
    mainWindow.loadURL('http://127.0.0.1:10086/')
  }
  else {
    // 通过 loadFile 的形式加载视图文件
    mainWindow.loadFile('./render_dist/index.html')
  }
  mainWindow.webContents.openDevTools()
}

function handleSetTitle() {
  ipcMain.on('set:title', (e: Electron.IpcMainEvent, title: string) => {
    const webContents = e.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
  })
}

async function handleOpenFile(mainWindow: BrowserWindow) {
  ipcMain.handle('dialog:openFile', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow)
    if (canceled)
      return canceled

    else
      return filePaths
  })
}

app.on('ready', () => {
  createWindow()
  handleSetTitle()
  handleOpenFile(mainWindow)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0)
    createWindow()
})
