import React, { useState, useRef, useEffect } from "react";
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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { TimelineEventForm } from "@/components/profile/TimelineEventForm";
import { useToast } from "@/hooks/use-toast";
import {Image as ImageIcon, Plus, Trash, Camera, User as UserIcon, Badge, X} from "lucide-react";
import api from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface EducationItem {
  degree: string;
  institution: string;
  year: string;
}

interface SocialLinks {
  github: string;
  twitter: string;
  linkedin: string;
  website: string;
}

export default function ProfileEdit() {
  const [activeTab, setActiveTab] = useState("general");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { user, updateUser } = useAuth();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newLanguage, setNewLanguage] = useState("");
  const [newSkill, setNewSkill] = useState("");
  // Form states
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    bio: "",
    profileImage: "",
    socialLinks: {
      github: "",
      twitter: "",
      linkedin: "",
      website: ""
    } as SocialLinks,
    experience: [] as ExperienceItem[],
    programmingLanguages: [] as string[],
    languages: [] as string[],
    education: [] as EducationItem[]
  });

  const addLanguage = () => {
    if (newLanguage.trim() && !formData.languages.includes(newLanguage.trim())) {
      setFormData(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()]
      }));
      setNewLanguage("");
    } else {
      // Show feedback if language is empty or already exists
      toast({
        title: newLanguage.trim() ? "Language already added" : "Please enter a language",
        variant: "destructive"
      });
    }
  };

  const removeLanguage = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang !== language)
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.programmingLanguages.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        programmingLanguages: [...prev.programmingLanguages, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      programmingLanguages: prev.programmingLanguages.filter(s => s !== skill)
    }));
  };

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        country: user.country || "",
        bio: user.bio || "",
        profileImage: user.profileImage || "",
        socialLinks: {
          github: user.socialLinks?.github || "",
          twitter: user.socialLinks?.twitter || "",
          linkedin: user.socialLinks?.linkedin || "",
          website: user.socialLinks?.website || ""
        },
        programmingLanguages: user.programmingLanguages || [],

        languages: user.languages || [],
        experience: user.experience || [],
        education: user.education || []
      });
    }
  }, [user]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side validation
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPEG, PNG, or GIF image",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 5MB",
        variant: "destructive"
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await api.post('/profile/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setFormData(prev => ({
          ...prev,
          profileImage: response.data.user.profileImage
        }));
        updateUser(response.data.user);

        toast({
          title: "Image uploaded",
          description: "Your profile image has been updated.",
        });
      }
    } catch (error) {
      console.error("Image upload error:", error);
      let errorMessage = "Could not update profile image.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      toast({
        title: "Upload failed",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value
      }
    }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        { title: "", company: "", period: "", description: "" }
      ]
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { degree: "", institution: "", year: "" }
      ]
    }));
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const updatedExperiences = [...formData.experience];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      experience: updatedExperiences
    }));
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const updatedEducations = [...formData.education];
    updatedEducations[index] = {
      ...updatedEducations[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      education: updatedEducations
    }));
  };

  const removeExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const removeEducation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  // In ProfileEdit.tsx, update the handleSubmit function:
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Create validated payload
    const payload = {
      ...formData,
      languages: formData.languages.filter(l => typeof l === 'string' && l.trim()),
      _id: undefined // Remove any MongoDB _id if present
    };

    try {
      console.log('Final payload before send:', JSON.parse(JSON.stringify(payload)));

      const response = await api.put(`/users/${user?._id}`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'X-Debug': process.env.NODE_ENV === 'development' ? 'languages-update' : undefined
        }
      });

      if (response.data.success) {
        updateUser(response.data.user);
        // @ts-ignore
        await queryClient.invalidateQueries(['user', user?._id]);
        toast({ title: "Profile updated" });
      }
    } catch (error) {
      console.error('Full error:', error.response?.data || error);
      toast({
        title: "Update failed",
        description: error.response?.data?.message || "Database update failed",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  return (
      <MainLayout>
        <div className="container py-10 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-6 mb-8">
              <TabsTrigger value="general">General Info</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="content">Content & Timeline</TabsTrigger>
            </TabsList>


            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Photo</CardTitle>
                  <CardDescription>Upload a profile picture to personalize your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24 border-2 border-gray-200">
                        {formData.profileImage ? (
                            <AvatarImage src={formData.profileImage} alt={formData.fullName} />
                        ) : (
                            <AvatarFallback className="bg-gray-100 text-gray-400">
                              <UserIcon size={32} />
                            </AvatarFallback>
                        )}
                      </Avatar>
                      <Button
                          size="icon"
                          variant="secondary"
                          className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 shadow-md hover:bg-purple-600 hover:text-white transition-colors"
                          onClick={triggerFileInput}
                      >
                        <Camera size={16} />
                      </Button>
                    </div>
                    <div>
                      <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                      />
                      <Button
                          type="button"
                          variant="outline"
                          className="flex gap-2 items-center"
                          onClick={triggerFileInput}
                      >
                        <ImageIcon size={16} />
                        Upload Image
                      </Button>
                      <p className="text-sm text-gray-500 mt-2">
                        Recommended: Square image, at least 400x400 pixels
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name</label>
                      <Input
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <Input
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          type="email"
                          disabled
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Location</label>
                      <Input
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Bio</label>
                      <Textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
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
                          name="github"
                          value={formData.socialLinks.github}
                          onChange={handleSocialLinkChange}
                          placeholder="https://github.com/username"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Twitter</label>
                      <Input
                          name="twitter"
                          value={formData.socialLinks.twitter}
                          onChange={handleSocialLinkChange}
                          placeholder="https://twitter.com/username"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">LinkedIn</label>
                      <Input
                          name="linkedin"
                          value={formData.socialLinks.linkedin}
                          onChange={handleSocialLinkChange}
                          placeholder="https://linkedin.com/in/username"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Personal Website</label>
                      <Input
                          name="website"
                          value={formData.socialLinks.website}
                          onChange={handleSocialLinkChange}
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

            <TabsContent value="skills" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skills & Languages</CardTitle>
                  <CardDescription>Add your technical skills and spoken languages</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">Programming Languages & Skills</label>
                      <div className="flex gap-2 mb-2">
                        <Input
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder="Add a skill (e.g. JavaScript)"
                        />
                        <Button type="button" onClick={addSkill}>
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.programmingLanguages.map((skill) => (
                            <Badge key={skill} className="flex items-center gap-1">
                              {skill}
                              <button
                                  type="button"
                                  onClick={() => removeSkill(skill)}
                                  className="hover:text-red-500"
                              >
                                <X size={14} />
                              </button>
                            </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Spoken Languages</label>
                      <div className="flex gap-2 mb-2">
                        <Input
                            value={newLanguage}
                            onChange={(e) => setNewLanguage(e.target.value)}
                            placeholder="Add a language (e.g. French)"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                addLanguage();
                              }
                            }}
                        />
                        <Button
                            type="button"
                            onClick={addLanguage}
                            disabled={!newLanguage.trim()}
                        >
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.languages?.map((language) => (
                            <Badge key={language} className="flex items-center gap-1">
                              {language}
                              <button
                                  type="button"
                                  onClick={() => removeLanguage(language)}
                                  className="hover:text-red-500"
                              >
                                <X className={'text-red-500'} size={14} />
                              </button>
                            </Badge>
                        ))}
                      </div>
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
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-6">
                    {formData.experience.map((exp, index) => (
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
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-6">
                    {formData.education.map((edu, index) => (
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