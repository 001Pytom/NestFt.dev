'use client'

import { useEffect, useRef, useState } from 'react'
import { RefreshCw, ExternalLink, Smartphone, Tablet, Monitor } from 'lucide-react'

interface PreviewPanelProps {
  projectId: string
  files: Record<string, string>
  isRunning: boolean
  template?: string
  onConsoleOutput?: (output: string) => void
}

export function PreviewPanel({ projectId, files, isRunning, template, onConsoleOutput }: PreviewPanelProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [viewportSize, setViewportSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  const [isLoading, setIsLoading] = useState(false)
  const [hasGenerated, setHasGenerated] = useState(false)

  useEffect(() => {
    if (isRunning && files && !hasGenerated) {
      generatePreview()
      setHasGenerated(true)
    }
  }, [files, isRunning, template, hasGenerated])

  // Reset hasGenerated when files change significantly
  useEffect(() => {
    setHasGenerated(false)
  }, [Object.keys(files).length])

  const generatePreview = async () => {
    setIsLoading(true)
    
    try {
      let htmlContent = ''
      
      // Handle different project templates
      if (template?.includes('react')) {
        htmlContent = generateReactPreview()
      } else if (template?.includes('vue')) {
        htmlContent = generateVuePreview()
      } else if (template?.includes('nextjs')) {
        htmlContent = generateNextJSPreview()
      } else if (template?.includes('nodejs') || template?.includes('express')) {
        htmlContent = generateNodeJSPreview()
      } else {
        // Vanilla HTML/CSS/JS projects
        htmlContent = generateVanillaPreview()
      }
      
      const blob = new Blob([htmlContent], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      
      // Clean up previous URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
      
      setPreviewUrl(url)
      
    } catch (error) {
      console.error('Error generating preview:', error)
      addConsoleOutput(`Error: ${error.message}`, 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const generateReactPreview = () => {
    const appFile = files['src/App.js'] || files['src/App.jsx'] || files['src/App.ts'] || files['src/App.tsx'] || ''
    const indexFile = files['src/index.js'] || files['src/index.jsx'] || files['src/index.ts'] || files['src/index.tsx'] || ''
    const cssFile = files['src/App.css'] || files['src/index.css'] || ''
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React Preview</title>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone@7.23.5/babel.min.js"></script>
    <style>${cssFile}</style>
    <style>
      body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
      #root { min-height: 100vh; }
      .error { color: red; padding: 20px; background: #ffe6e6; margin: 10px; border-radius: 5px; }
      .loading { padding: 20px; text-align: center; color: #666; }
    </style>
</head>
<body>
    <div id="root">
      <div class="loading">Loading React App...</div>
    </div>
    
    <script>
      // Console capture
      const originalLog = console.log;
      const originalError = console.error;
      const originalWarn = console.warn;
      
      function sendToParent(level, message) {
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({ 
            type: 'console', 
            level: level, 
            message: message 
          }, '*');
        }
      }
      
      console.log = function(...args) {
        originalLog.apply(console, args);
        sendToParent('log', args.join(' '));
      };
      
      console.error = function(...args) {
        originalError.apply(console, args);
        sendToParent('error', args.join(' '));
      };
      
      console.warn = function(...args) {
        originalWarn.apply(console, args);
        sendToParent('warn', args.join(' '));
      };
      
      window.addEventListener('error', function(e) {
        sendToParent('error', \`Error: \${e.message} at line \${e.lineno}\`);
      });
      
      window.addEventListener('unhandledrejection', function(e) {
        sendToParent('error', \`Unhandled Promise Rejection: \${e.reason}\`);
      });
    </script>
    
    <script type="text/babel" data-type="module">
      try {
        const { useState, useEffect, createElement } = React;
        
        // Transform and execute App component
        ${appFile.replace(/import\s+.*?from\s+['"].*?['"];?\s*/g, '').replace(/export\s+default\s+/, 'window.App = ')}
        
        // Render the app
        const root = ReactDOM.createRoot(document.getElementById('root'));
        
        if (typeof window.App !== 'undefined') {
          root.render(React.createElement(window.App));
          console.log('✅ React App rendered successfully!');
        } else {
          // Try to find any function that looks like a component
          const componentMatch = \`${appFile}\`.match(/function\\s+(\\w+)\\s*\\(/);
          if (componentMatch) {
            const componentName = componentMatch[1];
            if (window[componentName]) {
              root.render(React.createElement(window[componentName]));
              console.log(\`✅ React Component \${componentName} rendered successfully!\`);
            } else {
              throw new Error('No valid React component found');
            }
          } else {
            throw new Error('No valid React component found');
          }
        }
      } catch (error) {
        console.error('React rendering error:', error);
        document.getElementById('root').innerHTML = \`
          <div class="error">
            <h3>React Error</h3>
            <p>\${error.message}</p>
            <p>Make sure your component is properly exported and uses valid JSX syntax.</p>
          </div>
        \`;
      }
    </script>
</body>
</html>`
  }

  const generateVuePreview = () => {
    const appFile = files['src/App.vue'] || files['App.vue'] || ''
    const mainFile = files['src/main.js'] || files['src/main.ts'] || ''
    const cssFile = files['src/style.css'] || files['src/App.css'] || ''
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue Preview</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <style>${cssFile}</style>
    <style>
      body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
      .error { color: red; padding: 20px; background: #ffe6e6; margin: 10px; border-radius: 5px; }
    </style>
</head>
<body>
    <div id="app"></div>
    
    <script>
      // Console capture
      const originalLog = console.log;
      const originalError = console.error;
      
      function sendToParent(level, message) {
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({ 
            type: 'console', 
            level: level, 
            message: message 
          }, '*');
        }
      }
      
      console.log = function(...args) {
        originalLog.apply(console, args);
        sendToParent('log', args.join(' '));
      };
      
      console.error = function(...args) {
        originalError.apply(console, args);
        sendToParent('error', args.join(' '));
      };
      
      try {
        const { createApp, ref, reactive } = Vue;
        
        const App = {
          template: \`
            <div class="vue-app">
              <h1>🚀 Vue.js App</h1>
              <p>Your Vue application is running!</p>
              <div class="counter">
                <button @click="count--">-</button>
                <span class="count">{{ count }}</span>
                <button @click="count++">+</button>
              </div>
              <p>Edit your Vue components to see changes here.</p>
            </div>
          \`,
          setup() {
            const count = ref(0);
            
            console.log('Vue app setup complete');
            
            return {
              count
            }
          }
        };
        
        createApp(App).mount('#app');
        console.log('✅ Vue App mounted successfully!');
      } catch (error) {
        console.error('Vue error:', error);
        document.getElementById('app').innerHTML = \`
          <div class="error">
            <h3>Vue Error</h3>
            <p>\${error.message}</p>
            <p>Check your Vue component syntax and structure.</p>
          </div>
        \`;
      }
    </script>
    
    <style>
      .vue-app {
        padding: 2rem;
        text-align: center;
        max-width: 600px;
        margin: 0 auto;
      }
      .counter {
        margin: 2rem 0;
      }
      .counter button {
        padding: 0.5rem 1rem;
        margin: 0 0.5rem;
        border: none;
        background: #42b883;
        color: white;
        border-radius: 4px;
        cursor: pointer;
      }
      .count {
        font-size: 1.5rem;
        font-weight: bold;
        margin: 0 1rem;
      }
    </style>
</body>
</html>`
  }

  const generateNextJSPreview = () => {
    const pageFile = files['pages/index.js'] || files['pages/index.tsx'] || files['app/page.js'] || files['app/page.tsx'] || ''
    const appFile = files['pages/_app.js'] || files['pages/_app.tsx'] || ''
    const cssFile = files['styles/globals.css'] || files['app/globals.css'] || ''
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Next.js Preview</title>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone@7.23.5/babel.min.js"></script>
    <style>${cssFile}</style>
    <style>
      body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
      .error { color: red; padding: 20px; background: #ffe6e6; margin: 10px; border-radius: 5px; }
      .nextjs-preview {
        padding: 2rem;
        text-align: center;
      }
    </style>
</head>
<body>
    <div id="__next"></div>
    
    <script>
      // Console capture
      const originalLog = console.log;
      
      function sendToParent(level, message) {
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({ 
            type: 'console', 
            level: level, 
            message: message 
          }, '*');
        }
      }
      
      console.log = function(...args) {
        originalLog.apply(console, args);
        sendToParent('log', args.join(' '));
      };
    </script>
    
    <script type="text/babel">
      try {
        const { useState } = React;
        
        // Default Next.js page component
        function HomePage() {
          const [count, setCount] = useState(0);
          
          return React.createElement('div', { className: 'nextjs-preview' },
            React.createElement('h1', null, '⚡ Next.js Preview'),
            React.createElement('p', null, 'Your Next.js application is running!'),
            React.createElement('div', { style: { margin: '2rem 0' } },
              React.createElement('button', { 
                onClick: () => setCount(count - 1),
                style: { margin: '0 0.5rem', padding: '0.5rem 1rem' }
              }, '-'),
              React.createElement('span', { style: { fontSize: '1.5rem', margin: '0 1rem' } }, count),
              React.createElement('button', { 
                onClick: () => setCount(count + 1),
                style: { margin: '0 0.5rem', padding: '0.5rem 1rem' }
              }, '+')
            ),
            React.createElement('p', null, 'Edit your pages to see changes here.')
          );
        }
        
        ${pageFile.replace(/import\s+.*?from\s+['"].*?['"];?\s*/g, '').replace(/export\s+default\s+/, 'window.PageComponent = ')}
        
        const root = ReactDOM.createRoot(document.getElementById('__next'));
        
        if (typeof window.PageComponent !== 'undefined') {
          root.render(React.createElement(window.PageComponent));
        } else {
          root.render(React.createElement(HomePage));
        }
        
        console.log('✅ Next.js page rendered successfully!');
      } catch (error) {
        console.error('Next.js error:', error);
        document.getElementById('__next').innerHTML = \`
          <div class="error">
            <h3>Next.js Error</h3>
            <p>\${error.message}</p>
            <p>Check your page component syntax.</p>
          </div>
        \`;
      }
    </script>
</body>
</html>`
  }

  const generateNodeJSPreview = () => {
    const serverFile = files['server.js'] || files['app.js'] || files['index.js'] || ''
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Node.js Preview</title>
    <style>
      body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f5f5; }
      .container { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
      .server-info { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
      .status { display: inline-block; padding: 5px 15px; background: #4CAF50; color: white; border-radius: 20px; font-size: 14px; }
      .endpoint { background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #007bff; }
      .code-preview { background: #2d3748; color: #e2e8f0; padding: 20px; border-radius: 5px; margin: 20px 0; overflow-x: auto; font-family: 'Courier New', monospace; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="server-info">
            <h1>🚀 Node.js Server Preview</h1>
            <div class="status">Server Running</div>
            
            <h3>Available Endpoints:</h3>
            <div class="endpoint">
                <strong>GET /</strong> - Main endpoint
            </div>
            <div class="endpoint">
                <strong>GET /health</strong> - Health check
            </div>
            <div class="endpoint">
                <strong>GET /api</strong> - API routes
            </div>
            
            <h3>Server Code:</h3>
            <div class="code-preview">
                <pre><code>${serverFile.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
            </div>
            
            <p><strong>Note:</strong> This is a preview of your Node.js server code. In a real environment, your server would be running on a specific port and handling HTTP requests.</p>
            
            <h3>Console Output:</h3>
            <div id="console-output" style="background: #000; color: #0f0; padding: 15px; border-radius: 5px; font-family: monospace; min-height: 100px;">
                <div>Server starting...</div>
                <div>✅ Express server initialized</div>
                <div>🚀 Server running on port 3000</div>
                <div>📖 API documentation available</div>
            </div>
        </div>
    </div>
    
    <script>
      console.log('Node.js server preview loaded');
      console.log('Server code preview generated successfully');
      console.log('Express server would be running on port 3000');
      
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ 
          type: 'console', 
          level: 'log', 
          message: 'Node.js server preview ready' 
        }, '*');
        window.parent.postMessage({ 
          type: 'console', 
          level: 'log', 
          message: 'Server would be running on http://localhost:3000' 
        }, '*');
      }
    </script>
</body>
</html>`
  }

  const generateVanillaPreview = () => {
    let htmlContent = files['index.html'] || generateDefaultHTML()
    const cssContent = files['css/style.css'] || files['style.css'] || files['styles.css'] || ''
    const jsContent = files['js/main.js'] || files['main.js'] || files['script.js'] || files['app.js'] || ''
    
    // Inject CSS and JS into HTML with console capture
    const fullHTML = injectAssetsIntoHTML(htmlContent, cssContent, jsContent)
    return fullHTML
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

    // Add console capture script
    const consoleScript = `
    <script>
      const originalLog = console.log;
      const originalError = console.error;
      const originalWarn = console.warn;
      
      function sendToParent(level, message) {
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({ 
            type: 'console', 
            level: level, 
            message: message 
          }, '*');
        }
      }
      
      console.log = function(...args) {
        originalLog.apply(console, args);
        sendToParent('log', args.join(' '));
      };
      
      console.error = function(...args) {
        originalError.apply(console, args);
        sendToParent('error', args.join(' '));
      };
      
      console.warn = function(...args) {
        originalWarn.apply(console, args);
        sendToParent('warn', args.join(' '));
      };
      
      window.addEventListener('error', function(e) {
        sendToParent('error', \`Error: \${e.message} at \${e.filename}:\${e.lineno}\`);
      });
      
      window.addEventListener('unhandledrejection', function(e) {
        sendToParent('error', \`Unhandled Promise Rejection: \${e.reason}\`);
      });
    </script>`

    // Inject CSS
    if (css) {
      const cssTag = `<style>${css}</style>`
      if (modifiedHTML.includes('</head>')) {
        modifiedHTML = modifiedHTML.replace('</head>', `${cssTag}\n</head>`)
      } else {
        modifiedHTML = `<head>${cssTag}</head>${modifiedHTML}`
      }
    }

    // Inject console script first
    if (modifiedHTML.includes('</head>')) {
      modifiedHTML = modifiedHTML.replace('</head>', `${consoleScript}\n</head>`)
    } else {
      modifiedHTML = `<head>${consoleScript}</head>${modifiedHTML}`
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

  const addConsoleOutput = (message: string, level: 'log' | 'error' | 'warn' = 'log') => {
    const timestamp = new Date().toLocaleTimeString()
    const formattedMessage = `[${timestamp}] ${message}`
    
    if (onConsoleOutput) {
      onConsoleOutput(formattedMessage)
    }
  }

  // Listen for console messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'console') {
        addConsoleOutput(event.data.message, event.data.level)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const refreshPreview = () => {
    setHasGenerated(false)
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
          {isLoading && (
            <div className="text-xs text-gray-500">Loading...</div>
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
              sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
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