import { Project } from '@/types'

// Backend Projects - Beginner Level (20 projects)
export const backendBeginnerProjects: Project[] = [
  {
    id: 'backend-beginner-1',
    title: 'Simple REST API with Express',
    description: 'Build a basic REST API using Express.js with CRUD operations for managing a simple resource like books or users.',
    difficulty: 'Easy',
    technologies: ['Node.js', 'Express'],
    requirements: [
      'Create GET, POST, PUT, DELETE endpoints',
      'Use in-memory data storage (arrays)',
      'Implement basic error handling',
      'Add request validation'
    ],
    thumbnail: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg',
    completed_by: 245,
    estimated_hours: 4
  },
  {
    id: 'backend-beginner-2',
    title: 'File Upload Service',
    description: 'Create a simple file upload service that accepts files and stores them on the server with basic metadata.',
    difficulty: 'Easy',
    technologies: ['Node.js', 'Express', 'Multer'],
    requirements: [
      'Accept file uploads via POST endpoint',
      'Validate file types and sizes',
      'Store files in designated folder',
      'Return file metadata and download URL'
    ],
    thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg',
    completed_by: 189,
    estimated_hours: 3
  },
  {
    id: 'backend-beginner-3',
    title: 'JSON Data Validator API',
    description: 'Build an API that validates JSON data against predefined schemas and returns validation results.',
    difficulty: 'Easy',
    technologies: ['Node.js', 'Express', 'Joi'],
    requirements: [
      'Create validation schemas for different data types',
      'Validate incoming JSON against schemas',
      'Return detailed validation errors',
      'Support multiple validation rules'
    ],
    thumbnail: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg',
    completed_by: 167,
    estimated_hours: 5
  },
  {
    id: 'backend-beginner-4',
    title: 'Simple Authentication API',
    description: 'Create a basic authentication system with user registration, login, and JWT token generation.',
    difficulty: 'Easy',
    technologies: ['Node.js', 'Express', 'JWT'],
    requirements: [
      'User registration endpoint',
      'User login with password verification',
      'Generate and return JWT tokens',
      'Protected route middleware'
    ],
    thumbnail: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg',
    completed_by: 298,
    estimated_hours: 6
  },
  {
    id: 'backend-beginner-5',
    title: 'URL Shortener Service',
    description: 'Build a URL shortening service that creates short aliases for long URLs and tracks click statistics.',
    difficulty: 'Easy',
    technologies: ['Node.js', 'Express'],
    requirements: [
      'Shorten long URLs to unique short codes',
      'Redirect short URLs to original URLs',
      'Track click counts and timestamps',
      'List all shortened URLs for a session'
    ],
    thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
    completed_by: 234,
    estimated_hours: 4
  },
  {
    id: 'backend-beginner-6',
    title: 'Simple Email Sender API',
    description: 'Create an API that sends emails using a service like Nodemailer with basic templating support.',
    difficulty: 'Easy',
    technologies: ['Node.js', 'Express', 'Nodemailer'],
    requirements: [
      'Send plain text and HTML emails',
      'Support email templates',
      'Validate email addresses',
      'Handle email sending errors gracefully'
    ],
    thumbnail: 'https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg',
    completed_by: 156,
    estimated_hours: 4
  },
  {
    id: 'backend-beginner-7',
    title: 'Basic Todo API',
    description: 'Build a simple Todo API with CRUD operations and basic filtering capabilities.',
    difficulty: 'Easy',
    technologies: ['Node.js', 'Express'],
    requirements: [
      'Create, read, update, delete todos',
      'Mark todos as complete/incomplete',
      'Filter todos by status',
      'Add due dates to todos'
    ],
    thumbnail: 'https://images.pexels.com/photos/3243/pen-calendar-to-do-checklist.jpg',
    completed_by: 312,
    estimated_hours: 3
  },
  {
    id: 'backend-beginner-8',
    title: 'Weather Data Aggregator',
    description: 'Create an API that fetches weather data from external APIs and provides a unified response format.',
    difficulty: 'Easy',
    technologies: ['Node.js', 'Express', 'APIs'],
    requirements: [
      'Fetch data from weather API',
      'Cache responses for performance',
      'Format data consistently',
      'Handle API rate limits and errors'
    ],
    thumbnail: 'https://images.pexels.com/photos/2448749/pexels-photo-2448749.jpeg',
    completed_by: 178,
    estimated_hours: 5
  },
  {
    id: 'backend-beginner-9',
    title: 'Simple Logging Service',
    description: 'Build a logging service that accepts log entries via API and stores them with timestamps and levels.',
    difficulty: 'Easy',
    technologies: ['Node.js', 'Express'],
    requirements: [
      'Accept log entries with different levels',
      'Store logs with timestamps',
      'Retrieve logs by date range',
      'Filter logs by level (info, warn, error)'
    ],
    thumbnail: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
    completed_by: 143,
    estimated_hours: 4
  },
  {
    id: 'backend-beginner-10',
    title: 'Basic Rate Limiter',
    description: 'Create a rate limiting middleware that restricts API requests based on IP address and time windows.',
    difficulty: 'Easy',
    technologies: ['Node.js', 'Express'],
    requirements: [
      'Track requests per IP address',
      'Implement sliding window rate limiting',
      'Return appropriate HTTP status codes',
      'Configure different limits for different endpoints'
    ],
    thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
    completed_by: 167,
    estimated_hours: 5
  },
  {
    id: 'backend-beginner-11',
    title: 'Simple Contact Form API',
    description: 'Build an API that handles contact form submissions and sends notification emails.',
    difficulty: 'Easy',
    technologies: ['Node.js', 'Express', 'Nodemailer'],
    requirements: [
      'Accept contact form data',
      'Validate form fields',
      'Send notification emails',
      'Store submissions for review'
    ],
    thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg',
    completed_by: 201,
    estimated_hours: 4
  },
  {
    id: 'backend-beginner-12',
    title: 'Basic Image Resizer API',
    description: 'Create an API that accepts image uploads and returns resized versions in different dimensions.',
    difficulty: 'Easy',
    technologies: ['Node.js', 'Express', 'Sharp'],
    requirements: [
      'Accept image file uploads',
      'Resize images to specified dimensions',
      'Support multiple image formats',
      'Return resized images or URLs'
    ],
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    completed_by: 134,
    estimated_hours: 5
  },
  {
    id: 'backend-beginner-13',
    title: 'Simple Password Generator API',
    description: 'Build an API that generates secure passwords based on specified criteria and complexity rules.',
    difficulty: 'Easy',
    technologies: ['Node.js', 'Express'],
    requirements: [
      'Generate passwords with custom length',
      'Include/exclude character types',
      'Check password strength',
      'Return multiple password options'
    ],
    thumbnail: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg',
    completed_by: 189,
    estimated_hours: 3
  },
  {
    id: 'backend-beginner-14',
    title: 'Basic QR Code Generator',
    description: 'Create an API that generates QR codes for text, URLs, and other data types.',
    difficulty: 'Easy',
    technologies: ['Node.js', 'Express', 'QRCode'],
    requirements: [
      'Generate QR codes for text and URLs',
      'Support different QR code sizes',
      'Return QR codes as images or data URLs',
      'Customize QR code colors and styles'
    ],
    thumbnail: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg',
    completed_by: 156,
    estimated_hours: 3
  },
  {
    id: 'backend-beginner-15',
    title: 'Simple Text Processing API',
    description: 'Build an API that performs various text processing operations like word count, character analysis, and formatting.',
    difficulty: 'Easy',
    technologies: ['Node.js', 'Express'],
    requirements: [
      'Count words, characters, and paragraphs',
      'Convert text case (upper, lower, title)',
      'Remove extra whitespace and formatting',
      'Extract keywords and basic statistics'
    ],
    thumbnail: 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg',
    completed_by: 167,
    estimated_hours: 4
  },
  {
    id: 'backend-beginner-16',
    title: 'Basic Currency Converter API',
    description: 'Create an API that converts between different currencies using external exchange rate APIs.',
    difficulty: 'Easy',
    technologies: ['Node.js', 'Express', 'APIs'],
    requirements: [
      'Fetch current exchange rates',
      'Convert between currency pairs',
      'Cache exchange rates',
      'Support historical rate queries'
    ],
    thumbnail: 'https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg',
    completed_by: 145,
    estimated_hours: 4
  },
  {
    id: 'backend-beginner-17',
    title: 'Simple News Aggregator API',
    description: 'Build an API that fetches news from multiple sources and provides a unified news feed.',
    difficulty: 'Easy',
    technologies: ['Node.js', 'Express', 'APIs'],
    requirements: [
      'Fetch news from multiple RSS feeds',
      'Parse and normalize news data',
      'Filter news by category or keyword',
      'Cache news articles for performance'
    ],
    thumbnail: 'https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg',
    completed_by: 123,
    estimated_hours: 5
  },
  {
    id: 'backend-beginner-18',
    title: 'Basic Health Check API',
    description: 'Create a comprehensive health check API that monitors system status and external dependencies.',
    difficulty: 'Easy',
    technologies: ['Node.js', 'Express'],
    requirements: [
      'Check server health and uptime',
      'Monitor memory and CPU usage',
      'Test external service connectivity',
      'Return detailed health status reports'
    ],
    thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
    completed_by: 178,
    estimated_hours: 4
  },
  {
    id: 'backend-beginner-19',
    title: 'Simple Webhook Receiver',
    description: 'Build an API that receives webhooks from external services and processes the incoming data.',
    difficulty: 'Easy',
    technologies: ['Node.js', 'Express'],
    requirements: [
      'Receive webhook POST requests',
      'Validate webhook signatures',
      'Log webhook events',
      'Process webhook data and trigger actions'
    ],
    thumbnail: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
    completed_by: 134,
    estimated_hours: 4
  },
  {
    id: 'backend-beginner-20',
    title: 'Basic API Documentation Generator',
    description: 'Create a tool that automatically generates API documentation from route definitions and comments.',
    difficulty: 'Easy',
    technologies: ['Node.js', 'Express', 'Swagger'],
    requirements: [
      'Parse route definitions automatically',
      'Generate OpenAPI/Swagger documentation',
      'Serve interactive API documentation',
      'Include request/response examples'
    ],
    thumbnail: 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg',
    completed_by: 112,
    estimated_hours: 6
  }
]

// Fullstack Projects - Beginner Level (20 projects)
export const fullstackBeginnerProjects: Project[] = [
  {
    id: 'fullstack-beginner-1',
    title: 'Personal Portfolio Website',
    description: 'Build a responsive portfolio website with a backend API to manage projects and contact form submissions.',
    difficulty: 'Easy',
    technologies: ['HTML/CSS', 'JavaScript', 'Node.js', 'Express'],
    requirements: [
      'Responsive design with modern CSS',
      'Backend API for contact form',
      'Project showcase with admin panel',
      'Basic SEO optimization'
    ],
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    completed_by: 289,
    estimated_hours: 8
  },
  {
    id: 'fullstack-beginner-2',
    title: 'Simple Blog Platform',
    description: 'Create a basic blog platform where users can read posts and admins can create, edit, and delete articles.',
    difficulty: 'Easy',
    technologies: ['HTML/CSS', 'JavaScript', 'Node.js', 'Express'],
    requirements: [
      'Public blog post listing and reading',
      'Admin authentication system',
      'CRUD operations for blog posts',
      'Rich text editor for content creation'
    ],
    thumbnail: 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg',
    completed_by: 234,
    estimated_hours: 10
  },
  {
    id: 'fullstack-beginner-3',
    title: 'Recipe Sharing App',
    description: 'Build a recipe sharing application where users can browse, search, and submit their favorite recipes.',
    difficulty: 'Easy',
    technologies: ['HTML/CSS', 'JavaScript', 'Node.js', 'Express'],
    requirements: [
      'Recipe browsing and search functionality',
      'User recipe submission form',
      'Recipe categorization and filtering',
      'Image upload for recipe photos'
    ],
    thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    completed_by: 198,
    estimated_hours: 9
  },
  {
    id: 'fullstack-beginner-4',
    title: 'Simple Event Calendar',
    description: 'Create an event calendar application where users can view, create, and manage events.',
    difficulty: 'Easy',
    technologies: ['HTML/CSS', 'JavaScript', 'Node.js', 'Express'],
    requirements: [
      'Calendar view with monthly/weekly layouts',
      'Event creation and editing forms',
      'Event categorization with colors',
      'Basic event reminder system'
    ],
    thumbnail: 'https://images.pexels.com/photos/3243/pen-calendar-to-do-checklist.jpg',
    completed_by: 167,
    estimated_hours: 8
  },
  {
    id: 'fullstack-beginner-5',
    title: 'Book Review Platform',
    description: 'Build a platform where users can browse books, read reviews, and submit their own book reviews.',
    difficulty: 'Easy',
    technologies: ['HTML/CSS', 'JavaScript', 'Node.js', 'Express'],
    requirements: [
      'Book catalog with search and filtering',
      'User review submission and display',
      'Rating system with stars',
      'User profile with review history'
    ],
    thumbnail: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg',
    completed_by: 156,
    estimated_hours: 9
  },
  {
    id: 'fullstack-beginner-6',
    title: 'Simple Expense Tracker',
    description: 'Create an expense tracking application where users can log expenses and view spending analytics.',
    difficulty: 'Easy',
    technologies: ['HTML/CSS', 'JavaScript', 'Node.js', 'Express'],
    requirements: [
      'Expense entry form with categories',
      'Expense listing and filtering',
      'Basic spending analytics and charts',
      'Monthly/yearly expense summaries'
    ],
    thumbnail: 'https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg',
    completed_by: 223,
    estimated_hours: 8
  },
  {
    id: 'fullstack-beginner-7',
    title: 'Local Business Directory',
    description: 'Build a local business directory where businesses can list their services and customers can find them.',
    difficulty: 'Easy',
    technologies: ['HTML/CSS', 'JavaScript', 'Node.js', 'Express'],
    requirements: [
      'Business listing with contact information',
      'Category-based business browsing',
      'Search functionality by name/location',
      'Business owner dashboard for updates'
    ],
    thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
    completed_by: 145,
    estimated_hours: 10
  },
  {
    id: 'fullstack-beginner-8',
    title: 'Simple Quiz Application',
    description: 'Create a quiz application where users can take quizzes and view their scores and progress.',
    difficulty: 'Easy',
    technologies: ['HTML/CSS', 'JavaScript', 'Node.js', 'Express'],
    requirements: [
      'Multiple choice quiz interface',
      'Score calculation and display',
      'Quiz categories and difficulty levels',
      'User progress tracking'
    ],
    thumbnail: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg',
    completed_by: 189,
    estimated_hours: 7
  },
  {
    id: 'fullstack-beginner-9',
    title: 'Photo Gallery App',
    description: 'Build a photo gallery application where users can upload, organize, and share their photos.',
    difficulty: 'Easy',
    technologies: ['HTML/CSS', 'JavaScript', 'Node.js', 'Express'],
    requirements: [
      'Photo upload with drag and drop',
      'Gallery view with thumbnails',
      'Photo organization into albums',
      'Basic photo editing (resize, rotate)'
    ],
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    completed_by: 167,
    estimated_hours: 9
  },
  {
    id: 'fullstack-beginner-10',
    title: 'Simple Job Board',
    description: 'Create a job board where employers can post jobs and job seekers can browse and apply.',
    difficulty: 'Easy',
    technologies: ['HTML/CSS', 'JavaScript', 'Node.js', 'Express'],
    requirements: [
      'Job posting form for employers',
      'Job browsing with search and filters',
      'Application submission system',
      'Basic user profiles for job seekers'
    ],
    thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
    completed_by: 134,
    estimated_hours: 10
  },
  {
    id: 'fullstack-beginner-11',
    title: 'Weather Dashboard',
    description: 'Build a weather dashboard that displays current weather and forecasts for multiple cities.',
    difficulty: 'Easy',
    technologies: ['HTML/CSS', 'JavaScript', 'Node.js', 'Express', 'APIs'],
    requirements: [
      'Current weather display for cities',
      '5-day weather forecast',
      'City search and favorites',
      'Weather data visualization with charts'
    ],
    thumbnail: 'https://images.pexels.com/photos/2448749/pexels-photo-2448749.jpeg',
    completed_by: 178,
    estimated_hours: 8
  },
  {
    id: 'fullstack-beginner-12',
    title: 'Simple Inventory Manager',
    description: 'Create an inventory management system for small businesses to track products and stock levels.',
    difficulty: 'Easy',
    technologies: ['HTML/CSS', 'JavaScript', 'Node.js', 'Express'],
    requirements: [
      'Product catalog with CRUD operations',
      'Stock level tracking and alerts',
      'Basic reporting and analytics',
      'Barcode scanning simulation'
    ],
    thumbnail: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
    completed_by: 123,
    estimated_hours: 9
  },
  {
    id: 'fullstack-beginner-13',
    title: 'Student Grade Tracker',
    description: 'Build a grade tracking system where students can view their grades and teachers can manage assignments.',
    difficulty: 'Easy',
    technologies: ['HTML/CSS', 'JavaScript', 'Node.js', 'Express'],
    requirements: [
      'Student dashboard with grade overview',
      'Teacher interface for grade entry',
      'Assignment and exam management',
      'Grade calculation and GPA tracking'
    ],
    thumbnail: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg',
    completed_by: 156,
    estimated_hours: 9
  },
  {
    id: 'fullstack-beginner-14',
    title: 'Simple Habit Tracker',
    description: 'Create a habit tracking application where users can set goals and track their daily habits.',
    difficulty: 'Easy',
    technologies: ['HTML/CSS', 'JavaScript', 'Node.js', 'Express'],
    requirements: [
      'Habit creation and goal setting',
      'Daily habit check-in interface',
      'Progress visualization with streaks',
      'Habit analytics and insights'
    ],
    thumbnail: 'https://images.pexels.com/photos/3243/pen-calendar-to-do-checklist.jpg',
    completed_by: 189,
    estimated_hours: 8
  },
  {
    id: 'fullstack-beginner-15',
    title: 'Movie Watchlist App',
    description: 'Build a movie watchlist application where users can search for movies and manage their viewing lists.',
    difficulty: 'Easy',
    technologies: ['HTML/CSS', 'JavaScript', 'Node.js', 'Express', 'APIs'],
    requirements: [
      'Movie search using external API',
      'Personal watchlist management',
      'Movie rating and review system',
      'Watched vs. to-watch categorization'
    ],
    thumbnail: 'https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg',
    completed_by: 167,
    estimated_hours: 8
  },
  {
    id: 'fullstack-beginner-16',
    title: 'Simple Appointment Scheduler',
    description: 'Create an appointment scheduling system for service providers and their clients.',
    difficulty: 'Easy',
    technologies: ['HTML/CSS', 'JavaScript', 'Node.js', 'Express'],
    requirements: [
      'Service provider calendar setup',
      'Client appointment booking interface',
      'Appointment confirmation system',
      'Basic notification system'
    ],
    thumbnail: 'https://images.pexels.com/photos/3243/pen-calendar-to-do-checklist.jpg',
    completed_by: 134,
    estimated_hours: 10
  },
  {
    id: 'fullstack-beginner-17',
    title: 'Fitness Exercise Logger',
    description: 'Build a fitness application where users can log workouts and track their exercise progress.',
    difficulty: 'Easy',
    technologies: ['HTML/CSS', 'JavaScript', 'Node.js', 'Express'],
    requirements: [
      'Exercise database with categories',
      'Workout logging interface',
      'Progress tracking with charts',
      'Personal fitness goals setting'
    ],
    thumbnail: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg',
    completed_by: 145,
    estimated_hours: 9
  },
  {
    id: 'fullstack-beginner-18',
    title: 'Simple Note-Taking App',
    description: 'Create a note-taking application with organization features and basic text formatting.',
    difficulty: 'Easy',
    technologies: ['HTML/CSS', 'JavaScript', 'Node.js', 'Express'],
    requirements: [
      'Note creation with rich text editor',
      'Note organization with folders/tags',
      'Search functionality across notes',
      'Note sharing and collaboration basics'
    ],
    thumbnail: 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg',
    completed_by: 198,
    estimated_hours: 8
  },
  {
    id: 'fullstack-beginner-19',
    title: 'Pet Care Tracker',
    description: 'Build a pet care application where owners can track feeding, medical records, and activities.',
    difficulty: 'Easy',
    technologies: ['HTML/CSS', 'JavaScript', 'Node.js', 'Express'],
    requirements: [
      'Pet profile creation and management',
      'Feeding schedule and tracking',
      'Medical records and vet appointments',
      'Activity and exercise logging'
    ],
    thumbnail: 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg',
    completed_by: 123,
    estimated_hours: 9
  },
  {
    id: 'fullstack-beginner-20',
    title: 'Simple URL Bookmark Manager',
    description: 'Create a bookmark management application where users can save, organize, and share their favorite links.',
    difficulty: 'Easy',
    technologies: ['HTML/CSS', 'JavaScript', 'Node.js', 'Express'],
    requirements: [
      'URL bookmark saving with metadata',
      'Bookmark organization with folders',
      'Search and filtering capabilities',
      'Public bookmark sharing features'
    ],
    thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
    completed_by: 156,
    estimated_hours: 8
  }
]

// Export all projects
export const allProjects = [
  ...backendBeginnerProjects,
  ...fullstackBeginnerProjects
]