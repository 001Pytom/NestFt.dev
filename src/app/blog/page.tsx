import React from "react";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title:
      "The Future of Collaborative Coding: How Real-Time Development is Changing Tech Education",
    excerpt:
      "Explore how real-time collaborative coding platforms are revolutionizing the way developers learn and work together.",
    content: "",
    author: "Sarah Chen",
    authorAvatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    publishedAt: "2025-01-15",
    readTime: "8 min read",
    tags: ["Collaboration", "Education", "Technology"],
    featured: true,
    image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg",
  },
  {
    id: "2",
    title: "10 Essential Projects Every Developer Should Build",
    excerpt:
      "A comprehensive guide to the most valuable projects that will boost your portfolio and land you your dream job.",
    content: "",
    author: "Marcus Johnson",
    authorAvatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    publishedAt: "2025-01-12",
    readTime: "12 min read",
    tags: ["Career", "Portfolio", "Projects"],
    featured: false,
    image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg",
  },
  {
    id: "3",
    title: "From Bootcamp to Big Tech: Success Stories from NestFt.dev Alumni",
    excerpt:
      "Read inspiring stories from developers who used NestFt.dev to transition into successful tech careers.",
    content: "",
    author: "Emily Rodriguez",
    authorAvatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    publishedAt: "2025-01-10",
    readTime: "6 min read",
    tags: ["Success Stories", "Career", "Inspiration"],
    featured: false,
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg",
  },
  {
    id: "4",
    title: "Mastering Git Collaboration: Best Practices for Team Projects",
    excerpt:
      "Learn the essential Git workflows and collaboration strategies that every developer needs to know.",
    content: "",
    author: "David Kumar",
    authorAvatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
    publishedAt: "2025-01-08",
    readTime: "10 min read",
    tags: ["Git", "Collaboration", "Best Practices"],
    featured: false,
    image: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg",
  },
  {
    id: "5",
    title: "Building Your First Full-Stack Application: A Step-by-Step Guide",
    excerpt:
      "Complete walkthrough of building a full-stack application from planning to deployment.",
    content: "",
    author: "Alex Thompson",
    authorAvatar:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    publishedAt: "2025-01-05",
    readTime: "15 min read",
    tags: ["Full-Stack", "Tutorial", "Development"],
    featured: false,
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
  },
];

function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 hero-gradient">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              NestFt.dev Blog
            </h1>
            <p className="text-xl text-muted-foreground">
              Insights, tutorials, and stories from the world of collaborative
              development.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <Badge className="mb-4">Featured Post</Badge>
              <Card className="overflow-hidden">
                <div className="md:flex">
                  {/* <div className="md:w-1/2">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div> */}
                  <div className="md:w-1/2 relative">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      layout="fill"
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>

                  <div className="md:w-1/2 p-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {featuredPost.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 mb-6">
                      <Image
                        src={featuredPost.authorAvatar}
                        alt={featuredPost.author}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover"
                      />

                      <div>
                        <div className="font-medium text-sm">
                          {featuredPost.author}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {new Date(
                              featuredPost.publishedAt
                            ).toLocaleDateString()}
                          </span>
                          <span>•</span>
                          <span>{featuredPost.readTime}</span>
                        </div>
                      </div>
                    </div>
                    <Button>
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Latest Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {regularPosts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden h-full flex flex-col"
              >
                <div className="relative w-full h-full min-h-64 transition-transform hover:scale-105">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="font-semibold text-lg mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-8 h-8">
                      <Image
                        src={post.authorAvatar}
                        alt={post.author}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>

                    <div>
                      <div className="font-medium text-sm">{post.author}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16">
        <div className="container px-4">
          <Card className="max-w-2xl mx-auto p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-6">
              Get the latest articles, tutorials, and developer insights
              delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border rounded-md"
              />
              <Button>Subscribe</Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default BlogPage;
