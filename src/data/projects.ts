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
  // Continue with more beginner projects...
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
      'Lightbox modal for full-size images',
      'Navigation between images in lightbox',
      'Category filtering',
      'Search functionality',
      'Lazy loading for performance',
      'Responsive design'
    ],
    gradingCriteria: [
      {
        id: 'bg-5-layout',
        category: 'Layout & Design',
        description: 'Grid layout and visual presentation',
        maxPoints: 25,
        requirements: ['Grid layout', 'Responsive design', 'Visual appeal', 'Consistent spacing']
      },
      {
        id: 'bg-5-lightbox',
        category: 'Lightbox Functionality',
        description: 'Modal implementation and navigation',
        maxPoints: 30,
        requirements: ['Modal display', 'Image navigation', 'Close functionality', 'Keyboard controls']
      },
      {
        id: 'bg-5-filtering',
        category: 'Filtering & Search',
        description: 'Category and search functionality',
        maxPoints: 25,
        requirements: ['Category filters', 'Search functionality', 'Dynamic updates', 'Clear filters']
      },
      {
        id: 'bg-5-performance',
        category: 'Performance',
        description: 'Optimization and loading strategies',
        maxPoints: 20,
        requirements: ['Lazy loading', 'Image optimization', 'Smooth animations', 'Fast loading']
      }
    ],
    folderStructure: {
      'index.html': '',
      'css': {
        'style.css': '',
        'lightbox.css': ''
      },
      'js': {
        'gallery.js': '',
        'lightbox.js': ''
      },
      'images': {
        'thumbnails': {},
        'full': {}
      },
      'README.md': ''
    }
  }
  // Add 15 more beginner projects here...
];

export const intermediateProjects: ProjectTemplate[] = [
  {
    id: 'int-1',
    name: 'E-commerce Product Catalog',
    description: 'Build a complete e-commerce product catalog with shopping cart, user authentication, and payment integration.',
    stack: 'fullstack',
    difficulty: 'intermediate',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    estimatedHours: 25,
    maxPoints: 100,
    requirements: [
      'User registration and authentication',
      'Product listing with search and filters',
      'Shopping cart functionality',
      'Checkout process with payment integration',
      'Order history and tracking',
      'Admin panel for product management',
      'Responsive design with modern UI'
    ],
    gradingCriteria: [
      {
        id: 'int-1-auth',
        category: 'Authentication & Security',
        description: 'User authentication and security measures',
        maxPoints: 20,
        requirements: ['User registration', 'Login/logout', 'Password hashing', 'JWT tokens', 'Route protection']
      },
      {
        id: 'int-1-ecommerce',
        category: 'E-commerce Features',
        description: 'Core e-commerce functionality',
        maxPoints: 30,
        requirements: ['Product catalog', 'Shopping cart', 'Checkout process', 'Order management']
      },
      {
        id: 'int-1-backend',
        category: 'Backend Implementation',
        description: 'API design and database integration',
        maxPoints: 25,
        requirements: ['RESTful API', 'Database design', 'Error handling', 'Data validation']
      },
      {
        id: 'int-1-frontend',
        category: 'Frontend Implementation',
        description: 'React components and user interface',
        maxPoints: 25,
        requirements: ['Component structure', 'State management', 'Responsive design', 'User experience']
      }
    ],
    folderStructure: {
      'client': {
        'src': {
          'components': {},
          'pages': {},
          'hooks': {},
          'utils': {},
          'App.js': '',
          'index.js': ''
        },
        'public': {},
        'package.json': ''
      },
      'server': {
        'routes': {},
        'models': {},
        'middleware': {},
        'controllers': {},
        'config': {},
        'server.js': '',
        'package.json': ''
      },
      'README.md': ''
    }
  },
  {
    id: 'int-2',
    name: 'Real-time Chat Application',
    description: 'Create a real-time chat application with multiple rooms, private messaging, and file sharing.',
    stack: 'fullstack',
    difficulty: 'intermediate',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    estimatedHours: 20,
    maxPoints: 100,
    requirements: [
      'User authentication and profiles',
      'Real-time messaging with Socket.io',
      'Multiple chat rooms',
      'Private messaging',
      'File and image sharing',
      'Online user status',
      'Message history and search'
    ],
    gradingCriteria: [
      {
        id: 'int-2-realtime',
        category: 'Real-time Communication',
        description: 'Socket.io implementation and real-time features',
        maxPoints: 35,
        requirements: ['Real-time messaging', 'Room management', 'User status', 'Connection handling']
      },
      {
        id: 'int-2-features',
        category: 'Chat Features',
        description: 'Core chat functionality',
        maxPoints: 30,
        requirements: ['Multiple rooms', 'Private messaging', 'File sharing', 'Message history']
      },
      {
        id: 'int-2-ui',
        category: 'User Interface',
        description: 'Chat interface and user experience',
        maxPoints: 20,
        requirements: ['Intuitive design', 'Responsive layout', 'Message display', 'User interactions']
      },
      {
        id: 'int-2-backend',
        category: 'Backend Architecture',
        description: 'Server implementation and data management',
        maxPoints: 15,
        requirements: ['Socket management', 'Data persistence', 'Error handling', 'Performance']
      }
    ],
    folderStructure: {
      'client': {
        'src': {
          'components': {
            'Chat': {},
            'Room': {},
            'Message': {}
          },
          'pages': {},
          'hooks': {},
          'utils': {},
          'App.js': '',
          'index.js': ''
        },
        'package.json': ''
      },
      'server': {
        'routes': {},
        'models': {},
        'socket': {},
        'middleware': {},
        'server.js': '',
        'package.json': ''
      },
      'README.md': ''
    }
  }
  // Add 18 more intermediate projects here...
];

export const advancedProjects: ProjectTemplate[] = [
  {
    id: 'adv-1',
    name: 'Microservices E-learning Platform',
    description: 'Build a comprehensive e-learning platform using microservices architecture with video streaming, progress tracking, and AI-powered recommendations.',
    stack: 'fullstack',
    difficulty: 'advanced',
    technologies: ['React', 'Node.js', 'Docker', 'Kubernetes', 'Redis', 'PostgreSQL', 'AWS'],
    estimatedHours: 50,
    maxPoints: 100,
    requirements: [
      'Microservices architecture with Docker containers',
      'User service with advanced authentication',
      'Course service with video streaming',
      'Progress tracking and analytics service',
      'Payment service with subscription management',
      'AI recommendation engine',
      'Real-time notifications',
      'Admin dashboard with analytics',
      'Mobile-responsive design',
      'CI/CD pipeline setup'
    ],
    gradingCriteria: [
      {
        id: 'adv-1-architecture',
        category: 'System Architecture',
        description: 'Microservices design and implementation',
        maxPoints: 25,
        requirements: ['Service separation', 'API gateway', 'Service communication', 'Scalability design']
      },
      {
        id: 'adv-1-features',
        category: 'Platform Features',
        description: 'Core e-learning functionality',
        maxPoints: 25,
        requirements: ['Video streaming', 'Progress tracking', 'Course management', 'User management']
      },
      {
        id: 'adv-1-devops',
        category: 'DevOps & Deployment',
        description: 'Containerization and deployment',
        maxPoints: 20,
        requirements: ['Docker containers', 'Orchestration', 'CI/CD pipeline', 'Monitoring']
      },
      {
        id: 'adv-1-performance',
        category: 'Performance & Scalability',
        description: 'Optimization and scalability measures',
        maxPoints: 15,
        requirements: ['Caching strategy', 'Database optimization', 'Load balancing', 'Performance monitoring']
      },
      {
        id: 'adv-1-ai',
        category: 'AI Integration',
        description: 'Machine learning and AI features',
        maxPoints: 15,
        requirements: ['Recommendation engine', 'Content analysis', 'Personalization', 'Analytics']
      }
    ],
    folderStructure: {
      'services': {
        'user-service': {
          'src': {},
          'Dockerfile': '',
          'package.json': ''
        },
        'course-service': {
          'src': {},
          'Dockerfile': '',
          'package.json': ''
        },
        'payment-service': {
          'src': {},
          'Dockerfile': '',
          'package.json': ''
        },
        'notification-service': {
          'src': {},
          'Dockerfile': '',
          'package.json': ''
        }
      },
      'client': {
        'src': {},
        'Dockerfile': '',
        'package.json': ''
      },
      'api-gateway': {
        'src': {},
        'Dockerfile': '',
        'package.json': ''
      },
      'docker-compose.yml': '',
      'kubernetes': {},
      '.github': {
        'workflows': {}
      },
      'README.md': ''
    }
  }
  // Add 19 more advanced projects here...
];


// Backend Projects for Beginner Level
export const beginnerBackendProjects: ProjectTemplate[] = [
  {
    id: 'bg-be-1',
    name: 'Simple REST API',
    description: 'Build a basic REST API with CRUD operations for managing a simple resource like books or users.',
    stack: 'backend',
    difficulty: 'beginner',
    technologies: ['Node.js', 'Express', 'JSON'],
    estimatedHours: 10,
    maxPoints: 100,
    requirements: [
      'Create endpoints for GET, POST, PUT, DELETE operations',
      'Use in-memory storage (array) for data',
      'Implement proper HTTP status codes',
      'Add basic input validation',
      'Include error handling middleware',
      'Document API endpoints',
      'Test all endpoints manually'
    ],
    gradingCriteria: [
      {
        id: 'bg-be-1-endpoints',
        category: 'API Endpoints',
        description: 'Correct implementation of CRUD operations',
        maxPoints: 30,
        requirements: ['GET all items', 'GET single item', 'POST new item', 'PUT update item', 'DELETE item']
      },
      {
        id: 'bg-be-1-validation',
        category: 'Input Validation',
        description: 'Proper validation and error handling',
        maxPoints: 25,
        requirements: ['Input validation', 'Error responses', 'Status codes', 'Error middleware']
      },
      {
        id: 'bg-be-1-code',
        category: 'Code Quality',
        description: 'Clean, organized backend code',
        maxPoints: 25,
        requirements: ['Code organization', 'Proper routing', 'Middleware usage', 'Comments']
      },
      {
        id: 'bg-be-1-documentation',
        category: 'Documentation',
        description: 'API documentation and testing',
        maxPoints: 20,
        requirements: ['API documentation', 'Usage examples', 'Setup instructions', 'Testing evidence']
      }
    ],
    folderStructure: {
      'server.js': '',
      'routes': {
        'api.js': ''
      },
      'middleware': {
        'errorHandler.js': ''
      },
      'data': {
        'storage.js': ''
      },
      'package.json': '',
      'README.md': ''
    }
  },
  {
    id: 'bg-be-2',
    name: 'File Upload Service',
    description: 'Create a simple file upload service that accepts files and stores them with metadata.',
    stack: 'backend',
    difficulty: 'beginner',
    technologies: ['Node.js', 'Express', 'Multer'],
    estimatedHours: 8,
    maxPoints: 100,
    requirements: [
      'Accept file uploads via POST endpoint',
      'Validate file types and sizes',
      'Store files in uploads directory',
      'Return file metadata and download URL',
      'Implement file listing endpoint',
      'Add file deletion capability',
      'Include basic security measures'
    ],
    gradingCriteria: [
      {
        id: 'bg-be-2-upload',
        category: 'File Upload',
        description: 'File upload functionality',
        maxPoints: 35,
        requirements: ['File upload endpoint', 'File storage', 'Metadata handling', 'Response format']
      },
      {
        id: 'bg-be-2-validation',
        category: 'Validation & Security',
        description: 'File validation and security measures',
        maxPoints: 30,
        requirements: ['File type validation', 'Size limits', 'Security checks', 'Error handling']
      },
      {
        id: 'bg-be-2-management',
        category: 'File Management',
        description: 'File listing and deletion',
        maxPoints: 20,
        requirements: ['List files endpoint', 'Delete files', 'File serving', 'Directory management']
      },
      {
        id: 'bg-be-2-implementation',
        category: 'Implementation',
        description: 'Code quality and structure',
        maxPoints: 15,
        requirements: ['Code organization', 'Error handling', 'Documentation', 'Testing']
      }
    ],
    folderStructure: {
      'server.js': '',
      'routes': {
        'upload.js': ''
      },
      'middleware': {
        'upload.js': '',
        'validation.js': ''
      },
      'uploads': {},
      'utils': {
        'fileHelper.js': ''
      },
      'package.json': '',
      'README.md': ''
    }
  }
  // Add 18 more beginner backend projects...
];

// Intermediate Backend Projects
export const intermediateBackendProjects: ProjectTemplate[] = [
  {
    id: 'int-be-1',
    name: 'User Authentication API',
    description: 'Build a complete authentication system with JWT tokens, password hashing, and user management.',
    stack: 'backend',
    difficulty: 'intermediate',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'bcrypt'],
    estimatedHours: 20,
    maxPoints: 100,
    requirements: [
      'User registration with email validation',
      'Secure password hashing with bcrypt',
      'JWT token-based authentication',
      'Login and logout functionality',
      'Protected routes middleware',
      'Password reset functionality',
      'User profile management',
      'Rate limiting for security'
    ],
    gradingCriteria: [
      {
        id: 'int-be-1-auth',
        category: 'Authentication System',
        description: 'Complete authentication implementation',
        maxPoints: 40,
        requirements: ['User registration', 'Login system', 'JWT implementation', 'Password hashing']
      },
      {
        id: 'int-be-1-security',
        category: 'Security Measures',
        description: 'Security best practices',
        maxPoints: 30,
        requirements: ['Password security', 'Rate limiting', 'Input validation', 'Error handling']
      },
      {
        id: 'int-be-1-features',
        category: 'Advanced Features',
        description: 'Additional authentication features',
        maxPoints: 20,
        requirements: ['Password reset', 'Profile management', 'Protected routes', 'Token refresh']
      },
      {
        id: 'int-be-1-database',
        category: 'Database Integration',
        description: 'Database design and operations',
        maxPoints: 10,
        requirements: ['User schema', 'Database operations', 'Data validation', 'Indexing']
      }
    ],
    folderStructure: {
      'server.js': '',
      'routes': {
        'auth.js': '',
        'users.js': ''
      },
      'models': {
        'User.js': ''
      },
      'middleware': {
        'auth.js': '',
        'validation.js': '',
        'rateLimiter.js': ''
      },
      'controllers': {
        'authController.js': '',
        'userController.js': ''
      },
      'utils': {
        'jwt.js': '',
        'email.js': ''
      },
      'config': {
        'database.js': ''
      },
      'package.json': '',
      'README.md': ''
    }
  }
  // Add 19 more intermediate backend projects...
];

// Advanced Backend Projects
export const advancedBackendProjects: ProjectTemplate[] = [
  {
    id: 'adv-be-1',
    name: 'Microservices E-commerce Backend',
    description: 'Build a microservices-based e-commerce backend with user service, product service, order service, and payment service.',
    stack: 'backend',
    difficulty: 'advanced',
    technologies: ['Node.js', 'Express', 'MongoDB', 'Redis', 'Docker', 'RabbitMQ'],
    estimatedHours: 40,
    maxPoints: 100,
    requirements: [
      'Separate microservices for users, products, orders, and payments',
      'Service-to-service communication via REST and message queues',
      'Centralized authentication service',
      'Database per service pattern',
      'API Gateway for request routing',
      'Caching layer with Redis',
      'Event-driven architecture',
      'Docker containerization',
      'Service discovery and health checks',
      'Comprehensive logging and monitoring'
    ],
    gradingCriteria: [
      {
        id: 'adv-be-1-architecture',
        category: 'Microservices Architecture',
        description: 'Service separation and communication',
        maxPoints: 30,
        requirements: ['Service separation', 'API Gateway', 'Service communication', 'Data consistency']
      },
      {
        id: 'adv-be-1-implementation',
        category: 'Service Implementation',
        description: 'Individual service functionality',
        maxPoints: 25,
        requirements: ['User service', 'Product service', 'Order service', 'Payment service']
      },
      {
        id: 'adv-be-1-infrastructure',
        category: 'Infrastructure & DevOps',
        description: 'Containerization and deployment',
        maxPoints: 25,
        requirements: ['Docker containers', 'Service orchestration', 'Health checks', 'Monitoring']
      },
      {
        id: 'adv-be-1-performance',
        category: 'Performance & Scalability',
        description: 'Caching, queuing, and optimization',
        maxPoints: 20,
        requirements: ['Redis caching', 'Message queues', 'Load balancing', 'Performance optimization']
      }
    ],
    folderStructure: {
      'services': {
        'user-service': {
          'src': {},
          'Dockerfile': '',
          'package.json': ''
        },
        'product-service': {
          'src': {},
          'Dockerfile': '',
          'package.json': ''
        },
        'order-service': {
          'src': {},
          'Dockerfile': '',
          'package.json': ''
        },
        'payment-service': {
          'src': {},
          'Dockerfile': '',
          'package.json': ''
        }
      },
      'api-gateway': {
        'src': {},
        'Dockerfile': '',
        'package.json': ''
      },
      'docker-compose.yml': '',
      'README.md': ''
    }
  }
  // Add 19 more advanced backend projects...
];

export const techStacks: TechStack[] = [
  {
    id: 'frontend',
    name: 'Frontend Development',
    description: 'Build user interfaces and client-side applications',
    icon: '🎨',
    templates: [
      {
        id: 'html-css-js',
        name: 'HTML/CSS/JavaScript',
        description: 'Vanilla web development with core technologies',
        language: 'JavaScript',
        folderStructure: {
          'index.html': '',
          'css': {
            'style.css': ''
          },
          'js': {
            'main.js': ''
          },
          'images': {},
          'README.md': ''
        },
        dependencies: [],
        startCommand: 'Open index.html in browser'
      },
      {
        id: 'react',
        name: 'React',
        description: 'Modern React application with hooks and components',
        language: 'JavaScript',
        framework: 'React',
        folderStructure: {
          'src': {
            'components': {},
            'pages': {},
            'hooks': {},
            'utils': {},
            'App.js': '',
            'index.js': ''
          },
          'public': {
            'index.html': ''
          },
          'package.json': '',
          'README.md': ''
        },
        dependencies: ['react', 'react-dom', 'react-scripts'],
        startCommand: 'npm start'
      },
      {
        id: 'nextjs',
        name: 'Next.js',
        description: 'Full-stack React framework with SSR and API routes',
        language: 'JavaScript',
        framework: 'Next.js',
        folderStructure: {
          'pages': {
            'api': {},
            'index.js': '',
            '_app.js': ''
          },
          'components': {},
          'styles': {
            'globals.css': ''
          },
          'public': {},
          'package.json': '',
          'README.md': ''
        },
        dependencies: ['next', 'react', 'react-dom'],
        startCommand: 'npm run dev'
      },
      {
        id: 'vue',
        name: 'Vue.js',
        description: 'Progressive Vue.js application',
        language: 'JavaScript',
        framework: 'Vue.js',
        folderStructure: {
          'src': {
            'components': {},
            'views': {},
            'router': {},
            'store': {},
            'App.vue': '',
            'main.js': ''
          },
          'public': {
            'index.html': ''
          },
          'package.json': '',
          'README.md': ''
        },
        dependencies: ['vue', '@vue/cli-service'],
        startCommand: 'npm run serve'
      }
    ]
  },
  {
    id: 'backend',
    name: 'Backend Development',
    description: 'Build server-side applications and APIs',
    icon: '⚙️',
    templates: [
      {
        id: 'nodejs-express',
        name: 'Node.js + Express',
        description: 'RESTful API with Express.js framework',
        language: 'JavaScript',
        framework: 'Express.js',
        folderStructure: {
          'src': {
            'routes': {},
            'controllers': {},
            'models': {},
            'middleware': {},
            'config': {},
            'utils': {}
          },
          'server.js': '',
          'package.json': '',
          'README.md': ''
        },
        dependencies: ['express', 'cors', 'dotenv', 'helmet'],
        startCommand: 'npm start'
      },
      {
        id: 'python-flask',
        name: 'Python + Flask',
        description: 'Lightweight Python web framework',
        language: 'Python',
        framework: 'Flask',
        folderStructure: {
          'app': {
            'routes': {},
            'models': {},
            'utils': {},
            '__init__.py': ''
          },
          'config.py': '',
          'run.py': '',
          'requirements.txt': '',
          'README.md': ''
        },
        dependencies: ['Flask', 'Flask-CORS', 'python-dotenv'],
        startCommand: 'python run.py'
      },
      {
        id: 'python-django',
        name: 'Python + Django',
        description: 'Full-featured Python web framework',
        language: 'Python',
        framework: 'Django',
        folderStructure: {
          'project': {
            'settings.py': '',
            'urls.py': '',
            'wsgi.py': ''
          },
          'apps': {},
          'static': {},
          'templates': {},
          'manage.py': '',
          'requirements.txt': '',
          'README.md': ''
        },
        dependencies: ['Django', 'djangorestframework', 'django-cors-headers'],
        startCommand: 'python manage.py runserver'
      },
      {
        id: 'nodejs-fastify',
        name: 'Node.js + Fastify',
        description: 'Fast and low overhead web framework',
        language: 'JavaScript',
        framework: 'Fastify',
        folderStructure: {
          'src': {
            'routes': {},
            'plugins': {},
            'schemas': {},
            'services': {}
          },
          'server.js': '',
          'package.json': '',
          'README.md': ''
        },
        dependencies: ['fastify', '@fastify/cors', '@fastify/helmet'],
        startCommand: 'npm start'
      }
    ]
  },
  {
    id: 'fullstack',
    name: 'Full-Stack Development',
    description: 'Complete web applications with frontend and backend',
    icon: '🚀',
    templates: [
      {
        id: 'mern',
        name: 'MERN Stack',
        description: 'MongoDB, Express, React, Node.js',
        language: 'JavaScript',
        framework: 'MERN',
        folderStructure: {
          'client': {
            'src': {
              'components': {},
              'pages': {},
              'hooks': {},
              'utils': {}
            },
            'public': {},
            'package.json': ''
          },
          'server': {
            'routes': {},
            'models': {},
            'middleware': {},
            'controllers': {},
            'config': {},
            'server.js': '',
            'package.json': ''
          },
          'README.md': ''
        },
        dependencies: ['react', 'express', 'mongoose', 'cors'],
        startCommand: 'npm run dev'
      },
      {
        id: 'mean',
        name: 'MEAN Stack',
        description: 'MongoDB, Express, Angular, Node.js',
        language: 'TypeScript',
        framework: 'MEAN',
        folderStructure: {
          'client': {
            'src': {
              'app': {
                'components': {},
                'services': {},
                'models': {}
              }
            },
            'angular.json': '',
            'package.json': ''
          },
          'server': {
            'routes': {},
            'models': {},
            'middleware': {},
            'server.js': '',
            'package.json': ''
          },
          'README.md': ''
        },
        dependencies: ['@angular/core', 'express', 'mongoose'],
        startCommand: 'npm run dev'
      },
      {
        id: 'nextjs-fullstack',
        name: 'Next.js Full-Stack',
        description: 'Next.js with API routes and database',
        language: 'JavaScript',
        framework: 'Next.js',
        folderStructure: {
          'pages': {
            'api': {},
            'index.js': '',
            '_app.js': ''
          },
          'components': {},
          'lib': {
            'database.js': '',
            'auth.js': ''
          },
          'styles': {},
          'public': {},
          'package.json': '',
          'README.md': ''
        },
        dependencies: ['next', 'react', 'react-dom', 'mongoose'],
        startCommand: 'npm run dev'
      }
    ]
  }
];

// Combine all projects by stack
export const allProjects = {
  frontend: {
    beginner: beginnerProjects.filter(p => p.stack === 'frontend'),
    intermediate: intermediateProjects.filter(p => p.stack === 'frontend'),
    advanced: advancedProjects.filter(p => p.stack === 'frontend')
  },
  backend: {
    beginner: beginnerBackendProjects,
    intermediate: intermediateBackendProjects,
    advanced: advancedBackendProjects
  },
  fullstack: {
    beginner: beginnerProjects.filter(p => p.stack === 'fullstack'),
    intermediate: intermediateProjects.filter(p => p.stack === 'fullstack'),
    advanced: advancedProjects.filter(p => p.stack === 'fullstack')
  }
};