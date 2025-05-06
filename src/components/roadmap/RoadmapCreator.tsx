
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { RoadmapNode } from "./RoadmapNode";
import { Download, Link, Plus } from "lucide-react";
import { toast } from "sonner";

// Define types for our roadmap
interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  links: { url: string; title: string }[];
  children: RoadmapStep[];
}

export const RoadmapCreator = () => {
  const [roadmapTitle, setRoadmapTitle] = useState("");
  const [roadmapDescription, setRoadmapDescription] = useState("");
  const [steps, setSteps] = useState<RoadmapStep[]>([
    {
      id: "1",
      title: "",
      description: "",
      links: [],
      children: [],
    },
  ]);

  const handleAddStep = (parentId: string | null = null) => {
    if (!parentId) {
      // Add top-level step
      setSteps([
        ...steps,
        {
          id: Date.now().toString(),
          title: "",
          description: "",
          links: [],
          children: [],
        },
      ]);
      return;
    }

    // Add nested step
    const addChildToStep = (step: RoadmapStep): RoadmapStep => {
      if (step.id === parentId) {
        return {
          ...step,
          children: [
            ...step.children,
            {
              id: Date.now().toString(),
              title: "",
              description: "",
              links: [],
              children: [],
            },
          ],
        };
      }

      return {
        ...step,
        children: step.children.map(addChildToStep),
      };
    };

    setSteps(steps.map(addChildToStep));
  };

  const updateStep = (stepId: string, data: Partial<RoadmapStep>) => {
    const updateStepRecursively = (step: RoadmapStep): RoadmapStep => {
      if (step.id === stepId) {
        return { ...step, ...data };
      }
      
      return {
        ...step,
        children: step.children.map(updateStepRecursively),
      };
    };

    setSteps(steps.map(updateStepRecursively));
  };

  const handleSaveRoadmap = () => {
    if (!roadmapTitle) {
      toast.error("Please add a title for your roadmap");
      return;
    }

    // In a real app, this would save to a database
    // For now, we'll just show a success message
    toast.success("Roadmap saved successfully!");
    
    // Create a data URL for downloading
    const roadmapData = {
      title: roadmapTitle,
      description: roadmapDescription,
      steps,
      createdAt: new Date().toISOString(),
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(roadmapData));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", roadmapTitle.replace(/\s+/g, '-').toLowerCase() + "-roadmap.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="bg-gradient-to-br from-afro-purple/10 to-transparent p-6 rounded-xl mb-8">
        <h2 className="text-2xl font-bold mb-4">Create Your Roadmap</h2>
        <div className="space-y-4 mb-8">
          <div>
            <label htmlFor="roadmap-title" className="block text-sm font-medium mb-1">
              Roadmap Title
            </label>
            <Input
              id="roadmap-title"
              value={roadmapTitle}
              onChange={(e) => setRoadmapTitle(e.target.value)}
              placeholder="e.g., Frontend Development Mastery"
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="roadmap-description" className="block text-sm font-medium mb-1">
              Roadmap Description
            </label>
            <Textarea
              id="roadmap-description"
              value={roadmapDescription}
              onChange={(e) => setRoadmapDescription(e.target.value)}
              placeholder="Describe what this roadmap is about..."
              className="w-full"
              rows={3}
            />
          </div>
        </div>
      </div>

      <div className="relative">
        <h3 className="text-xl font-semibold mb-4">Roadmap Steps</h3>
        <div className="space-y-6 mb-8">
          {steps.map((step, index) => (
            <Card key={step.id} className="border-afro-purple/20 shadow-lg hover:shadow-afro-purple/10 transition-all">
              <CardContent className="p-5">
                <RoadmapNode
                  step={step}
                  index={index + 1}
                  updateStep={(data) => updateStep(step.id, data)}
                  onAddChild={() => handleAddStep(step.id)}
                />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-between my-8">
          <Button
            variant="outline"
            onClick={() => handleAddStep()}
            className="flex items-center gap-2 border-afro-purple text-afro-purple hover:bg-afro-purple/10"
          >
            <Plus size={18} />
            Add Main Step
          </Button>
          
          <Button onClick={handleSaveRoadmap} className="flex items-center gap-2 bg-afro-purple hover:bg-afro-purple/90">
            <Download size={18} />
            Save & Download Roadmap
          </Button>
        </div>
      </div>
    </div>
  );
};
