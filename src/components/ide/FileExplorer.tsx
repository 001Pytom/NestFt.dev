'use client'

import { useState } from 'react'
import { 
  FolderPlus, 
  FilePlus, 
  Trash2, 
  ChevronRight, 
  ChevronDown,
  File,
  Folder,
  FolderOpen
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FileNode } from '@/types/ide'

interface FileExplorerProps {
  fileTree: FileNode[]
  selectedFile: FileNode | null
  onFileSelect: (file: FileNode) => void
  onCreateFile: (parentPath: string, fileName: string) => void
  onCreateFolder: (parentPath: string, folderName: string) => void
  onDeleteNode: (path: string) => void
  onToggleFolder: (path: string) => void
}

export function FileExplorer({
  fileTree,
  selectedFile,
  onFileSelect,
  onCreateFile,
  onCreateFolder,
  onDeleteNode,
  onToggleFolder
}: FileExplorerProps) {
  const [contextMenu, setContextMenu] = useState<{
    x: number
    y: number
    node: FileNode | null
  } | null>(null)
  const [showCreateInput, setShowCreateInput] = useState<{
    type: 'file' | 'folder'
    parentPath: string
  } | null>(null)
  const [newItemName, setNewItemName] = useState('')

  const handleContextMenu = (e: React.MouseEvent, node: FileNode) => {
    e.preventDefault()
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      node
    })
  }

  const handleCreateItem = () => {
    if (!showCreateInput || !newItemName.trim()) return

    if (showCreateInput.type === 'file') {
      onCreateFile(showCreateInput.parentPath, newItemName.trim())
    } else {
      onCreateFolder(showCreateInput.parentPath, newItemName.trim())
    }

    setShowCreateInput(null)
    setNewItemName('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreateItem()
    } else if (e.key === 'Escape') {
      setShowCreateInput(null)
      setNewItemName('')
    }
  }

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase()
    switch (ext) {
      case 'js':
      case 'jsx':
      case 'ts':
      case 'tsx':
        return '📄'
      case 'html':
        return '🌐'
      case 'css':
        return '🎨'
      case 'json':
        return '📋'
      case 'md':
        return '📝'
      default:
        return '📄'
    }
  }

  const renderFileTree = (nodes: FileNode[], level = 0) => {
    return nodes.map((node) => (
      <div key={node.path}>
        <div
          className={`flex items-center gap-2 p-1 rounded cursor-pointer hover:bg-gray-100 group ${
            selectedFile?.path === node.path ? "bg-blue-100 text-blue-700" : ""
          }`}
          style={{ marginLeft: `${level * 16}px` }}
          onClick={() => {
            if (node.type === "file") {
              onFileSelect(node);
            } else {
              onToggleFolder(node.path);
            }
          }}
          onContextMenu={(e) => handleContextMenu(e, node)}
        >
          {node.type === "folder" ? (
            <>
              {node.isOpen ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
              {node.isOpen ? (
                <FolderOpen className="h-4 w-4 text-blue-500" />
              ) : (
                <Folder className="h-4 w-4 text-blue-500" />
              )}
              <span className="text-sm font-medium">{node.name}</span>
            </>
          ) : (
            <>
              <div className="w-4" /> {/* Spacer for alignment */}
              <span className="text-sm">{getFileIcon(node.name)}</span>
              <span className="text-sm">{node.name}</span>
              {selectedFile?.path === node.path && (
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full ml-auto"></div>
              )}
            </>
          )}
          
          {/* Delete button - only show on hover */}
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 ml-auto"
            onClick={(e) => {
              e.stopPropagation()
              onDeleteNode(node.path)
            }}
          >
            <Trash2 className="h-3 w-3 text-red-500" />
          </Button>
        </div>

        {/* Show create input if this is the target folder */}
        {showCreateInput && showCreateInput.parentPath === node.path && (
          <div
            className="flex items-center gap-2 p-1 ml-4"
            style={{ marginLeft: `${(level + 1) * 16}px` }}
          >
            {showCreateInput.type === 'folder' ? (
              <Folder className="h-4 w-4 text-blue-500" />
            ) : (
              <File className="h-4 w-4 text-gray-500" />
            )}
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={handleCreateItem}
              className="text-sm bg-white border rounded px-2 py-1 flex-1"
              placeholder={`New ${showCreateInput.type} name`}
              autoFocus
            />
          </div>
        )}

        {node.type === "folder" &&
          node.isOpen &&
          node.children &&
          renderFileTree(node.children, level + 1)}
      </div>
    ));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-sm text-gray-700">Explorer</h3>
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0"
              onClick={() => setShowCreateInput({ type: 'folder', parentPath: '' })}
              title="New Folder"
            >
              <FolderPlus className="h-3 w-3" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0"
              onClick={() => setShowCreateInput({ type: 'file', parentPath: '' })}
              title="New File"
            >
              <FilePlus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {/* Show create input at root level */}
        {showCreateInput && showCreateInput.parentPath === '' && (
          <div className="flex items-center gap-2 p-1 mb-2">
            {showCreateInput.type === 'folder' ? (
              <Folder className="h-4 w-4 text-blue-500" />
            ) : (
              <File className="h-4 w-4 text-gray-500" />
            )}
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={handleCreateItem}
              className="text-sm bg-white border rounded px-2 py-1 flex-1"
              placeholder={`New ${showCreateInput.type} name`}
              autoFocus
            />
          </div>
        )}
        
        {renderFileTree(fileTree)}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setContextMenu(null)}
          />
          <div
            className="fixed z-50 bg-white border border-gray-200 rounded-md shadow-lg py-1 min-w-[150px]"
            style={{
              left: contextMenu.x,
              top: contextMenu.y,
            }}
          >
            {contextMenu.node?.type === 'folder' && (
              <>
                <button
                  className="w-full text-left px-3 py-1 text-sm hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => {
                    setShowCreateInput({ type: 'file', parentPath: contextMenu.node!.path })
                    setContextMenu(null)
                  }}
                >
                  <FilePlus className="h-4 w-4" />
                  New File
                </button>
                <button
                  className="w-full text-left px-3 py-1 text-sm hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => {
                    setShowCreateInput({ type: 'folder', parentPath: contextMenu.node!.path })
                    setContextMenu(null)
                  }}
                >
                  <FolderPlus className="h-4 w-4" />
                  New Folder
                </button>
                <hr className="my-1" />
              </>
            )}
            <button
              className="w-full text-left px-3 py-1 text-sm hover:bg-gray-100 text-red-600 flex items-center gap-2"
              onClick={() => {
                onDeleteNode(contextMenu.node!.path)
                setContextMenu(null)
              }}
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  )
}