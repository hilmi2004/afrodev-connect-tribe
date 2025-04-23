
import { MainLayout } from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Briefcase, 
  GraduationCap, 
  ThumbsUp, 
  MessageSquare, 
  ArrowRight,
  BookOpen,
  Users,
  FileText,
  Clock,
  Calendar,
  Filter
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

// Mock career advice data
const CAREER_ARTICLES = [
  {
    id: "1",
    title: "Navigating Your First Tech Job in Africa's Growing Ecosystem",
    excerpt: "Essential tips for new graduates and junior developers starting their tech careers in Africa.",
    content: "Starting your tech career in Africa's vibrant and rapidly evolving ecosystem presents unique opportunities and challenges. This comprehensive guide covers everything from preparing your portfolio and resume to acing interviews at African tech companies. Learn how to leverage local tech communities, contribute to open source projects with African origins, and position yourself as a valuable asset in a competitive job market. We also discuss realistic salary expectations across different regions, negotiation tactics specific to African tech companies, and how to identify organizations with strong growth potential and positive work cultures.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1169&auto=format&fit=crop",
    category: "Career Start",
    date: "December 10, 2023",
    readTime: "10 min read",
    author: {
      name: "Tendai Mutunhire",
      avatar: "https://randomuser.me/api/portraits/men/36.jpg",
      role: "Senior Talent Acquisition Manager"
    },
    likes: 423,
    comments: 61,
    featured: true
  },
  {
    id: "2",
    title: "Building a Tech Portfolio That Stands Out in African Markets",
    excerpt: "How to showcase your skills and projects to attract employers and clients specific to African tech needs.",
    content: "In the competitive African tech landscape, a standout portfolio is your ticket to better opportunities. This article dives deep into crafting a portfolio that resonates with African employers, startups, and clients. Learn how to highlight projects that solve local challenges, demonstrate understanding of market-specific constraints like connectivity and affordability, and showcase adaptability to diverse African contexts. We provide practical tips for documenting your work, presenting case studies effectively, and incorporating testimonials from regional clients or employers. The guide also covers portfolio hosting options accessible throughout Africa and strategies for maintaining visibility in local tech communities.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1115&auto=format&fit=crop",
    category: "Portfolio Building",
    date: "November 25, 2023",
    readTime: "8 min read",
    author: {
      name: "Amina El-Amin",
      avatar: "https://randomuser.me/api/portraits/women/42.jpg",
      role: "UI/UX Designer & Career Coach"
    },
    likes: 356,
    comments: 47,
    featured: true
  },
  {
    id: "3",
    title: "Remote Work Strategies for African Developers",
    excerpt: "Overcoming infrastructure challenges and time zone differences when working with global teams.",
    content: "Remote work offers African developers unprecedented access to global opportunities, but comes with unique challenges. This practical guide addresses the most common obstacles: unreliable internet connections, power outages, time zone management, and communication barriers. Learn how to set up resilient work environments with backup power solutions, alternative internet sources, and effective async communication workflows. Discover tools and techniques for maintaining visibility with distributed teams, managing expectations around infrastructure realities, and establishing boundaries with clients or employers in distant time zones. The article includes insights from successful remote workers across the continent, from Cairo to Cape Town.",
    image: "https://images.unsplash.com/photo-1584931423298-c576fba3dba3?q=80&w=1170&auto=format&fit=crop",
    category: "Remote Work",
    date: "November 12, 2023",
    readTime: "12 min read",
    author: {
      name: "Oluwaseun Ajayi",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      role: "Remote Engineering Manager"
    },
    likes: 512,
    comments: 78,
    featured: false
  },
  {
    id: "4",
    title: "Tech Skills in Highest Demand Across African Markets",
    excerpt: "Analysis of the most sought-after technical skills in different regions of Africa for 2024.",
    content: "The demand for tech skills varies significantly across African regions, influenced by each area's dominant industries, infrastructure, and economic priorities. This data-driven analysis examines current and projected skill demands across North, East, West, Southern, and Central Africa. The report breaks down which programming languages, frameworks, and technical specializations are most valued in different countries, based on job posting analysis and interviews with recruiters across the continent. Beyond coding skills, we explore the growing importance of data analysis, cloud computing, mobile development, and security expertise. The guide concludes with strategic recommendations for skill development based on your location and career goals.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1170&auto=format&fit=crop",
    category: "Skills Development",
    date: "October 30, 2023",
    readTime: "15 min read",
    author: {
      name: "Nadia Mandela",
      avatar: "https://randomuser.me/api/portraits/women/29.jpg",
      role: "Tech Education Director"
    },
    likes: 378,
    comments: 53,
    featured: true
  },
  {
    id: "5",
    title: "Negotiating Tech Salaries in Different African Markets",
    excerpt: "How to research, benchmark and negotiate competitive compensation packages across the continent.",
    content: "Salary negotiation is particularly complex in African tech markets due to significant variations between countries, limited salary transparency, and rapidly evolving standards. This comprehensive guide helps you navigate these challenges with country-specific salary benchmarks for different roles and experience levels. Learn effective research methods for determining your market value, strategies for discussing compensation with both local and international employers, and techniques for negotiating beyond base salary. The article covers important considerations around currency denomination, inflation protection, remote work adjustments, and equity compensation. Real negotiation case studies from developers across the continent provide practical insights for your own salary discussions.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1170&auto=format&fit=crop",
    category: "Compensation",
    date: "October 15, 2023",
    readTime: "11 min read",
    author: {
      name: "Jean-Pierre Hakizimana",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      role: "HR Consultant"
    },
    likes: 495,
    comments: 87,
    featured: false
  },
  {
    id: "6",
    title: "From Developer to Tech Leader: Career Progression in African Startups",
    excerpt: "Strategies for advancing your career from individual contributor to technical leadership roles.",
    content: "The path from developer to tech leader in Africa's startup ecosystem differs from established tech hubs in many ways, presenting both challenges and unique opportunities for rapid advancement. This career guide maps out typical progression paths in African tech companies, from junior roles to technical leadership positions. We explore how to identify and create leadership opportunities in growing organizations, develop the business and communication skills particularly valued in African contexts, and build influential professional networks across the ecosystem. Learn from the journeys of successful CTOs and technical directors who built their careers within African startups, and get practical advice on timing your career moves, demonstrating leadership potential, and preparing for management responsibilities.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1170&auto=format&fit=crop",
    category: "Leadership",
    date: "September 28, 2023",
    readTime: "14 min read",
    author: {
      name: "Grace Njeri",
      avatar: "https://randomuser.me/api/portraits/women/35.jpg",
      role: "CTO & Engineering Director"
    },
    likes: 412,
    comments: 64,
    featured: true
  }
];

// Mock events data
const CAREER_EVENTS = [
  {
    id: "e1",
    title: "Pan-African Tech Career Fair",
    description: "Virtual career fair connecting talented developers with companies hiring across Africa.",
    date: "January 15-16, 2024",
    location: "Online",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1169&auto=format&fit=crop",
    url: "#"
  },
  {
    id: "e2",
    title: "Tech Resume Workshop",
    description: "Hands-on workshop to optimize your technical resume for both African and global opportunities.",
    date: "February 3, 2024",
    location: "Lagos, Nigeria + Online",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1170&auto=format&fit=crop",
    url: "#"
  },
  {
    id: "e3",
    title: "Women in Tech Mentorship Program",
    description: "Three-month mentorship program pairing women developers with industry leaders.",
    date: "Applications due January 30, 2024",
    location: "Pan-African",
    image: "https://images.unsplash.com/photo-1483389127117-b6a2102724ae?q=80&w=1074&auto=format&fit=crop",
    url: "#"
  }
];

// Categories for filtering
const ADVICE_CATEGORIES = [
  "All Categories",
  "Career Start",
  "Portfolio Building",
  "Remote Work",
  "Skills Development",
  "Compensation",
  "Leadership",
  "Job Search",
  "Interviews",
  "Freelancing",
  "Work-Life Balance"
];

const CareerAdvice = () => {
  const [activeTab, setActiveTab] = useState("articles");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  
  const filterArticles = () => {
    let filtered = [...CAREER_ARTICLES];
    
    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }
    
    return filtered;
  };
  
  const filteredArticles = filterArticles();
  
  // Featured/highlighted article
  const highlightedArticle = CAREER_ARTICLES.find(article => article.featured) || CAREER_ARTICLES[0];
  
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
              Career Advice
            </h1>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              Expert guidance, resources, and opportunities to help you advance your tech career in Africa and beyond.
            </p>
          </MotionDiv>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12 bg-white/50 backdrop-blur-sm border border-afro-purple/20 shadow-lg overflow-hidden rounded-xl">
              <TabsTrigger value="articles" className="text-base py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-afro-purple data-[state=active]:to-afro-gold data-[state=active]:text-white">
                Articles
              </TabsTrigger>
              <TabsTrigger value="resources" className="text-base py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-afro-purple data-[state=active]:to-afro-gold data-[state=active]:text-white">
                Resources
              </TabsTrigger>
              <TabsTrigger value="events" className="text-base py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-afro-purple data-[state=active]:to-afro-gold data-[state=active]:text-white">
                Events
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="articles" className="mt-0 animate-in fade-in-50">
              {/* Highlighted Article */}
              <MotionDiv
                variants={slideInUp()}
                initial="hidden"
                animate="visible"
                className="mb-12"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-afro-purple/10 relative">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                      <img
                        src={highlightedArticle.image}
                        alt={highlightedArticle.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent md:hidden"></div>
                    </div>
                    
                    <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center relative">
                      <Badge className="mb-4 bg-afro-purple/20 text-afro-purple hover:bg-afro-purple/30 w-fit">
                        {highlightedArticle.category}
                      </Badge>
                      
                      <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 hover:text-afro-purple transition-colors">
                        <a href={`#article/${highlightedArticle.id}`}>{highlightedArticle.title}</a>
                      </h2>
                      
                      <p className="text-gray-600 mb-5">
                        {highlightedArticle.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-4 mb-5">
                        <div className="flex items-center gap-2">
                          <img
                            src={highlightedArticle.author.avatar}
                            alt={highlightedArticle.author.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <span className="text-sm text-gray-700">{highlightedArticle.author.name}</span>
                            <p className="text-xs text-gray-500">{highlightedArticle.author.role}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-gray-500 text-sm gap-1">
                          <Calendar size={14} />
                          <span>{highlightedArticle.date}</span>
                        </div>
                        
                        <div className="flex items-center text-gray-500 text-sm gap-1">
                          <Clock size={14} />
                          <span>{highlightedArticle.readTime}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Button asChild className="bg-afro-purple hover:bg-afro-purple/90">
                          <a href={`#article/${highlightedArticle.id}`}>
                            Read Full Article <ArrowRight size={16} className="ml-2" />
                          </a>
                        </Button>
                        
                        <motion.div 
                          animate={pulseAnimation}
                          className="flex items-center gap-4"
                        >
                          <button className="text-afro-red hover:text-afro-red/80 transition-colors">
                            <ThumbsUp size={20} />
                          </button>
                          <button className="text-afro-purple hover:text-afro-purple/80 transition-colors">
                            <MessageSquare size={20} />
                          </button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </MotionDiv>
              
              {/* Articles Filter & Search */}
              <div className="mb-10">
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search career advice..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border-afro-purple/20 focus-visible:ring-afro-purple"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Filter className="text-afro-purple" size={18} />
                    <span className="text-sm text-gray-600">Filter by topic:</span>
                  </div>
                  
                  <div className="flex flex-1 items-center gap-2 w-full sm:w-auto">
                    <BookOpen className="text-afro-purple/70" size={16} />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="flex-1 rounded-md border border-afro-purple/20 py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-afro-purple bg-white/80"
                    >
                      {ADVICE_CATEGORIES.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Articles Grid */}
              <MotionSection
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article, index) => (
                    <MotionDiv
                      key={article.id}
                      variants={fadeIn(index * 0.1)}
                      className="group bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="h-48 relative overflow-hidden">
                        <img 
                          src={article.image} 
                          alt={article.title} 
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-afro-purple/90 hover:bg-afro-purple text-white">
                            {article.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-2">
                            <img
                              src={article.author.avatar}
                              alt={article.author.name}
                              className="w-8 h-8 rounded-full"
                            />
                            <div>
                              <span className="text-xs text-gray-700">{article.author.name}</span>
                              <p className="text-xs text-gray-500">{article.author.role}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center text-gray-500 text-xs gap-1">
                            <Calendar size={12} />
                            <span>{article.date}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-2 group-hover:text-afro-purple transition-colors line-clamp-2">
                          <a href={`#article/${article.id}`}>{article.title}</a>
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3 text-gray-500">
                            <button className="flex items-center gap-1 hover:text-afro-purple transition-colors">
                              <ThumbsUp size={16} />
                              <span className="text-xs">{article.likes}</span>
                            </button>
                            <button className="flex items-center gap-1 hover:text-afro-blue transition-colors">
                              <MessageSquare size={16} />
                              <span className="text-xs">{article.comments}</span>
                            </button>
                          </div>
                          
                          <div className="flex items-center text-gray-500 text-xs gap-1">
                            <Clock size={12} />
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </MotionDiv>
                  ))
                ) : (
                  <div className="col-span-full py-16 text-center">
                    <p className="text-xl text-gray-500">No articles found matching your criteria.</p>
                    <p className="text-gray-400 mt-2">Try adjusting your filters or search term.</p>
                  </div>
                )}
              </MotionSection>
            </TabsContent>
            
            <TabsContent value="resources" className="mt-0 animate-in fade-in-50">
              <MotionDiv
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <MotionDiv
                  variants={slideInLeft()}
                  className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-afro-purple/10 overflow-hidden"
                >
                  <div className="p-6 border-b border-afro-purple/10">
                    <h2 className="flex items-center gap-2 text-xl font-bold text-afro-purple">
                      <FileText className="h-6 w-6" />
                      Resume Templates
                    </h2>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      Professionally designed resume templates optimized for tech roles in African and global markets.
                    </p>
                    
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-afro-purple/10 p-1 mt-0.5">
                          <ArrowRight size={14} className="text-afro-purple" />
                        </div>
                        <span className="text-gray-700">Junior Developer Resume Template</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-afro-purple/10 p-1 mt-0.5">
                          <ArrowRight size={14} className="text-afro-purple" />
                        </div>
                        <span className="text-gray-700">Senior Engineer Resume Template</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-afro-purple/10 p-1 mt-0.5">
                          <ArrowRight size={14} className="text-afro-purple" />
                        </div>
                        <span className="text-gray-700">Tech Lead/Manager Resume Template</span>
                      </li>
                    </ul>
                    
                    <Button asChild className="w-full bg-afro-purple hover:bg-afro-purple/90">
                      <a href="#resources/resume-templates">
                        Download Templates
                      </a>
                    </Button>
                  </div>
                </MotionDiv>
                
                <MotionDiv
                  variants={slideInRight()}
                  className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-afro-purple/10 overflow-hidden"
                >
                  <div className="p-6 border-b border-afro-purple/10">
                    <h2 className="flex items-center gap-2 text-xl font-bold text-afro-purple">
                      <Briefcase className="h-6 w-6" />
                      Job Interview Guide
                    </h2>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      Comprehensive guide to acing technical and behavioral interviews for African tech roles.
                    </p>
                    
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-afro-purple/10 p-1 mt-0.5">
                          <ArrowRight size={14} className="text-afro-purple" />
                        </div>
                        <span className="text-gray-700">Common Technical Questions by Role</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-afro-purple/10 p-1 mt-0.5">
                          <ArrowRight size={14} className="text-afro-purple" />
                        </div>
                        <span className="text-gray-700">Behavioral Interview Strategies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-afro-purple/10 p-1 mt-0.5">
                          <ArrowRight size={14} className="text-afro-purple" />
                        </div>
                        <span className="text-gray-700">Remote Interview Best Practices</span>
                      </li>
                    </ul>
                    
                    <Button asChild className="w-full bg-afro-purple hover:bg-afro-purple/90">
                      <a href="#resources/interview-guide">
                        Access Guide
                      </a>
                    </Button>
                  </div>
                </MotionDiv>
                
                <MotionDiv
                  variants={slideInLeft(0.2)}
                  className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-afro-purple/10 overflow-hidden"
                >
                  <div className="p-6 border-b border-afro-purple/10">
                    <h2 className="flex items-center gap-2 text-xl font-bold text-afro-purple">
                      <Users className="h-6 w-6" />
                      Mentorship Directory
                    </h2>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      Connect with experienced tech professionals offering mentorship to African developers.
                    </p>
                    
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-afro-purple/10 p-1 mt-0.5">
                          <ArrowRight size={14} className="text-afro-purple" />
                        </div>
                        <span className="text-gray-700">Browse Mentors by Specialty</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-afro-purple/10 p-1 mt-0.5">
                          <ArrowRight size={14} className="text-afro-purple" />
                        </div>
                        <span className="text-gray-700">Free and Paid Mentorship Options</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-afro-purple/10 p-1 mt-0.5">
                          <ArrowRight size={14} className="text-afro-purple" />
                        </div>
                        <span className="text-gray-700">Become a Mentor</span>
                      </li>
                    </ul>
                    
                    <Button asChild className="w-full bg-afro-purple hover:bg-afro-purple/90">
                      <a href="#resources/mentorship">
                        Find a Mentor
                      </a>
                    </Button>
                  </div>
                </MotionDiv>
                
                <MotionDiv
                  variants={slideInRight(0.2)}
                  className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-afro-purple/10 overflow-hidden"
                >
                  <div className="p-6 border-b border-afro-purple/10">
                    <h2 className="flex items-center gap-2 text-xl font-bold text-afro-purple">
                      <GraduationCap className="h-6 w-6" />
                      Salary Guide
                    </h2>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      Comprehensive salary data for tech roles across different African countries and experience levels.
                    </p>
                    
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-afro-purple/10 p-1 mt-0.5">
                          <ArrowRight size={14} className="text-afro-purple" />
                        </div>
                        <span className="text-gray-700">Country-Specific Salary Ranges</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-afro-purple/10 p-1 mt-0.5">
                          <ArrowRight size={14} className="text-afro-purple" />
                        </div>
                        <span className="text-gray-700">Role and Experience Benchmarks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-afro-purple/10 p-1 mt-0.5">
                          <ArrowRight size={14} className="text-afro-purple" />
                        </div>
                        <span className="text-gray-700">Benefits and Perks Analysis</span>
                      </li>
                    </ul>
                    
                    <Button asChild className="w-full bg-afro-purple hover:bg-afro-purple/90">
                      <a href="#resources/salary-guide">
                        View Salary Guide
                      </a>
                    </Button>
                  </div>
                </MotionDiv>
              </MotionDiv>
            </TabsContent>
            
            <TabsContent value="events" className="mt-0 animate-in fade-in-50">
              <MotionSection
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                {CAREER_EVENTS.map((event, index) => (
                  <MotionDiv
                    key={event.id}
                    variants={fadeIn(index * 0.1)}
                    className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 h-56 md:h-auto relative overflow-hidden">
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="md:w-2/3 p-6 flex flex-col">
                        <h3 className="text-xl font-bold mb-2 text-afro-purple">
                          {event.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-4">
                          {event.description}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                          <div className="flex items-center gap-2 text-gray-700">
                            <Calendar size={18} className="text-afro-purple" />
                            <span>{event.date}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-gray-700">
                            <MapPin size={18} className="text-afro-purple" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        
                        <div className="mt-auto">
                          <Button asChild className="bg-afro-purple hover:bg-afro-purple/90">
                            <a href={event.url}>
                              Learn More & Register
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </MotionDiv>
                ))}
                
                <MotionDiv variants={fadeIn(0.3)} className="text-center py-8">
                  <p className="text-gray-600 mb-4">Don't see an event that matches your needs?</p>
                  <Button asChild variant="outline" className="border-afro-purple text-afro-purple hover:bg-afro-purple/10">
                    <a href="#events/suggest">
                      Suggest a Career Event
                    </a>
                  </Button>
                </MotionDiv>
              </MotionSection>
            </TabsContent>
          </Tabs>
          
          {/* Job Board Preview */}
          <MotionDiv
            variants={fadeIn(0.3)}
            initial="hidden"
            animate="visible"
            className="mt-16 bg-gradient-to-r from-afro-purple/20 to-afro-blue/20 rounded-xl p-8 border border-afro-purple/10 relative overflow-hidden"
          >
            <motion.div 
              className="absolute -right-16 -top-16 text-afro-purple/10" 
              animate={floatAnimation}
            >
              <Briefcase size={200} />
            </motion.div>
            
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-2xl font-bold mb-3 text-afro-purple">Tech Job Board</h2>
              <p className="text-gray-700 mb-6">
                Browse hundreds of tech opportunities across Africa or post a job opening for your company.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="bg-afro-purple hover:bg-afro-purple/90">
                  <a href="#job-board">
                    Browse Jobs
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-afro-purple text-afro-purple hover:bg-afro-purple/10">
                  <a href="#job-board/post">
                    Post a Job
                  </a>
                </Button>
              </div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </MainLayout>
  );
};

export default CareerAdvice;
