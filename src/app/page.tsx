"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-slate-900 font-inter">
      {/* Hero Section */}
      <section className="relative overflow-hidden flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 md:pt-40">
        {/* Background Blobs */}
        <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-indigo-800 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-[30rem] h-[30rem] bg-emerald-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight font-space mb-6">
          Get real. Get hired. <br /> Build projects that prove your skills.
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          A platform for frontend devs, backend engineers, and analysts to build
          real-world projects, get scored by AI, and grow through collaboration.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 text-sm uppercase font-medium rounded-full shadow-lg">
              Join DevNest
            </Button>
          </Link>
          <Link href="#projects">
            <Button
              variant="outline"
              className="border-indigo-800 text-indigo-800 hover:bg-indigo-800 hover:text-white px-6 py-3 text-sm uppercase font-medium rounded-full"
            >
              Explore Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Walkthrough Section */}
      <section id="projects" className="bg-white py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6 font-space text-indigo-800">
          How DevNest Works
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto mb-12 text-lg">
          Choose your skill level, pick a tech stack, complete real projects,
          get AI feedback, collaborate, and build your portfolio — all in one
          place.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
          <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold mb-2">1. Choose Your Level</h3>
            <p className="text-slate-600">
              Beginner, Intermediate, or Advanced — unlock projects by
              completing quests.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold mb-2">
              2. Build Projects in the Browser
            </h3>
            <p className="text-slate-600">
              Use our in-browser IDE with folders, live previews, and deployment
              options.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold mb-2">
              3. Get Feedback & Collaborate
            </h3>
            <p className="text-slate-600">
              Receive AI review scores, real-time team feedback, and grow your
              GitHub profile.
            </p>
          </div>
        </div>
      </section>

      {/* Leaderboard + Portfolio Preview */}
      <section className="py-20 px-6 bg-gray-50 text-center">
        <h2 className="text-4xl font-bold font-space text-indigo-800 mb-6">
          Prove It. Share It.
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto mb-12 text-lg">
          DevNest helps you stand out with a built-in portfolio, AI scores,
          GitHub pushes, and a global leaderboard of real contributors.
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">🌟 Leaderboard</h3>
            <p className="text-slate-600">
              Compete and get ranked by skill level, project completions, and
              feedback score.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">📁 Your Portfolio</h3>
            <p className="text-slate-600">
              Every completed project is stored in your profile and can be
              shared or deployed.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-800 text-white py-6 text-center text-sm">
        © {new Date().getFullYear()} DevNest. Made for Devs by Devs.
      </footer>
    </main>
  );
}
