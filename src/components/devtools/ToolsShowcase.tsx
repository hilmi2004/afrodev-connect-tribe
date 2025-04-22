
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";

const CATEGORIES = ["All", "Frontend", "Backend", "Design", "DevOps", "Mobile"];

const TOOLS = [
  { name: "React", category: "Frontend", icon: "⚛️" },
  { name: "Vue.js", category: "Frontend", icon: "🟢" },
  { name: "Angular", category: "Frontend", icon: "🔴" },
  { name: "Next.js", category: "Frontend", icon: "▲" },
  { name: "Node.js", category: "Backend", icon: "🟢" },
  { name: "Express", category: "Backend", icon: "🚂" },
  { name: "Django", category: "Backend", icon: "🐍" },
  { name: "Laravel", category: "Backend", icon: "🔺" },
  { name: "Figma", category: "Design", icon: "🎨" },
  { name: "Sketch", category: "Design", icon: "💎" },
  { name: "Docker", category: "DevOps", icon: "🐳" },
  { name: "Kubernetes", category: "DevOps", icon: "☸️" },
  { name: "GitHub Actions", category: "DevOps", icon: "🔄" },
  { name: "React Native", category: "Mobile", icon: "📱" },
  { name: "Flutter", category: "Mobile", icon: "🦋" },
  { name: "Swift", category: "Mobile", icon: "🍎" }
];

export const ToolsShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const filteredTools = selectedCategory === "All" 
    ? TOOLS 
    : TOOLS.filter(tool => tool.category === selectedCategory);
    
  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {CATEGORIES.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category 
              ? "bg-afro-purple hover:bg-afro-purple/90" 
              : "hover:bg-afro-purple/10 hover:border-afro-purple"
            }
          >
            {category}
          </Button>
        ))}
      </div>
      
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredTools.map(tool => (
              <div 
                key={tool.name}
                className="flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-gradient-to-r hover:from-afro-purple/5 hover:to-afro-gold/5 transition-colors cursor-pointer border border-gray-100 hover:border-afro-purple/20 shadow-sm"
              >
                <div className="text-2xl">{tool.icon}</div>
                <div>
                  <p className="font-medium text-gray-800">{tool.name}</p>
                  <p className="text-xs text-gray-500">{tool.category}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button className="bg-gradient-to-r from-afro-purple via-afro-gold to-afro-green text-white hover:from-afro-green hover:via-afro-gold hover:to-afro-purple transition-all duration-500">
              <Code className="mr-2 h-4 w-4" />
              View All Developer Tools
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
