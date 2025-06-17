/*
  # User System and Project Management Schema

  1. New Tables
    - `user_profiles` - Extended user profile information
    - `user_projects` - Track user project progress and submissions
    - `project_submissions` - Store project submissions and AI grading
    - `user_achievements` - Track certificates and achievements
    - `learning_guides` - Professional learning guides content

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- User Profiles Table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE,
  full_name text,
  avatar_url text,
  current_stage text DEFAULT 'beginner' CHECK (current_stage IN ('beginner', 'intermediate', 'advanced')),
  total_points integer DEFAULT 0,
  streak_days integer DEFAULT 0,
  last_activity_date date DEFAULT CURRENT_DATE,
  github_username text,
  github_connected boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User Projects Table
CREATE TABLE IF NOT EXISTS user_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id text NOT NULL,
  project_name text NOT NULL,
  stack text NOT NULL,
  difficulty text NOT NULL,
  template_id text NOT NULL,
  status text DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'submitted')),
  code_files jsonb DEFAULT '{}',
  repository_url text,
  deployed_url text,
  score integer,
  ai_feedback jsonb,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  last_saved_at timestamptz DEFAULT now()
);

-- Project Submissions Table
CREATE TABLE IF NOT EXISTS project_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_project_id uuid REFERENCES user_projects(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id text NOT NULL,
  submission_data jsonb NOT NULL,
  repository_url text,
  deployed_url text,
  ai_score integer,
  ai_feedback jsonb,
  grading_status text DEFAULT 'pending' CHECK (grading_status IN ('pending', 'grading', 'completed', 'failed')),
  submitted_at timestamptz DEFAULT now(),
  graded_at timestamptz
);

-- User Achievements Table
CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_type text NOT NULL,
  achievement_data jsonb NOT NULL,
  earned_at timestamptz DEFAULT now()
); 

-- Learning Guides Table
CREATE TABLE IF NOT EXISTS learning_guides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  difficulty text NOT NULL,
  duration text NOT NULL,
  steps jsonb NOT NULL,
  rating numeric DEFAULT 0,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_guides ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own projects"
  ON user_projects FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own projects"
  ON user_projects FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read own submissions"
  ON project_submissions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own submissions"
  ON project_submissions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own achievements"
  ON user_achievements FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Learning guides are readable by all authenticated users"
  ON learning_guides FOR SELECT
  TO authenticated
  USING (true);

-- Functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_learning_guides_updated_at
  BEFORE UPDATE ON learning_guides
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();