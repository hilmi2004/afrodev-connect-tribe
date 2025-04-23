
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Clock,
  ArrowRight,
  Globe,
  MessagesSquare,
  Filter,
  Plus
} from "lucide-react";
import { useState } from "react";
import {
  MotionDiv,
  MotionSection,
  fadeIn,
  slideInUp,
  slideInLeft,
  slideInRight,
  staggerContainer,
  pulseAnimation
} from "@/components/ui/motion";
import { motion } from "framer-motion";

// Mock meetup data
const LOCAL_MEETUPS = [
  {
    id: "1",
    title: "Lagos JavaScript Developers Meetup",
    description: "Monthly gathering of JavaScript developers in Lagos to discuss latest frameworks, best practices, and network.",
    date: "January 20, 2024",
    time: "4:00 PM - 7:00 PM WAT",
    location: "iHub Lagos, 12 Montgomery Road, Yaba",
    city: "Lagos",
    country: "Nigeria",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1170&auto=format&fit=crop",
    attendees: 43,
    maxAttendees: 80,
    tags: ["JavaScript", "React", "Node.js"],
    organizer: {
      name: "Chijioke Eze",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    }
  },
  {
    id: "2",
    title: "Nairobi Data Science Community",
    description: "Bi-weekly meetup for data scientists and enthusiasts to collaborate on projects and share knowledge.",
    date: "January 15, 2024",
    time: "5:30 PM - 8:00 PM EAT",
    location: "Nairobi Garage, Ngong Road",
    city: "Nairobi",
    country: "Kenya",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1170&auto=format&fit=crop",
    attendees: 35,
    maxAttendees: 50,
    tags: ["Data Science", "Python", "Machine Learning"],
    organizer: {
      name: "Wanjiku Mwangi",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg"
    }
  },
  {
    id: "3",
    title: "Cape Town Web3 Builders",
    description: "Connect with blockchain developers and enthusiasts building the future of Web3 in South Africa.",
    date: "January 25, 2024",
    time: "6:00 PM - 9:00 PM SAST",
    location: "Workshop17, V&A Waterfront",
    city: "Cape Town",
    country: "South Africa",
    image: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1170&auto=format&fit=crop",
    attendees: 28,
    maxAttendees: 60,
    tags: ["Blockchain", "Web3", "Ethereum", "Smart Contracts"],
    organizer: {
      name: "Thabo Nkosi",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    }
  },
  {
    id: "4",
    title: "Cairo Tech StartUp Weekend",
    description: "Intensive weekend workshop for tech entrepreneurs to pitch ideas, form teams, and build MVPs.",
    date: "February 3-5, 2024",
    time: "All Day",
    location: "The GrEEK Campus, Downtown Cairo",
    city: "Cairo",
    country: "Egypt",
    image: "https://images.unsplash.com/photo-1540304453330-764e3a42fc9e?q=80&w=1170&auto=format&fit=crop",
    attendees: 62,
    maxAttendees: 100,
    tags: ["Startups", "Entrepreneurship", "Hackathon"],
    organizer: {
      name: "Amina Hassan",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg"
    }
  },
  {
    id: "5",
    title: "Accra Mobile Developers Meetup",
    description: "Community of Android and iOS developers sharing experiences and knowledge about mobile development.",
    date: "January 18, 2024",
    time: "5:00 PM - 7:30 PM GMT",
    location: "Impact Hub Accra, Osu",
    city: "Accra",
    country: "Ghana",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1170&auto=format&fit=crop",
    attendees: 25,
    maxAttendees: 40,
    tags: ["Mobile", "Android", "iOS", "Flutter"],
    organizer: {
      name: "Kwame Osei",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg"
    }
  },
  {
    id: "6",
    title: "Kigali Women in Tech Networking",
    description: "Monthly gathering for women in technology to connect, mentor, and support each other in their tech journeys.",
    date: "January 27, 2024",
    time: "3:00 PM - 6:00 PM CAT",
    location: "kLab Rwanda, Telecom House",
    city: "Kigali",
    country: "Rwanda",
    image: "https://images.unsplash.com/photo-1483389127117-b6a2102724ae?q=80&w=1074&auto=format&fit=crop",
    attendees: 38,
    maxAttendees: 60,
    tags: ["Women in Tech", "Networking", "Career Development"],
    organizer: {
      name: "Grace Mutesi",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg"
    }
  }
];

// Mock community data
const TECH_COMMUNITIES = [
  {
    id: "c1",
    name: "AfricanDevs",
    description: "Pan-African community of developers collaborating on open source projects and skill development.",
    members: 2540,
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1170&auto=format&fit=crop",
    tags: ["Open Source", "Collaboration", "Pan-African"],
    cities: ["Multiple Cities"],
    country: "Pan-African"
  },
  {
    id: "c2",
    name: "Lagos Techies",
    description: "Network of tech professionals in Lagos organizing events, workshops, and social gatherings.",
    members: 1270,
    image: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=1170&auto=format&fit=crop",
    tags: ["Networking", "Events", "Professional Development"],
    cities: ["Lagos"],
    country: "Nigeria"
  },
  {
    id: "c3",
    name: "Nairobi AI",
    description: "Community focused on artificial intelligence and machine learning applications in East Africa.",
    members: 890,
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=1170&auto=format&fit=crop",
    tags: ["AI", "Machine Learning", "Research"],
    cities: ["Nairobi"],
    country: "Kenya"
  },
  {
    id: "c4",
    name: "SA Game Devs",
    description: "South African game developers supporting each other and building the local game industry.",
    members: 735,
    image: "https://images.unsplash.com/photo-1603052875180-b131caea7851?q=80&w=1170&auto=format&fit=crop",
    tags: ["Game Development", "Design", "Animation"],
    cities: ["Cape Town", "Johannesburg"],
    country: "South Africa"
  }
];

// Countries for filtering
const COUNTRIES = [
  "All Countries", "Nigeria", "Kenya", "South Africa", "Egypt", 
  "Ghana", "Rwanda", "Senegal", "Ethiopia", "Tanzania", "Uganda", "Morocco"
];

const LocalConnect = () => {
  const [activeTab, setActiveTab] = useState("meetups");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  
  const filterMeetups = () => {
    let filtered = [...LOCAL_MEETUPS];
    
    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(meetup => 
        meetup.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meetup.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meetup.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply country filter
    if (selectedCountry !== "All Countries") {
      filtered = filtered.filter(meetup => meetup.country === selectedCountry);
    }
    
    return filtered;
  };
  
  const filterCommunities = () => {
    let filtered = [...TECH_COMMUNITIES];
    
    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(community => 
        community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        community.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        community.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply country filter
    if (selectedCountry !== "All Countries") {
      filtered = filtered.filter(community => community.country === selectedCountry);
    }
    
    return filtered;
  };
  
  const filteredMeetups = filterMeetups();
  const filteredCommunities = filterCommunities();
  
  return (
    <MainLayout>
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-afro-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-afro-green/10 rounded-full blur-3xl"></div>
        
        <div className="container py-10 md:py-16 relative">
          <MotionDiv
            variants={fadeIn()}
            initial="hidden"
            animate="visible"
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-afro-purple via-afro-gold to-afro-green bg-clip-text text-transparent">
              Local Connect
            </h1>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              Discover tech meetups, communities, and events happening near you. Connect with fellow developers in your local area.
            </p>
          </MotionDiv>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 bg-white/50 backdrop-blur-sm border border-afro-purple/20 shadow-lg overflow-hidden rounded-xl">
              <TabsTrigger value="meetups" className="text-base py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-afro-purple data-[state=active]:to-afro-gold data-[state=active]:text-white">
                Tech Meetups
              </TabsTrigger>
              <TabsTrigger value="communities" className="text-base py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-afro-purple data-[state=active]:to-afro-gold data-[state=active]:text-white">
                Communities
              </TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder={`Search ${activeTab === "meetups" ? "meetups" : "communities"}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border-afro-purple/20 focus-visible:ring-afro-purple"
                />
              </div>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Globe className="text-afro-purple/70" size={18} />
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="flex-1 rounded-md border border-afro-purple/20 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-afro-purple bg-white/80"
                >
                  {COUNTRIES.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <TabsContent value="meetups" className="mt-0 animate-in fade-in-50">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <MotionSection
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                  >
                    {filteredMeetups.length > 0 ? (
                      filteredMeetups.map((meetup, index) => (
                        <MeetupCard key={meetup.id} meetup={meetup} index={index} />
                      ))
                    ) : (
                      <div className="py-16 text-center">
                        <p className="text-xl text-gray-500">No meetups found matching your criteria.</p>
                        <p className="text-gray-400 mt-2">Try adjusting your filters or search term.</p>
                      </div>
                    )}
                  </MotionSection>
                </div>
                
                <div className="lg:col-span-1">
                  <MotionDiv
                    variants={slideInRight()}
                    initial="hidden"
                    animate="visible"
                    className="sticky top-24"
                  >
                    {/* Map Placeholder */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-100 mb-8">
                      <div className="p-4 border-b border-gray-100">
                        <h3 className="font-semibold text-afro-purple">Meetups Near You</h3>
                      </div>
                      <div className="bg-gray-100 h-80 p-2">
                        <div className="w-full h-full bg-white rounded-lg flex items-center justify-center">
                          <div className="text-center p-4">
                            <MapPin className="w-12 h-12 mx-auto mb-2 text-afro-purple/40" />
                            <p className="text-gray-500">Interactive map showing nearby meetups</p>
                            <Button variant="outline" className="mt-4 border-afro-purple text-afro-purple hover:bg-afro-purple/10">
                              Enable Location
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Create Meetup Card */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-100">
                      <div className="p-6 text-center">
                        <div className="w-16 h-16 rounded-full bg-afro-purple/10 flex items-center justify-center mx-auto mb-4">
                          <Plus className="w-8 h-8 text-afro-purple" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900">Create a Meetup</h3>
                        <p className="text-gray-600 mb-6">
                          Organize your own tech meetup and connect with developers in your area.
                        </p>
                        <Button className="w-full bg-afro-purple hover:bg-afro-purple/90">
                          Start Organizing
                        </Button>
                      </div>
                    </div>
                  </MotionDiv>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="communities" className="mt-0 animate-in fade-in-50">
              <MotionSection
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {filteredCommunities.length > 0 ? (
                  filteredCommunities.map((community, index) => (
                    <CommunityCard key={community.id} community={community} index={index} />
                  ))
                ) : (
                  <div className="col-span-full py-16 text-center">
                    <p className="text-xl text-gray-500">No communities found matching your criteria.</p>
                    <p className="text-gray-400 mt-2">Try adjusting your filters or search term.</p>
                  </div>
                )}
              </MotionSection>
              
              {/* Create Community Card */}
              <MotionDiv
                variants={fadeIn(0.3)}
                initial="hidden"
                animate="visible" 
                className="mt-12 bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-100"
              >
                <div className="p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-afro-purple/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-afro-purple" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">Start Your Own Tech Community</h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Build a community around your technical interests and connect with like-minded developers in your area.
                    We provide the tools and support to help you grow your community.
                  </p>
                  <Button className="bg-afro-purple hover:bg-afro-purple/90">
                    Create Community
                  </Button>
                </div>
              </MotionDiv>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

interface MeetupCardProps {
  meetup: typeof LOCAL_MEETUPS[0];
  index: number;
}

const MeetupCard = ({ meetup, index }: MeetupCardProps) => {
  const isEven = index % 2 === 0;
  
  return (
    <MotionDiv
      variants={isEven ? slideInLeft(index * 0.1) : slideInRight(index * 0.1)}
      className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/5 h-48 md:h-auto relative overflow-hidden">
          <img 
            src={meetup.image} 
            alt={meetup.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <Badge className="bg-afro-purple/90 hover:bg-afro-purple text-white">
              {meetup.country}
            </Badge>
          </div>
        </div>
        
        <div className="md:w-3/5 p-6">
          <h3 className="text-xl font-bold mb-2 text-gray-900">
            {meetup.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4">
            {meetup.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {meetup.tags.map(tag => (
              <Badge key={tag} variant="outline" className="bg-afro-purple/5 text-afro-purple/90 border-afro-purple/10 text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="flex items-center gap-1 text-gray-700 text-sm">
              <Calendar size={14} className="text-afro-purple" />
              <span>{meetup.date}</span>
            </div>
            
            <div className="flex items-center gap-1 text-gray-700 text-sm">
              <Clock size={14} className="text-afro-purple" />
              <span>{meetup.time}</span>
            </div>
            
            <div className="flex items-center gap-1 text-gray-700 text-sm">
              <MapPin size={14} className="text-afro-purple" />
              <span>{meetup.location}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center gap-3 mb-3 sm:mb-0">
              <img 
                src={meetup.organizer.avatar} 
                alt={meetup.organizer.name} 
                className="w-8 h-8 rounded-full border border-white shadow-sm"
              />
              <div>
                <span className="text-xs text-gray-500">Organized by</span>
                <p className="text-sm font-medium">{meetup.organizer.name}</p>
              </div>
            </div>
            
            <div className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-afro-purple hover:bg-afro-purple/90">
                RSVP ({meetup.attendees}/{meetup.maxAttendees})
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
};

interface CommunityCardProps {
  community: typeof TECH_COMMUNITIES[0];
  index: number;
}

const CommunityCard = ({ community, index }: CommunityCardProps) => {
  return (
    <MotionDiv
      variants={fadeIn(index * 0.1)}
      className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="h-48 relative overflow-hidden">
        <img 
          src={community.image} 
          alt={community.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-1">
            {community.name}
          </h3>
          <div className="flex items-center gap-1 text-white/90 text-sm">
            <MapPin size={14} />
            <span>{community.cities.join(", ")}, {community.country}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-600 mb-4">
          {community.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {community.tags.map(tag => (
            <Badge key={tag} variant="outline" className="bg-afro-purple/5 text-afro-purple/90 border-afro-purple/10 text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-gray-700">
            <Users size={16} className="text-afro-purple" />
            <span className="font-medium">{community.members.toLocaleString()} members</span>
          </div>
          
          <Button asChild className="bg-afro-purple hover:bg-afro-purple/90">
            <a href={`#community/${community.id}`}>
              Join Community
            </a>
          </Button>
        </div>
      </div>
    </MotionDiv>
  );
};

export default LocalConnect;
