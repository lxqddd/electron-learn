import path from 'path'
import fs from 'fs-extra'
import { fileTypeFromFile } from 'file-type'
import { dialog, ipcMain } from 'electron'
import type { IVideoTree, SelectFileType } from '../types'

async function selectedSource(type: SelectFileType = 'openDirectory') {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: [type, 'multiSelections'],
    filters: [
      { name: 'Movies', extensions: ['MP4', 'mp4', 'MOV', 'mov', 'MXF', 'MPG', 'FLV', 'flv', 'WMV', 'wmv', 'avi', 'AVI', 'M4V', 'm4v', 'f4v', 'F4V', 'MPEG', '3GP', 'ASF', 'MKV'] }
    ]
  })
  if (canceled)
    return canceled

  else
    return filePaths
}

export async function handleGetVideoSource() {
  ipcMain.handle('get:videoSource', async (e: Electron.IpcMainInvokeEvent, type: SelectFileType): Promise<IVideoTree[] | boolean> => {
    const paths = await selectedSource(type)
    if (typeof paths === 'boolean')
      return paths
    const ret: IVideoTree[] = []
    for (let i = 0; i < paths.length; i++) {
      const curPath = paths[i]
      await resolveVideoRet(curPath, ret)
    }
    return ret
  })
}

async function resolveVideoRet(filePath: string, ret: IVideoTree[]) {
  const isDir = fs.statSync(filePath).isDirectory()
  const { base } = path.parse(filePath)
  if (isDir) {
    const children: IVideoTree[] = []
    const childPaths = await fs.readdir(filePath)
    if (childPaths.length > 0) {
      for (let i = 0; i < childPaths.length; i++) {
        const curPath = path.resolve(filePath, childPaths[i])
        await resolveVideoRet(curPath, children)
      }
    }
    ret.push({
      label: base,
      value: filePath,
      children
    })
  }
  else {
    const fileType = await fileTypeFromFile(filePath)
    if (fileType && fileType.mime.startsWith('video')) {
      ret.push({
        label: base,
        value: filePath
      })
    }
  }
}

