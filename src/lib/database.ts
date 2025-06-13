import { supabase } from './supabase'

export interface UserProfile {
  id: string
  user_id: string
  username?: string
  full_name?: string
  avatar_url?: string
  current_stage: 'beginner' | 'intermediate' | 'advanced'
  total_points: number
  streak_days: number
  last_activity_date: string
  github_username?: string
  github_connected: boolean
  created_at: string
  updated_at: string
}

export interface UserProject {
  id: string
  user_id: string
  project_id: string
  project_name: string
  stack: string
  difficulty: string
  template_id: string
  status: 'in_progress' | 'completed' | 'submitted'
  code_files: Record<string, string>
  repository_url?: string
  deployed_url?: string
  score?: number
  ai_feedback?: any
  started_at: string
  completed_at?: string
  last_saved_at: string
}

export interface ProjectSubmission {
  id: string
  user_project_id: string
  user_id: string
  project_id: string
  submission_data: any
  repository_url?: string
  deployed_url?: string
  ai_score?: number
  ai_feedback?: any
  grading_status: 'pending' | 'grading' | 'completed' | 'failed'
  submitted_at: string
  graded_at?: string
}

export interface LearningGuide {
  id: string
  title: string
  description: string
  category: string
  difficulty: string
  duration: string
  steps: any[]
  rating: number
  image_url?: string
  created_at: string
  updated_at: string
}

// User Profile Functions
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) {
    console.error('Error fetching user profile:', error)
    return null
  }

  return data
}

export async function createUserProfile(profile: Partial<UserProfile>): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('user_profiles')
    .insert(profile)
    .select()
    .single()

  if (error) {
    console.error('Error creating user profile:', error)
    return null
  }

  return data
}

export async function updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) {
    console.error('Error updating user profile:', error)
    return null
  }

  return data
}

// User Projects Functions
export async function getUserProjects(userId: string): Promise<UserProject[]> {
  const { data, error } = await supabase
    .from('user_projects')
    .select('*')
    .eq('user_id', userId)
    .order('started_at', { ascending: false })

  if (error) {
    console.error('Error fetching user projects:', error)
    return []
  }

  return data || []
}

export async function createUserProject(project: Partial<UserProject>): Promise<UserProject | null> {
  const { data, error } = await supabase
    .from('user_projects')
    .insert(project)
    .select()
    .single()

  if (error) {
    console.error('Error creating user project:', error)
    return null
  }

  return data
}

export async function updateUserProject(projectId: string, updates: Partial<UserProject>): Promise<UserProject | null> {
  const { data, error } = await supabase
    .from('user_projects')
    .update(updates)
    .eq('id', projectId)
    .select()
    .single()

  if (error) {
    console.error('Error updating user project:', error)
    return null
  }

  return data
}

export async function saveProjectCode(projectId: string, codeFiles: Record<string, string>): Promise<boolean> {
  const { error } = await supabase
    .from('user_projects')
    .update({ 
      code_files: codeFiles,
      last_saved_at: new Date().toISOString()
    })
    .eq('id', projectId)

  if (error) {
    console.error('Error saving project code:', error)
    return false
  }

  return true
}

// Project Submissions Functions
export async function submitProject(submission: Partial<ProjectSubmission>): Promise<ProjectSubmission | null> {
  const { data, error } = await supabase
    .from('project_submissions')
    .insert(submission)
    .select()
    .single()

  if (error) {
    console.error('Error submitting project:', error)
    return null
  }

  return data
}

export async function getProjectSubmissions(userId: string): Promise<ProjectSubmission[]> {
  const { data, error } = await supabase
    .from('project_submissions')
    .select('*')
    .eq('user_id', userId)
    .order('submitted_at', { ascending: false })

  if (error) {
    console.error('Error fetching project submissions:', error)
    return []
  }

  return data || []
}

// Learning Guides Functions
export async function getLearningGuides(): Promise<LearningGuide[]> {
  const { data, error } = await supabase
    .from('learning_guides')
    .select('*')
    .order('rating', { ascending: false })

  if (error) {
    console.error('Error fetching learning guides:', error)
    return []
  }

  return data || []
}

export async function getLearningGuide(id: string): Promise<LearningGuide | null> {
  const { data, error } = await supabase
    .from('learning_guides')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching learning guide:', error)
    return null
  }

  return data
}

// Leaderboard Functions
export async function getLeaderboard(limit: number = 50): Promise<UserProfile[]> {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .order('total_points', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching leaderboard:', error)
    return []
  }

  return data || []
}

// Progress Calculation Functions
export async function calculateUserProgress(userId: string): Promise<{
  beginner: { completed: number; total: number; percentage: number }
  intermediate: { completed: number; total: number; percentage: number }
  advanced: { completed: number; total: number; percentage: number }
}> {
  const projects = await getUserProjects(userId)
  const completedProjects = projects.filter(p => p.status === 'completed')

  const beginnerCompleted = completedProjects.filter(p => p.difficulty === 'beginner').length
  const intermediateCompleted = completedProjects.filter(p => p.difficulty === 'intermediate').length
  const advancedCompleted = completedProjects.filter(p => p.difficulty === 'advanced').length

  return {
    beginner: {
      completed: beginnerCompleted,
      total: 20,
      percentage: Math.round((beginnerCompleted / 20) * 100)
    },
    intermediate: {
      completed: intermediateCompleted,
      total: 20,
      percentage: Math.round((intermediateCompleted / 20) * 100)
    },
    advanced: {
      completed: advancedCompleted,
      total: 20,
      percentage: Math.round((advancedCompleted / 20) * 100)
    }
  }
}

export async function canAccessDifficulty(userId: string, difficulty: 'beginner' | 'intermediate' | 'advanced'): Promise<boolean> {
  if (difficulty === 'beginner') return true

  const progress = await calculateUserProgress(userId)
  
  if (difficulty === 'intermediate') {
    return progress.beginner.percentage >= 70
  }
  
  if (difficulty === 'advanced') {
    return progress.intermediate.percentage >= 70
  }

  return false
}