
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Link, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  onRemove?: () => void;
}

export const RoadmapNode = ({ 
  step, 
  index, 
  updateStep, 
  onAddChild, 
  onRemove 
}: RoadmapNodeProps) => {
  const [showAddLink, setShowAddLink] = useState(false);
  const [newLinkTitle, setNewLinkTitle] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

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

  const handleRemoveLink = (index: number) => {
    const updatedLinks = [...step.links];
    updatedLinks.splice(index, 1);
    updateStep({ links: updatedLinks });
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim() !== "") {
      if (!tags.includes(newTag.trim())) {
        const updatedTags = [...tags, newTag.trim()];
        setTags(updatedTags);
        setNewTag("");
        e.preventDefault();
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-afro-purple text-white flex items-center justify-center font-medium">
          {index}
        </div>
        <Input
          value={step.title}
          onChange={(e) => updateStep({ title: e.target.value })}
          placeholder="Step Title"
          className="flex-grow text-base font-medium border-afro-purple/20 focus-visible:ring-afro-purple"
        />
        {onRemove && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="text-gray-500 hover:text-red-500"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <Textarea
        value={step.description}
        onChange={(e) => updateStep({ description: e.target.value })}
        placeholder="Describe this step in detail..."
        className="w-full min-h-[100px] border-afro-purple/20 focus-visible:ring-afro-purple"
      />

      <div className="pl-11">
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Tags for this step (optional)
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map(tag => (
              <Badge key={tag} variant="outline" className="px-3 py-1 gap-1 text-afro-purple border-afro-purple/20 bg-afro-purple/5">
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
            placeholder="Add tag and press Enter"
            className="w-full border-afro-purple/20 focus-visible:ring-afro-purple"
          />
        </div>
      </div>

      {step.links.length > 0 && (
        <div className="pl-11 space-y-2">
          <h4 className="text-sm font-medium text-gray-600">Resources:</h4>
          <div className="space-y-2 bg-gray-50 p-3 rounded-md border border-gray-100">
            {step.links.map((link, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Link size={14} className="text-afro-purple" />
                  <span className="font-medium">{link.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 max-w-[200px] truncate">
                    {link.url}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 text-gray-400 hover:text-red-500"
                    onClick={() => handleRemoveLink(i)}
                  >
                    <X size={12} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showAddLink ? (
        <div className="pl-11 grid grid-cols-6 gap-2">
          <div className="col-span-2">
            <label className="block text-xs font-medium mb-1 text-gray-600">
              Resource Title
            </label>
            <Input
              value={newLinkTitle}
              onChange={(e) => setNewLinkTitle(e.target.value)}
              placeholder="e.g., Official Documentation"
              className="border-afro-purple/20 focus-visible:ring-afro-purple"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs font-medium mb-1 text-gray-600">
              Resource URL
            </label>
            <Input
              value={newLinkUrl}
              onChange={(e) => setNewLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="border-afro-purple/20 focus-visible:ring-afro-purple"
            />
          </div>
          <div className="col-span-1 flex flex-col justify-end">
            <Button
              onClick={handleAddLink}
              className="bg-afro-purple hover:bg-afro-purple/90 w-full"
              disabled={!newLinkUrl}
            >
              Add
            </Button>
          </div>
        </div>
      ) : (
        <div className="pl-11">
          <Button
            onClick={() => setShowAddLink(true)}
            variant="outline"
            size="sm"
            className="text-xs flex items-center gap-1 text-afro-purple border-afro-purple/20 hover:bg-afro-purple/5"
          >
            <Link size={12} />
            Add Resource Link
          </Button>
        </div>
      )}

      {step.children.length > 0 && (
        <div className="pl-11 border-l-2 border-dashed border-afro-purple/20 mt-6 space-y-6">
          <h4 className="text-sm font-medium -ml-11 mb-2 text-gray-600">Sub-steps:</h4>
          {step.children.map((childStep, childIndex) => (
            <div key={childStep.id} className="relative">
              <div className="absolute -left-[26px] top-4 h-6 w-6 border-t-2 border-l-2 border-dashed border-afro-purple/20"></div>
              <RoadmapNode
                step={childStep}
                index={childIndex + 1}
                updateStep={(data) => {
                  const updatedChildren = [...step.children];
                  updatedChildren[childIndex] = { ...childStep, ...data };
                  updateStep({ children: updatedChildren });
                }}
                onAddChild={() => {}}
                onRemove={() => {
                  const updatedChildren = [...step.children];
                  updatedChildren.splice(childIndex, 1);
                  updateStep({ children: updatedChildren });
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div className="pl-11 pt-2">
        <Button
          onClick={onAddChild}
          variant="outline"
          size="sm"
          className="text-xs flex items-center gap-1 text-afro-purple border-afro-purple/20 hover:bg-afro-purple/5"
        >
          <Plus size={12} />
          Add Sub-step
        </Button>
      </div>
    </div>
  );
};
