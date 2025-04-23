
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Calendar,
  Clock,
  Video,
  User,
  Filter,
  ExternalLink,
  Play,
  PlayCircle,
  BookOpen,
  FileText,
  Link
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
  pulseAnimation,
  floatAnimation
} from "@/components/ui/motion";
import { motion } from "framer-motion";

// Mock webinar data
const WEBINARS = [
  {
    id: "1",
    title: "Building Scalable APIs with Node.js and Express",
    description: "Learn best practices for creating robust and scalable REST APIs using Node.js, Express, and MongoDB.",
    speaker: {
      name: "David Oluwafemi",
      role: "Senior Backend Engineer at Paystack",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    date: "January 25, 2024",
    time: "2:00 PM - 4:00 PM (WAT)",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1470&auto=format&fit=crop",
    category: "Backend Development",
    tags: ["Node.js", "Express", "API Design", "MongoDB"],
    registrants: 245,
    upcoming: true,
    featured: true,
    materials: ["Starter code", "Slides", "Resources list"]
  },
  {
    id: "2",
    title: "Modern React Patterns for 2024",
    description: "Dive deep into advanced React patterns including hooks, context, and state management approaches for modern web applications.",
    speaker: {
      name: "Amina Kimani",
      role: "Frontend Lead at Andela",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg"
    },
    date: "February 2, 2024",
    time: "3:00 PM - 5:00 PM (EAT)",
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=1170&auto=format&fit=crop",
    category: "Frontend Development",
    tags: ["React", "Hooks", "State Management", "Performance"],
    registrants: 312,
    upcoming: true,
    featured: true,
    materials: ["Code samples", "Slides", "React patterns cheatsheet"]
  },
  {
    id: "3",
    title: "Flutter for Cross-Platform Mobile Development",
    description: "Build beautiful native apps for iOS and Android from a single codebase using Flutter and Dart.",
    speaker: {
      name: "Kwame Osei",
      role: "Mobile Developer at Flutterwave",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg"
    },
    date: "February 8, 2024",
    time: "4:00 PM - 6:00 PM (GMT)",
    image: "https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?q=80&w=987&auto=format&fit=crop",
    category: "Mobile Development",
    tags: ["Flutter", "Dart", "Cross-Platform", "UI/UX"],
    registrants: 187,
    upcoming: true,
    featured: false,
    materials: ["Starter project", "Slide deck", "Flutter resources guide"]
  },
  {
    id: "4",
    title: "Introduction to Machine Learning for Developers",
    description: "A beginner-friendly introduction to machine learning concepts with practical Python examples.",
    speaker: {
      name: "Nadia Mensah",
      role: "AI Engineer at Microsoft Africa",
      avatar: "https://randomuser.me/api/portraits/women/29.jpg"
    },
    date: "February 15, 2024",
    time: "2:00 PM - 4:30 PM (CAT)",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1170&auto=format&fit=crop",
    category: "Data Science",
    tags: ["Machine Learning", "Python", "Data Science", "AI"],
    registrants: 276,
    upcoming: true,
    featured: false,
    materials: ["Jupyter notebooks", "Dataset samples", "ML algorithm cheatsheet"]
  },
  {
    id: "5",
    title: "Cloud Architecture on AWS for African Markets",
    description: "Design resilient and cost-effective cloud solutions considering the unique constraints of African markets.",
    speaker: {
      name: "Ibrahim Toure",
      role: "Cloud Architect at AWS",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg"
    },
    date: "February 20, 2024",
    time: "3:00 PM - 5:00 PM (WAT)",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1172&auto=format&fit=crop",
    category: "Cloud Computing",
    tags: ["AWS", "Cloud Architecture", "Infrastructure", "DevOps"],
    registrants: 198,
    upcoming: true,
    featured: false,
    materials: ["Architecture templates", "Cost optimization guide", "Case studies"]
  },
  {
    id: "6",
    title: "Building E-commerce Applications with NextJS",
    description: "Learn to create performant and SEO-friendly e-commerce applications using Next.js and modern frameworks.",
    speaker: {
      name: "Grace Njeri",
      role: "Senior Developer at Jumia",
      avatar: "https://randomuser.me/api/portraits/women/35.jpg"
    },
    date: "March 5, 2024",
    time: "2:00 PM - 4:00 PM (EAT)",
    image: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=1172&auto=format&fit=crop",
    category: "Web Development",
    tags: ["Next.js", "E-commerce", "Performance", "SEO"],
    registrants: 254,
    upcoming: true,
    featured: true,
    materials: ["Starter template", "Performance optimization guide", "API integration examples"]
  }
];

// Mock recorded/past webinars
const RECORDED_WEBINARS = [
  {
    id: "r1",
    title: "Containerization with Docker and Kubernetes",
    description: "Master containers, Docker, and Kubernetes for modern application deployment and scaling.",
    speaker: {
      name: "Tendai Mutunhire",
      role: "DevOps Engineer at Safaricom",
      avatar: "https://randomuser.me/api/portraits/men/36.jpg"
    },
    recordedDate: "November 15, 2023",
    duration: "1:45:32",
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=1206&auto=format&fit=crop",
    category: "DevOps",
    tags: ["Docker", "Kubernetes", "Containers", "DevOps"],
    views: 1245,
    rating: 4.8,
    videoUrl: "#recorded/r1",
    materials: ["Docker compose files", "K8s manifests", "Deployment checklists"]
  },
  {
    id: "r2",
    title: "Blockchain Development for African Use Cases",
    description: "How to apply blockchain technology to solve unique challenges in African markets.",
    speaker: {
      name: "Oluwaseun Ajayi",
      role: "Blockchain Developer at Binance Africa",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    recordedDate: "December 5, 2023",
    duration: "2:12:47",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1632&auto=format&fit=crop",
    category: "Blockchain",
    tags: ["Blockchain", "Smart Contracts", "Web3", "DeFi"],
    views: 987,
    rating: 4.7,
    videoUrl: "#recorded/r2",
    materials: ["Smart contract examples", "Development guide", "Use case studies"]
  },
  {
    id: "r3",
    title: "UI/UX Design Principles for African Markets",
    description: "Designing intuitive interfaces considering cultural context, connectivity constraints, and user expectations in Africa.",
    speaker: {
      name: "Fatou Diallo",
      role: "UX Lead at iHub",
      avatar: "https://randomuser.me/api/portraits/women/26.jpg"
    },
    recordedDate: "December 18, 2023",
    duration: "1:53:21",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=1636&auto=format&fit=crop",
    category: "Design",
    tags: ["UI/UX", "Design Principles", "User Research", "Accessibility"],
    views: 1432,
    rating: 4.9,
    videoUrl: "#recorded/r3",
    materials: ["Design system templates", "Research methodologies", "Case studies"]
  }
];

// Categories for filtering
const WEBINAR_CATEGORIES = [
  "All Categories",
  "Frontend Development",
  "Backend Development",
  "Mobile Development",
  "Cloud Computing",
  "DevOps",
  "Data Science",
  "Blockchain",
  "Design",
  "Web Development",
  "Career Development",
  "Security"
];

const Webinar = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  
  const filterWebinars = () => {
    let filtered = activeTab === "upcoming" ? [...WEBINARS] : [...RECORDED_WEBINARS];
    
    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(webinar => 
        webinar.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        webinar.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        webinar.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter(webinar => 
        webinar.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    return filtered;
  };
  
  const filteredWebinars = filterWebinars();
  
  // Featured webinar
  const featuredWebinar = WEBINARS.find(w => w.featured) || WEBINARS[0];
  
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
              Tech Webinars
            </h1>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              Expand your knowledge with live and on-demand webinars from industry experts on the latest technologies and best practices.
            </p>
          </MotionDiv>
          
          {/* Featured Webinar */}
          <MotionDiv
            variants={slideInUp()}
            initial="hidden"
            animate="visible"
            className="mb-16"
          >
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-afro-purple/10">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-3/5 p-8 md:p-12">
                  <Badge className="mb-4 bg-afro-purple text-white w-fit">Featured Webinar</Badge>
                  <h2 className="text-3xl font-bold mb-3 text-gray-900">
                    {featuredWebinar.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-6">
                    {featuredWebinar.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    {featuredWebinar.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="bg-afro-purple/5 text-afro-purple border-afro-purple/10">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <User className="text-afro-purple h-5 w-5" />
                      <div>
                        <span className="font-medium">{featuredWebinar.speaker.name}</span>
                        <p className="text-sm text-gray-500">{featuredWebinar.speaker.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Calendar className="text-afro-purple h-5 w-5" />
                      <span>{featuredWebinar.date}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Clock className="text-afro-purple h-5 w-5" />
                      <span>{featuredWebinar.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild className="bg-afro-purple hover:bg-afro-purple/90">
                      <a href={`#webinar/${featuredWebinar.id}`}>
                        <Video className="mr-2 h-4 w-4" />
                        Register Now
                      </a>
                    </Button>
                    
                    <div className="flex items-center text-gray-500">
                      <User className="mr-1 h-4 w-4" />
                      <span>{featuredWebinar.registrants} people registered</span>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/5 h-64 md:h-auto relative">
                  <img
                    src={featuredWebinar.image}
                    alt={featuredWebinar.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-black/50 to-transparent md:bg-gradient-to-r"></div>
                  
                  <motion.div 
                    animate={pulseAnimation}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </MotionDiv>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-white/50 backdrop-blur-sm border border-afro-purple/20 shadow-lg overflow-hidden rounded-xl">
              <TabsTrigger value="upcoming" className="text-base py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-afro-purple data-[state=active]:to-afro-gold data-[state=active]:text-white">
                Upcoming Webinars
              </TabsTrigger>
              <TabsTrigger value="recorded" className="text-base py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-afro-purple data-[state=active]:to-afro-gold data-[state=active]:text-white">
                Recorded Webinars
              </TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
              <div className="relative w-full md:w-auto md:flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search webinars..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border-afro-purple/20 focus-visible:ring-afro-purple w-full"
                />
              </div>
              
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Filter className="text-afro-purple/70" size={16} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="flex-1 rounded-md border border-afro-purple/20 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-afro-purple bg-white/80"
                >
                  {WEBINAR_CATEGORIES.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <TabsContent value="upcoming" className="mt-0 animate-in fade-in-50">
              <MotionSection
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredWebinars.length > 0 ? (
                  filteredWebinars.map((webinar, index) => (
                    <UpcomingWebinarCard key={webinar.id} webinar={webinar} index={index} />
                  ))
                ) : (
                  <div className="col-span-full py-16 text-center">
                    <p className="text-xl text-gray-500">No webinars found matching your criteria.</p>
                    <p className="text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
                  </div>
                )}
              </MotionSection>
            </TabsContent>
            
            <TabsContent value="recorded" className="mt-0 animate-in fade-in-50">
              <MotionSection
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredWebinars.length > 0 ? (
                  filteredWebinars.map((webinar, index) => (
                    <RecordedWebinarCard key={webinar.id} webinar={webinar} index={index} />
                  ))
                ) : (
                  <div className="col-span-full py-16 text-center">
                    <p className="text-xl text-gray-500">No recorded webinars found matching your criteria.</p>
                    <p className="text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
                  </div>
                )}
              </MotionSection>
            </TabsContent>
          </Tabs>
          
          {/* Host Your Own Webinar */}
          <MotionDiv
            variants={fadeIn(0.3)}
            initial="hidden"
            animate="visible"
            className="mt-16 bg-gradient-to-r from-afro-purple/20 to-afro-blue/20 rounded-xl p-8 md:p-12 border border-afro-purple/10 relative overflow-hidden"
          >
            <motion.div 
              className="absolute -right-16 -top-16 text-afro-purple/10" 
              animate={floatAnimation}
            >
              <Video size={200} />
            </motion.div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-3 text-gray-900">Share Your Knowledge</h2>
                <p className="text-gray-700 mb-6">
                  Are you an expert in your field? Host your own webinar and share your knowledge with the African tech community. 
                  Our platform makes it easy to reach thousands of developers across the continent.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg flex items-start gap-3">
                    <div className="bg-afro-purple/10 p-2 rounded-full">
                      <User className="h-5 w-5 text-afro-purple" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Reach Developers</h3>
                      <p className="text-sm text-gray-600">Connect with thousands of developers across Africa</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg flex items-start gap-3">
                    <div className="bg-afro-purple/10 p-2 rounded-full">
                      <BookOpen className="h-5 w-5 text-afro-purple" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Build Authority</h3>
                      <p className="text-sm text-gray-600">Establish yourself as an expert in your field</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/3 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Interested in hosting?</h3>
                <form className="space-y-4">
                  <Input
                    placeholder="Your Name"
                    className="border-afro-purple/20 focus-visible:ring-afro-purple"
                  />
                  <Input
                    placeholder="Email Address"
                    type="email"
                    className="border-afro-purple/20 focus-visible:ring-afro-purple"
                  />
                  <Input
                    placeholder="Webinar Topic"
                    className="border-afro-purple/20 focus-visible:ring-afro-purple"
                  />
                  <Button className="w-full bg-afro-purple hover:bg-afro-purple/90">
                    Submit Application
                  </Button>
                </form>
              </div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </MainLayout>
  );
};

interface UpcomingWebinarCardProps {
  webinar: typeof WEBINARS[0];
  index: number;
}

const UpcomingWebinarCard = ({ webinar, index }: UpcomingWebinarCardProps) => {
  return (
    <MotionDiv
      variants={fadeIn(index * 0.1)}
      className="group bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="h-48 relative overflow-hidden">
        <img 
          src={webinar.image} 
          alt={webinar.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        <Badge className="absolute top-3 left-3 bg-afro-purple text-white">
          {webinar.category}
        </Badge>
        
        <motion.div 
          animate={pulseAnimation}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
            <Play className="h-8 w-8 text-white" />
          </div>
        </motion.div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900 line-clamp-1 group-hover:text-afro-purple transition-colors">
          {webinar.title}
        </h3>
        
        <p className="text-gray-600 mb-4 text-sm line-clamp-2 h-10">
          {webinar.description}
        </p>
        
        <div className="flex items-center gap-3 mb-4">
          <img 
            src={webinar.speaker.avatar} 
            alt={webinar.speaker.name} 
            className="w-8 h-8 rounded-full border border-white shadow-sm"
          />
          <div>
            <p className="text-sm font-medium">{webinar.speaker.name}</p>
            <p className="text-xs text-gray-500">{webinar.speaker.role}</p>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-700 text-sm">
            <Calendar size={14} className="text-afro-purple" />
            <span>{webinar.date}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-700 text-sm">
            <Clock size={14} className="text-afro-purple" />
            <span>{webinar.time}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {webinar.materials.map((material, i) => (
            <Badge key={i} variant="outline" className="bg-afro-purple/5 text-gray-600 border-gray-200 text-xs">
              <FileText size={10} className="mr-1" />
              {material}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            <span>{webinar.registrants} registered</span>
          </div>
          
          <Button asChild className="bg-afro-purple hover:bg-afro-purple/90">
            <a href={`#webinar/${webinar.id}`}>
              Register
            </a>
          </Button>
        </div>
      </div>
    </MotionDiv>
  );
};

interface RecordedWebinarCardProps {
  webinar: typeof RECORDED_WEBINARS[0];
  index: number;
}

const RecordedWebinarCard = ({ webinar, index }: RecordedWebinarCardProps) => {
  return (
    <MotionDiv
      variants={fadeIn(index * 0.1)}
      className="group bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="h-48 relative overflow-hidden">
        <img 
          src={webinar.image} 
          alt={webinar.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        <Badge className="absolute top-3 left-3 bg-afro-purple text-white">
          {webinar.category}
        </Badge>
        
        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs py-1 px-2 rounded-full flex items-center gap-1">
          <Clock size={12} />
          <span>{webinar.duration}</span>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <PlayCircle className="h-16 w-16 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900 line-clamp-1 group-hover:text-afro-purple transition-colors">
          {webinar.title}
        </h3>
        
        <p className="text-gray-600 mb-4 text-sm line-clamp-2 h-10">
          {webinar.description}
        </p>
        
        <div className="flex items-center gap-3 mb-4">
          <img 
            src={webinar.speaker.avatar} 
            alt={webinar.speaker.name} 
            className="w-8 h-8 rounded-full border border-white shadow-sm"
          />
          <div>
            <p className="text-sm font-medium">{webinar.speaker.name}</p>
            <p className="text-xs text-gray-500">{webinar.speaker.role}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-between mb-4 text-sm">
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar size={14} className="text-afro-purple" />
            <span>{webinar.recordedDate}</span>
          </div>
          
          <div className="flex items-center gap-1 text-amber-500">
            {Array.from({ length: 5 }, (_, i) => (
              <svg key={i} className={`w-4 h-4 ${i < Math.floor(webinar.rating) ? 'fill-current' : 'fill-gray-300'}`} viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
            <span className="text-gray-700 ml-1">{webinar.rating}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {webinar.materials.map((material, i) => (
            <Badge key={i} variant="outline" className="bg-afro-purple/5 text-gray-600 border-gray-200 text-xs">
              <Link size={10} className="mr-1" />
              {material}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            <span>{webinar.views.toLocaleString()} views</span>
          </div>
          
          <Button asChild className="bg-afro-purple hover:bg-afro-purple/90">
            <a href={webinar.videoUrl}>
              Watch Now
            </a>
          </Button>
        </div>
      </div>
    </MotionDiv>
  );
};

export default Webinar;
