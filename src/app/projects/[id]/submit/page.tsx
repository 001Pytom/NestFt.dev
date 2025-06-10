'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { 
  Upload, 
  Github, 
  Globe, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Trophy,
  Star
} from 'lucide-react'
import { beginnerProjects, intermediateProjects, advancedProjects } from '@/data/projects'
import { ProjectTemplate, AIFeedback } from '@/types/project'

export default function SubmitProjectPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  
  const [project, setProject] = useState<ProjectTemplate | null>(null)
  const [repositoryUrl, setRepositoryUrl] = useState('')
  const [deployedUrl, setDeployedUrl] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGrading, setIsGrading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<AIFeedback[]>([])

  useEffect(() => {
    const allProjects = [...beginnerProjects, ...intermediateProjects, ...advancedProjects]
    const foundProject = allProjects.find(p => p.id === projectId)
    
    if (!foundProject) {
      router.push('/projects/browse')
      return
    }
    
    setProject(foundProject)
  }, [projectId, router])

  const handleSubmit = async () => {
    if (!project || !repositoryUrl.trim()) return
    
    setIsSubmitting(true)
    
    try {
      // Simulate submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSubmitted(true)
      setIsSubmitting(false)
      setIsGrading(true)
      
      // Simulate AI grading
      await simulateAIGrading()
      
    } catch (error) {
      console.error('Submission error:', error)
      setIsSubmitting(false)
    }
  }

  const simulateAIGrading = async () => {
    // Simulate AI analysis time
    await new Promise(resolve => setTimeout(resolve, 5000))
    
    // Generate mock feedback based on grading criteria
    const mockFeedback: AIFeedback[] = project!.gradingCriteria.map(criteria => {
      const score = Math.floor(Math.random() * (criteria.maxPoints * 0.4)) + (criteria.maxPoints * 0.6)
      
      return {
        category: criteria.category,
        score,
        maxScore: criteria.maxPoints,
        feedback: generateMockFeedback(criteria.category, score, criteria.maxPoints),
        suggestions: generateMockSuggestions(criteria.category)
      }
    })
    
    const totalScore = mockFeedback.reduce((sum, f) => sum + f.score, 0)
    
    setFeedback(mockFeedback)
    setScore(totalScore)
    setIsGrading(false)
  }

  const generateMockFeedback = (category: string, score: number, maxScore: number): string => {
    const percentage = (score / maxScore) * 100
    
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

  const generateMockSuggestions = (category: string): string[] => {
    const suggestions: Record<string, string[]> = {
      'Design & UI': [
        'Consider using a consistent color scheme throughout',
        'Improve spacing and typography for better readability',
        'Add hover states and micro-interactions'
      ],
      'Functionality': [
        'Add proper error handling for edge cases',
        'Implement input validation',
        'Consider adding loading states'
      ],
      'Code Quality': [
        'Break down large functions into smaller, reusable components',
        'Add comments for complex logic',
        'Follow consistent naming conventions'
      ],
      'Responsiveness': [
        'Test on various screen sizes',
        'Use relative units instead of fixed pixels',
        'Implement mobile-first design approach'
      ]
    }
    
    return suggestions[category] || [
      'Review the project requirements carefully',
      'Consider best practices for this technology',
      'Test your implementation thoroughly'
    ]
  }

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 90) return 'text-green-600'
    if (percentage >= 75) return 'text-blue-600'
    if (percentage >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getOverallGrade = (totalScore: number, maxScore: number) => {
    const percentage = (totalScore / maxScore) * 100
    if (percentage >= 90) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-50' }
    if (percentage >= 80) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-50' }
    if (percentage >= 70) return { grade: 'C', color: 'text-yellow-600', bg: 'bg-yellow-50' }
    if (percentage >= 60) return { grade: 'D', color: 'text-orange-600', bg: 'bg-orange-50' }
    return { grade: 'F', color: 'text-red-600', bg: 'bg-red-50' }
  }

  if (!project) {
    return null
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold mb-4">Submit Your Project</h1>
          <p className="text-lg text-muted-foreground">
            {project.name} - Ready for AI evaluation
          </p>
        </motion.div>

        {!submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Project Submission</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    GitHub Repository URL *
                  </label>
                  <div className="relative">
                    <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={repositoryUrl}
                      onChange={(e) => setRepositoryUrl(e.target.value)}
                      placeholder="https://github.com/username/repository"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Deployed URL (Optional)
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={deployedUrl}
                      onChange={(e) => setDeployedUrl(e.target.value)}
                      placeholder="https://your-project.netlify.app"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Project Description
                  </label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your implementation, challenges faced, and any additional features you added..."
                    rows={4}
                  />
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!repositoryUrl.trim() || isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Submit for Grading
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {/* Submission Confirmation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-green-800 mb-2">
                    Project Submitted Successfully!
                  </h2>
                  <p className="text-green-700">
                    Your project is now being evaluated by our AI grading system.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Grading Progress */}
            {isGrading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardContent className="p-6 text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                    <h3 className="text-lg font-semibold mb-2">AI Grading in Progress</h3>
                    <p className="text-muted-foreground">
                      Our AI is analyzing your code, checking requirements, and evaluating your implementation...
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Results */}
            {score !== null && feedback.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                {/* Overall Score */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5" />
                      Your Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className={`text-6xl font-bold mb-2 ${getOverallGrade(score, project.maxPoints).color}`}>
                        {getOverallGrade(score, project.maxPoints).grade}
                      </div>
                      <div className="text-2xl font-semibold mb-2">
                        {score} / {project.maxPoints} points
                      </div>
                      <div className="text-lg text-muted-foreground">
                        {Math.round((score / project.maxPoints) * 100)}% Score
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Feedback */}
                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Feedback</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {feedback.map((item, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold">{item.category}</h4>
                            <div className="flex items-center gap-2">
                              <span className={`font-bold ${getScoreColor(item.score, item.maxScore)}`}>
                                {item.score}/{item.maxScore}
                              </span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < Math.round((item.score / item.maxScore) * 5)
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground mb-4">{item.feedback}</p>
                          
                          <div>
                            <h5 className="font-medium mb-2">Suggestions for Improvement:</h5>
                            <ul className="space-y-1">
                              {item.suggestions.map((suggestion, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                  <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                  <span>{suggestion}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Next Steps */}
                <Card>
                  <CardHeader>
                    <CardTitle>Next Steps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Great work on completing this project! Here's what you can do next:
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline" className="justify-start">
                          <Github className="h-4 w-4 mr-2" />
                          View on GitHub
                        </Button>
                        
                        {deployedUrl && (
                          <Button variant="outline" className="justify-start">
                            <Globe className="h-4 w-4 mr-2" />
                            View Live Project
                          </Button>
                        )}
                        
                        <Button 
                          variant="outline" 
                          className="justify-start"
                          onClick={() => router.push('/projects/browse')}
                        >
                          <Trophy className="h-4 w-4 mr-2" />
                          Try Another Project
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="justify-start"
                          onClick={() => router.push('/portfolio')}
                        >
                          <Star className="h-4 w-4 mr-2" />
                          View Portfolio
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}