"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="blob absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full" />
          <div className="blob absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/20 rounded-full" />
        </div>

        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold font-display mb-6">
              Build Real Experience.
              <br />
              Get Hired.
              <br />
              <span className="text-accent">Join the DevNest.</span>
            </h1>
            <p className="text-xl text-text-secondary mb-8">
              Collaborate on real projects, get AI-graded, and grow your tech career.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white/50 dark:bg-black/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 font-display">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
              >
                <div className="text-4xl text-accent mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-text-secondary">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 font-display">Platform Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
              >
                <div className="text-3xl text-primary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-text-secondary">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 font-display">Ready to Start Your Journey?</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-accent text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-accent/90 transition-colors"
          >
            Join the Nest
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">NestFT.dev</h3>
              <p className="text-gray-400">Building the next generation of tech talent.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Projects</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Leaderboard</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Job Board</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Community</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Discord</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} NestFT.dev. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const steps = [
  {
    icon: "🎯",
    title: "Choose Your Path",
    description: "Select your skill level and preferred tech stack to start your journey.",
  },
  {
    icon: "🚀",
    title: "Complete Projects",
    description: "Work on real-world projects with other developers and get AI-powered feedback.",
  },
  {
    icon: "🏆",
    title: "Level Up",
    description: "Unlock new challenges, build your portfolio, and advance your career.",
  },
];

const features = [
  {
    icon: "💻",
    title: "Interactive Projects",
    description: "Work on real-world projects that matter, with increasing complexity as you progress.",
  },
  {
    icon: "🤝",
    title: "Collaboration Tools",
    description: "Built-in IDE and communication features for seamless team collaboration.",
  },
  {
    icon: "🤖",
    title: "AI Grading",
    description: "Get instant feedback and suggestions from our AI-powered code review system.",
  },
  {
    icon: "📊",
    title: "Progress Tracking",
    description: "Monitor your growth with detailed analytics and achievement badges.",
  },
  {
    icon: "🎨",
    title: "Portfolio Builder",
    description: "Automatically generate a professional portfolio from your completed projects.",
  },
  {
    icon: "💼",
    title: "Job Board",
    description: "Access exclusive job opportunities and hackathons from our partners.",
  },
];