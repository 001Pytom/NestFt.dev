// File templates for different technologies and frameworks

export const getFileContent = (fileName: string, template: any, projectName: string): string => {
  const templateId = template.id;
  
  switch (templateId) {
    case 'html-css-js':
      return getVanillaFileContent(fileName, projectName);
    case 'react':
      return getReactFileContent(fileName, projectName);
    case 'nextjs':
      return getNextJSFileContent(fileName, projectName);
    case 'vue':
      return getVueFileContent(fileName, projectName);
    case 'nodejs-express':
      return getNodeExpressFileContent(fileName, projectName);
    case 'python-flask':
      return getPythonFlaskFileContent(fileName, projectName);
    case 'python-django':
      return getPythonDjangoFileContent(fileName, projectName);
    case 'mern':
      return getMERNFileContent(fileName, projectName);
    default:
      return getDefaultFileContent(fileName, projectName);
  }
};

// Vanilla HTML/CSS/JS Templates
const getVanillaFileContent = (fileName: string, projectName: string): string => {
  switch (fileName) {
    case 'index.html':
      return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName}</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <nav>
            <div class="logo">
                <h1>${projectName}</h1>
            </div>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="home" class="hero">
            <div class="hero-content">
                <h2>Welcome to ${projectName}</h2>
                <p>Start building your amazing project here!</p>
                <button class="cta-button">Get Started</button>
            </div>
        </section>

        <section id="about" class="about">
            <div class="container">
                <h2>About</h2>
                <p>This is where you describe your project or yourself.</p>
            </div>
        </section>

        <section id="projects" class="projects">
            <div class="container">
                <h2>Projects</h2>
                <div class="project-grid">
                    <!-- Add your projects here -->
                </div>
            </div>
        </section>

        <section id="contact" class="contact">
            <div class="container">
                <h2>Contact</h2>
                <form class="contact-form">
                    <input type="text" placeholder="Your Name" required>
                    <input type="email" placeholder="Your Email" required>
                    <textarea placeholder="Your Message" required></textarea>
                    <button type="submit">Send Message</button>
                </form>
            </div>
        </section>
    </main>

    <footer>
        <p>&copy; 2025 ${projectName}. All rights reserved.</p>
    </footer>

    <script src="js/main.js"></script>
</body>
</html>`;

    case 'css/style.css':
      return `/* ${projectName} Styles */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Header Styles */
header {
    background: #fff;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
}

.logo h1 {
    color: #007bff;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-links a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    transition: color 0.3s ease;
}

.nav-links a:hover {
    color: #007bff;
}

/* Hero Section */
.hero {
    background: linear-gradient(135deg, #007bff, #0056b3);
    color: white;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.hero-content h2 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.hero-content p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
}

.cta-button {
    background: #fff;
    color: #007bff;
    padding: 12px 30px;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.cta-button:hover {
    transform: translateY(-2px);
}

/* Section Styles */
section {
    padding: 4rem 0;
}

.about, .projects, .contact {
    background: #f8f9fa;
}

.about:nth-child(even) {
    background: white;
}

h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    color: #333;
}

/* Contact Form */
.contact-form {
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.contact-form input,
.contact-form textarea {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
}

.contact-form textarea {
    min-height: 120px;
    resize: vertical;
}

.contact-form button {
    background: #007bff;
    color: white;
    padding: 12px;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background 0.3s ease;
}

.contact-form button:hover {
    background: #0056b3;
}

/* Footer */
footer {
    background: #333;
    color: white;
    text-align: center;
    padding: 2rem 0;
}

/* Responsive Design */
@media (max-width: 768px) {
    .nav-links {
        flex-direction: column;
        gap: 1rem;
    }
    
    .hero-content h2 {
        font-size: 2rem;
    }
    
    nav {
        flex-direction: column;
        gap: 1rem;
    }
}`;

    case 'js/main.js':
      return `// ${projectName} JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('${projectName} loaded successfully!');
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Simulate form submission
            alert('Thank you for your message! We\\'ll get back to you soon.');
            this.reset();
        });
    }
    
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.background = '#fff';
        }
    });
    
    // CTA Button interaction
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            document.querySelector('#about').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});

// Utility functions
function validateEmail(email) {
    const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return re.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = \`notification \${type}\`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = \`
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: \${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        border-radius: 5px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    \`;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}`;

    default:
      return '';
  }
};

// React Templates
const getReactFileContent = (fileName: string, projectName: string): string => {
  switch (fileName) {
    case 'src/App.js':
      return `import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>${projectName}</h1>
        <p>Welcome to your React application!</p>
        
        <div className="counter-section">
          <h2>Counter: {count}</h2>
          <div className="button-group">
            <button onClick={() => setCount(count - 1)}>-</button>
            <button onClick={() => setCount(0)}>Reset</button>
            <button onClick={() => setCount(count + 1)}>+</button>
          </div>
        </div>
        
        <div className="info-section">
          <p>Edit <code>src/App.js</code> and save to reload.</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </div>
      </header>
    </div>
  );
}

export default App;`;

    case 'src/index.js':
      return `import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`;

    case 'src/App.css':
      return `.App {
  text-align: center;
}

.App-header {
  background-color: #282c34;
  padding: 20px;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
}

.App-link {
  color: #61dafb;
}

.counter-section {
  margin: 2rem 0;
}

.counter-section h2 {
  margin-bottom: 1rem;
  font-size: 2rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.button-group button {
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  background-color: #61dafb;
  color: #282c34;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button-group button:hover {
  background-color: #21a0c4;
}

.info-section {
  margin-top: 2rem;
  font-size: 1rem;
}

.info-section p {
  margin-bottom: 1rem;
}`;

    case 'src/index.css':
      return `body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

* {
  box-sizing: border-box;
}`;

    case 'public/index.html':
      return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="${projectName} - React Application" />
    <title>${projectName}</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>`;

    case 'package.json':
      return `{
  "name": "${projectName.toLowerCase().replace(/\\s+/g, '-')}",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}`;

    default:
      return '';
  }
};

// Node.js Express Templates
const getNodeExpressFileContent = (fileName: string, projectName: string): string => {
  switch (fileName) {
    case 'server.js':
      return `const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to ${projectName} API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
app.use('/api', require('./src/routes/api'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
});

app.listen(PORT, () => {
  console.log(\`🚀 ${projectName} server running on port \${PORT}\`);
  console.log(\`📖 API documentation: http://localhost:\${PORT}\`);
});`;

    case 'src/routes/api.js':
      return `const express = require('express');
const router = express.Router();

// Sample data (replace with database)
let items = [
  { id: 1, name: 'Sample Item 1', description: 'This is a sample item' },
  { id: 2, name: 'Sample Item 2', description: 'This is another sample item' }
];

// GET all items
router.get('/items', (req, res) => {
  res.json({
    success: true,
    data: items,
    count: items.length
  });
});

// GET single item
router.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(item => item.id === id);
  
  if (!item) {
    return res.status(404).json({
      success: false,
      error: 'Item not found'
    });
  }
  
  res.json({
    success: true,
    data: item
  });
});

// POST new item
router.post('/items', (req, res) => {
  const { name, description } = req.body;
  
  if (!name) {
    return res.status(400).json({
      success: false,
      error: 'Name is required'
    });
  }
  
  const newItem = {
    id: items.length + 1,
    name,
    description: description || ''
  };
  
  items.push(newItem);
  
  res.status(201).json({
    success: true,
    data: newItem
  });
});

// PUT update item
router.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Item not found'
    });
  }
  
  const { name, description } = req.body;
  
  if (name) items[itemIndex].name = name;
  if (description !== undefined) items[itemIndex].description = description;
  
  res.json({
    success: true,
    data: items[itemIndex]
  });
});

// DELETE item
router.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Item not found'
    });
  }
  
  items.splice(itemIndex, 1);
  
  res.json({
    success: true,
    message: 'Item deleted successfully'
  });
});

module.exports = router;`;

    case 'package.json':
      return `{
  "name": "${projectName.toLowerCase().replace(/\\s+/g, '-')}",
  "version": "1.0.0",
  "description": "${projectName} - Node.js Express API",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  },
  "keywords": ["nodejs", "express", "api"],
  "author": "",
  "license": "MIT"
}`;

    default:
      return '';
  }
};

// Default file content
const getDefaultFileContent = (fileName: string, projectName: string): string => {
  if (fileName === 'README.md') {
    return `# ${projectName}

## Description
This project was created using the NestFt.dev platform.

## Getting Started

### Prerequisites
- Node.js (if applicable)
- npm or yarn (if applicable)

### Installation
1. Clone the repository
2. Install dependencies (if applicable)
3. Start the development server

### Usage
Describe how to use your project here.

## Features
- List your project features here

## Technologies Used
- List the technologies used in this project

## Contributing
1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License
This project is licensed under the MIT License.
`;
  }

  return `// ${projectName}
// File: ${fileName}

console.log('Welcome to ${projectName}!');
`;
};

// Export other template functions
export { getVanillaFileContent, getReactFileContent, getNodeExpressFileContent };