
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Users,
  Globe,
  Filter,
  ExternalLink,
  Code,
  Star
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

// Mock hackathon data
const HACKATHONS = [
  {
    id: "1",
    title: "AfriTech Hackathon 2024",
    description: "48-hour hackathon focusing on building solutions for Africa's most pressing challenges using emerging technologies.",
    startDate: "February 15, 2024",
    endDate: "February 17, 2024",
    location: "Lagos, Nigeria + Virtual",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1170&auto=format&fit=crop",
    prizePool: "$10,000",
    participants: 350,
    categories: ["AI", "Fintech", "Agriculture", "Healthcare"],
    sponsors: ["Microsoft", "Paystack", "Lenovo"],
    registrationDeadline: "February 5, 2024",
    upcoming: true,
    featured: true
  },
  {
    id: "2",
    title: "East Africa Mobile Dev Challenge",
    description: "Build innovative mobile applications addressing local challenges in East African communities.",
    startDate: "March 10, 2024",
    endDate: "March 12, 2024",
    location: "Nairobi, Kenya + Virtual",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1170&auto=format&fit=crop",
    prizePool: "$7,500",
    participants: 280,
    categories: ["Mobile", "EdTech", "Social Impact"],
    sponsors: ["Google", "Safaricom", "Andela"],
    registrationDeadline: "March 1, 2024",
    upcoming: true,
    featured: false
  },
  {
    id: "3",
    title: "Pan-African Blockchain Buildathon",
    description: "Explore blockchain applications for financial inclusion, supply chain, and governance across Africa.",
    startDate: "April 5, 2024",
    endDate: "April 7, 2024",
    location: "Cape Town, South Africa + Virtual",
    image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1170&auto=format&fit=crop",
    prizePool: "$15,000",
    participants: 320,
    categories: ["Blockchain", "DeFi", "Web3", "Digital Identity"],
    sponsors: ["Consensys", "Chipper Cash", "Akon Crypto City"],
    registrationDeadline: "March 25, 2024",
    upcoming: true,
    featured: true
  },
  {
    id: "4",
    title: "AI for Good: Africa Challenge",
    description: "Leverage artificial intelligence to create solutions in healthcare, education, and environmental sustainability.",
    startDate: "May 20, 2024",
    endDate: "May 22, 2024",
    location: "Cairo, Egypt + Virtual",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1074&auto=format&fit=crop",
    prizePool: "$12,000",
    participants: 290,
    categories: ["AI/ML", "Education", "Healthcare", "Climate Action"],
    sponsors: ["IBM", "UN Africa", "Facebook"],
    registrationDeadline: "May 10, 2024",
    upcoming: true,
    featured: false
  },
  {
    id: "5",
    title: "Afro Flutter Hackathon",
    description: "Build cross-platform applications using Flutter to address local market needs and showcase your skills.",
    startDate: "March 25, 2024",
    endDate: "March 27, 2024",
    location: "Accra, Ghana + Virtual",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1170&auto=format&fit=crop",
    prizePool: "$5,000",
    participants: 210,
    categories: ["Flutter", "Mobile", "UI/UX"],
    sponsors: ["Google", "MTN", "Flutter Africa"],
    registrationDeadline: "March 15, 2024",
    upcoming: true,
    featured: false
  },
  {
    id: "6",
    title: "AfricaDevs IoT Challenge",
    description: "Design and prototype IoT solutions for smart cities, agriculture, and industry in African contexts.",
    startDate: "June 8, 2024",
    endDate: "June 10, 2024",
    location: "Kigali, Rwanda + Virtual",
    image: "https://images.unsplash.com/photo-1573495804664-b1c0849525af?q=80&w=1169&auto=format&fit=crop",
    prizePool: "$8,000",
    participants: 180,
    categories: ["IoT", "Hardware", "Smart Cities", "AgriTech"],
    sponsors: ["Intel", "Cisco", "Smart Africa"],
    registrationDeadline: "May 30, 2024",
    upcoming: true,
    featured: true
  }
];

// Past hackathons
const PAST_HACKATHONS = [
  {
    id: "p1",
    title: "Africa Code Week Hackathon 2023",
    description: "Youth-focused hackathon promoting coding skills and innovation across the continent.",
    startDate: "October 15, 2023",
    endDate: "October 17, 2023",
    location: "Multiple Locations + Virtual",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1170&auto=format&fit=crop",
    winners: [
      {
        name: "EduAccess",
        prize: "1st Place - $5,000",
        project: "Low-bandwidth educational platform for rural areas"
      },
      {
        name: "FarmSense",
        prize: "2nd Place - $3,000",
        project: "IoT soil monitoring system for small-scale farmers"
      },
      {
        name: "MedConnect",
        prize: "3rd Place - $1,500",
        project: "Mobile app connecting patients with local healthcare providers"
      }
    ],
    upcoming: false,
    featured: false
  },
  {
    id: "p2",
    title: "Sustainable Energy Hackathon 2023",
    description: "Developing renewable energy solutions for African communities and businesses.",
    startDate: "August 5, 2023",
    endDate: "August 7, 2023",
    location: "Addis Ababa, Ethiopia + Virtual",
    image: "https://images.unsplash.com/photo-1565711561500-49678a10a63f?q=80&w=1170&auto=format&fit=crop",
    winners: [
      {
        name: "SolarHub",
        prize: "1st Place - $7,000",
        project: "Solar energy marketplace and installation management platform"
      },
      {
        name: "GridWatch",
        prize: "2nd Place - $4,000",
        project: "AI-powered predictive maintenance for mini-grids"
      },
      {
        name: "BioFuel Connect",
        prize: "3rd Place - $2,000",
        project: "Supply chain platform for sustainable biofuel production"
      }
    ],
    upcoming: false,
    featured: false
  }
];

// Categories for filtering
const HACKATHON_CATEGORIES = [
  "All Categories",
  "AI/ML",
  "Blockchain",
  "Mobile",
  "Web",
  "IoT",
  "Fintech",
  "Healthcare",
  "Education",
  "Agriculture",
  "Climate Action",
  "Social Impact"
];

// Locations for filtering
const LOCATIONS = [
  "All Locations",
  "Nigeria",
  "Kenya",
  "South Africa",
  "Egypt",
  "Ghana",
  "Rwanda",
  "Ethiopia",
  "Virtual"
];

const Hackathon = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  
  const filterHackathons = () => {
    let filtered = activeTab === "upcoming" ? [...HACKATHONS] : [...PAST_HACKATHONS];
    
    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(hackathon => 
        hackathon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hackathon.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== "All Categories" && activeTab === "upcoming") {
      filtered = filtered.filter(hackathon => 
        hackathon.categories.some(category => 
          category.toLowerCase() === selectedCategory.toLowerCase()
        )
      );
    }
    
    // Apply location filter
    if (selectedLocation !== "All Locations") {
      filtered = filtered.filter(hackathon => 
        hackathon.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }
    
    return filtered;
  };
  
  const filteredHackathons = filterHackathons();
  
  // Featured hackathon
  const featuredHackathon = HACKATHONS.find(h => h.featured) || HACKATHONS[0];
  
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
              Hackathons
            </h1>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              Participate in coding competitions, build innovative projects, and compete for prizes while connecting with developers across Africa.
            </p>
          </MotionDiv>
          
          {/* Featured Hackathon */}
          <MotionDiv
            variants={slideInUp()}
            initial="hidden"
            animate="visible"
            className="mb-16"
          >
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={featuredHackathon.image}
                alt={featuredHackathon.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
              
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                <Badge className="mb-4 bg-afro-purple text-white w-fit">Featured Hackathon</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {featuredHackathon.title}
                </h2>
                
                <p className="text-white/90 mb-6 max-w-2xl">
                  {featuredHackathon.description}
                </p>
                
                <div className="flex flex-wrap gap-4 mb-6 text-white/80">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{featuredHackathon.startDate} - {featuredHackathon.endDate}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>{featuredHackathon.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Trophy size={16} />
                    <span>Prize Pool: {featuredHackathon.prizePool}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span>{featuredHackathon.participants} Participants</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  {featuredHackathon.categories.map(category => (
                    <Badge key={category} variant="outline" className="bg-white/10 text-white border-white/20">
                      {category}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center gap-4">
                  <Button asChild className="bg-afro-purple hover:bg-afro-purple/90">
                    <a href={`#hackathon/${featuredHackathon.id}`}>
                      Register Now
                    </a>
                  </Button>
                  
                  <div className="text-white/80 text-sm">
                    Registration Deadline: <span className="font-semibold text-white">{featuredHackathon.registrationDeadline}</span>
                  </div>
                </div>
              </div>
            </div>
          </MotionDiv>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-white/50 backdrop-blur-sm border border-afro-purple/20 shadow-lg overflow-hidden rounded-xl">
              <TabsTrigger value="upcoming" className="text-base py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-afro-purple data-[state=active]:to-afro-gold data-[state=active]:text-white">
                Upcoming Hackathons
              </TabsTrigger>
              <TabsTrigger value="past" className="text-base py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-afro-purple data-[state=active]:to-afro-gold data-[state=active]:text-white">
                Past Hackathons
              </TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
              <div className="relative w-full md:w-auto md:flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search hackathons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border-afro-purple/20 focus-visible:ring-afro-purple w-full"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Filter className="text-afro-purple/70" size={16} />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="flex-1 rounded-md border border-afro-purple/20 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-afro-purple bg-white/80"
                  >
                    {HACKATHON_CATEGORIES.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Globe className="text-afro-purple/70" size={16} />
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="flex-1 rounded-md border border-afro-purple/20 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-afro-purple bg-white/80"
                  >
                    {LOCATIONS.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <TabsContent value="upcoming" className="mt-0 animate-in fade-in-50">
              <MotionSection
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredHackathons.length > 0 ? (
                  filteredHackathons.map((hackathon, index) => (
                    <HackathonCard key={hackathon.id} hackathon={hackathon} index={index} />
                  ))
                ) : (
                  <div className="col-span-full py-16 text-center">
                    <p className="text-xl text-gray-500">No hackathons found matching your criteria.</p>
                    <p className="text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
                  </div>
                )}
              </MotionSection>
            </TabsContent>
            
            <TabsContent value="past" className="mt-0 animate-in fade-in-50">
              <MotionSection
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {filteredHackathons.length > 0 ? (
                  filteredHackathons.map((hackathon, index) => (
                    <PastHackathonCard key={hackathon.id} hackathon={hackathon} index={index} />
                  ))
                ) : (
                  <div className="col-span-full py-16 text-center">
                    <p className="text-xl text-gray-500">No past hackathons found matching your criteria.</p>
                    <p className="text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
                  </div>
                )}
              </MotionSection>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

interface HackathonCardProps {
  hackathon: typeof HACKATHONS[0];
  index: number;
}

const HackathonCard = ({ hackathon, index }: HackathonCardProps) => {
  return (
    <MotionDiv
      variants={fadeIn(index * 0.1)}
      className="group bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="h-48 relative overflow-hidden">
        <img 
          src={hackathon.image} 
          alt={hackathon.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {hackathon.categories.slice(0, 2).map(category => (
              <Badge key={category} className="bg-afro-purple/80 text-white text-xs">
                {category}
              </Badge>
            ))}
            {hackathon.categories.length > 2 && (
              <Badge className="bg-afro-purple/50 text-white text-xs">
                +{hackathon.categories.length - 2} more
              </Badge>
            )}
          </div>
          
          <h3 className="text-xl font-bold text-white line-clamp-1 group-hover:text-afro-gold transition-colors">
            {hackathon.title}
          </h3>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-600 mb-4 line-clamp-2 h-10">
          {hackathon.description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-700 text-sm">
            <Calendar size={14} className="text-afro-purple" />
            <span>{hackathon.startDate} - {hackathon.endDate}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-700 text-sm">
            <MapPin size={14} className="text-afro-purple" />
            <span>{hackathon.location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-700 text-sm">
            <Trophy size={14} className="text-afro-gold" />
            <span>Prize Pool: {hackathon.prizePool}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            <strong className="text-afro-red">Registration Deadline:</strong> {hackathon.registrationDeadline}
          </div>
          
          <Button asChild className="bg-afro-purple hover:bg-afro-purple/90">
            <a href={`#hackathon/${hackathon.id}`}>
              Register
            </a>
          </Button>
        </div>
      </div>
    </MotionDiv>
  );
};

interface PastHackathonCardProps {
  hackathon: typeof PAST_HACKATHONS[0];
  index: number;
}

const PastHackathonCard = ({ hackathon, index }: PastHackathonCardProps) => {
  return (
    <MotionDiv
      variants={fadeIn(index * 0.1)}
      className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/5 h-48 md:h-auto relative overflow-hidden">
          <img 
            src={hackathon.image} 
            alt={hackathon.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
          
          <div className="absolute bottom-4 left-4">
            <Badge className="bg-gray-800/80 text-white">
              Completed
            </Badge>
          </div>
        </div>
        
        <div className="md:w-3/5 p-6">
          <h3 className="text-xl font-bold mb-2 text-gray-900">
            {hackathon.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4">
            {hackathon.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 mb-5 text-sm text-gray-700">
            <div className="flex items-center gap-1">
              <Calendar size={14} className="text-afro-purple" />
              <span>{hackathon.startDate} - {hackathon.endDate}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <MapPin size={14} className="text-afro-purple" />
              <span>{hackathon.location}</span>
            </div>
          </div>
          
          <h4 className="font-medium text-afro-purple flex items-center gap-2 mb-3">
            <Trophy size={16} className="text-afro-gold" />
            Winners
          </h4>
          
          <div className="space-y-2 mb-4">
            {hackathon.winners.map((winner, i) => (
              <div key={i} className="flex items-start gap-2">
                <Star size={16} className={`flex-shrink-0 mt-0.5 ${i === 0 ? 'text-yellow-500' : i === 1 ? 'text-gray-400' : 'text-amber-700'}`} />
                <div>
                  <div className="font-medium">{winner.name} <span className="font-normal text-sm text-gray-500">({winner.prize})</span></div>
                  <p className="text-sm text-gray-600">{winner.project}</p>
                </div>
              </div>
            ))}
          </div>
          
          <Button asChild variant="outline" className="mt-2 border-afro-purple text-afro-purple hover:bg-afro-purple/10">
            <a href={`#hackathon/${hackathon.id}`}>
              View Details
            </a>
          </Button>
        </div>
      </div>
    </MotionDiv>
  );
};

export default Hackathon;
