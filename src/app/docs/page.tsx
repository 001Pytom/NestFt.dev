import React from "react";
import { Book, Code, Zap, Users, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

function DocsPage() {
  const sections = [
    {
      title: "Getting Started",
      icon: Zap,
      items: [
        { title: "Quick Start Guide", href: "#quick-start" },
        { title: "Creating Your First Project", href: "#first-project" },
        { title: "Understanding Project Types", href: "#project-types" },
        { title: "Setting Up Your Profile", href: "#profile-setup" },
      ],
    },
    {
      title: "Collaboration",
      icon: Users,
      items: [
        { title: "Real-time Coding", href: "#real-time-coding" },
        { title: "Team Communication", href: "#team-communication" },
        { title: "Code Reviews", href: "#code-reviews" },
        { title: "Project Management", href: "#project-management" },
      ],
    },
    {
      title: "Development",
      icon: Code,
      items: [
        { title: "IDE Features", href: "#ide-features" },
        { title: "Debugging Tools", href: "#debugging" },
        { title: "Version Control", href: "#version-control" },
        { title: "Deployment Guide", href: "#deployment" },
      ],
    },
  ];

  return (
    <div className="min-h-screen px-24">
      {/* Hero Section */}
      <section className="py-16 md:py-24 hero-gradient">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Book className="h-12 w-12 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Documentation
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Everything you need to know to get started and master
              NestFt.dev.
            </p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search documentation..." className="pl-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-16">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sections.map((section) => (
              <Card key={section.title} className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <section.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.items.map((item) => (
                      <li key={item.title}>
                        <a
                          href={item.href}
                          className="flex items-center justify-between text-sm hover:text-primary transition-colors group"
                        >
                          <span>{item.title}</span>
                          <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div id="quick-start" className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Quick Start Guide</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground mb-6">
                  Get up and running with NestFt.dev in just a few minutes.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="p-6">
                    <div className="text-center">
                      <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                        1
                      </div>
                      <h3 className="font-semibold mb-2">Sign Up</h3>
                      <p className="text-sm text-muted-foreground">
                        Create your account using GitHub, Google, or email.
                      </p>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="text-center">
                      <div className="h-12 w-12 rounded-full bg-secondary text-slate-50 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                        2
                      </div>
                      <h3 className="font-semibold mb-2">Choose Project</h3>
                      <p className="text-sm text-muted-foreground">
                        Browse our curated projects and pick one that matches
                        your skill level.
                      </p>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="text-center">
                      <div className="h-12 w-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                        3
                      </div>
                      <h3 className="font-semibold mb-2">Start Building</h3>
                      <p className="text-sm text-muted-foreground">
                        Use our browser-based IDE to start coding immediately.
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            <div id="first-project" className="mb-16">
              <h2 className="text-3xl font-bold mb-6">
                Creating Your First Project
              </h2>
              <Card className="p-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Follow these steps to create and complete your first project
                    on NestFt.dev:
                  </p>

                  <ol className="space-y-4 list-decimal list-inside">
                    <li className="text-sm">
                      <strong>Browse Projects:</strong> Visit the Projects page
                      and filter by difficulty level (Easy recommended for
                      beginners).
                    </li>
                    <li className="text-sm">
                      <strong>Read Requirements:</strong> Carefully review the
                      project requirements and technologies needed.
                    </li>
                    <li className="text-sm">
                      <strong>Start Project:</strong> Click  &quot;View Project&quot; and
                      then  &quot;Start Building&quot; to enter the workspace.
                    </li>
                    <li className="text-sm">
                      <strong>Code & Collaborate:</strong> Use the IDE to write
                      code and collaborate with other developers.
                    </li>
                    <li className="text-sm">
                      <strong>Deploy & Share:</strong> Once complete, deploy
                      your project and add it to your portfolio.
                    </li>
                  </ol>
                </div>
              </Card>
            </div>

            <div id="ide-features" className="mb-16">
              <h2 className="text-3xl font-bold mb-6">IDE Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="font-semibold mb-3">Code Editor</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Syntax highlighting for multiple languages</li>
                    <li>• Auto-completion and IntelliSense</li>
                    <li>• Code formatting and linting</li>
                    <li>• Multiple file tabs</li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold mb-3">Live Preview</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Real-time preview of your application</li>
                    <li>• Hot reload for instant updates</li>
                    <li>• Mobile responsive testing</li>
                    <li>• Console output and error display</li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of developers building real projects and advancing
            their careers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg">Start Building Now</Button>
            </Link>
            <Link href="/projects/browse">
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
export default DocsPage;
