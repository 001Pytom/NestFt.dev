import React from "react";
import {
  Code,
  Users,
  GitBranch,
  Award,
  Star,
  Rocket,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

function FeaturesPage() {
  return (
    <div className="min-h-screen px-12">
      {/* Hero Section */}
      <section className="py-16 md:py-24 hero-gradient">
        {/* Background Blobs */}
        <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-indigo-800 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        {/* <div className="absolute -top-10 -right-10 w-[30rem] h-[30rem] bg-emerald-500 opacity-20 rounded-full blur-3xl animate-pulse"></div> */}
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need to Build Real Projects
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              From collaborative coding to AI-powered feedback, we provide all
              the tools you need to succeed in your tech career.
            </p>
            <Link href="/signup">
              <Button size="lg">Get Started Free</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Browser-Based IDE</h3>
                <p className="text-muted-foreground">
                  Code directly in your browser with our powerful IDE featuring
                  syntax highlighting, auto-completion, and real-time preview.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Multiple language support
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Live preview
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Auto-save functionality
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold">
                  Real-time Collaboration
                </h3>
                <p className="text-muted-foreground">
                  Work together with other developers in real-time, share code,
                  and learn from each other.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-secondary" />
                    Live collaborative coding
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-secondary" />
                    Built-in chat
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-secondary" />
                    Code sharing
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Brain className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">AI-Powered Learning</h3>
                <p className="text-muted-foreground">
                  Get instant feedback on your code from our AI system, helping
                  you learn and improve faster.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-accent" />
                    Code analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-accent" />
                    Personalized feedback
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-accent" />
                    Learning recommendations
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                  <GitBranch className="h-6 w-6 text-success" />
                </div>
                <h3 className="text-xl font-semibold">GitHub Integration</h3>
                <p className="text-muted-foreground">
                  Seamlessly connect with GitHub to manage your projects and
                  build your portfolio.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-success" />
                    One-click repository creation
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-success" />
                    Automatic commits
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-success" />
                    Branch management
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Rocket className="h-6 w-6 text-warning" />
                </div>
                <h3 className="text-xl font-semibold">One-Click Deployment</h3>
                <p className="text-muted-foreground">
                  Deploy your projects instantly and showcase them to the world
                  with just one click.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-warning" />
                    Instant deployment
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-warning" />
                    Custom domains
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-warning" />
                    SSL certificates
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Portfolio Generation</h3>
                <p className="text-muted-foreground">
                  Automatically generate a professional portfolio showcasing
                  your completed projects.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Custom themes
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Project showcases
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Skills visualization
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Building?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already building their
            portfolio and advancing their careers.
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

export default FeaturesPage;
