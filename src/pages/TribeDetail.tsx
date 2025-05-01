
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { TribeChat } from "@/components/tribes/TribeChat";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Users, 
  Calendar, 
  FileText, 
  Settings, 
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TribeDetail = () => {
  const navigate = useNavigate();
  
  return (
    <MainLayout>
      <div className="container py-8 relative">
        {/* Background elements */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-afro-purple/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-afro-green/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/tribes")} 
            className="flex items-center gap-2 text-gray-600 hover:text-afro-purple"
          >
            <ArrowLeft size={16} />
            Back to Tribes
          </Button>
        </div>
        
        <div className="mb-8">
          <div className="h-48 rounded-xl bg-gradient-to-r from-afro-purple to-afro-gold relative overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1653564142048-d5af2cf9b50f?q=80&w=1930&auto=format&fit=crop" 
              alt="Tribe banner"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-afro-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white">Nairobi JS Community</h1>
              <p className="text-white/80">JavaScript developers in Nairobi focusing on web and mobile app development</p>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="chat" className="space-y-8">
          <TabsList className="bg-white/50 backdrop-blur-sm border border-afro-purple/10 p-1 shadow">
            <TabsTrigger value="chat" className="data-[state=active]:bg-afro-purple data-[state=active]:text-white">
              <MessageSquare size={16} className="mr-2" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="members" className="data-[state=active]:bg-afro-purple data-[state=active]:text-white">
              <Users size={16} className="mr-2" />
              Members
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-afro-purple data-[state=active]:text-white">
              <Calendar size={16} className="mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-afro-purple data-[state=active]:text-white">
              <FileText size={16} className="mr-2" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-afro-purple data-[state=active]:text-white">
              <Settings size={16} className="mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="mt-6">
            <TribeChat />
          </TabsContent>
          
          <TabsContent value="members">
            <div className="text-center p-12 text-gray-500">
              <Users size={48} className="mx-auto mb-4 opacity-50" />
              <p>Members tab content will go here</p>
            </div>
          </TabsContent>
          
          <TabsContent value="events">
            <div className="text-center p-12 text-gray-500">
              <Calendar size={48} className="mx-auto mb-4 opacity-50" />
              <p>Events tab content will go here</p>
            </div>
          </TabsContent>
          
          <TabsContent value="resources">
            <div className="text-center p-12 text-gray-500">
              <FileText size={48} className="mx-auto mb-4 opacity-50" />
              <p>Resources tab content will go here</p>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="text-center p-12 text-gray-500">
              <Settings size={48} className="mx-auto mb-4 opacity-50" />
              <p>Settings tab content will go here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default TribeDetail;
