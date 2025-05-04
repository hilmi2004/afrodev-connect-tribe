
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { RoadmapCard } from "@/components/roadmap/RoadmapCard";
import { RoadmapDetail } from "@/components/roadmap/RoadmapDetail";
import { RoadmapCreator } from "@/components/roadmap/RoadmapCreator";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  AlertCircle,
  ArrowLeft,
  BookOpen, 
  Filter, 
  Plus, 
  Search, 
  SlidersHorizontal,
  Sparkles
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

// Sample roadmap data
const sampleRoadmaps = [
  {
    id: "frontend-dev",
    title: "Complete Frontend Development Mastery Path 2023",
    description: "From HTML basics to advanced React patterns, everything you need to become a frontend expert",
    author: "Sarah Johnson",
    authorImage: "https://api.dicebear.com/6.x/avataaars/svg?seed=Sarah",
    likes: 328,
    downloads: 1240,
    image: "https://images.unsplash.com/photo-1617042375876-a13e36732a04?q=80&w=2070&auto=format&fit=crop",
    tags: ["HTML", "CSS", "JavaScript", "React", "Frontend"],
    steps: [
      {
        id: 1,
        title: "HTML & CSS Fundamentals",
        description: "Learn the building blocks of the web",
        tags: ["HTML", "CSS", "Basics"],
        links: [
          { title: "MDN Web Docs - HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
          { title: "CSS-Tricks", url: "https://css-tricks.com/" }
        ]
      },
      {
        id: 2,
        title: "JavaScript Essentials",
        description: "Master the core language of web interactivity",
        tags: ["JavaScript", "ES6", "DOM"],
        links: [
          { title: "JavaScript.info", url: "https://javascript.info/" },
          { title: "Eloquent JavaScript Book", url: "https://eloquentjavascript.net/" }
        ]
      },
      {
        id: 3,
        title: "Frontend Framework",
        description: "Learn a modern JavaScript framework",
        tags: ["React", "Vue", "Angular"],
        links: [
          { title: "React Documentation", url: "https://reactjs.org/docs/getting-started.html" },
          { title: "Vue.js Guide", url: "https://vuejs.org/guide/introduction.html" }
        ],
        children: [
          {
            id: "3-1",
            title: "State Management",
            description: "Learn how to manage application state",
            tags: ["Redux", "Vuex", "Context API"],
            links: [
              { title: "Redux Documentation", url: "https://redux.js.org/introduction/getting-started" }
            ]
          }
        ]
      }
    ],
    difficulty: "Intermediate",
    timeToComplete: "8 weeks",
    communityRating: 4.8,
    communitySize: 1580
  },
  {
    id: "backend-dev",
    title: "Backend Development with Node.js & Express",
    description: "Learn to build robust and scalable backend systems with JavaScript",
    author: "Michael Chen",
    authorImage: "https://api.dicebear.com/6.x/avataaars/svg?seed=Michael",
    likes: 256,
    downloads: 876,
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop",
    tags: ["Node.js", "Express", "MongoDB", "REST API", "Backend"],
    steps: [
      {
        id: 1,
        title: "Node.js Basics",
        description: "Getting started with server-side JavaScript",
        tags: ["Node.js", "JavaScript", "Basics"],
        links: [
          { title: "Official Node.js Docs", url: "https://nodejs.org/en/docs/" },
        ]
      }
    ],
    difficulty: "Intermediate",
    timeToComplete: "6 weeks",
    communityRating: 4.5,
    communitySize: 980
  },
  {
    id: "fullstack-dev",
    title: "Full Stack Web Development Bootcamp",
    description: "Comprehensive guide to becoming a full stack developer with MERN stack",
    author: "Jessica Lee",
    authorImage: "https://api.dicebear.com/6.x/avataaars/svg?seed=Jessica",
    likes: 412,
    downloads: 1523,
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
    tags: ["MERN", "MongoDB", "Express", "React", "Node.js", "Full Stack"],
    steps: [
      {
        id: 1,
        title: "Introduction to Web Development",
        description: "Understanding how the web works",
        tags: ["HTTP", "Web Basics"],
        links: [
          { title: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/" },
        ]
      }
    ],
    difficulty: "Advanced",
    timeToComplete: "12 weeks",
    communityRating: 4.9,
    communitySize: 2340
  },
  {
    id: "devops",
    title: "DevOps Engineering Journey",
    description: "Learn the practices, tools, and philosophy of modern DevOps",
    author: "Alex Wong",
    authorImage: "https://api.dicebear.com/6.x/avataaars/svg?seed=Alex",
    likes: 187,
    downloads: 654,
    image: "https://images.unsplash.com/photo-1607743386760-88ac62b89b8a?q=80&w=2070&auto=format&fit=crop",
    tags: ["DevOps", "Docker", "Kubernetes", "CI/CD", "AWS"],
    steps: [
      {
        id: 1,
        title: "Introduction to DevOps",
        description: "Understanding DevOps culture and practices",
        tags: ["DevOps", "Culture"],
        links: [
          { title: "The DevOps Handbook", url: "https://itrevolution.com/book/the-devops-handbook/" },
        ]
      }
    ],
    difficulty: "Advanced",
    timeToComplete: "10 weeks",
    communityRating: 4.6,
    communitySize: 765
  },
  {
    id: "ai-ml",
    title: "Practical Machine Learning and AI",
    description: "From statistical basics to deep learning applications",
    author: "David Smith",
    authorImage: "https://api.dicebear.com/6.x/avataaars/svg?seed=David",
    likes: 348,
    downloads: 1127,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2070&auto=format&fit=crop",
    tags: ["AI", "Machine Learning", "Python", "TensorFlow", "Data Science"],
    steps: [
      {
        id: 1,
        title: "Python for Data Science",
        description: "Learn Python programming for data analysis",
        tags: ["Python", "Numpy", "Pandas"],
        links: [
          { title: "Python Data Science Handbook", url: "https://jakevdp.github.io/PythonDataScienceHandbook/" },
        ]
      }
    ],
    difficulty: "Advanced",
    timeToComplete: "16 weeks",
    communityRating: 4.7,
    communitySize: 1890
  },
  {
    id: "mobile-dev",
    title: "Mobile App Development with React Native",
    description: "Build cross-platform mobile applications with JavaScript",
    author: "Sophie Martinez",
    authorImage: "https://api.dicebear.com/6.x/avataaars/svg?seed=Sophie",
    likes: 276,
    downloads: 923,
    image: "https://images.unsplash.com/photo-1609921141835-710b7fa6e438?q=80&w=2070&auto=format&fit=crop",
    tags: ["React Native", "Mobile", "iOS", "Android", "JavaScript"],
    steps: [
      {
        id: 1,
        title: "React Fundamentals",
        description: "Learn React before diving into React Native",
        tags: ["React", "JavaScript"],
        links: [
          { title: "React Documentation", url: "https://reactjs.org/docs/getting-started.html" },
        ]
      }
    ],
    difficulty: "Intermediate",
    timeToComplete: "8 weeks",
    communityRating: 4.4,
    communitySize: 1240
  },
  {
    id: "web3-blockchain",
    title: "Web3 and Blockchain Development",
    description: "Understand blockchain technology and build decentralized applications",
    author: "Ethan Johnson",
    authorImage: "https://api.dicebear.com/6.x/avataaars/svg?seed=Ethan",
    likes: 209,
    downloads: 783,
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2070&auto=format&fit=crop",
    tags: ["Blockchain", "Smart Contracts", "Ethereum", "Solidity", "Web3"],
    steps: [
      {
        id: 1,
        title: "Blockchain Fundamentals",
        description: "Understanding the basics of blockchain technology",
        tags: ["Blockchain", "Bitcoin", "Cryptocurrency"],
        links: [
          { title: "Bitcoin Whitepaper", url: "https://bitcoin.org/bitcoin.pdf" },
        ]
      }
    ],
    difficulty: "Advanced",
    timeToComplete: "10 weeks",
    communityRating: 4.5,
    communitySize: 580
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design for Developers",
    description: "Learn design principles to create beautiful and functional interfaces",
    author: "Emma Wilson",
    authorImage: "https://api.dicebear.com/6.x/avataaars/svg?seed=Emma",
    likes: 347,
    downloads: 1129,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
    tags: ["UI", "UX", "Design", "Figma", "User Research"],
    steps: [
      {
        id: 1,
        title: "Design Principles",
        description: "Learn the fundamentals of good design",
        tags: ["Design Theory", "Color Theory"],
        links: [
          { title: "Design for Hackers", url: "https://www.amazon.com/Design-Hackers-Reverse-Engineering-Beauty/dp/1119998956" },
        ]
      }
    ],
    difficulty: "Beginner",
    timeToComplete: "6 weeks",
    communityRating: 4.8,
    communitySize: 1570
  }
];

interface RoadmapType {
  id: string;
  title: string;
  description: string;
  author?: string;
  authorImage?: string;
  likes?: number;
  downloads?: number;
  image?: string;
  tags?: string[];
  steps: Array<{
    id: number | string;
    title: string;
    description: string;
    tags?: string[];
    links: Array<{ title: string; url: string }>;
    children?: any[];
  }>;
  difficulty?: string;
  timeToComplete?: string;
  communityRating?: number;
  communitySize?: number;
}

const Roadmap = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("explore");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [difficultyFilter, setDifficultyFilter] = useState<string[]>([]);
  const [currentRoadmap, setCurrentRoadmap] = useState<RoadmapType | null>(null);
  const [roadmapNotFound, setRoadmapNotFound] = useState<boolean>(false);
  
  // Filter categories from all roadmaps
  const allCategories = Array.from(
    new Set(sampleRoadmaps.flatMap(roadmap => roadmap.tags || []))
  );
  
  useEffect(() => {
    if (id) {
      const foundRoadmap = sampleRoadmaps.find(roadmap => roadmap.id === id);
      if (foundRoadmap) {
        setCurrentRoadmap(foundRoadmap);
        setRoadmapNotFound(false);
      } else {
        setRoadmapNotFound(true);
        setCurrentRoadmap(null);
      }
    } else {
      setRoadmapNotFound(false);
      setCurrentRoadmap(null);
    }
  }, [id]);
  
  const filteredRoadmaps = sampleRoadmaps.filter(roadmap => {
    // Apply search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const inTitle = roadmap.title.toLowerCase().includes(searchLower);
      const inDesc = roadmap.description.toLowerCase().includes(searchLower);
      const inTags = roadmap.tags?.some(tag => tag.toLowerCase().includes(searchLower)) || false;
      
      if (!(inTitle || inDesc || inTags)) {
        return false;
      }
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      const hasCategory = roadmap.tags?.some(tag => selectedCategories.includes(tag)) || false;
      if (!hasCategory) {
        return false;
      }
    }
    
    // Apply difficulty filter
    if (difficultyFilter.length > 0 && roadmap.difficulty) {
      if (!difficultyFilter.includes(roadmap.difficulty)) {
        return false;
      }
    }
    
    return true;
  });
  
  const toggleCategoryFilter = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  const toggleDifficultyFilter = (difficulty: string) => {
    if (difficultyFilter.includes(difficulty)) {
      setDifficultyFilter(difficultyFilter.filter(d => d !== difficulty));
    } else {
      setDifficultyFilter([...difficultyFilter, difficulty]);
    }
  };
  
  const clearAllFilters = () => {
    setSelectedCategories([]);
    setDifficultyFilter([]);
    setSearchQuery("");
  };

  // Return roadmap detail view if ID is provided
  if (id) {
    return (
      <MainLayout>
        <div className="container py-8 max-w-7xl">
          {roadmapNotFound ? (
            <Alert className="bg-red-50 border-red-200 mb-6">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <AlertTitle className="text-red-800">Roadmap Not Found</AlertTitle>
              <AlertDescription className="text-red-700">
                We couldn't find the roadmap you're looking for. Please check the URL or browse our available roadmaps.
              </AlertDescription>
              <Button 
                onClick={() => navigate("/roadmap")} 
                className="mt-4 bg-afro-purple hover:bg-afro-purple/90"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Roadmaps
              </Button>
            </Alert>
          ) : (
            currentRoadmap && <RoadmapDetail roadmap={currentRoadmap} />
          )}
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container py-8 max-w-7xl">
        <div className="relative overflow-hidden">
          {/* Hero Section */}
          <div className="text-center mb-12 relative py-12">
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-afro-purple/5 via-afro-gold/5 to-afro-green/5"></div>
            <div className="absolute top-0 left-0 w-full h-full -z-20 opacity-10">
              <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-afro-purple blur-3xl"></div>
              <div className="absolute bottom-10 left-20 w-72 h-72 rounded-full bg-afro-gold blur-3xl"></div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-afro-purple via-afro-gold to-afro-green bg-clip-text text-transparent leading-tight">
              Developer Roadmaps
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
              Discover guided learning paths created by experts to help you master new technologies and advance your career in tech
            </p>
          </div>
          
          {/* Main Tabs */}
          <Tabs defaultValue="explore" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-transparent border-b border-gray-200 p-0 mb-6">
              <div className="flex justify-between w-full">
                <div className="flex gap-1">
                  <TabsTrigger 
                    value="explore" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-afro-purple data-[state=active]:text-afro-purple rounded-none border-b-2 border-transparent px-4 py-2 -mb-px text-gray-600 hover:text-afro-purple/80 transition-all"
                  >
                    <BookOpen size={18} className="mr-2" />
                    Explore Roadmaps
                  </TabsTrigger>
                  
                  <TabsTrigger 
                    value="create" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-afro-purple data-[state=active]:text-afro-purple rounded-none border-b-2 border-transparent px-4 py-2 -mb-px text-gray-600 hover:text-afro-purple/80 transition-all"
                  >
                    <Plus size={18} className="mr-2" />
                    Create Roadmap
                  </TabsTrigger>
                </div>
              </div>
            </TabsList>
            
            <TabsContent value="explore" className="mt-0 animate-in fade-in-50">
              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Search roadmaps by title, tags, or description..."
                    className="pl-10 py-6 bg-white shadow-md border-gray-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2 whitespace-nowrap shadow-md border-gray-200">
                      <Filter size={16} />
                      Filter
                      {(selectedCategories.length > 0 || difficultyFilter.length > 0) && (
                        <Badge className="bg-afro-purple ml-1 text-xs">
                          {selectedCategories.length + difficultyFilter.length}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64">
                    <DropdownMenuLabel>Filter Roadmaps</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                        <span>Categories</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent className="max-h-72 overflow-y-auto">
                          <DropdownMenuGroup>
                            {allCategories.map((category, idx) => (
                              <DropdownMenuItem key={idx} onSelect={(e) => {
                                e.preventDefault();
                                toggleCategoryFilter(category);
                              }} className="flex items-center gap-2 cursor-pointer">
                                <div className="flex items-center h-4 w-4">
                                  <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(category)}
                                    onChange={() => {}}
                                    className="h-4 w-4 rounded border-gray-300 text-afro-purple focus:ring-afro-purple"
                                  />
                                </div>
                                <span>{category}</span>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuGroup>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <Sparkles className="mr-2 h-4 w-4" />
                        <span>Difficulty</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuGroup>
                            {["Beginner", "Intermediate", "Advanced"].map((difficulty, idx) => (
                              <DropdownMenuItem key={idx} onSelect={(e) => {
                                e.preventDefault();
                                toggleDifficultyFilter(difficulty);
                              }} className="flex items-center gap-2 cursor-pointer">
                                <div className="flex items-center h-4 w-4">
                                  <input
                                    type="checkbox"
                                    checked={difficultyFilter.includes(difficulty)}
                                    onChange={() => {}}
                                    className="h-4 w-4 rounded border-gray-300 text-afro-purple focus:ring-afro-purple"
                                  />
                                </div>
                                <span>{difficulty}</span>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuGroup>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onSelect={(e) => {
                        e.preventDefault();
                        clearAllFilters();
                      }}
                      className="text-center justify-center text-red-600 hover:text-red-700 cursor-pointer"
                    >
                      Clear All Filters
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button 
                  className="bg-afro-purple hover:bg-afro-purple/90 shadow-md flex-shrink-0"
                  onClick={() => setActiveTab("create")}
                >
                  <Plus size={18} className="mr-2" />
                  Create Roadmap
                </Button>
              </div>
              
              {/* Active Filters */}
              {(selectedCategories.length > 0 || difficultyFilter.length > 0) && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedCategories.map((category, idx) => (
                    <Badge key={idx} variant="outline" className="px-3 py-1 gap-1 border-afro-purple text-afro-purple bg-afro-purple/5">
                      {category}
                      <button 
                        className="ml-1 text-afro-purple/70 hover:text-afro-purple"
                        onClick={() => toggleCategoryFilter(category)}
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                  
                  {difficultyFilter.map((difficulty, idx) => (
                    <Badge key={idx} variant="outline" className="px-3 py-1 gap-1 border-afro-green text-afro-green bg-afro-green/5">
                      {difficulty}
                      <button 
                        className="ml-1 text-afro-green/70 hover:text-afro-green"
                        onClick={() => toggleDifficultyFilter(difficulty)}
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                  
                  <button 
                    className="text-sm text-gray-500 hover:text-afro-purple underline underline-offset-2"
                    onClick={clearAllFilters}
                  >
                    Clear all
                  </button>
                </div>
              )}
              
              {/* Roadmap Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {filteredRoadmaps.length > 0 ? (
                  <>
                    <div className="md:col-span-2 lg:col-span-3">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Featured Roadmaps</h2>
                    </div>
                    
                    {filteredRoadmaps.slice(0, 1).map(roadmap => (
                      <RoadmapCard key={roadmap.id} roadmap={roadmap} featured={true} />
                    ))}
                    
                    {filteredRoadmaps.slice(1, 3).map(roadmap => (
                      <RoadmapCard key={roadmap.id} roadmap={roadmap} />
                    ))}
                    
                    <div className="md:col-span-2 lg:col-span-3 mt-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">All Roadmaps</h2>
                    </div>
                    
                    {filteredRoadmaps.slice(3).map(roadmap => (
                      <RoadmapCard key={roadmap.id} roadmap={roadmap} />
                    ))}
                  </>
                ) : (
                  <div className="col-span-full text-center py-20">
                    <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
                      <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">No roadmaps found</h3>
                      <p className="text-gray-600 mb-6">
                        We couldn't find any roadmaps matching your search criteria. Try adjusting your filters or create your own roadmap.
                      </p>
                      <Button onClick={clearAllFilters} variant="outline" className="mr-2">
                        Clear Filters
                      </Button>
                      <Button onClick={() => setActiveTab("create")} className="bg-afro-purple hover:bg-afro-purple/90">
                        Create Roadmap
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="create" className="mt-0 animate-in fade-in-50">
              <RoadmapCreator />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default Roadmap;
