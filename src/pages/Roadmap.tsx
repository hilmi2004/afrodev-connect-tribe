
import { MainLayout } from "@/components/layout/MainLayout";
import { EnhancedRoadmapCreator } from "@/components/roadmap/EnhancedRoadmapCreator";
import { RoadmapList } from "@/components/roadmap/RoadmapList";
import { RoadmapDetail } from "@/components/roadmap/RoadmapDetail";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, useNavigate } from "react-router-dom";
import { MotionDiv, fadeIn, slideInUp } from "@/components/ui/motion";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Sample roadmap data - in a real app, this would come from an API or database
const sampleRoadmaps = [
  {
    id: "frontend-dev",
    title: "Frontend Development Path",
    description: "Complete guide to becoming a frontend developer",
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
    ]
  },
  {
    id: "backend-dev",
    title: "Backend Development Path",
    description: "Complete guide to becoming a backend developer",
    steps: [
      {
        id: 1,
        title: "Programming Language Basics",
        description: "Choose and learn a backend language",
        tags: ["Node.js", "Python", "Java", "C#"],
        links: [
          { title: "Node.js Documentation", url: "https://nodejs.org/en/docs/" },
          { title: "Python Tutorial", url: "https://docs.python.org/3/tutorial/" }
        ]
      },
      {
        id: 2,
        title: "Databases",
        description: "Learn database concepts and implementation",
        tags: ["SQL", "NoSQL", "PostgreSQL", "MongoDB"],
        links: [
          { title: "PostgreSQL Documentation", url: "https://www.postgresql.org/docs/" },
          { title: "MongoDB University", url: "https://university.mongodb.com/" }
        ]
      }
    ]
  }
];

const Roadmap = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("browse");
  const [currentRoadmap, setCurrentRoadmap] = useState<any>(null);
  const [roadmapNotFound, setRoadmapNotFound] = useState<boolean>(false);
  
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
  
  if (id) {
    return (
      <MainLayout>
        <div className="container py-8 lg:py-12">
          {roadmapNotFound ? (
            <MotionDiv 
              initial="hidden"
              animate="visible"
              variants={fadeIn()}
              className="max-w-3xl mx-auto"
            >
              <Alert className="bg-afro-purple/10 border-afro-purple mb-6">
                <AlertTitle className="text-xl font-bold">Roadmap Not Found</AlertTitle>
                <AlertDescription className="mt-2">
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
            </MotionDiv>
          ) : (
            currentRoadmap && <RoadmapDetail roadmap={currentRoadmap} />
          )}
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container py-8 lg:py-12 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-afro-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-afro-green/10 rounded-full blur-3xl"></div>
        
        <MotionDiv 
          initial="hidden"
          animate="visible"
          variants={fadeIn()}
          className="text-center mb-12 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-afro-purple via-afro-gold to-afro-green opacity-10 blur-3xl -z-10"></div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-afro-purple via-afro-gold to-afro-green bg-clip-text text-transparent">
            Developer Roadmaps
          </h1>
          <p className="text-lg mt-6 text-gray-600 max-w-3xl mx-auto">
            Create and share learning paths to help others master new skills. Build a roadmap or explore existing ones.
          </p>
        </MotionDiv>

        <Tabs defaultValue="browse" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 bg-white/50 backdrop-blur-sm border border-afro-purple/20 shadow-lg overflow-hidden rounded-xl">
            <TabsTrigger value="browse" className="text-base py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-afro-purple data-[state=active]:to-afro-gold data-[state=active]:text-white">
              Browse Roadmaps
            </TabsTrigger>
            <TabsTrigger value="create" className="text-base py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-afro-purple data-[state=active]:to-afro-gold data-[state=active]:text-white">
              Create Roadmap
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="browse" className="mt-0">
            <RoadmapList roadmaps={sampleRoadmaps} />
          </TabsContent>
          
          <TabsContent value="create" className="mt-0">
            <EnhancedRoadmapCreator />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Roadmap;
