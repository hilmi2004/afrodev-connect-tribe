
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen,
  Clock,
  Download, 
  FileText, 
  Link as LinkIcon, 
  Plus, 
  Save,
  Settings,
  Sparkles,
  X 
} from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define types for our roadmap
interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  links: { url: string; title: string }[];
  children: RoadmapStep[];
}

export const RoadmapCreator = () => {
  const [activeTab, setActiveTab] = useState("info");
  const [roadmapTitle, setRoadmapTitle] = useState("");
  const [roadmapDescription, setRoadmapDescription] = useState("");
  const [roadmapCategory, setRoadmapCategory] = useState("frontend");
  const [roadmapDifficulty, setRoadmapDifficulty] = useState("beginner");
  const [roadmapTimeToComplete, setRoadmapTimeToComplete] = useState("2 weeks");
  const [roadmapTags, setRoadmapTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
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

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag && !roadmapTags.includes(newTag)) {
      setRoadmapTags([...roadmapTags, newTag]);
      setNewTag("");
      e.preventDefault();
    }
  };

  const handleRemoveTag = (tag: string) => {
    setRoadmapTags(roadmapTags.filter(t => t !== tag));
  };

  const handleSaveRoadmap = () => {
    if (!roadmapTitle) {
      toast.error("Please add a title for your roadmap");
      return;
    }

    toast.success("Roadmap saved successfully!");
    
    const roadmapData = {
      title: roadmapTitle,
      description: roadmapDescription,
      category: roadmapCategory,
      difficulty: roadmapDifficulty,
      timeToComplete: roadmapTimeToComplete,
      tags: roadmapTags,
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

  const removeStep = (stepId: string) => {
    // For top-level steps
    setSteps(steps.filter(step => step.id !== stepId));
    
    // For nested steps
    const removeNestedStep = (parentStep: RoadmapStep): RoadmapStep => {
      return {
        ...parentStep,
        children: parentStep.children
          .filter(child => child.id !== stepId)
          .map(removeNestedStep)
      };
    };
    
    setSteps(steps.map(removeNestedStep));
  };

  const hasCompletedBasicInfo = () => {
    return roadmapTitle.trim() !== "" && roadmapDescription.trim() !== "";
  };

  const hasCompletedSteps = () => {
    return steps.length > 0 && steps.every(step => step.title.trim() !== "");
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-gray-50 p-4 md:p-6 border-b md:border-b-0 md:border-r border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Create Roadmap</h2>
          
          <Tabs defaultValue="info" value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="w-full">
            <TabsList className="flex flex-row md:flex-col h-auto bg-transparent p-0 mb-6 gap-1">
              <TabsTrigger 
                value="info" 
                className="flex items-center justify-start w-full py-3 px-4 data-[state=active]:bg-afro-purple/10 data-[state=active]:text-afro-purple rounded-md text-gray-600"
              >
                <FileText size={18} className="mr-2" />
                Basic Info
                {hasCompletedBasicInfo() && (
                  <Badge variant="outline" className="ml-auto border-green-500 bg-green-50 text-green-600">
                    <span className="sr-only">Completed</span>
                    ✓
                  </Badge>
                )}
              </TabsTrigger>
              
              <TabsTrigger 
                value="steps" 
                className="flex items-center justify-start w-full py-3 px-4 data-[state=active]:bg-afro-purple/10 data-[state=active]:text-afro-purple rounded-md text-gray-600"
              >
                <BookOpen size={18} className="mr-2" />
                Roadmap Steps
                {hasCompletedSteps() && (
                  <Badge variant="outline" className="ml-auto border-green-500 bg-green-50 text-green-600">
                    <span className="sr-only">Completed</span>
                    ✓
                  </Badge>
                )}
              </TabsTrigger>
              
              <TabsTrigger 
                value="settings" 
                className="flex items-center justify-start w-full py-3 px-4 data-[state=active]:bg-afro-purple/10 data-[state=active]:text-afro-purple rounded-md text-gray-600"
              >
                <Settings size={18} className="mr-2" />
                Settings
              </TabsTrigger>
              
              <TabsTrigger 
                value="preview" 
                className="flex items-center justify-start w-full py-3 px-4 data-[state=active]:bg-afro-purple/10 data-[state=active]:text-afro-purple rounded-md text-gray-600"
              >
                <Sparkles size={18} className="mr-2" />
                Preview
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="mt-auto pt-6 border-t border-gray-200">
            <Button 
              onClick={handleSaveRoadmap} 
              className="w-full bg-afro-purple hover:bg-afro-purple/90 flex justify-center gap-2"
            >
              <Save size={18} />
              Save Roadmap
            </Button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-6">
          <Tabs value={activeTab} className="w-full">
            {/* Basic Information */}
            <TabsContent value="info" className="mt-0 animate-in fade-in-50">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Roadmap Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="roadmap-title" className="block text-sm font-medium mb-1 text-gray-700">
                        Roadmap Title <span className="text-red-500">*</span>
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
                      <label htmlFor="roadmap-description" className="block text-sm font-medium mb-1 text-gray-700">
                        Roadmap Description <span className="text-red-500">*</span>
                      </label>
                      <Textarea
                        id="roadmap-description"
                        value={roadmapDescription}
                        onChange={(e) => setRoadmapDescription(e.target.value)}
                        placeholder="Describe what this roadmap is about..."
                        className="w-full min-h-[120px]"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                          Category
                        </label>
                        <Select value={roadmapCategory} onValueChange={setRoadmapCategory}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="frontend">Frontend Development</SelectItem>
                            <SelectItem value="backend">Backend Development</SelectItem>
                            <SelectItem value="fullstack">Full Stack Development</SelectItem>
                            <SelectItem value="mobile">Mobile Development</SelectItem>
                            <SelectItem value="devops">DevOps</SelectItem>
                            <SelectItem value="data-science">Data Science</SelectItem>
                            <SelectItem value="machine-learning">Machine Learning</SelectItem>
                            <SelectItem value="blockchain">Blockchain</SelectItem>
                            <SelectItem value="design">UI/UX Design</SelectItem>
                            <SelectItem value="career">Career Development</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                          Difficulty Level
                        </label>
                        <Select value={roadmapDifficulty} onValueChange={setRoadmapDifficulty}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">
                              Beginner
                            </SelectItem>
                            <SelectItem value="intermediate">
                              Intermediate
                            </SelectItem>
                            <SelectItem value="advanced">
                              Advanced
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Estimated Time to Complete
                      </label>
                      <Select value={roadmapTimeToComplete} onValueChange={setRoadmapTimeToComplete}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select time estimate" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1 week">1 Week</SelectItem>
                          <SelectItem value="2 weeks">2 Weeks</SelectItem>
                          <SelectItem value="1 month">1 Month</SelectItem>
                          <SelectItem value="3 months">3 Months</SelectItem>
                          <SelectItem value="6 months">6 Months</SelectItem>
                          <SelectItem value="1 year">1 Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Tags
                      </label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {roadmapTags.map(tag => (
                          <Badge key={tag} variant="outline" className="px-3 py-1 gap-1 text-afro-purple border-afro-purple/30 bg-afro-purple/5">
                            {tag}
                            <button 
                              onClick={() => handleRemoveTag(tag)} 
                              className="ml-1 text-afro-purple/70 hover:text-afro-purple"
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={handleAddTag}
                        placeholder="Add tags and press Enter (e.g., JavaScript, React)"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={() => setActiveTab("steps")} 
                    className="bg-afro-purple hover:bg-afro-purple/90"
                    disabled={!hasCompletedBasicInfo()}
                  >
                    Next: Add Steps
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Roadmap Steps */}
            <TabsContent value="steps" className="mt-0 animate-in fade-in-50">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Roadmap Steps</h3>
                  <Button
                    variant="outline"
                    onClick={() => handleAddStep()}
                    className="flex items-center gap-2 border-afro-purple text-afro-purple hover:bg-afro-purple/10"
                  >
                    <Plus size={18} />
                    Add Step
                  </Button>
                </div>
                
                {steps.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">No steps yet</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      A roadmap needs at least one step. Add your first step to get started.
                    </p>
                    <Button
                      onClick={() => handleAddStep()}
                      className="bg-afro-purple hover:bg-afro-purple/90"
                    >
                      <Plus size={18} className="mr-2" />
                      Add First Step
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {steps.map((step, index) => (
                      <RoadmapStepEditor
                        key={step.id}
                        step={step}
                        index={index + 1}
                        updateStep={(data) => updateStep(step.id, data)}
                        onAddChild={() => handleAddStep(step.id)}
                        onRemove={() => removeStep(step.id)}
                      />
                    ))}
                  </div>
                )}
                
                <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab("info")}
                  >
                    Previous: Basic Info
                  </Button>
                  <Button 
                    onClick={() => setActiveTab("settings")} 
                    className="bg-afro-purple hover:bg-afro-purple/90"
                    disabled={!hasCompletedSteps()}
                  >
                    Next: Settings
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Settings */}
            <TabsContent value="settings" className="mt-0 animate-in fade-in-50">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Roadmap Settings</h3>
                
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-base">Visibility Settings</CardTitle>
                    <CardDescription>Control who can see and access your roadmap</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="public"
                          name="visibility"
                          checked={true}
                          className="text-afro-purple focus:ring-afro-purple"
                        />
                        <label htmlFor="public" className="text-sm font-medium">
                          Public (anyone can view)
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="private"
                          name="visibility"
                          className="text-afro-purple focus:ring-afro-purple"
                        />
                        <label htmlFor="private" className="text-sm font-medium">
                          Private (only you can view)
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="tribe"
                          name="visibility"
                          className="text-afro-purple focus:ring-afro-purple"
                        />
                        <label htmlFor="tribe" className="text-sm font-medium">
                          Tribe Only (only members of your tribe can view)
                        </label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Progress Tracking</CardTitle>
                    <CardDescription>Configure how users track their progress with this roadmap</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="track-progress"
                          checked={true}
                          className="rounded text-afro-purple focus:ring-afro-purple"
                        />
                        <label htmlFor="track-progress" className="text-sm font-medium">
                          Enable progress tracking for users
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="show-badges"
                          checked={true}
                          className="rounded text-afro-purple focus:ring-afro-purple"
                        />
                        <label htmlFor="show-badges" className="text-sm font-medium">
                          Award badges on completion
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="public-progress"
                          className="rounded text-afro-purple focus:ring-afro-purple"
                        />
                        <label htmlFor="public-progress" className="text-sm font-medium">
                          Make user progress public
                        </label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab("steps")}
                  >
                    Previous: Steps
                  </Button>
                  <Button 
                    onClick={() => setActiveTab("preview")} 
                    className="bg-afro-purple hover:bg-afro-purple/90"
                  >
                    Next: Preview
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Preview */}
            <TabsContent value="preview" className="mt-0 animate-in fade-in-50">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Preview Your Roadmap</h3>
                
                <Card className="mb-6 overflow-hidden border-none shadow-lg">
                  <div className="h-48 bg-gradient-to-r from-afro-purple to-afro-gold relative overflow-hidden">
                    <div className="absolute inset-0 flex flex-col justify-end p-6 bg-black/30">
                      <div className="flex gap-2 mb-3 flex-wrap">
                        {roadmapTags.slice(0, 4).map((tag, i) => (
                          <Badge key={i} className="bg-afro-purple text-white border-none">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h2 className="text-2xl font-bold text-white">{roadmapTitle || "Your Roadmap Title"}</h2>
                      <div className="flex items-center gap-6 mt-2">
                        <div className="flex items-center gap-1 text-white/90">
                          <Clock size={14} />
                          <span className="text-xs">{roadmapTimeToComplete}</span>
                        </div>
                        <div className="flex items-center gap-1 text-white/90">
                          <BookOpen size={14} />
                          <span className="text-xs">{steps.length} step{steps.length !== 1 ? 's' : ''}</span>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`
                            ${roadmapDifficulty === 'beginner' ? 'border-green-500 text-green-50 bg-green-900/50' : 
                              roadmapDifficulty === 'intermediate' ? 'border-amber-500 text-amber-50 bg-amber-900/50' :
                              'border-red-500 text-red-50 bg-red-900/50'}
                          `}
                        >
                          {roadmapDifficulty === 'beginner' ? 'Beginner' : 
                           roadmapDifficulty === 'intermediate' ? 'Intermediate' : 'Advanced'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <p className="text-gray-700 mb-6">
                      {roadmapDescription || "Your roadmap description will appear here."}
                    </p>
                    
                    <h3 className="font-semibold text-gray-900 mb-4">Roadmap Steps:</h3>
                    
                    <div className="space-y-4">
                      {steps.length > 0 ? (
                        steps.map((step, index) => (
                          <div key={step.id} className="border-l-2 border-afro-purple/30 pl-4 py-2">
                            <h4 className="font-medium text-gray-900">
                              {index + 1}. {step.title || `Step ${index + 1}`}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                            
                            {step.links.length > 0 && (
                              <div className="mt-2">
                                <h5 className="text-xs font-medium text-gray-500">Resources:</h5>
                                <ul className="space-y-1 mt-1">
                                  {step.links.map((link, i) => (
                                    <li key={i} className="flex items-center gap-2 text-xs">
                                      <LinkIcon size={12} className="text-afro-purple" />
                                      <span className="text-afro-purple">{link.title}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {step.children.length > 0 && (
                              <div className="space-y-2 mt-2 ml-4">
                                {step.children.map((childStep, childIdx) => (
                                  <div key={childStep.id} className="border-l-2 border-afro-purple/20 pl-4 py-1">
                                    <h5 className="text-sm font-medium text-gray-800">
                                      {index + 1}.{childIdx + 1}. {childStep.title}
                                    </h5>
                                    <p className="text-xs text-gray-600 mt-1">{childStep.description}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm">Add steps to your roadmap to see them previewed here.</p>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="bg-gray-50 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                          <img 
                            src="https://api.dicebear.com/6.x/avataaars/svg?seed=DefaultUser" 
                            alt="Author" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm text-gray-600">Created by You</span>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-afro-purple border-afro-purple/30 hover:bg-afro-purple/5"
                      >
                        <Download size={16} className="mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
                
                <div className="flex justify-between pt-4 border-t border-gray-200">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab("settings")}
                  >
                    Previous: Settings
                  </Button>
                  <Button 
                    onClick={handleSaveRoadmap} 
                    className="bg-afro-purple hover:bg-afro-purple/90"
                  >
                    <Save size={18} className="mr-2" />
                    Save & Download
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

interface RoadmapStepEditorProps {
  step: RoadmapStep;
  index: number;
  updateStep: (data: Partial<RoadmapStep>) => void;
  onAddChild: () => void;
  onRemove: () => void;
}

const RoadmapStepEditor = ({
  step,
  index,
  updateStep,
  onAddChild,
  onRemove
}: RoadmapStepEditorProps) => {
  const [showLinkForm, setShowLinkForm] = useState(false);
  const [linkTitle, setLinkTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const handleAddLink = () => {
    if (linkTitle && linkUrl) {
      updateStep({
        links: [
          ...step.links,
          {
            title: linkTitle,
            url: linkUrl.startsWith("http") ? linkUrl : `https://${linkUrl}`
          }
        ]
      });
      setLinkTitle("");
      setLinkUrl("");
      setShowLinkForm(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base flex items-center gap-2">
            <div className="bg-afro-purple text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
              {index}
            </div>
            <Input
              value={step.title}
              onChange={(e) => updateStep({ title: e.target.value })}
              placeholder="Step Title"
              className="border-none shadow-none p-0 text-base font-semibold focus-visible:ring-0"
            />
          </CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-gray-400 hover:text-red-500"
            onClick={onRemove}
          >
            <X size={16} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <Textarea
          value={step.description}
          onChange={(e) => updateStep({ description: e.target.value })}
          placeholder="Describe this step..."
          className="min-h-[80px] resize-none"
        />
        
        {step.links.length > 0 && (
          <div className="rounded-md bg-gray-50 p-3">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Resources:</h4>
            {step.links.map((link, i) => (
              <div key={i} className="flex items-center justify-between text-sm py-1">
                <div className="flex items-center gap-2">
                  <LinkIcon size={14} className="text-afro-purple" />
                  <span>{link.title}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 text-xs mr-2 truncate max-w-[200px]">
                    {link.url}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                    onClick={() => {
                      updateStep({
                        links: step.links.filter((_, index) => index !== i)
                      });
                    }}
                  >
                    <X size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {showLinkForm ? (
          <div className="grid grid-cols-12 gap-2">
            <Input
              className="col-span-4"
              placeholder="Resource title"
              value={linkTitle}
              onChange={(e) => setLinkTitle(e.target.value)}
            />
            <Input
              className="col-span-6"
              placeholder="URL (e.g., https://example.com)"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
            />
            <Button 
              className="col-span-2 bg-afro-purple hover:bg-afro-purple/90" 
              onClick={handleAddLink}
              disabled={!linkTitle || !linkUrl}
            >
              Add
            </Button>
          </div>
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs flex items-center gap-1 text-afro-purple border-afro-purple/30 hover:bg-afro-purple/5"
            onClick={() => setShowLinkForm(true)}
          >
            <LinkIcon size={14} />
            Add Resource Link
          </Button>
        )}
        
        {step.children.length > 0 && (
          <div className="pl-6 border-l-2 border-dashed border-afro-purple/20 mt-4 space-y-4">
            <h4 className="text-sm font-medium text-gray-600 -ml-6">Sub-steps:</h4>
            {step.children.map((childStep, childIndex) => (
              <Card key={childStep.id} className="shadow-sm border-afro-purple/10">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-afro-purple/70 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                        {index}.{childIndex + 1}
                      </div>
                      <Input
                        value={childStep.title}
                        onChange={(e) => {
                          const updatedChildren = [...step.children];
                          updatedChildren[childIndex] = {
                            ...childStep,
                            title: e.target.value
                          };
                          updateStep({ children: updatedChildren });
                        }}
                        placeholder="Sub-step title"
                        className="border-none shadow-none p-0 text-sm font-medium focus-visible:ring-0"
                      />
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 text-gray-400 hover:text-red-500"
                      onClick={() => {
                        updateStep({
                          children: step.children.filter((_, i) => i !== childIndex)
                        });
                      }}
                    >
                      <X size={14} />
                    </Button>
                  </div>
                  
                  <Textarea
                    value={childStep.description}
                    onChange={(e) => {
                      const updatedChildren = [...step.children];
                      updatedChildren[childIndex] = {
                        ...childStep,
                        description: e.target.value
                      };
                      updateStep({ children: updatedChildren });
                    }}
                    placeholder="Describe this sub-step..."
                    className="min-h-[60px] text-sm resize-none"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          variant="ghost"
          size="sm"
          className="text-xs flex items-center gap-1 text-afro-purple hover:bg-afro-purple/5"
          onClick={onAddChild}
        >
          <Plus size={14} />
          Add Sub-step
        </Button>
      </CardFooter>
    </Card>
  );
};
