
import { MainLayout } from "@/components/layout/MainLayout";
import { ResourceCard } from "@/components/devtools/ResourceCard";
import { ToolsShowcase } from "@/components/devtools/ToolsShowcase";
import { TutorialList } from "@/components/devtools/TutorialList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const DevTools = () => {
  const [activeTab, setActiveTab] = useState("tools");
  
  return (
    <MainLayout>
      <div className="container py-12 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-afro-green/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-afro-blue/10 rounded-full blur-3xl"></div>
        
        <div className="text-center mb-12 relative">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-afro-purple via-afro-gold to-afro-green bg-clip-text text-transparent">
            Developer Tools & Resources
          </h1>
          <p className="text-lg mt-6 text-gray-600 max-w-3xl mx-auto">
            Discover the best tools, libraries, and learning resources to enhance your development workflow.
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 gap-px p-1 bg-white/50 backdrop-blur-sm border border-afro-purple/20 rounded-xl overflow-hidden">
              <TabsTrigger 
                value="tools"
                className="px-8 py-3 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-afro-purple data-[state=active]:to-afro-gold data-[state=active]:text-white"
              >
                Developer Tools
              </TabsTrigger>
              <TabsTrigger 
                value="resources"
                className="px-8 py-3 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-afro-purple data-[state=active]:to-afro-gold data-[state=active]:text-white"
              >
                Learning Resources
              </TabsTrigger>
              <TabsTrigger 
                value="tutorials"
                className="px-8 py-3 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-afro-purple data-[state=active]:to-afro-gold data-[state=active]:text-white"
              >
                Tutorials
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="tools" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ResourceCard 
                title="VS Code"
                description="Lightweight but powerful source code editor"
                image="https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=300&auto=format&fit=crop"
                url="https://code.visualstudio.com/"
                category="Editor"
              />
              <ResourceCard 
                title="GitHub Copilot"
                description="AI pair programmer that helps you write code faster"
                image="https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=300&auto=format&fit=crop"
                url="https://github.com/features/copilot"
                category="AI Tool"
              />
              <ResourceCard 
                title="Figma"
                description="Design, prototype, and collaborate all in the browser"
                image="https://images.unsplash.com/photo-1563986768711-b3bde3dc821e?q=80&w=300&auto=format&fit=crop"
                url="https://www.figma.com/"
                category="Design"
              />
              <ResourceCard 
                title="Vercel"
                description="Platform for frontend frameworks and static sites"
                image="https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?q=80&w=300&auto=format&fit=crop"
                url="https://vercel.com/"
                category="Hosting"
              />
              <ResourceCard 
                title="Supabase"
                description="Open source Firebase alternative"
                image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=300&auto=format&fit=crop"
                url="https://supabase.com/"
                category="Backend"
              />
              <ResourceCard 
                title="Postman"
                description="API platform for building and using APIs"
                image="https://images.unsplash.com/photo-1618749049269-87dda25a2c5e?q=80&w=300&auto=format&fit=crop"
                url="https://www.postman.com/"
                category="API"
              />
            </div>
            
            <div className="mt-8">
              <ToolsShowcase />
            </div>
          </TabsContent>
          
          <TabsContent value="resources" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ResourceCard 
                title="MDN Web Docs"
                description="Resources for developers, by developers"
                image="https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=300&auto=format&fit=crop"
                url="https://developer.mozilla.org/"
                category="Documentation"
              />
              <ResourceCard 
                title="freeCodeCamp"
                description="Learn to code for free with interactive challenges"
                image="https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?q=80&w=300&auto=format&fit=crop"
                url="https://www.freecodecamp.org/"
                category="Learning"
              />
              <ResourceCard 
                title="Frontend Masters"
                description="Expert-led frontend development workshops"
                image="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?q=80&w=300&auto=format&fit=crop"
                url="https://frontendmasters.com/"
                category="Courses"
              />
              <ResourceCard 
                title="CSS-Tricks"
                description="Tips, tricks, and techniques on CSS and beyond"
                image="https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=300&auto=format&fit=crop"
                url="https://css-tricks.com/"
                category="CSS"
              />
              <ResourceCard 
                title="Codecademy"
                description="Interactive coding lessons in various languages"
                image="https://images.unsplash.com/photo-1550063873-ab792950096b?q=80&w=300&auto=format&fit=crop"
                url="https://www.codecademy.com/"
                category="Learning"
              />
              <ResourceCard 
                title="GitHub Learning Lab"
                description="Learn new skills by completing fun, realistic projects"
                image="https://images.unsplash.com/photo-1608306448197-e83633f1261c?q=80&w=300&auto=format&fit=crop"
                url="https://lab.github.com/"
                category="Git"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="tutorials" className="mt-0">
            <TutorialList />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default DevTools;
