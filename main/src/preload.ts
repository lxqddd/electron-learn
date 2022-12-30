import { contextBridge, ipcRenderer } from 'electron'
import type { SelectFileType } from './types'

contextBridge.exposeInMainWorld('electronAPI', {
  getVideoSource: (type: SelectFileType) => ipcRenderer.invoke('get:videoSource', type)
})
