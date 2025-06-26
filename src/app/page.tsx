"use client";

import { ProjectCard } from "@/components/project-card";
import { Testimonial } from "@/components/testimonial";
import { Button } from "@/components/ui/button";
import { Project } from "@/types";
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Github,
  Globe,
  Package,
  Users,
} from "lucide-react";
import Link from "next/link";

// Sample project data
const featuredProjects: Project[] = [
  {
    id: "1",
    title: "E-commerce Dashboard",
    description:
      "Build a full-featured admin dashboard for an e-commerce platform with analytics and product management.",
    difficulty: "Intermediate",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    requirements: [
      "User authentication and authorization",
      "Product CRUD operations",
      "Order management",
      "Analytics dashboard",
    ],
    thumbnail:
      "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    completed_by: 156,
    estimated_hours: 12,
  },
  {
    id: "2",
    title: "Real-time Chat Application",
    description:
      "Create a real-time chat application with private messaging, group chats, and media sharing.",
    difficulty: "Intermediate",
    technologies: ["React", "Socket.io", "Express", "MongoDB"],
    requirements: [
      "User authentication",
      "Real-time messaging",
      "Group chat functionality",
      "Online status indicators",
    ],
    thumbnail:
      "https://images.pexels.com/photos/7114752/pexels-photo-7114752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    completed_by: 203,
    estimated_hours: 10,
  },
  {
    id: "3",
    title: "Weather Forecast App",
    description:
      "Build a weather application that shows current conditions and forecasts for user-selected locations.",
    difficulty: "Easy",
    technologies: ["HTML/CSS", "JavaScript", "APIs"],
    requirements: [
      "Weather API integration",
      "Current conditions display",
      "Five-day forecast",
      "Location search",
    ],
    thumbnail:
      "https://images.pexels.com/photos/2448749/pexels-photo-2448749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    completed_by: 327,
    estimated_hours: 6,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 font-inter">
      {/* hero section */}
      <section className="relative overflow-hidden flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 md:pt-40">
        {/* Background Blobs */}
        <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-indigo-800 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-[30rem] h-[30rem] bg-emerald-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight font-space mb-6">
          Get real. Get hired. <br /> Build projects that prove your skills.
        </h1>
        <p className="sm:text-lg text-base text-slate-600 max-w-2xl">
          A platform for developers and analysts to collaborate on real-world
          projects, earn AI-driven feedback,and develop a professional portfolio
          that showcases the experience employers seek.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <Link href="/signup">
            <Button size="lg" className="font-medium">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/projects/browse">
            <Button size="lg" variant="outline" className="font-medium ">
              Browse Projects
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-2 mt-8">
          <span className="text-sm text-muted-foreground">Or sign in with</span>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full h-8 w-8 p-0"
          >
            <Github className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full h-8 w-8 p-0"
          >
            <Globe className="h-4 w-4" />
            <span className="sr-only">Google</span>
          </Button>
        </div>
      </section>

      {/* Walkthrough Section */}
      <section id="projects" className="bg-white md:py-20 py-8 px-6 text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-6 font-space ">
          How DevNest Works
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto mb-12 md:text-lg text-base">
          Choose your skill level, pick a tech stack, complete real projects,
          get AI feedback, collaborate, and build your portfolio , all in one
          place.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:px-24 px-0">
          <div className="bg-card border rounded-lg p-6 flex flex-col items-start text-left">
            <div className="rounded-full bg-primary/10 p-3 mb-4">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Choose Projects</h3>
            <p className="text-slate-600 mb-4 text-start">
              Select from a variety of real-world projects across different
              difficulty levels and technologies.
            </p>
            <ul className="space-y-2 mt-2">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-success mr-2" />
                <span className="text-sm">
                  Easy, intermediate, and advanced levels
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-success mr-2" />
                <span className="text-sm">
                  Curated by industry professionals
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-success mr-2" />
                <span className="text-sm">
                  Frontend, backend, and full-stack options
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-card border rounded-lg p-6 flex flex-col items-start text-left">
            <div className="rounded-full bg-secondary/10 p-3 mb-4">
              <Users className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Build Projects</h3>
            <p className="text-slate-600 mb-4 text-start">
              Work with other developers in real-time using our collaborative
              coding environment.
            </p>
            <ul className="space-y-2 mt-2">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-success mr-2" />
                <span className="text-sm">Live collaborative coding</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-success mr-2" />
                <span className="text-sm">Team communication tools</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-success mr-2" />
                <span className="text-sm">Version control integration</span>
              </li>
            </ul>
          </div>

          <div className="bg-card border rounded-lg p-6 flex flex-col items-start text-left">
            <div className="rounded-full bg-accent/10 p-3 mb-4">
              <BarChart3 className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-medium mb-2">
              Get Feedback & Build Portfolio
            </h3>
            <p className="text-slate-600 mb-4 text-start">
              Showcase your completed projects with automatically generated
              portfolio entries.
            </p>
            <ul className="space-y-2 mt-2">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-success mr-2" />
                <span className="text-sm">
                  Professional portfolio generation
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-success mr-2" />
                <span className="text-sm">GitHub integration</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-success mr-2" />
                <span className="text-sm">One-click deployment</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-8 md:px-24 px-6 md:py-24 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="sm:text-3xl text-2xl md:text-4xl font-bold mb-4">
                Featured Projects
              </h2>
              <p className="sm:text-lg text-base text-slate-600/80 max-w-2xl">
                Explore some of our most popular challenges that developers are
                building right now.
              </p>
            </div>
            <Link href="/projects/browse" className="mt-4 md:mt-0">
              <Button variant="outline">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-8 md:px-24 px-6 md:py-24 ">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="sm:text-3xl text-2xl md:text-4xl font-bold mb-4">
              What Developers Say
            </h2>
            <p className="sm:text-lg text-base text-slate-600/80 max-w-2xl mx-auto">
              Hear from developers who have boosted their careers through our
              platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            <Testimonial
              quote="After completing 5 projects on NestFt.dev, I landed my first developer job! The real-world experience and code reviews made all the difference."
              name="Alex Johnson"
              title="Frontend Developer at TechCorp"
              avatar="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
            <Testimonial
              quote="The collaborative aspect of this platform is amazing. I learned so much working with other developers and receiving feedback on my code."
              name="Sarah Chen"
              title="Full Stack Developer"
              avatar="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
            <Testimonial
              quote="NestFt.dev filled the gap in my resume. I had the knowledge from bootcamp, but needed real projects to show employers. This platform delivered exactly that."
              name="Marcus Williams"
              title="Software Engineer at StartupX"
              avatar="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-24 px-6 bg-primary/5">
        <div className="container mx-auto text-center">
          <h2 className="sm:text-3xl text-xl md:text-4xl font-bold mb-4">
            Ready to Level Up Your Tech Career?
          </h2>
          <p className="sm:text-lg text-base text-slate-600/80 max-w-2xl mx-auto mb-8">
            Join thousands of developers who are building projects,
            collaborating, and landing their dream jobs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="font-medium">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/projects/browse">
              <Button size="lg" variant="outline" className="font-medium">
                Explore Projects
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            No credit card required. Start building for free.
          </p>
        </div>
      </section>
    </div>
  );
}
