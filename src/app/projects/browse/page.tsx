'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Code, Server, Layers } from 'lucide-react'
import { techStacks } from '@/data/projects'
// import { TechStack } from '@/types/project'
import Link from 'next/link'

export default function BrowseProjectsPage() {
  const [selectedStack, setSelectedStack] = useState<string | null>(null)

  const getStackIcon = (stackId: string) => {
    switch (stackId) {
      case 'frontend':
        return <Code className="h-8 w-8" />
      case 'backend':
        return <Server className="h-8 w-8" />
      case 'fullstack':
        return <Layers className="h-8 w-8" />
      default:
        return <Code className="h-8 w-8" />
    }
  }

  const getStackColor = (stackId: string) => {
    switch (stackId) {
      case 'frontend':
        return 'from-blue-500/10 to-purple-500/10 border-blue-200'
      case 'backend':
        return 'from-green-500/10 to-emerald-500/10 border-green-200'
      case 'fullstack':
        return 'from-orange-500/10 to-red-500/10 border-orange-200'
      default:
        return 'from-gray-500/10 to-gray-600/10 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Choose Your Development Path</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select a technology stack to explore projects tailored to your learning goals and skill level.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {techStacks.map((stack, index) => (
            <motion.div
              key={stack.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br ${getStackColor(stack.id)} ${
                  selectedStack === stack.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedStack(stack.id)}
              >
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4 text-primary">
                    {getStackIcon(stack.id)}
                  </div>
                  <CardTitle className="text-2xl">{stack.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-6">{stack.description}</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {stack.templates.slice(0, 3).map((template) => (
                      <Badge key={template.id} variant="secondary" className="text-xs">
                        {template.name}
                      </Badge>
                    ))}
                    {stack.templates.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{stack.templates.length - 3} more
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {selectedStack && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Link href={`/projects/browse/${selectedStack}`}>
              <Button size="lg" className="group">
                Continue with {techStacks.find(s => s.id === selectedStack)?.name}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        )}

        {!selectedStack && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <p className="text-muted-foreground">
              Select a technology stack above to get started with your learning journey.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}