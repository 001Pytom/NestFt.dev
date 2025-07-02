import { supabase } from "./supabase";

export interface UserProfile {
  id: string;
  user_id: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  current_stage: "beginner" | "intermediate" | "advanced";
  total_points: number;
  streak_days: number;
  last_activity_date: string;
  github_username?: string;
  github_connected: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserProject {
  id: string;
  user_id: string;
  project_id: string;
  project_name: string;
  stack: string;
  difficulty: string;
  template_id: string;
  status: "in_progress" | "completed" | "submitted";
  code_files: Record<string, string>;
  repository_url?: string;
  deployed_url?: string;
  score?: number;
  ai_feedback?: unknown;
  started_at: string;
  completed_at?: string;
  last_saved_at: string;
}

export interface ProjectSubmission {
  id: string;
  user_project_id: string;
  user_id: string;
  project_id: string;
  submission_data: unknown;
  repository_url?: string;
  deployed_url?: string;
  ai_score?: number;
  ai_feedback?: unknown;
  grading_status: "pending" | "grading" | "completed" | "failed";
  submitted_at: string;
  graded_at?: string;
}

export interface GuideStep {
  title: string;
  description: string;
  duration: string;
  topics?: string[];
}

interface UserData {
  user_metadata?: {
    name?: string;
    full_name?: string;
    avatar_url?: string;
  };
  email?: string;
}

export interface RecentActivityItem {
  id: number | string;
  name?: string;
  date: Date | string;
  difficulty: string;
  aiScore?: number;
  aiFeedback?: string;
  type: string;
  title: string;
  description: string;
  score: number;
}

export interface LearningGuide {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: string;
  // steps: unknown[];
  steps: {
    title: string;
    description: string;
    duration: string;
    topics?: string[];
  }[];
  rating: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

// User Profile Functions
export async function getUserProfile(
  userId: string
): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }

  return data;
}

export async function createUserProfile(
  profile: Partial<UserProfile>
): Promise<UserProfile | null> {
  // Check if profile already exists to prevent duplicates
  const existingProfile = await getUserProfile(profile.user_id!);
  if (existingProfile) {
    console.log("User profile already exists, returning existing profile");
    return existingProfile;
  }

  const { data, error } = await supabase
    .from("user_profiles")
    .upsert(profile)
    .select()
    .single();

  if (error) {
    console.error("Error creating user profile:", error);
    return null;
  }

  return data;
}

export async function updateUserProfile(
  userId: string,
  updates: Partial<UserProfile>
): Promise<UserProfile | null> {
  // Always update the updated_at timestamp
  updates.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("user_profiles")
    .update(updates)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    console.error("Error updating user profile:", error);
    return null;
  }

  return data;
}

// Get or create user profile (prevents duplicates)
export async function getOrCreateUserProfile(
  userId: string,
  userData?: UserData
): Promise<UserProfile | null> {
  try {
    // First try to get existing profile
    let profile = await getUserProfile(userId);

    if (!profile) {
      // Create new profile if it doesn't exist
      const newProfile = {
        user_id: userId,
        full_name:
          userData?.user_metadata?.name ||
          userData?.user_metadata?.full_name ||
          userData?.email?.split("@")[0] ||
          "User",
        avatar_url: userData?.user_metadata?.avatar_url,
        current_stage: "beginner" as const,
        total_points: 0,
        streak_days: 0,
        last_activity_date: new Date().toISOString().split("T")[0],
        github_connected: false,
      };

      profile = await createUserProfile(newProfile);
    }

    return profile;
  } catch (error) {
    console.error("Error getting or creating user profile:", error);
    return null;
  }
}

// Update user streak based on daily activity (login + project submission)
export async function updateUserStreak(userId: string): Promise<void> {
  try {
    // Use getOrCreateUserProfile to ensure profile exists
    const userProfile = await getOrCreateUserProfile(userId);
    if (!userProfile) return;

    const today = new Date().toISOString().split("T")[0];
    const lastActivityDate = userProfile.last_activity_date;

    // If user already had activity today, don't update streak
    if (lastActivityDate === today) {
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    let newStreakDays = 1; // At least 1 day for today's activity

    // If last activity was yesterday, increment streak
    if (lastActivityDate === yesterdayStr) {
      newStreakDays = userProfile.streak_days + 1;
    }
    // If last activity was before yesterday, reset streak to 1
    // If no previous activity, start with 1

    await updateUserProfile(userId, {
      streak_days: newStreakDays,
      last_activity_date: today,
    });

    console.log(`Updated user ${userId} streak to ${newStreakDays} days`);
  } catch (error) {
    console.error("Error updating user streak:", error);
  }
}

type SubmissionItem = {
  id: string;
  project_id: string;
  ai_score: number | null;
  submitted_at: string;
  user_projects: {
    project_name: string;
    difficulty: string;
  };
};

// Get user's recent activity for profile page
export async function getUserRecentActivity(
  userId: string,
  limit: number = 5
): Promise<RecentActivityItem[]> {
  try {
    // Get recent project submissions
    const { data: submissions, error: submissionsError } = await supabase
      .from("project_submissions")
      .select(
        `
    id,
    project_id,
    ai_score,
    submitted_at,
    user_projects(project_name, difficulty)
  `
      )
      .eq("user_id", userId)
      .order("submitted_at", { ascending: false })
      .limit(limit)
      .returns<SubmissionItem[]>();

    if (submissionsError) {
      console.error("Error fetching recent submissions:", submissionsError);
      return [];
    }

    // Format the activity data
    const activities =
      submissions?.map((submission) => ({
        id: submission.id,
        type: "project_submission",
        title: `Submitted ${submission.user_projects.project_name}`,
        description: `Earned ${submission.ai_score || 0} points`,
        difficulty: submission.user_projects.difficulty,
        date: submission.submitted_at,
        score: submission.ai_score || 0,
      })) || [];

    return activities;
  } catch (error) {
    console.error("Error fetching user recent activity:", error);
    return [];
  }
}

// Get user statistics for profile
export async function getUserStats(userId: string): Promise<{
  totalProjects: number;
  totalPoints: number;
  streakDays: number;
  currentStage: string;
}> {
  try {
    const userProfile = await getUserProfile(userId);
    const submittedProjectIds = await getUserSubmittedProjects(userId);

    return {
      totalProjects: submittedProjectIds.length,
      totalPoints: userProfile?.total_points || 0,
      streakDays: userProfile?.streak_days || 0,
      currentStage: userProfile?.current_stage || "beginner",
    };
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return {
      totalProjects: 0,
      totalPoints: 0,
      streakDays: 0,
      currentStage: "beginner",
    };
  }
}

// Check and update user stage based on their progress
export async function checkAndUpdateUserStage(
  userId: string,
  projectDifficulty: string
): Promise<void> {
  try {
    const userProfile = await getUserProfile(userId);
    if (!userProfile) return;

    const progress = await calculateUserProgress(userId);
    let shouldUpdateStage = false;
    let newStage: "beginner" | "intermediate" | "advanced" =
      userProfile.current_stage;

    // Check if user should advance to intermediate
    if (
      userProfile.current_stage === "beginner" &&
      projectDifficulty === "intermediate" &&
      progress.beginner.percentage >= 70
    ) {
      newStage = "intermediate";
      shouldUpdateStage = true;
    }

    // Check if user should advance to advanced
    if (
      userProfile.current_stage === "intermediate" &&
      projectDifficulty === "advanced" &&
      progress.intermediate.percentage >= 70
    ) {
      newStage = "advanced";
      shouldUpdateStage = true;
    }

    if (shouldUpdateStage) {
      await updateUserProfile(userId, {
        current_stage: newStage,
        updated_at: new Date().toISOString(),
      });

      console.log(`User ${userId} advanced to ${newStage} stage`);
    }
  } catch (error) {
    console.error("Error checking/updating user stage:", error);
  }
}

// User Projects Functions
export async function getUserProjects(userId: string): Promise<UserProject[]> {
  const { data, error } = await supabase
    .from("user_projects")
    .select("*")
    .eq("user_id", userId)
    .order("started_at", { ascending: false });

  if (error) {
    console.error("Error fetching user projects:", error);
    return [];
  }

  return data || [];
}

export async function getUserProject(
  projectId: string
): Promise<UserProject | null> {
  const { data, error } = await supabase
    .from("user_projects")
    .select("*")
    .eq("id", projectId)
    .single();

  if (error) {
    console.error("Error fetching user project:", error);
    return null;
  }

  return data;
}

export async function createUserProject(
  project: Partial<UserProject>
): Promise<UserProject | null> {
  const { data, error } = await supabase
    .from("user_projects")
    .insert(project)
    .select()
    .single();

  if (error) {
    console.error("Error creating user project:", error);
    return null;
  }

  return data;
}

export async function updateUserProject(
  projectId: string,
  updates: Partial<UserProject>
): Promise<UserProject | null> {
  const { data, error } = await supabase
    .from("user_projects")
    .update(updates)
    .eq("id", projectId)
    .select()
    .single();

  if (error) {
    console.error("Error updating user project:", error);
    return null;
  }

  return data;
}

export async function saveProjectCode(
  projectId: string,
  codeFiles: Record<string, string>
): Promise<boolean> {
  const { error } = await supabase
    .from("user_projects")
    .update({
      code_files: codeFiles,
      last_saved_at: new Date().toISOString(),
    })
    .eq("id", projectId);

  if (error) {
    console.error("Error saving project code:", error);
    return false;
  }

  return true;
}

// Project Submissions Functions
export async function hasUserSubmittedProject(
  userId: string,
  projectId: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from("project_submissions")
    .select("id")
    .eq("user_id", userId)
    .eq("project_id", projectId)
    .limit(1);

  if (error) {
    console.error("Error checking project submission:", error);
    return false;
  }

  return data && data.length > 0;
}

export async function getUserSubmittedProjects(
  userId: string
): Promise<string[]> {
  const { data, error } = await supabase
    .from("project_submissions")
    .select("project_id")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching submitted projects:", error);
    return [];
  }

  return data?.map((item) => item.project_id) || [];
}

export async function submitProject(
  submission: Partial<ProjectSubmission>
): Promise<ProjectSubmission | null> {
  // Check if user has already submitted this project
  if (submission.user_id && submission.project_id) {
    const hasSubmitted = await hasUserSubmittedProject(
      submission.user_id,
      submission.project_id
    );
    if (hasSubmitted) {
      throw new Error(
        "You have already submitted this project and received points for it. Try a different project to continue earning points!"
      );
    }
  }

  const { data, error } = await supabase
    .from("project_submissions")
    .insert(submission)
    .select()
    .single();

  if (error) {
    console.error("Error submitting project:", error);
    return null;
  }

  return data;
}

export async function updateProjectSubmission(
  submissionId: string,
  updates: Partial<ProjectSubmission>
): Promise<ProjectSubmission | null> {
  const { data, error } = await supabase
    .from("project_submissions")
    .update(updates)
    .eq("id", submissionId)
    .select()
    .single();

  if (error) {
    console.error("Error updating project submission:", error);
    return null;
  }

  return data;
}

export async function getProjectSubmissions(
  userId: string
): Promise<ProjectSubmission[]> {
  const { data, error } = await supabase
    .from("project_submissions")
    .select("*")
    .eq("user_id", userId)
    .order("submitted_at", { ascending: false });

  if (error) {
    console.error("Error fetching project submissions:", error);
    return [];
  }

  return data || [];
}

// Learning Guides Functions
export async function getLearningGuides(): Promise<LearningGuide[]> {
  const { data, error } = await supabase
    .from("learning_guides")
    .select("*")
    .order("rating", { ascending: false });

  if (error) {
    console.error("Error fetching learning guides:", error);
    return [];
  }

  return data || [];
}

export async function getLearningGuide(
  id: string
): Promise<LearningGuide | null> {
  const { data, error } = await supabase
    .from("learning_guides")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching learning guide:", error);
    return null;
  }

  return data;
}

// Leaderboard Functions - Updated to use real data
export async function getLeaderboard(
  limit: number = 50
): Promise<UserProfile[]> {
  const { data, error } = await supabase
    .from("leaderboard_view") // or 'user_profiles' with appropriate filters
    .select("*")
    .gte("total_points", 0) // Include all profiles with points >= 0
    // .gt('total_points', 0)  // Include all profiles with points > 0
    .order("total_points", { ascending: false })
    .order("created_at", { ascending: true }) // Secondary sort by join date for ties
    .limit(limit);

  if (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }
  //  Filter duplicates by user_id if somehow duplicates sneak in
  const uniqueUsers =
    data?.filter(
      (user, index, self) =>
        index === self.findIndex((u) => u.user_id === user.user_id)
    ) || [];

  return uniqueUsers;
}

// Get leaderboard with user rankings
export async function getLeaderboardWithRankings(
  limit: number = 50
): Promise<(UserProfile & { rank: number })[]> {
  const profiles = await getLeaderboard(limit);

  // Add rank to each profile
  return profiles.map((profile, index) => ({
    ...profile,
    rank: index + 1,
  }));
}

// Get user's position in leaderboard
export async function getUserLeaderboardPosition(
  userId: string
): Promise<{ rank: number; totalUsers: number } | null> {
  try {
    // Get all users ordered by points (same query as leaderboard)
    const { data: allUsers, error } = await supabase
      .from("user_profiles")
      .select("user_id, total_points, created_at")
      .gte("total_points", 0)
      .order("total_points", { ascending: false })
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching leaderboard position:", error);
      return null;
    }

    const userIndex = allUsers?.findIndex((user) => user.user_id === userId);

    if (userIndex === -1 || userIndex === undefined) {
      return null;
    }

    return {
      rank: userIndex + 1,
      totalUsers: allUsers?.length || 0,
    };
  } catch (error) {
    console.error("Error getting user leaderboard position:", error);
    return null;
  }
}

// Progress Calculation Functions - Updated to use real data
export async function calculateUserProgress(userId: string): Promise<{
  beginner: { completed: number; total: number; percentage: number };
  intermediate: { completed: number; total: number; percentage: number };
  advanced: { completed: number; total: number; percentage: number };
}> {
  // Get unique submitted projects (only count each project once)
  const submittedProjectIds = await getUserSubmittedProjects(userId);
  const projects = await getUserProjects(userId);

  // Filter to only include projects that have been submitted and are unique
  const completedProjects = projects.filter(
    (p) =>
      p.status === "completed" && submittedProjectIds.includes(p.project_id)
  );

  // Count unique projects by difficulty
  const uniqueProjectsByDifficulty = {
    beginner: new Set(),
    intermediate: new Set(),
    advanced: new Set(),
  };

  completedProjects.forEach((project) => {
    if (project.difficulty === "beginner") {
      uniqueProjectsByDifficulty.beginner.add(project.project_id);
    } else if (project.difficulty === "intermediate") {
      uniqueProjectsByDifficulty.intermediate.add(project.project_id);
    } else if (project.difficulty === "advanced") {
      uniqueProjectsByDifficulty.advanced.add(project.project_id);
    }
  });

  const beginnerCompleted = uniqueProjectsByDifficulty.beginner.size;
  const intermediateCompleted = uniqueProjectsByDifficulty.intermediate.size;
  const advancedCompleted = uniqueProjectsByDifficulty.advanced.size;

  return {
    beginner: {
      completed: beginnerCompleted,
      total: 20,
      percentage: Math.round((beginnerCompleted / 20) * 100),
    },
    intermediate: {
      completed: intermediateCompleted,
      total: 20,
      percentage: Math.round((intermediateCompleted / 20) * 100),
    },
    advanced: {
      completed: advancedCompleted,
      total: 20,
      percentage: Math.round((advancedCompleted / 20) * 100),
    },
  };
}

export async function canAccessDifficulty(
  userId: string,
  difficulty: "beginner" | "intermediate" | "advanced"
): Promise<boolean> {
  if (difficulty === "beginner") return true;

  const progress = await calculateUserProgress(userId);

  if (difficulty === "intermediate") {
    return progress.beginner.percentage >= 70;
  }

  if (difficulty === "advanced") {
    return progress.intermediate.percentage >= 70;
  }

  return false;
}

// Get all completed projects for leaderboard calculation
export async function getAllCompletedProjects(): Promise<UserProject[]> {
  const { data, error } = await supabase
    .from("user_projects")
    .select("*")
    .eq("status", "completed")
    .order("completed_at", { ascending: false });

  if (error) {
    console.error("Error fetching completed projects:", error);
    return [];
  }

  return data || [];
}

// Update leaderboard rankings (this could be run periodically)
export async function updateLeaderboardRankings(): Promise<void> {
  try {
    // Get all user profiles ordered by points
    const { error } = await supabase
      .from("user_profiles")
      .select("*")
      .order("total_points", { ascending: false });

    if (error) throw error;

    // Update rankings based on current points
    // This is handled automatically by the ORDER BY in getLeaderboard
    console.log("Leaderboard rankings updated successfully");
  } catch (error) {
    console.error("Error updating leaderboard rankings:", error);
  }
}
