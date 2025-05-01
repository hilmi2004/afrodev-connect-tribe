
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Send, Image, Smile, Paperclip, MapPin, Users, Calendar } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const members = [
  { id: 1, name: "Adeola Johnson", role: "Frontend Dev", online: true, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
  { id: 2, name: "Michael Osei", role: "UI/UX Designer", online: true, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
  { id: 3, name: "Fatima Mensah", role: "Backend Dev", online: false, image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=200&auto=format&fit=crop" },
  { id: 4, name: "Kwame Nkrumah", role: "Data Scientist", online: true, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" },
  { id: 5, name: "Zara Adu", role: "Mobile Dev", online: false, image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" },
];

const messages = [
  {
    id: 1,
    user: members[1],
    content: "Hello everyone! I'm excited to join this tribe. I'm a UI/UX designer looking to collaborate on web projects.",
    time: "10:23 AM",
  },
  {
    id: 2,
    user: members[0],
    content: "Welcome Michael! We're currently working on a design system for a fintech application. Would you like to contribute?",
    time: "10:25 AM",
  },
  {
    id: 3,
    user: members[3],
    content: "Hey team, just pushed the latest data visualization components to the repo. Please take a look when you get a chance.",
    time: "10:30 AM",
  },
  {
    id: 4,
    user: members[1],
    content: "That sounds great! I'd love to help with the design system. Do you have the Figma files available?",
    time: "10:32 AM",
  },
  {
    id: 5,
    user: members[0],
    content: "Yes, I'll share the Figma link in our resources channel. Also, we have a meeting tomorrow at 2 PM to discuss the next sprint.",
    time: "10:35 AM",
  },
];

const events = [
  { id: 1, title: "Weekly Tribe Standup", date: "Today, 4:00 PM", location: "Google Meet" },
  { id: 2, title: "React Workshop", date: "Tomorrow, 2:00 PM", location: "Community Hub, Nairobi" },
  { id: 3, title: "Code Review Session", date: "Friday, 3:00 PM", location: "Discord" },
];

const resources = [
  { id: 1, title: "Frontend Architecture Doc", type: "document", url: "#" },
  { id: 2, title: "Design System Figma", type: "design", url: "#" },
  { id: 3, title: "API Documentation", type: "document", url: "#" },
  { id: 4, title: "Project Roadmap", type: "spreadsheet", url: "#" },
];

export const TribeChat = () => {
  const [newMessage, setNewMessage] = useState("");
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
      // In a real app, this would send the message to a backend
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <Card className="lg:col-span-3 shadow-lg border-afro-purple/10 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-afro-purple/10 to-afro-gold/10 p-4 flex flex-row justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">Nairobi JS Community</h3>
            <p className="text-sm text-gray-500 flex items-center">
              <MapPin size={12} className="mr-1" /> Nairobi, Kenya • <Users size={12} className="mx-1" /> 24 members
            </p>
          </div>
          <div className="flex -space-x-2">
            {members.slice(0, 4).map((member) => (
              <Avatar key={member.id} className="border-2 border-white w-8 h-8">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </Avatar>
            ))}
            {members.length > 4 && (
              <div className="w-8 h-8 rounded-full bg-afro-purple flex items-center justify-center text-white text-xs border-2 border-white">
                +{members.length - 4}
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <ScrollArea className="h-[400px] p-4">
            <div className="space-y-6">
              {messages.map((message) => (
                <div key={message.id} className="flex gap-3">
                  <Avatar className="w-10 h-10">
                    <img src={message.user.image} alt={message.user.name} className="w-full h-full object-cover" />
                    <span className={`absolute bottom-0 right-0 block w-3 h-3 rounded-full border-2 border-white ${message.user.online ? 'bg-afro-green' : 'bg-gray-400'}`}></span>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-medium text-gray-900">{message.user.name}</h4>
                      <span className="text-xs text-gray-500">{message.time}</span>
                    </div>
                    <p className="text-gray-600">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        
        <CardFooter className="p-4 border-t bg-gray-50">
          <div className="relative w-full flex">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here..."
              className="pr-24"
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <div className="absolute right-0 top-0 h-full flex items-center gap-1 pr-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-afro-purple">
                <Smile size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-afro-purple">
                <Paperclip size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-afro-purple">
                <Image size={18} />
              </Button>
              <Button size="sm" className="bg-afro-purple hover:bg-afro-purple/90" onClick={handleSendMessage}>
                <Send size={14} />
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
      
      <div className="space-y-6">
        <Card className="shadow-md border-afro-purple/10">
          <CardHeader className="bg-gradient-to-r from-afro-purple/10 to-afro-gold/10 p-4">
            <h3 className="text-md font-semibold">Upcoming Events</h3>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <h4 className="font-medium">{event.title}</h4>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <Calendar size={12} />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <MapPin size={12} />
                    <span>{event.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md border-afro-purple/10">
          <CardHeader className="bg-gradient-to-r from-afro-purple/10 to-afro-gold/10 p-4">
            <h3 className="text-md font-semibold">Resources</h3>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-2">
              {resources.map((resource) => (
                <a 
                  key={resource.id}
                  href={resource.url}
                  className="block p-2 hover:bg-gray-50 rounded flex items-center gap-2"
                >
                  <div className="h-8 w-8 bg-afro-purple/10 rounded flex items-center justify-center text-afro-purple">
                    {resource.type === 'document' && <File size={16} />}
                    {resource.type === 'design' && <Image size={16} />}
                    {resource.type === 'spreadsheet' && <Table size={16} />}
                  </div>
                  <span className="text-sm">{resource.title}</span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Missing import
import { File, Table } from "lucide-react";
