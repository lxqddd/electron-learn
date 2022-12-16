import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('versions', {
  nodeVersion: () => process.versions.node
})
