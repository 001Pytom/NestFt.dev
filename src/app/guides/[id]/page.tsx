"use client";

import { useEffect, useState } from "react";
import { useParams} from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Clock,
  Star,
  CheckCircle,
  PlayCircle,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { getLearningGuide, LearningGuide } from "@/lib/database";
import Link from "next/link";

export default function GuideDetailPage() {
  const params = useParams();
  // const router = useRouter();
  const guideId = params.id as string;

  const [guide, setGuide] = useState<LearningGuide | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (guideId) {
      loadGuide();
    }
  }, [guideId]);

  const loadGuide = async () => {
    try {
      const data = await getLearningGuide(guideId);
      setGuide(data);
    } catch (error) {
      console.error("Error loading guide:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Guide Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The learning guide you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/guides">
            <Button>Back to Guides</Button>
          </Link>
        </div>
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
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Learning Guides
          </Link>

          <div className="text-center">
            <Badge
              className={getDifficultyColor(guide.difficulty)}
              variant="outline"
            >
              {guide.difficulty}
            </Badge>
            <h1 className="text-3xl font-bold mt-2 mb-4">{guide.title}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {guide.description}
            </p>
          </div>
        </motion.div>

        {/* Guide Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="font-semibold">Duration</div>
              <div className="text-sm text-muted-foreground">
                {guide.duration as string}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 text-secondary mx-auto mb-2" />
              <div className="font-semibold">Steps</div>
              <div className="text-sm text-muted-foreground">
                {(guide.steps as { length: number }).length} learning modules
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-warning mx-auto mb-2" />
              <div className="font-semibold">Rating</div>
              <div className="text-sm text-muted-foreground">
                {guide.rating as number}/5.0
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Learning Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Learning Path</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {guide.steps.map((step: any, index: number) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 transition-all cursor-pointer ${
                      currentStep === index
                        ? "border-primary bg-primary/5"
                        : "hover:border-primary/50"
                    }`}
                    onClick={() => setCurrentStep(index)}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          currentStep === index
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {index + 1}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{step.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {step.duration}
                          </div>
                        </div>

                        <p className="text-muted-foreground text-sm mb-3">
                          {step.description}
                        </p>

                        {step.topics && (
                          <div className="space-y-2">
                            <div className="text-sm font-medium">
                              Topics Covered:
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {step.topics.map(
                                (topic: string, topicIndex: number) => (
                                  <div
                                    key={topicIndex}
                                    className="flex items-center gap-2 text-sm"
                                  >
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span>{topic}</span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Current Step Detail */}
        {guide.steps[currentStep] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlayCircle className="h-5 w-5 text-primary" />
                  Step {currentStep + 1}: {guide.steps[currentStep].title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    {guide.steps[currentStep].description}
                  </p>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Duration: {guide.steps[currentStep].duration}</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={() =>
                        setCurrentStep(Math.max(0, currentStep - 1))
                      }
                      disabled={currentStep === 0}
                      variant="outline"
                    >
                      Previous Step
                    </Button>
                    <Button
                      onClick={() =>
                        setCurrentStep(
                          Math.min(guide.steps.length - 1, currentStep + 1)
                        )
                      }
                      disabled={currentStep === guide.steps.length - 1}
                    >
                      Next Step
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/projects/browse">
              <Button size="lg">
                Start Building Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/guides">
              <Button size="lg" variant="outline">
                Explore More Guides
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
