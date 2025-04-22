
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Link, Plus } from "lucide-react";

interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  links: { url: string; title: string }[];
  children: RoadmapStep[];
}

interface RoadmapNodeProps {
  step: RoadmapStep;
  index: number;
  updateStep: (data: Partial<RoadmapStep>) => void;
  onAddChild: () => void;
}

export const RoadmapNode = ({ step, index, updateStep, onAddChild }: RoadmapNodeProps) => {
  const [showAddLink, setShowAddLink] = useState(false);
  const [newLinkTitle, setNewLinkTitle] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");

  const handleAddLink = () => {
    if (!newLinkUrl) return;
    
    updateStep({
      links: [
        ...step.links,
        {
          url: newLinkUrl.startsWith("http") ? newLinkUrl : `https://${newLinkUrl}`,
          title: newLinkTitle || newLinkUrl,
        },
      ],
    });
    
    setNewLinkTitle("");
    setNewLinkUrl("");
    setShowAddLink(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-afro-purple/90 text-white flex items-center justify-center font-medium">
          {index}
        </div>
        <Input
          value={step.title}
          onChange={(e) => updateStep({ title: e.target.value })}
          placeholder="Step Title"
          className="flex-1 font-medium text-lg border-none focus-visible:ring-1 bg-transparent"
        />
      </div>
      
      <Textarea
        value={step.description}
        onChange={(e) => updateStep({ description: e.target.value })}
        placeholder="Describe this step..."
        className="w-full min-h-[80px] border-afro-purple/20"
      />

      {step.links.length > 0 && (
        <div className="pl-12 space-y-2">
          <h4 className="text-sm font-medium text-gray-500">Resources:</h4>
          <ul className="space-y-1">
            {step.links.map((link, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <Link size={14} className="text-afro-purple" />
                <span className="text-gray-700">{link.title}:</span>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-afro-purple hover:underline truncate"
                >
                  {link.url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showAddLink ? (
        <div className="pl-12 grid grid-cols-6 gap-2">
          <Input
            value={newLinkTitle}
            onChange={(e) => setNewLinkTitle(e.target.value)}
            placeholder="Resource title"
            className="col-span-2"
          />
          <Input
            value={newLinkUrl}
            onChange={(e) => setNewLinkUrl(e.target.value)}
            placeholder="URL"
            className="col-span-3"
          />
          <Button
            onClick={handleAddLink}
            variant="outline"
            size="sm"
            className="col-span-1"
          >
            Add
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => setShowAddLink(true)}
          variant="ghost"
          size="sm"
          className="text-xs flex items-center gap-1 ml-12 text-gray-500 hover:text-afro-purple"
        >
          <Link size={14} />
          Add Resource Link
        </Button>
      )}

      {step.children.length > 0 && (
        <div className="pl-12 border-l-2 border-dashed border-afro-purple/20 mt-4 space-y-6">
          {step.children.map((childStep, childIndex) => (
            <div key={childStep.id} className="relative">
              <div className="absolute -left-[26px] top-4 h-4 w-4 border-b-2 border-l-2 border-dashed border-afro-purple/20"></div>
              <RoadmapNode
                step={childStep}
                index={index + (childIndex + 1) / 10}
                updateStep={(data) => {
                  const updatedChildren = [...step.children];
                  updatedChildren[childIndex] = { ...childStep, ...data };
                  updateStep({ children: updatedChildren });
                }}
                onAddChild={() => {}}
              />
            </div>
          ))}
        </div>
      )}

      <div className="pl-12 pt-2">
        <Button
          onClick={onAddChild}
          variant="ghost"
          size="sm"
          className="text-xs flex items-center gap-1 text-gray-500 hover:text-afro-purple"
        >
          <Plus size={14} />
          Add Sub-step
        </Button>
      </div>
    </div>
  );
};
