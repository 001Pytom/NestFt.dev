import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  avatar: string;
}

export function Testimonial({ quote, name, title, avatar }: TestimonialProps) {
  return (
    <Card className="bg-card h-full">
      <CardContent className="p-6 flex flex-col gap-4">
        <div className="text-lg italic text-black ">&ldquo;{quote}&rdquo;</div>
        <div className="flex items-center gap-3 mt-2">
          <Avatar>
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-sm">{name}</div>
            <div className="text-xs text-muted-foreground">{title}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
