
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link as LinkIcon, Check, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RoadmapStepProps {
  step: any;
  index: number;
  isChild?: boolean;
  isCompleted?: boolean;
}

const RoadmapStep = ({ step, index, isChild = false, isCompleted = false }: RoadmapStepProps) => {
  return (
    <div className={`relative ${isChild ? "ml-16 mt-8" : ""}`}>
      {!isChild && (
        <div className="absolute h-12 w-12 -left-6 -top-6 rounded-full bg-gradient-to-br from-afro-purple to-afro-gold opacity-20 animate-pulse" />
      )}
      
      <Card className={`border-afro-purple/20 hover:border-afro-purple/50 transition-all duration-300 hover:shadow-lg backdrop-blur-sm ${
        isCompleted ? "bg-gradient-to-r from-afro-green/10 to-afro-green/5 border-afro-green/30" : ""
      }`}>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className={`flex-shrink-0 h-10 w-10 rounded-full ${
              isCompleted 
                ? "bg-gradient-to-br from-afro-green to-afro-blue text-white"
                : "bg-gradient-to-br from-afro-purple to-afro-gold text-white"
            } flex items-center justify-center font-medium shadow-lg`}>
              {isCompleted ? <Check size={18} /> : index}
            </div>
            <h3 className={`text-xl font-bold ${
              isCompleted
                ? "bg-gradient-to-r from-afro-green to-afro-blue bg-clip-text text-transparent"
                : "bg-gradient-to-r from-afro-purple to-afro-gold bg-clip-text text-transparent"
            }`}>
              {step.title}
            </h3>
          </div>
          
          <p className="mt-3 text-gray-600 pl-14">{step.description}</p>
          
          <div className="mt-4 pl-14 flex flex-wrap gap-2">
            {step.tags && step.tags.map((tag: string, i: number) => (
              <Badge key={i} variant={isCompleted ? "outline" : "secondary"} className="bg-gradient-to-r from-afro-purple/10 to-afro-gold/10">
                {tag}
              </Badge>
            ))}
          </div>
          
          {step.links && step.links.length > 0 && (
            <div className="mt-4 space-y-2 pl-14">
              <h4 className="text-sm font-medium text-gray-500">Resources:</h4>
              <ul className="space-y-1 bg-afro-purple/5 p-3 rounded-lg">
                {step.links.map((link: any, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <LinkIcon size={14} className="text-afro-purple" />
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-afro-purple hover:underline transition-all hover:text-afro-gold"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="mt-6 pl-14">
            <Button variant="outline" size="sm" className="mr-2 border-afro-purple/40 text-afro-purple hover:bg-afro-purple/10">
              <BookOpen size={14} className="mr-1" />
              Start Learning
            </Button>
            
            {!isCompleted && (
              <Button size="sm" className="bg-gradient-to-r from-afro-purple to-afro-gold hover:opacity-90">
                <Check size={14} className="mr-1" />
                Mark Complete
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      
      {step.children && step.children.length > 0 && (
        <div className="pl-6 border-l-2 border-dashed border-afro-purple/20 ml-5 space-y-8 mt-4">
          {step.children.map((childStep: any, childIndex: number) => (
            <RoadmapStep
              key={childStep.id}
              step={childStep}
              index={index + (childIndex + 1) / 10}
              isChild={true}
              isCompleted={Math.random() > 0.5} // For demo purposes
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RoadmapStep;
