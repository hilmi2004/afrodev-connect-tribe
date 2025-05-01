
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Send, Image, Smile, Paperclip, MapPin, Users, Calendar, Hash, PlusCircle, AtSign, Bookmark, Settings, Volume2, Bell } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const members = [
  { id: 1, name: "Adeola Johnson", role: "Frontend Dev", online: true, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
  { id: 2, name: "Michael Osei", role: "UI/UX Designer", online: true, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
  { id: 3, name: "Fatima Mensah", role: "Backend Dev", online: false, image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=200&auto=format&fit=crop" },
  { id: 4, name: "Kwame Nkrumah", role: "Data Scientist", online: true, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" },
  { id: 5, name: "Zara Adu", role: "Mobile Dev", online: false, image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" },
];

const channels = [
  { id: 1, name: "general", unread: true },
  { id: 2, name: "random", unread: false },
  { id: 3, name: "help", unread: false },
  { id: 4, name: "project-updates", unread: true },
  { id: 5, name: "resources", unread: false },
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
  const [activeChannel, setActiveChannel] = useState(1);
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
      // In a real app, this would send the message to a backend
    }
  };

  return (
    <div className="grid grid-cols-12 gap-0 h-[600px] overflow-hidden shadow-lg border border-afro-purple/10 rounded-lg">
      {/* Discord-like sidebar - Channels */}
      <div className="col-span-2 bg-gray-800 text-white p-0 flex flex-col">
        <div className="p-4 bg-gray-900 shadow">
          <h3 className="text-md font-semibold truncate">Nairobi JS Community</h3>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-2">
            <div className="flex items-center justify-between px-2 py-2 text-xs font-semibold text-gray-400 uppercase">
              <span>Text Channels</span>
              <PlusCircle size={14} className="cursor-pointer hover:text-white" />
            </div>
            
            {channels.map((channel) => (
              <div 
                key={channel.id} 
                className={`flex items-center px-2 py-1.5 rounded cursor-pointer ${
                  activeChannel === channel.id 
                    ? "bg-gray-600" 
                    : "hover:bg-gray-700"
                }`}
                onClick={() => setActiveChannel(channel.id)}
              >
                <Hash size={16} className="mr-1.5 text-gray-400" />
                <span className="truncate">{channel.name}</span>
                {channel.unread && (
                  <div className="ml-auto w-2 h-2 bg-afro-purple rounded-full"></div>
                )}
              </div>
            ))}
            
            <div className="mt-4 flex items-center justify-between px-2 py-2 text-xs font-semibold text-gray-400 uppercase">
              <span>Voice Channels</span>
              <PlusCircle size={14} className="cursor-pointer hover:text-white" />
            </div>
            
            <div className="flex items-center px-2 py-1.5 rounded hover:bg-gray-700 cursor-pointer">
              <Volume2 size={16} className="mr-1.5 text-gray-400" />
              <span className="truncate">General Voice</span>
            </div>
          </div>
        </ScrollArea>
        
        {/* User profile area */}
        <div className="p-3 bg-gray-900 flex items-center gap-2">
          <Avatar className="w-7 h-7">
            <img src={members[0].image} alt="Your avatar" className="w-full h-full object-cover" />
            <span className="absolute bottom-0 right-0 block w-2.5 h-2.5 rounded-full border-2 border-gray-900 bg-afro-green"></span>
          </Avatar>
          <div className="text-sm truncate">
            <span className="font-medium truncate">{members[0].name}</span>
          </div>
          <div className="ml-auto flex gap-1.5">
            <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white hover:bg-gray-700">
              <Settings size={14} />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Online members sidebar */}
      <div className="col-span-2 bg-gray-700 p-0 border-l border-gray-600">
        <div className="p-4 bg-gray-800">
          <h3 className="text-white text-sm font-medium">Online - {members.filter(m => m.online).length}</h3>
        </div>
        
        <ScrollArea className="h-[calc(100%-4rem)]">
          <div className="p-3 space-y-1">
            {members.map((member) => (
              <div key={member.id} className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-gray-600 cursor-pointer">
                <Avatar className="w-7 h-7">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  <span className={`absolute bottom-0 right-0 block w-2.5 h-2.5 rounded-full border-2 border-gray-700 ${
                    member.online ? 'bg-afro-green' : 'bg-gray-400'
                  }`}></span>
                </Avatar>
                <div className="overflow-hidden">
                  <p className={`text-sm truncate ${member.online ? 'text-white' : 'text-gray-400'}`}>
                    {member.name}
                  </p>
                  <p className="text-xs text-gray-400 truncate">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      {/* Chat main area */}
      <div className="col-span-8 bg-gray-700 flex flex-col">
        {/* Channel header */}
        <div className="bg-gray-700 p-4 border-b border-gray-600 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Hash size={20} className="text-gray-400" />
            <h2 className="text-white font-medium">
              {channels.find(c => c.id === activeChannel)?.name}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:bg-gray-600">
              <Bell size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:bg-gray-600">
              <Bookmark size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:bg-gray-600">
              <Users size={18} />
            </Button>
          </div>
        </div>
        
        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="flex gap-3 group">
                <Avatar className="w-10 h-10 mt-0.5">
                  <img src={message.user.image} alt={message.user.name} className="w-full h-full object-cover" />
                  <span className={`absolute bottom-0 right-0 block w-3 h-3 rounded-full border-2 border-gray-700 ${
                    message.user.online ? 'bg-afro-green' : 'bg-gray-400'
                  }`}></span>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline">
                    <h4 className="font-medium text-white">{message.user.name}</h4>
                    <span className="ml-2 text-xs text-gray-400">{message.time}</span>
                  </div>
                  <p className="text-gray-200">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        {/* Message input */}
        <div className="p-4 bg-gray-800">
          <div className="relative w-full flex">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Message #${channels.find(c => c.id === activeChannel)?.name}`}
              className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-400 pr-24"
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <div className="absolute right-0 top-0 h-full flex items-center gap-1 pr-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                <PlusCircle size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                <Paperclip size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                <Smile size={18} />
              </Button>
              <Button size="sm" className="bg-afro-purple hover:bg-afro-purple/90" onClick={handleSendMessage}>
                <Send size={14} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { File, Table } from "lucide-react";
