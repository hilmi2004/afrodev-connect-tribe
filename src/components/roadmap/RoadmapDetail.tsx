
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, 
  BookOpen, 
  Check, 
  Clock, 
  Download, 
  Heart, 
  Link as LinkIcon, 
  Share2, 
  Users 
} from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Define the interface for the roadmap prop
interface RoadmapType {
  id: string;
  title: string;
  description: string;
  author?: string;
  authorImage?: string;
  likes?: number;
  downloads?: number;
  image?: string;
  tags?: string[];
  steps: Array<{
    id: number | string;
    title: string;
    description: string;
    tags?: string[];
    links: Array<{ title: string; url: string }>;
    children?: Array<{
      id: string | number;
      title: string;
      description: string;
      tags?: string[];
      links: Array<{ title: string; url: string }>;
      children?: any[];
    }>;
  }>;
  difficulty?: string;
  timeToComplete?: string;
  communityRating?: number;
  communitySize?: number;
}

interface RoadmapDetailProps {
  roadmap: RoadmapType;
}

export const RoadmapDetail = ({ roadmap }: RoadmapDetailProps) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<string | number>>(new Set());

  const handleLike = () => {
    setLiked(!liked);
    toast.success(liked ? "Removed from liked roadmaps" : "Added to your liked roadmaps");
  };

  const handleDownload = () => {
    if (roadmap) {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(roadmap));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", roadmap.title.replace(/\s+/g, '-').toLowerCase() + "-roadmap.json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      toast.success("Roadmap downloaded successfully");
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const toggleStepCompletion = (stepId: string | number) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId);
      toast.info("Step marked as incomplete");
    } else {
      newCompleted.add(stepId);
      toast.success("Step marked as complete!");
    }
    setCompletedSteps(newCompleted);
  };

  // Calculate progress
  const totalSteps = roadmap.steps.reduce((acc, step) => {
    let count = 1; // Count the main step
    if (step.children) {
      count += step.children.length; // Add child steps
    }
    return acc + count;
  }, 0);
  
  const completedCount = completedSteps.size;
  const progressPercentage = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto">
      <Button 
        onClick={() => navigate("/roadmap")} 
        variant="ghost" 
        className="mb-6 -ml-2 text-gray-600 hover:text-afro-purple transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Roadmaps
      </Button>
      
      {/* Hero section with roadmap details */}
      <div className="relative rounded-xl overflow-hidden h-72 mb-8 shadow-xl">
        <img 
          src={roadmap.image || "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"} 
          alt={roadmap.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col justify-end p-8">
          <div className="flex gap-2 mb-4 flex-wrap">
            {roadmap.tags?.map((tag, i) => (
              <Badge key={i} className="bg-afro-purple text-white border-none">
                {tag}
              </Badge>
            ))}
            
            <Badge 
              variant="outline" 
              className={`
                ${roadmap.difficulty === 'Beginner' ? 'border-green-500 text-green-50 bg-green-900/50' : 
                  roadmap.difficulty === 'Intermediate' ? 'border-amber-500 text-amber-50 bg-amber-900/50' :
                  'border-red-500 text-red-50 bg-red-900/50'}
              `}
            >
              {roadmap.difficulty || "Intermediate"}
            </Badge>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {roadmap.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-afro-purple overflow-hidden flex-shrink-0">
                <img 
                  src={roadmap.authorImage || "https://api.dicebear.com/6.x/avataaars/svg?seed=Felix"} 
                  alt={roadmap.author || "Author"} 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-white/90">
                By {roadmap.author || "Anonymous"}
              </span>
            </div>
            
            <div className="flex items-center gap-1 text-white/80">
              <Clock size={16} />
              <span>{roadmap.timeToComplete || "8 weeks"}</span>
            </div>
            
            <div className="flex items-center gap-1 text-white/80">
              <Users size={16} />
              <span>{roadmap.communitySize || "0"} learning</span>
            </div>
            
            <div className="flex items-center gap-1 text-white/80">
              <BookOpen size={16} />
              <span>{roadmap.steps.length} steps</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress and Action Bar */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-8 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="relative h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="absolute inset-0" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" stroke="#e6e6e6" strokeWidth="2"></circle>
                <circle 
                  cx="18" 
                  cy="18" 
                  r="16" 
                  fill="none" 
                  stroke="url(#gradient)" 
                  strokeWidth="2" 
                  strokeDasharray={`${progressPercentage} 100`}
                  strokeDashoffset="25"
                  strokeLinecap="round"
                ></circle>
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#9b87f5" />
                    <stop offset="100%" stopColor="#7E69AB" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-sm font-bold text-afro-purple">{progressPercentage}%</span>
            </div>
            <span className="text-xs text-gray-500 block mt-1">Progress</span>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900">
              {completedCount} of {totalSteps} steps completed
            </h3>
            <div className="h-2 w-64 bg-gray-100 rounded-full mt-1 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-afro-purple to-afro-gold rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant={liked ? "default" : "outline"}
            className={`gap-1 ${liked ? 'bg-afro-red hover:bg-afro-red/90' : 'border-afro-red/30 text-afro-red hover:bg-afro-red/10'}`}
            onClick={handleLike}
          >
            <Heart size={18} className={liked ? "fill-white" : "fill-afro-red/20"} />
            <span>{liked ? (roadmap.likes || 0) + 1 : roadmap.likes || 0}</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="border-afro-purple/30 text-afro-purple hover:bg-afro-purple/10"
            onClick={handleDownload}
          >
            <Download size={18} className="mr-1" />
            Download
          </Button>
          
          <Button 
            variant="outline" 
            className="border-afro-purple/30 text-afro-purple hover:bg-afro-purple/10"
            onClick={handleShare}
          >
            <Share2 size={18} className="mr-1" />
            Share
          </Button>
        </div>
      </div>
      
      {/* Description */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Description</h2>
        <p className="text-gray-700">
          {roadmap.description}
        </p>
      </div>
      
      {/* Steps Timeline */}
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-6 text-gray-900">Roadmap Steps</h2>
        
        <div className="space-y-8 relative before:absolute before:top-0 before:bottom-0 before:left-8 before:w-1 before:bg-gradient-to-b before:from-afro-purple before:to-afro-gold before:-z-10 before:rounded-full">
          {roadmap.steps.map((step, index) => (
            <RoadmapStepCard 
              key={step.id} 
              step={step} 
              index={index + 1}
              isCompleted={completedSteps.has(step.id)}
              onToggleComplete={() => toggleStepCompletion(step.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface RoadmapStepCardProps {
  step: {
    id: number | string;
    title: string;
    description: string;
    tags?: string[];
    links: Array<{ title: string; url: string }>;
    children?: Array<{
      id: string | number;
      title: string;
      description: string;
      tags?: string[];
      links: Array<{ title: string; url: string }>;
    }>;
  };
  index: number;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

const RoadmapStepCard = ({ step, index, isCompleted, onToggleComplete }: RoadmapStepCardProps) => {
  const [expandResources, setExpandResources] = useState(true);
  const [expandSubSteps, setExpandSubSteps] = useState(true);

  return (
    <Card 
      className={`relative border-0 shadow-lg transition-all ${
        isCompleted ? 'bg-gradient-to-r from-afro-green/5 to-transparent' : 'hover:shadow-afro-purple/5'
      }`}
    >
      <div 
        className={`absolute -left-0.5 top-6 h-16 w-16 rounded-full flex items-center justify-center border-4 border-white shadow-lg cursor-pointer ${
          isCompleted 
            ? 'bg-gradient-to-br from-afro-green to-afro-blue text-white' 
            : 'bg-gradient-to-br from-afro-purple to-afro-gold text-white'
        }`}
        onClick={onToggleComplete}
      >
        {isCompleted ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Check size={24} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Mark as incomplete</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="font-bold text-xl">{index}</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Mark as complete</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      
      <CardContent className="p-6 pl-24">
        <h3 className={`text-xl font-bold ${
          isCompleted ? 'text-afro-green' : 'text-gray-900'
        }`}>
          {step.title}
          {isCompleted && (
            <Badge className="ml-2 bg-afro-green text-white">Completed</Badge>
          )}
        </h3>
        
        <p className="mt-3 text-gray-700">
          {step.description}
        </p>
        
        {step.tags && step.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {step.tags.map((tag, i) => (
              <Badge key={i} variant="outline" className="bg-gray-50">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        {step.links && step.links.length > 0 && (
          <div className="mt-6">
            <button 
              className="flex items-center text-sm font-medium text-afro-purple mb-2"
              onClick={() => setExpandResources(!expandResources)}
            >
              <BookOpen size={16} className="mr-2" />
              Resources
              {expandResources ? " (click to hide)" : " (click to show)"}
            </button>
            
            {expandResources && (
              <div className="bg-afro-purple/5 p-4 rounded-lg">
                <ul className="space-y-2">
                  {step.links.map((link, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm hover:bg-afro-purple/10 p-2 rounded-md transition-colors">
                      <LinkIcon size={16} className="text-afro-purple flex-shrink-0" />
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-afro-purple hover:underline flex-grow"
                      >
                        {link.title}
                      </a>
                      <Badge variant="outline" className="bg-white text-xs">Visit</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        
        {step.children && step.children.length > 0 && (
          <div className="mt-6">
            <button 
              className="flex items-center text-sm font-medium text-afro-purple mb-3"
              onClick={() => setExpandSubSteps(!expandSubSteps)}
            >
              <BookOpen size={16} className="mr-2" />
              Sub-steps 
              {expandSubSteps ? " (click to hide)" : " (click to show)"}
            </button>
            
            {expandSubSteps && (
              <div className="pl-4 border-l-2 border-dashed border-afro-purple/20 space-y-4">
                {step.children.map((childStep, childIndex) => (
                  <div key={childStep.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-afro-purple/80 text-white flex items-center justify-center text-xs font-medium">
                        {index}.{childIndex + 1}
                      </div>
                      <h4 className="font-semibold text-gray-800">{childStep.title}</h4>
                    </div>
                    
                    <p className="mt-2 text-sm text-gray-600 pl-8">{childStep.description}</p>
                    
                    {childStep.links && childStep.links.length > 0 && (
                      <div className="mt-3 pl-8">
                        <h5 className="text-xs font-medium text-gray-500 mb-1">Resources:</h5>
                        <ul className="space-y-1">
                          {childStep.links.map((link, i) => (
                            <li key={i} className="flex items-center gap-1 text-xs">
                              <LinkIcon size={12} className="text-afro-purple" />
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-afro-purple hover:underline"
                              >
                                {link.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
