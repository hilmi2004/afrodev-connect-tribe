
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
import { Plus, Trash } from "lucide-react";

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

  // Experience - initialize with user's experience or empty array
  const [experiences, setExperiences] = useState(
    user?.experience ? 
    (Array.isArray(user.experience) ? user.experience : []) : 
    []
  );
  
  // Education - initialize with user's education or empty array
  const [educations, setEducations] = useState(
    user?.education ? 
    (Array.isArray(user.education) ? user.education : []) : 
    []
  );

  // Add a new empty experience
  const addExperience = () => {
    setExperiences([
      ...experiences,
      { title: "", company: "", period: "", description: "" }
    ]);
  };

  // Add a new empty education
  const addEducation = () => {
    setEducations([
      ...educations,
      { degree: "", institution: "", year: "" }
    ]);
  };

  // Update experience at a specific index
  const updateExperience = (index, field, value) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value
    };
    setExperiences(updatedExperiences);
  };

  // Update education at a specific index
  const updateEducation = (index, field, value) => {
    const updatedEducations = [...educations];
    updatedEducations[index] = {
      ...updatedEducations[index],
      [field]: value
    };
    setEducations(updatedEducations);
  };

  // Remove an experience
  const removeExperience = (index) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(updatedExperiences);
  };

  // Remove an education
  const removeEducation = (index) => {
    const updatedEducations = educations.filter((_, i) => i !== index);
    setEducations(updatedEducations);
  };

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
          <TabsList className="w-full grid grid-cols-5 mb-8">
            <TabsTrigger value="general">General Info</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="content">Content & Timeline</TabsTrigger>
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
          
          <TabsContent value="experience" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Professional Experience</CardTitle>
                <CardDescription>Add your work history and professional experience</CardDescription>
              </CardHeader>
              <form onSubmit={handleSaveProfile}>
                <CardContent className="space-y-6">
                  {experiences.map((exp, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4 relative">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="absolute top-2 right-2 text-gray-500 hover:text-red-500" 
                        onClick={() => removeExperience(index)}
                        type="button"
                      >
                        <Trash size={16} />
                      </Button>
                      <div>
                        <label className="block text-sm font-medium mb-1">Job Title</label>
                        <Input 
                          value={exp.title} 
                          onChange={e => updateExperience(index, 'title', e.target.value)}
                          placeholder="Software Engineer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Company</label>
                        <Input 
                          value={exp.company} 
                          onChange={e => updateExperience(index, 'company', e.target.value)}
                          placeholder="Company Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Period</label>
                        <Input 
                          value={exp.period} 
                          onChange={e => updateExperience(index, 'period', e.target.value)}
                          placeholder="Jan 2020 - Present"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <Textarea 
                          value={exp.description} 
                          onChange={e => updateExperience(index, 'description', e.target.value)}
                          placeholder="Describe your responsibilities and achievements"
                          className="min-h-24"
                        />
                      </div>
                    </div>
                  ))}
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={addExperience} 
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Plus size={16} /> Add Work Experience
                  </Button>
                </CardContent>
                
                <CardFooter>
                  <Button type="submit" disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="education" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
                <CardDescription>Add your educational background</CardDescription>
              </CardHeader>
              <form onSubmit={handleSaveProfile}>
                <CardContent className="space-y-6">
                  {educations.map((edu, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4 relative">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="absolute top-2 right-2 text-gray-500 hover:text-red-500" 
                        onClick={() => removeEducation(index)}
                        type="button"
                      >
                        <Trash size={16} />
                      </Button>
                      <div>
                        <label className="block text-sm font-medium mb-1">Degree / Certificate</label>
                        <Input 
                          value={edu.degree} 
                          onChange={e => updateEducation(index, 'degree', e.target.value)}
                          placeholder="B.Sc. Computer Science"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Institution</label>
                        <Input 
                          value={edu.institution} 
                          onChange={e => updateEducation(index, 'institution', e.target.value)}
                          placeholder="University / School Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Year / Period</label>
                        <Input 
                          value={edu.year} 
                          onChange={e => updateEducation(index, 'year', e.target.value)}
                          placeholder="2016 - 2020"
                        />
                      </div>
                    </div>
                  ))}
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={addEducation} 
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Plus size={16} /> Add Education
                  </Button>
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
          
          <TabsContent value="content">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <ArticleForm />
              </div>
              <div>
                <TimelineEventForm />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
