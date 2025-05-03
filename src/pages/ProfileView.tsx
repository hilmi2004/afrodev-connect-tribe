
import { MainLayout } from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Github, 
  Globe, 
  Twitter, 
  Linkedin, 
  Mail, 
  MapPin, 
  Briefcase,
  Calendar,
  Code,
  Users,
  BookOpen,
  MessageSquare,
  Star,
  Award,
  Heart,
  Clock
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  MotionDiv, 
  MotionSection, 
  fadeIn, 
  slideInUp, 
  slideInLeft, 
  slideInRight, 
  staggerContainer 
} from "@/components/ui/motion";
import { useAuth } from "@/hooks/useAuth";

// Mock user data - in production this would come from the API
const USER_PROFILE = {
  id: "1",
  name: "Jane Doe",
  username: "@jane_dev",
  bio: "Full Stack Developer specializing in React & Node.js with a passion for open source contribution and mentoring junior developers.",
  avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=example", // Fallback avatar
  coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1470&auto=format&fit=crop", // Sample cover
  location: "Nairobi, Kenya",
  joinDate: "Jan 2023",
  followers: 120,
  following: 85,
  skills: [
    "JavaScript", "TypeScript", "React", "Node.js", "MongoDB", "Express"
  ],
  experience: [
    {
      title: "Frontend Developer",
      company: "TechSolutions Inc.",
      period: "2022 - Present",
      description: "Building responsive web applications with React and TypeScript."
    },
    {
      title: "Junior Developer",
      company: "StartupName",
      period: "2020 - 2022",
      description: "Developed and maintained company website and internal tools."
    }
  ],
  education: [
    {
      degree: "B.Sc Computer Science",
      institution: "University of Nairobi",
      year: "2016 - 2020"
    }
  ],
  projects: [
    {
      id: "p1",
      title: "Personal Portfolio",
      description: "A showcase of my work and skills using React and Three.js",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1170&auto=format&fit=crop",
      techStack: ["React", "Three.js", "Tailwind CSS"],
      stars: 15,
      link: "#"
    },
    {
      id: "p2",
      title: "Task Manager API",
      description: "RESTful API for task management built with Node.js",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1170&auto=format&fit=crop",
      techStack: ["Node.js", "Express", "MongoDB"],
      stars: 8,
      link: "#"
    }
  ],
  articles: [
    {
      id: "a1",
      title: "Getting Started with React Hooks",
      date: "April 10, 2023",
      readTime: "5 min read",
      excerpt: "An introduction to React Hooks and how they can simplify your code.",
      link: "#"
    },
    {
      id: "a2",
      title: "Building a RESTful API with Node.js",
      date: "February 22, 2023",
      readTime: "8 min read",
      excerpt: "Learn how to create a RESTful API using Node.js and Express.",
      link: "#"
    }
  ],
  timeline: [
    {
      id: "t1",
      date: "June 2023",
      title: "Started learning React Native",
      type: "learning",
      icon: "book-open"
    },
    {
      id: "t2",
      date: "April 2023",
      title: "Published first technical article",
      type: "article",
      icon: "book-open"
    },
    {
      id: "t3",
      date: "January 2023",
      title: "Joined TechSolutions Inc.",
      type: "career",
      icon: "briefcase"
    }
  ],
  socialLinks: {
    github: "https://github.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    website: "https://example.com",
    email: "jane@example.com"
  }
};

// Function to get icon for timeline
const getTimelineIcon = (type: string) => {
  switch (type) {
    case "award":
      return <Award className="text-amber-500" />;
    case "project":
      return <Code className="text-blue-500" />;
    case "event":
    case "learning":
      return <Users className="text-green-500" />;
    case "article":
      return <BookOpen className="text-purple-500" />;
    case "career":
      return <Briefcase className="text-orange-500" />;
    default:
      return <Calendar className="text-gray-500" />;
  }
};

export default function ProfileView() {
  const [activeTab, setActiveTab] = useState("projects");
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // In a real app, we would fetch user profile data here
  // const { data: profile, isLoading } = useQuery({...})
  
  const handleEditProfile = () => {
    navigate("/profile/edit");
  };
  
  return (
    <MainLayout>
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-600/10 rounded-full blur-3xl"></div>
        
        <div className="container py-8 relative">
          {/* Cover Image */}
          <div className="h-64 md:h-80 rounded-2xl overflow-hidden relative mb-20">
            <img
              src={USER_PROFILE.coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            
            {/* Profile Image */}
            <div className="absolute -bottom-16 left-8 md:left-12">
              <div className="relative">
                <img
                  src={USER_PROFILE.avatar}
                  alt={USER_PROFILE.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-xl"
                />
                <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Profile Info */}
            <MotionDiv
              variants={slideInLeft()}
              initial="hidden"
              animate="visible"
              className="w-full lg:w-1/3 space-y-6"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex flex-col sm:flex-row lg:flex-col items-start justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{user?.fullName || USER_PROFILE.name}</h1>
                    <p className="text-gray-500">{USER_PROFILE.username}</p>
                    <p className="mt-3 text-gray-700">{user?.bio || USER_PROFILE.bio}</p>
                    
                    <div className="flex items-center mt-3 text-sm text-gray-500">
                      <MapPin size={16} className="mr-1" />
                      <span>{user?.country || USER_PROFILE.location}</span>
                      <span className="mx-2">•</span>
                      <Calendar size={16} className="mr-1" />
                      <span>Joined {USER_PROFILE.joinDate}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={handleEditProfile} className="gap-1 border-purple-600 text-purple-600 hover:bg-purple-600/10">
                      <Code size={16} />
                      <span>Edit Profile</span>
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-around mt-6 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">{USER_PROFILE.followers.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">{USER_PROFILE.following.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">{USER_PROFILE.projects.length}</div>
                    <div className="text-xs text-gray-500">Projects</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {(user?.programmingLanguages || USER_PROFILE.skills).map((skill, index) => (
                    <Badge key={index} variant="outline" className="bg-purple-600/5 text-purple-600 border-purple-600/20">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Experience</h2>
                <div className="space-y-4">
                  {USER_PROFILE.experience.map((exp, index) => (
                    <div key={index} className="relative pl-6 pb-4 border-l-2 border-purple-600/30 last:border-0">
                      <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-purple-600"></div>
                      <h3 className="font-medium text-gray-900">{exp.title}</h3>
                      <div className="text-sm text-gray-500">{exp.company} • {exp.period}</div>
                      <p className="mt-1 text-sm text-gray-600">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Education</h2>
                <div className="space-y-4">
                  {USER_PROFILE.education.map((edu, index) => (
                    <div key={index} className="relative pl-6 pb-4 border-l-2 border-purple-600/30 last:border-0">
                      <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-purple-600"></div>
                      <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                      <div className="text-sm text-gray-600">{edu.institution} • {edu.year}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Connect</h2>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="sm" asChild className="w-full flex items-center justify-center gap-2 border-gray-200 text-gray-700 hover:bg-gray-100">
                    <a href={user?.socialLinks?.github || USER_PROFILE.socialLinks.github} target="_blank" rel="noopener noreferrer">
                      <Github size={16} />
                      <span>GitHub</span>
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="w-full flex items-center justify-center gap-2 border-gray-200 text-gray-700 hover:bg-gray-100">
                    <a href={user?.socialLinks?.twitter || USER_PROFILE.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                      <Twitter size={16} />
                      <span>Twitter</span>
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="w-full flex items-center justify-center gap-2 border-gray-200 text-gray-700 hover:bg-gray-100">
                    <a href={user?.socialLinks?.linkedin || USER_PROFILE.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin size={16} />
                      <span>LinkedIn</span>
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="w-full flex items-center justify-center gap-2 border-gray-200 text-gray-700 hover:bg-gray-100">
                    <a href={user?.socialLinks?.website || USER_PROFILE.socialLinks.website} target="_blank" rel="noopener noreferrer">
                      <Globe size={16} />
                      <span>Website</span>
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="w-full col-span-2 flex items-center justify-center gap-2 border-gray-200 text-gray-700 hover:bg-gray-100">
                    <a href={`mailto:${user?.email || USER_PROFILE.socialLinks.email}`}>
                      <Mail size={16} />
                      <span>Email</span>
                    </a>
                  </Button>
                </div>
              </div>
            </MotionDiv>
            
            {/* Right Column - Content Tabs */}
            <MotionDiv
              variants={slideInRight()}
              initial="hidden"
              animate="visible"
              className="w-full lg:w-2/3"
            >
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full bg-white/70 backdrop-blur-sm border border-purple-600/20 rounded-lg overflow-hidden grid grid-cols-3 mb-6">
                  <TabsTrigger value="projects" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white">
                    Projects
                  </TabsTrigger>
                  <TabsTrigger value="articles" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white">
                    Articles
                  </TabsTrigger>
                  <TabsTrigger value="timeline" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white">
                    Timeline
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="projects" className="mt-0">
                  <MotionSection
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {USER_PROFILE.projects.map((project, index) => (
                      <MotionDiv
                        key={project.id}
                        variants={fadeIn(index * 0.1)}
                        className="group bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="h-48 relative overflow-hidden">
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        
                        <div className="p-5">
                          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                            {project.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">
                            {project.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.techStack.map(tech => (
                              <Badge key={tech} variant="outline" className="bg-purple-600/5 text-purple-600/90 border-purple-600/10 text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center gap-1 text-amber-500">
                              <Star size={16} />
                              <span>{project.stars}</span>
                            </div>
                            
                            <Button size="sm" variant="outline" asChild className="border-purple-600 text-purple-600 hover:bg-purple-600/10">
                              <a href={project.link} target="_blank" rel="noopener noreferrer">
                                <span>View Project</span>
                              </a>
                            </Button>
                          </div>
                        </div>
                      </MotionDiv>
                    ))}
                  </MotionSection>
                </TabsContent>
                
                <TabsContent value="articles" className="mt-0">
                  <MotionSection
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="space-y-5"
                  >
                    {USER_PROFILE.articles.map((article, index) => (
                      <MotionDiv
                        key={article.id}
                        variants={fadeIn(index * 0.1)}
                        className="group bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                            {article.title}
                          </h3>
                          <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Calendar size={14} />
                            <span>{article.date}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1 text-gray-500 text-sm">
                            <Clock size={14} />
                            <span>{article.readTime}</span>
                          </div>
                          
                          <Button size="sm" variant="outline" asChild className="border-purple-600 text-purple-600 hover:bg-purple-600/10">
                            <a href={article.link} target="_blank" rel="noopener noreferrer">
                              <span>Read Article</span>
                            </a>
                          </Button>
                        </div>
                      </MotionDiv>
                    ))}
                  </MotionSection>
                </TabsContent>
                
                <TabsContent value="timeline" className="mt-0">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 p-6">
                    <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Developer Journey</h2>
                    
                    <MotionDiv
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                      className="relative space-y-0 before:absolute before:top-0 before:bottom-0 before:left-[18px] before:w-0.5 before:bg-gradient-to-b before:from-purple-600 before:via-blue-600 before:to-green-600 before:rounded-full"
                    >
                      {USER_PROFILE.timeline.map((item, index) => (
                        <MotionDiv
                          key={item.id}
                          variants={slideInUp(index * 0.1)}
                          className="relative pl-10 pb-10 last:pb-0"
                        >
                          <div className="absolute left-0 top-0 flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-md border border-purple-600/20">
                            {getTimelineIcon(item.type)}
                          </div>
                          
                          <div className="text-sm text-gray-500 mb-1">{item.date}</div>
                          <h3 className="text-base font-medium text-gray-900">{item.title}</h3>
                          
                          <div className="mt-2">
                            <Badge variant="outline" className={`
                              ${item.type === 'award' ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}
                              ${item.type === 'project' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                              ${item.type === 'event' || item.type === 'learning' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                              ${item.type === 'article' ? 'bg-purple-50 text-purple-700 border-purple-200' : ''}
                              ${item.type === 'career' ? 'bg-orange-50 text-orange-700 border-orange-200' : ''}
                              text-xs
                            `}>
                              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                            </Badge>
                          </div>
                        </MotionDiv>
                      ))}
                    </MotionDiv>
                  </div>
                </TabsContent>
              </Tabs>
            </MotionDiv>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
