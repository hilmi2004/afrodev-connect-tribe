
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { ProjectForm } from "@/components/profile/ProjectForm";
import { ArticleForm } from "@/components/profile/ArticleForm";
import { TimelineEventForm } from "@/components/profile/TimelineEventForm";
import { useToast } from "@/hooks/use-toast";

export default function ProfileEdit() {
  // For demo, use local state only
  const [activeTab, setActiveTab] = useState("general");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Basic profile info
  const [name, setName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [location, setLocation] = useState(user?.country || "");
  const [bio, setBio] = useState(user?.bio || "");
  
  // Social links
  const [github, setGithub] = useState(user?.socialLinks?.github || "");
  const [twitter, setTwitter] = useState(user?.socialLinks?.twitter || "");
  const [linkedin, setLinkedin] = useState(user?.socialLinks?.linkedin || "");
  const [website, setWebsite] = useState(user?.socialLinks?.website || "");

  function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    }, 1000);
  }

  return (
    <MainLayout>
      <div className="container py-10 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-4 mb-8">
            <TabsTrigger value="general">General Info</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <form onSubmit={handleSaveProfile}>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <Input value={name} onChange={e => setName(e.target.value)} />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input value={email} onChange={e => setEmail(e.target.value)} type="email" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <Input value={location} onChange={e => setLocation(e.target.value)} />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Bio</label>
                    <Textarea 
                      value={bio} 
                      onChange={e => setBio(e.target.value)}
                      placeholder="Tell others about yourself"
                      className="min-h-32"
                    />
                  </div>
                </CardContent>
                
                <CardHeader>
                  <CardTitle>Social Links</CardTitle>
                  <CardDescription>Connect your social profiles</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">GitHub</label>
                    <Input 
                      value={github} 
                      onChange={e => setGithub(e.target.value)}
                      placeholder="https://github.com/username" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Twitter</label>
                    <Input 
                      value={twitter} 
                      onChange={e => setTwitter(e.target.value)}
                      placeholder="https://twitter.com/username" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">LinkedIn</label>
                    <Input 
                      value={linkedin} 
                      onChange={e => setLinkedin(e.target.value)}
                      placeholder="https://linkedin.com/in/username" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Personal Website</label>
                    <Input 
                      value={website} 
                      onChange={e => setWebsite(e.target.value)}
                      placeholder="https://yourwebsite.com" 
                    />
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button type="submit" disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="projects">
            <ProjectForm />
          </TabsContent>
          
          <TabsContent value="articles">
            <ArticleForm />
          </TabsContent>
          
          <TabsContent value="timeline">
            <TimelineEventForm />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
