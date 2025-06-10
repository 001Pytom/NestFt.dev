'use client'

import { motion } from 'framer-motion'
import { useAuthStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart3, BookOpen, Trophy, Users, ArrowRight, Target, Clock, Star } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user } = useAuthStore()

  // Mock user progress data
  const userProgress = {
    currentStage: 'beginner' as const,
    completedProjects: [
      { projectId: 'bg-1', score: 85, completedAt: '2025-01-10' },
      { projectId: 'bg-2', score: 92, completedAt: '2025-01-12' },
    ],
    totalPoints: 177,
    canAdvance: false // Need 70% of 20 projects = 14 projects
  }

  const stageProgress = {
    beginner: { completed: 2, total: 20, required: 14 },
    intermediate: { completed: 0, total: 20, required: 14 },
    advanced: { completed: 0, total: 20, required: 14 }
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
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

  const calculateProgress = (completed: number, required: number) => {
    return Math.min((completed / required) * 100, 100)
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.user_metadata?.name || user?.email}!
          </h1>
          <p className="text-muted-foreground">
            Ready to continue building amazing projects? Let's level up your skills!
          </p>
        </motion.div>

        {/* Current Stage Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className={`${getStageColor(userProgress.currentStage)} border-2`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Current Stage: {userProgress.currentStage.charAt(0).toUpperCase() + userProgress.currentStage.slice(1)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress to Next Stage</span>
                    <span>
                      {stageProgress[userProgress.currentStage].completed} / {stageProgress[userProgress.currentStage].required} projects
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${calculateProgress(
                          stageProgress[userProgress.currentStage].completed,
                          stageProgress[userProgress.currentStage].required
                        )}%` 
                      }}
                    />
                  </div>
                </div>
                
                <p className="text-sm">
                  Complete {stageProgress[userProgress.currentStage].required - stageProgress[userProgress.currentStage].completed} more projects 
                  to unlock the next stage!
                </p>
                
                <Link href="/projects/browse">
                  <Button className="w-full">
                    Continue Learning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projects Completed</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userProgress.completedProjects.length}</div>
              <p className="text-xs text-muted-foreground">
                {stageProgress[userProgress.currentStage].total - userProgress.completedProjects.length} remaining in current stage
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Points</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userProgress.totalPoints}</div>
              <p className="text-xs text-muted-foreground">
                Avg: {Math.round(userProgress.totalPoints / userProgress.completedProjects.length || 0)} per project
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Days coding</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Skill Level</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{userProgress.currentStage}</div>
              <p className="text-xs text-muted-foreground">
                {userProgress.canAdvance ? 'Ready to advance!' : 'Keep building!'}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stage Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
          {Object.entries(stageProgress).map(([stage, progress]) => (
            <Card 
              key={stage} 
              className={`${getStageColor(stage)} ${
                stage === userProgress.currentStage ? 'ring-2 ring-primary' : ''
              }`}
            >
              <CardHeader>
                <CardTitle className="capitalize">{stage} Stage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{progress.completed} / {progress.total}</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-current h-2 rounded-full transition-all duration-300 opacity-70"
                      style={{ width: `${(progress.completed / progress.total) * 100}%` }}
                    />
                  </div>
                  
                  <div className="text-xs">
                    {stage === userProgress.currentStage ? (
                      <span>Current Stage</span>
                    ) : progress.completed >= progress.required ? (
                      <span className="text-green-600">✓ Completed</span>
                    ) : (
                      <span>Locked</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Recent Activity & Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Recent Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
            </CardHeader>
            <CardContent>
              {userProgress.completedProjects.length > 0 ? (
                <div className="space-y-3">
                  {userProgress.completedProjects.slice(-3).map((project) => (
                    <div key={project.projectId} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Project {project.projectId}</div>
                        <div className="text-sm text-muted-foreground">
                          Completed {new Date(project.completedAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">{project.score} pts</div>
                        <div className="text-xs text-muted-foreground">
                          {project.score >= 90 ? 'Excellent' : project.score >= 75 ? 'Good' : 'Fair'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No projects completed yet</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Start your first project to see your progress here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/projects/browse" className="block">
                <Button className="w-full justify-start" variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse Projects
                </Button>
              </Link>
              
              <Link href="/leaderboard" className="block">
                <Button className="w-full justify-start" variant="outline">
                  <Trophy className="mr-2 h-4 w-4" />
                  View Leaderboard
                </Button>
              </Link>
              
              <Link href="/portfolio" className="block">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  My Portfolio
                </Button>
              </Link>
              
              <Link href="/guides" className="block">
                <Button className="w-full justify-start" variant="outline">
                  <Star className="mr-2 h-4 w-4" />
                  Learning Guides
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}