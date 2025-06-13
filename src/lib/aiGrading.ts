import { ProjectTemplate, AIFeedback } from '@/types/project'

interface CodeAnalysis {
  files: Record<string, string>
  repositoryUrl?: string
  deployedUrl?: string
}

interface GradingResult {
  totalScore: number
  maxScore: number
  feedback: AIFeedback[]
  overallGrade: string
}

export async function gradeProject(
  project: ProjectTemplate,
  codeAnalysis: CodeAnalysis
): Promise<GradingResult> {
  try {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000))

    const feedback: AIFeedback[] = []
    let totalScore = 0
    const maxScore = project.maxPoints

    // Grade each criteria
    for (const criteria of project.gradingCriteria) {
      const score = await gradeCriteria(criteria, codeAnalysis, project)
      feedback.push(score)
      totalScore += score.score
    }

    const percentage = (totalScore / maxScore) * 100
    const overallGrade = getOverallGrade(percentage)

    return {
      totalScore,
      maxScore,
      feedback,
      overallGrade
    }
  } catch (error) {
    console.error('Error grading project:', error)
    throw new Error('Failed to grade project')
  }
}

async function gradeCriteria(
  criteria: any,
  codeAnalysis: CodeAnalysis,
  project: ProjectTemplate
): Promise<AIFeedback> {
  const { category, maxPoints, requirements } = criteria
  
  // Analyze code based on criteria category
  let score = 0
  let feedback = ''
  let suggestions: string[] = []

  switch (category.toLowerCase()) {
    case 'design & ui':
    case 'design':
      score = await gradeDesignAndUI(codeAnalysis, maxPoints, requirements)
      feedback = generateDesignFeedback(score, maxPoints)
      suggestions = generateDesignSuggestions(score, maxPoints)
      break

    case 'functionality':
    case 'core functionality':
      score = await gradeFunctionality(codeAnalysis, maxPoints, requirements, project)
      feedback = generateFunctionalityFeedback(score, maxPoints)
      suggestions = generateFunctionalitySuggestions(score, maxPoints)
      break

    case 'code quality':
      score = await gradeCodeQuality(codeAnalysis, maxPoints, requirements)
      feedback = generateCodeQualityFeedback(score, maxPoints)
      suggestions = generateCodeQualitySuggestions(score, maxPoints)
      break

    case 'responsiveness':
      score = await gradeResponsiveness(codeAnalysis, maxPoints, requirements)
      feedback = generateResponsivenessFeedback(score, maxPoints)
      suggestions = generateResponsivenessSuggestions(score, maxPoints)
      break

    case 'api endpoints':
    case 'api integration':
      score = await gradeAPIEndpoints(codeAnalysis, maxPoints, requirements)
      feedback = generateAPIFeedback(score, maxPoints)
      suggestions = generateAPISuggestions(score, maxPoints)
      break

    case 'authentication & security':
    case 'security':
      score = await gradeSecurity(codeAnalysis, maxPoints, requirements)
      feedback = generateSecurityFeedback(score, maxPoints)
      suggestions = generateSecuritySuggestions(score, maxPoints)
      break

    case 'database integration':
    case 'data persistence':
      score = await gradeDatabase(codeAnalysis, maxPoints, requirements)
      feedback = generateDatabaseFeedback(score, maxPoints)
      suggestions = generateDatabaseSuggestions(score, maxPoints)
      break

    default:
      score = Math.floor(Math.random() * (maxPoints * 0.4)) + (maxPoints * 0.6)
      feedback = generateGenericFeedback(category, score, maxPoints)
      suggestions = generateGenericSuggestions(category)
  }

  return {
    category,
    score: Math.min(score, maxPoints),
    maxScore: maxPoints,
    feedback,
    suggestions
  }
}

// Design & UI Grading
async function gradeDesignAndUI(codeAnalysis: CodeAnalysis, maxPoints: number, requirements: string[]): Promise<number> {
  let score = 0
  const files = codeAnalysis.files

  // Check for CSS files
  const cssFiles = Object.keys(files).filter(file => file.endsWith('.css'))
  if (cssFiles.length > 0) score += maxPoints * 0.2

  // Check for responsive design
  const hasResponsiveCSS = cssFiles.some(file => 
    files[file].includes('@media') || files[file].includes('responsive')
  )
  if (hasResponsiveCSS) score += maxPoints * 0.3

  // Check for modern CSS features
  const hasModernCSS = cssFiles.some(file => 
    files[file].includes('flexbox') || 
    files[file].includes('grid') || 
    files[file].includes('flex') ||
    files[file].includes('display: flex') ||
    files[file].includes('display: grid')
  )
  if (hasModernCSS) score += maxPoints * 0.2

  // Check for color scheme and styling
  const hasGoodStyling = cssFiles.some(file => 
    files[file].includes('color') && 
    files[file].includes('font') &&
    files[file].length > 500 // Substantial CSS
  )
  if (hasGoodStyling) score += maxPoints * 0.3

  return Math.floor(score)
}

// Functionality Grading
async function gradeFunctionality(codeAnalysis: CodeAnalysis, maxPoints: number, requirements: string[], project: ProjectTemplate): Promise<number> {
  let score = 0
  const files = codeAnalysis.files

  // Check for JavaScript functionality
  const jsFiles = Object.keys(files).filter(file => file.endsWith('.js') || file.endsWith('.jsx'))
  if (jsFiles.length > 0) score += maxPoints * 0.2

  // Check for event handling
  const hasEventHandling = jsFiles.some(file => 
    files[file].includes('addEventListener') || 
    files[file].includes('onClick') ||
    files[file].includes('onSubmit')
  )
  if (hasEventHandling) score += maxPoints * 0.3

  // Check for form validation
  const hasFormValidation = jsFiles.some(file => 
    files[file].includes('validation') || 
    files[file].includes('required') ||
    files[file].includes('validate')
  )
  if (hasFormValidation) score += maxPoints * 0.2

  // Check for API integration (if applicable)
  const hasAPIIntegration = jsFiles.some(file => 
    files[file].includes('fetch') || 
    files[file].includes('axios') ||
    files[file].includes('api')
  )
  if (hasAPIIntegration) score += maxPoints * 0.3

  return Math.floor(score)
}

// Code Quality Grading
async function gradeCodeQuality(codeAnalysis: CodeAnalysis, maxPoints: number, requirements: string[]): Promise<number> {
  let score = 0
  const files = codeAnalysis.files

  // Check for proper file organization
  const hasGoodStructure = Object.keys(files).length >= 3
  if (hasGoodStructure) score += maxPoints * 0.2

  // Check for comments
  const hasComments = Object.values(files).some(content => 
    content.includes('//') || content.includes('/*') || content.includes('<!--')
  )
  if (hasComments) score += maxPoints * 0.2

  // Check for semantic HTML
  const htmlFiles = Object.keys(files).filter(file => file.endsWith('.html'))
  const hasSemanticHTML = htmlFiles.some(file => 
    files[file].includes('<header>') || 
    files[file].includes('<nav>') ||
    files[file].includes('<main>') ||
    files[file].includes('<section>')
  )
  if (hasSemanticHTML) score += maxPoints * 0.3

  // Check for consistent naming
  const hasConsistentNaming = Object.keys(files).every(file => 
    file.toLowerCase() === file && !file.includes(' ')
  )
  if (hasConsistentNaming) score += maxPoints * 0.3

  return Math.floor(score)
}

// Responsiveness Grading
async function gradeResponsiveness(codeAnalysis: CodeAnalysis, maxPoints: number, requirements: string[]): Promise<number> {
  let score = 0
  const files = codeAnalysis.files

  // Check for viewport meta tag
  const htmlFiles = Object.keys(files).filter(file => file.endsWith('.html'))
  const hasViewport = htmlFiles.some(file => 
    files[file].includes('viewport') && files[file].includes('width=device-width')
  )
  if (hasViewport) score += maxPoints * 0.3

  // Check for media queries
  const cssFiles = Object.keys(files).filter(file => file.endsWith('.css'))
  const hasMediaQueries = cssFiles.some(file => files[file].includes('@media'))
  if (hasMediaQueries) score += maxPoints * 0.4

  // Check for flexible layouts
  const hasFlexibleLayout = cssFiles.some(file => 
    files[file].includes('flex') || 
    files[file].includes('grid') ||
    files[file].includes('%') ||
    files[file].includes('rem') ||
    files[file].includes('em')
  )
  if (hasFlexibleLayout) score += maxPoints * 0.3

  return Math.floor(score)
}

// API Endpoints Grading (for backend projects)
async function gradeAPIEndpoints(codeAnalysis: CodeAnalysis, maxPoints: number, requirements: string[]): Promise<number> {
  let score = 0
  const files = codeAnalysis.files

  // Check for route definitions
  const hasRoutes = Object.values(files).some(content => 
    content.includes('app.get') || 
    content.includes('app.post') ||
    content.includes('router.get') ||
    content.includes('router.post')
  )
  if (hasRoutes) score += maxPoints * 0.3

  // Check for CRUD operations
  const hasCRUD = Object.values(files).some(content => 
    content.includes('GET') && 
    content.includes('POST') &&
    (content.includes('PUT') || content.includes('PATCH')) &&
    content.includes('DELETE')
  )
  if (hasCRUD) score += maxPoints * 0.4

  // Check for error handling
  const hasErrorHandling = Object.values(files).some(content => 
    content.includes('try') && content.includes('catch') ||
    content.includes('error') ||
    content.includes('status(4') ||
    content.includes('status(5')
  )
  if (hasErrorHandling) score += maxPoints * 0.3

  return Math.floor(score)
}

// Security Grading
async function gradeSecurity(codeAnalysis: CodeAnalysis, maxPoints: number, requirements: string[]): Promise<number> {
  let score = 0
  const files = codeAnalysis.files

  // Check for authentication
  const hasAuth = Object.values(files).some(content => 
    content.includes('jwt') || 
    content.includes('bcrypt') ||
    content.includes('passport') ||
    content.includes('auth')
  )
  if (hasAuth) score += maxPoints * 0.4

  // Check for input validation
  const hasValidation = Object.values(files).some(content => 
    content.includes('validation') || 
    content.includes('sanitize') ||
    content.includes('validate')
  )
  if (hasValidation) score += maxPoints * 0.3

  // Check for security middleware
  const hasSecurityMiddleware = Object.values(files).some(content => 
    content.includes('helmet') || 
    content.includes('cors') ||
    content.includes('rate-limit')
  )
  if (hasSecurityMiddleware) score += maxPoints * 0.3

  return Math.floor(score)
}

// Database Grading
async function gradeDatabase(codeAnalysis: CodeAnalysis, maxPoints: number, requirements: string[]): Promise<number> {
  let score = 0
  const files = codeAnalysis.files

  // Check for database connection
  const hasDBConnection = Object.values(files).some(content => 
    content.includes('mongoose') || 
    content.includes('mongodb') ||
    content.includes('sequelize') ||
    content.includes('database')
  )
  if (hasDBConnection) score += maxPoints * 0.3

  // Check for models/schemas
  const hasModels = Object.values(files).some(content => 
    content.includes('Schema') || 
    content.includes('model') ||
    content.includes('Model')
  )
  if (hasModels) score += maxPoints * 0.4

  // Check for database operations
  const hasDBOperations = Object.values(files).some(content => 
    content.includes('find') || 
    content.includes('save') ||
    content.includes('create') ||
    content.includes('update') ||
    content.includes('delete')
  )
  if (hasDBOperations) score += maxPoints * 0.3

  return Math.floor(score)
}

// Feedback Generation Functions
function generateDesignFeedback(score: number, maxPoints: number): string {
  const percentage = (score / maxPoints) * 100
  
  if (percentage >= 90) {
    return "Excellent design implementation! Your UI demonstrates strong visual hierarchy, consistent styling, and professional appearance. The design choices enhance user experience effectively."
  } else if (percentage >= 75) {
    return "Good design work! The interface is clean and functional with room for minor improvements in visual consistency and modern design patterns."
  } else if (percentage >= 60) {
    return "Decent design foundation. The basic styling is present but could benefit from improved color schemes, typography, and overall visual appeal."
  } else {
    return "Design needs significant improvement. Focus on creating a more visually appealing interface with consistent styling, proper color schemes, and better layout structure."
  }
}

function generateDesignSuggestions(score: number, maxPoints: number): string[] {
  const percentage = (score / maxPoints) * 100
  
  if (percentage >= 90) {
    return [
      "Consider adding subtle animations for enhanced user experience",
      "Explore advanced CSS features like custom properties",
      "Add dark mode support for better accessibility"
    ]
  } else if (percentage >= 75) {
    return [
      "Improve color contrast for better accessibility",
      "Add more consistent spacing throughout the design",
      "Consider using a design system or style guide"
    ]
  } else if (percentage >= 60) {
    return [
      "Implement a consistent color palette",
      "Improve typography hierarchy and readability",
      "Add proper spacing and alignment",
      "Use modern CSS layout techniques like Flexbox or Grid"
    ]
  } else {
    return [
      "Start with a basic color scheme and stick to it",
      "Focus on clean, simple layouts",
      "Ensure proper contrast between text and background",
      "Use consistent fonts and sizing throughout",
      "Add basic styling to all elements"
    ]
  }
}

function generateFunctionalityFeedback(score: number, maxPoints: number): string {
  const percentage = (score / maxPoints) * 100
  
  if (percentage >= 90) {
    return "Outstanding functionality implementation! All features work correctly with proper error handling and user feedback. The interactive elements enhance the user experience significantly."
  } else if (percentage >= 75) {
    return "Good functional implementation. Most features work as expected with minor areas for improvement in error handling or user feedback."
  } else if (percentage >= 60) {
    return "Basic functionality is present but needs refinement. Some features may not work correctly or lack proper validation and error handling."
  } else {
    return "Functionality needs major improvements. Many required features are missing or not working correctly. Focus on implementing core requirements first."
  }
}

function generateFunctionalitySuggestions(score: number, maxPoints: number): string[] {
  const percentage = (score / maxPoints) * 100
  
  if (percentage >= 90) {
    return [
      "Add advanced features like keyboard shortcuts",
      "Implement progressive enhancement",
      "Consider adding offline functionality"
    ]
  } else if (percentage >= 75) {
    return [
      "Add loading states for better user experience",
      "Implement proper error boundaries",
      "Add form validation feedback",
      "Include success/error notifications"
    ]
  } else {
    return [
      "Implement all required functionality from the project requirements",
      "Add basic form validation",
      "Include error handling for user inputs",
      "Test all interactive elements thoroughly",
      "Add proper event listeners for user interactions"
    ]
  }
}

function generateCodeQualityFeedback(score: number, maxPoints: number): string {
  const percentage = (score / maxPoints) * 100
  
  if (percentage >= 90) {
    return "Excellent code quality! Your code is well-organized, properly commented, and follows best practices. The file structure is logical and maintainable."
  } else if (percentage >= 75) {
    return "Good code organization with room for improvement in documentation and consistency. The overall structure is solid."
  } else if (percentage >= 60) {
    return "Basic code structure is present but needs improvement in organization, naming conventions, and documentation."
  } else {
    return "Code quality needs significant improvement. Focus on better organization, consistent naming, and proper file structure."
  }
}

function generateCodeQualitySuggestions(score: number, maxPoints: number): string[] {
  const percentage = (score / maxPoints) * 100
  
  if (percentage >= 90) {
    return [
      "Consider implementing automated testing",
      "Add JSDoc comments for better documentation",
      "Explore advanced code organization patterns"
    ]
  } else {
    return [
      "Add meaningful comments to explain complex logic",
      "Use consistent naming conventions throughout",
      "Organize files into logical folders",
      "Remove unused code and variables",
      "Follow language-specific best practices"
    ]
  }
}

function generateResponsivenessFeedback(score: number, maxPoints: number): string {
  const percentage = (score / maxPoints) * 100
  
  if (percentage >= 90) {
    return "Excellent responsive design! Your application works seamlessly across all device sizes with proper breakpoints and flexible layouts."
  } else if (percentage >= 75) {
    return "Good responsive implementation with minor issues on some screen sizes. Most breakpoints work correctly."
  } else if (percentage >= 60) {
    return "Basic responsive design is present but needs improvement for better mobile experience and cross-device compatibility."
  } else {
    return "Responsiveness needs major improvement. The design doesn't adapt well to different screen sizes and lacks mobile optimization."
  }
}

function generateResponsivenessSuggestions(score: number, maxPoints: number): string[] {
  return [
    "Test on various screen sizes and devices",
    "Use relative units (rem, em, %) instead of fixed pixels",
    "Implement proper media queries for different breakpoints",
    "Ensure touch-friendly interface elements",
    "Optimize images for different screen densities"
  ]
}

function generateAPIFeedback(score: number, maxPoints: number): string {
  const percentage = (score / maxPoints) * 100
  
  if (percentage >= 90) {
    return "Excellent API implementation! All endpoints work correctly with proper HTTP methods, status codes, and error handling."
  } else if (percentage >= 75) {
    return "Good API structure with most endpoints functioning correctly. Minor improvements needed in error handling or response format."
  } else {
    return "API implementation needs improvement. Some endpoints may be missing or not functioning correctly."
  }
}

function generateAPISuggestions(score: number, maxPoints: number): string[] {
  return [
    "Implement all CRUD operations (GET, POST, PUT, DELETE)",
    "Use proper HTTP status codes",
    "Add comprehensive error handling",
    "Include input validation for all endpoints",
    "Document your API endpoints clearly"
  ]
}

function generateSecurityFeedback(score: number, maxPoints: number): string {
  const percentage = (score / maxPoints) * 100
  
  if (percentage >= 90) {
    return "Excellent security implementation! Proper authentication, input validation, and security measures are in place."
  } else {
    return "Security implementation needs improvement. Consider adding authentication, input validation, and other security measures."
  }
}

function generateSecuritySuggestions(score: number, maxPoints: number): string[] {
  return [
    "Implement proper authentication system",
    "Add input validation and sanitization",
    "Use security middleware (helmet, cors)",
    "Hash passwords securely",
    "Implement rate limiting to prevent abuse"
  ]
}

function generateDatabaseFeedback(score: number, maxPoints: number): string {
  const percentage = (score / maxPoints) * 100
  
  if (percentage >= 90) {
    return "Excellent database integration! Proper schema design, efficient queries, and good data management practices."
  } else {
    return "Database implementation needs improvement. Focus on proper schema design and efficient data operations."
  }
}

function generateDatabaseSuggestions(score: number, maxPoints: number): string[] {
  return [
    "Design proper database schemas",
    "Implement efficient database queries",
    "Add data validation at the database level",
    "Use appropriate indexing for performance",
    "Handle database errors gracefully"
  ]
}

function generateGenericFeedback(category: string, score: number, maxPoints: number): string {
  const percentage = (score / maxPoints) * 100
  
  if (percentage >= 90) {
    return `Excellent work on ${category.toLowerCase()}! Your implementation demonstrates strong understanding and attention to detail.`
  } else if (percentage >= 75) {
    return `Good implementation of ${category.toLowerCase()}. There are some areas for improvement but overall solid work.`
  } else if (percentage >= 60) {
    return `Decent attempt at ${category.toLowerCase()}. Several areas need improvement to meet the requirements fully.`
  } else {
    return `${category} needs significant improvement. Please review the requirements and consider refactoring this section.`
  }
}

function generateGenericSuggestions(category: string): string[] {
  return [
    `Review the project requirements for ${category.toLowerCase()}`,
    `Consider best practices for ${category.toLowerCase()}`,
    `Test your implementation thoroughly`,
    `Seek feedback from peers or mentors`,
    `Refer to documentation and tutorials`
  ]
}

function getOverallGrade(percentage: number): string {
  if (percentage >= 90) return 'A'
  if (percentage >= 80) return 'B'
  if (percentage >= 70) return 'C'
  if (percentage >= 60) return 'D'
  return 'F'
}