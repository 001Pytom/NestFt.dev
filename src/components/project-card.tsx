import React from "react";
import Link from "next/link";
import { Project } from "../types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Users, Clock } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video w-full overflow-hidden relative">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <div className="flex flex-wrap gap-2 mb-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 3 && (
            <Badge variant="outline" className="text-xs text-black">
              +{project.technologies.length - 3} more
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl">{project.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between w-full text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{project.completed_by} completed</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>~{project.estimated_hours} hours</span>
          </div>
        </div>
        <Link href={`/projects/${project.id}`} className="w-full">
          <Button className="w-full">View Project</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
