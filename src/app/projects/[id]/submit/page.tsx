"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  AlertCircle,
  Clock,
  Trophy,
  Star,
  RefreshCw,
  ExternalLink,
  Github,
} from "lucide-react";
import {
  beginnerProjects,
  intermediateProjects,
  advancedProjects,
} from "@/data/projects";
import { ProjectTemplate } from "@/types/project";
import { useAuthStore } from "@/lib/store";
import {
  getUserProject,
  updateUserProject,
  submitProject,
  updateUserProfile,
  getUserProfile,
} from "@/lib/database";
import { gradeProject } from "@/lib/aiGrading";
import Link from "next/link";

export default function ProjectSubmitPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const projectId = params.id as string;
  const userProjectId = searchParams.get("userProjectId");

  const [project, setProject] = useState<ProjectTemplate | null>(null);
  const [userProject, setUserProject] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gradingStatus, setGradingStatus] = useState<
    "idle" | "submitting" | "grading" | "completed" | "error"
  >("idle");
  const [gradingResults, setGradingResults] = useState<any>(null);
  const [repositoryUrl, setRepositoryUrl] = useState("");
  const [deployedUrl, setDeployedUrl] = useState("");

  useEffect(() => {
    loadProjectData();
  }, [projectId, userProjectId]);

  const loadProjectData = async () => {
    try {
      // Find the project template
      const allProjects = [
        ...beginnerProjects,
        ...intermediateProjects,
        ...advancedProjects,
      ];
      if (!allProjects.length) {
        return <div>Loading...</div>; // or your spinner
      }

      const foundProject = allProjects.find((p) => p.id === projectId);

      if (!foundProject) {
        return <div>Project not found.</div>;
      }

      setProject(foundProject);
      // console.log(foundProject, projectId);
      // console.log(allProjects);
      // console.log(userProjectId);
      // Load user project if ID provided
      if (userProjectId && user) {
        const userProj = await getUserProject(userProjectId);
        if (userProj) {
          setUserProject(userProj);
          setRepositoryUrl(userProj.repository_url || "");
          setDeployedUrl(userProj.deployed_url || "");
        }
      }
    } catch (error) {
      console.error("Error loading project data:", error);
    }
  };

  const handleSubmitForGrading = async () => {
    // console.log("grading started");
    if (!project || !userProject || !user) {
      alert("Missing required data for submission");
      return;
    }

    setIsSubmitting(true);
    setGradingStatus("submitting");

    try {
      // Validate that we have code files
      if (
        !userProject.code_files ||
        Object.keys(userProject.code_files).length === 0
      ) {
        throw new Error(
          "No code files found. Please save your work in the IDE first."
        );
      }

      // Create submission record
      const submissionData = {
        user_project_id: userProject.id,
        user_id: user.id,
        project_id: project.id,
        submission_data: {
          code_files: userProject.code_files,
          repository_url: repositoryUrl,
          deployed_url: deployedUrl,
          submitted_at: new Date().toISOString(),
        },
        repository_url: repositoryUrl || null,
        deployed_url: deployedUrl || null,
        grading_status: "grading",
      };

      const submission = await submitProject(submissionData);
      if (!submission) {
        throw new Error("Failed to create submission record");
      }

      setGradingStatus("grading");

      // Perform AI grading
      const codeAnalysis = {
        files: userProject.code_files,
        repositoryUrl: repositoryUrl || undefined,
        deployedUrl: deployedUrl || undefined,
      };

      const gradingResult = await gradeProject(project, codeAnalysis);

      // Update submission with grading results
      const updatedSubmission = await updateSubmission(submission.id, {
        ai_score: gradingResult.totalScore,
        ai_feedback: gradingResult.feedback,
        grading_status: "completed",
        graded_at: new Date().toISOString(),
      });

      // Update user project with completion data
      await updateUserProject(userProject.id, {
        status: "completed",
        score: gradingResult.totalScore,
        ai_feedback: gradingResult.feedback,
        completed_at: new Date().toISOString(),
      });

      // Update user profile with points and progress
      await updateUserProgress(
        user.id,
        gradingResult.totalScore,
        project.difficulty
      );

      setGradingResults(gradingResult);
      setGradingStatus("completed");
    } catch (error) {
      console.error("Error during submission and grading:", error);
      setGradingStatus("error");
      alert("Error during submission: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateSubmission = async (submissionId: string, updates: any) => {
    // This would be implemented in the database module
    // For now, we'll simulate it
    return { id: submissionId, ...updates };
  };

  const updateUserProgress = async (
    userId: string,
    points: number,
    difficulty: string
  ) => {
    try {
      const userProfile = await getUserProfile(userId);
      if (!userProfile) return;

      const newTotalPoints = userProfile.total_points + points;
      const newStreakDays = userProfile.streak_days + 1; // Simplified streak logic

      await updateUserProfile(userId, {
        total_points: newTotalPoints,
        streak_days: newStreakDays,
        last_activity_date: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      console.error("Error updating user progress:", error);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500/10 text-green-700 border-green-200";
      case "intermediate":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      case "advanced":
        return "bg-red-500/10 text-red-700 border-red-200";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A":
        return "text-green-600";
      case "B":
        return "text-blue-600";
      case "C":
        return "text-yellow-600";
      case "D":
        return "text-orange-600";
      case "F":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="text-center">
            <Badge
              className={getDifficultyColor(project.difficulty)}
              variant="outline"
            >
              {project.difficulty}
            </Badge>
            <h1 className="text-3xl font-bold mt-2 mb-4">
              Submit {project.name}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Submit your project for AI grading and receive detailed feedback
              on your implementation.
            </p>
          </div>
        </motion.div>

        {/* Submission Form */}
        {gradingStatus === "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Project Submission</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    GitHub Repository URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={repositoryUrl}
                    onChange={(e) => setRepositoryUrl(e.target.value)}
                    placeholder="https://github.com/username/repository"
                    className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Provide your GitHub repository URL for additional context
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Deployed URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={deployedUrl}
                    onChange={(e) => setDeployedUrl(e.target.value)}
                    placeholder="https://your-project.netlify.app"
                    className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Provide the live URL if you've deployed your project
                  </p>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">What will be graded:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {project.gradingCriteria.map((criteria) => (
                      <li key={criteria.id} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>
                          {criteria.category} ({criteria.maxPoints} points)
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  type="button"
                  onClick={handleSubmitForGrading}
                  disabled={isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Submitting for Grading...
                    </>
                  ) : (
                    <>
                      <Trophy className="h-4 w-4 mr-2" />
                      Submit for AI Grading
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Grading Progress */}
        {(gradingStatus === "submitting" || gradingStatus === "grading") && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Card>
              <CardContent className="p-12">
                <RefreshCw className="h-16 w-16 animate-spin mx-auto mb-6 text-primary" />
                <h3 className="text-xl font-semibold mb-2">
                  {gradingStatus === "submitting"
                    ? "Submitting Project..."
                    : "AI Grading in Progress..."}
                </h3>
                <p className="text-muted-foreground">
                  {gradingStatus === "submitting"
                    ? "Preparing your submission for grading"
                    : "Our AI is analyzing your code and checking requirements. This may take a few moments."}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Grading Results */}
        {gradingStatus === "completed" && gradingResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Overall Score */}
            <Card className="border-primary">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Trophy className="h-12 w-12 text-primary" />
                  <div>
                    <div
                      className={`text-4xl font-bold ${getGradeColor(
                        gradingResults.overallGrade
                      )}`}
                    >
                      {gradingResults.overallGrade}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Overall Grade
                    </div>
                  </div>
                </div>
                <CardTitle>
                  {gradingResults.totalScore} / {gradingResults.maxScore} Points
                </CardTitle>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                  <div
                    className="bg-primary h-3 rounded-full transition-all duration-1000"
                    style={{
                      width: `${
                        (gradingResults.totalScore / gradingResults.maxScore) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </CardHeader>
            </Card>

            {/* Detailed Feedback */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Detailed Feedback</h3>
              {gradingResults.feedback.map((item: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{item.category}</CardTitle>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">
                          {item.score} / {item.maxScore}
                        </span>
                        {item.score === item.maxScore ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : item.score >= item.maxScore * 0.7 ? (
                          <Star className="h-5 w-5 text-yellow-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {item.feedback}
                    </p>
                    {item.suggestions && item.suggestions.length > 0 && (
                      <div>
                        <h5 className="font-medium mb-2">
                          Suggestions for Improvement:
                        </h5>
                        <ul className="space-y-1">
                          {item.suggestions.map(
                            (suggestion: string, suggestionIndex: number) => (
                              <li
                                key={suggestionIndex}
                                className="text-sm text-muted-foreground flex items-start gap-2"
                              >
                                <span className="text-primary">•</span>
                                <span>{suggestion}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg">View Dashboard</Button>
              </Link>
              <Link href="/projects/browse">
                <Button size="lg" variant="outline">
                  Browse More Projects
                </Button>
              </Link>
              {repositoryUrl && (
                <a
                  href={repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="outline">
                    <Github className="h-4 w-4 mr-2" />
                    View Repository
                  </Button>
                </a>
              )}
              {deployedUrl && (
                <a href={deployedUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Live Project
                  </Button>
                </a>
              )}
            </div>
          </motion.div>
        )}

        {/* Error State */}
        {gradingStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Card className="border-destructive">
              <CardContent className="p-12">
                <AlertCircle className="h-16 w-16 mx-auto mb-6 text-destructive" />
                <h3 className="text-xl font-semibold mb-2">Grading Failed</h3>
                <p className="text-muted-foreground mb-6">
                  There was an error processing your submission. Please try
                  again.
                </p>
                <Button onClick={() => setGradingStatus("idle")}>
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
