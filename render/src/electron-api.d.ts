type UpdateCounter = (e: any, type: 'add' | 'decr') => void

interface Window {
  electronAPI: {
    setTitle: (title: string) => void
    updateCounter: (callback: UpdateCounter) => void
    openFile: () => Promise<boolean | string[]>
  }
}

