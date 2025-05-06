import React, { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Users, Image as ImageIcon } from "lucide-react";
import { useTribes } from "@/hooks/useTribes";
import { useAuth } from "@/hooks/useAuth";
import { ErrorBoundary } from 'react-error-boundary';
import {validateToken} from "@/authUtils.ts";

interface TribeFormData {
  name: string;
  description: string;
  country: string;
  tags: string;
  image?: File;
}

function ErrorFallback({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) {
  return (
      <div role="alert" className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        <p>Something went wrong:</p>
        <pre className="mt-2 text-sm">{error.message}</pre>
        <button
            onClick={resetErrorBoundary}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Try again
        </button>
      </div>
  );
}

export function TribeCreate() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<TribeFormData>({
    name: '',
    description: '',
    country: '',
    tags: ''
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createTribe } = useTribes();
  const { user, isAuthenticated, token,logout } = useAuth();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setFormData(prev => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreate = async () => {
    if (!isAuthenticated) {
      toast.error("Your session has expired.");
      logout();
      return;
    }



    if (!formData.name.trim()) {
      toast.error("Tribe name is required");
      return;
    }

    setIsSubmitting(true);
    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('description', formData.description);
      form.append('country', formData.country || user?.country || '');
      form.append('tags', formData.tags);

      if (formData.image) {
        form.append('image', formData.image);
      }

      await createTribe(form);
      toast.success("Tribe created successfully!");
      setOpen(false);
      resetForm();
    } catch (error: any) {
      console.error("Tribe creation error:", error);
      toast.error(error.message || "Failed to create tribe");
      throw error; // This will be caught by the ErrorBoundary
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      country: '',
      tags: ''
    });
    setPreview(null);
  };

  return (
      <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            setOpen(false);
            resetForm();
          }}
      >
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
                <label htmlFor="tribe-image" className="block font-medium mb-1 text-afro-purple">
                  Tribe Image (Optional)
                </label>
                <div className="flex gap-2 items-center">
                  <Input
                      id="tribe-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="cursor-pointer"
                  />
                  {preview && (
                      <div className="w-16 h-16 rounded-lg overflow-hidden border">
                        <img
                            src={preview}
                            alt="Tribe preview"
                            className="w-full h-full object-cover"
                        />
                      </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">Max 5MB. Recommended: 1200x630px</p>
              </div>

              <div>
                <label htmlFor="tribe-name" className="block font-medium mb-1 text-afro-purple">
                  Name*
                </label>
                <Input
                    name="name"
                    value={formData.name}
                    id="tribe-name"
                    onChange={handleChange}
                    placeholder="e.g. Africa React Devs"
                    required
                />
              </div>

              <div>
                <label htmlFor="tribe-desc" className="block font-medium mb-1 text-afro-purple">
                  Description*
                </label>
                <Textarea
                    name="description"
                    value={formData.description}
                    id="tribe-desc"
                    onChange={handleChange}
                    placeholder="What is this tribe about? What will members do?"
                    rows={3}
                    required
                />
              </div>

              <div>
                <label htmlFor="tribe-tags" className="block font-medium mb-1 text-afro-purple">
                  Tags*
                </label>
                <Input
                    name="tags"
                    value={formData.tags}
                    id="tribe-tags"
                    onChange={handleChange}
                    placeholder="Comma separated tags (e.g. React, Frontend, Nigeria)"
                    required
                />
              </div>

              <div>
                <label htmlFor="tribe-location" className="block font-medium mb-1 text-afro-purple">
                  Location
                </label>
                <Input
                    name="country"
                    value={formData.country || user?.country || ''}
                    id="tribe-location"
                    onChange={handleChange}
                    placeholder={user?.country ? `Default: ${user.country}` : "e.g. Lagos, Remote"}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                  onClick={handleCreate}
                  className="bg-afro-purple text-white"
                  disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Tribe"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ErrorBoundary>
  );
}