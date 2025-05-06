
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
import { 
  MotionDiv, 
  MotionSection, 
  fadeIn, 
  slideInUp, 
  slideInLeft, 
  slideInRight, 
  staggerContainer 
} from "@/components/ui/motion";

// Mock developer data
const DEV_PROFILE = {
  id: "1",
  name: "Chioma Okonkwo",
  username: "@chioma_codes",
  bio: "Full Stack Developer specializing in React & Node.js. Open source contributor and tech community organizer based in Lagos.",
  avatar: "https://randomuser.me/api/portraits/women/31.jpg",
  coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1470&auto=format&fit=crop",
  location: "Lagos, Nigeria",
  joinDate: "Jan 2021",
  followers: 1280,
  following: 365,
  skills: [
    "JavaScript", "TypeScript", "React", "Node.js", "GraphQL", 
    "MongoDB", "PostgreSQL", "AWS", "Docker"
  ],
  experience: [
    {
      title: "Senior Frontend Developer",
      company: "TechAfrica Solutions",
      period: "2021 - Present",
      description: "Lead frontend development for multiple web applications, mentoring junior developers, and implementing modern UI patterns."
    },
    {
      title: "Frontend Developer",
      company: "Paystack",
      period: "2019 - 2021",
      description: "Worked on the payment dashboard and integration tools for developers. Improved performance by 40%."
    },
    {
      title: "Junior Developer",
      company: "CodeLagos",
      period: "2017 - 2019",
      description: "Started career working on various client websites and applications."
    }
  ],
  education: [
    {
      degree: "B.Sc Computer Science",
      institution: "University of Lagos",
      year: "2013 - 2017"
    },
    {
      degree: "Web Development Bootcamp",
      institution: "ALX Africa",
      year: "2016"
    }
  ],
  projects: [
    {
      id: "p1",
      title: "AfroCommerce",
      description: "An e-commerce platform tailored for African artisans to sell globally",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1170&auto=format&fit=crop",
      techStack: ["React", "Node.js", "MongoDB", "Stripe API"],
      stars: 128,
      link: "#"
    },
    {
      id: "p2",
      title: "DevMentor",
      description: "Platform connecting junior developers with mentors across Africa",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1170&auto=format&fit=crop",
      techStack: ["Vue.js", "Firebase", "Tailwind CSS"],
      stars: 87,
      link: "#"
    },
    {
      id: "p3",
      title: "HealthTrack API",
      description: "Open-source API for health tracking applications",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1170&auto=format&fit=crop",
      techStack: ["Express.js", "PostgreSQL", "Jest", "Docker"],
      stars: 215,
      link: "#"
    }
  ],
  articles: [
    {
      id: "a1",
      title: "Building Accessible Web Applications for African Markets",
      date: "May 12, 2023",
      readTime: "8 min read",
      excerpt: "Learn how to optimize your web applications for low-bandwidth environments and diverse user accessibility needs.",
      link: "#"
    },
    {
      id: "a2",
      title: "Setting Up a Modern React Project in 2023",
      date: "March 5, 2023",
      readTime: "12 min read",
      excerpt: "A comprehensive guide to configuring a React project with all the best tools and practices.",
      link: "#"
    },
    {
      id: "a3",
      title: "Building Community: Tech Events in Lagos",
      date: "January 17, 2023",
      readTime: "6 min read",
      excerpt: "How I helped grow the developer community in Lagos through meetups and workshops.",
      link: "#"
    }
  ],
  timeline: [
    {
      id: "t1",
      date: "September 2023",
      title: "Won 'Developer of the Year' at AfricaTech Awards",
      type: "award",
      icon: "award"
    },
    {
      id: "t2",
      date: "July 2023",
      title: "Released AfroCommerce v2.0 with international shipping",
      type: "project",
      icon: "code"
    },
    {
      id: "t3",
      date: "May 2023",
      title: "Spoke at ReactAfrica Conference",
      type: "event",
      icon: "users"
    },
    {
      id: "t4",
      date: "March 2023",
      title: "Published article on Web Accessibility",
      type: "article",
      icon: "book-open"
    },
    {
      id: "t5",
      date: "January 2023",
      title: "Promoted to Senior Frontend Developer",
      type: "career",
      icon: "briefcase"
    },
    {
      id: "t6",
      date: "November 2022",
      title: "Organized Lagos Developer Hackathon",
      type: "event",
      icon: "users"
    }
  ],
  socialLinks: {
    github: "https://github.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    website: "https://example.com",
    email: "chioma@example.com"
  }
};

// Function to get icon for timeline
const getTimelineIcon = (type: string) => {
  switch (type) {
    case "award":
      return <Award className="text-amber-500" />;
    case "project":
      return <Code className="text-afro-blue" />;
    case "event":
      return <Users className="text-afro-green" />;
    case "article":
      return <BookOpen className="text-afro-purple" />;
    case "career":
      return <Briefcase className="text-afro-gold" />;
    default:
      return <Calendar className="text-gray-500" />;
  }
};

const DevProfile = () => {
  const [activeTab, setActiveTab] = useState("projects");
  
  return (
    <MainLayout>
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-afro-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-afro-green/10 rounded-full blur-3xl"></div>
        
        <div className="container py-8 relative">
          {/* Cover Image */}
          <div className="h-64 md:h-80 rounded-2xl overflow-hidden relative mb-20">
            <img
              src={DEV_PROFILE.coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            
            {/* Profile Image */}
            <div className="absolute -bottom-16 left-8 md:left-12">
              <div className="relative">
                <img
                  src={DEV_PROFILE.avatar}
                  alt={DEV_PROFILE.name}
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
                    <h1 className="text-2xl font-bold text-gray-900">{DEV_PROFILE.name}</h1>
                    <p className="text-gray-500">{DEV_PROFILE.username}</p>
                    <p className="mt-3 text-gray-700">{DEV_PROFILE.bio}</p>
                    
                    <div className="flex items-center mt-3 text-sm text-gray-500">
                      <MapPin size={16} className="mr-1" />
                      <span>{DEV_PROFILE.location}</span>
                      <span className="mx-2">•</span>
                      <Calendar size={16} className="mr-1" />
                      <span>Joined {DEV_PROFILE.joinDate}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" className="gap-1 border-afro-purple text-afro-purple hover:bg-afro-purple/10">
                      <Users size={16} />
                      <span>Follow</span>
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1 border-gray-200 text-gray-700 hover:bg-gray-100">
                      <MessageSquare size={16} />
                      <span>Message</span>
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-around mt-6 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">{DEV_PROFILE.followers.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">{DEV_PROFILE.following.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">{DEV_PROFILE.projects.length}</div>
                    <div className="text-xs text-gray-500">Projects</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-afro-purple to-afro-blue bg-clip-text text-transparent">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {DEV_PROFILE.skills.map(skill => (
                    <Badge key={skill} variant="outline" className="bg-afro-purple/5 text-afro-purple border-afro-purple/20">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-afro-purple to-afro-blue bg-clip-text text-transparent">Experience</h2>
                <div className="space-y-4">
                  {DEV_PROFILE.experience.map((exp, index) => (
                    <div key={index} className="relative pl-6 pb-4 border-l-2 border-afro-purple/30 last:border-0">
                      <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-afro-purple"></div>
                      <h3 className="font-medium text-gray-900">{exp.title}</h3>
                      <div className="text-sm text-gray-500">{exp.company} • {exp.period}</div>
                      <p className="mt-1 text-sm text-gray-600">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-afro-purple to-afro-blue bg-clip-text text-transparent">Education</h2>
                <div className="space-y-4">
                  {DEV_PROFILE.education.map((edu, index) => (
                    <div key={index} className="relative pl-6 pb-4 border-l-2 border-afro-purple/30 last:border-0">
                      <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-afro-purple"></div>
                      <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                      <div className="text-sm text-gray-600">{edu.institution} • {edu.year}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-afro-purple to-afro-blue bg-clip-text text-transparent">Connect</h2>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="sm" asChild className="w-full flex items-center justify-center gap-2 border-gray-200 text-gray-700 hover:bg-gray-100">
                    <a href={DEV_PROFILE.socialLinks.github} target="_blank" rel="noopener noreferrer">
                      <Github size={16} />
                      <span>GitHub</span>
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="w-full flex items-center justify-center gap-2 border-gray-200 text-gray-700 hover:bg-gray-100">
                    <a href={DEV_PROFILE.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                      <Twitter size={16} />
                      <span>Twitter</span>
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="w-full flex items-center justify-center gap-2 border-gray-200 text-gray-700 hover:bg-gray-100">
                    <a href={DEV_PROFILE.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin size={16} />
                      <span>LinkedIn</span>
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="w-full flex items-center justify-center gap-2 border-gray-200 text-gray-700 hover:bg-gray-100">
                    <a href={DEV_PROFILE.socialLinks.website} target="_blank" rel="noopener noreferrer">
                      <Globe size={16} />
                      <span>Website</span>
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="w-full col-span-2 flex items-center justify-center gap-2 border-gray-200 text-gray-700 hover:bg-gray-100">
                    <a href={`mailto:${DEV_PROFILE.socialLinks.email}`}>
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
                <TabsList className="w-full bg-white/70 backdrop-blur-sm border border-afro-purple/20 rounded-lg overflow-hidden grid grid-cols-3 mb-6">
                  <TabsTrigger value="projects" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-afro-purple data-[state=active]:to-afro-blue data-[state=active]:text-white">
                    Projects
                  </TabsTrigger>
                  <TabsTrigger value="articles" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-afro-purple data-[state=active]:to-afro-blue data-[state=active]:text-white">
                    Articles
                  </TabsTrigger>
                  <TabsTrigger value="timeline" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-afro-purple data-[state=active]:to-afro-blue data-[state=active]:text-white">
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
                    {DEV_PROFILE.projects.map((project, index) => (
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
                          <h3 className="text-xl font-bold bg-gradient-to-r from-afro-purple to-afro-blue bg-clip-text text-transparent mb-2">
                            {project.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">
                            {project.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.techStack.map(tech => (
                              <Badge key={tech} variant="outline" className="bg-afro-purple/5 text-afro-purple/90 border-afro-purple/10 text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center gap-1 text-amber-500">
                              <Star size={16} />
                              <span>{project.stars}</span>
                            </div>
                            
                            <Button size="sm" variant="outline" asChild className="border-afro-purple text-afro-purple hover:bg-afro-purple/10">
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
                    {DEV_PROFILE.articles.map((article, index) => (
                      <MotionDiv
                        key={article.id}
                        variants={fadeIn(index * 0.1)}
                        className="group bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-afro-purple transition-colors">
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
                          
                          <Button size="sm" variant="outline" asChild className="border-afro-purple text-afro-purple hover:bg-afro-purple/10">
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
                    <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-afro-purple to-afro-blue bg-clip-text text-transparent">Developer Journey</h2>
                    
                    <MotionDiv
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                      className="relative space-y-0 before:absolute before:top-0 before:bottom-0 before:left-[18px] before:w-0.5 before:bg-gradient-to-b before:from-afro-purple before:via-afro-gold before:to-afro-green before:rounded-full"
                    >
                      {DEV_PROFILE.timeline.map((item, index) => (
                        <MotionDiv
                          key={item.id}
                          variants={slideInUp(index * 0.1)}
                          className="relative pl-10 pb-10 last:pb-0"
                        >
                          <div className="absolute left-0 top-0 flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-md border border-afro-purple/20">
                            {getTimelineIcon(item.type)}
                          </div>
                          
                          <div className="text-sm text-gray-500 mb-1">{item.date}</div>
                          <h3 className="text-base font-medium text-gray-900">{item.title}</h3>
                          
                          <div className="mt-2">
                            <Badge variant="outline" className={`
                              ${item.type === 'award' ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}
                              ${item.type === 'project' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                              ${item.type === 'event' ? 'bg-green-50 text-green-700 border-green-200' : ''}
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
};

export default DevProfile;
