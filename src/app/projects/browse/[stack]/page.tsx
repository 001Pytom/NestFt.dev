'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Clock, Trophy, Users, Star } from 'lucide-react'
import { beginnerProjects, intermediateProjects, advancedProjects, techStacks } from '@/data/projects'
import { ProjectTemplate } from '@/types/project'
import Link from 'next/link'

export default function StackProjectsPage() {
  const params = useParams()
  const router = useRouter()
  const stackId = params.stack as string
  
  const [selectedDifficulty, setSelectedDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner')
  const [projects, setProjects] = useState<ProjectTemplate[]>([])
  
  const stack = techStacks.find(s => s.id === stackId)

  useEffect(() => {
    if (!stack) {
      router.push('/projects/browse')
      return
    }

    const allProjects = [...beginnerProjects, ...intermediateProjects, ...advancedProjects]
    const filteredProjects = allProjects.filter(project => 
      project.stack === stackId || project.stack === 'fullstack'
    )
    setProjects(filteredProjects)
  }, [stackId, stack, router])

  const getProjectsByDifficulty = (difficulty: string) => {
    return projects.filter(project => project.difficulty === difficulty)
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

  const getDifficultyStats = (difficulty: string) => {
    const projectCount = getProjectsByDifficulty(difficulty).length
    const avgHours = Math.round(
      getProjectsByDifficulty(difficulty).reduce((sum, p) => sum + p.estimatedHours, 0) / projectCount
    )
    return { projectCount, avgHours }
  }

  if (!stack) {
    return null
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
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
            Back to Stack Selection
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">{stack.name} Projects</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {stack.description}. Choose your difficulty level and start building real-world projects.
            </p>
          </div>
        </motion.div>

        {/* Difficulty Tabs */}
        <Tabs value={selectedDifficulty} onValueChange={(value) => setSelectedDifficulty(value as any)} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="beginner" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Beginner
            </TabsTrigger>
            <TabsTrigger value="intermediate" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Intermediate
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Advanced
            </TabsTrigger>
          </TabsList>

          {/* Difficulty Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mb-8"
          >
            {['beginner', 'intermediate', 'advanced'].map((difficulty) => {
              const stats = getDifficultyStats(difficulty)
              return (
                <Card key={difficulty} className={`${getDifficultyColor(difficulty)}`}>
                  <CardContent className="p-4 text-center">
                    <h3 className="font-semibold capitalize mb-2">{difficulty}</h3>
                    <div className="text-sm">
                      <div>{stats.projectCount} Projects</div>
                      <div>~{stats.avgHours}h Average</div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </motion.div>

          {/* Project Lists */}
          {['beginner', 'intermediate', 'advanced'].map((difficulty) => (
            <TabsContent key={difficulty} value={difficulty}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getProjectsByDifficulty(difficulty).map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <Badge className={getDifficultyColor(project.difficulty)}>
                            {project.difficulty}
                          </Badge>
                          <div className="text-right text-sm text-muted-foreground">
                            {project.maxPoints} pts
                          </div>
                        </div>
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col">
                        <p className="text-muted-foreground text-sm mb-4 flex-1">
                          {project.description}
                        </p>
                        
                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <Badge key={tech} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                            {project.technologies.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{project.technologies.length - 3}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {project.estimatedHours}h
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {Math.floor(Math.random() * 100) + 50} completed
                            </div>
                          </div>
                          
                          <Link href={`/projects/${project.id}/setup`} className="w-full">
                            <Button className="w-full">
                              Start Project
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}