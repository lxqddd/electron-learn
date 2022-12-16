// import { resolve } from 'path'
// import url from 'url'
import { BrowserWindow, app } from 'electron'
// declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

if (require('electron-squirrel-startup'))
  app.quit()

const isDev = process.env.NODE_ENV === 'development'
const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })

  if (isDev) {
    mainWindow.loadURL('http://127.0.0.1:10086/')
  }
  else {
    // 通过 loadFile 的形式加载视图文件
    mainWindow.loadFile('./render_dist/index.html')
  }

  mainWindow.webContents.openDevTools()
}

app.on('ready', () => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0)
    createWindow()
})
