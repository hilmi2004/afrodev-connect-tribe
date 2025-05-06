
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Heart, Link } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Define the interface for the roadmap prop
interface RoadmapType {
  id: string;
  title: string;
  description: string;
  author?: string;
  likes?: number;
  downloads?: number;
  image?: string;
  steps: Array<{
    id: number | string;
    title: string;
    description: string;
    tags?: string[];
    links: Array<{ title: string; url: string }>;
    children?: Array<{
      id: string | number;
      title: string;
      description: string;
      tags?: string[];
      links: Array<{ title: string; url: string }>;
      children?: any[];
    }>;
  }>;
}

interface RoadmapDetailProps {
  roadmap: RoadmapType;
}

// Sample roadmap data (in a real app, this would come from an API)
const SAMPLE_ROADMAPS = [
  {
    id: "1",
    title: "Full Stack Web Development",
    description: "Complete path from HTML basics to deploying full stack applications",
    author: "DevMaster",
    likes: 328,
    downloads: 1240,
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=400&auto=format&fit=crop",
    steps: [
      {
        id: "1-1",
        title: "HTML & CSS Fundamentals",
        description: "Master the building blocks of web pages",
        links: [
          { url: "https://developer.mozilla.org/en-US/docs/Learn/HTML", title: "MDN HTML Guide" },
          { url: "https://css-tricks.com/", title: "CSS Tricks" }
        ],
        children: [
          {
            id: "1-1-1",
            title: "Learn Semantic HTML",
            description: "Understand how to structure your HTML with meaning",
            links: [
              { url: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure", title: "Semantic HTML Guide" }
            ],
            children: []
          }
        ]
      },
      {
        id: "1-2",
        title: "JavaScript Basics",
        description: "Learn the core language for web interactivity",
        links: [
          { url: "https://javascript.info/", title: "JavaScript.info" }
        ],
        children: []
      },
      {
        id: "1-3",
        title: "Frontend Frameworks",
        description: "Learn React, Vue, or Angular",
        links: [
          { url: "https://react.dev/", title: "React Documentation" }
        ],
        children: []
      },
      {
        id: "1-4",
        title: "Backend Development",
        description: "Build server-side applications with Node.js",
        links: [
          { url: "https://nodejs.org/en/docs/", title: "Node.js Documentation" }
        ],
        children: []
      }
    ]
  },
  {
    id: "2",
    title: "Mobile App Development with React Native",
    description: "Learn to build cross-platform mobile apps that work on iOS and Android",
    author: "AppBuilder",
    likes: 253,
    downloads: 876,
    image: "https://images.unsplash.com/photo-1551650992-ee4fd47df41f?q=80&w=400&auto=format&fit=crop",
    steps: [
      {
        id: "2-1",
        title: "JavaScript & React Basics",
        description: "Learn the fundamentals of JavaScript and React",
        links: [
          { url: "https://react.dev/", title: "React Documentation" }
        ],
        children: []
      },
      {
        id: "2-2",
        title: "React Native Fundamentals",
        description: "Understand the core concepts of React Native",
        links: [
          { url: "https://reactnative.dev/docs/getting-started", title: "React Native Documentation" }
        ],
        children: []
      }
    ]
  },
  {
    id: "3",
    title: "Data Science from Scratch",
    description: "Master data analysis, visualization and machine learning",
    author: "DataWizard",
    likes: 412,
    downloads: 1523,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop",
    steps: [
      {
        id: "3-1",
        title: "Python Fundamentals",
        description: "Learn the Python programming language",
        links: [
          { url: "https://docs.python.org/3/tutorial/", title: "Python Documentation" }
        ],
        children: []
      },
      {
        id: "3-2",
        title: "Data Analysis with Pandas",
        description: "Learn to analyze data with Pandas",
        links: [
          { url: "https://pandas.pydata.org/docs/", title: "Pandas Documentation" }
        ],
        children: []
      }
    ]
  },
  {
    id: "4",
    title: "DevOps Engineer Path",
    description: "CI/CD, containerization, and cloud infrastructure mastery",
    author: "CloudMaster",
    likes: 187,
    downloads: 654,
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=400&auto=format&fit=crop",
    steps: [
      {
        id: "4-1",
        title: "Linux Fundamentals",
        description: "Learn the basics of Linux",
        links: [
          { url: "https://www.linux.org/", title: "Linux Documentation" }
        ],
        children: []
      }
    ]
  },
  {
    id: "5",
    title: "Blockchain Development",
    description: "From crypto fundamentals to building dApps on Ethereum",
    author: "BlockchainBuilder",
    likes: 209,
    downloads: 783,
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=400&auto=format&fit=crop",
    steps: [
      {
        id: "5-1",
        title: "Blockchain Fundamentals",
        description: "Understand the basics of blockchain technology",
        links: [
          { url: "https://ethereum.org/en/developers/docs/", title: "Ethereum Documentation" }
        ],
        children: []
      }
    ]
  },
  {
    id: "6",
    title: "UI/UX Design Journey",
    description: "Master the principles of great user interface and experience design",
    author: "DesignPro",
    likes: 347,
    downloads: 1129,
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=400&auto=format&fit=crop",
    steps: [
      {
        id: "6-1",
        title: "Design Fundamentals",
        description: "Learn the basics of design",
        links: [
          { url: "https://www.figma.com/resources/learn-design/", title: "Figma Design Resources" }
        ],
        children: []
      }
    ]
  }
];

export const RoadmapDetail = ({ roadmap }: RoadmapDetailProps) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    // In a real app, this would update the API
  };

  const handleDownload = () => {
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

  return (
    <div className="max-w-5xl mx-auto">
      <Button 
        onClick={() => navigate("/roadmap")} 
        variant="ghost" 
        className="mb-4 -ml-2 text-gray-600 hover:text-afro-purple transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Roadmaps
      </Button>
      
      <div className="relative rounded-2xl overflow-hidden h-80 mb-6 shadow-2xl group">
        <img 
          src={roadmap.image} 
          alt={roadmap.title} 
          className="w-full h-full object-cover transition-transform duration-10000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
          <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-white to-afro-purple bg-clip-text text-transparent">
            {roadmap.title}
          </h1>
          <p className="text-white/90 mt-2">Created by {roadmap.author || "Anonymous"}</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-12 p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
        <p className="text-lg text-gray-700">{roadmap.description}</p>
        <div className="flex gap-4">
          <Button
            onClick={handleLike}
            variant={liked ? "default" : "outline"}
            size="sm"
            className={`flex items-center gap-1 transition-all ${liked ? 'bg-afro-red text-white hover:bg-afro-red/90' : 'hover:border-afro-red hover:text-afro-red'}`}
          >
            <Heart size={16} className={liked ? "text-white" : "text-afro-red"} />
            <span>{liked ? (roadmap.likes || 0) + 1 : (roadmap.likes || 0)}</span>
          </Button>
          <Button
            onClick={handleDownload}
            variant="outline"
            size="sm"
            className="flex items-center gap-1 hover:bg-afro-purple/10 hover:border-afro-purple transition-colors"
          >
            <Download size={16} />
            <span>Download</span>
          </Button>
        </div>
      </div>
      
      <div className="relative space-y-12 mt-16 before:absolute before:top-0 before:bottom-0 before:left-[28px] before:w-1 before:bg-gradient-to-b before:from-afro-purple before:to-afro-green before:-z-10 before:rounded-full">
        {roadmap.steps.map((step: any, index: number) => (
          <RoadmapStep key={step.id} step={step} index={index + 1} />
        ))}
      </div>
    </div>
  );
};

interface RoadmapStepProps {
  step: any;
  index: number;
  isChild?: boolean;
}

const RoadmapStep = ({ step, index, isChild = false }: RoadmapStepProps) => {
  return (
    <div className={`relative ${isChild ? "ml-16 mt-8" : ""}`}>
      {!isChild && (
        <div className="absolute h-12 w-12 -left-6 -top-6 rounded-full bg-gradient-to-br from-afro-purple to-afro-gold opacity-20 animate-pulse" />
      )}
      
      <Card className="border-afro-purple/20 hover:border-afro-purple/50 transition-all duration-300 hover:shadow-lg hover:shadow-afro-purple/10 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-afro-purple to-afro-gold text-white flex items-center justify-center font-medium shadow-lg">
              {index}
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-afro-purple to-afro-gold bg-clip-text text-transparent">
              {step.title}
            </h3>
          </div>
          
          <p className="mt-3 text-gray-600 pl-14">{step.description}</p>
          
          {step.links && step.links.length > 0 && (
            <div className="mt-4 space-y-2 pl-14">
              <h4 className="text-sm font-medium text-gray-500">Resources:</h4>
              <ul className="space-y-1 bg-afro-purple/5 p-3 rounded-lg">
                {step.links.map((link: any, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Link size={14} className="text-afro-purple" />
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-afro-purple hover:underline transition-all hover:text-afro-gold"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
      
      {step.children && step.children.length > 0 && (
        <div className="pl-6 border-l-2 border-dashed border-afro-purple/20 ml-5 space-y-8 mt-4">
          {step.children.map((childStep: any, childIndex: number) => (
            <RoadmapStep
              key={childStep.id}
              step={childStep}
              index={index + (childIndex + 1) / 10}
              isChild={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};
