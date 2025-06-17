'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, ExternalLink, Smartphone, Tablet, Monitor, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PreviewPanelProps {
  code: Record<string, string>
  projectId: string
  isVisible: boolean
  onToggleVisibility: () => void
}

export function PreviewPanel({ code, projectId, isVisible, onToggleVisibility }: PreviewPanelProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [isLoading, setIsLoading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('')

  useEffect(() => {
    if (isVisible && code) {
      generatePreview()
    }
  }, [code, isVisible])

  const generatePreview = async () => {
    setIsLoading(true)
    
    try {
      // Create a blob URL with the HTML content
      const htmlContent = generateHTMLPreview()
      const blob = new Blob([htmlContent], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      setPreviewUrl(url)
      
      // Update iframe
      if (iframeRef.current) {
        iframeRef.current.src = url
      }
    } catch (error) {
      console.error('Error generating preview:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateHTMLPreview = () => {
    const htmlFile = code['index.html'] || code['src/App.js'] || ''
    const cssFiles = Object.entries(code).filter(([path]) => path.endsWith('.css'))
    const jsFiles = Object.entries(code).filter(([path]) => path.endsWith('.js') && !path.includes('node_modules'))

    // If it's a React project, create a simple preview
    if (code['src/App.js']) {
      return generateReactPreview()
    }

    // For vanilla HTML projects
    let html = htmlFile

    // Inject CSS
    cssFiles.forEach(([path, content]) => {
      const cssTag = `<style>/* ${path} */\n${content}\n</style>`
      if (html.includes('</head>')) {
        html = html.replace('</head>', `${cssTag}\n</head>`)
      } else {
        html = `<head>${cssTag}</head>${html}`
      }
    })

    // Inject JavaScript
    jsFiles.forEach(([path, content]) => {
      const jsTag = `<script>/* ${path} */\n${content}\n</script>`
      if (html.includes('</body>')) {
        html = html.replace('</body>', `${jsTag}\n</body>`)
      } else {
        html = `${html}<script>${content}</script>`
      }
    })

    return html
  }

  const generateReactPreview = () => {
    // Simple React preview using Babel standalone
    const appJs = code['src/App.js'] || ''
    const appCss = code['src/App.css'] || ''
    const indexCss = code['src/index.css'] || ''

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview</title>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        ${indexCss}
        ${appCss}
        body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        #root { min-height: 100vh; }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
        ${appJs.replace('export default App;', '')}
        
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(React.createElement(App));
    </script>
</body>
</html>`
  }

  const refreshPreview = () => {
    generatePreview()
  }

  const openInNewTab = () => {
    if (previewUrl) {
      window.open(previewUrl, '_blank')
    }
  }

  const getPreviewDimensions = () => {
    switch (previewMode) {
      case 'mobile':
        return { width: '375px', height: '667px' }
      case 'tablet':
        return { width: '768px', height: '1024px' }
      default:
        return { width: '100%', height: '100%' }
    }
  }

  if (!isVisible) {
    return (
      <div className="w-12 border-l bg-muted/30 flex flex-col items-center py-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleVisibility}
          className="mb-2"
        >
          <Eye className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: '50%' }}
      exit={{ width: 0 }}
      className="border-l bg-background flex flex-col"
    >
      {/* Preview Header */}
      <div className="border-b p-3 bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Preview</span>
            {isLoading && (
              <RefreshCw className="h-3 w-3 animate-spin text-muted-foreground" />
            )}
          </div>
          
          <div className="flex items-center gap-1">
            {/* Device Mode Selector */}
            <div className="flex items-center gap-1 mr-2">
              <Button
                variant={previewMode === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setPreviewMode('desktop')}
                className="h-7 w-7 p-0"
              >
                <Monitor className="h-3 w-3" />
              </Button>
              <Button
                variant={previewMode === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setPreviewMode('tablet')}
                className="h-7 w-7 p-0"
              >
                <Tablet className="h-3 w-3" />
              </Button>
              <Button
                variant={previewMode === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setPreviewMode('mobile')}
                className="h-7 w-7 p-0"
              >
                <Smartphone className="h-3 w-3" />
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={refreshPreview}
              className="h-7 w-7 p-0"
            >
              <RefreshCw className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={openInNewTab}
              className="h-7 w-7 p-0"
            >
              <ExternalLink className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleVisibility}
              className="h-7 w-7 p-0"
            >
              <EyeOff className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 p-4 bg-gray-100 overflow-auto">
        <div className="h-full flex items-center justify-center">
          <motion.div
            animate={getPreviewDimensions()}
            transition={{ duration: 0.3 }}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
            style={{
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          >
            {previewUrl ? (
              <iframe
                ref={iframeRef}
                src={previewUrl}
                className="w-full h-full border-none"
                title="Preview"
                sandbox="allow-scripts allow-same-origin allow-forms"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Monitor className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No preview available</p>
                  <p className="text-xs">Start coding to see your changes</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}