
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Bookmark, Share } from "lucide-react";
import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "AfriEats Food Delivery",
    description: "A food delivery platform for local African cuisines with realtime tracking and payment integration.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&h=400",
    author: {
      name: "Chioma Eze",
      country: "Nigeria",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    likes: 124,
    comments: 23,
    bookmarks: 45
  },
  {
    id: 2,
    title: "SavannahPay",
    description: "A mobile payment solution designed for small businesses across East Africa with low bandwidth requirements.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&h=400",
    author: {
      name: "Mark Ochieng",
      country: "Kenya",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    tags: ["Flutter", "Firebase", "M-Pesa API"],
    likes: 89,
    comments: 17,
    bookmarks: 34
  },
  {
    id: 3,
    title: "EduConnect",
    description: "An education platform connecting students with tutors, featuring offline capabilities for rural areas.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&h=400",
    author: {
      name: "Aisha Diallo",
      country: "Senegal",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    tags: ["Vue.js", "Django", "PostgreSQL"],
    likes: 76,
    comments: 12,
    bookmarks: 28
  }
];

const additionalProjects = [
  {
    id: 4,
    title: "HealthConnect Africa",
    description: "Telemedicine platform connecting rural communities with healthcare professionals.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&h=400",
    author: {
      name: "David Mensah",
      country: "Ghana",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    tags: ["React Native", "Express", "MongoDB", "WebRTC"],
    likes: 156,
    comments: 28,
    bookmarks: 67
  },
  {
    id: 5,
    title: "EcoTrack",
    description: "Environmental monitoring system for tracking pollution levels in major African cities.",
    image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=600&h=400",
    author: {
      name: "Sarah Kimani",
      country: "Kenya",
      avatar: "https://randomuser.me/api/portraits/women/29.jpg"
    },
    tags: ["IoT", "Python", "TensorFlow", "AWS"],
    likes: 92,
    comments: 15,
    bookmarks: 38
  },
  {
    id: 6,
    title: "AgriTech Solutions",
    description: "Smart farming platform using AI to optimize crop yields for small-scale farmers.",
    image: "https://images.unsplash.com/photo-1590682687861-89c0c62f3b51?auto=format&fit=crop&w=600&h=400",
    author: {
      name: "Emmanuel Tamba",
      country: "Nigeria",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    tags: ["Machine Learning", "Django", "PostgreSQL"],
    likes: 178,
    comments: 34,
    bookmarks: 89
  }
];

export function ProjectShowcase() {
  const [showMore, setShowMore] = useState(false);
  const displayedProjects = showMore ? [...projects, ...additionalProjects] : projects;

  return (
    <section className="w-full py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Discover impressive projects built by African developers across the continent.
            </p>
          </div>
          <button className="text-afro-purple hover:underline">View All Projects →</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden group transition-all hover:shadow-lg">
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <img src={project.author.avatar} alt={project.author.name} className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="text-sm font-medium">{project.author.name}</p>
                    <p className="text-xs text-muted-foreground">{project.author.country}</p>
                  </div>
                </div>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription className="line-clamp-2 mt-1">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="bg-gray-100">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-gray-500 hover:text-afro-red">
                    <Heart className="h-4 w-4" />
                    <span className="text-xs">{project.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-500 hover:text-afro-purple">
                    <MessageSquare className="h-4 w-4" />
                    <span className="text-xs">{project.comments}</span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-gray-500 hover:text-afro-gold">
                    <Bookmark className="h-4 w-4" />
                  </button>
                  <button className="text-gray-500 hover:text-afro-green">
                    <Share className="h-4 w-4" />
                  </button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            onClick={() => setShowMore(!showMore)}
            className="px-6 py-3 bg-afro-purple text-white rounded-md hover:bg-afro-purple/90 transition-colors"
          >
            {showMore ? "Show Less" : "Show More Projects"}
          </Button>
        </div>
      </div>
    </section>
  );
}
