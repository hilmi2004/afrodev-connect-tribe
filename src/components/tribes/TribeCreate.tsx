import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Users, Image } from "lucide-react";

export function TribeCreate() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<string>("");

  function handleCreate() {
    if(!name.trim()) {
      toast.error("Tribe name is required");
      return;
    }
    toast.success("Tribe created!");
    setOpen(false);
    setName("");
    setDesc("");
    setTags("");
    setLocation("");
    setImage("");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-afro-purple hover:bg-afro-purple/90 flex items-center gap-2">
          <Users size={20} />
          Create a Tribe
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create a new Tribe</DialogTitle>
          <DialogDescription>
            Start a new community based on a passion, location, or tech interest.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <label htmlFor="tribe-image" className="block font-medium mb-1 text-afro-purple">Tribe Image</label>
            <div className="flex gap-2">
              <Input
                id="tribe-image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => setImage(e.target?.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
              />
              {image && (
                <div className="w-16 h-16 rounded-lg overflow-hidden">
                  <img src={image} alt="Tribe preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="tribe-name" className="block font-medium mb-1 text-afro-purple">Name*</label>
            <Input value={name} id="tribe-name" onChange={e => setName(e.target.value)} placeholder="e.g. Africa React Devs" />
          </div>
          <div>
            <label htmlFor="tribe-desc" className="block font-medium mb-1 text-afro-purple">Description</label>
            <Textarea value={desc} id="tribe-desc" onChange={e => setDesc(e.target.value)} placeholder="What is this tribe about?" rows={3}/>
          </div>
          <div>
            <label htmlFor="tribe-tags" className="block font-medium mb-1 text-afro-purple">Tags</label>
            <Input value={tags} id="tribe-tags" onChange={e => setTags(e.target.value)} placeholder="e.g. React, Frontend, Nigeria" />
          </div>
          <div>
            <label htmlFor="tribe-location" className="block font-medium mb-1 text-afro-purple">Location</label>
            <Input value={location} id="tribe-location" onChange={e => setLocation(e.target.value)} placeholder="e.g. Lagos, Remote"/>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreate} className="bg-afro-purple text-white">Create Tribe</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
