'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Trophy, Medal, Award, Crown, Star, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getLeaderboard, UserProfile } from '@/lib/database'

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLeaderboard()
  }, [])

  const loadLeaderboard = async () => {
    try {
      const data = await getLeaderboard(50)
      setLeaderboardData(data)
    } catch (error) {
      console.error('Error loading leaderboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Trophy className="h-5 w-5 text-gray-400" />
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-sm font-bold">#{rank}</span>
    }
  }

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white'
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white'
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'beginner':
        return 'bg-green-500/10 text-green-700'
      case 'intermediate':
        return 'bg-yellow-500/10 text-yellow-700'
      case 'advanced':
        return 'bg-red-500/10 text-red-700'
      default:
        return 'bg-gray-500/10 text-gray-700'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              🏆 Leaderboard
            </h1>
            <p className="text-muted-foreground text-lg">
              See how you rank against other developers in the community
            </p>
          </div>
        </motion.div>

        {/* Top 3 Podium */}
        {leaderboardData.length >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              {/* 2nd Place */}
              <div className="flex flex-col items-center pt-8">
                <div className="relative">
                  <Avatar className="h-16 w-16 border-4 border-gray-300">
                    <AvatarImage src={leaderboardData[1]?.avatar_url} alt={leaderboardData[1]?.full_name} />
                    <AvatarFallback className="text-lg font-bold">
                      {leaderboardData[1]?.full_name?.charAt(0) || '2'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 bg-gray-400 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                </div>
                <h3 className="font-semibold mt-2 text-center">{leaderboardData[1]?.full_name}</h3>
                <p className="text-2xl font-bold text-gray-600">{leaderboardData[1]?.total_points}</p>
                <Badge className={getStageColor(leaderboardData[1]?.current_stage)}>
                  {leaderboardData[1]?.current_stage}
                </Badge>
              </div>

              {/* 1st Place */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Avatar className="h-20 w-20 border-4 border-yellow-400">
                    <AvatarImage src={leaderboardData[0]?.avatar_url} alt={leaderboardData[0]?.full_name} />
                    <AvatarFallback className="text-xl font-bold">
                      {leaderboardData[0]?.full_name?.charAt(0) || '1'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-3 -right-3 bg-yellow-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
                    <Crown className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="font-semibold mt-2 text-center">{leaderboardData[0]?.full_name}</h3>
                <p className="text-3xl font-bold text-yellow-600">{leaderboardData[0]?.total_points}</p>
                <Badge className={getStageColor(leaderboardData[0]?.current_stage)}>
                  {leaderboardData[0]?.current_stage}
                </Badge>
              </div>

              {/* 3rd Place */}
              <div className="flex flex-col items-center pt-12">
                <div className="relative">
                  <Avatar className="h-14 w-14 border-4 border-amber-400">
                    <AvatarImage src={leaderboardData[2]?.avatar_url} alt={leaderboardData[2]?.full_name} />
                    <AvatarFallback className="text-base font-bold">
                      {leaderboardData[2]?.full_name?.charAt(0) || '3'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 bg-amber-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                </div>
                <h3 className="font-semibold mt-2 text-center">{leaderboardData[2]?.full_name}</h3>
                <p className="text-xl font-bold text-amber-600">{leaderboardData[2]?.total_points}</p>
                <Badge className={getStageColor(leaderboardData[2]?.current_stage)}>
                  {leaderboardData[2]?.current_stage}
                </Badge>
              </div>
            </div>
          </motion.div>
        )}

        {/* Full Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {leaderboardData.length > 0 ? (
            leaderboardData.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className={`hover:shadow-md transition-all duration-300 ${
                  index < 3 ? 'border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent' : ''
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`flex items-center justify-center w-12 h-12 rounded-full ${getRankBadgeColor(index + 1)}`}>
                          {getRankIcon(index + 1)}
                        </div>
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.avatar_url} alt={user.full_name} />
                          <AvatarFallback>
                            {user.full_name?.charAt(0) || user.user_id?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">{user.full_name || 'Anonymous User'}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            <Badge className={getStageColor(user.current_stage)}>
                              {user.current_stage}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <TrendingUp className="h-3 w-3" />
                              <span>{user.streak_days} day streak</span>
                            </div>
                            {user.github_connected && (
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Star className="h-3 w-3" />
                                <span>GitHub</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-primary">
                          {user.total_points.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">points</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Joined {new Date(user.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Rankings Yet</h3>
                <p className="text-muted-foreground">
                  Be the first to complete projects and climb the leaderboard!
                </p>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Community Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{leaderboardData.length}</div>
                  <div className="text-sm text-muted-foreground">Active Developers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary">
                    {leaderboardData.reduce((sum, user) => sum + user.total_points, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Points Earned</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">
                    {leaderboardData.reduce((sum, user) => sum + user.streak_days, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Combined Streak Days</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}