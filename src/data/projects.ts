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
  },
  {
    id: 'bg-6',
    name: 'Quiz Application',
    description: 'Build an interactive quiz app with multiple choice questions, scoring, and results.',
    stack: 'frontend',
    difficulty: 'beginner',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    estimatedHours: 8,
    maxPoints: 100,
    requirements: [
      'Multiple choice questions with 4 options',
      'Question navigation (next/previous)',
      'Score calculation and display',
      'Timer functionality',
      'Results page with correct answers',
      'Restart quiz functionality',
      'Progress indicator'
    ],
    gradingCriteria: [
      {
        id: 'bg-6-functionality',
        category: 'Core Functionality',
        description: 'Quiz mechanics and flow',
        maxPoints: 35,
        requirements: ['Question display', 'Answer selection', 'Navigation', 'Score calculation']
      },
      {
        id: 'bg-6-ui',
        category: 'User Interface',
        description: 'Design and user experience',
        maxPoints: 25,
        requirements: ['Clean design', 'Progress indicator', 'Visual feedback', 'Responsive layout']
      },
      {
        id: 'bg-6-features',
        category: 'Advanced Features',
        description: 'Timer and additional functionality',
        maxPoints: 25,
        requirements: ['Timer implementation', 'Results display', 'Restart functionality', 'Answer review']
      },
      {
        id: 'bg-6-code',
        category: 'Code Quality',
        description: 'Code organization and structure',
        maxPoints: 15,
        requirements: ['Clean code', 'Proper structure', 'Comments', 'Error handling']
      }
    ],
    folderStructure: {
      'index.html': '',
      'css': {
        'style.css': ''
      },
      'js': {
        'quiz.js': '',
        'questions.js': ''
      },
      'README.md': ''
    }
  },
  {
    id: 'bg-7',
    name: 'Digital Clock',
    description: 'Create a digital clock with multiple time zones, alarms, and customizable themes.',
    stack: 'frontend',
    difficulty: 'beginner',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    estimatedHours: 6,
    maxPoints: 100,
    requirements: [
      'Real-time digital clock display',
      'Multiple time zone support',
      'Alarm functionality with sound',
      'Stopwatch and timer features',
      'Theme customization options',
      '12/24 hour format toggle',
      'Responsive design'
    ],
    gradingCriteria: [
      {
        id: 'bg-7-time',
        category: 'Time Display',
        description: 'Accurate time display and formatting',
        maxPoints: 30,
        requirements: ['Real-time updates', 'Multiple time zones', 'Format options', 'Accuracy']
      },
      {
        id: 'bg-7-features',
        category: 'Additional Features',
        description: 'Alarm, stopwatch, and timer functionality',
        maxPoints: 30,
        requirements: ['Alarm system', 'Stopwatch', 'Timer', 'Sound notifications']
      },
      {
        id: 'bg-7-ui',
        category: 'User Interface',
        description: 'Design and customization options',
        maxPoints: 25,
        requirements: ['Theme options', 'Clean design', 'User controls', 'Visual appeal']
      },
      {
        id: 'bg-7-responsive',
        category: 'Responsiveness',
        description: 'Cross-device compatibility',
        maxPoints: 15,
        requirements: ['Mobile responsive', 'Desktop optimized', 'Touch-friendly']
      }
    ],
    folderStructure: {
      'index.html': '',
      'css': {
        'style.css': '',
        'themes.css': ''
      },
      'js': {
        'clock.js': '',
        'alarm.js': ''
      },
      'sounds': {},
      'README.md': ''
    }
  },
  {
    id: 'bg-8',
    name: 'Memory Card Game',
    description: 'Build a memory card matching game with different difficulty levels and scoring.',
    stack: 'frontend',
    difficulty: 'beginner',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    estimatedHours: 7,
    maxPoints: 100,
    requirements: [
      'Card grid with flip animations',
      'Matching logic and game rules',
      'Multiple difficulty levels',
      'Score and move counter',
      'Timer functionality',
      'Win/lose conditions',
      'Restart game option'
    ],
    gradingCriteria: [
      {
        id: 'bg-8-game',
        category: 'Game Logic',
        description: 'Core game mechanics and rules',
        maxPoints: 35,
        requirements: ['Card matching', 'Game rules', 'Win conditions', 'Move tracking']
      },
      {
        id: 'bg-8-animations',
        category: 'Animations & Effects',
        description: 'Card flip animations and visual effects',
        maxPoints: 25,
        requirements: ['Flip animations', 'Smooth transitions', 'Visual feedback', 'Polish']
      },
      {
        id: 'bg-8-features',
        category: 'Game Features',
        description: 'Difficulty levels and scoring',
        maxPoints: 25,
        requirements: ['Multiple levels', 'Scoring system', 'Timer', 'Restart functionality']
      },
      {
        id: 'bg-8-ui',
        category: 'User Interface',
        description: 'Game interface and design',
        maxPoints: 15,
        requirements: ['Clean design', 'Game controls', 'Status display', 'Responsive layout']
      }
    ],
    folderStructure: {
      'index.html': '',
      'css': {
        'style.css': '',
        'animations.css': ''
      },
      'js': {
        'game.js': '',
        'cards.js': ''
      },
      'images': {
        'cards': {}
      },
      'README.md': ''
    }
  },
  {
    id: 'bg-9',
    name: 'Color Palette Generator',
    description: 'Create a tool that generates color palettes with different color schemes and export options.',
    stack: 'frontend',
    difficulty: 'beginner',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    estimatedHours: 6,
    maxPoints: 100,
    requirements: [
      'Random color palette generation',
      'Different color scheme types (monochromatic, complementary, etc.)',
      'Color code display (HEX, RGB, HSL)',
      'Copy to clipboard functionality',
      'Save favorite palettes',
      'Export palette as image or CSS',
      'Color accessibility checker'
    ],
    gradingCriteria: [
      {
        id: 'bg-9-generation',
        category: 'Color Generation',
        description: 'Color palette generation algorithms',
        maxPoints: 30,
        requirements: ['Random generation', 'Color schemes', 'Algorithm accuracy', 'Variety']
      },
      {
        id: 'bg-9-features',
        category: 'Features',
        description: 'Copy, save, and export functionality',
        maxPoints: 30,
        requirements: ['Copy to clipboard', 'Save palettes', 'Export options', 'Accessibility check']
      },
      {
        id: 'bg-9-ui',
        category: 'User Interface',
        description: 'Design and user experience',
        maxPoints: 25,
        requirements: ['Intuitive design', 'Color display', 'Controls', 'Visual appeal']
      },
      {
        id: 'bg-9-code',
        category: 'Code Quality',
        description: 'Code organization and structure',
        maxPoints: 15,
        requirements: ['Clean code', 'Modular structure', 'Comments', 'Error handling']
      }
    ],
    folderStructure: {
      'index.html': '',
      'css': {
        'style.css': ''
      },
      'js': {
        'colorGenerator.js': '',
        'utils.js': ''
      },
      'README.md': ''
    }
  },
  {
    id: 'bg-10',
    name: 'Expense Tracker',
    description: 'Build a personal expense tracking application with categories, charts, and budget management.',
    stack: 'frontend',
    difficulty: 'beginner',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    estimatedHours: 9,
    maxPoints: 100,
    requirements: [
      'Add/edit/delete expense entries',
      'Expense categories and tags',
      'Monthly/yearly expense charts',
      'Budget setting and tracking',
      'Expense filtering and search',
      'Data export functionality',
      'Local storage persistence'
    ],
    gradingCriteria: [
      {
        id: 'bg-10-crud',
        category: 'Data Management',
        description: 'CRUD operations for expenses',
        maxPoints: 30,
        requirements: ['Add expenses', 'Edit expenses', 'Delete expenses', 'Data validation']
      },
      {
        id: 'bg-10-features',
        category: 'Features',
        description: 'Categories, budgets, and filtering',
        maxPoints: 30,
        requirements: ['Categories', 'Budget tracking', 'Filtering', 'Search functionality']
      },
      {
        id: 'bg-10-visualization',
        category: 'Data Visualization',
        description: 'Charts and expense visualization',
        maxPoints: 25,
        requirements: ['Expense charts', 'Visual summaries', 'Data presentation', 'Insights']
      },
      {
        id: 'bg-10-persistence',
        category: 'Data Persistence',
        description: 'Local storage and data export',
        maxPoints: 15,
        requirements: ['Local storage', 'Data export', 'Data integrity', 'Backup options']
      }
    ],
    folderStructure: {
      'index.html': '',
      'css': {
        'style.css': ''
      },
      'js': {
        'app.js': '',
        'storage.js': '',
        'charts.js': ''
      },
      'README.md': ''
    }
  },
  {
    id: 'bg-11',
    name: 'Recipe Finder',
    description: 'Create a recipe search application with ingredient-based search and meal planning features.',
    stack: 'frontend',
    difficulty: 'beginner',
    technologies: ['HTML', 'CSS', 'JavaScript', 'API'],
    estimatedHours: 8,
    maxPoints: 100,
    requirements: [
      'Recipe search by ingredients or name',
      'Recipe details with instructions',
      'Favorite recipes functionality',
      'Meal planning calendar',
      'Shopping list generation',
      'Dietary filter options',
      'Responsive design'
    ],
    gradingCriteria: [
      {
        id: 'bg-11-api',
        category: 'API Integration',
        description: 'Recipe API usage and data handling',
        maxPoints: 30,
        requirements: ['API calls', 'Data parsing', 'Error handling', 'Search functionality']
      },
      {
        id: 'bg-11-features',
        category: 'Features',
        description: 'Favorites, meal planning, and shopping lists',
        maxPoints: 30,
        requirements: ['Favorites system', 'Meal planning', 'Shopping lists', 'Dietary filters']
      },
      {
        id: 'bg-11-ui',
        category: 'User Interface',
        description: 'Design and user experience',
        maxPoints: 25,
        requirements: ['Clean design', 'Recipe display', 'Navigation', 'Visual appeal']
      },
      {
        id: 'bg-11-responsive',
        category: 'Responsiveness',
        description: 'Mobile and desktop compatibility',
        maxPoints: 15,
        requirements: ['Mobile responsive', 'Cross-device', 'Touch-friendly', 'Performance']
      }
    ],
    folderStructure: {
      'index.html': '',
      'css': {
        'style.css': ''
      },
      'js': {
        'app.js': '',
        'api.js': '',
        'storage.js': ''
      },
      'README.md': ''
    }
  },
  {
    id: 'bg-12',
    name: 'Music Player',
    description: 'Build a web-based music player with playlist management and audio controls.',
    stack: 'frontend',
    difficulty: 'beginner',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    estimatedHours: 9,
    maxPoints: 100,
    requirements: [
      'Audio playback controls (play, pause, stop)',
      'Progress bar with seek functionality',
      'Volume control',
      'Playlist creation and management',
      'Shuffle and repeat modes',
      'Song information display',
      'Responsive design'
    ],
    gradingCriteria: [
      {
        id: 'bg-12-audio',
        category: 'Audio Controls',
        description: 'Audio playback and control functionality',
        maxPoints: 35,
        requirements: ['Playback controls', 'Progress bar', 'Volume control', 'Seek functionality']
      },
      {
        id: 'bg-12-playlist',
        category: 'Playlist Management',
        description: 'Playlist creation and management',
        maxPoints: 25,
        requirements: ['Create playlists', 'Manage songs', 'Shuffle/repeat', 'Song navigation']
      },
      {
        id: 'bg-12-ui',
        category: 'User Interface',
        description: 'Player design and user experience',
        maxPoints: 25,
        requirements: ['Player design', 'Song display', 'Controls layout', 'Visual feedback']
      },
      {
        id: 'bg-12-responsive',
        category: 'Responsiveness',
        description: 'Cross-device compatibility',
        maxPoints: 15,
        requirements: ['Mobile responsive', 'Desktop optimized', 'Touch controls', 'Performance']
      }
    ],
    folderStructure: {
      'index.html': '',
      'css': {
        'style.css': ''
      },
      'js': {
        'player.js': '',
        'playlist.js': ''
      },
      'audio': {},
      'README.md': ''
    }
  },
  {
    id: 'bg-13',
    name: 'Password Generator',
    description: 'Create a secure password generator with customizable options and strength checking.',
    stack: 'frontend',
    difficulty: 'beginner',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    estimatedHours: 5,
    maxPoints: 100,
    requirements: [
      'Customizable password length',
      'Character type options (uppercase, lowercase, numbers, symbols)',
      'Password strength indicator',
      'Copy to clipboard functionality',
      'Password history',
      'Exclude similar characters option',
      'Bulk password generation'
    ],
    gradingCriteria: [
      {
        id: 'bg-13-generation',
        category: 'Password Generation',
        description: 'Password generation algorithms and options',
        maxPoints: 35,
        requirements: ['Customizable options', 'Secure generation', 'Character types', 'Length control']
      },
      {
        id: 'bg-13-security',
        category: 'Security Features',
        description: 'Password strength and security measures',
        maxPoints: 25,
        requirements: ['Strength indicator', 'Secure algorithms', 'Exclude similar chars', 'Best practices']
      },
      {
        id: 'bg-13-features',
        category: 'Additional Features',
        description: 'Copy, history, and bulk generation',
        maxPoints: 25,
        requirements: ['Copy to clipboard', 'Password history', 'Bulk generation', 'User preferences']
      },
      {
        id: 'bg-13-ui',
        category: 'User Interface',
        description: 'Design and user experience',
        maxPoints: 15,
        requirements: ['Clean design', 'Intuitive controls', 'Visual feedback', 'Accessibility']
      }
    ],
    folderStructure: {
      'index.html': '',
      'css': {
        'style.css': ''
      },
      'js': {
        'generator.js': '',
        'utils.js': ''
      },
      'README.md': ''
    }
  },
  {
    id: 'bg-14',
    name: 'QR Code Generator',
    description: 'Build a QR code generator that creates QR codes for text, URLs, and contact information.',
    stack: 'frontend',
    difficulty: 'beginner',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    estimatedHours: 6,
    maxPoints: 100,
    requirements: [
      'Generate QR codes for text and URLs',
      'Contact information QR codes (vCard)',
      'Customizable QR code size and colors',
      'Download QR code as image',
      'QR code history',
      'Batch QR code generation',
      'Error correction level options'
    ],
    gradingCriteria: [
      {
        id: 'bg-14-generation',
        category: 'QR Code Generation',
        description: 'QR code creation and customization',
        maxPoints: 35,
        requirements: ['Text/URL QR codes', 'vCard support', 'Customization options', 'Error correction']
      },
      {
        id: 'bg-14-features',
        category: 'Features',
        description: 'Download, history, and batch generation',
        maxPoints: 30,
        requirements: ['Download functionality', 'QR code history', 'Batch generation', 'Multiple formats']
      },
      {
        id: 'bg-14-ui',
        category: 'User Interface',
        description: 'Design and user experience',
        maxPoints: 20,
        requirements: ['Clean design', 'Preview display', 'Form controls', 'Visual feedback']
      },
      {
        id: 'bg-14-validation',
        category: 'Input Validation',
        description: 'Data validation and error handling',
        maxPoints: 15,
        requirements: ['Input validation', 'Error handling', 'User feedback', 'Data sanitization']
      }
    ],
    folderStructure: {
      'index.html': '',
      'css': {
        'style.css': ''
      },
      'js': {
        'qrGenerator.js': '',
        'utils.js': ''
      },
      'README.md': ''
    }
  },
  {
    id: 'bg-15',
    name: 'Unit Converter',
    description: 'Create a comprehensive unit converter for length, weight, temperature, and other measurements.',
    stack: 'frontend',
    difficulty: 'beginner',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    estimatedHours: 7,
    maxPoints: 100,
    requirements: [
      'Multiple unit categories (length, weight, temperature, etc.)',
      'Real-time conversion as you type',
      'Conversion history',
      'Favorite conversions',
      'Scientific notation support',
      'Precision control',
      'Responsive design'
    ],
    gradingCriteria: [
      {
        id: 'bg-15-conversion',
        category: 'Conversion Logic',
        description: 'Accurate conversion algorithms',
        maxPoints: 35,
        requirements: ['Multiple categories', 'Accurate calculations', 'Real-time updates', 'Precision handling']
      },
      {
        id: 'bg-15-features',
        category: 'Features',
        description: 'History, favorites, and advanced options',
        maxPoints: 25,
        requirements: ['Conversion history', 'Favorites', 'Scientific notation', 'Precision control']
      },
      {
        id: 'bg-15-ui',
        category: 'User Interface',
        description: 'Design and user experience',
        maxPoints: 25,
        requirements: ['Intuitive design', 'Category selection', 'Input controls', 'Results display']
      },
      {
        id: 'bg-15-validation',
        category: 'Input Validation',
        description: 'Data validation and error handling',
        maxPoints: 15,
        requirements: ['Input validation', 'Error handling', 'Range checking', 'User feedback']
      }
    ],
    folderStructure: {
      'index.html': '',
      'css': {
        'style.css': ''
      },
      'js': {
        'converter.js': '',
        'units.js': '',
        'utils.js': ''
      },
      'README.md': ''
    }
  },
  {
    id: 'bg-16',
    name: 'Markdown Editor',
    description: 'Build a live markdown editor with preview, syntax highlighting, and export options.',
    stack: 'frontend',
    difficulty: 'beginner',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    estimatedHours: 8,
    maxPoints: 100,
    requirements: [
      'Live markdown preview',
      'Syntax highlighting in editor',
      'Toolbar with formatting buttons',
      'File import/export functionality',
      'Multiple themes',
      'Full-screen editing mode',
      'Word count and statistics'
    ],
    gradingCriteria: [
      {
        id: 'bg-16-editor',
        category: 'Editor Functionality',
        description: 'Markdown editing and preview',
        maxPoints: 35,
        requirements: ['Live preview', 'Syntax highlighting', 'Toolbar', 'Markdown parsing']
      },
      {
        id: 'bg-16-features',
        category: 'Features',
        description: 'Import/export and additional functionality',
        maxPoints: 30,
        requirements: ['File operations', 'Themes', 'Full-screen mode', 'Statistics']
      },
      {
        id: 'bg-16-ui',
        category: 'User Interface',
        description: 'Editor design and user experience',
        maxPoints: 20,
        requirements: ['Clean design', 'Split view', 'Toolbar design', 'Theme implementation']
      },
      {
        id: 'bg-16-performance',
        category: 'Performance',
        description: 'Editor performance and optimization',
        maxPoints: 15,
        requirements: ['Real-time updates', 'Large file handling', 'Smooth scrolling', 'Memory efficiency']
      }
    ],
    folderStructure: {
      'index.html': '',
      'css': {
        'style.css': '',
        'themes.css': ''
      },
      'js': {
        'editor.js': '',
        'markdown.js': '',
        'utils.js': ''
      },
      'README.md': ''
    }
  },
  {
    id: 'bg-17',
    name: 'Pomodoro Timer',
    description: 'Create a productivity timer using the Pomodoro Technique with customizable intervals and statistics.',
    stack: 'frontend',
    difficulty: 'beginner',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    estimatedHours: 6,
    maxPoints: 100,
    requirements: [
      'Customizable work and break intervals',
      'Visual and audio notifications',
      'Session statistics and tracking',
      'Task list integration',
      'Multiple timer themes',
      'Progress visualization',
      'Settings persistence'
    ],
    gradingCriteria: [
      {
        id: 'bg-17-timer',
        category: 'Timer Functionality',
        description: 'Timer mechanics and intervals',
        maxPoints: 35,
        requirements: ['Work/break cycles', 'Customizable intervals', 'Accurate timing', 'Auto-progression']
      },
      {
        id: 'bg-17-features',
        category: 'Features',
        description: 'Notifications, tasks, and statistics',
        maxPoints: 30,
        requirements: ['Notifications', 'Task integration', 'Statistics tracking', 'Progress visualization']
      },
      {
        id: 'bg-17-ui',
        category: 'User Interface',
        description: 'Design and user experience',
        maxPoints: 20,
        requirements: ['Clean design', 'Timer display', 'Controls', 'Theme options']
      },
      {
        id: 'bg-17-persistence',
        category: 'Data Persistence',
        description: 'Settings and statistics storage',
        maxPoints: 15,
        requirements: ['Settings storage', 'Statistics persistence', 'Data integrity', 'User preferences']
      }
    ],
    folderStructure: {
      'index.html': '',
      'css': {
        'style.css': '',
        'themes.css': ''
      },
      'js': {
        'timer.js': '',
        'stats.js': '',
        'utils.js': ''
      },
      'sounds': {},
      'README.md': ''
    }
  },
  {
    id: 'bg-18',
    name: 'Drawing Canvas',
    description: 'Build a web-based drawing application with various tools, colors, and save functionality.',
    stack: 'frontend',
    difficulty: 'beginner',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Canvas API'],
    estimatedHours: 9,
    maxPoints: 100,
    requirements: [
      'Drawing tools (pen, brush, eraser)',
      'Color picker and palette',
      'Brush size adjustment',
      'Undo/redo functionality',
      'Save drawing as image',
      'Clear canvas option',
      'Responsive canvas'
    ],
    gradingCriteria: [
      {
        id: 'bg-18-drawing',
        category: 'Drawing Functionality',
        description: 'Canvas drawing and tools',
        maxPoints: 35,
        requirements: ['Drawing tools', 'Smooth drawing', 'Tool switching', 'Canvas interaction']
      },
      {
        id: 'bg-18-tools',
        category: 'Tools & Controls',
        description: 'Color picker, brush size, and controls',
        maxPoints: 30,
        requirements: ['Color picker', 'Brush controls', 'Tool options', 'User controls']
      },
      {
        id: 'bg-18-features',
        category: 'Features',
        description: 'Undo/redo, save, and additional functionality',
        maxPoints: 20,
        requirements: ['Undo/redo', 'Save functionality', 'Clear canvas', 'Image export']
      },
      {
        id: 'bg-18-ui',
        category: 'User Interface',
        description: 'Design and user experience',
        maxPoints: 15,
        requirements: ['Tool layout', 'Canvas design', 'Controls placement', 'Visual feedback']
      }
    ],
    folderStructure: {
      'index.html': '',
      'css': {
        'style.css': ''
      },
      'js': {
        'canvas.js': '',
        'tools.js': '',
        'utils.js': ''
      },
      'README.md': ''
    }
  },
  {
    id: 'bg-19',
    name: 'Habit Tracker',
    description: 'Create a habit tracking application with daily check-ins, streaks, and progress visualization.',
    stack: 'frontend',
    difficulty: 'beginner',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    estimatedHours: 8,
    maxPoints: 100,
    requirements: [
      'Add and manage habits',
      'Daily check-in functionality',
      'Streak tracking and visualization',
      'Progress charts and statistics',
      'Habit categories and tags',
      'Reminder notifications',
      'Data export functionality'
    ],
    gradingCriteria: [
      {
        id: 'bg-19-habits',
        category: 'Habit Management',
        description: 'Habit creation and management',
        maxPoints: 30,
        requirements: ['Add habits', 'Edit habits', 'Categories', 'Habit settings']
      },
      {
        id: 'bg-19-tracking',
        category: 'Tracking & Streaks',
        description: 'Daily tracking and streak calculation',
        maxPoints: 30,
        requirements: ['Daily check-ins', 'Streak tracking', 'Progress calculation', 'Data accuracy']
      },
      {
        id: 'bg-19-visualization',
        category: 'Data Visualization',
        description: 'Charts and progress visualization',
        maxPoints: 25,
        requirements: ['Progress charts', 'Statistics display', 'Visual indicators', 'Data insights']
      },
      {
        id: 'bg-19-features',
        category: 'Additional Features',
        description: 'Reminders and data export',
        maxPoints: 15,
        requirements: ['Reminders', 'Data export', 'User preferences', 'Backup options']
      }
    ],
    folderStructure: {
      'index.html': '',
      'css': {
        'style.css': ''
      },
      'js': {
        'habits.js': '',
        'tracking.js': '',
        'charts.js': '',
        'storage.js': ''
      },
      'README.md': ''
    }
  },
  {
    id: 'bg-20',
    name: 'URL Shortener',
    description: 'Build a URL shortening service with custom aliases, analytics, and link management.',
    stack: 'frontend',
    difficulty: 'beginner',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    estimatedHours: 7,
    maxPoints: 100,
    requirements: [
      'URL shortening functionality',
      'Custom alias support',
      'Click tracking and analytics',
      'Link management dashboard',
      'QR code generation for links',
      'Bulk URL shortening',
      'Link expiration options'
    ],
    gradingCriteria: [
      {
        id: 'bg-20-shortening',
        category: 'URL Shortening',
        description: 'Core shortening functionality',
        maxPoints: 35,
        requirements: ['URL shortening', 'Custom aliases', 'Link validation', 'Short URL generation']
      },
      {
        id: 'bg-20-analytics',
        category: 'Analytics & Tracking',
        description: 'Click tracking and analytics',
        maxPoints: 25,
        requirements: ['Click tracking', 'Analytics display', 'Statistics', 'Usage insights']
      },
      {
        id: 'bg-20-management',
        category: 'Link Management',
        description: 'Dashboard and link management',
        maxPoints: 25,
        requirements: ['Link dashboard', 'Edit/delete links', 'Bulk operations', 'Search/filter']
      },
      {
        id: 'bg-20-features',
        category: 'Additional Features',
        description: 'QR codes and advanced options',
        maxPoints: 15,
        requirements: ['QR code generation', 'Link expiration', 'Bulk shortening', 'Export options']
      }
    ],
    folderStructure: {
      'index.html': '',
      'css': {
        'style.css': ''
      },
      'js': {
        'shortener.js': '',
        'analytics.js': '',
        'storage.js': '',
        'utils.js': ''
      },
      'README.md': ''
    }
  },
  {
    id: 'backend-1',
    name: 'Simple REST API',
    description: 'Build a basic REST API with CRUD operations for managing a list of items.',
    stack: 'backend',
    difficulty: 'beginner',
    technologies: ['Node.js', 'Express', 'JSON'],
    estimatedHours: 4,
    maxPoints: 100,
    requirements: [
      'Create GET endpoint to retrieve all items',
      'Create POST endpoint to add new items',
      'Create PUT endpoint to update items',
      'Create DELETE endpoint to remove items',
      'Use proper HTTP status codes'
    ],
    gradingCriteria: [
      {
        id: 'api-endpoints',
        category: 'API Endpoints',
        description: 'Implementation of all required CRUD endpoints',
        maxPoints: 40,
        requirements: ['GET /items', 'POST /items', 'PUT /items/:id', 'DELETE /items/:id']
      },
      {
        id: 'code-quality',
        category: 'Code Quality',
        description: 'Clean, organized code with proper error handling',
        maxPoints: 30,
        requirements: ['Proper error handling', 'Clean code structure', 'Meaningful variable names']
      },
      {
        id: 'functionality',
        category: 'Functionality',
        description: 'All endpoints work correctly with proper responses',
        maxPoints: 30,
        requirements: ['Correct HTTP methods', 'Proper status codes', 'JSON responses']
      }
    ],
    folderStructure: {
      'server.js': '',
      'package.json': '',
      'src': {
        'routes': {
          'api.js': ''
        }
      }
    }
  },
  {
    id: 'backend-2',
    name: 'User Authentication API',
    description: 'Create an authentication system with user registration and login endpoints.',
    stack: 'backend',
    difficulty: 'beginner',
    technologies: ['Node.js', 'Express', 'JWT', 'bcrypt'],
    estimatedHours: 6,
    maxPoints: 120,
    requirements: [
      'User registration endpoint',
      'User login endpoint',
      'Password hashing with bcrypt',
      'JWT token generation',
      'Protected route middleware'
    ],
    gradingCriteria: [
      {
        id: 'authentication',
        category: 'Authentication & Security',
        description: 'Secure user authentication implementation',
        maxPoints: 50,
        requirements: ['Password hashing', 'JWT tokens', 'Secure endpoints']
      },
      {
        id: 'api-design',
        category: 'API Design',
        description: 'Well-designed authentication endpoints',
        maxPoints: 40,
        requirements: ['Registration endpoint', 'Login endpoint', 'Protected routes']
      },
      {
        id: 'error-handling',
        category: 'Error Handling',
        description: 'Proper error responses and validation',
        maxPoints: 30,
        requirements: ['Input validation', 'Error messages', 'Status codes']
      }
    ],
    folderStructure: {
      'server.js': '',
      'package.json': '',
      'src': {
        'routes': {
          'auth.js': ''
        },
        'middleware': {
          'auth.js': ''
        }
      }
    }
  },
  {
    id: 'backend-3',
    name: 'File Upload API',
    description: 'Build an API that handles file uploads and serves uploaded files.',
    stack: 'backend',
    difficulty: 'beginner',
    technologies: ['Node.js', 'Express', 'Multer', 'File System'],
    estimatedHours: 5,
    maxPoints: 110,
    requirements: [
      'File upload endpoint',
      'File serving endpoint',
      'File type validation',
      'File size limits',
      'Error handling for invalid files'
    ],
    gradingCriteria: [
      {
        id: 'file-handling',
        category: 'File Handling',
        description: 'Proper file upload and serving functionality',
        maxPoints: 50,
        requirements: ['Upload endpoint', 'File serving', 'Storage management']
      },
      {
        id: 'validation',
        category: 'Validation & Security',
        description: 'File validation and security measures',
        maxPoints: 35,
        requirements: ['File type validation', 'Size limits', 'Security checks']
      },
      {
        id: 'error-handling',
        category: 'Error Handling',
        description: 'Robust error handling for file operations',
        maxPoints: 25,
        requirements: ['Upload errors', 'File not found', 'Validation errors']
      }
    ],
    folderStructure: {
      'server.js': '',
      'package.json': '',
      'uploads': {},
      'src': {
        'routes': {
          'files.js': ''
        }
      }
    }
  },
  {
    id: 'backend-4',
    name: 'Weather Data API',
    description: 'Create an API that fetches and serves weather data from external APIs.',
    stack: 'backend',
    difficulty: 'beginner',
    technologies: ['Node.js', 'Express', 'Axios', 'External APIs'],
    estimatedHours: 4,
    maxPoints: 100,
    requirements: [
      'Fetch weather data from external API',
      'Create endpoint to get weather by city',
      'Handle API errors gracefully',
      'Cache responses for better performance',
      'Return formatted weather data'
    ],
    gradingCriteria: [
      {
        id: 'api-integration',
        category: 'API Integration',
        description: 'Successful integration with external weather API',
        maxPoints: 40,
        requirements: ['External API calls', 'Data fetching', 'Response handling']
      },
      {
        id: 'data-processing',
        category: 'Data Processing',
        description: 'Proper data formatting and response structure',
        maxPoints: 35,
        requirements: ['Data formatting', 'Response structure', 'Error handling']
      },
      {
        id: 'performance',
        category: 'Performance',
        description: 'Caching and optimization implementation',
        maxPoints: 25,
        requirements: ['Response caching', 'Error handling', 'Performance optimization']
      }
    ],
    folderStructure: {
      'server.js': '',
      'package.json': '',
      'src': {
        'routes': {
          'weather.js': ''
        },
        'services': {
          'weatherService.js': ''
        }
      }
    }
  },
  {
    id: 'backend-5',
    name: 'Simple Database API',
    description: 'Build an API that connects to a database and performs CRUD operations.',
    stack: 'backend',
    difficulty: 'beginner',
    technologies: ['Node.js', 'Express', 'SQLite', 'SQL'],
    estimatedHours: 6,
    maxPoints: 120,
    requirements: [
      'Database connection setup',
      'Create database tables',
      'CRUD operations with database',
      'SQL query implementation',
      'Database error handling'
    ],
    gradingCriteria: [
      {
        id: 'database-integration',
        category: 'Database Integration',
        description: 'Successful database connection and operations',
        maxPoints: 50,
        requirements: ['Database connection', 'Table creation', 'CRUD operations']
      },
      {
        id: 'sql-queries',
        category: 'SQL Implementation',
        description: 'Proper SQL queries and database operations',
        maxPoints: 40,
        requirements: ['SELECT queries', 'INSERT operations', 'UPDATE/DELETE operations']
      },
      {
        id: 'error-handling',
        category: 'Error Handling',
        description: 'Database error handling and validation',
        maxPoints: 30,
        requirements: ['Connection errors', 'Query errors', 'Data validation']
      }
    ],
    folderStructure: {
      'server.js': '',
      'package.json': '',
      'database.db': '',
      'src': {
        'routes': {
          'api.js': ''
        },
        'database': {
          'db.js': ''
        }
      }
    }
  },
  {
    id: 'backend-6',
    name: 'Email Service API',
    description: 'Create an API service that sends emails using a third-party email service.',
    stack: 'backend',
    difficulty: 'beginner',
    technologies: ['Node.js', 'Express', 'Nodemailer', 'Email APIs'],
    estimatedHours: 5,
    maxPoints: 110,
    requirements: [
      'Email sending endpoint',
      'Email template support',
      'Input validation for email data',
      'Error handling for email failures',
      'Email delivery confirmation'
    ],
    gradingCriteria: [
      {
        id: 'email-functionality',
        category: 'Email Functionality',
        description: 'Working email sending implementation',
        maxPoints: 45,
        requirements: ['Email sending', 'Template support', 'Delivery handling']
      },
      {
        id: 'validation',
        category: 'Input Validation',
        description: 'Proper validation of email data',
        maxPoints: 35,
        requirements: ['Email validation', 'Required fields', 'Data sanitization']
      },
      {
        id: 'error-handling',
        category: 'Error Handling',
        description: 'Robust error handling for email operations',
        maxPoints: 30,
        requirements: ['Send failures', 'Invalid emails', 'Service errors']
      }
    ],
    folderStructure: {
      'server.js': '',
      'package.json': '',
      'src': {
        'routes': {
          'email.js': ''
        },
        'services': {
          'emailService.js': ''
        },
        'templates': {
          'welcome.html': ''
        }
      }
    }
  },
  {
    id: 'backend-7',
    name: 'URL Shortener API',
    description: 'Build a URL shortening service similar to bit.ly with analytics.',
    stack: 'backend',
    difficulty: 'beginner',
    technologies: ['Node.js', 'Express', 'Database', 'URL Validation'],
    estimatedHours: 6,
    maxPoints: 120,
    requirements: [
      'URL shortening endpoint',
      'URL redirection functionality',
      'Click tracking and analytics',
      'URL validation',
      'Custom short codes support'
    ],
    gradingCriteria: [
      {
        id: 'core-functionality',
        category: 'Core Functionality',
        description: 'URL shortening and redirection features',
        maxPoints: 50,
        requirements: ['URL shortening', 'Redirection', 'Short code generation']
      },
      {
        id: 'analytics',
        category: 'Analytics & Tracking',
        description: 'Click tracking and analytics implementation',
        maxPoints: 40,
        requirements: ['Click counting', 'Analytics endpoint', 'Data storage']
      },
      {
        id: 'validation',
        category: 'Validation & Security',
        description: 'URL validation and security measures',
        maxPoints: 30,
        requirements: ['URL validation', 'Security checks', 'Error handling']
      }
    ],
    folderStructure: {
      'server.js': '',
      'package.json': '',
      'src': {
        'routes': {
          'urls.js': ''
        },
        'models': {
          'url.js': ''
        },
        'utils': {
          'shortener.js': ''
        }
      }
    }
  },
  {
    id: 'backend-8',
    name: 'Task Queue API',
    description: 'Create a simple task queue system for background job processing.',
    stack: 'backend',
    difficulty: 'beginner',
    technologies: ['Node.js', 'Express', 'Queue System', 'Background Jobs'],
    estimatedHours: 7,
    maxPoints: 130,
    requirements: [
      'Task creation endpoint',
      'Task processing system',
      'Task status tracking',
      'Queue management',
      'Background job execution'
    ],
    gradingCriteria: [
      {
        id: 'queue-system',
        category: 'Queue System',
        description: 'Task queue implementation and management',
        maxPoints: 50,
        requirements: ['Task queuing', 'Queue processing', 'Job execution']
      },
      {
        id: 'task-management',
        category: 'Task Management',
        description: 'Task creation, tracking, and status updates',
        maxPoints: 45,
        requirements: ['Task creation', 'Status tracking', 'Task completion']
      },
      {
        id: 'background-processing',
        category: 'Background Processing',
        description: 'Asynchronous task processing implementation',
        maxPoints: 35,
        requirements: ['Async processing', 'Error handling', 'Task retry logic']
      }
    ],
    folderStructure: {
      'server.js': '',
      'package.json': '',
      'src': {
        'routes': {
          'tasks.js': ''
        },
        'queue': {
          'taskQueue.js': ''
        },
        'workers': {
          'taskWorker.js': ''
        }
      }
    }
  },
  {
    id: 'backend-9',
    name: 'Rate Limiting API',
    description: 'Implement an API with rate limiting to prevent abuse and ensure fair usage.',
    stack: 'backend',
    difficulty: 'beginner',
    technologies: ['Node.js', 'Express', 'Rate Limiting', 'Middleware'],
    estimatedHours: 4,
    maxPoints: 100,
    requirements: [
      'Rate limiting middleware',
      'Different rate limits for different endpoints',
      'Rate limit headers in responses',
      'Rate limit exceeded error handling',
      'IP-based rate limiting'
    ],
    gradingCriteria: [
      {
        id: 'rate-limiting',
        category: 'Rate Limiting Implementation',
        description: 'Effective rate limiting mechanism',
        maxPoints: 45,
        requirements: ['Rate limiting logic', 'Request counting', 'Time windows']
      },
      {
        id: 'middleware',
        category: 'Middleware Design',
        description: 'Well-designed middleware implementation',
        maxPoints: 35,
        requirements: ['Middleware structure', 'Reusability', 'Configuration']
      },
      {
        id: 'error-handling',
        category: 'Error Handling',
        description: 'Proper handling of rate limit violations',
        maxPoints: 20,
        requirements: ['Error responses', 'Status codes', 'Headers']
      }
    ],
    folderStructure: {
      'server.js': '',
      'package.json': '',
      'src': {
        'middleware': {
          'rateLimiter.js': ''
        },
        'routes': {
          'api.js': ''
        }
      }
    }
  },
  {
    id: 'backend-10',
    name: 'Logging and Monitoring API',
    description: 'Build an API with comprehensive logging and basic monitoring capabilities.',
    stack: 'backend',
    difficulty: 'beginner',
    technologies: ['Node.js', 'Express', 'Winston', 'Monitoring'],
    estimatedHours: 5,
    maxPoints: 110,
    requirements: [
      'Request logging middleware',
      'Error logging system',
      'Log levels and formatting',
      'Health check endpoint',
      'Basic metrics collection'
    ],
    gradingCriteria: [
      {
        id: 'logging-system',
        category: 'Logging System',
        description: 'Comprehensive logging implementation',
        maxPoints: 45,
        requirements: ['Request logging', 'Error logging', 'Log formatting']
      },
      {
        id: 'monitoring',
        category: 'Monitoring & Health Checks',
        description: 'Health monitoring and metrics collection',
        maxPoints: 35,
        requirements: ['Health endpoints', 'Metrics collection', 'Status reporting']
      },
      {
        id: 'configuration',
        category: 'Configuration & Setup',
        description: 'Proper logging configuration and setup',
        maxPoints: 30,
        requirements: ['Log levels', 'Configuration', 'Environment setup']
      }
    ],
    folderStructure: {
      'server.js': '',
      'package.json': '',
      'logs': {},
      'src': {
        'middleware': {
          'logger.js': ''
        },
        'routes': {
          'health.js': ''
        },
        'config': {
          'logger.js': ''
        }
      }
    }
  },
  {
    id: 'fullstack-1',
    name: 'Personal Blog Platform',
    description: 'Create a full-stack blog platform where users can create, edit, and publish blog posts.',
    stack: 'fullstack',
    difficulty: 'beginner',
    technologies: ['React', 'Node.js', 'Express', 'SQLite', 'CSS'],
    estimatedHours: 12,
    maxPoints: 200,
    requirements: [
      'Frontend blog interface with React',
      'Backend API for blog operations',
      'Database for storing posts',
      'Create, read, update, delete posts',
      'Responsive design'
    ],
    gradingCriteria: [
      {
        id: 'frontend-implementation',
        category: 'Frontend Implementation',
        description: 'React frontend with proper component structure',
        maxPoints: 60,
        requirements: ['React components', 'State management', 'User interface']
      },
      {
        id: 'backend-api',
        category: 'Backend API',
        description: 'RESTful API with proper endpoints',
        maxPoints: 60,
        requirements: ['API endpoints', 'Database integration', 'CRUD operations']
      },
      {
        id: 'integration',
        category: 'Frontend-Backend Integration',
        description: 'Seamless integration between frontend and backend',
        maxPoints: 50,
        requirements: ['API calls', 'Data flow', 'Error handling']
      },
      {
        id: 'design-responsiveness',
        category: 'Design & Responsiveness',
        description: 'Responsive design and user experience',
        maxPoints: 30,
        requirements: ['Responsive layout', 'CSS styling', 'User experience']
      }
    ],
    folderStructure: {
      'package.json': '',
      'server.js': '',
      'client': {
        'public': {
          'index.html': ''
        },
        'src': {
          'App.js': '',
          'index.js': '',
          'components': {
            'BlogList.js': '',
            'BlogPost.js': '',
            'CreatePost.js': ''
          },
          'App.css': ''
        }
      },
      'server': {
        'routes': {
          'posts.js': ''
        },
        'database': {
          'db.js': ''
        }
      }
    }
  }
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
  },
  {
    id: 'int-3',
    name: 'Task Management System',
    description: 'Build a comprehensive task management system with team collaboration, project tracking, and analytics.',
    stack: 'fullstack',
    difficulty: 'intermediate',
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL'],
    estimatedHours: 22,
    maxPoints: 100,
    requirements: [
      'User authentication and team management',
      'Project and task creation with assignments',
      'Kanban board interface',
      'Time tracking and reporting',
      'File attachments and comments',
      'Email notifications',
      'Dashboard with analytics'
    ],
    gradingCriteria: [
      {
        id: 'int-3-tasks',
        category: 'Task Management',
        description: 'Core task and project functionality',
        maxPoints: 30,
        requirements: ['Task CRUD', 'Project management', 'Assignments', 'Status tracking']
      },
      {
        id: 'int-3-collaboration',
        category: 'Team Collaboration',
        description: 'Team features and collaboration tools',
        maxPoints: 25,
        requirements: ['Team management', 'Comments', 'File attachments', 'Notifications']
      },
      {
        id: 'int-3-ui',
        category: 'User Interface',
        description: 'Kanban board and dashboard design',
        maxPoints: 25,
        requirements: ['Kanban board', 'Dashboard', 'Responsive design', 'User experience']
      },
      {
        id: 'int-3-analytics',
        category: 'Analytics & Reporting',
        description: 'Time tracking and reporting features',
        maxPoints: 20,
        requirements: ['Time tracking', 'Reports', 'Analytics', 'Data visualization']
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
    id: 'int-4',
    name: 'Social Media Dashboard',
    description: 'Create a social media management dashboard with post scheduling, analytics, and multi-platform support.',
    stack: 'fullstack',
    difficulty: 'intermediate',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'APIs'],
    estimatedHours: 24,
    maxPoints: 100,
    requirements: [
      'Multi-platform social media integration',
      'Post creation and scheduling',
      'Content calendar view',
      'Analytics and engagement metrics',
      'Team collaboration features',
      'Content library management',
      'Automated posting'
    ],
    gradingCriteria: [
      {
        id: 'int-4-integration',
        category: 'API Integration',
        description: 'Social media platform integration',
        maxPoints: 30,
        requirements: ['Multiple platforms', 'API authentication', 'Data synchronization', 'Error handling']
      },
      {
        id: 'int-4-scheduling',
        category: 'Post Scheduling',
        description: 'Content creation and scheduling system',
        maxPoints: 25,
        requirements: ['Post creation', 'Scheduling system', 'Calendar view', 'Automated posting']
      },
      {
        id: 'int-4-analytics',
        category: 'Analytics & Metrics',
        description: 'Performance tracking and analytics',
        maxPoints: 25,
        requirements: ['Engagement metrics', 'Analytics dashboard', 'Data visualization', 'Reporting']
      },
      {
        id: 'int-4-management',
        category: 'Content Management',
        description: 'Content library and team features',
        maxPoints: 20,
        requirements: ['Content library', 'Team collaboration', 'Asset management', 'Workflow']
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
    id: 'int-5',
    name: 'Learning Management System',
    description: 'Build an LMS with course creation, student enrollment, progress tracking, and assessments.',
    stack: 'fullstack',
    difficulty: 'intermediate',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    estimatedHours: 28,
    maxPoints: 100,
    requirements: [
      'User roles (instructor, student, admin)',
      'Course creation with lessons and materials',
      'Student enrollment and progress tracking',
      'Quiz and assignment system',
      'Discussion forums',
      'Certificate generation',
      'Payment integration for courses'
    ],
    gradingCriteria: [
      {
        id: 'int-5-courses',
        category: 'Course Management',
        description: 'Course creation and content management',
        maxPoints: 30,
        requirements: ['Course creation', 'Lesson management', 'Content upload', 'Course structure']
      },
      {
        id: 'int-5-learning',
        category: 'Learning Features',
        description: 'Student learning experience and tracking',
        maxPoints: 25,
        requirements: ['Progress tracking', 'Assessments', 'Certificates', 'Learning path']
      },
      {
        id: 'int-5-interaction',
        category: 'User Interaction',
        description: 'Forums, discussions, and collaboration',
        maxPoints: 25,
        requirements: ['Discussion forums', 'Student-instructor interaction', 'Peer collaboration', 'Messaging']
      },
      {
        id: 'int-5-administration',
        category: 'Administration',
        description: 'User management and system administration',
        maxPoints: 20,
        requirements: ['User roles', 'Enrollment management', 'Analytics', 'Payment processing']
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
    id: 'int-6',
    name: 'Inventory Management System',
    description: 'Create an inventory management system with stock tracking, supplier management, and reporting.',
    stack: 'fullstack',
    difficulty: 'intermediate',
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL'],
    estimatedHours: 26,
    maxPoints: 100,
    requirements: [
      'Product and category management',
      'Stock level tracking and alerts',
      'Supplier and purchase order management',
      'Sales and inventory reports',
      'Barcode scanning integration',
      'Multi-location support',
      'User roles and permissions'
    ],
    gradingCriteria: [
      {
        id: 'int-6-inventory',
        category: 'Inventory Management',
        description: 'Core inventory tracking functionality',
        maxPoints: 30,
        requirements: ['Product management', 'Stock tracking', 'Category organization', 'Inventory updates']
      },
      {
        id: 'int-6-operations',
        category: 'Business Operations',
        description: 'Supplier and purchase order management',
        maxPoints: 25,
        requirements: ['Supplier management', 'Purchase orders', 'Receiving', 'Vendor relations']
      },
      {
        id: 'int-6-reporting',
        category: 'Reporting & Analytics',
        description: 'Reports and business intelligence',
        maxPoints: 25,
        requirements: ['Inventory reports', 'Sales analytics', 'Stock alerts', 'Data visualization']
      },
      {
        id: 'int-6-features',
        category: 'Advanced Features',
        description: 'Barcode scanning and multi-location support',
        maxPoints: 20,
        requirements: ['Barcode integration', 'Multi-location', 'User permissions', 'Mobile support']
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
    id: 'int-7',
    name: 'Event Management Platform',
    description: 'Build an event management platform with ticketing, attendee management, and event analytics.',
    stack: 'fullstack',
    difficulty: 'intermediate',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    estimatedHours: 24,
    maxPoints: 100,
    requirements: [
      'Event creation and management',
      'Ticket sales and payment processing',
      'Attendee registration and check-in',
      'Event promotion and marketing tools',
      'Real-time event analytics',
      'Mobile-responsive design',
      'Email notifications and reminders'
    ],
    gradingCriteria: [
      {
        id: 'int-7-events',
        category: 'Event Management',
        description: 'Event creation and management features',
        maxPoints: 30,
        requirements: ['Event creation', 'Event details', 'Venue management', 'Event scheduling']
      },
      {
        id: 'int-7-ticketing',
        category: 'Ticketing System',
        description: 'Ticket sales and payment processing',
        maxPoints: 25,
        requirements: ['Ticket types', 'Payment processing', 'Pricing tiers', 'Discount codes']
      },
      {
        id: 'int-7-attendees',
        category: 'Attendee Management',
        description: 'Registration and attendee tracking',
        maxPoints: 25,
        requirements: ['Registration system', 'Check-in process', 'Attendee communication', 'Badge generation']
      },
      {
        id: 'int-7-analytics',
        category: 'Analytics & Marketing',
        description: 'Event analytics and promotion tools',
        maxPoints: 20,
        requirements: ['Event analytics', 'Marketing tools', 'Social sharing', 'Performance metrics']
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
    id: 'int-8',
    name: 'Job Board Platform',
    description: 'Create a job board with company profiles, job postings, application tracking, and candidate matching.',
    stack: 'fullstack',
    difficulty: 'intermediate',
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL'],
    estimatedHours: 26,
    maxPoints: 100,
    requirements: [
      'Company registration and profiles',
      'Job posting creation and management',
      'Candidate profiles and resume upload',
      'Job search with filters and recommendations',
      'Application tracking system',
      'Messaging between employers and candidates',
      'Payment system for job postings'
    ],
    gradingCriteria: [
      {
        id: 'int-8-jobs',
        category: 'Job Management',
        description: 'Job posting and management features',
        maxPoints: 30,
        requirements: ['Job posting', 'Job management', 'Company profiles', 'Job categories']
      },
      {
        id: 'int-8-candidates',
        category: 'Candidate Features',
        description: 'Candidate profiles and job search',
        maxPoints: 25,
        requirements: ['Candidate profiles', 'Resume upload', 'Job search', 'Application system']
      },
      {
        id: 'int-8-matching',
        category: 'Matching & Recommendations',
        description: 'Job matching and recommendation system',
        maxPoints: 25,
        requirements: ['Job recommendations', 'Candidate matching', 'Search filters', 'Algorithm accuracy']
      },
      {
        id: 'int-8-communication',
        category: 'Communication & Tracking',
        description: 'Messaging and application tracking',
        maxPoints: 20,
        requirements: ['Messaging system', 'Application tracking', 'Notifications', 'Status updates']
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
    id: 'int-9',
    name: 'Restaurant Management System',
    description: 'Build a restaurant management system with menu management, order processing, and table reservations.',
    stack: 'fullstack',
    difficulty: 'intermediate',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    estimatedHours: 25,
    maxPoints: 100,
    requirements: [
      'Menu management with categories and pricing',
      'Table reservation system',
      'Order processing and kitchen management',
      'Customer management and loyalty program',
      'Staff management and roles',
      'Sales reporting and analytics',
      'Mobile-friendly interface'
    ],
    gradingCriteria: [
      {
        id: 'int-9-menu',
        category: 'Menu Management',
        description: 'Menu creation and management features',
        maxPoints: 25,
        requirements: ['Menu items', 'Categories', 'Pricing', 'Availability management']
      },
      {
        id: 'int-9-orders',
        category: 'Order Processing',
        description: 'Order management and kitchen operations',
        maxPoints: 30,
        requirements: ['Order taking', 'Kitchen display', 'Order tracking', 'Payment processing']
      },
      {
        id: 'int-9-reservations',
        category: 'Reservation System',
        description: 'Table booking and management',
        maxPoints: 25,
        requirements: ['Table management', 'Reservation booking', 'Availability checking', 'Customer notifications']
      },
      {
        id: 'int-9-management',
        category: 'Business Management',
        description: 'Staff, customer, and analytics features',
        maxPoints: 20,
        requirements: ['Staff management', 'Customer loyalty', 'Sales analytics', 'Reporting']
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
    id: 'int-10',
    name: 'Fitness Tracking App',
    description: 'Create a fitness tracking application with workout plans, progress tracking, and social features.',
    stack: 'fullstack',
    difficulty: 'intermediate',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    estimatedHours: 23,
    maxPoints: 100,
    requirements: [
      'User profiles with fitness goals',
      'Workout plan creation and tracking',
      'Exercise database with instructions',
      'Progress tracking and analytics',
      'Social features and challenges',
      'Nutrition tracking integration',
      'Mobile-responsive design'
    ],
    gradingCriteria: [
      {
        id: 'int-10-workouts',
        category: 'Workout Management',
        description: 'Workout plans and exercise tracking',
        maxPoints: 30,
        requirements: ['Workout plans', 'Exercise database', 'Workout tracking', 'Custom routines']
      },
      {
        id: 'int-10-tracking',
        category: 'Progress Tracking',
        description: 'Fitness progress and analytics',
        maxPoints: 25,
        requirements: ['Progress tracking', 'Analytics dashboard', 'Goal setting', 'Achievement system']
      },
      {
        id: 'int-10-social',
        category: 'Social Features',
        description: 'Community and social interaction',
        maxPoints: 25,
        requirements: ['User profiles', 'Social challenges', 'Friend system', 'Leaderboards']
      },
      {
        id: 'int-10-nutrition',
        category: 'Nutrition & Wellness',
        description: 'Nutrition tracking and wellness features',
        maxPoints: 20,
        requirements: ['Nutrition tracking', 'Meal planning', 'Health metrics', 'Wellness insights']
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
    id: 'int-11',
    name: 'Real Estate Platform',
    description: 'Build a real estate platform with property listings, search filters, and agent management.',
    stack: 'fullstack',
    difficulty: 'intermediate',
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL'],
    estimatedHours: 27,
    maxPoints: 100,
    requirements: [
      'Property listing creation and management',
      'Advanced search with filters and maps',
      'Agent profiles and contact system',
      'Property image galleries and virtual tours',
      'Saved searches and favorites',
      'Mortgage calculator integration',
      'Lead management for agents'
    ],
    gradingCriteria: [
      {
        id: 'int-11-listings',
        category: 'Property Listings',
        description: 'Property management and display',
        maxPoints: 30,
        requirements: ['Property creation', 'Image galleries', 'Property details', 'Listing management']
      },
      {
        id: 'int-11-search',
        category: 'Search & Discovery',
        description: 'Property search and filtering',
        maxPoints: 25,
        requirements: ['Advanced search', 'Map integration', 'Filters', 'Search results']
      },
      {
        id: 'int-11-agents',
        category: 'Agent Management',
        description: 'Agent profiles and lead management',
        maxPoints: 25,
        requirements: ['Agent profiles', 'Contact system', 'Lead management', 'Agent dashboard']
      },
      {
        id: 'int-11-features',
        category: 'Additional Features',
        description: 'Favorites, calculator, and user features',
        maxPoints: 20,
        requirements: ['Saved searches', 'Favorites', 'Mortgage calculator', 'User preferences']
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
    id: 'int-12',
    name: 'Content Management System',
    description: 'Create a flexible CMS with content creation, user management, and customizable themes.',
    stack: 'fullstack',
    difficulty: 'intermediate',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    estimatedHours: 28,
    maxPoints: 100,
    requirements: [
      'Content creation with rich text editor',
      'User roles and permissions system',
      'Customizable themes and layouts',
      'Media library management',
      'SEO optimization tools',
      'Comment system and moderation',
      'Content scheduling and publishing'
    ],
    gradingCriteria: [
      {
        id: 'int-12-content',
        category: 'Content Management',
        description: 'Content creation and editing features',
        maxPoints: 30,
        requirements: ['Rich text editor', 'Content creation', 'Media management', 'Content organization']
      },
      {
        id: 'int-12-users',
        category: 'User Management',
        description: 'User roles and permissions',
        maxPoints: 25,
        requirements: ['User roles', 'Permissions system', 'User management', 'Access control']
      },
      {
        id: 'int-12-themes',
        category: 'Themes & Customization',
        description: 'Theme system and customization',
        maxPoints: 25,
        requirements: ['Theme system', 'Layout customization', 'Design flexibility', 'Template engine']
      },
      {
        id: 'int-12-features',
        category: 'Advanced Features',
        description: 'SEO, comments, and publishing features',
        maxPoints: 20,
        requirements: ['SEO tools', 'Comment system', 'Content scheduling', 'Publishing workflow']
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
    id: 'int-13',
    name: 'Expense Management System',
    description: 'Build a comprehensive expense management system with receipt scanning, approval workflows, and reporting.',
    stack: 'fullstack',
    difficulty: 'intermediate',
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL'],
    estimatedHours: 24,
    maxPoints: 100,
    requirements: [
      'Expense entry with receipt upload',
      'Approval workflow system',
      'Category and project tracking',
      'Mileage and time tracking',
      'Expense reporting and analytics',
      'Integration with accounting systems',
      'Mobile app for expense capture'
    ],
    gradingCriteria: [
      {
        id: 'int-13-expenses',
        category: 'Expense Management',
        description: 'Expense entry and tracking',
        maxPoints: 30,
        requirements: ['Expense entry', 'Receipt upload', 'Category tracking', 'Expense details']
      },
      {
        id: 'int-13-workflow',
        category: 'Approval Workflow',
        description: 'Approval process and workflow management',
        maxPoints: 25,
        requirements: ['Approval workflow', 'Manager approval', 'Status tracking', 'Notification system']
      },
      {
        id: 'int-13-reporting',
        category: 'Reporting & Analytics',
        description: 'Expense reports and analytics',
        maxPoints: 25,
        requirements: ['Expense reports', 'Analytics dashboard', 'Export functionality', 'Data visualization']
      },
      {
        id: 'int-13-integration',
        category: 'Integration & Mobile',
        description: 'System integration and mobile features',
        maxPoints: 20,
        requirements: ['Accounting integration', 'Mobile app', 'API integration', 'Data synchronization']
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
    id: 'int-14',
    name: 'Online Marketplace',
    description: 'Create a multi-vendor marketplace with seller management, product reviews, and commission tracking.',
    stack: 'fullstack',
    difficulty: 'intermediate',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    estimatedHours: 30,
    maxPoints: 100,
    requirements: [
      'Multi-vendor seller registration',
      'Product listing and management',
      'Order processing and fulfillment',
      'Review and rating system',
      'Commission and payment management',
      'Dispute resolution system',
      'Admin dashboard for marketplace management'
    ],
    gradingCriteria: [
      {
        id: 'int-14-vendors',
        category: 'Vendor Management',
        description: 'Seller registration and management',
        maxPoints: 25,
        requirements: ['Seller registration', 'Vendor profiles', 'Product management', 'Seller dashboard']
      },
      {
        id: 'int-14-marketplace',
        category: 'Marketplace Features',
        description: 'Product listings and customer experience',
        maxPoints: 30,
        requirements: ['Product catalog', 'Search and filters', 'Shopping cart', 'Order processing']
      },
      {
        id: 'int-14-payments',
        category: 'Payment & Commission',
        description: 'Payment processing and commission management',
        maxPoints: 25,
        requirements: ['Payment processing', 'Commission tracking', 'Payout system', 'Financial reporting']
      },
      {
        id: 'int-14-management',
        category: 'Platform Management',
        description: 'Reviews, disputes, and admin features',
        maxPoints: 20,
        requirements: ['Review system', 'Dispute resolution', 'Admin dashboard', 'Platform analytics']
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
    id: 'int-15',
    name: 'Customer Support System',
    description: 'Build a customer support platform with ticketing, knowledge base, and live chat features.',
    stack: 'fullstack',
    difficulty: 'intermediate',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
    estimatedHours: 26,
    maxPoints: 100,
    requirements: [
      'Ticket creation and management system',
      'Knowledge base with search functionality',
      'Live chat support with agent assignment',
      'Customer portal for ticket tracking',
      'Agent dashboard with queue management',
      'Automated responses and chatbots',
      'Performance analytics and reporting'
    ],
    gradingCriteria: [
      {
        id: 'int-15-ticketing',
        category: 'Ticketing System',
        description: 'Ticket management and workflow',
        maxPoints: 30,
        requirements: ['Ticket creation', 'Ticket management', 'Status tracking', 'Priority system']
      },
      {
        id: 'int-15-chat',
        category: 'Live Chat',
        description: 'Real-time chat and agent features',
        maxPoints: 25,
        requirements: ['Live chat', 'Agent assignment', 'Chat history', 'Real-time communication']
      },
      {
        id: 'int-15-knowledge',
        category: 'Knowledge Base',
        description: 'Self-service and knowledge management',
        maxPoints: 25,
        requirements: ['Knowledge base', 'Search functionality', 'Article management', 'Self-service portal']
      },
      {
        id: 'int-15-analytics',
        category: 'Analytics & Automation',
        description: 'Performance tracking and automation',
        maxPoints: 20,
        requirements: ['Performance analytics', 'Automated responses', 'Chatbot integration', 'Reporting dashboard']
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
    id: 'int-16',
    name: 'Video Streaming Platform',
    description: 'Create a video streaming platform with content management, user subscriptions, and analytics.',
    stack: 'fullstack',
    difficulty: 'intermediate',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'AWS'],
    estimatedHours: 32,
    maxPoints: 100,
    requirements: [
      'Video upload and processing',
      'Streaming with adaptive bitrate',
      'User subscription management',
      'Content categorization and search',
      'Watch history and recommendations',
      'Comment and rating system',
      'Creator dashboard and analytics'
    ],
    gradingCriteria: [
      {
        id: 'int-16-streaming',
        category: 'Video Streaming',
        description: 'Video upload, processing, and streaming',
        maxPoints: 35,
        requirements: ['Video upload', 'Video processing', 'Streaming player', 'Adaptive bitrate']
      },
      {
        id: 'int-16-content',
        category: 'Content Management',
        description: 'Content organization and discovery',
        maxPoints: 25,
        requirements: ['Content categorization', 'Search functionality', 'Recommendations', 'Playlists']
      },
      {
        id: 'int-16-users',
        category: 'User Management',
        description: 'Subscriptions and user features',
        maxPoints: 25,
        requirements: ['User subscriptions', 'Watch history', 'User profiles', 'Social features']
      },
      {
        id: 'int-16-analytics',
        category: 'Analytics & Creator Tools',
        description: 'Creator dashboard and analytics',
        maxPoints: 15,
        requirements: ['Creator dashboard', 'Video analytics', 'Performance metrics', 'Revenue tracking']
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
    id: 'int-17',
    name: 'Appointment Booking System',
    description: 'Build an appointment booking system with calendar integration, notifications, and payment processing.',
    stack: 'fullstack',
    difficulty: 'intermediate',
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL'],
    estimatedHours: 24,
    maxPoints: 100,
    requirements: [
      'Service provider registration and profiles',
      'Calendar integration and availability management',
      'Appointment booking and confirmation',
      'Payment processing and invoicing',
      'Email and SMS notifications',
      'Customer management and history',
      'Multi-location and staff management'
    ],
    gradingCriteria: [
      {
        id: 'int-17-booking',
        category: 'Booking System',
        description: 'Appointment booking and calendar management',
        maxPoints: 30,
        requirements: ['Appointment booking', 'Calendar integration', 'Availability management', 'Time slot management']
      },
      {
        id: 'int-17-providers',
        category: 'Service Providers',
        description: 'Provider profiles and service management',
        maxPoints: 25,
        requirements: ['Provider profiles', 'Service management', 'Staff scheduling', 'Multi-location support']
      },
      {
        id: 'int-17-payments',
        category: 'Payment & Invoicing',
        description: 'Payment processing and financial management',
        maxPoints: 25,
        requirements: ['Payment processing', 'Invoicing', 'Pricing management', 'Financial reporting']
      },
      {
        id: 'int-17-communication',
        category: 'Communication & Management',
        description: 'Notifications and customer management',
        maxPoints: 20,
        requirements: ['Email notifications', 'SMS alerts', 'Customer management', 'Appointment history']
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
    id: 'int-18',
    name: 'Forum and Community Platform',
    description: 'Create a forum platform with discussion threads, user moderation, and community features.',
    stack: 'fullstack',
    difficulty: 'intermediate',
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL'],
    estimatedHours: 25,
    maxPoints: 100,
    requirements: [
      'User registration and profile management',
      'Forum categories and thread creation',
      'Post creation with rich text editor',
      'Voting and reputation system',
      'Moderation tools and user roles',
      'Search functionality across posts',
      'Real-time notifications'
    ],
    gradingCriteria: [
      {
        id: 'int-18-forum',
        category: 'Forum Features',
        description: 'Core forum functionality',
        maxPoints: 30,
        requirements: ['Thread creation', 'Post management', 'Category organization', 'Rich text editor']
      },
      {
        id: 'int-18-community',
        category: 'Community Features',
        description: 'User interaction and community building',
        maxPoints: 25,
        requirements: ['Voting system', 'Reputation system', 'User profiles', 'Social features']
      },
      {
        id: 'int-18-moderation',
        category: 'Moderation & Management',
        description: 'Content moderation and user management',
        maxPoints: 25,
        requirements: ['Moderation tools', 'User roles', 'Content management', 'Reporting system']
      },
      {
        id: 'int-18-features',
        category: 'Advanced Features',
        description: 'Search, notifications, and additional features',
        maxPoints: 20,
        requirements: ['Search functionality', 'Real-time notifications', 'Thread subscriptions', 'Advanced filtering']
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
    id: 'int-19',
    name: 'Financial Dashboard',
    description: 'Build a personal finance dashboard with expense tracking, budgeting, and investment monitoring.',
    stack: 'fullstack',
    difficulty: 'intermediate',
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL'],
    estimatedHours: 27,
    maxPoints: 100,
    requirements: [
      'Bank account integration and transaction import',
      'Expense categorization and budgeting',
      'Investment portfolio tracking',
      'Financial goal setting and tracking',
      'Bill reminder and payment tracking',
      'Financial reports and analytics',
      'Data visualization with charts'
    ],
    gradingCriteria: [
      {
        id: 'int-19-transactions',
        category: 'Transaction Management',
        description: 'Transaction import and categorization',
        maxPoints: 30,
        requirements: ['Transaction import', 'Categorization', 'Account management', 'Data synchronization']
      },
      {
        id: 'int-19-budgeting',
        category: 'Budgeting & Goals',
        description: 'Budget management and financial goals',
        maxPoints: 25,
        requirements: ['Budget creation', 'Goal setting', 'Progress tracking', 'Spending analysis']
      },
      {
        id: 'int-19-investments',
        category: 'Investment Tracking',
        description: 'Portfolio and investment monitoring',
        maxPoints: 25,
        requirements: ['Portfolio tracking', 'Investment analysis', 'Performance metrics', 'Asset allocation']
      },
      {
        id: 'int-19-reporting',
        category: 'Reporting & Analytics',
        description: 'Financial reports and data visualization',
        maxPoints: 20,
        requirements: ['Financial reports', 'Data visualization', 'Analytics dashboard', 'Trend analysis']
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
    id: 'int-20',
    name: 'Delivery Management System',
    description: 'Create a delivery management platform with route optimization, tracking, and customer notifications.',
    stack: 'fullstack',
    difficulty: 'intermediate',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    estimatedHours: 28,
    maxPoints: 100,
    requirements: [
      'Order management and assignment',
      'Route optimization and planning',
      'Real-time delivery tracking',
      'Driver mobile app integration',
      'Customer notification system',
      'Proof of delivery capture',
      'Analytics and performance reporting'
    ],
    gradingCriteria: [
      {
        id: 'int-20-orders',
        category: 'Order Management',
        description: 'Order processing and assignment',
        maxPoints: 25,
        requirements: ['Order management', 'Driver assignment', 'Order tracking', 'Status updates']
      },
      {
        id: 'int-20-routing',
        category: 'Route Optimization',
        description: 'Route planning and optimization',
        maxPoints: 30,
        requirements: ['Route optimization', 'GPS integration', 'Route planning', 'Distance calculation']
      },
      {
        id: 'int-20-tracking',
        category: 'Real-time Tracking',
        description: 'Live tracking and notifications',
        maxPoints: 25,
        requirements: ['Real-time tracking', 'Customer notifications', 'ETA calculations', 'Location updates']
      },
      {
        id: 'int-20-mobile',
        category: 'Mobile & Analytics',
        description: 'Driver app and performance analytics',
        
        maxPoints: 20,
        requirements: ['Driver mobile app', 'Proof of delivery', 'Performance analytics', 'Reporting dashboard']
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
  }
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
  },
  {
    id: 'adv-2',
    name: 'Enterprise CRM Platform',
    description: 'Create a comprehensive CRM system with sales pipeline, marketing automation, and advanced analytics.',
    stack: 'fullstack',
    difficulty: 'advanced',
    technologies: ['React', 'Node.js', 'GraphQL', 'PostgreSQL', 'Redis', 'Elasticsearch'],
    estimatedHours: 45,
    maxPoints: 100,
    requirements: [
      'Advanced contact and lead management',
      'Sales pipeline with automation',
      'Email marketing campaigns',
      'Advanced reporting and analytics',
      'Integration with third-party services',
      'Role-based access control',
      'Real-time collaboration features',
      'Mobile application',
      'API for external integrations',
      'Data import/export capabilities'
    ],
    gradingCriteria: [
      {
        id: 'adv-2-crm',
        category: 'CRM Core Features',
        description: 'Contact management and sales pipeline',
        maxPoints: 30,
        requirements: ['Contact management', 'Lead tracking', 'Sales pipeline', 'Opportunity management']
      },
      {
        id: 'adv-2-automation',
        category: 'Marketing Automation',
        description: 'Email campaigns and automation workflows',
        maxPoints: 25,
        requirements: ['Email campaigns', 'Automation workflows', 'Lead scoring', 'Campaign analytics']
      },
      {
        id: 'adv-2-analytics',
        category: 'Analytics & Reporting',
        description: 'Advanced analytics and business intelligence',
        maxPoints: 25,
        requirements: ['Advanced reporting', 'Data visualization', 'Business intelligence', 'Performance metrics']
      },
      {
        id: 'adv-2-integration',
        category: 'Integration & API',
        description: 'Third-party integrations and API development',
        maxPoints: 20,
        requirements: ['API development', 'Third-party integrations', 'Data synchronization', 'Webhook support']
      }
    ],
    folderStructure: {
      'client': {
        'src': {},
        'package.json': ''
      },
      'server': {
        'src': {},
        'package.json': ''
      },
      'mobile': {
        'src': {},
        'package.json': ''
      },
      'api': {
        'src': {},
        'package.json': ''
      },
      'docker-compose.yml': '',
      'README.md': ''
    }
  },
  {
    id: 'adv-3',
    name: 'Real-time Trading Platform',
    description: 'Build a sophisticated trading platform with real-time market data, portfolio management, and risk analysis.',
    stack: 'fullstack',
    difficulty: 'advanced',
    technologies: ['React', 'Node.js', 'WebSocket', 'Redis', 'PostgreSQL', 'Python'],
    estimatedHours: 55,
    maxPoints: 100,
    requirements: [
      'Real-time market data streaming',
      'Order management and execution',
      'Portfolio tracking and analysis',
      'Risk management tools',
      'Advanced charting and technical analysis',
      'Algorithmic trading support',
      'Compliance and audit trails',
      'Multi-asset class support',
      'Performance analytics',
      'Mobile trading application'
    ],
    gradingCriteria: [
      {
        id: 'adv-3-trading',
        category: 'Trading Engine',
        description: 'Order management and execution system',
        maxPoints: 30,
        requirements: ['Order management', 'Trade execution', 'Market data integration', 'Real-time processing']
      },
      {
        id: 'adv-3-portfolio',
        category: 'Portfolio Management',
        description: 'Portfolio tracking and analysis',
        maxPoints: 25,
        requirements: ['Portfolio tracking', 'Performance analysis', 'Asset allocation', 'Risk metrics']
      },
      {
        id: 'adv-3-analytics',
        category: 'Analytics & Charting',
        description: 'Advanced analytics and visualization',
        maxPoints: 25,
        requirements: ['Advanced charting', 'Technical analysis', 'Market analytics', 'Data visualization']
      },
      {
        id: 'adv-3-infrastructure',
        category: 'Infrastructure & Performance',
        description: 'System performance and scalability',
        maxPoints: 20,
        requirements: ['Real-time data streaming', 'High-frequency processing', 'System reliability', 'Performance optimization']
      }
    ],
    folderStructure: {
      'client': {
        'src': {},
        'package.json': ''
      },
      'server': {
        'src': {},
        'package.json': ''
      },
      'trading-engine': {
        'src': {},
        'package.json': ''
      },
      'analytics': {
        'src': {},
        'requirements.txt': ''
      },
      'docker-compose.yml': '',
      'README.md': ''
    }
  },
  {
    id: 'adv-4',
    name: 'Healthcare Management System',
    description: 'Create a comprehensive healthcare platform with patient records, appointment scheduling, and telemedicine features.',
    stack: 'fullstack',
    difficulty: 'advanced',
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'WebRTC', 'FHIR'],
    estimatedHours: 48,
    maxPoints: 100,
    requirements: [
      'Electronic health records (EHR) system',
      'Appointment scheduling and management',
      'Telemedicine video consultations',
      'Prescription management',
      'Medical billing and insurance',
      'HIPAA compliance and security',
      'Patient portal and mobile app',
      'Provider dashboard and tools',
      'Medical imaging integration',
      'Reporting and analytics'
    ],
    gradingCriteria: [
      {
        id: 'adv-4-ehr',
        category: 'Electronic Health Records',
        description: 'Patient data management and EHR system',
        maxPoints: 30,
        requirements: ['Patient records', 'Medical history', 'Data security', 'FHIR compliance']
      },
      {
        id: 'adv-4-telemedicine',
        category: 'Telemedicine Features',
        description: 'Video consultations and remote care',
        maxPoints: 25,
        requirements: ['Video consultations', 'Appointment scheduling', 'Remote monitoring', 'Digital prescriptions']
      },
      {
        id: 'adv-4-compliance',
        category: 'Security & Compliance',
        description: 'HIPAA compliance and data security',
        maxPoints: 25,
        requirements: ['HIPAA compliance', 'Data encryption', 'Access controls', 'Audit trails']
      },
      {
        id: 'adv-4-integration',
        category: 'Integration & Analytics',
        description: 'System integration and healthcare analytics',
        maxPoints: 20,
        requirements: ['Medical device integration', 'Insurance systems', 'Healthcare analytics', 'Reporting tools']
      }
    ],
    folderStructure: {
      'client': {
        'src': {},
        'package.json': ''
      },
      'server': {
        'src': {},
        'package.json': ''
      },
      'telemedicine': {
        'src': {},
        'package.json': ''
      },
      'mobile': {
        'src': {},
        'package.json': ''
      },
      'docker-compose.yml': '',
      'README.md': ''
    }
  },
  {
    id: 'adv-5',
    name: 'IoT Device Management Platform',
    description: 'Build an IoT platform for device management, data collection, and real-time monitoring with edge computing.',
    stack: 'fullstack',
    difficulty: 'advanced',
    technologies: ['React', 'Node.js', 'MQTT', 'InfluxDB', 'Docker', 'Kubernetes'],
    estimatedHours: 52,
    maxPoints: 100,
    requirements: [
      'Device registration and management',
      'Real-time data collection and streaming',
      'Edge computing and data processing',
      'Device firmware over-the-air updates',
      'Alerting and notification system',
      'Data visualization and dashboards',
      'Scalable cloud infrastructure',
      'Security and device authentication',
      'API for third-party integrations',
      'Mobile device management app'
    ],
    gradingCriteria: [
      {
        id: 'adv-5-devices',
        category: 'Device Management',
        description: 'IoT device registration and management',
        maxPoints: 25,
        requirements: ['Device registration', 'Device monitoring', 'Firmware updates', 'Device authentication']
      },
      {
        id: 'adv-5-data',
        category: 'Data Processing',
        description: 'Real-time data collection and processing',
        maxPoints: 30,
        requirements: ['Data streaming', 'Real-time processing', 'Edge computing', 'Data storage']
      },
      {
        id: 'adv-5-visualization',
        category: 'Visualization & Analytics',
        description: 'Data visualization and analytics platform',
        maxPoints: 25,
        requirements: ['Real-time dashboards', 'Data visualization', 'Analytics tools', 'Alerting system']
      },
      {
        id: 'adv-5-infrastructure',
        category: 'Infrastructure & Scalability',
        description: 'Cloud infrastructure and scalability',
        maxPoints: 20,
        requirements: ['Scalable architecture', 'Cloud deployment', 'Security implementation', 'API development']
      }
    ],
    folderStructure: {
      'client': {
        'src': {},
        'package.json': ''
      },
      'server': {
        'src': {},
        'package.json': ''
      },
      'edge-computing': {
        'src': {},
        'package.json': ''
      },
      'device-simulator': {
        'src': {},
        'package.json': ''
      },
      'kubernetes': {},
      'docker-compose.yml': '',
      'README.md': ''
    }
  },
  {
    id: 'adv-6',
    name: 'Blockchain-based Supply Chain',
    description: 'Create a supply chain management system using blockchain for transparency, traceability, and smart contracts.',
    stack: 'fullstack',
    difficulty: 'advanced',
    technologies: ['React', 'Node.js', 'Ethereum', 'Solidity', 'Web3.js', 'IPFS'],
    estimatedHours: 60,
    maxPoints: 100,
    requirements: [
      'Blockchain network setup and smart contracts',
      'Product tracking and traceability',
      'Supplier and manufacturer management',
      'Smart contract automation',
      'Decentralized file storage (IPFS)',
      'Cryptocurrency payment integration',
      'Audit trail and transparency features',
      'Mobile app for stakeholders',
      'Analytics and reporting dashboard',
      'Integration with existing ERP systems'
    ],
    gradingCriteria: [
      {
        id: 'adv-6-blockchain',
        category: 'Blockchain Implementation',
        description: 'Smart contracts and blockchain integration',
        maxPoints: 35,
        requirements: ['Smart contracts', 'Blockchain integration', 'Web3 implementation', 'Cryptocurrency payments']
      },
      {
        id: 'adv-6-supply-chain',
        category: 'Supply Chain Features',
        description: 'Product tracking and supply chain management',
        maxPoints: 30,
        requirements: ['Product tracking', 'Supplier management', 'Traceability', 'Inventory management']
      },
      {
        id: 'adv-6-transparency',
        category: 'Transparency & Audit',
        description: 'Audit trails and transparency features',
        maxPoints: 20,
        requirements: ['Audit trails', 'Transparency features', 'Data verification', 'Compliance tracking']
      },
      {
        id: 'adv-6-integration',
        category: 'Integration & Analytics',
        description: 'System integration and analytics',
        maxPoints: 15,
        requirements: ['ERP integration', 'Analytics dashboard', 'Reporting tools', 'API development']
      }
    ],
    folderStructure: {
      'client': {
        'src': {},
        'package.json': ''
      },
      'server': {
        'src': {},
        'package.json': ''
      },
      'smart-contracts': {
        'contracts': {},
        'migrations': {},
        'truffle-config.js': ''
      },
      'mobile': {
        'src': {},
        'package.json': ''
      },
      'README.md': ''
    }
  },
  {
    id: 'adv-7',
    name: 'AI-Powered Content Platform',
    description: 'Build a content management platform with AI-driven content generation, optimization, and personalization.',
    stack: 'fullstack',
    difficulty: 'advanced',
    technologies: ['React', 'Node.js', 'Python', 'TensorFlow', 'OpenAI API', 'Elasticsearch'],
    estimatedHours: 46,
    maxPoints: 100,
    requirements: [
      'AI content generation and editing',
      'Automated content optimization',
      'Personalized content recommendations',
      'Multi-language content support',
      'SEO optimization with AI insights',
      'Content performance analytics',
      'Collaborative editing platform',
      'Version control and workflow management',
      'API for headless CMS functionality',
      'Advanced search and content discovery'
    ],
    gradingCriteria: [
      {
        id: 'adv-7-ai',
        category: 'AI Integration',
        description: 'AI-powered content features',
        maxPoints: 35,
        requirements: ['Content generation', 'Content optimization', 'Personalization', 'AI recommendations']
      },
      {
        id: 'adv-7-cms',
        category: 'Content Management',
        description: 'Core CMS functionality',
        maxPoints: 25,
        requirements: ['Content creation', 'Workflow management', 'Version control', 'Collaborative editing']
      },
      {
        id: 'adv-7-optimization',
        category: 'SEO & Performance',
        description: 'SEO optimization and performance analytics',
        maxPoints: 25,
        requirements: ['SEO optimization', 'Performance analytics', 'Content insights', 'Search functionality']
      },
      {
        id: 'adv-7-api',
        category: 'API & Integration',
        description: 'Headless CMS API and integrations',
        maxPoints: 15,
        requirements: ['Headless API', 'Third-party integrations', 'Multi-channel publishing', 'Developer tools']
      }
    ],
    folderStructure: {
      'client': {
        'src': {},
        'package.json': ''
      },
      'server': {
        'src': {},
        'package.json': ''
      },
      'ai-service': {
        'src': {},
        'requirements.txt': ''
      },
      'api': {
        'src': {},
        'package.json': ''
      },
      'docker-compose.yml': '',
      'README.md': ''
    }
  },
  {
    id: 'adv-8',
    name: 'Multi-tenant SaaS Platform',
    description: 'Create a scalable multi-tenant SaaS platform with tenant isolation, billing, and white-label capabilities.',
    stack: 'fullstack',
    difficulty: 'advanced',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
    estimatedHours: 50,
    maxPoints: 100,
    requirements: [
      'Multi-tenant architecture with data isolation',
      'Tenant onboarding and provisioning',
      'Subscription billing and payment processing',
      'White-label and customization features',
      'Role-based access control per tenant',
      'Usage analytics and monitoring',
      'API rate limiting and quotas',
      'Automated scaling and load balancing',
      'Tenant-specific configurations',
      'Admin dashboard for platform management'
    ],
    gradingCriteria: [
      {
        id: 'adv-8-architecture',
        category: 'Multi-tenant Architecture',
        description: 'Tenant isolation and architecture design',
        maxPoints: 30,
        requirements: ['Data isolation', 'Tenant provisioning', 'Scalable architecture', 'Security isolation']
      },
      {
        id: 'adv-8-billing',
        category: 'Billing & Subscriptions',
        description: 'Subscription management and billing system',
        maxPoints: 25,
        requirements: ['Subscription billing', 'Payment processing', 'Usage tracking', 'Pricing models']
      },
      {
        id: 'adv-8-customization',
        category: 'Customization & White-label',
        description: 'Tenant customization and white-label features',
        maxPoints: 25,
        requirements: ['White-label capabilities', 'Tenant customization', 'Branding options', 'Configuration management']
      },
      {
        id: 'adv-8-operations',
        category: 'Operations & Monitoring',
        description: 'Platform operations and monitoring',
        maxPoints: 20,
        requirements: ['Usage analytics', 'Performance monitoring', 'Admin dashboard', 'Automated scaling']
      }
    ],
    folderStructure: {
      'client': {
        'src': {},
        'package.json': ''
      },
      'server': {
        'src': {},
        'package.json': ''
      },
      'admin-dashboard': {
        'src': {},
        'package.json': ''
      },
      'billing-service': {
        'src': {},
        'package.json': ''
      },
      'kubernetes': {},
      'docker-compose.yml': '',
      'README.md': ''
    }
  },
  {
    id: 'adv-9',
    name: 'Real-time Collaboration Suite',
    description: 'Build a comprehensive collaboration platform with document editing, video conferencing, and project management.',
    stack: 'fullstack',
    difficulty: 'advanced',
    technologies: ['React', 'Node.js', 'WebRTC', 'Socket.io', 'Operational Transform', 'Redis'],
    estimatedHours: 48,
    maxPoints: 100,
    requirements: [
      'Real-time collaborative document editing',
      'Video conferencing with screen sharing',
      'Project management with kanban boards',
      'File sharing and version control',
      'Real-time chat and messaging',
      'Calendar integration and scheduling',
      'Notification system across all features',
      'Mobile applications for all platforms',
      'Offline synchronization capabilities',
      'Advanced permission and sharing controls'
    ],
    gradingCriteria: [
      {
        id: 'adv-9-collaboration',
        category: 'Real-time Collaboration',
        description: 'Document editing and real-time features',
        maxPoints: 35,
        requirements: ['Real-time editing', 'Operational transform', 'Conflict resolution', 'Synchronization']
      },
      {
        id: 'adv-9-communication',
        category: 'Communication Features',
        description: 'Video conferencing and messaging',
        maxPoints: 25,
        requirements: ['Video conferencing', 'Screen sharing', 'Real-time chat', 'Voice communication']
      },
      {
        id: 'adv-9-project',
        category: 'Project Management',
        description: 'Project management and organization tools',
        maxPoints: 25,
        requirements: ['Project management', 'Kanban boards', 'Task management', 'File organization']
      },
      {
        id: 'adv-9-sync',
        category: 'Synchronization & Mobile',
        description: 'Offline sync and mobile applications',
        maxPoints: 15,
        requirements: ['Offline synchronization', 'Mobile applications', 'Cross-platform support', 'Data consistency']
      }
    ],
    folderStructure: {
      'client': {
        'src': {},
        'package.json': ''
      },
      'server': {
        'src': {},
        'package.json': ''
      },
      'mobile': {
        'src': {},
        'package.json': ''
      },
      'collaboration-engine': {
        'src': {},
        'package.json': ''
      },
      'docker-compose.yml': '',
      'README.md': ''
    }
  },
  {
    id: 'adv-10',
    name: 'Distributed Data Analytics Platform',
    description: 'Create a big data analytics platform with distributed processing, machine learning, and real-time insights.',
    stack: 'fullstack',
    difficulty: 'advanced',
    technologies: ['React', 'Node.js', 'Apache Kafka', 'Apache Spark', 'Python', 'Elasticsearch'],
    estimatedHours: 55,
    maxPoints: 100,
    requirements: [
      'Distributed data ingestion and processing',
      'Real-time stream processing',
      'Machine learning model deployment',
      'Interactive data visualization',
      'Automated report generation',
      'Data pipeline orchestration',
      'Scalable storage and retrieval',
      'API for data access and queries',
      'Data governance and lineage tracking',
      'Performance monitoring and optimization'
    ],
    gradingCriteria: [
      {
        id: 'adv-10-processing',
        category: 'Data Processing',
        description: 'Distributed data processing and streaming',
        maxPoints: 30,
        requirements: ['Distributed processing', 'Stream processing', 'Data pipelines', 'Scalable architecture']
      },
      {
        id: 'adv-10-ml',
        category: 'Machine Learning',
        description: 'ML model deployment and analytics',
        maxPoints: 25,
        requirements: ['ML model deployment', 'Predictive analytics', 'Model management', 'Automated insights']
      },
      {
        id: 'adv-10-visualization',
        category: 'Visualization & Reporting',
        description: 'Data visualization and reporting tools',
        maxPoints: 25,
        requirements: ['Interactive dashboards', 'Data visualization', 'Report generation', 'Real-time insights']
      },
      {
        id: 'adv-10-infrastructure',
        category: 'Infrastructure & Performance',
        description: 'System infrastructure and optimization',
        maxPoints: 20,
        requirements: ['Scalable infrastructure', 'Performance optimization', 'Data governance', 'Monitoring tools']
      }
    ],
    folderStructure: {
      'client': {
        'src': {},
        'package.json': ''
      },
      'server': {
        'src': {},
        'package.json': ''
      },
      'data-processing': {
        'src': {},
        'requirements.txt': ''
      },
      'ml-service': {
        'src': {},
        'requirements.txt': ''
      },
      'docker-compose.yml': '',
      'kubernetes': {},
      'README.md': ''
    }
  },
  {
    id: 'adv-11',
    name: 'Cybersecurity Operations Center',
    description: 'Build a comprehensive SOC platform with threat detection, incident response, and security analytics.',
    stack: 'fullstack',
    difficulty: 'advanced',
    technologies: ['React', 'Node.js', 'Python', 'Elasticsearch', 'Kibana', 'Docker'],
    estimatedHours: 52,
    maxPoints: 100,
    requirements: [
      'Real-time threat detection and monitoring',
      'Incident response workflow management',
      'Security information and event management (SIEM)',
      'Vulnerability assessment and scanning',
      'Threat intelligence integration',
      'Automated response and remediation',
      'Compliance reporting and auditing',
      'Network traffic analysis',
      'User behavior analytics',
      'Security dashboard and alerting'
    ],
    gradingCriteria: [
      {
        id: 'adv-11-detection',
        category: 'Threat Detection',
        description: 'Real-time threat detection and monitoring',
        maxPoints: 30,
        requirements: ['Threat detection', 'Real-time monitoring', 'Anomaly detection', 'Alert management']
      },
      {
        id: 'adv-11-response',
        category: 'Incident Response',
        description: 'Incident response and workflow management',
        maxPoints: 25,
        requirements: ['Incident response', 'Workflow management', 'Automated remediation', 'Case management']
      },
      {
        id: 'adv-11-analytics',
        category: 'Security Analytics',
        description: 'Security analytics and intelligence',
        maxPoints: 25,
        requirements: ['Security analytics', 'Threat intelligence', 'Behavioral analysis', 'Risk assessment']
      },
      {
        id: 'adv-11-compliance',
        category: 'Compliance & Reporting',
        description: 'Compliance management and reporting',
        maxPoints: 20,
        requirements: ['Compliance reporting', 'Audit trails', 'Regulatory compliance', 'Security metrics']
      }
    ],
    folderStructure: {
      'client': {
        'src': {},
        'package.json': ''
      },
      'server': {
        'src': {},
        'package.json': ''
      },
      'detection-engine': {
        'src': {},
        'requirements.txt': ''
      },
      'analytics': {
        'src': {},
        'requirements.txt': ''
      },
      'docker-compose.yml': '',
      'README.md': ''
    }
  },
  {
    id: 'adv-12',
    name: 'Autonomous Vehicle Fleet Management',
    description: 'Create a fleet management system for autonomous vehicles with route optimization, predictive maintenance, and safety monitoring.',
    stack: 'fullstack',
    difficulty: 'advanced',
    technologies: ['React', 'Node.js', 'Python', 'TensorFlow', 'MQTT', 'PostgreSQL'],
    estimatedHours: 58,
    maxPoints: 100,
    requirements: [
      'Real-time vehicle tracking and monitoring',
      'Autonomous route planning and optimization',
      'Predictive maintenance using ML',
      'Safety monitoring and incident detection',
      'Fleet performance analytics',
      'Remote vehicle control and updates',
      'Passenger management and booking',
      'Regulatory compliance and reporting',
      'Integration with traffic management systems',
      'Emergency response coordination'
    ],
    gradingCriteria: [
      {
        id: 'adv-12-tracking',
        category: 'Vehicle Tracking',
        description: 'Real-time tracking and monitoring',
        maxPoints: 25,
        requirements: ['Real-time tracking', 'Vehicle monitoring', 'Telemetry data', 'Status reporting']
      },
      {
        id: 'adv-12-autonomous',
        category: 'Autonomous Features',
        description: 'Route planning and autonomous operations',
        maxPoints: 30,
        requirements: ['Route optimization', 'Autonomous navigation', 'Traffic integration', 'Decision making']
      },
      {
        id: 'adv-12-maintenance',
        category: 'Predictive Maintenance',
        description: 'ML-based maintenance and safety monitoring',
        maxPoints: 25,
        requirements: ['Predictive maintenance', 'Safety monitoring', 'Incident detection', 'Performance analytics']
      },
      {
        id: 'adv-12-management',
        category: 'Fleet Management',
        description: 'Fleet operations and passenger management',
        maxPoints: 20,
        requirements: ['Fleet operations', 'Passenger management', 'Booking system', 'Emergency response']
      }
    ],
    folderStructure: {
      'client': {
        'src': {},
        'package.json': ''
      },
      'server': {
        'src': {},
        'package.json': ''
      },
      'ml-service': {
        'src': {},
        'requirements.txt': ''
      },
      'vehicle-simulator': {
        'src': {},
        'package.json': ''
      },
      'docker-compose.yml': '',
      'README.md': ''
    }
  },
  {
    id: 'adv-13',
    name: 'Smart City Infrastructure Platform',
    description: 'Build a comprehensive smart city platform integrating IoT sensors, traffic management, and citizen services.',
    stack: 'fullstack',
    difficulty: 'advanced',
    technologies: ['React', 'Node.js', 'Python', 'MQTT', 'InfluxDB', 'GIS'],
    estimatedHours: 54,
    maxPoints: 100,
    requirements: [
      'IoT sensor network management',
      'Traffic flow optimization',
      'Environmental monitoring and alerts',
      'Citizen service portal',
      'Emergency response coordination',
      'Energy management and optimization',
      'Public transportation integration',
      'Data analytics and city insights',
      'Mobile app for citizens',
      'Integration with government systems'
    ],
    gradingCriteria: [
      {
        id: 'adv-13-iot',
        category: 'IoT Integration',
        description: 'IoT sensor network and data collection',
        maxPoints: 30,
        requirements: ['IoT sensor management', 'Data collection', 'Real-time monitoring', 'Device management']
      },
      {
        id: 'adv-13-services',
        category: 'City Services',
        description: 'Traffic, environment, and citizen services',
        maxPoints: 25,
        requirements: ['Traffic management', 'Environmental monitoring', 'Citizen services', 'Emergency response']
      },
      {
        id: 'adv-13-analytics',
        category: 'Analytics & Insights',
        description: 'City analytics and optimization',
        maxPoints: 25,
        requirements: ['City analytics', 'Performance insights', 'Optimization algorithms', 'Predictive modeling']
      },
      {
        id: 'adv-13-integration',
        category: 'System Integration',
        description: 'Government and transportation integration',
        maxPoints: 20,
        requirements: ['Government integration', 'Transportation systems', 'Mobile applications', 'API development']
      }
    ],
    folderStructure: {
      'client': {
        'src': {},
        'package.json': ''
      },
      'server': {
        'src': {},
        'package.json': ''
      },
      'iot-service': {
        'src': {},
        'package.json': ''
      },
      'analytics': {
        'src': {},
        'requirements.txt': ''
      },
      'mobile': {
        'src': {},
        'package.json': ''
      },
      'docker-compose.yml': '',
      'README.md': ''
    }
  },
  {
    id: 'adv-14',
    name: 'Quantum Computing Simulation Platform',
    description: 'Create a quantum computing simulation and development platform with circuit design and algorithm testing.',
    stack: 'fullstack',
    difficulty: 'advanced',
    technologies: ['React', 'Node.js', 'Python', 'Qiskit', 'NumPy', 'WebGL'],
    estimatedHours: 60,
    maxPoints: 100,
    requirements: [
      'Quantum circuit design interface',
      'Quantum algorithm simulation',
      'Quantum state visualization',
      'Educational quantum computing modules',
      'Performance benchmarking tools',
      'Quantum error correction simulation',
      'Integration with real quantum hardware',
      'Collaborative research features',
      'Quantum programming language support',
      'Advanced quantum algorithm library'
    ],
    gradingCriteria: [
      {
        id: 'adv-14-simulation',
        category: 'Quantum Simulation',
        description: 'Quantum circuit simulation and execution',
        maxPoints: 35,
        requirements: ['Circuit simulation', 'Quantum algorithms', 'State management', 'Performance optimization']
      },
      {
        id: 'adv-14-interface',
        category: 'User Interface',
        description: 'Circuit design and visualization interface',
        maxPoints: 25,
        requirements: ['Circuit designer', 'State visualization', 'Interactive interface', 'Educational tools']
      },
      {
        id: 'adv-14-algorithms',
        category: 'Algorithm Library',
        description: 'Quantum algorithm implementation and testing',
        maxPoints: 25,
        requirements: ['Algorithm library', 'Testing framework', 'Benchmarking tools', 'Error correction']
      },
      {
        id: 'adv-14-integration',
        category: 'Hardware Integration',
        description: 'Real quantum hardware integration',
        maxPoints: 15,
        requirements: ['Hardware integration', 'Cloud quantum access', 'Collaborative features', 'Research tools']
      }
    ],
    folderStructure: {
      'client': {
        'src': {},
        'package.json': ''
      },
      'server': {
        'src': {},
        'package.json': ''
      },
      'quantum-simulator': {
        'src': {},
        'requirements.txt': ''
      },
      'algorithm-library': {
        'src': {},
        'requirements.txt': ''
      },
      'docker-compose.yml': '',
      'README.md': ''
    }
  },
  {
    id: 'adv-15',
    name: 'Decentralized Social Network',
    description: 'Build a decentralized social media platform using blockchain technology with content ownership and privacy.',
    stack: 'fullstack',
    difficulty: 'advanced',
    technologies: ['React', 'Node.js', 'Ethereum', 'IPFS', 'Web3.js', 'Solidity'],
    estimatedHours: 56,
    maxPoints: 100,
    requirements: [
      'Decentralized user identity and authentication',
      'Content publishing on blockchain',
      'Peer-to-peer content distribution',
      'Cryptocurrency-based monetization',
      'Decentralized governance and voting',
      'Privacy-preserving features',
      'Content moderation through consensus',
      'Cross-platform mobile applications',
      'Integration with existing social platforms',
      'Decentralized storage and backup'
    ],
    gradingCriteria: [
      {
        id: 'adv-15-blockchain',
        category: 'Blockchain Integration',
        description: 'Decentralized architecture and blockchain features',
        maxPoints: 35,
        requirements: ['Decentralized identity', 'Blockchain integration', 'Smart contracts', 'Cryptocurrency features']
      },
      {
        id: 'adv-15-social',
        category: 'Social Features',
        description: 'Social networking and content features',
        maxPoints: 25,
        requirements: ['Content publishing', 'Social interactions', 'User profiles', 'Community features']
      },
      {
        id: 'adv-15-privacy',
        category: 'Privacy & Security',
        description: 'Privacy protection and security measures',
        maxPoints: 25,
        requirements: ['Privacy features', 'Data encryption', 'User control', 'Security protocols']
      },
      {
        id: 'adv-15-governance',
        category: 'Governance & Moderation',
        description: 'Decentralized governance and content moderation',
        maxPoints: 15,
        requirements: ['Decentralized governance', 'Content moderation', 'Community voting', 'Consensus mechanisms']
      }
    ],
    folderStructure: {
      'client': {
        'src': {},
        'package.json': ''
      },
      'server': {
        'src': {},
        'package.json': ''
      },
      'smart-contracts': {
        'contracts': {},
        'migrations': {},
        'truffle-config.js': ''
      },
      'mobile': {
        'src': {},
        'package.json': ''
      },
      'README.md': ''
    }
  },
  {
    id: 'adv-16',
    name: 'Advanced Robotics Control System',
    description: 'Create a comprehensive robotics control platform with AI navigation, task automation, and fleet coordination.',
    stack: 'fullstack',
    difficulty: 'advanced',
    technologies: ['React', 'Node.js', 'Python', 'ROS', 'TensorFlow', 'WebRTC'],
    estimatedHours: 62,
    maxPoints: 100,
    requirements: [
      'Robot fleet management and coordination',
      'AI-powered navigation and path planning',
      'Task automation and scheduling',
      'Real-time robot monitoring and control',
      'Computer vision and object recognition',
      'Human-robot interaction interface',
      'Predictive maintenance for robots',
      'Safety monitoring and emergency protocols',
      'Integration with warehouse management systems',
      'Remote operation and telepresence'
    ],
    gradingCriteria: [
      {
        id: 'adv-16-control',
        category: 'Robot Control',
        description: 'Robot control and fleet management',
        maxPoints: 30,
        requirements: ['Fleet management', 'Robot control', 'Task coordination', 'Real-time monitoring']
      },
      {
        id: 'adv-16-ai',
        category: 'AI & Navigation',
        description: 'AI-powered navigation and automation',
        maxPoints: 30,
        requirements: ['AI navigation', 'Path planning', 'Computer vision', 'Autonomous operation']
      },
      {
        id: 'adv-16-interaction',
        category: 'Human-Robot Interaction',
        description: 'User interface and interaction systems',
        maxPoints: 25,
        requirements: ['User interface', 'Remote control', 'Telepresence', 'Safety protocols']
      },
      {
        id: 'adv-16-integration',
        category: 'System Integration',
        description: 'Integration with external systems',
        maxPoints: 15,
        requirements: ['System integration', 'Warehouse systems', 'Predictive maintenance', 'Performance analytics']
      }
    ],
    folderStructure: {
      'client': {
        'src': {},
        'package.json': ''
      },
      'server': {
        'src': {},
        'package.json': ''
      },
      'robot-control': {
        'src': {},
        'requirements.txt': ''
      },
      'ai-service': {
        'src': {},
        'requirements.txt': ''
      },
      'simulator': {
        'src': {},
        'package.json': ''
      },
      'docker-compose.yml': '',
      'README.md': ''
    }
  },
  {
    id: 'adv-17',
    name: 'Space Mission Control System',
    description: 'Build a mission control platform for space operations with satellite tracking, telemetry, and mission planning.',
    stack: 'fullstack',
    difficulty: 'advanced',
    technologies: ['React', 'Node.js', 'Python', 'WebGL', 'Real-time Data', 'GIS'],
    estimatedHours: 58,
    maxPoints: 100,
    requirements: [
      'Real-time satellite tracking and visualization',
      'Telemetry data processing and analysis',
      'Mission planning and trajectory calculation',
      'Ground station network management',
      'Spacecraft health monitoring',
      'Communication protocol handling',
      'Orbital mechanics simulation',
      'Emergency response procedures',
      'Data archival and historical analysis',
      'Integration with space agency systems'
    ],
    gradingCriteria: [
      {
        id: 'adv-17-tracking',
        category: 'Satellite Tracking',
        description: 'Real-time tracking and visualization',
        maxPoints: 30,
        requirements: ['Satellite tracking', '3D visualization', 'Orbital calculations', 'Real-time updates']
      },
      {
        id: 'adv-17-telemetry',
        category: 'Telemetry & Monitoring',
        description: 'Data processing and spacecraft monitoring',
        maxPoints: 25,
        requirements: ['Telemetry processing', 'Health monitoring', 'Data analysis', 'Alert systems']
      },
      {
        id: 'adv-17-mission',
        category: 'Mission Planning',
        description: 'Mission planning and trajectory calculation',
        maxPoints: 25,
        requirements: ['Mission planning', 'Trajectory calculation', 'Orbital mechanics', 'Simulation tools']
      },
      {
        id: 'adv-17-operations',
        category: 'Operations & Integration',
        description: 'Ground operations and system integration',
        maxPoints: 20,
        requirements: ['Ground station management', 'Communication protocols', 'Emergency procedures', 'System integration']
      }
    ],
    folderStructure: {
      'client': {
        'src': {},
        'package.json': ''
      },
      'server': {
        'src': {},
        'package.json': ''
      },
      'telemetry-service': {
        'src': {},
        'requirements.txt': ''
      },
      'orbital-mechanics': {
        'src': {},
        'requirements.txt': ''
      },
      'visualization': {
        'src': {},
        'package.json': ''
      },
      'docker-compose.yml': '',
      'README.md': ''
    }
  },
  {
    id: 'adv-18',
    name: 'Bioinformatics Research Platform',
    description: 'Create a comprehensive bioinformatics platform for genomic analysis, protein modeling, and drug discovery.',
    stack: 'fullstack',
    difficulty: 'advanced',
    technologies: ['React', 'Node.js', 'Python', 'BioPython', 'TensorFlow', 'PostgreSQL'],
    estimatedHours: 55,
    maxPoints: 100,
    requirements: [
      'Genomic sequence analysis and alignment',
      'Protein structure prediction and modeling',
      'Drug discovery and molecular docking',
      'Phylogenetic tree construction',
      'Gene expression analysis',
      'Collaborative research workspace',
      'High-performance computing integration',
      'Bioinformatics workflow automation',
      'Data visualization and reporting',
      'Integration with biological databases'
    ],
    gradingCriteria: [
      {
        id: 'adv-18-genomics',
        category: 'Genomic Analysis',
        description: 'Genomic sequence analysis and processing',
        maxPoints: 30,
        requirements: ['Sequence analysis', 'Genome alignment', 'Variant calling', 'Gene annotation']
      },
      {
        id: 'adv-18-protein',
        category: 'Protein Analysis',
        description: 'Protein structure and function analysis',
        maxPoints: 25,
        requirements: ['Protein modeling', 'Structure prediction', 'Molecular docking', 'Function analysis']
      },
      {
        id: 'adv-18-discovery',
        category: 'Drug Discovery',
        description: 'Drug discovery and molecular analysis',
        maxPoints: 25,
        requirements: ['Drug discovery', 'Molecular screening', 'Compound analysis', 'Target identification']
      },
      {
        id: 'adv-18-platform',
        category: 'Research Platform',
        description: 'Collaborative platform and workflow automation',
        maxPoints: 20,
        requirements: ['Collaborative workspace', 'Workflow automation', 'Data integration', 'Visualization tools']
      }
    ],
    folderStructure: {
      'client': {
        'src': {},
        'package.json': ''
      },
      'server': {
        'src': {},
        'package.json': ''
      },
      'bioinformatics': {
        'src': {},
        'requirements.txt': ''
      },
      'ml-service': {
        'src': {},
        'requirements.txt': ''
      },
      'workflow-engine': {
        'src': {},
        'requirements.txt': ''
      },
      'docker-compose.yml': '',
      'README.md': ''
    }
  },
  {
    id: 'adv-19',
    name: 'Climate Monitoring Network',
    description: 'Build a global climate monitoring system with environmental sensors, predictive modeling, and policy recommendations.',
    stack: 'fullstack',
    difficulty: 'advanced',
    technologies: ['React', 'Node.js', 'Python', 'TensorFlow', 'MQTT', 'GIS'],
    estimatedHours: 53,
    maxPoints: 100,
    requirements: [
      'Global sensor network management',
      'Climate data collection and processing',
      'Predictive climate modeling',
      'Environmental impact assessment',
      'Real-time monitoring dashboards',
      'Policy recommendation engine',
      'Public awareness and education tools',
      'Integration with meteorological services',
      'Mobile app for citizen reporting',
      'API for research institutions'
    ],
    gradingCriteria: [
      {
        id: 'adv-19-monitoring',
        category: 'Environmental Monitoring',
        description: 'Sensor network and data collection',
        maxPoints: 30,
        requirements: ['Sensor network', 'Data collection', 'Real-time monitoring', 'Quality control']
      },
      {
        id: 'adv-19-modeling',
        category: 'Predictive Modeling',
        description: 'Climate prediction and impact assessment',
        maxPoints: 25,
        requirements: ['Climate modeling', 'Predictive analytics', 'Impact assessment', 'Scenario analysis']
      },
      {
        id: 'adv-19-visualization',
        category: 'Data Visualization',
        description: 'Dashboards and public awareness tools',
        maxPoints: 25,
        requirements: ['Interactive dashboards', 'Data visualization', 'Public tools', 'Educational content']
      },
      {
        id: 'adv-19-integration',
        category: 'System Integration',
        description: 'External system integration and APIs',
        maxPoints: 20,
        requirements: ['Meteorological integration', 'Research APIs', 'Mobile applications', 'Policy tools']
      }
    ],
    folderStructure: {
      'client': {
        'src': {},
        'package.json': ''
      },
      'server': {
        'src': {},
        'package.json': ''
      },
      'climate-modeling': {
        'src': {},
        'requirements.txt': ''
      },
      'sensor-network': {
        'src': {},
        'package.json': ''
      },
      'mobile': {
        'src': {},
        'package.json': ''
      },
      'docker-compose.yml': '',
      'README.md': ''
    }
  },
  {
    id: 'adv-20',
    name: 'Neural Network Training Platform',
    description: 'Create a comprehensive platform for training, deploying, and managing neural networks with distributed computing.',
    stack: 'fullstack',
    difficulty: 'advanced',
    technologies: ['React', 'Node.js', 'Python', 'TensorFlow', 'PyTorch', 'Kubernetes'],
    estimatedHours: 57,
    maxPoints: 100,
    requirements: [
      'Distributed neural network training',
      'Model architecture design interface',
      'Hyperparameter optimization',
      'Model versioning and experiment tracking',
      'Automated model deployment',
      'Performance monitoring and analytics',
      'Collaborative research environment',
      'GPU cluster management',
      'Model marketplace and sharing',
      'Integration with cloud ML services'
    ],
    gradingCriteria: [
      {
        id: 'adv-20-training',
        category: 'Model Training',
        description: 'Distributed training and optimization',
        maxPoints: 35,
        requirements: ['Distributed training', 'Hyperparameter optimization', 'Training orchestration', 'Resource management']
      },
      {
        id: 'adv-20-platform',
        category: 'Platform Features',
        description: 'Model management and deployment',
        maxPoints: 25,
        requirements: ['Model versioning', 'Experiment tracking', 'Automated deployment', 'Performance monitoring']
      },
      {
        id: 'adv-20-interface',
        category: 'User Interface',
        description: 'Design interface and collaboration tools',
        maxPoints: 25,
        requirements: ['Architecture designer', 'Collaboration tools', 'Visualization', 'User experience']
      },
      {
        id: 'adv-20-infrastructure',
        category: 'Infrastructure & Integration',
        description: 'Cloud integration and infrastructure management',
        maxPoints: 15,
        requirements: ['GPU cluster management', 'Cloud integration', 'Scalable infrastructure', 'API development']
      }
    ],
    folderStructure: {
      'client': {
        'src': {},
        'package.json': ''
      },
      'server': {
        'src': {},
        'package.json': ''
      },
      'training-service': {
        'src': {},
        'requirements.txt': ''
      },
      'model-service': {
        'src': {},
        'requirements.txt': ''
      },
      'kubernetes': {},
      'docker-compose.yml': '',
      'README.md': ''
    }
  }
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
    beginner: beginnerProjects.filter(p => p.stack === 'backend'),
    intermediate: intermediateProjects.filter(p => p.stack === 'backend'),
    advanced: advancedProjects.filter(p => p.stack === 'backend')
  },
  fullstack: {
    beginner: beginnerProjects.filter(p => p.stack === 'fullstack'),
    intermediate: intermediateProjects.filter(p => p.stack === 'fullstack'),
    advanced: advancedProjects.filter(p => p.stack === 'fullstack')
  }
};