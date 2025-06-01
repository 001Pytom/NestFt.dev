import { motion } from 'framer-motion'
import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Head>
        <title>NestFT.dev - Build Real Projects, Get Hired</title>
        <meta name="description" content="Get real-world experience through collaborative, AI-scored projects. Perfect for frontend devs, backend engineers, and analysts." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-gray-50">
        {/* Hero Section */}
        <header className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
            <motion.h1 
              className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Get real. Get hired.
              <span className="text-primary"> Build projects that prove your skills.</span>
            </motion.h1>
            
            <motion.p 
              className="mx-auto mt-6 max-w-2xl text-lg text-slate-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              A platform for frontend devs, backend engineers, and analysts to build real-world projects, 
              get scored by AI, and grow through collaboration.
            </motion.p>

            <motion.div 
              className="mt-10 flex justify-center gap-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a
                href="#join"
                className="rounded-md bg-primary px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200"
              >
                Join NestFT.dev
              </a>
              <a
                href="#projects"
                className="rounded-md bg-white px-8 py-3 text-sm font-semibold text-primary shadow-sm ring-1 ring-inset ring-primary hover:ring-2 transition-all duration-200"
              >
                Explore Projects
              </a>
            </motion.div>
          </div>
        </header>

        {/* Features Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                How It Works
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Three simple steps to start building your portfolio
              </p>
            </div>

            <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Sign Up",
                  description: "Create your account and choose your learning path: Frontend, Backend, or Data Science.",
                  image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                },
                {
                  title: "Pick Your Project",
                  description: "Select from our curated list of real-world projects that match your skill level.",
                  image: "https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                },
                {
                  title: "Collaborate & Submit",
                  description: "Work with peers, get AI-powered feedback, and build your portfolio.",
                  image: "https://images.pexels.com/photos/3861967/pexels-photo-3861967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="aspect-w-16 aspect-h-9 mb-6 overflow-hidden rounded-lg">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={400}
                      height={300}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-slate-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Levels Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Projects for Every Level
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Start where you are, grow at your pace
              </p>
            </div>

            <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  level: "Beginner",
                  description: "Perfect for those starting their coding journey",
                  projects: ["Basic Web Apps", "Simple APIs", "Data Visualization"]
                },
                {
                  level: "Intermediate",
                  description: "Challenge yourself with more complex projects",
                  projects: ["Full-Stack Applications", "Database Design", "Authentication Systems"]
                },
                {
                  level: "Advanced",
                  description: "Build production-ready applications",
                  projects: ["Microservices", "Real-time Systems", "AI Integration"]
                }
              ].map((level, index) => (
                <motion.div
                  key={level.level}
                  className="relative p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold text-primary">{level.level}</h3>
                  <p className="mt-4 text-slate-600">{level.description}</p>
                  <ul className="mt-4 space-y-2">
                    {level.projects.map((project) => (
                      <li key={project} className="flex items-center text-slate-600">
                        <svg className="h-5 w-5 text-accent mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {project}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to start your journey?
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              Join thousands of developers building their future on NestFT.dev
            </p>
            <motion.div 
              className="mt-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="#join"
                className="inline-block rounded-md bg-accent px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-all duration-200"
              >
                Get Started Now
              </a>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-slate-600">
              <p>© 2025 NestFT.dev. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}