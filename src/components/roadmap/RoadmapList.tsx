
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Heart, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

// Sample roadmap data
const SAMPLE_ROADMAPS = [
  {
    id: "1",
    title: "Full Stack Web Development",
    description: "Complete path from HTML basics to deploying full stack applications",
    author: "DevMaster",
    likes: 328,
    downloads: 1240,
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "2",
    title: "Mobile App Development with React Native",
    description: "Learn to build cross-platform mobile apps that work on iOS and Android",
    author: "AppBuilder",
    likes: 253,
    downloads: 876,
    image: "https://images.unsplash.com/photo-1551650992-ee4fd47df41f?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "3",
    title: "Data Science from Scratch",
    description: "Master data analysis, visualization and machine learning",
    author: "DataWizard",
    likes: 412,
    downloads: 1523,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "4",
    title: "DevOps Engineer Path",
    description: "CI/CD, containerization, and cloud infrastructure mastery",
    author: "CloudMaster",
    likes: 187,
    downloads: 654,
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "5",
    title: "Blockchain Development",
    description: "From crypto fundamentals to building dApps on Ethereum",
    author: "BlockchainBuilder",
    likes: 209,
    downloads: 783,
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "6",
    title: "UI/UX Design Journey",
    description: "Master the principles of great user interface and experience design",
    author: "DesignPro",
    likes: 347,
    downloads: 1129,
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=400&auto=format&fit=crop"
  }
];

export const RoadmapList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roadmaps, setRoadmaps] = useState(SAMPLE_ROADMAPS);
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredRoadmaps = roadmaps.filter(roadmap => 
    roadmap.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    roadmap.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking the like button
    setRoadmaps(roadmaps.map(roadmap => 
      roadmap.id === id ? { ...roadmap, likes: roadmap.likes + 1 } : roadmap
    ));
  };

  const handleDownload = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking the download button
    setRoadmaps(roadmaps.map(roadmap => 
      roadmap.id === id ? { ...roadmap, downloads: roadmap.downloads + 1 } : roadmap
    ));
    
    // In a real app, this would trigger a download of the roadmap file
    // For now, just simulate with a toast notification
    const roadmap = roadmaps.find(r => r.id === id);
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
      <div className="relative mb-8 max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="Search roadmaps..."
          className="pl-10 py-3 shadow-md bg-white focus-visible:ring-afro-purple"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoadmaps.map(roadmap => (
          <Card 
            key={roadmap.id} 
            className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
            onClick={() => handleRoadmapClick(roadmap.id)}
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={roadmap.image} 
                alt={roadmap.title} 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">{roadmap.title}</CardTitle>
              <CardDescription className="text-sm text-gray-500">
                Created by {roadmap.author}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-gray-600">{roadmap.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
                onClick={(e) => handleLike(roadmap.id, e)}
              >
                <Heart size={16} className="text-afro-red" />
                <span>{roadmap.likes}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
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
