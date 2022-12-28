interface Window {
  electronAPI: {
    setTitle: (title: string) => void
    updateCounter: ((callback: (e: any, type: 'add' | 'decr') => void)) => void
    openFile: () => Promise<boolean | string[]>
  }
}

