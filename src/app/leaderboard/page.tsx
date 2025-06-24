'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Trophy, Medal,  Crown, Star, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getLeaderboardWithRankings, getUserLeaderboardPosition, UserProfile } from '@/lib/database'
import { useAuthStore } from '@/lib/store'

export default function LeaderboardPage() {
  const { user } = useAuthStore()
  const [leaderboardData, setLeaderboardData] = useState<(UserProfile & { rank: number })[]>([])
  const [userPosition, setUserPosition] = useState<{ rank: number; totalUsers: number } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLeaderboard()
    if (user) {
      loadUserPosition()
    }
  }, [])
  
  useEffect(() => {
    if (user) {
      loadUserPosition()
    }
  }, [user])

  const loadLeaderboard = async () => {
    try {
      const data = await getLeaderboardWithRankings(100) // Get more users
      // console.log('Leaderboard data:', data) // Debug log
      setLeaderboardData(data)
    } catch (error) {
      console.error('Error loading leaderboard:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const loadUserPosition = async () => {
    if (!user) return
    
    try {
      const position = await getUserLeaderboardPosition(user.id)
      // console.log('User position:', position) // Debug log
      setUserPosition(position)
    } catch (error) {
      console.error('Error loading user position:', error)
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

  const isCurrentUser = (profileUserId: string) => {
    return user && user.id === profileUserId
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
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              🏆 Developer Leaderboard
            </h1>
            <div className="space-y-2">
              <span className="text-muted-foreground text-lg block">
                Compete with developers worldwide and climb the rankings!
              </span>
              {userPosition && user && (
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  <Trophy className="h-4 w-4" />
                  Your Rank: #{userPosition.rank} out of {userPosition.totalUsers} developers
                </div>
              )}
            </div>
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
            <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
              {/* 2nd Place */}
              <div className="flex flex-col items-center pt-8">
                <div className="relative">
                  <Avatar className="h-16 w-16 border-4 border-gray-300 shadow-lg">
                    <AvatarImage src={leaderboardData[1]?.avatar_url || ''} alt={leaderboardData[1]?.full_name || 'User'} />
                    <AvatarFallback className="text-lg font-bold bg-gray-100">
                      {leaderboardData[1]?.full_name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 bg-gray-400 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-md">
                    2
                  </div>
                </div>
                <h3 className="font-semibold mt-3 text-center text-sm">{leaderboardData[1]?.full_name || 'Anonymous User'}</h3>
                <p className="text-2xl font-bold text-gray-600 mt-1">{leaderboardData[1]?.total_points?.toLocaleString() || 0}</p>
                <Badge className={`${getStageColor(leaderboardData[1]?.current_stage)} mt-2`} variant="outline">
                  {leaderboardData[1]?.current_stage?.charAt(0).toUpperCase() + leaderboardData[1]?.current_stage?.slice(1) || 'Beginner'}
                </Badge>
              </div>

              {/* 1st Place */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-yellow-400 shadow-xl">
                    <AvatarImage src={leaderboardData[0]?.avatar_url || ''} alt={leaderboardData[0]?.full_name || 'User'} />
                    <AvatarFallback className="text-2xl font-bold bg-yellow-50">
                      {leaderboardData[0]?.full_name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-4 -right-4 bg-yellow-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                    <Crown className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="font-bold mt-3 text-center">{leaderboardData[0]?.full_name || 'Anonymous User'}</h3>
                <p className="text-3xl font-bold text-yellow-600 mt-1">{leaderboardData[0]?.total_points?.toLocaleString() || 0}</p>
                <Badge className={`${getStageColor(leaderboardData[0]?.current_stage)} mt-2`} variant="outline">
                  {leaderboardData[0]?.current_stage?.charAt(0).toUpperCase() + leaderboardData[0]?.current_stage?.slice(1) || 'Beginner'}
                </Badge>
              </div>

              {/* 3rd Place */}
              <div className="flex flex-col items-center pt-12">
                <div className="relative">
                  <Avatar className="h-14 w-14 border-4 border-amber-400 shadow-lg">
                    <AvatarImage src={leaderboardData[2]?.avatar_url || ''} alt={leaderboardData[2]?.full_name || 'User'} />
                    <AvatarFallback className="text-base font-bold bg-amber-50">
                      {leaderboardData[2]?.full_name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 bg-amber-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shadow-md">
                    3
                  </div>
                </div>
                <h3 className="font-semibold mt-3 text-center text-sm">{leaderboardData[2]?.full_name || 'Anonymous User'}</h3>
                <p className="text-xl font-bold text-amber-600 mt-1">{leaderboardData[2]?.total_points?.toLocaleString() || 0}</p>
                <Badge className={`${getStageColor(leaderboardData[2]?.current_stage)} mt-2`} variant="outline">
                  {leaderboardData[2]?.current_stage?.charAt(0).toUpperCase() + leaderboardData[2]?.current_stage?.slice(1) || 'Beginner'}
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
          className="space-y-3"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">All Developers</h2>
            <div className="text-sm text-muted-foreground">
              {leaderboardData.length} developers competing
            </div>
          </div>

          {leaderboardData.length > 0 ? (
            leaderboardData.map((userProfile, index) => (
              <motion.div
                key={userProfile.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <Card className={`hover:shadow-lg transition-all duration-300 ${
                  index < 3 ? 'border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent' : ''
                } ${
                  isCurrentUser(userProfile.user_id) ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-200' : ''
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Rank Badge */}
                        <div className={`flex items-center justify-center w-12 h-12 rounded-full ${getRankBadgeColor(userProfile.rank)} shadow-md`}>
                          {getRankIcon(userProfile.rank)}
                        </div>
                        
                        {/* User Avatar */}
                        <Avatar className="h-12 w-12 shadow-sm">
                          <AvatarImage src={userProfile.avatar_url || ''} alt={userProfile.full_name || 'User'} />
                          <AvatarFallback className="font-semibold">
                            {userProfile.full_name?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        
                        {/* User Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">
                              {userProfile.full_name || 'Anonymous User'}
                            </h3>
                            {isCurrentUser(userProfile.user_id) && (
                              <Badge variant="secondary" className="text-xs">You</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-3 mt-1">
                            <Badge className={getStageColor(userProfile.current_stage)} variant="outline">
                              {userProfile.current_stage?.charAt(0).toUpperCase() + userProfile.current_stage?.slice(1) || 'Beginner'}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <TrendingUp className="h-3 w-3" />
                              <span>{userProfile.streak_days || 0} day streak</span>
                            </div>
                            {userProfile.github_connected && (
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Star className="h-3 w-3" />
                                <span>GitHub</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Points and Stats */}
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {userProfile.total_points?.toLocaleString() || 0}
                        </div>
                        <div className="text-sm text-muted-foreground">points</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Rank #{userProfile.rank}
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{leaderboardData.length}</div>
                  <div className="text-sm text-muted-foreground">Active Developers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary">
                    {leaderboardData.reduce((sum, user) => sum + (user.total_points || 0), 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Points Earned</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">
                    {leaderboardData.reduce((sum, user) => sum + (user.streak_days || 0), 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Combined Streak Days</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-success">
                    {leaderboardData.length > 0 ? Math.round(leaderboardData.reduce((sum, user) => sum + (user.total_points || 0), 0) / leaderboardData.length) : 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Average Points</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}