/*
  # Seed Learning Guides with Professional Content
  
  Professional learning guides based on industry best practices
*/

INSERT INTO learning_guides (title, description, category, difficulty, duration, steps, rating, image_url) VALUES
(
  'Complete Web Development Fundamentals',
  'Master the core technologies of web development from HTML to advanced JavaScript concepts.',
  'Web Development',
  'Beginner',
  '4 weeks',
  '[
    {
      "title": "HTML Foundations",
      "description": "Learn semantic HTML structure, forms, and accessibility",
      "duration": "3 days",
      "topics": ["HTML5 elements", "Forms and validation", "Semantic markup", "Accessibility basics"]
    },
    {
      "title": "CSS Mastery",
      "description": "From basic styling to advanced layouts with Flexbox and Grid",
      "duration": "5 days",
      "topics": ["CSS fundamentals", "Flexbox layouts", "CSS Grid", "Responsive design", "CSS animations"]
    },
    {
      "title": "JavaScript Essentials",
      "description": "Core JavaScript concepts and DOM manipulation",
      "duration": "7 days",
      "topics": ["Variables and data types", "Functions and scope", "DOM manipulation", "Event handling", "Async JavaScript"]
    },
    {
      "title": "Modern JavaScript",
      "description": "ES6+ features and modern development practices",
      "duration": "5 days",
      "topics": ["Arrow functions", "Destructuring", "Modules", "Promises and async/await", "Fetch API"]
    },
    {
      "title": "Project Integration",
      "description": "Build a complete project using all learned concepts",
      "duration": "8 days",
      "topics": ["Project planning", "Code organization", "Version control", "Deployment", "Best practices"]
    }
  ]'::jsonb,
  4.8,
  'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg'
),
(
  'React Development Mastery',
  'Comprehensive guide to building modern React applications with hooks, context, and best practices.',
  'Frontend',
  'Intermediate',
  '6 weeks',
  '[
    {
      "title": "React Fundamentals",
      "description": "Components, JSX, and basic React concepts",
      "duration": "5 days",
      "topics": ["Components and JSX", "Props and state", "Event handling", "Conditional rendering", "Lists and keys"]
    },
    {
      "title": "React Hooks",
      "description": "Master useState, useEffect, and custom hooks",
      "duration": "7 days",
      "topics": ["useState hook", "useEffect hook", "useContext hook", "Custom hooks", "Hook patterns"]
    },
    {
      "title": "State Management",
      "description": "Context API, useReducer, and state patterns",
      "duration": "6 days",
      "topics": ["Context API", "useReducer hook", "State lifting", "Component composition", "State patterns"]
    },
    {
      "title": "Advanced Patterns",
      "description": "Higher-order components, render props, and performance",
      "duration": "8 days",
      "topics": ["HOCs", "Render props", "React.memo", "useMemo and useCallback", "Performance optimization"]
    },
    {
      "title": "Testing and Deployment",
      "description": "Testing React components and deployment strategies",
      "duration": "6 days",
      "topics": ["Jest and React Testing Library", "Component testing", "Integration testing", "Deployment", "CI/CD"]
    },
    {
      "title": "Real-world Project",
      "description": "Build a complete React application",
      "duration": "10 days",
      "topics": ["Project architecture", "API integration", "Routing", "Authentication", "Production deployment"]
    }
  ]'::jsonb,
  4.9,
  'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg'
),
(
  'Backend API Development with Node.js',
  'Learn to build scalable REST APIs with Node.js, Express, and database integration.',
  'Backend',
  'Intermediate',
  '5 weeks',
  '[
    {
      "title": "Node.js Fundamentals",
      "description": "Understanding Node.js runtime and core modules",
      "duration": "4 days",
      "topics": ["Node.js architecture", "Core modules", "NPM and packages", "Asynchronous programming", "File system operations"]
    },
    {
      "title": "Express.js Framework",
      "description": "Building web servers with Express.js",
      "duration": "6 days",
      "topics": ["Express setup", "Routing", "Middleware", "Request/Response handling", "Error handling"]
    },
    {
      "title": "Database Integration",
      "description": "Working with databases and ORMs",
      "duration": "7 days",
      "topics": ["Database design", "MongoDB with Mongoose", "PostgreSQL with Sequelize", "CRUD operations", "Data validation"]
    },
    {
      "title": "Authentication & Security",
      "description": "Implementing secure authentication systems",
      "duration": "6 days",
      "topics": ["JWT authentication", "Password hashing", "CORS", "Rate limiting", "Security best practices"]
    },
    {
      "title": "API Design & Testing",
      "description": "RESTful API design and comprehensive testing",
      "duration": "5 days",
      "topics": ["REST principles", "API documentation", "Unit testing", "Integration testing", "API versioning"]
    },
    {
      "title": "Deployment & Monitoring",
      "description": "Production deployment and monitoring",
      "duration": "7 days",
      "topics": ["Environment configuration", "Docker containers", "Cloud deployment", "Logging", "Performance monitoring"]
    }
  ]'::jsonb,
  4.7,
  'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg'
),
(
  'Full-Stack MERN Development',
  'Complete guide to building full-stack applications with MongoDB, Express, React, and Node.js.',
  'Full-Stack',
  'Advanced',
  '8 weeks',
  '[
    {
      "title": "Project Architecture",
      "description": "Planning and structuring full-stack applications",
      "duration": "5 days",
      "topics": ["Architecture patterns", "Project structure", "Development workflow", "Version control", "Environment setup"]
    },
    {
      "title": "Backend Development",
      "description": "Building robust APIs with Node.js and Express",
      "duration": "10 days",
      "topics": ["API design", "Database modeling", "Authentication", "File uploads", "Real-time features"]
    },
    {
      "title": "Frontend Development",
      "description": "Creating dynamic UIs with React",
      "duration": "12 days",
      "topics": ["Component architecture", "State management", "API integration", "Routing", "Form handling"]
    },
    {
      "title": "Integration & Testing",
      "description": "Connecting frontend and backend with comprehensive testing",
      "duration": "8 days",
      "topics": ["API integration", "Error handling", "Testing strategies", "End-to-end testing", "Performance optimization"]
    },
    {
      "title": "Advanced Features",
      "description": "Implementing advanced full-stack features",
      "duration": "10 days",
      "topics": ["Real-time communication", "Payment integration", "Email services", "File management", "Search functionality"]
    },
    {
      "title": "Production Deployment",
      "description": "Deploying and maintaining full-stack applications",
      "duration": "11 days",
      "topics": ["Production builds", "Environment configuration", "Database deployment", "Monitoring", "Scaling strategies"]
    }
  ]'::jsonb,
  4.9,
  'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg'
),
(
  'Git and GitHub Collaboration Workflow',
  'Master version control and collaborative development with Git and GitHub.',
  'Tools',
  'Beginner',
  '2 weeks',
  '[
    {
      "title": "Git Fundamentals",
      "description": "Understanding version control and basic Git commands",
      "duration": "3 days",
      "topics": ["Version control concepts", "Git installation", "Basic commands", "Repository initialization", "Staging and committing"]
    },
    {
      "title": "Branching and Merging",
      "description": "Working with branches and merge strategies",
      "duration": "4 days",
      "topics": ["Branch creation", "Switching branches", "Merge strategies", "Conflict resolution", "Branch management"]
    },
    {
      "title": "GitHub Collaboration",
      "description": "Using GitHub for team collaboration",
      "duration": "4 days",
      "topics": ["Remote repositories", "Push and pull", "Pull requests", "Code reviews", "Issue tracking"]
    },
    {
      "title": "Advanced Workflows",
      "description": "Professional Git workflows and best practices",
      "duration": "3 days",
      "topics": ["Gitflow workflow", "Feature branches", "Release management", "Hotfix procedures", "Best practices"]
    }
  ]'::jsonb,
  4.6,
  'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg'
),
(
  'DevOps and Deployment Strategies',
  'Learn modern deployment practices, containerization, and cloud platforms.',
  'DevOps',
  'Advanced',
  '6 weeks',
  '[
    {
      "title": "DevOps Fundamentals",
      "description": "Understanding DevOps culture and practices",
      "duration": "4 days",
      "topics": ["DevOps principles", "CI/CD concepts", "Infrastructure as Code", "Monitoring", "Collaboration tools"]
    },
    {
      "title": "Containerization with Docker",
      "description": "Building and managing Docker containers",
      "duration": "7 days",
      "topics": ["Docker fundamentals", "Dockerfile creation", "Container management", "Docker Compose", "Registry usage"]
    },
    {
      "title": "Cloud Platforms",
      "description": "Deploying applications to cloud platforms",
      "duration": "10 days",
      "topics": ["AWS services", "Azure fundamentals", "Google Cloud Platform", "Serverless computing", "Cloud storage"]
    },
    {
      "title": "CI/CD Pipelines",
      "description": "Automated testing and deployment pipelines",
      "duration": "8 days",
      "topics": ["GitHub Actions", "Jenkins", "Pipeline design", "Automated testing", "Deployment strategies"]
    },
    {
      "title": "Monitoring and Logging",
      "description": "Application monitoring and log management",
      "duration": "6 days",
      "topics": ["Application monitoring", "Log aggregation", "Performance metrics", "Alerting", "Debugging"]
    },
    {
      "title": "Security and Compliance",
      "description": "Security best practices in DevOps",
      "duration": "7 days",
      "topics": ["Security scanning", "Vulnerability management", "Compliance", "Secret management", "Security automation"]
    }
  ]'::jsonb,
  4.5,
  'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg'
);