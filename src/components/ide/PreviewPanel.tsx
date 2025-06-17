'use client'

import { useEffect, useRef, useState } from 'react'
import { RefreshCw, ExternalLink, Smartphone, Tablet, Monitor } from 'lucide-react'

interface PreviewPanelProps {
  projectId: string
  files: Record<string, string>
  isRunning: boolean
}

export function PreviewPanel({ projectId, files, isRunning }: PreviewPanelProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [viewportSize, setViewportSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isRunning && files) {
      generatePreview()
    }
  }, [files, isRunning])

  const generatePreview = async () => {
    setIsLoading(true)
    
    try {
      // Create a blob URL for the HTML content
      const htmlContent = files['index.html'] || generateDefaultHTML()
      const cssContent = files['css/style.css'] || files['style.css'] || ''
      const jsContent = files['js/main.js'] || files['main.js'] || files['script.js'] || ''
      
      // Inject CSS and JS into HTML
      const fullHTML = injectAssetsIntoHTML(htmlContent, cssContent, jsContent)
      
      const blob = new Blob([fullHTML], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      
      setPreviewUrl(url)
      
      // Clean up previous URL
      return () => {
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl)
        }
      }
    } catch (error) {
      console.error('Error generating preview:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateDefaultHTML = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview</title>
</head>
<body>
    <div style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: Arial, sans-serif;">
        <div style="text-align: center;">
            <h1>🚀 Your Project Preview</h1>
            <p>Start coding to see your changes here!</p>
        </div>
    </div>
</body>
</html>`
  }

  const injectAssetsIntoHTML = (html: string, css: string, js: string) => {
    let modifiedHTML = html

    // Inject CSS
    if (css) {
      const cssTag = `<style>${css}</style>`
      if (modifiedHTML.includes('</head>')) {
        modifiedHTML = modifiedHTML.replace('</head>', `${cssTag}\n</head>`)
      } else {
        modifiedHTML = `<head>${cssTag}</head>${modifiedHTML}`
      }
    }

    // Inject JavaScript
    if (js) {
      const jsTag = `<script>${js}</script>`
      if (modifiedHTML.includes('</body>')) {
        modifiedHTML = modifiedHTML.replace('</body>', `${jsTag}\n</body>`)
      } else {
        modifiedHTML = `${modifiedHTML}<script>${js}</script>`
      }
    }

    return modifiedHTML
  }

  const refreshPreview = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src
    }
  }

  const openInNewTab = () => {
    if (previewUrl) {
      window.open(previewUrl, '_blank')
    }
  }

  const getViewportDimensions = () => {
    switch (viewportSize) {
      case 'mobile':
        return { width: '375px', height: '667px' }
      case 'tablet':
        return { width: '768px', height: '1024px' }
      case 'desktop':
        return { width: '100%', height: '100%' }
    }
  }

  const dimensions = getViewportDimensions()

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="bg-[#f3f3f3] border-b border-gray-300 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-gray-700 text-sm font-medium">Preview</span>
          {isRunning && (
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {/* Viewport size controls */}
          <div className="flex items-center gap-1 bg-white rounded border">
            <button
              onClick={() => setViewportSize('mobile')}
              className={`p-1 rounded ${viewportSize === 'mobile' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              title="Mobile view"
            >
              <Smartphone className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewportSize('tablet')}
              className={`p-1 rounded ${viewportSize === 'tablet' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              title="Tablet view"
            >
              <Tablet className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewportSize('desktop')}
              className={`p-1 rounded ${viewportSize === 'desktop' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              title="Desktop view"
            >
              <Monitor className="h-4 w-4" />
            </button>
          </div>
          
          <button
            onClick={refreshPreview}
            className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-100"
            title="Refresh preview"
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          
          <button
            onClick={openInNewTab}
            className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-100"
            title="Open in new tab"
            disabled={!previewUrl}
          >
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center bg-gray-100 p-4">
        {previewUrl ? (
          <div 
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300"
            style={{
              width: dimensions.width,
              height: dimensions.height,
              maxWidth: '100%',
              maxHeight: '100%',
            }}
          >
            <iframe
              ref={iframeRef}
              src={previewUrl}
              className="w-full h-full border-none"
              title="Project Preview"
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <div className="text-6xl mb-4">👁️</div>
            <h3 className="text-lg font-medium mb-2">No preview available</h3>
            <p className="text-sm">
              {isRunning ? 'Generating preview...' : 'Run your project to see the preview'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}