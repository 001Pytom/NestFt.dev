import { ProjectTemplate, TechStack } from '@/types/project';

export const beginnerProjects: ProjectTemplate[] = [
  {
    id: 'bg-1',
    name: 'Personal Portfolio Website',
    description: 'Create a responsive personal portfolio website showcasing your skills, projects, and contact information.',
    stack: 'frontend',
    difficulty: 'beginner',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    estimatedHours: 8,
    maxPoints: 100,
    requirements: [
      'Responsive design that works on mobile and desktop',
      'Navigation menu with smooth scrolling',
      'About section with personal information',
      'Skills section with progress bars or icons',
      'Projects section with at least 3 sample projects',
      'Contact form with validation',
      'Clean, modern design with consistent styling'
    ],
    gradingCriteria: [
      {
        id: 'bg-1-design',
        category: 'Design & UI',
        description: 'Visual appeal, layout, and user experience',
        maxPoints: 25,
        requirements: ['Clean design', 'Consistent styling', 'Good color scheme', 'Professional appearance']
      },
      {
        id: 'bg-1-responsive',
        category: 'Responsiveness',
        description: 'Mobile-first design and cross-device compatibility',
        maxPoints: 20,
        requirements: ['Mobile responsive', 'Tablet compatible', 'Desktop optimized']
      },
      {
        id: 'bg-1-functionality',
        category: 'Functionality',
        description: 'Working features and user interactions',
        maxPoints: 25,
        requirements: ['Working navigation', 'Form validation', 'Smooth scrolling', 'Interactive elements']
      },
      {
        id: 'bg-1-code',
        category: 'Code Quality',
        description: 'Clean, organized, and semantic code',
        maxPoints: 20,
        requirements: ['Semantic HTML', 'Organized CSS', 'Clean JavaScript', 'Proper file structure']
      },
      {
        id: 'bg-1-content',
        category: 'Content',
        description: 'Complete and relevant content',
        maxPoints: 10,
        requirements: ['All sections completed', 'Relevant content', 'Professional presentation']
      }
    ],
    folderStructure: {
      'index.html': '',
      'css': {
        'style.css': '',
        'responsive.css': ''
      },
      'js': {
        'main.js': ''
      },
      'images': {},
      'README.md': ''
    }
  },
  {
    id: 'bg-2',
    name: 'Weather App',
    description: 'Build a weather application that fetches current weather data and displays forecasts for different cities.',
    stack: 'frontend',
    difficulty: 'beginner',
    technologies: ['HTML', 'CSS', 'JavaScript', 'API'],
    estimatedHours: 10,
    maxPoints: 100,
    requirements: [
      'Search functionality for different cities',
      'Display current weather conditions',
      '5-day weather forecast',
      'Weather icons and visual indicators',
      'Error handling for invalid cities',
      'Loading states during API calls',
      'Responsive design'
    ],
    gradingCriteria: [
      {
        id: 'bg-2-api',
        category: 'API Integration',
        description: 'Proper API usage and data handling',
        maxPoints: 30,
        requirements: ['Successful API calls', 'Error handling', 'Data parsing', 'Loading states']
      },
      {
        id: 'bg-2-ui',
        category: 'User Interface',
        description: 'Intuitive and attractive interface',
        maxPoints: 25,
        requirements: ['Clean design', 'Weather icons', 'Readable typography', 'Good layout']
      },
      {
        id: 'bg-2-functionality',
        category: 'Functionality',
        description: 'Core features working correctly',
        maxPoints: 25,
        requirements: ['City search', 'Current weather', 'Forecast display', 'Error handling']
      },
      {
        id: 'bg-2-responsive',
        category: 'Responsiveness',
        description: 'Mobile and desktop compatibility',
        maxPoints: 20,
        requirements: ['Mobile responsive', 'Cross-browser compatible', 'Touch-friendly']
      }
    ],
    folderStructure: {
      'index.html': '',
      'css': {
        'style.css': ''
      },
      'js': {
        'app.js': '',
        'weather.js': ''
      },
      'images': {
        'icons': {}
      },
      'README.md': ''
    }
  },
  {
    id: 'bg-3',
    name: 'Todo List Application',
    description: 'Create a fully functional todo list with add, edit, delete, and filter capabilities.',
    stack: 'frontend',
    difficulty: 'beginner',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    estimatedHours: 6,
    maxPoints: 100,
    requirements: [
      'Add new todos with input validation',
      'Mark todos as complete/incomplete',
      'Edit existing todos',
      'Delete todos with confirmation',
      'Filter todos (all, active, completed)',
      'Local storage persistence',
      'Clean and intuitive interface'
    ],
    gradingCriteria: [
      {
        id: 'bg-3-crud',
        category: 'CRUD Operations',
        description: 'Create, read, update, delete functionality',
        maxPoints: 35,
        requirements: ['Add todos', 'Edit todos', 'Delete todos', 'Toggle completion']
      },
      {
        id: 'bg-3-persistence',
        category: 'Data Persistence',
        description: 'Local storage implementation',
        maxPoints: 20,
        requirements: ['Save to localStorage', 'Load from localStorage', 'Data integrity']
      },
      {
        id: 'bg-3-ui',
        category: 'User Interface',
        description: 'Intuitive and clean design',
        maxPoints: 25,
        requirements: ['Clean design', 'Intuitive controls', 'Visual feedback', 'Good UX']
      },
      {
        id: 'bg-3-features',
        category: 'Features',
        description: 'Additional functionality and filters',
        maxPoints: 20,
        requirements: ['Filter options', 'Input validation', 'Confirmation dialogs', 'Keyboard shortcuts']
      }
    ],
    folderStructure: {
      'index.html': '',
      'css': {
        'style.css': ''
      },
      'js': {
        'app.js': '',
        'storage.js': ''
      },
      'README.md': ''
    }
  },
  {
    id: 'bg-4',
    name: 'Calculator App',
    description: 'Build a functional calculator with basic arithmetic operations and memory functions.',
    stack: 'frontend',
    difficulty: 'beginner',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    estimatedHours: 5,
    maxPoints: 100,
    requirements: [
      'Basic arithmetic operations (+, -, *, /)',
      'Clear and all-clear functions',
      'Decimal point support',
      'Keyboard input support',
      'Error handling for division by zero',
      'Memory functions (M+, M-, MR, MC)',
      'Responsive button layout'
    ],
    gradingCriteria: [
      {
        id: 'bg-4-operations',
        category: 'Arithmetic Operations',
        description: 'Correct implementation of calculations',
        maxPoints: 40,
        requirements: ['Addition', 'Subtraction', 'Multiplication', 'Division', 'Decimal support']
      },
      {
        id: 'bg-4-ui',
        category: 'User Interface',
        description: 'Calculator design and layout',
        maxPoints: 25,
        requirements: ['Button layout', 'Display screen', 'Visual feedback', 'Professional appearance']
      },
      {
        id: 'bg-4-features',
        category: 'Advanced Features',
        description: 'Memory functions and keyboard support',
        maxPoints: 20,
        requirements: ['Memory functions', 'Keyboard input', 'Clear functions']
      },
      {
        id: 'bg-4-error',
        category: 'Error Handling',
        description: 'Proper error handling and edge cases',
        maxPoints: 15,
        requirements: ['Division by zero', 'Invalid operations', 'Input validation']
      }
    ],
    folderStructure: {
      'index.html': '',
      'css': { 
        'style.css': ''
      },
      'js': {
        'calculator.js': ''
      },
      'README.md': ''
    }
  },
  {
    id: 'bg-5',
    name: 'Image Gallery',
    description: 'Create an interactive image gallery with lightbox functionality and filtering options.',
    stack: 'frontend',
    difficulty: 'beginner',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    estimatedHours: 7,
    maxPoints: 100,
    requirements: [
      'Grid layout for image thumbnails',
      'L