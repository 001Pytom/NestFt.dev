'use client'

import { motion } from 'framer-motion'
import { ProjectCard } from '@/components/project-card'
import { Project } from '@/types'

const projects: Project[] = [
  {
    id: "1",
    title: "E-commerce Dashboard",
    description: "Build a full-featured admin dashboard for an e-commerce platform with analytics and product management.",
    difficulty: "Intermediate",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    requirements: [
      "User authentication and authorization",
      "Product CRUD operations", 
      "Order management",
      "Analytics dashboard",
    ],
    thumbnail: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    completed_by: 156,
    estimated_hours: 12,
  },
  {
    id: "2", 
    title: "Real-time Chat Application",
    description: "Create a real-time chat application with private messaging, group chats, and media sharing.",
    difficulty: "Intermediate",
    technologies: ["React", "Socket.io", "Express", "MongoDB"],
    requirements: [
      "User authentication",
      "Real-time messaging",
      "Group chat functionality", 
      "Online status indicators",
    ],
    thumbnail: "https://images.pexels.com/photos/7114752/pexels-photo-7114752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    completed_by: 203,
    estimated_hours: 10,
  },
  {
    id: "3",
    title: "Weather Forecast App", 
    description: "Build a weather application that shows current conditions and forecasts for user-selected locations.",
    difficulty: "Easy",
    technologies: ["HTML/CSS", "JavaScript", "APIs"],
    requirements: [
      "Weather API integration",
      "Current conditions display",
      "Five-day forecast",
      "Location search",
    ],
    thumbnail: "https://images.pexels.com/photos/2448749/pexels-photo-2448749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    completed_by: 327,
    estimated_hours: 6,
  },
]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Projects</h1>
          <p className="text-muted-foreground">
            Choose from our curated collection of real-world projects
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}