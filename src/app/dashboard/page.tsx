'use client'

import { motion } from 'framer-motion'
import { useAuthStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart3, BookOpen, Trophy, Users, ArrowRight, Target, Clock, Star, Award } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getUserProfile, getUserProjects, calculateUserProgress, createUserProfile, getUserSubmittedProjects } from '@/lib/database'
import { UserProfile, UserProject } from '@/lib/database'

export default function DashboardPage() {
  const { user } = useAuthStore()
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [userProjects, setUserProjects] = useState<UserProject[]>([])
  const [submittedProjectIds, setSubmittedProjectIds] = useState<string[]>([])
  const [progress, setProgress] = useState({
    beginner: { completed: 0, total: 20, percentage: 0 },
    intermediate: { completed: 0, total: 20, percentage: 0 },
    advanced: { completed: 0, total: 20, percentage: 0 }
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadUserData()
    }
  }, [user])

  const loadUserData = async () => {
    if (!user) return

    try {
      // Get or create user profile
      let profile = await getUserProfile(user?.id)
      if (!profile) {
        profile = await createUserProfile({
          user_id: user.id,
          full_name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
          avatar_url: user.user_metadata?.avatar_url,
          current_stage: 'beginner',
          total_points: 0,
          streak_days: 0,
          last_activity_date: new Date().toISOString().split('T')[0],
          github_connected: false
        })
      }
      setUserProfile(profile)

      // Get user projects
      const projects = await getUserProjects(user.id)
      setUserProjects(projects)
      
      // Get submitted project IDs
      const submittedIds = await getUserSubmittedProjects(user.id)
      setSubmittedProjectIds(submittedIds)

      // Calculate progress
      const userProgress = await calculateUserProgress(user.id)
      setProgress(userProgress)

    } catch (error) {
      console.error('Error loading user data:', error)
    } finally {
      setLoading(false)
    }
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

  const canAdvanceToNext = () => {
    if (userProfile?.current_stage === 'beginner') {
      return progress.beginner.percentage >= 70
    }
    if (userProfile?.current_stage === 'intermediate') {
      return progress.intermediate.percentage >= 70
    }
    return false
  }

  const getNextStage = () => {
    if (userProfile?.current_stage === 'beginner') return 'intermediate'
    if (userProfile?.current_stage === 'intermediate') return 'advanced'
    return null
  }

  // Only count projects that have been submitted (to avoid counting duplicates)
  const completedProjects = userProjects.filter(p => 
    p.status === 'completed' && submittedProjectIds.includes(p.project_id)
  )
  const currentStageProgress = progress[userProfile?.current_stage || 'beginner']

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
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
            Welcome back, {userProfile?.full_name || user?.email}!
          </h1>
          <p className="text-muted-foreground">
            Ready to continue building amazing projects? Let`&#39;` s level up your skills!
          </p>
        </motion.div>

        {/* Current Stage Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className={`${getStageColor(userProfile?.current_stage || 'beginner')} border-2`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Current Stage: {(userProfile?.current_stage || 'beginner').charAt(0).toUpperCase() + (userProfile?.current_stage || 'beginner').slice(1)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress to Next Stage</span>
                    <span>
                      {currentStageProgress.completed} / {Math.ceil(currentStageProgress.total * 0.7)} projects (70% required)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(currentStageProgress.percentage, 100)}%` }}
                    />
                  </div>
                </div>
                
                <p className="text-sm">
                  {canAdvanceToNext() ? (
                    <span className="text-green-600 font-medium">
                      🎉 Congratulations! You can advance to {getNextStage()} level!
                    </span>
                  ) : (
                    <>
                      Complete {Math.ceil(currentStageProgress.total * 0.7) - currentStageProgress.completed} more projects 
                      to unlock the {getNextStage() || 'next'} stage!
                    </>
                  )}
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
              <div className="text-2xl font-bold">{completedProjects.length}</div>
              <p className="text-xs text-muted-foreground">
                Unique projects completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Points</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userProfile?.total_points || 0}</div>
              <p className="text-xs text-muted-foreground">
                Total points earned
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userProfile?.streak_days || 0}</div>
              <p className="text-xs text-muted-foreground">Days coding</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Skill Level</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{userProfile?.current_stage || 'beginner'}</div>
              <p className="text-xs text-muted-foreground">
                {canAdvanceToNext() ? 'Ready to advance!' : 'Keep building!'}
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
          {Object.entries(progress).map(([stage, stageProgress]) => (
            <Card 
              key={stage} 
              className={`${getStageColor(stage)} ${
                stage === userProfile?.current_stage ? 'ring-2 ring-primary' : ''
              }`}
            >
              <CardHeader>
                <CardTitle className="capitalize flex items-center gap-2">
                  {stage === 'beginner' && <Star className="h-4 w-4" />}
                  {stage === 'intermediate' && <Trophy className="h-4 w-4" />}
                  {stage === 'advanced' && <Award className="h-4 w-4" />}
                  {stage} Stage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{stageProgress.completed} / {stageProgress.total}</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-current h-2 rounded-full transition-all duration-300 opacity-70"
                      style={{ width: `${(stageProgress.completed / stageProgress.total) * 100}%` }}
                    />
                  </div>
                  
                  <div className="text-xs">
                    {stage === userProfile?.current_stage ? (
                      <span className="font-medium">Current Stage</span>
                    ) : stageProgress.percentage >= 70 ? (
                      <span className="text-green-600">✓ Completed</span>
                    ) : (
                      <span className="text-gray-500">
                        {userProfile?.current_stage === 'beginner' && stage === 'intermediate' ? 'Complete 70% of Beginner first' :
                         userProfile?.current_stage === 'intermediate' && stage === 'advanced' ? 'Complete 70% of Intermediate first' :
                         'Locked'}
                      </span>
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
              {completedProjects.length > 0 ? (
                <div className="space-y-3">
                  {completedProjects.slice(-3).reverse().map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{project.project_name}</div>
                        <div className="text-sm text-muted-foreground">
                          Submitted {new Date(project.completed_at || '').toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">{project.score || 0} pts</div>
                        <div className="text-xs text-muted-foreground">
                          {(project.score || 0) >= 90 ? 'Excellent' : (project.score || 0) >= 75 ? 'Good' : 'Fair'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No projects submitted yet</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Submit your first project to see your progress here
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