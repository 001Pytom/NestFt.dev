'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Play, 
  Square, 
  FolderPlus, 
  FilePlus, 
  Save, 
  Github, 
  Eye, 
  Terminal,
  Settings,
  Upload,
  Download,
  Trash2,
  RefreshCw
} from 'lucide-react'
import { beginnerProjects, intermediateProjects, advancedProjects, techStacks } from '@/data/projects'
import { ProjectTemplate, TechTemplate } from '@/types/project'

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
  const templateId = searchParams.get('template')
  const projectName = searchParams.get('name')
  
  const [project, setProject] = useState<ProjectTemplate | null>(null)
  const [template, setTemplate] = useState<TechTemplate | null>(null)
  const [fileTree, setFileTree] = useState<FileNode[]>([])
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null)
  const [code, setCode] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [terminalOutput, setTerminalOutput] = useState<string[]>([])
  const [showTerminal, setShowTerminal] = useState(false)
  const [showPreview, setShowPreview] = useState(true)

  useEffect(() => {
    // Find project and template
    const allProjects = [...beginnerProjects, ...intermediateProjects, ...advancedProjects]
    const foundProject = allProjects.find(p => p.id === projectId)
    
    if (!foundProject) return
    
    setProject(foundProject)
    
    // Find template
    const allTemplates = techStacks.flatMap(stack => stack.templates)
    const foundTemplate = allTemplates.find(t => t.id === templateId)
    
    if (!foundTemplate) return
    
    setTemplate(foundTemplate)
    
    // Initialize file tree from template
    const initializeFileTree = (structure: any, basePath = ''): FileNode[] => {
      return Object.entries(structure).map(([name, content]) => {
        const path = basePath ? `${basePath}/${name}` : name
        
        if (typeof content === 'string') {
          return {
            name,
            type: 'file',
            content: getDefaultFileContent(name, foundTemplate),
            path
          }
        } else {
          return {
            name,
            type: 'folder',
            children: initializeFileTree(content, path),
            path
          }
        }
      })
    }
    
    const initialTree = initializeFileTree(foundTemplate.folderStructure)
    setFileTree(initialTree)
    
    // Select first file
    const firstFile = findFirstFile(initialTree)
    if (firstFile) {
      setSelectedFile(firstFile)
      setCode(firstFile.content || '')
    }
  }, [projectId, templateId])

  const getDefaultFileContent = (fileName: string, template: TechTemplate): string => {
    // Return default content based on file type and template
    if (fileName === 'README.md') {
      return `# ${projectName || 'Project'}\n\nBuilt with ${template.name}\n\n## Getting Started\n\n${template.startCommand}\n`
    }
    
    if (fileName === 'package.json' && template.dependencies.length > 0) {
      return JSON.stringify({
        name: projectName?.toLowerCase().replace(/\s+/g, '-') || 'project',
        version: '1.0.0',
        dependencies: template.dependencies.reduce((acc, dep) => {
          acc[dep] = 'latest'
          return acc
        }, {} as Record<string, string>),
        scripts: {
          start: template.startCommand,
          dev: template.startCommand,
          build: 'echo "Build script not configured"'
        }
      }, null, 2)
    }
    
    if (fileName === 'index.html') {
      return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName || 'Project'}</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <h1>Welcome to ${projectName || 'Your Project'}</h1>
    <p>Start building your project here!</p>
    
    <script src="js/main.js"></script>
</body>
</html>`
    }
    
    if (fileName.endsWith('.css')) {
      return `/* ${projectName || 'Project'} Styles */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #333;
}

h1 {
    color: #2c3e50;
    margin-bottom: 1rem;
}
`
    }
    
    if (fileName.endsWith('.js')) {
      return `// ${projectName || 'Project'} JavaScript

console.log('Welcome to ${projectName || 'your project'}!');

// Your code here
`
    }
    
    return ''
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

  const handleSave = () => {
    if (selectedFile) {
      updateFileContent(selectedFile.path, code)
      // Here you would typically save to a backend
      console.log('File saved:', selectedFile.path)
    }
  }

  const handleRun = () => {
    setIsRunning(true)
    setShowTerminal(true)
    setTerminalOutput(prev => [...prev, `> ${template?.startCommand || 'npm start'}`])
    
    // Simulate running the project
    setTimeout(() => {
      setTerminalOutput(prev => [...prev, 'Starting development server...'])
      setTimeout(() => {
        setTerminalOutput(prev => [...prev, 'Server running on http://localhost:3000'])
        setIsRunning(false)
      }, 2000)
    }, 1000)
  }

  const handleStop = () => {
    setIsRunning(false)
    setTerminalOutput(prev => [...prev, 'Server stopped.'])
  }

  const handleSubmit = () => {
    // Navigate to submission page
    window.location.href = `/projects/${projectId}/submit`
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

  if (!project || !template) {
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
          <h1 className="text-lg font-semibold">{projectName}</h1>
          <Badge variant="outline">{template.name}</Badge>
          <Badge className="bg-green-500/10 text-green-700">
            {project.difficulty}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-1" />
            Save
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