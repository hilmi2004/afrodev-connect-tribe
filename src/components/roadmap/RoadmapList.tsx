
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Heart, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

interface RoadmapInList {
  id: string;
  title: string;
  description: string;
  author: string;
  likes: number;
  downloads: number;
  image: string;
  steps?: Array<{
    title: string;
    count: number;
  }>;
}

interface RoadmapListProps {
  roadmaps: Array<any>;
}

// Sample roadmap data
const SAMPLE_ROADMAPS = [
  {
    id: "1",
    title: "Full Stack Web Development",
    description: "Complete path from HTML basics to deploying full stack applications with modern frameworks",
    author: "DevMaster",
    likes: 328,
    downloads: 1240,
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=400&auto=format&fit=crop",
    steps: [
      { title: "HTML & CSS Fundamentals", count: 12 },
      { title: "JavaScript Essentials", count: 15 },
      { title: "Frontend Framework (React)", count: 18 },
      { title: "Backend Development", count: 14 },
      { title: "Database Integration", count: 10 }
    ]
  },
  {
    id: "2",
    title: "Mobile App Development with React Native",
    description: "Learn to build cross-platform mobile apps that work seamlessly on iOS and Android devices",
    author: "AppBuilder",
    likes: 253,
    downloads: 876,
    image: "https://images.unsplash.com/photo-1551650992-ee4fd47df41f?q=80&w=400&auto=format&fit=crop",
    steps: [
      { title: "JavaScript & React Fundamentals", count: 14 },
      { title: "React Native Basics", count: 16 },
      { title: "Navigation & State Management", count: 12 },
      { title: "Native APIs & Components", count: 15 },
      { title: "App Store Deployment", count: 8 }
    ]
  },
  {
    id: "3",
    title: "Data Science from Scratch",
    description: "Master data analysis, visualization and machine learning algorithms with practical projects",
    author: "DataWizard",
    likes: 412,
    downloads: 1523,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop",
    steps: [
      { title: "Python Programming", count: 15 },
      { title: "Data Manipulation with Pandas", count: 18 },
      { title: "Data Visualization", count: 14 },
      { title: "Machine Learning Fundamentals", count: 20 },
      { title: "Deep Learning & Neural Networks", count: 16 }
    ]
  },
  {
    id: "4",
    title: "DevOps Engineer Path",
    description: "CI/CD, containerization, and cloud infrastructure mastery for modern software delivery",
    author: "CloudMaster",
    likes: 187,
    downloads: 654,
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=400&auto=format&fit=crop",
    steps: [
      { title: "Linux Administration", count: 16 },
      { title: "Docker & Containerization", count: 18 },
      { title: "Kubernetes Orchestration", count: 22 },
      { title: "CI/CD Pipeline Setup", count: 14 },
      { title: "Cloud Platforms (AWS/Azure)", count: 20 }
    ]
  },
  {
    id: "5",
    title: "Blockchain Development",
    description: "From crypto fundamentals to building decentralized applications on Ethereum and beyond",
    author: "BlockchainBuilder",
    likes: 209,
    downloads: 783,
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=400&auto=format&fit=crop",
    steps: [
      { title: "Blockchain Fundamentals", count: 14 },
      { title: "Smart Contract Development", count: 20 },
      { title: "Ethereum & Solidity", count: 18 },
      { title: "Web3.js Integration", count: 12 },
      { title: "DApp Architecture", count: 16 }
    ]
  },
  {
    id: "6",
    title: "UI/UX Design Journey",
    description: "Master the principles of great user interface and experience design with industry tools",
    author: "DesignPro",
    likes: 347,
    downloads: 1129,
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=400&auto=format&fit=crop",
    steps: [
      { title: "Design Principles", count: 12 },
      { title: "Figma Mastery", count: 16 },
      { title: "User Research Methods", count: 14 },
      { title: "Prototyping & Testing", count: 18 },
      { title: "Design Systems", count: 15 }
    ]
  }
];

export const RoadmapList = ({ roadmaps }: RoadmapListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [displayRoadmaps, setDisplayRoadmaps] = useState(roadmaps.length > 0 ? roadmaps : SAMPLE_ROADMAPS);
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredRoadmaps = displayRoadmaps.filter(roadmap => 
    roadmap.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    roadmap.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDisplayRoadmaps(displayRoadmaps.map(roadmap => 
      roadmap.id === id ? { ...roadmap, likes: roadmap.likes + 1 } : roadmap
    ));
  };

  const handleDownload = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDisplayRoadmaps(displayRoadmaps.map(roadmap => 
      roadmap.id === id ? { ...roadmap, downloads: roadmap.downloads + 1 } : roadmap
    ));
    
    // In a real app, this would trigger a download of the roadmap file
    const roadmap = displayRoadmaps.find(r => r.id === id);
    if (roadmap) {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(roadmap));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", roadmap.title.replace(/\s+/g, '-').toLowerCase() + "-roadmap.json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    }
  };

  const handleRoadmapClick = (id: string) => {
    navigate(`/roadmap/${id}`);
  };

  return (
    <div className="w-full">
      <div className="relative mb-12 max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="Search roadmaps..."
          className="pl-10 py-6 rounded-xl shadow-lg bg-white/80 backdrop-blur-sm border-afro-purple/20 focus-visible:ring-afro-purple"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRoadmaps.map(roadmap => (
          <Card 
            key={roadmap.id} 
            className="group overflow-hidden border-0 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer bg-gradient-to-br from-white to-afro-purple/5"
            onClick={() => handleRoadmapClick(roadmap.id)}
          >
            <div className="h-52 overflow-hidden">
              <img 
                src={roadmap.image} 
                alt={roadmap.title} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl bg-gradient-to-r from-afro-purple to-afro-blue bg-clip-text text-transparent">
                {roadmap.title}
              </CardTitle>
              <CardDescription className="text-sm text-gray-500">
                Created by {roadmap.author}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-gray-600 mb-3">{roadmap.description}</p>
              <div className="space-y-1">
                {roadmap.steps && roadmap.steps.slice(0, 3).map((step, idx) => (
                  <div key={idx} className="flex items-center text-xs">
                    <span className="w-2 h-2 rounded-full bg-afro-purple/70 mr-2"></span>
                    <span className="text-gray-700">{step.title}</span>
                    <span className="ml-auto text-gray-500">{step.count} steps</span>
                  </div>
                ))}
                {roadmap.steps && roadmap.steps.length > 3 && (
                  <p className="text-xs text-afro-purple mt-1">
                    +{roadmap.steps.length - 3} more sections
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 transition-colors hover:text-afro-red"
                onClick={(e) => handleLike(roadmap.id, e)}
              >
                <Heart size={16} className="text-afro-red" />
                <span>{roadmap.likes}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 transition-colors hover:bg-afro-purple/10"
                onClick={(e) => handleDownload(roadmap.id, e)}
              >
                <Download size={16} />
                <span>{roadmap.downloads}</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredRoadmaps.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg text-gray-500">No roadmaps found matching your search.</p>
          <p className="text-gray-400 mt-2">Try a different search or create your own roadmap!</p>
        </div>
      )}
    </div>
  );
};
