'use client'

import { useState, useEffect, useRef } from 'react'
import { Terminal as XTerm } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { WebLinksAddon } from 'xterm-addon-web-links'
import { SearchAddon } from 'xterm-addon-search'
import 'xterm/css/xterm.css'
import { motion } from 'framer-motion'
import { Copy, Download, Trash2, Settings, Maximize2, Minimize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TerminalProps {
  projectId: string
  onCommand?: (command: string) => void
  className?: string
}

export function Terminal({ projectId, onCommand, className }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null)
  const xtermRef = useRef<XTerm | null>(null)
  const fitAddonRef = useRef<FitAddon | null>(null)
  const [isMaximized, setIsMaximized] = useState(false)
  const [currentDirectory, setCurrentDirectory] = useState('/')
  const [isConnected, setIsConnected] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)

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
        brightWhite: '#e5e5e5'
      },
      fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
      fontSize: 14,
      lineHeight: 1.2,
      cursorBlink: true,
      cursorStyle: 'block',
      scrollback: 1000,
      tabStopWidth: 4,
      bellStyle: 'none'
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

    // Connect to WebSocket for real terminal functionality
    connectToTerminal()

    // Handle terminal input
    terminal.onData((data) => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({
          type: 'input',
          data: data,
          projectId
        }))
      }
    })

    // Handle window resize
    const handleResize = () => {
      fitAddon.fit()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      terminal.dispose()
      if (wsRef.current) {
        wsRef.current.close()
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [projectId])

  const connectToTerminal = () => {
    // In a real implementation, this would connect to a WebSocket server
    // that provides terminal access to a containerized environment
    const ws = new WebSocket(`ws://localhost:3001/terminal/${projectId}`)
    
    ws.onopen = () => {
      setIsConnected(true)
      if (xtermRef.current) {
        xtermRef.current.write('\r\n\x1b[32mConnected to terminal\x1b[0m\r\n')
        xtermRef.current.write('\x1b[36mNestFT.dev Terminal v1.0.0\x1b[0m\r\n')
        xtermRef.current.write('\x1b[33mType "help" for available commands\x1b[0m\r\n\r\n')
        xtermRef.current.write('$ ')
      }
    }

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data)
      if (xtermRef.current) {
        switch (message.type) {
          case 'output':
            xtermRef.current.write(message.data)
            break
          case 'directory':
            setCurrentDirectory(message.data)
            break
          case 'error':
            xtermRef.current.write(`\r\n\x1b[31mError: ${message.data}\x1b[0m\r\n$ `)
            break
        }
      }
    }

    ws.onclose = () => {
      setIsConnected(false)
      if (xtermRef.current) {
        xtermRef.current.write('\r\n\x1b[31mConnection lost. Attempting to reconnect...\x1b[0m\r\n')
      }
      // Attempt to reconnect after 3 seconds
      setTimeout(connectToTerminal, 3000)
    }

    ws.onerror = (error) => {
      console.error('Terminal WebSocket error:', error)
      // Fallback to simulated terminal for demo purposes
      simulateTerminal()
    }

    wsRef.current = ws
  }

  const simulateTerminal = () => {
    if (!xtermRef.current) return

    let currentLine = ''
    
    xtermRef.current.onData((data) => {
      const code = data.charCodeAt(0)
      
      if (code === 13) { // Enter key
        xtermRef.current!.write('\r\n')
        handleCommand(currentLine.trim())
        currentLine = ''
        xtermRef.current!.write('$ ')
      } else if (code === 127) { // Backspace
        if (currentLine.length > 0) {
          currentLine = currentLine.slice(0, -1)
          xtermRef.current!.write('\b \b')
        }
      } else if (code >= 32) { // Printable characters
        currentLine += data
        xtermRef.current!.write(data)
      }
    })
  }

  const handleCommand = (command: string) => {
    if (!xtermRef.current) return

    const args = command.split(' ')
    const cmd = args[0]

    switch (cmd) {
      case 'help':
        xtermRef.current.write('Available commands:\r\n')
        xtermRef.current.write('  help          - Show this help message\r\n')
        xtermRef.current.write('  ls            - List directory contents\r\n')
        xtermRef.current.write('  cd <dir>      - Change directory\r\n')
        xtermRef.current.write('  pwd           - Print working directory\r\n')
        xtermRef.current.write('  npm install   - Install dependencies\r\n')
        xtermRef.current.write('  npm start     - Start development server\r\n')
        xtermRef.current.write('  git status    - Show git status\r\n')
        xtermRef.current.write('  git add .     - Stage all changes\r\n')
        xtermRef.current.write('  git commit    - Commit changes\r\n')
        xtermRef.current.write('  git push      - Push to remote repository\r\n')
        xtermRef.current.write('  clear         - Clear terminal\r\n')
        break

      case 'ls':
        xtermRef.current.write('src/\r\n')
        xtermRef.current.write('public/\r\n')
        xtermRef.current.write('package.json\r\n')
        xtermRef.current.write('README.md\r\n')
        break

      case 'pwd':
        xtermRef.current.write(`${currentDirectory}\r\n`)
        break

      case 'clear':
        xtermRef.current.clear()
        break

      case 'npm':
        if (args[1] === 'install') {
          xtermRef.current.write('Installing dependencies...\r\n')
          setTimeout(() => {
            xtermRef.current!.write('\x1b[32m✓ Dependencies installed successfully\x1b[0m\r\n')
          }, 2000)
        } else if (args[1] === 'start') {
          xtermRef.current.write('Starting development server...\r\n')
          setTimeout(() => {
            xtermRef.current!.write('\x1b[32m✓ Server running on http://localhost:3000\x1b[0m\r\n')
          }, 1500)
        }
        break

      case 'git':
        if (args[1] === 'status') {
          xtermRef.current.write('On branch main\r\n')
          xtermRef.current.write('Changes not staged for commit:\r\n')
          xtermRef.current.write('  modified:   src/App.js\r\n')
          xtermRef.current.write('  modified:   src/index.css\r\n')
        } else if (args[1] === 'add') {
          xtermRef.current.write('\x1b[32m✓ Changes staged\x1b[0m\r\n')
        } else if (args[1] === 'commit') {
          xtermRef.current.write('\x1b[32m✓ Changes committed\x1b[0m\r\n')
        } else if (args[1] === 'push') {
          xtermRef.current.write('Pushing to origin main...\r\n')
          setTimeout(() => {
            xtermRef.current!.write('\x1b[32m✓ Successfully pushed to GitHub\x1b[0m\r\n')
          }, 2000)
        }
        break

      default:
        if (command) {
          xtermRef.current.write(`Command not found: ${command}\r\n`)
          xtermRef.current.write('Type "help" for available commands\r\n')
        }
        break
    }

    if (onCommand) {
      onCommand(command)
    }
  }

  const copyTerminalContent = () => {
    if (xtermRef.current) {
      const selection = xtermRef.current.getSelection()
      if (selection) {
        navigator.clipboard.writeText(selection)
      }
    }
  }

  const clearTerminal = () => {
    if (xtermRef.current) {
      xtermRef.current.clear()
      xtermRef.current.write('$ ')
    }
  }

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized)
    setTimeout(() => {
      if (fitAddonRef.current) {
        fitAddonRef.current.fit()
      }
    }, 100)
  }

  return (
    <motion.div
      className={`bg-[#1e1e1e] border border-gray-700 rounded-lg overflow-hidden ${className}`}
      animate={{
        height: isMaximized ? '80vh' : '300px'
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between bg-[#2d2d30] px-4 py-2 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-sm text-gray-300 ml-2">Terminal</span>
          {isConnected && (
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={copyTerminalContent}
            className="h-6 w-6 p-0 text-gray-400 hover:text-white"
          >
            <Copy className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearTerminal}
            className="h-6 w-6 p-0 text-gray-400 hover:text-white"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMaximize}
            className="h-6 w-6 p-0 text-gray-400 hover:text-white"
          >
            {isMaximized ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
          </Button>
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef} 
        className="h-full p-2"
        style={{ height: isMaximized ? 'calc(80vh - 40px)' : '260px' }}
      />
    </motion.div>
  )
}