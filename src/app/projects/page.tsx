"use client"
import React, { useState } from 'react';
import { Search, SlidersHorizontal, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ProjectCard } from '@/components/project-card';
import { Project } from '@/types';
import { difficultyLevels, technologies } from '@/lib/utils';

// Sample projects data
const projects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Dashboard',
    description: 'Build a full-featured admin dashboard for an e-commerce platform with analytics and product management.',
    difficulty: 'Intermediate',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    requirements: [
      'User authentication and authorization',
      'Product CRUD operations',
      'Order management',
      'Analytics dashboard'
    ],
    thumbnail: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    completed_by: 156,
    estimated_hours: 12
  },
  {
    id: '2',
    title: 'Real-time Chat Application',
    description: 'Create a real-time chat application with private messaging, group chats, and media sharing.',
    difficulty: 'Intermediate',
    technologies: ['React', 'Socket.io', 'Express', 'MongoDB'],
    requirements: [
      'User authentication',
      'Real-time messaging',
      'Group chat functionality',
      'Online status indicators'
    ],
    thumbnail: 'https://images.pexels.com/photos/7114752/pexels-photo-7114752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    completed_by: 203,
    estimated_hours: 10
  },
  {
    id: '3',
    title: 'Weather Forecast App',
    description: 'Build a weather application that shows current conditions and forecasts for user-selected locations.',
    difficulty: 'Easy',
    technologies: ['HTML/CSS', 'JavaScript', 'APIs'],
    requirements: [
      'Weather API integration',
      'Current conditions display',
      'Five-day forecast',
      'Location search'
    ],
    thumbnail: 'https://images.pexels.com/photos/2448749/pexels-photo-2448749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    completed_by: 327,
    estimated_hours: 6
  },
  {
    id: '4',
    title: 'Task Management System',
    description: 'Create a comprehensive task management system with user authentication, task assignment, and progress tracking.',
    difficulty: 'Intermediate',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    requirements: [
      'User authentication',
      'Task CRUD operations',
      'Task assignment',
      'Progress tracking'
    ],
    thumbnail: 'https://images.pexels.com/photos/3243/pen-calendar-to-do-checklist.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    completed_by: 134,
    estimated_hours: 8
  },
  {
    id: '5',
    title: 'Portfolio Website',
    description: 'Build a responsive portfolio website to showcase your projects, skills, and experience.',
    difficulty: 'Easy',
    technologies: ['HTML/CSS', 'JavaScript'],
    requirements: [
      'Responsive design',
      'Project showcase',
      'Contact form',
      'About me section'
    ],
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    completed_by: 412,
    estimated_hours: 4
  },
  {
    id: '6',
    title: 'Blog Platform',
    description: 'Create a full-featured blog platform with user authentication, post creation, and commenting.',
    difficulty: 'Intermediate',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    requirements: [
      'User authentication',
      'Post CRUD operations',
      'Commenting system',
      'Rich text editor'
    ],
    thumbnail: 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    completed_by: 189,
    estimated_hours: 10
  }
];

 function ProjectsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  
  const toggleFilter = (filter: string, type: 'technology' | 'difficulty') => {
    if (type === 'technology') {
      if (selectedTechnologies.includes(filter)) {
        setSelectedTechnologies(selectedTechnologies.filter(t => t !== filter));
      } else {
        setSelectedTechnologies([...selectedTechnologies, filter]);
      }
    } else {
      if (selectedDifficulties.includes(filter)) {
        setSelectedDifficulties(selectedDifficulties.filter(d => d !== filter));
      } else {
        setSelectedDifficulties([...selectedDifficulties, filter]);
      }
    }
  };
  
  const filteredProjects = projects.filter(project => {
    // Filter by search query
    const matchesSearch = 
      searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by technologies
    const matchesTech = 
      selectedTechnologies.length === 0 || 
      project.technologies.some(tech => selectedTechnologies.includes(tech));
    
    // Filter by difficulty
    const matchesDifficulty = 
      selectedDifficulties.length === 0 || 
      selectedDifficulties.includes(project.difficulty);
    
    // Filter by tab
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'easy' && project.difficulty === 'Easy') ||
      (activeTab === 'intermediate' && project.difficulty === 'Intermediate') ||
      (activeTab === 'hard' && project.difficulty === 'Hard');
    
    return matchesSearch && matchesTech && matchesDifficulty && matchesTab;
  });

  return (
    <div className="container py-8 px-24">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Projects</h1>
      </div>
      
      <div className="mb-8">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="easy">Easy</TabsTrigger>
              <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
              <TabsTrigger value="hard">Hard</TabsTrigger>
            </TabsList>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {(selectedTechnologies.length > 0 || selectedDifficulties.length > 0) && (
                <Badge variant="secondary" className="ml-1">
                  {selectedTechnologies.length + selectedDifficulties.length}
                </Badge>
              )}
            </Button>
          </div>
          
          {filtersOpen && (
            <Card className="p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map(tech => (
                      <Button
                        key={tech}
                        variant={selectedTechnologies.includes(tech) ? "default" : "outline"}
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => toggleFilter(tech, 'technology')}
                      >
                        {selectedTechnologies.includes(tech) && (
                          <Check className="h-3 w-3" />
                        )}
                        {tech}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Difficulty</h3>
                  <div className="flex flex-wrap gap-2">
                    {difficultyLevels.map(difficulty => (
                      <Button
                        key={difficulty}
                        variant={selectedDifficulties.includes(difficulty) ? "default" : "outline"}
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => toggleFilter(difficulty, 'difficulty')}
                      >
                        {selectedDifficulties.includes(difficulty) && (
                          <Check className="h-3 w-3" />
                        )}
                        {difficulty}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              
              {(selectedTechnologies.length > 0 || selectedDifficulties.length > 0) && (
                <div className="flex justify-end mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedTechnologies([]);
                      setSelectedDifficulties([]);
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </Card>
          )}
          
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <TabsContent value="all" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="easy" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="intermediate" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="hard" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default ProjectsPage;
