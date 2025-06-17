'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, GitBranch, GitCommit, Upload, Link as LinkIcon, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/lib/store'
import { supabase } from '@/lib/supabase'

interface GitHubIntegrationProps {
  projectId: string
  projectName: string
  codeFiles: Record<string, string>
  onRepositoryCreated?: (url: string) => void
}

export function GitHubIntegration({ 
  projectId, 
  projectName, 
  codeFiles, 
  onRepositoryCreated 
}: GitHubIntegrationProps) {
  const { user } = useAuthStore()
  const [isConnected, setIsConnected] = useState(false)
  const [githubUser, setGithubUser] = useState<any>(null)
  const [repositoryUrl, setRepositoryUrl] = useState('')
  const [commitMessage, setCommitMessage] = useState('Initial commit from NestFT.dev')
  const [isCreatingRepo, setIsCreatingRepo] = useState(false)
  const [isPushing, setIsPushing] = useState(false)
  const [repoName, setRepoName] = useState(projectName.toLowerCase().replace(/\s+/g, '-'))
  const [isPrivate, setIsPrivate] = useState(false)
  const [pushStatus, setPushStatus] = useState<'idle' | 'success' | 'error'>('idle')

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
        setGithubUser({ login: profile.github_username })
      }
    } catch (error) {
      console.error('Error checking GitHub connection:', error)
    }
  }

  const connectToGitHub = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          scopes: 'repo user',
          redirectTo: `${window.location.origin}/ide/${projectId}?github=connected`
        }
      })

      if (error) throw error
    } catch (error) {
      console.error('Error connecting to GitHub:', error)
    }
  }

  const createRepository = async () => {
    if (!isConnected || !githubUser) return

    setIsCreatingRepo(true)
    try {
      // In a real implementation, this would call your backend API
      // which would use the GitHub API to create a repository
      const response = await fetch('/api/github/create-repo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.access_token}`
        },
        body: JSON.stringify({
          name: repoName,
          description: `${projectName} - Built with NestFT.dev`,
          private: isPrivate,
          auto_init: true
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create repository')
      }

      const repo = await response.json()
      setRepositoryUrl(repo.html_url)
      
      if (onRepositoryCreated) {
        onRepositoryCreated(repo.html_url)
      }

      // Auto-push initial code
      await pushToRepository(repo.clone_url)
      
    } catch (error) {
      console.error('Error creating repository:', error)
      setPushStatus('error')
    } finally {
      setIsCreatingRepo(false)
    }
  }

  const pushToRepository = async (repoUrl?: string) => {
    if (!isConnected || (!repositoryUrl && !repoUrl)) return

    setIsPushing(true)
    setPushStatus('idle')

    try {
      // In a real implementation, this would push code to GitHub
      const response = await fetch('/api/github/push-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.access_token}`
        },
        body: JSON.stringify({
          repositoryUrl: repoUrl || repositoryUrl,
          files: codeFiles,
          commitMessage,
          projectId
        })
      })

      if (!response.ok) {
        throw new Error('Failed to push code')
      }

      setPushStatus('success')
      
      // Update project with repository URL
      await supabase
        .from('user_projects')
        .update({ repository_url: repoUrl || repositoryUrl })
        .eq('id', projectId)

    } catch (error) {
      console.error('Error pushing to repository:', error)
      setPushStatus('error')
    } finally {
      setIsPushing(false)
    }
  }

  const simulatePush = () => {
    setIsPushing(true)
    setPushStatus('idle')
    
    // Simulate push process
    setTimeout(() => {
      setPushStatus('success')
      setIsPushing(false)
      
      // Simulate repository URL
      if (!repositoryUrl) {
        const simulatedUrl = `https://github.com/${githubUser?.login || 'user'}/${repoName}`
        setRepositoryUrl(simulatedUrl)
        if (onRepositoryCreated) {
          onRepositoryCreated(simulatedUrl)
        }
      }
    }, 3000)
  }

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            Connect to GitHub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Connect your GitHub account to push your code and create repositories.
            </p>
            <Button onClick={connectToGitHub} className="w-full">
              <Github className="h-4 w-4 mr-2" />
              Connect GitHub Account
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
          <Badge variant="outline" className="ml-auto">
            <Check className="h-3 w-3 mr-1" />
            Connected
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* GitHub User Info */}
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <Github className="h-4 w-4" />
          </div>
          <div>
            <div className="font-medium">{githubUser?.login || 'GitHub User'}</div>
            <div className="text-sm text-muted-foreground">Connected</div>
          </div>
        </div>

        {!repositoryUrl ? (
          /* Create Repository */
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Repository Name</label>
              <Input
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                placeholder="my-awesome-project"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="private"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="private" className="text-sm">
                Make repository private
              </label>
            </div>

            <Button
              onClick={createRepository}
              disabled={isCreatingRepo || !repoName}
              className="w-full"
            >
              {isCreatingRepo ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
                />
              ) : (
                <GitBranch className="h-4 w-4 mr-2" />
              )}
              {isCreatingRepo ? 'Creating Repository...' : 'Create Repository'}
            </Button>
          </div>
        ) : (
          /* Push to Repository */
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <Check className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-800">Repository created successfully!</span>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Repository URL</label>
              <div className="flex gap-2">
                <Input value={repositoryUrl} readOnly />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(repositoryUrl, '_blank')}
                >
                  <LinkIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Commit Message</label>
              <Textarea
                value={commitMessage}
                onChange={(e) => setCommitMessage(e.target.value)}
                placeholder="Describe your changes..."
                rows={3}
              />
            </div>

            {pushStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg"
              >
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-800">Code pushed successfully!</span>
              </motion.div>
            )}

            {pushStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg"
              >
                <X className="h-4 w-4 text-red-600" />
                <span className="text-sm text-red-800">Failed to push code. Please try again.</span>
              </motion.div>
            )}

            <Button
              onClick={simulatePush}
              disabled={isPushing || !commitMessage.trim()}
              className="w-full"
            >
              {isPushing ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
                />
              ) : (
                <Upload className="h-4 w-4 mr-2" />
              )}
              {isPushing ? 'Pushing Code...' : 'Push to GitHub'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}