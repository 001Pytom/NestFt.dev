'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Play, 
  Square, 
  FolderPlus, 
  FilePlus, 
  Save, 
  Github, 
  Eye, 
  Download,
  RefreshCw,
  Settings,
  Terminal as TerminalIcon,
  Code2,
  FileText
} from 'lucide-react'
import { saveProjectCode } from '@/lib/database'
import { UserProject } from '@/lib/database'
import { getFileContent } from '@/lib/fileTemplates'
import { techStacks } from '@/data/projects'
import { CodeEditor } from '@/components/ide/CodeEditor'
import { Terminal } from '@/components/ide/Terminal'
import { PreviewPanel } from '@/components/ide/PreviewPanel'
import { GitHubIntegration } from '@/components/ide/GitHubIntegration'

interface FileNode {
  name: string
  type: 'file' | 'folder'
  content?: string
  children?: FileNode[]
  path: string
  language?: string
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
  const [showPreview, setShowPreview] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [activeTab, setActiveTab] = useState('editor')

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
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault()
            handleSave(true)
            break
          case '`':
            e.preventDefault()
            setActiveTab(activeTab === 'terminal' ? 'editor' : 'terminal')
            break
          case 'p':
            if (e.shiftKey) {
              e.preventDefault()
              setShowPreview(!showPreview)
            }
            break
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [activeTab, showPreview])

  const loadProject = async () => {
    try {
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
          path,
          language: getLanguageFromFile(name)
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

  const getLanguageFromFile = (fileName: string): string => {
    const ext = fileName.split('.').pop()?.toLowerCase()
    switch (ext) {
      case 'js':
      case 'jsx':
        return 'javascript'
      case 'ts':
      case 'tsx':
        return 'typescript'
      case 'html':
        return 'html'
      case 'css':
        return 'css'
      case 'json':
        return 'json'
      case 'md':
        return 'markdown'
      case 'py':
        return 'python'
      default:
        return 'plaintext'
    }
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
        // Show save notification
        console.log('Project saved successfully')
      }
    } catch (error) {
      console.error('Error saving project:', error)
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
    setActiveTab('terminal')
    
    // Simulate running the project
    setTimeout(() => {
      setIsRunning(false)
    }, 3000)
  }

  const handleStop = () => {
    setIsRunning(false)
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
      <motion.div 
        key={node.path} 
        style={{ marginLeft: `${level * 16}px` }}
        whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
        className="rounded"
      >
        <div
          className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
            selectedFile?.path === node.path ? 'bg-primary/20 text-primary' : 'hover:bg-muted/50'
          }`}
          onClick={() => node.type === 'file' && handleFileSelect(node)}
        >
          {node.type === 'folder' ? (
            <FolderPlus className="h-4 w-4 text-blue-400" />
          ) : (
            <FileText className="h-4 w-4 text-gray-400" />
          )}
          <span className="text-sm font-medium">{node.name}</span>
        </div>
        {node.children && renderFileTree(node.children, level + 1)}
      </motion.div>
    ))
  }

  if (!userProject) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1e1e1e]">
        <div className="text-center text-white">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading IDE...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-[#1e1e1e] text-white">
      {/* Header */}
      <div className="border-b border-gray-700 p-4 flex items-center justify-between bg-[#2d2d30]">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">{userProject.project_name}</h1>
          <Badge variant="outline" className="border-blue-400 text-blue-400">
            {userProject.template_id}
          </Badge>
          <Badge className="bg-green-500/10 text-green-400 border-green-400">
            {userProject.difficulty}
          </Badge>
          {lastSaved && (
            <span className="text-xs text-gray-400">
              Last saved: {lastSaved.toLocaleTimeString()}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => handleSave(true)} disabled={isSaving}>
            <Save className="h-4 w-4 mr-1" />
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
          
          <Button variant="ghost" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
          
          {isRunning ? (
            <Button variant="ghost" size="sm" onClick={handleStop}>
              <Square className="h-4 w-4 mr-1" />
              Stop
            </Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={handleRun}>
              <Play className="h-4 w-4 mr-1" />
              Run
            </Button>
          )}
          
          <Button variant="ghost" size="sm" onClick={() => setShowPreview(!showPreview)}>
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
          
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
            Submit Project
          </Button>
        </div>
      </div>

      {/* Main IDE Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* File Explorer */}
        <div className="w-64 border-r border-gray-700 bg-[#252526] p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-300">Explorer</h3>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <FolderPlus className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <FilePlus className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            {renderFileTree(fileTree)}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="bg-[#2d2d30] border-b border-gray-700 rounded-none justify-start">
              <TabsTrigger value="editor" className="flex items-center gap-2">
                <Code2 className="h-4 w-4" />
                Editor
              </TabsTrigger>
              <TabsTrigger value="terminal" className="flex items-center gap-2">
                <TerminalIcon className="h-4 w-4" />
                Terminal
              </TabsTrigger>
              <TabsTrigger value="github" className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                GitHub
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 flex">
              <div className="flex-1 flex flex-col">
                <TabsContent value="editor" className="flex-1 m-0">
                  {selectedFile && (
                    <div className="h-full flex flex-col">
                      <div className="border-b border-gray-700 p-2 bg-[#2d2d30]">
                        <span className="text-sm font-medium text-gray-300">{selectedFile.name}</span>
                      </div>
                      <div className="flex-1">
                        <CodeEditor
                          value={code}
                          onChange={setCode}
                          language={selectedFile.language || 'javascript'}
                          fileName={selectedFile.name}
                          theme="vs-dark"
                        />
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="terminal" className="flex-1 m-0">
                  <Terminal
                    projectId={projectId}
                    className="h-full"
                  />
                </TabsContent>

                <TabsContent value="github" className="flex-1 m-0 p-4 overflow-y-auto">
                  <GitHubIntegration
                    projectId={projectId}
                    projectName={userProject.project_name}
                    codeFiles={collectAllFiles(fileTree)}
                  />
                </TabsContent>
              </div>

              {/* Preview Panel */}
              <PreviewPanel
                code={collectAllFiles(fileTree)}
                projectId={projectId}
                isVisible={showPreview}
                onToggleVisibility={() => setShowPreview(!showPreview)}
              />
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}