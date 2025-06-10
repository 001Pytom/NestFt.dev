'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Code, Clock, Trophy, CheckCircle } from 'lucide-react'
import { beginnerProjects, intermediateProjects, advancedProjects, techStacks } from '@/data/projects'
import { ProjectTemplate, TechTemplate } from '@/types/project'
import Link from 'next/link'

export default function ProjectSetupPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  
  const [project, setProject] = useState<ProjectTemplate | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<TechTemplate | null>(null)
  const [projectName, setProjectName] = useState('')
  const [availableTemplates, setAvailableTemplates] = useState<TechTemplate[]>([])

  useEffect(() => {
    const allProjects = [...beginnerProjects, ...intermediateProjects, ...advancedProjects]
    const foundProject = allProjects.find(p => p.id === projectId)
    
    if (!foundProject) {
      router.push('/projects/browse')
      return
    }
    
    setProject(foundProject)
    setProjectName(foundProject.name.replace(/\s+/g, '-').toLowerCase())
    
    // Get available templates based on project stack
    const relevantStacks = techStacks.filter(stack => 
      stack.id === foundProject.stack || foundProject.stack === 'fullstack'
    )
    
    const templates = relevantStacks.flatMap(stack => stack.templates)
    setAvailableTemplates(templates)
    
    // Auto-select first template if only one available
    if (templates.length === 1) {
      setSelectedTemplate(templates[0])
    }
  }, [projectId, router])

  const handleCreateProject = () => {
    if (!project || !selectedTemplate || !projectName.trim()) {
      return
    }
    
    // Navigate to IDE with project setup
    router.push(`/ide/${projectId}?template=${selectedTemplate.id}&name=${encodeURIComponent(projectName)}`)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500/10 text-green-700 border-green-200'
      case 'intermediate':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-200'
      case 'advanced':
        return 'bg-red-500/10 text-red-700 border-red-200'
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-200'
    }
  }

  if (!project) {
    return null
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link 
            href="/projects/browse"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
          
          <div className="text-center">
            <Badge className={getDifficultyColor(project.difficulty)} variant="outline">
              {project.difficulty}
            </Badge>
            <h1 className="text-3xl font-bold mt-2 mb-4">{project.name}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {project.description}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Project Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Project Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Estimated Time:</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{project.estimatedHours} hours</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Max Points:</span>
                  <span className="font-semibold">{project.maxPoints} pts</span>
                </div>
                
                <div>
                  <span className="text-sm text-muted-foreground block mb-2">Technologies:</span>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <span className="text-sm text-muted-foreground block mb-2">Requirements:</span>
                  <ul className="space-y-1">
                    {project.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Template Selection */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Choose Template
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Project Name
                  </label>
                  <Input
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Enter project name"
                    className="mb-4"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Technology Template
                  </label>
                  <div className="space-y-2">
                    {availableTemplates.map((template) => (
                      <Card
                        key={template.id}
                        className={`cursor-pointer transition-all ${
                          selectedTemplate?.id === template.id
                            ? 'ring-2 ring-primary bg-primary/5'
                            : 'hover:bg-muted/50'
                        }`}
                        onClick={() => setSelectedTemplate(template)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{template.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              {template.language}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {template.description}
                          </p>
                          {template.framework && (
                            <Badge variant="secondary" className="text-xs mt-2">
                              {template.framework}
                            </Badge>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <Button
                  onClick={handleCreateProject}
                  disabled={!selectedTemplate || !projectName.trim()}
                  className="w-full"
                  size="lg"
                >
                  Create Project
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Grading Criteria */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Grading Criteria</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.gradingCriteria.map((criteria) => (
                  <div key={criteria.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{criteria.category}</h4>
                      <Badge variant="outline">{criteria.maxPoints} pts</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {criteria.description}
                    </p>
                    <ul className="space-y-1">
                      {criteria.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2 text-xs">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}