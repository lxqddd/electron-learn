import { contextBridge, ipcRenderer } from 'electron'
import type { IpcRendererEvent } from 'electron'

type UpdateCounter = (e: IpcRendererEvent, type: 'add' | 'decr') => void

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title: string) => ipcRenderer.send('set:title', title),
  updateCounter: (callback: UpdateCounter) => ipcRenderer.on('update:counter', callback),
  openFile: () => ipcRenderer.invoke('dialog:openFile')
})
