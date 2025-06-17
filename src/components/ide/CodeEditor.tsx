'use client'

import { useState, useEffect, useRef } from 'react'
import { Editor } from '@monaco-editor/react'
import { motion } from 'framer-motion'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language: string
  fileName: string
  theme?: 'vs-dark' | 'light'
}

export function CodeEditor({ value, onChange, language, fileName, theme = 'vs-dark' }: CodeEditorProps) {
  const editorRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor
    setIsLoading(false)

    // Configure editor options for better IDE experience
    editor.updateOptions({
      fontSize: 14,
      fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
      lineHeight: 1.5,
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 2,
      insertSpaces: true,
      wordWrap: 'on',
      bracketPairColorization: { enabled: true },
      guides: {
        bracketPairs: true,
        indentation: true
      },
      suggest: {
        showKeywords: true,
        showSnippets: true,
        showFunctions: true,
        showConstructors: true,
        showFields: true,
        showVariables: true,
        showClasses: true,
        showStructs: true,
        showInterfaces: true,
        showModules: true,
        showProperties: true,
        showEvents: true,
        showOperators: true,
        showUnits: true,
        showValues: true,
        showConstants: true,
        showEnums: true,
        showEnumMembers: true,
        showColors: true,
        showFiles: true,
        showReferences: true,
        showFolders: true,
        showTypeParameters: true
      },
      quickSuggestions: {
        other: true,
        comments: true,
        strings: true
      },
      parameterHints: { enabled: true },
      hover: { enabled: true },
      contextmenu: true,
      mouseWheelZoom: true
    })

    // Add custom snippets and completions
    monaco.languages.registerCompletionItemProvider(language, {
      provideCompletionItems: (model: any, position: any) => {
        const suggestions = getLanguageSnippets(language)
        return { suggestions }
      }
    })

    // Add error checking and linting
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false
    })

    // Configure IntelliSense
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
      typeRoots: ['node_modules/@types']
    })
  }

  const getLanguageSnippets = (lang: string) => {
    const snippets: any[] = []

    if (lang === 'javascript' || lang === 'typescript') {
      snippets.push(
        {
          label: 'log',
          kind: 14, // Snippet
          insertText: 'console.log(${1:message});',
          insertTextRules: 4, // InsertAsSnippet
          documentation: 'Log output to console'
        },
        {
          label: 'func',
          kind: 14,
          insertText: 'function ${1:name}(${2:params}) {\n\t${3:// body}\n}',
          insertTextRules: 4,
          documentation: 'Function declaration'
        },
        {
          label: 'arrow',
          kind: 14,
          insertText: 'const ${1:name} = (${2:params}) => {\n\t${3:// body}\n};',
          insertTextRules: 4,
          documentation: 'Arrow function'
        },
        {
          label: 'if',
          kind: 14,
          insertText: 'if (${1:condition}) {\n\t${2:// body}\n}',
          insertTextRules: 4,
          documentation: 'If statement'
        },
        {
          label: 'for',
          kind: 14,
          insertText: 'for (let ${1:i} = 0; ${1:i} < ${2:array}.length; ${1:i}++) {\n\t${3:// body}\n}',
          insertTextRules: 4,
          documentation: 'For loop'
        },
        {
          label: 'try',
          kind: 14,
          insertText: 'try {\n\t${1:// body}\n} catch (${2:error}) {\n\t${3:// handle error}\n}',
          insertTextRules: 4,
          documentation: 'Try-catch block'
        }
      )
    }

    if (lang === 'html') {
      snippets.push(
        {
          label: 'html5',
          kind: 14,
          insertText: '<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title>${1:Document}</title>\n</head>\n<body>\n\t${2:// body}\n</body>\n</html>',
          insertTextRules: 4,
          documentation: 'HTML5 boilerplate'
        },
        {
          label: 'div',
          kind: 14,
          insertText: '<div class="${1:className}">\n\t${2:content}\n</div>',
          insertTextRules: 4,
          documentation: 'Div element'
        }
      )
    }

    if (lang === 'css') {
      snippets.push(
        {
          label: 'flex',
          kind: 14,
          insertText: 'display: flex;\njustify-content: ${1:center};\nalign-items: ${2:center};',
          insertTextRules: 4,
          documentation: 'Flexbox layout'
        },
        {
          label: 'grid',
          kind: 14,
          insertText: 'display: grid;\ngrid-template-columns: ${1:repeat(auto-fit, minmax(250px, 1fr))};\ngap: ${2:1rem};',
          insertTextRules: 4,
          documentation: 'CSS Grid layout'
        }
      )
    }

    return snippets
  }

  return (
    <div className="h-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1e1e1e] z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"
          />
        </div>
      )}
      
      <Editor
        height="100%"
        language={language}
        value={value}
        onChange={(value) => onChange(value || '')}
        onMount={handleEditorDidMount}
        theme={theme}
        options={{
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: false,
          cursorStyle: 'line',
          automaticLayout: true,
          glyphMargin: true,
          folding: true,
          lineNumbers: 'on',
          lineDecorationsWidth: 10,
          lineNumbersMinChars: 3,
          renderLineHighlight: 'all',
          scrollbar: {
            vertical: 'visible',
            horizontal: 'visible',
            useShadows: false,
            verticalHasArrows: false,
            horizontalHasArrows: false,
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10
          }
        }}
      />
    </div>
  )
}