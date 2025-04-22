
import { MainLayout } from "@/components/layout/MainLayout";
import { RoadmapCreator } from "@/components/roadmap/RoadmapCreator";
import { RoadmapList } from "@/components/roadmap/RoadmapList";
import { RoadmapDetail } from "@/components/roadmap/RoadmapDetail";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";

const Roadmap = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<string>("browse");
  
  if (id) {
    return (
      <MainLayout>
        <div className="container py-8 lg:py-12">
          <RoadmapDetail />
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
        
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-afro-purple via-afro-gold to-afro-green opacity-10 blur-3xl -z-10"></div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-afro-purple via-afro-gold to-afro-green bg-clip-text text-transparent">
            Developer Roadmaps
          </h1>
          <p className="text-lg mt-6 text-gray-600 max-w-3xl mx-auto">
            Create and share learning paths to help others master new skills. Build a roadmap or explore existing ones.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 bg-white/50 backdrop-blur-sm border border-afro-purple/20">
            <TabsTrigger value="browse" className="text-base py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-afro-purple data-[state=active]:to-afro-gold data-[state=active]:text-white">
              Browse Roadmaps
            </TabsTrigger>
            <TabsTrigger value="create" className="text-base py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-afro-purple data-[state=active]:to-afro-gold data-[state=active]:text-white">
              Create Roadmap
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="browse" className="mt-0">
            <RoadmapList />
          </TabsContent>
          
          <TabsContent value="create" className="mt-0">
            <RoadmapCreator />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Roadmap;
