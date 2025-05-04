
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  UserRound, Github, ExternalLink, Calendar, Heart, Share2, MessageSquare,
  Users, BookOpen, Code, Tags, Folder, Activity, ArrowLeft
} from "lucide-react";
import { CommentSection } from "@/components/comments/CommentSection";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

interface ProjectDetailProps {
  project: {
    _id: string;
    title: string;
    description: string;
    creator: {
      _id: string;
      fullName: string;
      profileImage?: string;
      profession?: string;
    };
    image?: string;
    repoUrl?: string;
    demoUrl?: string;
    techStack: string[];
    contributors: any[];
    category: string;
    status: 'idea' | 'in-progress' | 'completed' | 'seeking-help';
    lookingForContributors: boolean;
    likes: number;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
  };
  comments: any[];
  onAddComment: (content: string, parentId?: string) => Promise<void>;
  onEditComment: (commentId: string, content: string) => Promise<void>;
  onDeleteComment: (commentId: string) => Promise<void>;
  onLikeComment: (commentId: string, isLiked: boolean) => Promise<void>;
  onLikeProject: () => Promise<void>;
}

export function ProjectDetail({
  project,
  comments,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onLikeComment,
  onLikeProject
}: ProjectDetailProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'idea':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'seeking-help':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleBackToProfile = () => {
    navigate(`/profile/${project.creator._id}`);
  };

  return (
    <div className="container max-w-5xl py-8">
      <Button 
        variant="outline" 
        onClick={handleBackToProfile} 
        className="mb-6 flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Creator's Profile</span>
      </Button>
      
      <div className="grid grid-cols-1 gap-8">
        {/* Project Header */}
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{project.title}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <Badge className={getStatusBadgeColor(project.status)}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                </Badge>
                
                <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                  {project.category}
                </Badge>
                
                {project.lookingForContributors && (
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                    Looking for Contributors
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <Button 
                variant="outline"
                onClick={onLikeProject}
                className="flex items-center gap-2"
              >
                <Heart className="h-4 w-4" />
                <span>{project.likes}</span>
              </Button>
              
              <Button 
                variant="outline"
                className="flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
          </div>
          
          <div className="w-full h-80 rounded-xl overflow-hidden bg-gray-200 mb-6">
            {project.image ? (
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-100">
                <Code className="h-16 w-16 text-gray-400" />
              </div>
            )}
          </div>
        </div>
        
        {/* Creator Info */}
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-afro-purple/20 to-afro-blue/20 p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-white">
                <AvatarImage src={project.creator.profileImage} alt={project.creator.fullName} />
                <AvatarFallback>
                  <UserRound className="h-8 w-8 text-gray-400" />
                </AvatarFallback>
              </Avatar>
              
              <div>
                <h2 className="text-xl font-semibold">{project.creator.fullName}</h2>
                <p className="text-gray-600">{project.creator.profession || "Developer"}</p>
              </div>
              
              <div className="ml-auto">
                <Button 
                  onClick={handleBackToProfile}
                  variant="outline"
                  className="bg-white hover:bg-gray-100"
                >
                  View Profile
                </Button>
              </div>
            </div>
          </div>
          
          <CardContent className="p-6">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Created {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.repoUrl && (
                <Button variant="outline" className="flex items-center gap-2" asChild>
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    <span>View Repository</span>
                  </a>
                </Button>
              )}
              
              {project.demoUrl && (
                <Button variant="outline" className="flex items-center gap-2" asChild>
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    <span>Live Demo</span>
                  </a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Tab Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="discussion">
              Discussion
              <Badge className="ml-2">{comments.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="contributors">Contributors</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-afro-purple" />
                      <span>About this project</span>
                    </h3>
                    <p className="text-gray-700">{project.description}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Code className="h-5 w-5 text-afro-purple" />
                      <span>Tech Stack</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, index) => (
                        <Badge key={index} variant="outline" className="bg-gray-100">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Tags className="h-5 w-5 text-afro-purple" />
                      <span>Tags</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="discussion">
            <Card>
              <CardContent className="p-6">
                <CommentSection 
                  entityId={project._id}
                  entityType="project"
                  comments={comments}
                  onAddComment={onAddComment}
                  onEditComment={onEditComment}
                  onDeleteComment={onDeleteComment}
                  onLikeComment={onLikeComment}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contributors">
            <Card>
              <CardContent className="p-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5 text-afro-purple" />
                    <span>Contributors ({project.contributors.length})</span>
                  </h3>
                  
                  {project.contributors.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No contributors yet</p>
                      {project.lookingForContributors && (
                        <Button className="mt-4 bg-afro-purple hover:bg-afro-purple/90">
                          Join this project
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.contributors.map((contributor: any) => (
                        <div key={contributor._id} className="flex items-center gap-3 p-3 border rounded-md">
                          <Avatar>
                            <AvatarImage src={contributor.profileImage} alt={contributor.fullName} />
                            <AvatarFallback>
                              <UserRound className="h-5 w-5 text-gray-400" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{contributor.fullName}</p>
                            <p className="text-sm text-gray-500">{contributor.role || "Contributor"}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
