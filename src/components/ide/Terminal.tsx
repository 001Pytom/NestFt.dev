'use client'

import { useEffect, useRef, useState } from 'react'
import { Terminal as XTerm } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { WebLinksAddon } from 'xterm-addon-web-links'
import { SearchAddon } from 'xterm-addon-search'
import 'xterm/css/xterm.css' 

interface TerminalProps {
  projectId: string
  fileTree: FileNode[]
  onFileTreeUpdate: (fileTree: FileNode[]) => void
  onFileSelect: (file: FileNode) => void
  onOutput?: (output: string) => void
}

export function Terminal({ projectId, fileTree, onFileTreeUpdate, onFileSelect, onOutput }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null)
  const xtermRef = useRef<XTerm | null>(null)
  const fitAddonRef = useRef<FitAddon | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [currentDirectory, setCurrentDirectory] = useState('/')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  useEffect(() => {
    if (!terminalRef.current) return

    // Initialize xterm.js
    const terminal = new XTerm({
      theme: {
        background: '#1e1e1e',
        foreground: '#d4d4d4',
        cursor: '#ffffff',
        selection: '#264f78',
        black: '#000000',
        red: '#cd3131',
        green: '#0dbc79',
        yellow: '#e5e510',
        blue: '#2472c8',
        magenta: '#bc3fbc',
        cyan: '#11a8cd',
        white: '#e5e5e5',
        brightBlack: '#666666',
        brightRed: '#f14c4c',
        brightGreen: '#23d18b',
        brightYellow: '#f5f543',
        brightBlue: '#3b8eea',
        brightMagenta: '#d670d6',
        brightCyan: '#29b8db',
        brightWhite: '#e5e5e5',
      },
      fontSize: 14,
      fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
      cursorBlink: true,
      cursorStyle: 'block',
      scrollback: 1000,
      tabStopWidth: 4,
    })

    const fitAddon = new FitAddon()
    const webLinksAddon = new WebLinksAddon()
    const searchAddon = new SearchAddon()

    terminal.loadAddon(fitAddon)
    terminal.loadAddon(webLinksAddon)
    terminal.loadAddon(searchAddon)

    terminal.open(terminalRef.current)
    fitAddon.fit()

    xtermRef.current = terminal
    fitAddonRef.current = fitAddon

    // Initialize terminal session
    initializeTerminal(terminal)

    // Handle window resize
    const handleResize = () => {
      fitAddon.fit()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      terminal.dispose()
    }
  }, [])

  const initializeTerminal = async (terminal: XTerm) => {
    try {
      // Simulate connecting to a container/environment
      terminal.writeln('\x1b[32m✓\x1b[0m Connecting to development environment...')
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      terminal.writeln('\x1b[32m✓\x1b[0m Environment ready!')
      terminal.writeln('')
      terminal.writeln('Welcome to NestFt.dev IDE Terminal')
      terminal.writeln('Type \x1b[33mhelp\x1b[0m for available commands')
      terminal.writeln('')
      
      setIsConnected(true)
      showPrompt(terminal)
      
      // Handle user input
      let currentLine = ''
      let cursorPosition = 0
      
      terminal.onData((data) => {
        const code = data.charCodeAt(0)
        
        if (code === 13) { // Enter
          terminal.writeln('')
          if (currentLine.trim()) {
            executeCommand(terminal, currentLine.trim())
          }
          currentLine = ''
          cursorPosition = 0
        } else if (code === 127) { // Backspace
          if (cursorPosition > 0) {
            currentLine = currentLine.slice(0, -1)
            cursorPosition--
            terminal.write('\b \b')
          }
        } else if (code === 9) { // Tab
          // Handle tab completion
          const suggestions = getTabCompletions(currentLine)
          if (suggestions.length === 1) {
            const completion = suggestions[0].slice(currentLine.length)
            currentLine += completion
            cursorPosition += completion.length
            terminal.write(completion)
          } else if (suggestions.length > 1) {
            terminal.writeln('')
            terminal.writeln(suggestions.join('  '))
            showPrompt(terminal)
            terminal.write(currentLine)
          }
        } else if (code >= 32) { // Printable characters
          currentLine += data
          cursorPosition++
          terminal.write(data)
        }
      })
      
    } catch (error) {
      terminal.writeln('\x1b[31m✗\x1b[0m Failed to connect to environment')
      console.error('Terminal initialization error:', error)
    }
  }

  const showPrompt = (terminal: XTerm) => {
    terminal.write(`\x1b[32muser\x1b[0m:\x1b[34m${currentDirectory}\x1b[0m$ `)
  }

  const executeCommand = async (terminal: XTerm, command: string) => {
    const args = command.split(' ')
    const cmd = args[0]
    
    try {
      switch (cmd) {
        case 'help':
          terminal.writeln('Available commands:')
          terminal.writeln('  \x1b[33mls\x1b[0m          - List files and directories')
          terminal.writeln('  \x1b[33mcd\x1b[0m          - Change directory')
          terminal.writeln('  \x1b[33mpwd\x1b[0m         - Print working directory')
          terminal.writeln('  \x1b[33mcat\x1b[0m         - Display file contents')
          terminal.writeln('  \x1b[33mmkdir\x1b[0m       - Create directory')
          terminal.writeln('  \x1b[33mtouch\x1b[0m       - Create file')
          terminal.writeln('  \x1b[33mrm\x1b[0m          - Remove file/directory')
          terminal.writeln('  \x1b[33mnpm\x1b[0m         - Node package manager')
          terminal.writeln('  \x1b[33mgit\x1b[0m         - Git version control')
          terminal.writeln('  \x1b[33mnode\x1b[0m        - Run Node.js')
          terminal.writeln('  \x1b[33mpython\x1b[0m      - Run Python')
          terminal.writeln('  \x1b[33mclear\x1b[0m       - Clear terminal')
          terminal.writeln('  \x1b[33mexit\x1b[0m        - Exit terminal')
          break
          
        case 'ls':
          await handleLsCommand(terminal, args.slice(1))
          break
          
        case 'pwd':
          terminal.writeln(currentDirectory)
          break
          
        case 'cd':
          await handleCdCommand(terminal, args[1])
          break
          
        case 'mkdir':
          await handleMkdirCommand(terminal, args[1])
          break
          
        case 'touch':
          await handleTouchCommand(terminal, args[1])
          break
          
        case 'rm':
          await handleRmCommand(terminal, args.slice(1))
          break
          
        case 'clear':
          terminal.clear()
          break
          
        case 'cat':
          await handleCatCommand(terminal, args[1])
          break
          
        case 'npm':
          await handleNpmCommand(terminal, args.slice(1))
          break
          
        case 'git':
          await handleGitCommand(terminal, args.slice(1))
          break
          
        case 'node':
          await handleNodeCommand(terminal, args.slice(1))
          break
          
        case 'python':
          await handlePythonCommand(terminal, args.slice(1))
          break
          
        case 'exit':
          terminal.writeln('Goodbye!')
          return
          
        default:
          if (command.trim()) {
            terminal.writeln(`bash: ${cmd}: command not found`)
          }
      }
    } catch (error) {
      terminal.writeln(`\x1b[31mError executing command: ${error}\x1b[0m`)
    }
    
    terminal.writeln('')
    showPrompt(terminal)
  }
  
  const handleLsCommand = async (terminal: XTerm, args: string[]) => {
    const targetPath = args[0] || currentDirectory
    const items = getDirectoryContents(targetPath)
    
    if (items.length === 0) {
      terminal.writeln('ls: cannot access directory')
      return
    }
    
    items.forEach(item => {
      const color = item.type === 'folder' ? '\x1b[34m' : '\x1b[0m'
      const suffix = item.type === 'folder' ? '/' : ''
      terminal.writeln(`${color}${item.name}${suffix}\x1b[0m`)
    })
  }
  
  const handleCdCommand = async (terminal: XTerm, targetDir?: string) => {
    if (!targetDir) {
      setCurrentDirectory('/')
      return
    }
    
    if (targetDir === '..') {
      const parts = currentDirectory.split('/').filter(Boolean)
      parts.pop()
      setCurrentDirectory('/' + parts.join('/'))
      return
    }
    
    // Check if directory exists
    const newPath = currentDirectory === '/' ? `/${targetDir}` : `${currentDirectory}/${targetDir}`
    const exists = findNodeByPath(newPath)
    
    if (exists && exists.type === 'folder') {
      setCurrentDirectory(newPath)
    } else {
      terminal.writeln(`cd: ${targetDir}: No such file or directory`)
    }
  }
  
  const handleMkdirCommand = async (terminal: XTerm, dirName?: string) => {
    if (!dirName) {
      terminal.writeln('mkdir: missing operand')
      return
    }
    
    const newPath = currentDirectory === '/' ? dirName : `${currentDirectory}/${dirName}`.replace('//', '/')
    
    // Check if already exists
    if (findNodeByPath(newPath)) {
      terminal.writeln(`mkdir: cannot create directory '${dirName}': File exists`)
      return
    }
    
    // Create the directory
    const newFolder: FileNode = {
      name: dirName,
      type: 'folder',
      children: [],
      path: newPath,
      isOpen: false
    }
    
    const updatedTree = addNodeToTree(fileTree, currentDirectory, newFolder)
    onFileTreeUpdate(updatedTree)
    
    terminal.writeln(`Directory '${dirName}' created`)
  }
  
  const handleTouchCommand = async (terminal: XTerm, fileName?: string) => {
    if (!fileName) {
      terminal.writeln('touch: missing file operand')
      return
    }
    
    const newPath = currentDirectory === '/' ? fileName : `${currentDirectory}/${fileName}`.replace('//', '/')
    
    // Check if already exists
    if (findNodeByPath(newPath)) {
      terminal.writeln(`touch: '${fileName}' already exists`)
      return
    }
    
    // Create the file
    const newFile: FileNode = {
      name: fileName,
      type: 'file',
      content: '',
      path: newPath
    }
    
    const updatedTree = addNodeToTree(fileTree, currentDirectory, newFile)
    onFileTreeUpdate(updatedTree)
    
    terminal.writeln(`File '${fileName}' created`)
  }
  
  const handleRmCommand = async (terminal: XTerm, args: string[]) => {
    if (args.length === 0) {
      terminal.writeln('rm: missing operand')
      return
    }
    
    const fileName = args[args.length - 1] // Get the last argument as filename
    const targetPath = currentDirectory === '/' ? fileName : `${currentDirectory}/${fileName}`.replace('//', '/')
    
    const node = findNodeByPath(targetPath)
    if (!node) {
      terminal.writeln(`rm: cannot remove '${fileName}': No such file or directory`)
      return
    }
    
    // Remove from tree
    const updatedTree = removeNodeFromTree(fileTree, targetPath)
    onFileTreeUpdate(updatedTree)
    
    terminal.writeln(`Removed '${fileName}'`)
  }
  
  const handleCatCommand = async (terminal: XTerm, fileName?: string) => {
    if (!fileName) {
      terminal.writeln('cat: missing file operand')
      return
    }
    
    const filePath = currentDirectory === '/' ? fileName : `${currentDirectory}/${fileName}`.replace('//', '/')
    const file = findNodeByPath(filePath)
    
    if (!file) {
      terminal.writeln(`cat: ${fileName}: No such file or directory`)
      return
    }
    
    if (file.type !== 'file') {
      terminal.writeln(`cat: ${fileName}: Is a directory`)
      return
    }
    
    // Display file contents
    const content = file.content || ''
    if (content) {
      content.split('\n').forEach(line => terminal.writeln(line))
    } else {
      terminal.writeln('(empty file)')
    }
  }
  
  // Helper functions
  const findNodeByPath = (path: string): FileNode | null => {
    const findInNodes = (nodes: FileNode[], targetPath: string): FileNode | null => {
      for (const node of nodes) {
        if (node.path === targetPath) {
          return node
        }
        if (node.children) {
          const found = findInNodes(node.children, targetPath)
          if (found) return found
        }
      }
      return null
    }
    
    return findInNodes(fileTree, path)
  }
  
  const getDirectoryContents = (dirPath: string) => {
    if (dirPath === '/') {
      return fileTree.map(node => ({ name: node.name, type: node.type }))
    }
    
    const dir = findNodeByPath(dirPath)
    if (dir && dir.type === 'folder' && dir.children) {
      return dir.children.map(node => ({ name: node.name, type: node.type }))
    }
    
    return []
  }
  
  const addNodeToTree = (tree: FileNode[], parentPath: string, newNode: FileNode): FileNode[] => {
    if (parentPath === '/') {
      return [...tree, newNode]
    }
    
    return tree.map(node => {
      if (node.path === parentPath && node.type === 'folder') {
        return {
          ...node,
          children: [...(node.children || []), newNode],
          isOpen: true
        }
      }
      if (node.children) {
        return {
          ...node,
          children: addNodeToTree(node.children, parentPath, newNode)
        }
      }
      return node
    })
  }
  
  const removeNodeFromTree = (tree: FileNode[], targetPath: string): FileNode[] => {
    return tree.filter(node => {
      if (node.path === targetPath) {
        return false
      }
      if (node.children) {
        node.children = removeNodeFromTree(node.children, targetPath)
      }
      return true
    })
  }

  const simulateCommand = async (terminal: XTerm, command: string, output: string[]) => {
    // Simulate command execution delay
    await new Promise(resolve => setTimeout(resolve, 200))
    
    output.forEach(line => {
      terminal.writeln(line)
    })
    
    if (onOutput) {
      onOutput(output.join('\n'))
    }
  }

  const handleNpmCommand = async (terminal: XTerm, args: string[]) => {
    const subcommand = args[0]
    
    switch (subcommand) {
      case 'install':
      case 'i':
        const packages = args.slice(1)
        if (packages.length === 0) {
          terminal.writeln('Installing dependencies...')
          await new Promise(resolve => setTimeout(resolve, 2000))
          terminal.writeln('\x1b[32m✓\x1b[0m Dependencies installed successfully')
        } else {
          terminal.writeln(`Installing ${packages.join(', ')}...`)
          await new Promise(resolve => setTimeout(resolve, 1500))
          terminal.writeln(`\x1b[32m✓\x1b[0m Installed ${packages.join(', ')}`)
        }
        break
        
      case 'start':
        terminal.writeln('Starting development server...')
        await new Promise(resolve => setTimeout(resolve, 1000))
        terminal.writeln('\x1b[32m✓\x1b[0m Server running on http://localhost:3000')
        break
        
      case 'run':
        const script = args[1]
        terminal.writeln(`Running script: ${script}`)
        await new Promise(resolve => setTimeout(resolve, 800))
        terminal.writeln('\x1b[32m✓\x1b[0m Script completed')
        break
        
      case 'version':
        terminal.writeln('npm version 9.8.1')
        break
        
      default:
        terminal.writeln(`npm: unknown command '${subcommand}'`)
    }
  }

  const handleGitCommand = async (terminal: XTerm, args: string[]) => {
    const subcommand = args[0]
    
    switch (subcommand) {
      case 'status':
        terminal.writeln('On branch main')
        terminal.writeln('Your branch is up to date with \'origin/main\'.')
        terminal.writeln('')
        terminal.writeln('Changes not staged for commit:')
          // Add to history
          setCommandHistory(prev => [...prev, currentLine.trim()])
          setHistoryIndex(-1)
        terminal.writeln('  \x1b[31mmodified:   src/App.js\x1b[0m')
        terminal.writeln('  \x1b[31mmodified:   src/components/Header.js\x1b[0m')
        break
        
      case 'add':
        const files = args.slice(1)
        if (files.includes('.')) {
          terminal.writeln('Added all files to staging area')
        } else {
          terminal.writeln(`Added ${files.join(', ')} to staging area`)
        }
      } else if (code === 27) { // Arrow keys (escape sequences)
        // Handle arrow key navigation for command history
        return
        break
        
      case 'commit':
        const messageIndex = args.indexOf('-m')
        const message = messageIndex !== -1 ? args[messageIndex + 1] : 'Update files'
        terminal.writeln(`[main ${Math.random().toString(36).substr(2, 7)}] ${message}`)
        terminal.writeln(' 2 files changed, 15 insertions(+), 3 deletions(-)')
        break
        
      case 'push':
        terminal.writeln('Pushing to origin main...')
        await new Promise(resolve => setTimeout(resolve, 1500))
        terminal.writeln('\x1b[32m✓\x1b[0m Successfully pushed to GitHub')
        break
        
      case 'pull':
        terminal.writeln('Pulling from origin main...')
        await new Promise(resolve => setTimeout(resolve, 1000))
        terminal.writeln('Already up to date.')
        break
        
      case 'init':
        terminal.writeln('Initialized empty Git repository in current directory')
        break
        
      default:
        terminal.writeln(`git: '${subcommand}' is not a git command.`)
    }
  }

  const handleNodeCommand = async (terminal: XTerm, args: string[]) => {
    if (args.length === 0) {
      terminal.writeln('Node.js REPL - Type .exit to quit')
      terminal.write('> ')
      return
    }
    
    const file = args[0]
    terminal.writeln(`Executing ${file}...`)
    await new Promise(resolve => setTimeout(resolve, 500))
    terminal.writeln('Hello, World!')
    terminal.writeln('Process completed')
  }

  const handlePythonCommand = async (terminal: XTerm, args: string[]) => {
    if (args.length === 0) {
      terminal.writeln('Python 3.9.0 - Type exit() to quit')
      terminal.write('>>> ')
      return
    }
    
    const file = args[0]
    terminal.writeln(`Executing ${file}...`)
    await new Promise(resolve => setTimeout(resolve, 500))
    terminal.writeln('Hello, World!')
    terminal.writeln('Process completed')
  }

  const getTabCompletions = (input: string): string[] => {
    const commands = [
      'help', 'ls', 'cd', 'pwd', 'cat', 'npm', 'git', 'node', 'python', 'clear', 'exit'
    ]
    
    return commands.filter(cmd => cmd.startsWith(input))
  }

  return (
    <div className="h-full bg-[#1e1e1e] flex flex-col">
      <div className="bg-[#2d2d30] border-b border-[#3e3e42] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-white text-sm">Terminal</span>
          {isConnected && (
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (xtermRef.current) {
                xtermRef.current.clear()
              }
            }}
            className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded"
          >
            Clear
          </button>
        </div>
      </div>
      
      <div ref={terminalRef} className="flex-1" />
    </div>
  )
}