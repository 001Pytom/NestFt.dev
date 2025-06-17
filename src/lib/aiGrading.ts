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
    await new Promise(resolve => setTimeout(resolve, 5000))

    const feedback: AIFeedback[] = []
    let totalScore = 0
    const maxScore = project.maxPoints

    // Validate that we have actual code to grade
    if (!codeAnalysis.files || Object.keys(codeAnalysis.files).length === 0) {
      throw new Error('No code files provided for grading')
    }

    // Validate repository URL if provided
    if (codeAnalysis.repositoryUrl && !isValidGitHubUrl(codeAnalysis.repositoryUrl)) {
      throw new Error('Invalid GitHub repository URL')
    }

    // Grade each criteria based on actual code analysis
    for (const criteria of project.gradingCriteria) {
      const score = await gradeCriteria(criteria, codeAnalysis, project)
      feedback.push(score)
      totalScore += score.score
    }

    // Additional validation based on project requirements
    const requirementScore = await validateProjectRequirements(project, codeAnalysis)
    totalScore = Math.min(totalScore * requirementScore, maxScore)

    const percentage = (totalScore / maxScore) * 100
    const overallGrade = getOverallGrade(percentage)

    return {
      totalScore: Math.round(totalScore),
      maxScore,
      feedback,
      overallGrade
    }
  } catch (error) {
    console.error('Error grading project:', error)
    throw new Error('Failed to grade project: ' + error.message)
  }
}

function isValidGitHubUrl(url: string): boolean {
  const githubPattern = /^https:\/\/github\.com\/[\w\-\.]+\/[\w\-\.]+\/?$/
  return githubPattern.test(url)
}

async function validateProjectRequirements(
  project: ProjectTemplate,
  codeAnalysis: CodeAnalysis
): Promise<number> {
  let score = 1.0
  const files = codeAnalysis.files

  // Check if required files exist based on project type
  const requiredFiles = getRequiredFiles(project)
  const missingFiles = requiredFiles.filter(file => !files[file] && !findSimilarFile(files, file))
  
  if (missingFiles.length > 0) {
    score *= Math.max(0.5, 1 - (missingFiles.length / requiredFiles.length))
  }

  // Check if files have substantial content
  const emptyFiles = Object.entries(files).filter(([_, content]) => 
    content.trim().length < 50 // Less than 50 characters
  )
  
  if (emptyFiles.length > 0) {
    score *= Math.max(0.7, 1 - (emptyFiles.length / Object.keys(files).length))
  }

  // Check for project-specific requirements
  if (project.stack === 'frontend') {
    if (!hasHTMLStructure(files) && !hasReactComponents(files)) {
      score *= 0.6
    }
  }

  if (project.stack === 'backend') {
    if (!hasAPIEndpoints(files)) {
      score *= 0.5
    }
  }

  return score
}

function getRequiredFiles(project: ProjectTemplate): string[] {
  const required: string[] = []
  
  if (project.stack === 'frontend') {
    if (project.technologies.includes('React')) {
      required.push('src/App.js', 'src/index.js', 'package.json')
    } else {
      required.push('index.html', 'css/style.css', 'js/main.js')
    }
  } else if (project.stack === 'backend') {
    required.push('server.js', 'package.json')
  }
  
  return required
}

function findSimilarFile(files: Record<string, string>, targetFile: string): boolean {
  const baseName = targetFile.split('/').pop()?.split('.')[0]
  if (!baseName) return false
  
  return Object.keys(files).some(file => 
    file.includes(baseName) || file.split('/').pop()?.includes(baseName)
  )
}

function hasHTMLStructure(files: Record<string, string>): boolean {
  return Object.values(files).some(content => 
    content.includes('<html>') || content.includes('<!DOCTYPE html>')
  )
}

function hasReactComponents(files: Record<string, string>): boolean {
  return Object.values(files).some(content => 
    content.includes('React') || content.includes('jsx') || content.includes('useState')
  )
}

function hasAPIEndpoints(files: Record<string, string>): boolean {
  return Object.values(files).some(content => 
    content.includes('app.get') || content.includes('app.post') || 
    content.includes('router.') || content.includes('express')
  )
}

async function gradeCriteria(
  criteria: any,
  codeAnalysis: CodeAnalysis,
  project: ProjectTemplate
): Promise<AIFeedback> {
  const { category, maxPoints, requirements } = criteria
  
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
      score = await gradeGenericCriteria(codeAnalysis, maxPoints, requirements, category)
      feedback = generateGenericFeedback(category, score, maxPoints)
      suggestions = generateGenericSuggestions(category)
  }

  return {
    category,
    score: Math.min(Math.max(0, Math.round(score)), maxPoints),
    maxScore: maxPoints,
    feedback,
    suggestions
  }
}

// Enhanced grading functions with real code analysis

async function gradeDesignAndUI(codeAnalysis: CodeAnalysis, maxPoints: number, requirements: string[]): Promise<number> {
  let score = 0
  const files = codeAnalysis.files

  // Check for CSS files and content quality
  const cssFiles = Object.entries(files).filter(([path, _]) => path.endsWith('.css'))
  if (cssFiles.length > 0) {
    score += maxPoints * 0.2
    
    // Analyze CSS quality
    const totalCSSContent = cssFiles.reduce((acc, [_, content]) => acc + content, '')
    
    // Check for modern CSS features
    if (totalCSSContent.includes('flexbox') || totalCSSContent.includes('display: flex') || totalCSSContent.includes('display:flex')) {
      score += maxPoints * 0.15
    }
    if (totalCSSContent.includes('grid') || totalCSSContent.includes('display: grid')) {
      score += maxPoints * 0.15
    }
    
    // Check for responsive design
    if (totalCSSContent.includes('@media')) {
      score += maxPoints * 0.2
    }
    
    // Check for color usage and styling depth
    const colorMatches = totalCSSContent.match(/color\s*:/g)
    const backgroundMatches = totalCSSContent.match(/background/g)
    if (colorMatches && colorMatches.length > 3) {
      score += maxPoints * 0.1
    }
    if (backgroundMatches && backgroundMatches.length > 2) {
      score += maxPoints * 0.1
    }
    
    // Check for animations and transitions
    if (totalCSSContent.includes('transition') || totalCSSContent.includes('animation')) {
      score += maxPoints * 0.1
    }
  }

  // Check HTML structure quality
  const htmlFiles = Object.entries(files).filter(([path, _]) => path.endsWith('.html'))
  htmlFiles.forEach(([_, content]) => {
    // Semantic HTML
    const semanticTags = ['<header>', '<nav>', '<main>', '<section>', '<article>', '<aside>', '<footer>']
    const semanticCount = semanticTags.filter(tag => content.includes(tag)).length
    if (semanticCount >= 3) {
      score += maxPoints * 0.1
    }
  })

  return Math.min(score, maxPoints)
}

async function gradeFunctionality(codeAnalysis: CodeAnalysis, maxPoints: number, requirements: string[], project: ProjectTemplate): Promise<number> {
  let score = 0
  const files = codeAnalysis.files

  // Check for JavaScript functionality
  const jsFiles = Object.entries(files).filter(([path, _]) => 
    path.endsWith('.js') || path.endsWith('.jsx') || path.endsWith('.ts') || path.endsWith('.tsx')
  )

  if (jsFiles.length > 0) {
    score += maxPoints * 0.2

    const totalJSContent = jsFiles.reduce((acc, [_, content]) => acc + content, '')

    // Check for event handling
    const eventPatterns = [
      'addEventListener', 'onClick', 'onSubmit', 'onChange', 'onLoad',
      'click', 'submit', 'change', 'load'
    ]
    const hasEvents = eventPatterns.some(pattern => totalJSContent.includes(pattern))
    if (hasEvents) {
      score += maxPoints * 0.25
    }

    // Check for form validation
    const validationPatterns = ['validation', 'validate', 'required', 'checkValidity']
    const hasValidation = validationPatterns.some(pattern => totalJSContent.includes(pattern))
    if (hasValidation) {
      score += maxPoints * 0.2
    }

    // Check for API integration
    const apiPatterns = ['fetch', 'axios', 'XMLHttpRequest', 'api', 'endpoint']
    const hasAPI = apiPatterns.some(pattern => totalJSContent.includes(pattern))
    if (hasAPI) {
      score += maxPoints * 0.2
    }

    // Check for modern JavaScript features
    const modernFeatures = ['const ', 'let ', '=>', 'async', 'await', 'Promise']
    const modernCount = modernFeatures.filter(feature => totalJSContent.includes(feature)).length
    if (modernCount >= 3) {
      score += maxPoints * 0.15
    }
  }

  // Project-specific functionality checks
  if (project.stack === 'backend') {
    // Check for route definitions
    const routePatterns = ['app.get', 'app.post', 'app.put', 'app.delete', 'router.']
    const hasRoutes = routePatterns.some(pattern => 
      Object.values(files).some(content => content.includes(pattern))
    )
    if (hasRoutes) {
      score += maxPoints * 0.3
    }
  }

  return Math.min(score, maxPoints)
}

async function gradeCodeQuality(codeAnalysis: CodeAnalysis, maxPoints: number, requirements: string[]): Promise<number> {
  let score = 0
  const files = codeAnalysis.files

  // Check file organization
  const fileCount = Object.keys(files).length
  if (fileCount >= 3) {
    score += maxPoints * 0.2
  }

  // Check for comments
  const hasComments = Object.values(files).some(content => 
    content.includes('//') || content.includes('/*') || content.includes('<!--') || content.includes('#')
  )
  if (hasComments) {
    score += maxPoints * 0.2
  }

  // Check for consistent naming (no spaces, lowercase/camelCase)
  const hasConsistentNaming = Object.keys(files).every(file => 
    !file.includes(' ') && (file.toLowerCase() === file || /^[a-z][a-zA-Z0-9]*/.test(file.split('/').pop() || ''))
  )
  if (hasConsistentNaming) {
    score += maxPoints * 0.2
  }

  // Check for proper indentation and formatting
  const wellFormattedFiles = Object.values(files).filter(content => {
    const lines = content.split('\n')
    const indentedLines = lines.filter(line => line.startsWith('  ') || line.startsWith('\t') || line.trim() === '')
    return indentedLines.length > lines.length * 0.3 // At least 30% of lines are indented or empty
  })
  
  if (wellFormattedFiles.length > Object.keys(files).length * 0.5) {
    score += maxPoints * 0.2
  }

  // Check for error handling
  const hasErrorHandling = Object.values(files).some(content => 
    content.includes('try') && content.includes('catch') || 
    content.includes('error') || 
    content.includes('Error')
  )
  if (hasErrorHandling) {
    score += maxPoints * 0.2
  }

  return Math.min(score, maxPoints)
}

async function gradeResponsiveness(codeAnalysis: CodeAnalysis, maxPoints: number, requirements: string[]): Promise<number> {
  let score = 0
  const files = codeAnalysis.files

  // Check for viewport meta tag
  const hasViewport = Object.values(files).some(content => 
    content.includes('viewport') && content.includes('width=device-width')
  )
  if (hasViewport) {
    score += maxPoints * 0.3
  }

  // Check for media queries
  const hasMediaQueries = Object.values(files).some(content => content.includes('@media'))
  if (hasMediaQueries) {
    score += maxPoints * 0.4
  }

  // Check for flexible units
  const hasFlexibleUnits = Object.values(files).some(content => 
    content.includes('%') || content.includes('rem') || content.includes('em') || 
    content.includes('vw') || content.includes('vh')
  )
  if (hasFlexibleUnits) {
    score += maxPoints * 0.3
  }

  return Math.min(score, maxPoints)
}

async function gradeAPIEndpoints(codeAnalysis: CodeAnalysis, maxPoints: number, requirements: string[]): Promise<number> {
  let score = 0
  const files = codeAnalysis.files

  // Check for route definitions
  const routePatterns = ['app.get', 'app.post', 'app.put', 'app.delete', 'router.get', 'router.post']
  const hasRoutes = routePatterns.some(pattern => 
    Object.values(files).some(content => content.includes(pattern))
  )
  if (hasRoutes) {
    score += maxPoints * 0.4
  }

  // Check for CRUD operations
  const crudPatterns = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
  const crudCount = crudPatterns.filter(method => 
    Object.values(files).some(content => content.includes(method))
  ).length
  if (crudCount >= 3) {
    score += maxPoints * 0.3
  }

  // Check for error handling
  const hasErrorHandling = Object.values(files).some(content => 
    content.includes('try') && content.includes('catch') ||
    content.includes('status(4') || content.includes('status(5') ||
    content.includes('.status(400)') || content.includes('.status(500)')
  )
  if (hasErrorHandling) {
    score += maxPoints * 0.3
  }

  return Math.min(score, maxPoints)
}

async function gradeSecurity(codeAnalysis: CodeAnalysis, maxPoints: number, requirements: string[]): Promise<number> {
  let score = 0
  const files = codeAnalysis.files

  // Check for authentication
  const authPatterns = ['jwt', 'bcrypt', 'passport', 'auth', 'login', 'password']
  const hasAuth = authPatterns.some(pattern => 
    Object.values(files).some(content => content.toLowerCase().includes(pattern))
  )
  if (hasAuth) {
    score += maxPoints * 0.4
  }

  // Check for input validation
  const validationPatterns = ['validation', 'sanitize', 'validate', 'joi', 'yup']
  const hasValidation = validationPatterns.some(pattern => 
    Object.values(files).some(content => content.includes(pattern))
  )
  if (hasValidation) {
    score += maxPoints * 0.3
  }

  // Check for security middleware
  const securityPatterns = ['helmet', 'cors', 'rate-limit', 'express-rate-limit']
  const hasSecurity = securityPatterns.some(pattern => 
    Object.values(files).some(content => content.includes(pattern))
  )
  if (hasSecurity) {
    score += maxPoints * 0.3
  }

  return Math.min(score, maxPoints)
}

async function gradeDatabase(codeAnalysis: CodeAnalysis, maxPoints: number, requirements: string[]): Promise<number> {
  let score = 0
  const files = codeAnalysis.files

  // Check for database connection
  const dbPatterns = ['mongoose', 'mongodb', 'sequelize', 'database', 'db.', 'connect']
  const hasDB = dbPatterns.some(pattern => 
    Object.values(files).some(content => content.includes(pattern))
  )
  if (hasDB) {
    score += maxPoints * 0.3
  }

  // Check for models/schemas
  const modelPatterns = ['Schema', 'model', 'Model', 'schema']
  const hasModels = modelPatterns.some(pattern => 
    Object.values(files).some(content => content.includes(pattern))
  )
  if (hasModels) {
    score += maxPoints * 0.4
  }

  // Check for database operations
  const operationPatterns = ['find', 'save', 'create', 'update', 'delete', 'insert']
  const hasOperations = operationPatterns.some(pattern => 
    Object.values(files).some(content => content.includes(pattern))
  )
  if (hasOperations) {
    score += maxPoints * 0.3
  }

  return Math.min(score, maxPoints)
}

async function gradeGenericCriteria(codeAnalysis: CodeAnalysis, maxPoints: number, requirements: string[], category: string): Promise<number> {
  // Generic grading based on code complexity and completeness
  const files = codeAnalysis.files
  const totalLines = Object.values(files).reduce((acc, content) => acc + content.split('\n').length, 0)
  const totalChars = Object.values(files).reduce((acc, content) => acc + content.length, 0)
  
  let score = 0
  
  // Base score for having substantial code
  if (totalLines > 50) score += maxPoints * 0.3
  if (totalChars > 2000) score += maxPoints * 0.3
  
  // Check for requirement keywords in code
  const allContent = Object.values(files).join(' ').toLowerCase()
  const matchedRequirements = requirements.filter(req => 
    req.toLowerCase().split(' ').some(word => allContent.includes(word))
  )
  
  score += (matchedRequirements.length / requirements.length) * maxPoints * 0.4
  
  return Math.min(score, maxPoints)
}

// Feedback generation functions (keeping existing ones but enhancing them)

function generateDesignFeedback(score: number, maxPoints: number): string {
  const percentage = (score / maxPoints) * 100
  
  if (percentage >= 90) {
    return "Outstanding design implementation! Your interface demonstrates excellent visual hierarchy, modern CSS techniques, and professional styling. The responsive design and attention to detail create an exceptional user experience."
  } else if (percentage >= 75) {
    return "Strong design foundation with good use of CSS and layout techniques. The interface is clean and functional with minor areas for improvement in visual consistency and modern design patterns."
  } else if (percentage >= 60) {
    return "Decent design effort with basic styling in place. Consider improving color schemes, typography hierarchy, and implementing responsive design patterns for better user experience."
  } else {
    return "Design implementation needs significant improvement. Focus on creating a more visually appealing interface with consistent styling, proper color schemes, and responsive layout structure."
  }
}

function generateDesignSuggestions(score: number, maxPoints: number): string[] {
  const percentage = (score / maxPoints) * 100
  
  if (percentage >= 90) {
    return [
      "Consider adding subtle micro-interactions and animations",
      "Implement advanced CSS features like custom properties and CSS Grid",
      "Add dark mode support for enhanced accessibility",
      "Optimize for performance with CSS optimization techniques"
    ]
  } else if (percentage >= 75) {
    return [
      "Improve color contrast ratios for better accessibility",
      "Add more consistent spacing using a design system",
      "Implement hover states and interactive feedback",
      "Consider using CSS Grid for complex layouts"
    ]
  } else if (percentage >= 60) {
    return [
      "Establish a consistent color palette throughout the design",
      "Improve typography hierarchy with proper font sizes and weights",
      "Add proper spacing and alignment using CSS Grid or Flexbox",
      "Implement responsive design with media queries",
      "Use semantic HTML elements for better structure"
    ]
  } else {
    return [
      "Start with a basic color scheme and apply it consistently",
      "Focus on clean, simple layouts using Flexbox",
      "Ensure proper contrast between text and background colors",
      "Use consistent fonts and sizing throughout the project",
      "Add basic styling to all HTML elements",
      "Implement a mobile-first responsive approach"
    ]
  }
}

function generateFunctionalityFeedback(score: number, maxPoints: number): string {
  const percentage = (score / maxPoints) * 100
  
  if (percentage >= 90) {
    return "Excellent functionality implementation! All features work correctly with proper error handling, user feedback, and modern JavaScript practices. The interactive elements significantly enhance the user experience."
  } else if (percentage >= 75) {
    return "Good functional implementation with most features working as expected. Minor improvements needed in error handling, user feedback, or code organization."
  } else if (percentage >= 60) {
    return "Basic functionality is present but needs refinement. Some features may not work correctly or lack proper validation and error handling."
  } else {
    return "Functionality needs major improvements. Many required features are missing or not working correctly. Focus on implementing core requirements with proper JavaScript functionality."
  }
}

function generateFunctionalitySuggestions(score: number, maxPoints: number): string[] {
  const percentage = (score / maxPoints) * 100
  
  if (percentage >= 90) {
    return [
      "Add advanced features like keyboard shortcuts and accessibility support",
      "Implement progressive enhancement for better performance",
      "Consider adding offline functionality with service workers",
      "Add comprehensive error boundaries and fallback states"
    ]
  } else if (percentage >= 75) {
    return [
      "Add loading states and user feedback for better UX",
      "Implement proper error handling and user notifications",
      "Add form validation with clear error messages",
      "Include success/error notifications for user actions"
    ]
  } else {
    return [
      "Implement all required functionality from project requirements",
      "Add basic form validation and input sanitization",
      "Include proper event handling for user interactions",
      "Test all interactive elements thoroughly",
      "Add error handling for edge cases and invalid inputs"
    ]
  }
}

function generateCodeQualityFeedback(score: number, maxPoints: number): string {
  const percentage = (score / maxPoints) * 100
  
  if (percentage >= 90) {
    return "Outstanding code quality! Your code is exceptionally well-organized, properly documented, and follows industry best practices. The file structure is logical and highly maintainable."
  } else if (percentage >= 75) {
    return "Good code organization with solid structure and documentation. Minor improvements needed in consistency and following best practices."
  } else if (percentage >= 60) {
    return "Basic code structure is present but needs improvement in organization, naming conventions, and documentation."
  } else {
    return "Code quality needs significant improvement. Focus on better organization, consistent naming, proper file structure, and adding meaningful comments."
  }
}

function generateCodeQualitySuggestions(score: number, maxPoints: number): string[] {
  const percentage = (score / maxPoints) * 100
  
  if (percentage >= 90) {
    return [
      "Consider implementing automated testing and code coverage",
      "Add comprehensive JSDoc comments for better documentation",
      "Explore advanced code organization patterns and architecture",
      "Implement code linting and formatting tools"
    ]
  } else {
    return [
      "Add meaningful comments to explain complex logic and functions",
      "Use consistent naming conventions throughout the codebase",
      "Organize files into logical folders and modules",
      "Remove unused code, variables, and imports",
      "Follow language-specific best practices and style guides",
      "Implement proper error handling and logging"
    ]
  }
}

function generateResponsivenessFeedback(score: number, maxPoints: number): string {
  const percentage = (score / maxPoints) * 100
  
  if (percentage >= 90) {
    return "Excellent responsive design! Your application works flawlessly across all device sizes with well-implemented breakpoints, flexible layouts, and optimal user experience on every screen."
  } else if (percentage >= 75) {
    return "Good responsive implementation with most breakpoints working correctly. Minor adjustments needed for optimal mobile experience."
  } else if (percentage >= 60) {
    return "Basic responsive design is present but needs improvement for better mobile experience and cross-device compatibility."
  } else {
    return "Responsiveness needs major improvement. The design doesn't adapt well to different screen sizes and lacks proper mobile optimization."
  }
}

function generateResponsivenessSuggestions(score: number, maxPoints: number): string[] {
  return [
    "Test thoroughly on various screen sizes and devices",
    "Use relative units (rem, em, %, vw, vh) instead of fixed pixels",
    "Implement proper media queries for different breakpoints",
    "Ensure touch-friendly interface elements (minimum 44px touch targets)",
    "Optimize images for different screen densities and sizes",
    "Consider mobile-first design approach for better performance"
  ]
}

function generateAPIFeedback(score: number, maxPoints: number): string {
  const percentage = (score / maxPoints) * 100
  
  if (percentage >= 90) {
    return "Excellent API implementation! All endpoints are properly structured with correct HTTP methods, comprehensive error handling, and follow RESTful principles."
  } else if (percentage >= 75) {
    return "Good API structure with most endpoints functioning correctly. Minor improvements needed in error handling or response formatting."
  } else {
    return "API implementation needs improvement. Some endpoints may be missing, incorrectly implemented, or lack proper error handling."
  }
}

function generateAPISuggestions(score: number, maxPoints: number): string[] {
  return [
    "Implement all CRUD operations (GET, POST, PUT, DELETE) where appropriate",
    "Use proper HTTP status codes for different response types",
    "Add comprehensive error handling with meaningful error messages",
    "Include input validation and sanitization for all endpoints",
    "Document your API endpoints with clear examples",
    "Implement proper authentication and authorization where needed"
  ]
}

function generateSecurityFeedback(score: number, maxPoints: number): string {
  const percentage = (score / maxPoints) * 100
  
  if (percentage >= 90) {
    return "Excellent security implementation! Proper authentication, comprehensive input validation, and security middleware are well-implemented throughout the application."
  } else {
    return "Security implementation needs improvement. Consider adding proper authentication, input validation, and security middleware to protect against common vulnerabilities."
  }
}

function generateSecuritySuggestions(score: number, maxPoints: number): string[] {
  return [
    "Implement robust authentication system with secure password handling",
    "Add comprehensive input validation and sanitization",
    "Use security middleware (helmet, cors, rate limiting)",
    "Hash passwords securely using bcrypt or similar libraries",
    "Implement proper session management and JWT handling",
    "Add protection against common vulnerabilities (XSS, CSRF, SQL injection)"
  ]
}

function generateDatabaseFeedback(score: number, maxPoints: number): string {
  const percentage = (score / maxPoints) * 100
  
  if (percentage >= 90) {
    return "Excellent database integration! Proper schema design, efficient queries, and good data management practices are evident throughout the implementation."
  } else {
    return "Database implementation needs improvement. Focus on proper schema design, efficient data operations, and robust error handling."
  }
}

function generateDatabaseSuggestions(score: number, maxPoints: number): string[] {
  return [
    "Design proper database schemas with appropriate relationships",
    "Implement efficient database queries and operations",
    "Add data validation at both application and database levels",
    "Use appropriate indexing for better query performance",
    "Handle database errors gracefully with proper error messages",
    "Implement proper connection management and pooling"
  ]
}

function generateGenericFeedback(category: string, score: number, maxPoints: number): string {
  const percentage = (score / maxPoints) * 100
  
  if (percentage >= 90) {
    return `Excellent work on ${category.toLowerCase()}! Your implementation demonstrates strong understanding, attention to detail, and follows best practices effectively.`
  } else if (percentage >= 75) {
    return `Good implementation of ${category.toLowerCase()}. The foundation is solid with some areas for improvement to reach excellence.`
  } else if (percentage >= 60) {
    return `Decent attempt at ${category.toLowerCase()}. Several areas need improvement to fully meet the requirements and best practices.`
  } else {
    return `${category} needs significant improvement. Please review the requirements carefully and consider refactoring this section with proper implementation.`
  }
}

function generateGenericSuggestions(category: string): string[] {
  return [
    `Review the project requirements for ${category.toLowerCase()} carefully`,
    `Research and implement best practices for ${category.toLowerCase()}`,
    `Test your implementation thoroughly with various scenarios`,
    `Seek feedback from peers or mentors on your approach`,
    `Refer to official documentation and trusted tutorials`,
    `Consider edge cases and error handling in your implementation`
  ]
}

function getOverallGrade(percentage: number): string {
  if (percentage >= 95) return 'A+'
  if (percentage >= 90) return 'A'
  if (percentage >= 85) return 'A-'
  if (percentage >= 80) return 'B+'
  if (percentage >= 75) return 'B'
  if (percentage >= 70) return 'B-'
  if (percentage >= 65) return 'C+'
  if (percentage >= 60) return 'C'
  if (percentage >= 55) return 'C-'
  if (percentage >= 50) return 'D'
  return 'F'
}