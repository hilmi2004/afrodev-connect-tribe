
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Award, 
  Star, 
  Heart, 
  ThumbsUp, 
  MessageSquare, 
  ExternalLink, 
  Filter,
  Globe,
  Code
} from "lucide-react";
import { useState } from "react";
import { MotionDiv, MotionCard, fadeIn, slideInRight, slideInLeft, staggerContainer, loadMoreAnimation } from "@/components/ui/motion";
import { AnimatePresence } from "framer-motion";

// Mock data for projects
const FEATURED_PROJECTS = [
  {
    id: "1",
    title: "AfroStream",
    description: "A streaming platform showcasing African content and creators",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1074&auto=format&fit=crop",
    country: "Nigeria",
    techStack: ["React", "Node.js", "MongoDB"],
    likes: 342,
    comments: 28,
    author: {
      name: "Tunde Olaniran",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    featured: true,
    awardWinning: true,
    editorsPick: false
  },
  {
    id: "2",
    title: "SafariPay",
    description: "Mobile payment solution for rural communities in East Africa",
    image: "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?q=80&w=1170&auto=format&fit=crop",
    country: "Kenya",
    techStack: ["Flutter", "Firebase", "Go"],
    likes: 518,
    comments: 47,
    author: {
      name: "Amina Kimathi",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    featured: true,
    awardWinning: true,
    editorsPick: true
  },
  {
    id: "3",
    title: "SahraMap",
    description: "Geolocation and navigation app optimized for the Saharan region",
    image: "https://images.unsplash.com/photo-1520500807577-4f2f6888f310?q=80&w=1170&auto=format&fit=crop",
    country: "Morocco",
    techStack: ["React Native", "GraphQL", "AWS"],
    likes: 276,
    comments: 31,
    author: {
      name: "Youssef El Mansouri",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg"
    },
    featured: true,
    awardWinning: false,
    editorsPick: true
  },
  {
    id: "4",
    title: "EcoTrack",
    description: "Environmental monitoring system for conservation efforts",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1074&auto=format&fit=crop",
    country: "South Africa",
    techStack: ["Vue.js", "Python", "TensorFlow"],
    likes: 405,
    comments: 63,
    author: {
      name: "Thabo Mbeki",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    featured: true,
    awardWinning: true,
    editorsPick: false
  },
  {
    id: "5",
    title: "NileTrade",
    description: "B2B platform connecting small businesses across North Africa",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1169&auto=format&fit=crop",
    country: "Egypt",
    techStack: ["Angular", "Java", "PostgreSQL"],
    likes: 189,
    comments: 24,
    author: {
      name: "Fatima Hassan",
      avatar: "https://randomuser.me/api/portraits/women/67.jpg"
    },
    featured: true,
    awardWinning: false,
    editorsPick: true
  },
  {
    id: "6",
    title: "SolarFarm",
    description: "Management system for community solar energy projects",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1172&auto=format&fit=crop",
    country: "Ghana",
    techStack: ["Svelte", "Python", "Django"],
    likes: 312,
    comments: 42,
    author: {
      name: "Kwame Nkrumah",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg"
    },
    featured: true,
    awardWinning: true,
    editorsPick: true
  }
];

// More projects for load more functionality
const MORE_PROJECTS = [
  {
    id: "7",
    title: "HealthPulse",
    description: "AI-powered health diagnostics for rural communities",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1180&auto=format&fit=crop",
    country: "Rwanda",
    techStack: ["React", "TensorFlow.js", "Node.js"],
    likes: 287,
    comments: 34,
    author: {
      name: "Grace Mutesi",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg"
    },
    featured: false,
    awardWinning: false,
    editorsPick: true
  },
  {
    id: "8",
    title: "AgroConnect",
    description: "Connecting farmers to markets with real-time pricing",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1171&auto=format&fit=crop",
    country: "Senegal",
    techStack: ["React Native", "Firebase", "Express"],
    likes: 329,
    comments: 45,
    author: {
      name: "Amadou Diop",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg"
    },
    featured: false,
    awardWinning: true,
    editorsPick: false
  },
  {
    id: "9",
    title: "EduAccess",
    description: "Education platform tailored for low-bandwidth environments",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1122&auto=format&fit=crop",
    country: "Ethiopia",
    techStack: ["Next.js", "Strapi", "PWA"],
    likes: 412,
    comments: 51,
    author: {
      name: "Selam Mekonen",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg"
    },
    featured: false,
    awardWinning: false,
    editorsPick: true
  }
];

// List of countries for filter
const COUNTRIES = [
  "All Countries", "Nigeria", "Kenya", "South Africa", "Morocco", "Egypt", 
  "Ghana", "Rwanda", "Senegal", "Ethiopia", "Tanzania", "Uganda", "Tunisia"
];

// List of tech stacks for filter
const TECH_STACKS = [
  "All Tech Stacks", "React", "Angular", "Vue.js", "Next.js", "Svelte", 
  "Node.js", "Python", "Java", "Go", "Ruby", "PHP", "Flutter", 
  "React Native", "Swift", "Kotlin", "Firebase", "AWS", "MongoDB", 
  "PostgreSQL", "MySQL", "GraphQL", "REST", "TensorFlow", "Django"
];

const ProjectSpotlight = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedTechStack, setSelectedTechStack] = useState("All Tech Stacks");
  const [displayedProjects, setDisplayedProjects] = useState(FEATURED_PROJECTS);
  const [showMore, setShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLoadMore = () => {
    setIsLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      setDisplayedProjects([...displayedProjects, ...MORE_PROJECTS]);
      setShowMore(true);
      setIsLoading(false);
    }, 1500);
  };
  
  const filterProjects = () => {
    let filtered = [...FEATURED_PROJECTS];
    
    if (selectedTab === "awards") {
      filtered = filtered.filter(project => project.awardWinning);
    } else if (selectedTab === "editorsPick") {
      filtered = filtered.filter(project => project.editorsPick);
    }
    
    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply country filter
    if (selectedCountry !== "All Countries") {
      filtered = filtered.filter(project => project.country === selectedCountry);
    }
    
    // Apply tech stack filter
    if (selectedTechStack !== "All Tech Stacks") {
      filtered = filtered.filter(project => 
        project.techStack.includes(selectedTechStack)
      );
    }
    
    return filtered;
  };
  
  const filteredProjects = filterProjects();
  
  return (
    <MainLayout>
      <div className="relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-afro-purple/10 to-transparent -z-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-afro-green/5 to-transparent -z-10"></div>
        
        <MotionDiv 
          variants={fadeIn()}
          initial="hidden"
          animate="visible"
          className="container py-10 md:py-16"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-afro-purple via-afro-gold to-afro-green bg-clip-text text-transparent">
              Project Spotlight
            </h1>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              Discover innovative tech projects built by African developers, from mobile apps to web platforms solving unique challenges.
            </p>
          </div>
          
          <div className="mb-10">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
                <TabsList className="grid grid-cols-3 bg-white/70 backdrop-blur-sm border border-afro-purple/20 rounded-lg overflow-hidden">
                  <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-afro-purple data-[state=active]:to-afro-gold data-[state=active]:text-white">
                    All Projects
                  </TabsTrigger>
                  <TabsTrigger value="awards" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-afro-purple data-[state=active]:to-afro-gold data-[state=active]:text-white">
                    Award Winners
                  </TabsTrigger>
                  <TabsTrigger value="editorsPick" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-afro-purple data-[state=active]:to-afro-gold data-[state=active]:text-white">
                    Editor's Pick
                  </TabsTrigger>
                </TabsList>
                
                <div className="relative w-full md:w-auto md:min-w-[300px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border-afro-purple/20 focus-visible:ring-afro-purple"
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Filter className="text-afro-purple" size={18} />
                  <span className="text-sm text-gray-600">Filter by:</span>
                </div>
                
                <div className="flex flex-1 flex-col sm:flex-row gap-3">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Globe className="text-afro-purple/70" size={16} />
                    <select
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className="flex-1 rounded-md border border-afro-purple/20 py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-afro-purple bg-white/80"
                    >
                      {COUNTRIES.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Code className="text-afro-purple/70" size={16} />
                    <select
                      value={selectedTechStack}
                      onChange={(e) => setSelectedTechStack(e.target.value)}
                      className="flex-1 rounded-md border border-afro-purple/20 py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-afro-purple bg-white/80"
                    >
                      {TECH_STACKS.map(tech => (
                        <option key={tech} value={tech}>{tech}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              <TabsContent value="all" className="mt-0">
                <ProjectGrid projects={filteredProjects} />
              </TabsContent>
              
              <TabsContent value="awards" className="mt-0">
                <div className="mb-8 p-6 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                    <Award className="h-40 w-40 text-amber-200 opacity-20" />
                  </div>
                  <h2 className="text-2xl font-bold text-amber-800 mb-2">Award-Winning Projects</h2>
                  <p className="text-amber-700 max-w-3xl">
                    These exceptional projects have been recognized for their innovation, technical excellence, and impact on communities across Africa.
                  </p>
                </div>
                <ProjectGrid projects={filteredProjects} />
              </TabsContent>
              
              <TabsContent value="editorsPick" className="mt-0">
                <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                    <Star className="h-40 w-40 text-purple-200 opacity-20" />
                  </div>
                  <h2 className="text-2xl font-bold text-purple-800 mb-2">Editor's Picks</h2>
                  <p className="text-purple-700 max-w-3xl">
                    Handpicked by our editorial team, these projects showcase creativity, excellent execution, and address important challenges in unique ways.
                  </p>
                </div>
                <ProjectGrid projects={filteredProjects} />
              </TabsContent>
            </Tabs>
          </div>
          
          <AnimatePresence>
            {showMore && (
              <MotionDiv
                variants={loadMoreAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
              >
                {MORE_PROJECTS.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </MotionDiv>
            )}
          </AnimatePresence>
          
          {!showMore && (
            <div className="text-center mt-10">
              <Button 
                onClick={handleLoadMore} 
                disabled={isLoading}
                className={`relative overflow-hidden bg-afro-purple hover:bg-afro-purple/90 ${isLoading ? 'animate-pulse' : ''}`}
              >
                {isLoading ? (
                  <>
                    <span className="animate-pulse">Loading...</span>
                    <div className="absolute bottom-0 left-0 h-1 bg-afro-gold animate-[shimmer_2s_infinite]" style={{ width: '100%' }}></div>
                  </>
                ) : (
                  'Show More Projects'
                )}
              </Button>
            </div>
          )}
        </MotionDiv>
      </div>
    </MainLayout>
  );
};

interface ProjectGridProps {
  projects: typeof FEATURED_PROJECTS;
}

const ProjectGrid = ({ projects }: ProjectGridProps) => {
  return (
    <MotionDiv
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {projects.length > 0 ? (
        projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))
      ) : (
        <div className="col-span-full py-20 text-center">
          <p className="text-xl text-gray-500">No projects found matching your criteria.</p>
          <p className="text-gray-400 mt-2">Try adjusting your filters or search term.</p>
        </div>
      )}
    </MotionDiv>
  );
};

interface ProjectCardProps {
  project: typeof FEATURED_PROJECTS[0];
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const isEven = index % 2 === 0;
  
  return (
    <MotionCard
      variants={isEven ? slideInLeft(index * 0.1) : slideInRight(index * 0.1)}
      className="group overflow-hidden rounded-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/90 backdrop-blur-sm"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="absolute top-3 left-3 flex gap-1">
          {project.awardWinning && (
            <div className="bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
              <Award size={12} />
              <span>Award Winner</span>
            </div>
          )}
          
          {project.editorsPick && (
            <div className="bg-purple-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
              <Star size={12} />
              <span>Editor's Pick</span>
            </div>
          )}
        </div>
        
        <div className="absolute top-3 right-3 bg-afro-purple/80 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
          {project.country}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <img 
            src={project.author.avatar} 
            alt={project.author.name} 
            className="w-10 h-10 rounded-full border-2 border-white shadow-md"
          />
          <div>
            <h4 className="font-medium">{project.author.name}</h4>
            <p className="text-xs text-gray-500">Developer</p>
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-afro-purple to-afro-blue bg-clip-text text-transparent group-hover:from-afro-gold group-hover:to-afro-purple transition-all duration-500">
          {project.title}
        </h3>
        
        <p className="text-gray-600 mb-4 text-sm">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-5">
          {project.techStack.map(tech => (
            <span key={tech} className="bg-afro-purple/10 text-afro-purple text-xs py-1 px-2 rounded-full">
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-3">
            <button className="flex items-center gap-1 text-afro-red hover:text-afro-red/80 transition-colors">
              <Heart size={18} />
              <span>{project.likes}</span>
            </button>
            <button className="flex items-center gap-1 text-afro-purple hover:text-afro-purple/80 transition-colors">
              <MessageSquare size={18} />
              <span>{project.comments}</span>
            </button>
          </div>
          
          <Button size="sm" variant="outline" asChild className="border-afro-purple text-afro-purple hover:bg-afro-purple/10 transition-colors">
            <a href="#view-project">
              <ExternalLink size={16} className="mr-1" />
              <span>View</span>
            </a>
          </Button>
        </div>
      </div>
    </MotionCard>
  );
};

export default ProjectSpotlight;
