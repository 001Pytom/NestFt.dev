'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Clock, Trophy, Users, Star, Lock, AlertCircle } from 'lucide-react'
import { beginnerProjects, intermediateProjects, advancedProjects, techStacks } from '@/data/projects'
import { ProjectTemplate } from '@/types/project'
import { useAuthStore } from '@/lib/store'
import { canAccessDifficulty, calculateUserProgress } from '@/lib/database'
import Link from 'next/link'

export default function StackProjectsPage() {
  const params = useParams()
  const router = useRouter()
  const stackId = params.stack as string
  const { user } = useAuthStore()
  
  const [selectedDifficulty, setSelectedDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner')
  const [projects, setProjects] = useState<ProjectTemplate[]>([])
  const [accessLevels, setAccessLevels] = useState({
    beginner: true,
    intermediate: false,
    advanced: false
  })
  const [userProgress, setUserProgress] = useState({
    beginner: { completed: 0, total: 20, percentage: 0 },
    intermediate: { completed: 0, total: 20, percentage: 0 },
    advanced: { completed: 0, total: 20, percentage: 0 }
  })
  const [showProgressModal, setShowProgressModal] = useState(false)
  const [blockedDifficulty, setBlockedDifficulty] = useState<string>('')
  
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

    if (user) {
      checkUserAccess()
    }
  }, [stackId, stack, router, user])

  const checkUserAccess = async () => {
    if (!user) return

    try {
      const progress = await calculateUserProgress(user.id)
      setUserProgress(progress)

      const canAccessIntermediate = await canAccessDifficulty(user.id, 'intermediate')
      const canAccessAdvanced = await canAccessDifficulty(user.id, 'advanced')

      setAccessLevels({
        beginner: true,
        intermediate: canAccessIntermediate,
        advanced: canAccessAdvanced
      })
    } catch (error) {
      console.error('Error checking user access:', error)
    }
  }

  const handleDifficultyChange = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
    if (!accessLevels[difficulty]) {
      setBlockedDifficulty(difficulty)
      setShowProgressModal(true)
      return
    }
    setSelectedDifficulty(difficulty)
  }

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
    const avgHours = projectCount > 0 ? Math.round(
      getProjectsByDifficulty(difficulty).reduce((sum, p) => sum + p.estimatedHours, 0) / projectCount
    ) : 0
    return { projectCount, avgHours }
  }

  const getRequiredPercentage = (difficulty: string) => {
    if (difficulty === 'intermediate') {
      return { current: userProgress.beginner.percentage, required: 70, stage: 'Beginner' }
    }
    if (difficulty === 'advanced') {
      return { current: userProgress.intermediate.percentage, required: 70, stage: 'Intermediate' }
    }
    return { current: 100, required: 70, stage: 'Current' }
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

        {/* Progress Modal */}
        {showProgressModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-background rounded-lg p-6 max-w-md w-full"
            >
              <div className="text-center">
                <AlertCircle className="h-12 w-12 text-warning mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4">Access Restricted</h3>
                
                {blockedDifficulty === 'intermediate' && (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      You need to complete 70% of Beginner projects to unlock Intermediate level.
                    </p>
                    <div className="bg-muted rounded-lg p-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Beginner Progress</span>
                        <span>{userProgress.beginner.completed} / {Math.ceil(userProgress.beginner.total * 0.7)} projects</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(userProgress.beginner.percentage, 100)}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {userProgress.beginner.percentage}% completed
                      </p>
                    </div>
                    <p className="text-sm">
                      Complete {Math.ceil(userProgress.beginner.total * 0.7) - userProgress.beginner.completed} more beginner projects to unlock intermediate level.
                    </p>
                  </div>
                )}

                {blockedDifficulty === 'advanced' && (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      You need to complete 70% of Intermediate projects to unlock Advanced level.
                    </p>
                    <div className="bg-muted rounded-lg p-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Intermediate Progress</span>
                        <span>{userProgress.intermediate.completed} / {Math.ceil(userProgress.intermediate.total * 0.7)} projects</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(userProgress.intermediate.percentage, 100)}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {userProgress.intermediate.percentage}% completed
                      </p>
                    </div>
                    <p className="text-sm">
                      Complete {Math.ceil(userProgress.intermediate.total * 0.7) - userProgress.intermediate.completed} more intermediate projects to unlock advanced level.
                    </p>
                  </div>
                )}

                <div className="flex gap-4 mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowProgressModal(false)}
                    className="flex-1"
                  >
                    Close
                  </Button>
                  <Link href="/projects/browse/frontend" className="flex-1">
                    <Button className="w-full">
                      Start Beginner Projects
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Difficulty Tabs */}
        <Tabs value={selectedDifficulty} onValueChange={(value) => handleDifficultyChange(value as any)} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="beginner" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Beginner
            </TabsTrigger>
            <TabsTrigger 
              value="intermediate" 
              className="flex items-center gap-2"
              disabled={!accessLevels.intermediate}
            >
              {!accessLevels.intermediate && <Lock className="h-4 w-4" />}
              <Trophy className="h-4 w-4" />
              Intermediate
            </TabsTrigger>
            <TabsTrigger 
              value="advanced" 
              className="flex items-center gap-2"
              disabled={!accessLevels.advanced}
            >
              {!accessLevels.advanced && <Lock className="h-4 w-4" />}
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
              const isLocked = !accessLevels[difficulty as keyof typeof accessLevels]
              
              return (
                <Card key={difficulty} className={`${getDifficultyColor(difficulty)} ${isLocked ? 'opacity-50' : ''}`}>
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <h3 className="font-semibold capitalize">{difficulty}</h3>
                      {isLocked && <Lock className="h-4 w-4" />}
                    </div>
                    <div className="text-sm">
                      <div>{stats.projectCount} Projects</div>
                      <div>~{stats.avgHours}h Average</div>
                    </div>
                    {isLocked && (
                      <div className="text-xs mt-2 opacity-75">
                        {difficulty === 'intermediate' ? 'Complete 70% of Beginner' : 'Complete 70% of Intermediate'}
                      </div>
                    )}
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