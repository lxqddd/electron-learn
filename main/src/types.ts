export type SelectFileType = 'openDirectory' | 'openFile'

export interface IVideoTree {
  label: string
  value: string
  children?: IVideoTree[]
}
