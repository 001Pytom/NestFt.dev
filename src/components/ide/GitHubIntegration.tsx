'use client'

import { useState, useEffect } from 'react'
import { Github, GitBranch, Upload, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/lib/store'
import { supabase } from '@/lib/supabase'

interface GitHubIntegrationProps {
  projectId: string
  projectName: string
  files: Record<string, string>
  onPushComplete?: (repositoryUrl: string) => void
}

export function GitHubIntegration({ 
  projectId, 
  projectName, 
  files, 
  onPushComplete 
}: GitHubIntegrationProps) {
  const { user } = useAuthStore()
  const [isConnected, setIsConnected] = useState(false)
  const [repositoryUrl, setRepositoryUrl] = useState('')
  const [repositoryName, setRepositoryName] = useState('')
  const [isPushing, setIsPushing] = useState(false)
  const [pushStatus, setPushStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [showSetup, setShowSetup] = useState(false)

  useEffect(() => {
    checkGitHubConnection()
  }, [user])

  const checkGitHubConnection = async () => {
    if (!user) return

    try {
      // Check if user has GitHub connected
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('github_connected, github_username')
        .eq('user_id', user.id)
        .single()

      if (profile?.github_connected) {
        setIsConnected(true)
      }

      // Check if project has repository
      const { data: project } = await supabase
        .from('user_projects')
        .select('repository_url')
        .eq('id', projectId)
        .single()

      if (project?.repository_url) {
        setRepositoryUrl(project.repository_url)
      }
    } catch (error) {
      console.error('Error checking GitHub connection:', error)
    }
  }

  const connectGitHub = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          scopes: 'repo',
          redirectTo: `${window.location.origin}/ide/${projectId}?github=connected`
        }
      })

      if (error) throw error
    } catch (error) {
      console.error('Error connecting GitHub:', error)
    }
  }

  const createRepository = async () => {
    if (!repositoryName.trim()) return

    setIsPushing(true)
    setPushStatus('idle')

    try {
      // Simulate GitHub API call to create repository
      await new Promise(resolve => setTimeout(resolve, 2000))

      const repoUrl = `https://github.com/${user?.user_metadata?.user_name || 'user'}/${repositoryName}`
      setRepositoryUrl(repoUrl)

      // Update project with repository URL
      await supabase
        .from('user_projects')
        .update({ repository_url: repoUrl })
        .eq('id', projectId)

      setPushStatus('success')
      setShowSetup(false)
      
      if (onPushComplete) {
        onPushComplete(repoUrl)
      }
    } catch (error) {
      console.error('Error creating repository:', error)
      setPushStatus('error')
    } finally {
      setIsPushing(false)
    }
  }

  const pushToGitHub = async () => {
    if (!repositoryUrl) {
      setShowSetup(true)
      return
    }

    setIsPushing(true)
    setPushStatus('idle')

    try {
      // Simulate pushing files to GitHub
      await new Promise(resolve => setTimeout(resolve, 3000))

      // Update last push timestamp
      await supabase
        .from('user_projects')
        .update({ last_saved_at: new Date().toISOString() })
        .eq('id', projectId)

      setPushStatus('success')
      
      if (onPushComplete) {
        onPushComplete(repositoryUrl)
      }
    } catch (error) {
      console.error('Error pushing to GitHub:', error)
      setPushStatus('error')
    } finally {
      setIsPushing(false)
    }
  }

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            Connect GitHub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Connect your GitHub account to push your code and create repositories.
          </p>
          <Button onClick={connectGitHub} className="w-full">
            <Github className="h-4 w-4 mr-2" />
            Connect GitHub Account
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (showSetup) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            Create Repository
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Repository Name
            </label>
            <Input
              value={repositoryName}
              onChange={(e) => setRepositoryName(e.target.value)}
              placeholder={projectName.toLowerCase().replace(/\s+/g, '-')}
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={createRepository} 
              disabled={!repositoryName.trim() || isPushing}
              className="flex-1"
            >
              {isPushing ? 'Creating...' : 'Create Repository'}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowSetup(false)}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Github className="h-5 w-5" />
          GitHub Integration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {repositoryUrl ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <GitBranch className="h-4 w-4" />
              <a 
                href={repositoryUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {repositoryUrl.split('/').slice(-2).join('/')}
              </a>
            </div>
            
            <Button 
              onClick={pushToGitHub} 
              disabled={isPushing}
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              {isPushing ? 'Pushing...' : 'Push to GitHub'}
            </Button>
            
            {pushStatus === 'success' && (
              <div className="flex items-center gap-2 text-green-600 text-sm">
                <CheckCircle className="h-4 w-4" />
                Successfully pushed to GitHub
              </div>
            )}
            
            {pushStatus === 'error' && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                Failed to push to GitHub
              </div>
            )}
          </div>
        ) : (
          <Button onClick={() => setShowSetup(true)} className="w-full">
            <GitBranch className="h-4 w-4 mr-2" />
            Create Repository
          </Button>
        )}
      </CardContent>
    </Card>
  )
}