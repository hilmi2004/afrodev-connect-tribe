
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { MapPlaceholder } from "@/components/meetups/MapPlaceholder";
import { UpcomingMeetups } from "@/components/meetups/UpcomingMeetups";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Meetups = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  
  return (
    <MainLayout>
      <div className="container py-12 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-afro-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-afro-purple/10 rounded-full blur-3xl"></div>
        
        <div className="text-center mb-12 relative">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-afro-purple via-afro-gold to-afro-green bg-clip-text text-transparent">
            Local Tech Meetups
          </h1>
          <p className="text-lg mt-6 text-gray-600 max-w-3xl mx-auto">
            Connect with developers in your area, share knowledge, and grow your network. Find upcoming events or host your own.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="bg-gradient-to-br from-white to-afro-purple/5 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-afro-purple" />
                Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Join a diverse community of developers, designers, and tech enthusiasts.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full hover:bg-afro-purple/10 hover:border-afro-purple">Join the Community</Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-gradient-to-br from-white to-afro-gold/5 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-afro-gold" />
                Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Attend workshops, hackathons, and social gatherings with fellow developers.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full hover:bg-afro-gold/10 hover:border-afro-gold">Explore Events</Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-gradient-to-br from-white to-afro-green/5 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-afro-green" />
                Locations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Find tech events near you or discover new meetup venues in your city.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full hover:bg-afro-green/10 hover:border-afro-green">Find Locations</Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/50 backdrop-blur-sm border border-afro-purple/20">
                <TabsTrigger 
                  value="upcoming"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-afro-purple data-[state=active]:to-afro-gold data-[state=active]:text-white"
                >
                  Upcoming Events
                </TabsTrigger>
                <TabsTrigger 
                  value="past"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-afro-purple data-[state=active]:to-afro-gold data-[state=active]:text-white"
                >
                  Past Events
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming" className="mt-0">
                <UpcomingMeetups />
              </TabsContent>
              
              <TabsContent value="past" className="mt-0">
                <div className="text-center py-8 bg-white/80 backdrop-blur-sm rounded-xl">
                  <p className="text-gray-500">Past events archive coming soon.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-3">
            <div className="rounded-xl overflow-hidden shadow-2xl border-0 h-[500px]">
              <MapPlaceholder />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Meetups;
