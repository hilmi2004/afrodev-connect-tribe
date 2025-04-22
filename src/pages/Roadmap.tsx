
import { MainLayout } from "@/components/layout/MainLayout";
import { RoadmapCreator } from "@/components/roadmap/RoadmapCreator";
import { RoadmapList } from "@/components/roadmap/RoadmapList";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Roadmap = () => {
  const [activeTab, setActiveTab] = useState<string>("browse");
  
  return (
    <MainLayout>
      <div className="container py-8 lg:py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-afro-purple via-afro-gold to-afro-green bg-clip-text text-transparent animate-fade-in">
            Developer Roadmaps
          </h1>
          <p className="text-lg mt-4 text-gray-600 max-w-3xl mx-auto">
            Create and share learning paths to help others master new skills. Build a roadmap or explore existing ones.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="browse" className="text-base py-3">Browse Roadmaps</TabsTrigger>
            <TabsTrigger value="create" className="text-base py-3">Create Roadmap</TabsTrigger>
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
