'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
// import { motion } from 'framer-motion'
// import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Play, 
  Square, 
  FolderPlus, 
  FilePlus, 
  Save, 
  Github, 
  Eye, 
  // Terminal,
  Download,
  RefreshCw,
  X
} from 'lucide-react'
import { saveProjectCode } from '@/lib/database'
import { UserProject } from '@/lib/database'
import { getFileContent } from '@/lib/fileTemplates'
import { techStacks } from '@/data/projects'

interface FileNode {
  name: string
  type: 'file' | 'folder'
  content?: string
  children?: FileNode[]
  path: string
}

export default function IDEPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const projectId = params.projectId as string
  
  const [userProject, setUserProject] = useState<UserProject | null>(null)
  const [fileTree, setFileTree] = useState<FileNode[]>([])
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null)
  const [code, setCode] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [terminalOutput, setTerminalOutput] = useState<string[]>([])
  const [showTerminal, setShowTerminal] = useState(false)
  const [showPreview, setShowPreview] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  useEffect(() => {
    loadProject()
  }, [projectId])

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (selectedFile && code !== selectedFile.content) {
        handleSave(false) // Silent save
      }
    }, 30000) // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval)
  }, [selectedFile, code])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault()
        handleSave(true) // Manual save with feedback
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const loadProject = async () => {
    try {
      // This would typically load from database
      // For now, we'll simulate loading project data
      const templateId = searchParams.get('template')
      const projectName = searchParams.get('name')
      
      if (!templateId || !projectName) return

      // Find template
      const allTemplates = techStacks.flatMap(stack => stack.templates)
      const template = allTemplates.find(t => t.id === templateId)
      
      if (!template) return

      // Initialize file tree from template
      const initialTree = initializeFileTree(template.folderStructure, '', template, projectName)
      setFileTree(initialTree)
      
      // Select first file
      const firstFile = findFirstFile(initialTree)
      if (firstFile) {
        setSelectedFile(firstFile)
        setCode(firstFile.content || '')
      }

      // Create mock user project
      setUserProject({
        id: projectId,
        user_id: 'user-id',
        project_id: 'project-id',
        project_name: projectName,
        stack: 'frontend',
        difficulty: 'beginner',
        template_id: templateId,
        status: 'in_progress',
        code_files: {},
        started_at: new Date().toISOString(),
        last_saved_at: new Date().toISOString()
      })
    } catch (error) {
      console.error('Error loading project:', error)
    }
  }

  const initializeFileTree = (structure: any, basePath = '', template: any, projectName: string): FileNode[] => {
    return Object.entries(structure).map(([name, content]) => {
      const path = basePath ? `${basePath}/${name}` : name
      
      if (typeof content === 'string') {
        return {
          name,
          type: 'file',
          content: getFileContent(path, template, projectName),
          path
        }
      } else {
        return {
          name,
          type: 'folder',
          children: initializeFileTree(content, path, template, projectName),
          path
        }
      }
    })
  }

  const findFirstFile = (nodes: FileNode[]): FileNode | null => {
    for (const node of nodes) {
      if (node.type === 'file') {
        return node
      }
      if (node.children) {
        const found = findFirstFile(node.children)
        if (found) return found
      }
    }
    return null
  }

  const updateFileContent = (path: string, content: string) => {
    const updateNode = (nodes: FileNode[]): FileNode[] => {
      return nodes.map(node => {
        if (node.path === path && node.type === 'file') {
          return { ...node, content }
        }
        if (node.children) {
          return { ...node, children: updateNode(node.children) }
        }
        return node
      })
    }
    
    setFileTree(updateNode(fileTree))
  }

  const handleFileSelect = (file: FileNode) => {
    if (selectedFile && selectedFile.path !== file.path) {
      // Save current file content
      updateFileContent(selectedFile.path, code)
    }
    
    setSelectedFile(file)
    setCode(file.content || '')
  }

  const handleSave = async (showFeedback = true) => {
    if (!selectedFile || !userProject) return

    setIsSaving(true)
    
    try {
      // Update file content in tree
      updateFileContent(selectedFile.path, code)
      
      // Collect all file contents
      const allFiles = collectAllFiles(fileTree)
      
      // Save to database
      await saveProjectCode(userProject.id, allFiles)
      
      setLastSaved(new Date())
      
      if (showFeedback) {
        setTerminalOutput(prev => [...prev, `✅ Project saved successfully at ${new Date().toLocaleTimeString()}`])
      }
    } catch (error) {
      console.error('Error saving project:', error)
      if (showFeedback) {
        setTerminalOutput(prev => [...prev, `❌ Error saving project: ${error}`])
      }
    } finally {
      setIsSaving(false)
    }
  }

  const collectAllFiles = (nodes: FileNode[], files: Record<string, string> = {}): Record<string, string> => {
    nodes.forEach(node => {
      if (node.type === 'file') {
        files[node.path] = node.content || ''
      } else if (node.children) {
        collectAllFiles(node.children, files)
      }
    })
    return files
  }

  const handleRun = () => {
    setIsRunning(true)
    setShowTerminal(true)
    setTerminalOutput(prev => [...prev, `> Running ${userProject?.project_name}...`])
    
    // Simulate running the project
    setTimeout(() => {
      setTerminalOutput(prev => [...prev, 'Starting development server...'])
      setTimeout(() => {
        setTerminalOutput(prev => [...prev, '✅ Server running on http://localhost:3000'])
        setIsRunning(false)
      }, 2000)
    }, 1000)
  }

  const handleStop = () => {
    setIsRunning(false)
    setTerminalOutput(prev => [...prev, '🛑 Server stopped.'])
  }

  const handleDownload = () => {
    // Create a zip file with all project files
    const allFiles = collectAllFiles(fileTree)
    
    // For now, just download the current file
    if (selectedFile) {
      const blob = new Blob([code], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = selectedFile.name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const handleSubmit = () => {
    // Navigate to submission page
    window.location.href = `/projects/${userProject?.project_id}/submit`
  }

  const renderFileTree = (nodes: FileNode[], level = 0) => {
    return nodes.map(node => (
      <div key={node.path} style={{ marginLeft: `${level * 16}px` }}>
        <div
          className={`flex items-center gap-2 p-1 rounded cursor-pointer hover:bg-muted ${
            selectedFile?.path === node.path ? 'bg-primary/10' : ''
          }`}
          onClick={() => node.type === 'file' && handleFileSelect(node)}
        >
          {node.type === 'folder' ? (
            <FolderPlus className="h-4 w-4 text-blue-500" />
          ) : (
            <FilePlus className="h-4 w-4 text-gray-500" />
          )}
          <span className="text-sm">{node.name}</span>
        </div>
        {node.children && renderFileTree(node.children, level + 1)}
      </div>
    ))
  }

  if (!userProject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading IDE...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">{userProject.project_name}</h1>
          <Badge variant="outline">{userProject.template_id}</Badge>
          <Badge className="bg-green-500/10 text-green-700">
            {userProject.difficulty}
          </Badge>
          {lastSaved && (
            <span className="text-xs text-muted-foreground">
              Last saved: {lastSaved.toLocaleTimeString()}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => handleSave(true)} disabled={isSaving}>
            <Save className="h-4 w-4 mr-1" />
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
          
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
          
          {isRunning ? (
            <Button variant="outline" size="sm" onClick={handleStop}>
              <Square className="h-4 w-4 mr-1" />
              Stop
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={handleRun}>
              <Play className="h-4 w-4 mr-1" />
              Run
            </Button>
          )}
          
          <Button variant="outline" size="sm">
            <Github className="h-4 w-4 mr-1" />
            Push to GitHub
          </Button>
          
          <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
          
          <Button onClick={handleSubmit}>
            Submit Project
          </Button>
        </div>
      </div>

      {/* Main IDE Layout */}
      <div className="flex-1 flex">
        {/* File Explorer */}
        <div className="w-64 border-r bg-muted/30 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Files</h3>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm">
                <FolderPlus className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <FilePlus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            {renderFileTree(fileTree)}
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1 flex flex-col">
          {selectedFile && (
            <>
              <div className="border-b p-2 bg-muted/30">
                <span className="text-sm font-medium">{selectedFile.name}</span>
              </div>
              <div className="flex-1">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-full p-4 font-mono text-sm resize-none border-none outline-none bg-background"
                  placeholder="Start coding..."
                  style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
                />
              </div>
            </>
          )}
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="w-1/2 border-l">
            <div className="border-b p-2 bg-muted/30 flex items-center justify-between">
              <span className="text-sm font-medium">Preview</span>
              <Button variant="ghost" size="sm">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            <div className="h-full bg-white">
              <iframe
                src="about:blank"
                className="w-full h-full border-none"
                title="Preview"
              />
            </div>
          </div>
        )}
      </div>

      {/* Terminal */}
      {showTerminal && (
        <div className="h-48 border-t bg-black text-green-400 font-mono text-sm">
          <div className="border-b border-gray-700 p-2 bg-gray-900 flex items-center justify-between">
            <span className="text-white">Terminal</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowTerminal(false)}
              className="text-white hover:bg-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-4 overflow-y-auto h-full">
            {terminalOutput.map((line, index) => (
              <div key={index} className="mb-1">
                {line}
              </div>
            ))}
            {isRunning && (
              <div className="flex items-center gap-2">
                <RefreshCw className="h-3 w-3 animate-spin" />
                <span>Running...</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}