type SelectFileType = 'openDirectory' | 'openFile'
interface IVideoTree {
  label: string
  value: string
  children?: IVideoTree[]
}

interface Window {
  electronAPI: {
    getVideoSource: (type: SelectFileType) => Promise<boolean | IVideoTree[]>
  }
}

