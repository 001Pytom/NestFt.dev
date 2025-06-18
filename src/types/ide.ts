export interface FileNode {
  name: string
  type: 'file' | 'folder'
  content?: string
  children?: FileNode[]
  path: string
  isOpen?: boolean
}

export interface IDEState {
  files: FileNode[]
  selectedFile: FileNode | null
  openFiles: FileNode[]
  isRunning: boolean
  terminalOutput: string[]
  previewUrl?: string
}

export interface GitHubIntegration {
  isConnected: boolean
  username?: string
  repositoryUrl?: string
  lastPush?: string
}

export interface ProjectEnvironment {
  id: string
  name: string
  type: 'node' | 'python' | 'static'
  dependencies: string[]
  scripts: Record<string, string>
  environment: Record<string, string>
}