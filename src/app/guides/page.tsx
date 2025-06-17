"use client";

import React, { useEffect, useState } from "react";
import { BookOpen, ArrowRight, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getLearningGuides, LearningGuide } from "@/lib/database";

const categories = [
  "All",
  "Web Development",
  "Frontend",
  "Backend",
  "Full-Stack",
  "Tools",
  "DevOps",
];

function GuidesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [guides, setGuides] = useState<LearningGuide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGuides();
  }, []);

  const loadGuides = async () => {
    try {
      const data = await getLearningGuides();
      setGuides(data);
    } catch (error) {
      console.error('Error loading guides:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredGuides =
    selectedCategory === "All"
      ? guides
      : guides.filter((guide) => guide.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-success/10 text-success";
      case "intermediate":
        return "bg-warning/10 text-warning";
      case "advanced":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-24">
      {/* Hero Section */}
      <section className="py-16 md:py-24 hero-gradient">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <BookOpen className="h-12 w-12 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Learning Guides
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Step-by-step guides to master web development and advance your
              career.
            </p>
            <Link href="/signup">
              <Button size="lg">
                Start Learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 border-b">
        <div className="container px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-16">
        <div className="container px-4">
          {filteredGuides.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGuides.map((guide) => (
                <Card
                  key={guide.id}
                  className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={guide.image_url || 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg'}
                      alt={guide.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="text-xs">
                        {guide.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-warning text-warning" />
                        <span className="text-sm font-medium">
                          {guide.rating}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-semibold text-lg mb-3 line-clamp-2">
                      {guide.title}
                    </h3>

                    <p className="text-muted-foreground text-sm mb-4 flex-1">
                      {guide.description}
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{guide.duration}</span>
                        </div>
                        <span className="text-muted-foreground">
                          {guide.steps.length} steps
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge className={getDifficultyColor(guide.difficulty)}>
                          {guide.difficulty}
                        </Badge>
                        <Link href={`/guides/${guide.id}`}>
                          <Button size="sm">
                            Start Guide
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Guides Found</h3>
              <p className="text-muted-foreground">
                {selectedCategory === "All" 
                  ? "No learning guides available at the moment."
                  : `No guides found in the ${selectedCategory} category.`
                }
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Recommended Learning Path
            </h2>
            <p className="text-muted-foreground mb-12">
              Follow our structured learning path to become a full-stack
              developer.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6 text-center">
                <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">Foundations</h3>
                <p className="text-sm text-muted-foreground">
                  HTML, CSS, JavaScript basics
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="h-12 w-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">Frontend</h3>
                <p className="text-sm text-muted-foreground">
                  React, state management, APIs
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="h-12 w-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">Backend</h3>
                <p className="text-sm text-muted-foreground">
                  Node.js, databases, authentication
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="h-12 w-12 rounded-full bg-success text-success-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  4
                </div>
                <h3 className="font-semibold mb-2">Deployment</h3>
                <p className="text-sm text-muted-foreground">
                  DevOps, cloud platforms, CI/CD
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of developers who have advanced their careers with
            our comprehensive guides.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg">Get Started Free</Button>
            </Link>
            <Link href="/projects">
              <Button size="lg" variant="outline">
                Browse Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GuidesPage;