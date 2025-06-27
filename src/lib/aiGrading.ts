import { ProjectTemplate, AIFeedback } from "@/types/project";

interface CodeAnalysis {
  files: Record<string, string>;
  repositoryUrl?: string;
  deployedUrl?: string;
}

export interface GradingResult {
  totalScore: number;
  maxScore: number;
  feedback: AIFeedback[];
  overallGrade: string;
}

export async function gradeProject(
  project: ProjectTemplate,
  codeAnalysis: CodeAnalysis
): Promise<GradingResult> {
  try {
    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const feedback: AIFeedback[] = [];
    let totalScore = 0;
    const maxScore = project.maxPoints;

    // Validate that we have actual code to grade
    if (!codeAnalysis.files || Object.keys(codeAnalysis.files).length === 0) {
      throw new Error("No code files found for grading");
    }

    // Check if repository URL is valid (basic validation)
    if (
      codeAnalysis.repositoryUrl &&
      !isValidGitHubUrl(codeAnalysis.repositoryUrl)
    ) {
      throw new Error("Invalid GitHub repository URL");
    }

    // Grade each criteria based on actual code analysis
    for (const criteria of project.gradingCriteria) {
      const score = await gradeCriteria(criteria, codeAnalysis, project);
      feedback.push(score);
      totalScore += score.score;
    }

    // Additional validation - check if requirements are met
    const requirementsMet = await validateProjectRequirements(
      project,
      codeAnalysis
    );
    if (!requirementsMet.isValid) {
      // Reduce score for missing requirements
      totalScore = Math.max(0, totalScore - maxScore * 0.3);
      feedback.push({
        category: "Requirements Validation",
        score: 0,
        maxScore: maxScore * 0.3,
        feedback:
          "Some project requirements are not met: " +
          requirementsMet.missingRequirements.join(", "),
        suggestions: [
          "Ensure all project requirements are implemented",
          "Review the project specification",
        ],
      });
    }

    const percentage = (totalScore / maxScore) * 100;
    const overallGrade = getOverallGrade(percentage);

    return {
      totalScore: Math.round(totalScore),
      maxScore,
      feedback,
      overallGrade,
    };
  } catch (error) {
    console.error("Error grading project:", error);
    throw new Error("Failed to grade project: " + error.message);
  }
}

function isValidGitHubUrl(url: string): boolean {
  const githubPattern = /^https:\/\/github\.com\/[\w\-\.]+\/[\w\-\.]+\/?$/;
  return githubPattern.test(url);
}

async function validateProjectRequirements(
  project: ProjectTemplate,
  codeAnalysis: CodeAnalysis
): Promise<{ isValid: boolean; missingRequirements: string[] }> {
  const missingRequirements: string[] = [];
  const files = codeAnalysis.files;
  const fileContents = Object.values(files).join("\n").toLowerCase();

  // Check basic requirements based on project type
  for (const requirement of project.requirements) {
    const reqLower = requirement.toLowerCase();

    // Check for specific patterns in the code
    if (reqLower.includes("responsive") && !hasResponsiveDesign(files)) {
      missingRequirements.push("Responsive design");
    }

    if (reqLower.includes("form") && !hasFormElements(fileContents)) {
      missingRequirements.push("Form implementation");
    }

    if (reqLower.includes("api") && !hasAPIIntegration(fileContents)) {
      missingRequirements.push("API integration");
    }

    if (
      reqLower.includes("authentication") &&
      !hasAuthentication(fileContents)
    ) {
      missingRequirements.push("Authentication system");
    }
  }

  return {
    isValid: missingRequirements.length === 0,
    missingRequirements,
  };
}

function hasResponsiveDesign(files: Record<string, string>): boolean {
  const cssFiles = Object.entries(files).filter(([path]) =>
    path.endsWith(".css")
  );
  return cssFiles.some(
    ([, content]) =>
      content.includes("@media") ||
      content.includes("responsive") ||
      content.includes("flex") ||
      content.includes("grid")
  );
}

function hasFormElements(content: string): boolean {
  return (
    content.includes("<form") ||
    content.includes("input") ||
    content.includes("textarea") ||
    content.includes("form")
  );
}

function hasAPIIntegration(content: string): boolean {
  return (
    content.includes("fetch(") ||
    content.includes("axios") ||
    content.includes("api") ||
    content.includes("endpoint")
  );
}

function hasAuthentication(content: string): boolean {
  return (
    content.includes("login") ||
    content.includes("auth") ||
    content.includes("jwt") ||
    content.includes("password")
  );
}

async function gradeCriteria(
  criteria: any,
  codeAnalysis: CodeAnalysis,
  project: ProjectTemplate
): Promise<AIFeedback> {
  const { category, maxPoints, requirements } = criteria;

  // Analyze code based on criteria category
  let score = 0;
  let feedback = "";
  let suggestions: string[] = [];

  switch (category.toLowerCase()) {
    case "design & ui":
    case "design":
      score = await gradeDesignAndUI(codeAnalysis, maxPoints, requirements);
      feedback = generateDesignFeedback(score, maxPoints);
      suggestions = generateDesignSuggestions(score, maxPoints);
      break;

    case "functionality":
    case "core functionality":
      score = await gradeFunctionality(
        codeAnalysis,
        maxPoints,
        requirements,
        project
      );
      feedback = generateFunctionalityFeedback(score, maxPoints);
      suggestions = generateFunctionalitySuggestions(score, maxPoints);
      break;

    case "code quality":
      score = await gradeCodeQuality(codeAnalysis, maxPoints, requirements);
      feedback = generateCodeQualityFeedback(score, maxPoints);
      suggestions = generateCodeQualitySuggestions(score, maxPoints);
      break;

    case "responsiveness":
      score = await gradeResponsiveness(codeAnalysis, maxPoints, requirements);
      feedback = generateResponsivenessFeedback(score, maxPoints);
      suggestions = generateResponsivenessSuggestions(score, maxPoints);
      break;

    case "api endpoints":
    case "api integration":
      score = await gradeAPIEndpoints(codeAnalysis, maxPoints, requirements);
      feedback = generateAPIFeedback(score, maxPoints);
      suggestions = generateAPISuggestions(score, maxPoints);
      break;

    case "authentication & security":
    case "security":
      score = await gradeSecurity(codeAnalysis, maxPoints, requirements);
      feedback = generateSecurityFeedback(score, maxPoints);
      suggestions = generateSecuritySuggestions(score, maxPoints);
      break;

    case "database integration":
    case "data persistence":
      score = await gradeDatabase(codeAnalysis, maxPoints, requirements);
      feedback = generateDatabaseFeedback(score, maxPoints);
      suggestions = generateDatabaseSuggestions(score, maxPoints);
      break;

    default:
      score = await gradeGenericCriteria(codeAnalysis, maxPoints, requirements);
      feedback = generateGenericFeedback(category, score, maxPoints);
      suggestions = generateGenericSuggestions(category);
  }

  return {
    category,
    score: Math.min(Math.max(0, Math.round(score)), maxPoints),
    maxScore: maxPoints,
    feedback,
    suggestions,
  };
}

// Enhanced grading functions with more sophisticated analysis

async function gradeDesignAndUI(
  codeAnalysis: CodeAnalysis,
  maxPoints: number
): Promise<number> {
  let score = 0;
  const files = codeAnalysis.files;

  // Check for CSS files and quality
  const cssFiles = Object.entries(files).filter(([path]) =>
    path.endsWith(".css")
  );
  if (cssFiles.length === 0) {
    return maxPoints * 0.1; // Very low score for no CSS
  }

  const cssContent = cssFiles.map(([, content]) => content).join("\n");

  // Check for modern CSS features
  if (cssContent.includes("flexbox") || cssContent.includes("display: flex"))
    score += maxPoints * 0.15;
  if (cssContent.includes("grid") || cssContent.includes("display: grid"))
    score += maxPoints * 0.15;
  if (cssContent.includes("@media")) score += maxPoints * 0.2; // Responsive design

  // Check for color usage and styling depth
  const colorMatches = cssContent.match(/color\s*:/g);
  if (colorMatches && colorMatches.length > 3) score += maxPoints * 0.1;

  // Check for animations and transitions
  if (cssContent.includes("transition") || cssContent.includes("animation"))
    score += maxPoints * 0.1;

  // Check for consistent styling (multiple classes)
  const classMatches = cssContent.match(/\.[a-zA-Z-_]+\s*{/g);
  if (classMatches && classMatches.length > 5) score += maxPoints * 0.15;

  // Check HTML structure quality
  const htmlFiles = Object.entries(files).filter(([path]) =>
    path.endsWith(".html")
  );
  if (htmlFiles.length > 0) {
    const htmlContent = htmlFiles.map(([, content]) => content).join("\n");
    if (htmlContent.includes("<header>") || htmlContent.includes("<nav>"))
      score += maxPoints * 0.05;
    if (htmlContent.includes("<main>") || htmlContent.includes("<section>"))
      score += maxPoints * 0.05;
    if (htmlContent.includes("<footer>")) score += maxPoints * 0.05;
  }

  return Math.min(score, maxPoints);
}

async function gradeFunctionality(
  codeAnalysis: CodeAnalysis,
  maxPoints: number,
  requirements: string[],
  project: ProjectTemplate
): Promise<number> {
  let score = 0;
  const files = codeAnalysis.files;
  const allContent = Object.values(files).join("\n").toLowerCase();

  // Check for JavaScript functionality
  const jsFiles = Object.entries(files).filter(
    ([path]) =>
      path.endsWith(".js") ||
      path.endsWith(".jsx") ||
      path.endsWith(".ts") ||
      path.endsWith(".tsx")
  );

  if (jsFiles.length === 0) {
    return maxPoints * 0.2; // Low score for no JavaScript
  }

  const jsContent = jsFiles
    .map(([, content]) => content)
    .join("\n")
    .toLowerCase();

  // Check for event handling
  if (jsContent.includes("addeventlistener") || jsContent.includes("onclick"))
    score += maxPoints * 0.2;

  // Check for form handling
  if (jsContent.includes("form") && jsContent.includes("submit"))
    score += maxPoints * 0.15;

  // Check for API calls
  if (
    jsContent.includes("fetch") ||
    jsContent.includes("axios") ||
    jsContent.includes("api")
  )
    score += maxPoints * 0.2;

  // Check for DOM manipulation
  if (
    jsContent.includes("getelementbyid") ||
    jsContent.includes("queryselector")
  )
    score += maxPoints * 0.15;

  // Check for data validation
  if (jsContent.includes("validation") || jsContent.includes("validate"))
    score += maxPoints * 0.1;

  // Check for error handling
  if (jsContent.includes("try") && jsContent.includes("catch"))
    score += maxPoints * 0.1;

  // Check project-specific requirements
  for (const requirement of requirements) {
    const reqLower = requirement.toLowerCase();
    if (allContent.includes(reqLower.split(" ")[0])) {
      score += maxPoints * 0.05;
    }
  }

  return Math.min(score, maxPoints);
}

async function gradeCodeQuality(
  codeAnalysis: CodeAnalysis,
  maxPoints: number,
  requirements: string[]
): Promise<number> {
  let score = 0;
  const files = codeAnalysis.files;

  // Check file organization
  const fileCount = Object.keys(files).length;
  if (fileCount >= 3) score += maxPoints * 0.2;
  if (fileCount >= 5) score += maxPoints * 0.1;

  // Check for proper file structure
  const hasCSS = Object.keys(files).some((path) => path.endsWith(".css"));
  const hasJS = Object.keys(files).some(
    (path) => path.endsWith(".js") || path.endsWith(".jsx")
  );
  const hasHTML = Object.keys(files).some((path) => path.endsWith(".html"));

  if (hasCSS && hasJS && hasHTML) score += maxPoints * 0.2;

  // Check for comments
  const hasComments = Object.values(files).some(
    (content) =>
      content.includes("//") ||
      content.includes("/*") ||
      content.includes("<!--")
  );
  if (hasComments) score += maxPoints * 0.15;

  // Check for consistent naming (lowercase, no spaces)
  const hasConsistentNaming = Object.keys(files).every(
    (path) => path.toLowerCase() === path && !path.includes(" ")
  );
  if (hasConsistentNaming) score += maxPoints * 0.1;

  // Check for semantic HTML
  const htmlContent = Object.entries(files)
    .filter(([path]) => path.endsWith(".html"))
    .map(([, content]) => content)
    .join("\n");

  if (
    htmlContent.includes("<header>") ||
    htmlContent.includes("<nav>") ||
    htmlContent.includes("<main>") ||
    htmlContent.includes("<section>")
  ) {
    score += maxPoints * 0.15;
  }

  // Check for proper indentation (basic check)
  const isWellFormatted = Object.values(files).some(
    (content) => content.includes("  ") || content.includes("\t") // Has indentation
  );
  if (isWellFormatted) score += maxPoints * 0.1;

  return Math.min(score, maxPoints);
}

async function gradeResponsiveness(
  codeAnalysis: CodeAnalysis,
  maxPoints: number,
  requirements: string[]
): Promise<number> {
  let score = 0;
  const files = codeAnalysis.files;

  // Check for viewport meta tag
  const htmlFiles = Object.entries(files).filter(([path]) =>
    path.endsWith(".html")
  );
  const hasViewport = htmlFiles.some(
    ([, content]) =>
      content.includes("viewport") && content.includes("width=device-width")
  );
  if (hasViewport) score += maxPoints * 0.3;

  // Check for media queries
  const cssFiles = Object.entries(files).filter(([path]) =>
    path.endsWith(".css")
  );
  const hasMediaQueries = cssFiles.some(([, content]) =>
    content.includes("@media")
  );
  if (hasMediaQueries) score += maxPoints * 0.4;

  // Check for flexible layouts
  const cssContent = cssFiles.map(([, content]) => content).join("\n");
  if (cssContent.includes("flex") || cssContent.includes("grid"))
    score += maxPoints * 0.2;

  // Check for relative units
  if (
    cssContent.includes("%") ||
    cssContent.includes("rem") ||
    cssContent.includes("em")
  ) {
    score += maxPoints * 0.1;
  }

  return Math.min(score, maxPoints);
}

async function gradeAPIEndpoints(
  codeAnalysis: CodeAnalysis,
  maxPoints: number,
  requirements: string[]
): Promise<number> {
  let score = 0;
  const files = codeAnalysis.files;
  const allContent = Object.values(files).join("\n").toLowerCase();

  // Check for route definitions
  if (allContent.includes("app.get") || allContent.includes("router.get"))
    score += maxPoints * 0.2;
  if (allContent.includes("app.post") || allContent.includes("router.post"))
    score += maxPoints * 0.2;
  if (allContent.includes("app.put") || allContent.includes("router.put"))
    score += maxPoints * 0.15;
  if (allContent.includes("app.delete") || allContent.includes("router.delete"))
    score += maxPoints * 0.15;

  // Check for error handling
  if (allContent.includes("try") && allContent.includes("catch"))
    score += maxPoints * 0.15;

  // Check for status codes
  if (allContent.includes("status(") || allContent.includes(".status"))
    score += maxPoints * 0.1;

  // Check for middleware
  if (allContent.includes("middleware") || allContent.includes("app.use"))
    score += maxPoints * 0.05;

  return Math.min(score, maxPoints);
}

async function gradeSecurity(
  codeAnalysis: CodeAnalysis,
  maxPoints: number,
  requirements: string[]
): Promise<number> {
  let score = 0;
  const allContent = Object.values(codeAnalysis.files).join("\n").toLowerCase();

  // Check for authentication
  if (allContent.includes("jwt") || allContent.includes("auth"))
    score += maxPoints * 0.3;

  // Check for password hashing
  if (allContent.includes("bcrypt") || allContent.includes("hash"))
    score += maxPoints * 0.2;

  // Check for input validation
  if (allContent.includes("validation") || allContent.includes("validate"))
    score += maxPoints * 0.2;

  // Check for security middleware
  if (allContent.includes("helmet") || allContent.includes("cors"))
    score += maxPoints * 0.15;

  // Check for environment variables
  if (allContent.includes("process.env") || allContent.includes(".env"))
    score += maxPoints * 0.1;

  // Check for rate limiting
  if (allContent.includes("rate") && allContent.includes("limit"))
    score += maxPoints * 0.05;

  return Math.min(score, maxPoints);
}

async function gradeDatabase(
  codeAnalysis: CodeAnalysis,
  maxPoints: number,
  requirements: string[]
): Promise<number> {
  let score = 0;
  const allContent = Object.values(codeAnalysis.files).join("\n").toLowerCase();

  // Check for database connection
  if (allContent.includes("mongoose") || allContent.includes("mongodb"))
    score += maxPoints * 0.25;
  if (allContent.includes("sequelize") || allContent.includes("postgresql"))
    score += maxPoints * 0.25;

  // Check for models/schemas
  if (allContent.includes("schema") || allContent.includes("model"))
    score += maxPoints * 0.3;

  // Check for CRUD operations
  if (allContent.includes("find") || allContent.includes("select"))
    score += maxPoints * 0.1;
  if (allContent.includes("save") || allContent.includes("insert"))
    score += maxPoints * 0.1;
  if (allContent.includes("update")) score += maxPoints * 0.1;
  if (allContent.includes("delete") || allContent.includes("remove"))
    score += maxPoints * 0.1;

  return Math.min(score, maxPoints);
}

async function gradeGenericCriteria(
  codeAnalysis: CodeAnalysis,
  maxPoints: number,
  requirements: string[]
): Promise<number> {
  // Basic scoring based on code presence and structure
  const fileCount = Object.keys(codeAnalysis.files).length;
  const totalLines = Object.values(codeAnalysis.files).reduce(
    (sum, content) => sum + content.split("\n").length,
    0
  );

  let score = 0;

  // Score based on file count
  if (fileCount >= 3) score += maxPoints * 0.3;
  if (fileCount >= 5) score += maxPoints * 0.2;

  // Score based on code volume
  if (totalLines >= 50) score += maxPoints * 0.3;
  if (totalLines >= 100) score += maxPoints * 0.2;

  return Math.min(score, maxPoints);
}

// Feedback generation functions (keeping existing ones but enhancing them)

function generateDesignFeedback(score: number, maxPoints: number): string {
  const percentage = (score / maxPoints) * 100;

  if (percentage >= 90) {
    return "Outstanding design implementation! Your UI demonstrates excellent visual hierarchy, modern CSS techniques, and professional styling. The design choices significantly enhance user experience.";
  } else if (percentage >= 75) {
    return "Good design work! The interface is well-structured with modern CSS features. There are opportunities to enhance visual consistency and add more sophisticated styling.";
  } else if (percentage >= 60) {
    return "Decent design foundation with basic styling present. Consider improving color schemes, typography, and implementing responsive design patterns.";
  } else if (percentage >= 40) {
    return "Basic styling is present but needs significant improvement. Focus on implementing proper CSS structure, responsive design, and visual hierarchy.";
  } else {
    return "Design implementation is minimal. The project needs comprehensive styling with CSS, proper layout structure, and attention to visual design principles.";
  }
}

function generateDesignSuggestions(score: number, maxPoints: number): string[] {
  const percentage = (score / maxPoints) * 100;

  if (percentage >= 90) {
    return [
      "Consider adding CSS animations and micro-interactions",
      "Implement advanced CSS features like custom properties",
      "Add dark mode support for enhanced accessibility",
      "Optimize for performance with CSS best practices",
    ];
  } else if (percentage >= 75) {
    return [
      "Improve color contrast for better accessibility",
      "Add consistent spacing using a design system",
      "Implement more sophisticated hover states",
      "Consider using CSS Grid for complex layouts",
    ];
  } else if (percentage >= 60) {
    return [
      "Develop a consistent color palette and stick to it",
      "Improve typography hierarchy and readability",
      "Add proper spacing and alignment throughout",
      "Implement responsive design with media queries",
    ];
  } else {
    return [
      "Start with a basic CSS file and fundamental styling",
      "Implement a simple color scheme",
      "Add basic layout structure with proper spacing",
      "Ensure text is readable with proper contrast",
      "Use semantic HTML elements for better structure",
    ];
  }
}

function generateFunctionalityFeedback(
  score: number,
  maxPoints: number
): string {
  const percentage = (score / maxPoints) * 100;

  if (percentage >= 90) {
    return "Excellent functionality implementation! All features work correctly with robust error handling, proper validation, and smooth user interactions. The code demonstrates advanced JavaScript concepts.";
  } else if (percentage >= 75) {
    return "Good functional implementation with most features working as expected. Minor improvements needed in error handling or user feedback mechanisms.";
  } else if (percentage >= 60) {
    return "Basic functionality is present but needs refinement. Some features may not work correctly or lack proper validation and error handling.";
  } else if (percentage >= 40) {
    return "Limited functionality implemented. Several core features are missing or not working correctly. Focus on implementing the basic requirements first.";
  } else {
    return "Functionality is severely lacking. Most required features are missing or non-functional. Start by implementing core JavaScript functionality and event handling.";
  }
}

function generateFunctionalitySuggestions(
  score: number,
  maxPoints: number
): string[] {
  const percentage = (score / maxPoints) * 100;

  if (percentage >= 90) {
    return [
      "Add advanced features like keyboard shortcuts",
      "Implement progressive enhancement patterns",
      "Consider adding offline functionality",
      "Add comprehensive error boundaries",
    ];
  } else if (percentage >= 75) {
    return [
      "Add loading states for better user experience",
      "Implement comprehensive error handling",
      "Add form validation with user feedback",
      "Include success/error notifications",
    ];
  } else {
    return [
      "Implement all required functionality from project requirements",
      "Add basic form validation and error handling",
      "Include proper event listeners for user interactions",
      "Test all interactive elements thoroughly",
      "Add basic JavaScript functionality for dynamic behavior",
    ];
  }
}

function generateCodeQualityFeedback(score: number, maxPoints: number): string {
  const percentage = (score / maxPoints) * 100;

  if (percentage >= 90) {
    return "Exceptional code quality! Your code is excellently organized, well-documented, and follows industry best practices. The file structure is logical and highly maintainable.";
  } else if (percentage >= 75) {
    return "Good code organization with solid structure. There's room for improvement in documentation and consistency, but the overall approach is sound.";
  } else if (percentage >= 60) {
    return "Basic code structure is present but needs improvement in organization, naming conventions, and documentation. Consider refactoring for better maintainability.";
  } else if (percentage >= 40) {
    return "Code organization needs significant improvement. Focus on better file structure, consistent naming, and adding meaningful comments.";
  } else {
    return "Code quality is poor with minimal organization. Start by creating a proper file structure, using consistent naming conventions, and adding basic documentation.";
  }
}

function generateCodeQualitySuggestions(
  score: number,
  maxPoints: number
): string[] {
  const percentage = (score / maxPoints) * 100;

  if (percentage >= 90) {
    return [
      "Consider implementing automated testing",
      "Add comprehensive JSDoc comments",
      "Explore advanced code organization patterns",
      "Implement code linting and formatting tools",
    ];
  } else {
    return [
      "Add meaningful comments to explain complex logic",
      "Use consistent naming conventions throughout",
      "Organize files into logical folders and modules",
      "Remove unused code and variables",
      "Follow language-specific best practices and style guides",
    ];
  }
}

function generateResponsivenessFeedback(
  score: number,
  maxPoints: number
): string {
  const percentage = (score / maxPoints) * 100;

  if (percentage >= 90) {
    return "Excellent responsive design! Your application works flawlessly across all device sizes with well-implemented breakpoints and flexible layouts.";
  } else if (percentage >= 75) {
    return "Good responsive implementation with minor issues on some screen sizes. Most breakpoints work correctly with room for refinement.";
  } else if (percentage >= 60) {
    return "Basic responsive design is present but needs improvement for better mobile experience and cross-device compatibility.";
  } else {
    return "Responsiveness is inadequate. The design doesn't adapt well to different screen sizes and lacks mobile optimization.";
  }
}

function generateResponsivenessSuggestions(
  score: number,
  maxPoints: number
): string[] {
  return [
    "Test thoroughly on various screen sizes and devices",
    "Use relative units (rem, em, %) instead of fixed pixels",
    "Implement proper media queries for different breakpoints",
    "Ensure touch-friendly interface elements on mobile",
    "Optimize images and content for different screen densities",
  ];
}

function generateAPIFeedback(score: number, maxPoints: number): string {
  const percentage = (score / maxPoints) * 100;

  if (percentage >= 90) {
    return "Outstanding API implementation! All endpoints are properly structured with correct HTTP methods, comprehensive error handling, and appropriate status codes.";
  } else if (percentage >= 75) {
    return "Good API structure with most endpoints functioning correctly. Minor improvements needed in error handling or response formatting.";
  } else {
    return "API implementation needs significant improvement. Several endpoints may be missing or not functioning correctly.";
  }
}

function generateAPISuggestions(score: number, maxPoints: number): string[] {
  return [
    "Implement all CRUD operations (GET, POST, PUT, DELETE)",
    "Use appropriate HTTP status codes for different scenarios",
    "Add comprehensive error handling and validation",
    "Include proper request/response formatting",
    "Document your API endpoints clearly with examples",
  ];
}

function generateSecurityFeedback(score: number, maxPoints: number): string {
  const percentage = (score / maxPoints) * 100;

  if (percentage >= 90) {
    return "Excellent security implementation! Proper authentication, input validation, and security measures are comprehensively implemented.";
  } else {
    return "Security implementation needs improvement. Consider adding authentication, input validation, and other security measures.";
  }
}

function generateSecuritySuggestions(
  score: number,
  maxPoints: number
): string[] {
  return [
    "Implement a robust authentication system",
    "Add comprehensive input validation and sanitization",
    "Use security middleware (helmet, cors, rate limiting)",
    "Hash passwords securely with bcrypt or similar",
    "Implement proper session management",
  ];
}

function generateDatabaseFeedback(score: number, maxPoints: number): string {
  const percentage = (score / maxPoints) * 100;

  if (percentage >= 90) {
    return "Excellent database integration! Proper schema design, efficient queries, and comprehensive data management practices are implemented.";
  } else {
    return "Database implementation needs improvement. Focus on proper schema design and efficient data operations.";
  }
}

function generateDatabaseSuggestions(
  score: number,
  maxPoints: number
): string[] {
  return [
    "Design proper database schemas with appropriate relationships",
    "Implement efficient database queries and operations",
    "Add data validation at both application and database levels",
    "Use appropriate indexing for performance optimization",
    "Handle database errors gracefully with proper error messages",
  ];
}

function generateGenericFeedback(
  category: string,
  score: number,
  maxPoints: number
): string {
  const percentage = (score / maxPoints) * 100;

  if (percentage >= 90) {
    return `Excellent work on ${category.toLowerCase()}! Your implementation demonstrates strong understanding and attention to detail with professional-level execution.`;
  } else if (percentage >= 75) {
    return `Good implementation of ${category.toLowerCase()}. The foundation is solid with some areas for improvement to reach professional standards.`;
  } else if (percentage >= 60) {
    return `Decent attempt at ${category.toLowerCase()}. Several areas need improvement to meet the requirements fully and achieve better quality.`;
  } else if (percentage >= 40) {
    return `Basic implementation of ${category.toLowerCase()} is present but needs significant improvement to meet project requirements.`;
  } else {
    return `${category} implementation is insufficient. Major improvements needed to meet basic project requirements and standards.`;
  }
}

function generateGenericSuggestions(category: string): string[] {
  return [
    `Review the project requirements for ${category.toLowerCase()} carefully`,
    `Research and implement best practices for ${category.toLowerCase()}`,
    `Test your implementation thoroughly across different scenarios`,
    `Seek feedback from peers or mentors on your approach`,
    `Refer to official documentation and trusted tutorials for guidance`,
  ];
}

function getOverallGrade(percentage: number): string {
  if (percentage >= 90) return "A";
  if (percentage >= 80) return "B";
  if (percentage >= 70) return "C";
  if (percentage >= 60) return "D";
  return "F";
}
