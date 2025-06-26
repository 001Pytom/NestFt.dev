'use client'

import { useEffect, useRef, useState } from 'react'
import { Editor } from '@monaco-editor/react'
import { FileNode } from '@/types/ide'

interface CodeEditorProps {
  file: FileNode | null
  code: string
  onChange: (value: string) => void
  onSave: () => void
  selectedLanguage?: 'javascript' | 'typescript'
}

export function CodeEditor({ file, code, onChange, onSave, selectedLanguage = 'javascript' }: CodeEditorProps) {
  const editorRef = useRef<any>(null)
  const [theme, setTheme] = useState('vs-dark')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        onSave()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onSave])

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor

    // Configure Monaco Editor with VS Code-like features
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    })

    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      reactNamespace: 'React',
      allowJs: true,
      typeRoots: ['node_modules/@types'],
    })

    // Add custom key bindings
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      onSave()
    })

    // Enable format on paste
    editor.updateOptions({
      formatOnPaste: true,
      formatOnType: true,
      autoIndent: 'full',
      suggestOnTriggerCharacters: true,
      quickSuggestions: true,
      wordBasedSuggestions: true,
    })
  }

  const getLanguage = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase()
    
    // Override with TypeScript if preference is set and file is JS
    if (selectedLanguage === 'typescript' && (ext === 'js' || ext === 'jsx')) {
      return ext === 'jsx' ? 'typescript' : 'typescript'
    }
    
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
      case 'java':
        return 'java'
      case 'cpp':
      case 'c':
        return 'cpp'
      default:
        return 'plaintext'
    }
  }

  if (!file) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#1e1e1e] text-gray-400">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-lg font-medium mb-2">No file selected</h3>
          <p className="text-sm">Select a file from the explorer to start editing</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-[#2d2d30] border-b border-[#3e3e42] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-white text-sm">{file.name}</span>
          {code !== file.content && (
            <div className="w-2 h-2 bg-white rounded-full"></div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === 'vs-dark' ? 'light' : 'vs-dark')}
            className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded"
          >
            {theme === 'vs-dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
      
      <Editor
        height="100%"
        language={getLanguage(file.name)}
        value={code}
        onChange={(value) => onChange(value || '')}
        onMount={handleEditorDidMount}
        theme={theme}
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          wordWrap: 'on',
          contextmenu: true,
          quickSuggestions: {
            other: true,
            comments: true,
            strings: true,
          },
          suggestOnTriggerCharacters: true,
          acceptSuggestionOnEnter: 'on',
          acceptSuggestionOnCommitCharacter: true,
          snippetSuggestions: 'top',
          emptySelectionClipboard: false,
          copyWithSyntaxHighlighting: false,
          multiCursorModifier: 'ctrlCmd',
          accessibilitySupport: 'auto',
          folding: true,
          foldingHighlight: true,
          showFoldingControls: 'mouseover',
          matchBrackets: 'always',
          renderWhitespace: 'selection',
          renderControlCharacters: false,
          renderIndentGuides: true,
          colorDecorators: true,
          codeLens: true,
          lightbulb: {
            enabled: true,
          },
        }}
      />
    </div>
  )
}