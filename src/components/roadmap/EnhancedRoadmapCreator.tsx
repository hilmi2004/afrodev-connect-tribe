import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoadmapNode } from "./RoadmapNode";
import { Download, Link, Plus, Share, EyeIcon } from "lucide-react";
import { toast } from "sonner";
import { 
  MotionDiv, 
  MotionButtonWithVariant,
  fadeIn, 
  slideInUp,
  staggerContainer 
} from "@/components/ui/motion";

// Define types for our roadmap
interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  links: { url: string; title: string }[];
  children: RoadmapStep[];
}

export const EnhancedRoadmapCreator = () => {
  const [activeTab, setActiveTab] = useState("basic");
  const [roadmapTitle, setRoadmapTitle] = useState("");
  const [roadmapDescription, setRoadmapDescription] = useState("");
  const [roadmapCategory, setRoadmapCategory] = useState("Frontend");
  const [isPublic, setIsPublic] = useState(true);
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

  const handlePreview = () => {
    if (!roadmapTitle) {
      toast.error("Please add a title for your roadmap");
      return;
    }
    
    setActiveTab("preview");
  };

  const handleAddTag = () => {
    if (newTag && !roadmapTags.includes(newTag)) {
      setRoadmapTags([...roadmapTags, newTag]);
      setNewTag("");
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
      isPublic,
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

  return (
    <MotionDiv
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="w-full max-w-5xl mx-auto px-4"
    >
      <div className="bg-gradient-to-br from-afro-purple/10 to-transparent p-6 rounded-xl mb-8 backdrop-blur-sm border border-afro-purple/10 shadow-xl">
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-afro-purple to-afro-blue bg-clip-text text-transparent">Create Your Roadmap</h2>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid grid-cols-3 mb-8 bg-white/50 backdrop-blur-sm border border-afro-purple/20 rounded-lg overflow-hidden">
            <TabsTrigger value="basic" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-afro-purple data-[state=active]:to-afro-gold data-[state=active]:text-white">
              Basic Info
            </TabsTrigger>
            <TabsTrigger value="steps" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-afro-purple data-[state=active]:to-afro-gold data-[state=active]:text-white">
              Roadmap Steps
            </TabsTrigger>
            <TabsTrigger value="preview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-afro-purple data-[state=active]:to-afro-gold data-[state=active]:text-white">
              Preview
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4 animate-in fade-in-50">
            <MotionDiv variants={fadeIn(0.1)} className="space-y-4">
              <div>
                <label htmlFor="roadmap-title" className="block text-sm font-medium mb-1 text-afro-purple">
                  Roadmap Title*
                </label>
                <Input
                  id="roadmap-title"
                  value={roadmapTitle}
                  onChange={(e) => setRoadmapTitle(e.target.value)}
                  placeholder="e.g., Frontend Development Mastery"
                  className="w-full border-afro-purple/20 focus-visible:ring-afro-purple"
                />
              </div>
              
              <div>
                <label htmlFor="roadmap-description" className="block text-sm font-medium mb-1 text-afro-purple">
                  Roadmap Description
                </label>
                <Textarea
                  id="roadmap-description"
                  value={roadmapDescription}
                  onChange={(e) => setRoadmapDescription(e.target.value)}
                  placeholder="Describe what this roadmap is about..."
                  className="w-full border-afro-purple/20 focus-visible:ring-afro-purple"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="roadmap-category" className="block text-sm font-medium mb-1 text-afro-purple">
                    Category
                  </label>
                  <select
                    id="roadmap-category"
                    value={roadmapCategory}
                    onChange={(e) => setRoadmapCategory(e.target.value)}
                    className="w-full rounded-md border border-afro-purple/20 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-afro-purple"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="FullStack">Full Stack</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Mobile">Mobile Development</option>
                    <option value="DataScience">Data Science</option>
                    <option value="MachineLearning">Machine Learning</option>
                    <option value="Blockchain">Blockchain</option>
                    <option value="Security">Security</option>
                    <option value="Career">Career Development</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1 text-afro-purple">
                    Visibility
                  </label>
                  <div className="flex gap-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="public"
                        checked={isPublic}
                        onChange={() => setIsPublic(true)}
                        className="text-afro-purple focus:ring-afro-purple"
                      />
                      <label htmlFor="public" className="ml-2 text-sm">Public</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="private"
                        checked={!isPublic}
                        onChange={() => setIsPublic(false)}
                        className="text-afro-purple focus:ring-afro-purple"
                      />
                      <label htmlFor="private" className="ml-2 text-sm">Private</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-afro-purple">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {roadmapTags.map(tag => (
                    <span key={tag} className="bg-afro-purple/10 text-afro-purple text-xs py-1 px-2 rounded-full flex items-center">
                      {tag}
                      <button onClick={() => handleRemoveTag(tag)} className="ml-1 text-afro-purple/70 hover:text-afro-purple">
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    className="flex-grow border-afro-purple/20"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                  />
                  <Button onClick={handleAddTag} variant="outline" className="border-afro-purple text-afro-purple hover:bg-afro-purple/10">
                    Add
                  </Button>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button 
                  onClick={() => setActiveTab("steps")} 
                  className="bg-afro-purple hover:bg-afro-purple/90"
                >
                  Next: Add Steps
                </Button>
              </div>
            </MotionDiv>
          </TabsContent>
          
          <TabsContent value="steps" className="animate-in fade-in-50">
            <MotionDiv variants={staggerContainer} className="space-y-6 mb-8">
              {steps.map((step, index) => (
                <MotionDiv
                  key={step.id}
                  variants={slideInUp(index * 0.1)}
                  className="border border-afro-purple/20 shadow-lg hover:shadow-afro-purple/10 rounded-xl p-5 transition-all bg-white/80 backdrop-blur-sm"
                >
                  <RoadmapNode
                    step={step}
                    index={index + 1}
                    updateStep={(data) => updateStep(step.id, data)}
                    onAddChild={() => handleAddStep(step.id)}
                  />
                </MotionDiv>
              ))}
            </MotionDiv>

            <div className="flex justify-between my-8">
              <Button
                variant="outline"
                onClick={() => handleAddStep()}
                className="flex items-center gap-2 border-afro-purple text-afro-purple hover:bg-afro-purple/10"
              >
                <Plus size={18} />
                Add Main Step
              </Button>
              
              <div className="flex gap-3">
                <Button 
                  onClick={() => setActiveTab("basic")} 
                  variant="outline"
                  className="border-afro-purple/30 text-afro-purple/70 hover:bg-afro-purple/5"
                >
                  Back
                </Button>
                <Button 
                  onClick={handlePreview}
                  className="bg-afro-purple hover:bg-afro-purple/90 flex items-center gap-2"
                >
                  <EyeIcon size={18} />
                  Preview Roadmap
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="animate-in fade-in-50">
            <MotionDiv variants={fadeIn()} className="rounded-xl overflow-hidden border border-afro-purple/20 bg-white/80 backdrop-blur-sm shadow-xl">
              <div className="p-8 border-b border-afro-purple/10">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-afro-purple to-afro-blue bg-clip-text text-transparent mb-3">
                  {roadmapTitle || "Untitled Roadmap"}
                </h2>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-afro-purple/20 text-afro-purple text-xs py-1 px-3 rounded-full">
                    {roadmapCategory}
                  </span>
                  {roadmapTags.map(tag => (
                    <span key={tag} className="bg-afro-gold/20 text-afro-gold text-xs py-1 px-3 rounded-full">
                      {tag}
                    </span>
                  ))}
                  <span className={`${isPublic ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'} text-xs py-1 px-3 rounded-full`}>
                    {isPublic ? 'Public' : 'Private'}
                  </span>
                </div>
                
                <p className="text-gray-600">
                  {roadmapDescription || "No description provided."}
                </p>
              </div>
              
              <div className="p-8">
                <h3 className="text-xl font-semibold mb-6 text-afro-purple">Roadmap Steps</h3>
                
                <div className="space-y-6 relative before:absolute before:top-0 before:bottom-0 before:left-[28px] before:w-1 before:bg-gradient-to-b before:from-afro-purple before:to-afro-green before:-z-10 before:rounded-full">
                  {steps.map((step, index) => (
                    <div key={step.id} className="relative">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 h-14 w-14 rounded-full bg-gradient-to-br from-afro-purple to-afro-gold text-white flex items-center justify-center font-bold text-xl shadow-lg">
                          {index + 1}
                        </div>
                        <div className="flex-grow pt-2">
                          <h4 className="text-xl font-bold">
                            {step.title || `Step ${index + 1}`}
                          </h4>
                          <p className="text-gray-600 mt-1">
                            {step.description || "No description provided."}
                          </p>
                          
                          {step.links && step.links.length > 0 && (
                            <div className="mt-3 space-y-1 pl-2">
                              <h5 className="text-sm font-medium text-gray-500">Resources:</h5>
                              <ul className="space-y-1">
                                {step.links.map((link, i) => (
                                  <li key={i} className="flex items-center gap-2 text-sm">
                                    <Link size={14} className="text-afro-purple" />
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
                          
                          {step.children && step.children.length > 0 && (
                            <div className="mt-4 pl-6 border-l-2 border-dashed border-afro-purple/30 space-y-4">
                              {step.children.map((childStep, childIndex) => (
                                <div key={childStep.id} className="relative">
                                  <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-afro-purple/80 to-afro-gold/80 text-white flex items-center justify-center font-medium text-sm">
                                      {index + 1}.{childIndex + 1}
                                    </div>
                                    <div>
                                      <h5 className="font-semibold">
                                        {childStep.title || `Substep ${index + 1}.${childIndex + 1}`}
                                      </h5>
                                      <p className="text-gray-600 text-sm mt-1">
                                        {childStep.description || "No description provided."}
                                      </p>
                                      
                                      {childStep.links && childStep.links.length > 0 && (
                                        <div className="mt-2 space-y-1">
                                          <ul className="space-y-1">
                                            {childStep.links.map((link, i) => (
                                              <li key={i} className="flex items-center gap-2 text-xs">
                                                <Link size={12} className="text-afro-purple" />
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
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </MotionDiv>
            
            <div className="flex justify-between my-8">
              <Button 
                onClick={() => setActiveTab("steps")} 
                variant="outline"
                className="border-afro-purple/30 text-afro-purple/70 hover:bg-afro-purple/5"
              >
                Back to Edit
              </Button>
              
              <div className="flex gap-3">
                <MotionButtonWithVariant
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toast.success("Roadmap shared successfully!")}
                  variant="outline"
                  className="border-afro-purple text-afro-purple hover:bg-afro-purple/10 flex items-center gap-2"
                >
                  <Share size={18} />
                  Share
                </MotionButtonWithVariant>
                
                <MotionButtonWithVariant
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSaveRoadmap} 
                  variant="default"
                  className="bg-gradient-to-r from-afro-purple to-afro-gold text-white hover:opacity-90 flex items-center gap-2"
                >
                  <Download size={18} />
                  Save & Download
                </MotionButtonWithVariant>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MotionDiv>
  );
};
