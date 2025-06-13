import React from "react";
import { Package, Users, Globe, GitBranch, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

function AboutPage() {
  return (
    <div className="min-h-screen px-12">
      {/* Hero Section */}
      <section className="py-16 md:py-24 hero-gradient">
        {/* Background Blobs */}
        <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-indigo-800 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        {/* <div className="absolute -bottom-10 -right-40 w-[30rem] h-[30rem] bg-emerald-500 opacity-20 rounded-full blur-3xl animate-pulse"></div> */}
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Package className="h-12 w-12 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h1>
            <p className="text-xl text-muted-foreground">
              We&apos;re building the future of tech education by connecting
              aspiring developers with real-world projects and collaborative
              learning opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">10,000+</div>
                <div className="text-sm text-muted-foreground">
                  Active Users
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Globe className="h-8 w-8 text-secondary mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <GitBranch className="h-8 w-8 text-accent mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">25,000+</div>
                <div className="text-sm text-muted-foreground">
                  Projects Completed
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Award className="h-8 w-8 text-success mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">90%</div>
                <div className="text-sm text-muted-foreground">
                  Success Rate
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="prose prose-lg">
              <p className="text-muted-foreground mb-4">
                NestFt.dev was founded in 2025 with a simple yet powerful
                idea: make tech education practical, collaborative, and
                accessible to everyone.
              </p>
              <p className="text-muted-foreground mb-4">
                We noticed a gap between traditional coding education and the
                real-world skills employers demand. That&quot;s why we created a
                platform where developers can learn by doing, collaborate with
                peers, and build a portfolio of real projects.
              </p>
              <p className="text-muted-foreground">
                Today, we&quot;re proud to help thousands of developers
                worldwide launch their tech careers through practical experience
                and community support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                    alt="John Smith"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-lg">John Smith</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Founder & CEO
                </p>
                <p className="text-sm text-muted-foreground">
                  Former Senior Engineer at Google with 15+ years of experience
                  in tech education.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                    alt="Sarah Chen"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>

                <h3 className="font-semibold text-lg">Sarah Chen</h3>
                <p className="text-sm text-muted-foreground mb-2">CTO</p>
                <p className="text-sm text-muted-foreground">
                  Tech lead with expertise in building scalable educational
                  platforms.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
                    alt="David Kumar"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>

                <h3 className="font-semibold text-lg">David Kumar</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Head of Education
                </p>
                <p className="text-sm text-muted-foreground">
                  10+ years experience in curriculum development and tech
                  education.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Community First</h3>
              <p className="text-muted-foreground">
                We believe in the power of collaborative learning and peer
                support.
              </p>
            </div>

            <div className="text-center">
              <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Excellence</h3>
              <p className="text-muted-foreground">
                We maintain high standards in our projects and educational
                content.
              </p>
            </div>

            <div className="text-center">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Globe className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Accessibility</h3>
              <p className="text-muted-foreground">
                Quality tech education should be accessible to everyone,
                everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Be part of a growing community of developers learning and building
            together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg">Get Started Free</Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
