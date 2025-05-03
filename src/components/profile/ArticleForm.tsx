
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const articleFormSchema = z.object({
  title: z.string().min(5, {
    message: "Article title must be at least 5 characters",
  }),
  excerpt: z.string().min(10, {
    message: "Article excerpt must be at least 10 characters",
  }),
  content: z.string().min(50, {
    message: "Article content must be at least 50 characters",
  }),
  link: z.string().url({
    message: "Please enter a valid URL",
  }).optional().or(z.literal("")),
  tags: z.array(z.string()).min(1, {
    message: "Please add at least one tag",
  }),
  readTime: z.string().min(1, {
    message: "Please specify estimated read time",
  }),
});

type ArticleFormValues = z.infer<typeof articleFormSchema>;

export function ArticleForm() {
  const { toast } = useToast();
  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      link: "",
      tags: [],
      readTime: "",
    },
  });

  const tags = form.watch("tags");

  function addTag() {
    if (!tagInput.trim()) return;
    
    if (!tags.includes(tagInput.trim())) {
      form.setValue("tags", [...tags, tagInput.trim()]);
    }
    
    setTagInput("");
  }

  function removeTag(tag: string) {
    form.setValue(
      "tags",
      tags.filter((t) => t !== tag)
    );
  }

  async function onSubmit(data: ArticleFormValues) {
    setIsSubmitting(true);
    
    try {
      // This is where we would make an API call to create the article
      console.log("Article data to submit:", data);
      
      toast({
        title: "Article added successfully!",
        description: "Your article has been added to your profile.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error adding article:", error);
      toast({
        title: "Error adding article",
        description: "There was a problem adding your article. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add New Article</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Article Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter article title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Brief summary of your article" 
                      className="min-h-24"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    A short preview that will be displayed on your profile
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Write your article content here" 
                      className="min-h-64"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>External Link (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://your-blog.com/article" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    If your article is published elsewhere, provide the link
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="tags"
              render={() => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <div className="flex gap-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add a tag"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                    />
                    <Button 
                      type="button"
                      variant="secondary"
                      onClick={addTag}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                          <X size={14} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="readTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Read Time</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g. 5 min read" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Adding article..." : "Add Article"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
