'use client'

import { motion } from 'framer-motion'
import { useAuthStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Calendar, Mail, Github, ExternalLink, Settings } from 'lucide-react'

export default function ProfilePage() {
  const { user, logout } = useAuthStore()

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and view your progress
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardHeader className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.user_metadata?.name} />
                  <AvatarFallback className="text-2xl">
                    {user?.user_metadata?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <CardTitle>{user?.user_metadata?.name || 'User'}</CardTitle>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {user?.email}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Joined {new Date(user?.created_at || '').toLocaleDateString()}
                  </span>
                </div>
                <Badge variant="secondary" className="w-full justify-center">
                  Beginner Level
                </Badge>
                <Button variant="outline" className="w-full" onClick={logout}>
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats and Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">0</div>
                    <div className="text-sm text-muted-foreground">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">0</div>
                    <div className="text-sm text-muted-foreground">Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">0</div>
                    <div className="text-sm text-muted-foreground">Collaborations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">0</div>
                    <div className="text-sm text-muted-foreground">Streak Days</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No recent activity</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Start working on projects to see your activity here
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}