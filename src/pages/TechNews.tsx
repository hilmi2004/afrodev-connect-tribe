
import { MainLayout } from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Calendar, 
  Clock, 
  Heart, 
  Share, 
  Bookmark, 
  MessageSquare,
  ArrowRight,
  Globe,
  Newspaper,
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

// Mock news data
const TECH_NEWS = [
  {
    id: "1",
    title: "African Tech Startups Raise $4.8 Billion in 2023",
    excerpt: "Despite global economic challenges, African tech startups continue to attract significant investment with fintech leading the way.",
    content: "The African tech ecosystem has shown remarkable resilience in 2023, with startups across the continent raising a total of $4.8 billion in funding. This represents a 20% increase from the previous year, despite global economic uncertainties and funding slowdowns in other regions. Fintech continues to dominate, accounting for 42% of the total funding, followed by healthtech (18%) and agritech (12%). Nigeria, Kenya, Egypt, and South Africa remain the top investment destinations, but countries like Ghana, Rwanda, and Senegal are seeing notable growth in their tech ecosystems.",
    image: "https://images.unsplash.com/photo-1553484771-371a605b060b?q=80&w=1470&auto=format&fit=crop",
    category: "Startup Ecosystem",
    date: "December 15, 2023",
    readTime: "5 min read",
    author: {
      name: "Nnamdi Okafor",
      avatar: "https://randomuser.me/api/portraits/men/34.jpg"
    },
    likes: 342,
    comments: 48,
    bookmarks: 127,
    featured: true,
    trending: true
  },
  {
    id: "2",
    title: "Google Launches AI Research Center in Accra",
    excerpt: "The tech giant expands its AI research efforts with a new center focused on applying AI to solve unique African challenges.",
    content: "Google has officially opened its new AI research center in Accra, Ghana, marking a significant expansion of the company's presence in Africa. The center will focus on developing AI solutions that address specific challenges facing African communities, including healthcare accessibility, agriculture optimization, and language translation for the continent's diverse linguistic landscape. Led by renowned AI researcher Dr. Moustapha Cisse, the team will collaborate with local universities, startups, and policymakers to ensure that AI development in Africa is inclusive and beneficial to local populations.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1170&auto=format&fit=crop",
    category: "Artificial Intelligence",
    date: "November 28, 2023",
    readTime: "4 min read",
    author: {
      name: "Aisha Mensah",
      avatar: "https://randomuser.me/api/portraits/women/41.jpg"
    },
    likes: 289,
    comments: 36,
    bookmarks: 95,
    featured: true,
    trending: true
  },
  {
    id: "3",
    title: "Cape Town Named Top Tech Hub in Africa for 2023",
    excerpt: "South Africa's 'Silicon Cape' recognized for its vibrant startup community, tech infrastructure, and availability of talent.",
    content: "Cape Town has been named Africa's leading tech hub for 2023 in a comprehensive ranking by TechVisionary Magazine. The city earned this distinction based on several factors, including the density of tech startups, availability of investment capital, quality of technical talent, and supportive government policies. Known affectionately as 'Silicon Cape,' the city has fostered a thriving ecosystem that includes over 450 tech startups and more than 40 co-working spaces. The report highlights Cape Town's particular strength in fintech, healthtech, and clean energy innovations.",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=1470&auto=format&fit=crop",
    category: "Tech Ecosystem",
    date: "November 5, 2023",
    readTime: "6 min read",
    author: {
      name: "Daniel Robinson",
      avatar: "https://randomuser.me/api/portraits/men/28.jpg"
    },
    likes: 175,
    comments: 29,
    bookmarks: 84,
    featured: false,
    trending: true
  },
  {
    id: "4",
    title: "New Satellite Internet Initiative to Connect Rural Africa",
    excerpt: "A consortium of tech companies and governments announce ambitious plan to bring high-speed internet to remote regions.",
    content: "A groundbreaking initiative aimed at connecting rural Africa to high-speed internet was announced yesterday by a consortium of international tech companies, African governments, and development organizations. The project will utilize a network of low-orbit satellites to provide affordable and reliable internet access to remote communities across the continent. The $1.2 billion initiative aims to connect over 100 million people in rural areas over the next five years, with a focus on enabling education, healthcare, and economic opportunities. Pilot programs are set to begin in early 2024 in Rwanda, Tanzania, and Mali.",
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=1476&auto=format&fit=crop",
    category: "Digital Infrastructure",
    date: "October 22, 2023",
    readTime: "7 min read",
    author: {
      name: "Fatou Diallo",
      avatar: "https://randomuser.me/api/portraits/women/26.jpg"
    },
    likes: 218,
    comments: 52,
    bookmarks: 103,
    featured: true,
    trending: false
  },
  {
    id: "5",
    title: "African Developers Increasingly Contributing to Open Source",
    excerpt: "New report shows significant growth in African contributions to global open source projects, particularly in web development and AI.",
    content: "A report by GitHub indicates a substantial 47% increase in open source contributions from African developers over the past year. The data reveals that developers from Nigeria, Egypt, Kenya, and South Africa are leading this trend, with notable contributions to projects in web development frameworks, artificial intelligence libraries, and blockchain technology. The report also highlights growing participation in local open source communities and events across the continent. GitHub has announced plans to support this momentum through expanded educational initiatives and grants for African open source maintainers.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop",
    category: "Open Source",
    date: "October 8, 2023",
    readTime: "5 min read",
    author: {
      name: "Emmanuel Osei",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg"
    },
    likes: 156,
    comments: 23,
    bookmarks: 68,
    featured: false,
    trending: true
  },
  {
    id: "6",
    title: "New Coding Academy Network to Train 100,000 African Developers",
    excerpt: "Major initiative launched to address tech talent shortage and create job opportunities across the continent.",
    content: "A coalition of tech companies, educational institutions, and nonprofit organizations has announced an ambitious plan to establish a network of coding academies across Africa. The initiative aims to train 100,000 software developers over the next five years, with a focus on practical, industry-relevant skills. The program will include both in-person training centers in major cities and remote learning options to reach candidates in underserved areas. Graduates will receive support in job placement, with partner companies committing to hire from the program. The first academies will open in Lagos, Nairobi, Cairo, and Johannesburg by March 2024.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1470&auto=format&fit=crop",
    category: "Tech Education",
    date: "September 20, 2023",
    readTime: "6 min read",
    author: {
      name: "Zainab Ahmed",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    likes: 231,
    comments: 42,
    bookmarks: 114,
    featured: true,
    trending: false
  }
];

// Categories for filtering
const NEWS_CATEGORIES = [
  "All Categories",
  "Startup Ecosystem",
  "Artificial Intelligence",
  "Tech Ecosystem",
  "Digital Infrastructure",
  "Open Source",
  "Tech Education",
  "Blockchain",
  "Mobile Technology",
  "E-commerce",
  "Cybersecurity"
];

const TechNews = () => {
  const [activeTab, setActiveTab] = useState("latest");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  
  const filterNews = () => {
    let filtered = [...TECH_NEWS];
    
    if (activeTab === "trending") {
      filtered = filtered.filter(news => news.trending);
    } else if (activeTab === "featured") {
      filtered = filtered.filter(news => news.featured);
    }
    
    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(news => 
        news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter(news => news.category === selectedCategory);
    }
    
    return filtered;
  };
  
  const filteredNews = filterNews();
  
  // Featured/highlighted article
  const highlightedArticle = TECH_NEWS.find(news => news.featured && news.trending) || TECH_NEWS[0];
  
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
              Tech News & Insights
            </h1>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest developments, innovations, and trends in the African tech ecosystem.
            </p>
          </MotionDiv>
          
          {/* Highlighted Article */}
          <MotionDiv
            variants={slideInUp()}
            initial="hidden"
            animate="visible"
            className="mb-16"
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
                      <span className="text-sm text-gray-700">{highlightedArticle.author.name}</span>
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
                        <Heart size={20} />
                      </button>
                      <button className="text-afro-purple hover:text-afro-purple/80 transition-colors">
                        <Bookmark size={20} />
                      </button>
                      <button className="text-afro-blue hover:text-afro-blue/80 transition-colors">
                        <Share size={20} />
                      </button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </MotionDiv>
          
          {/* News Filter & Search */}
          <div className="mb-10">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                <TabsList className="grid grid-cols-3 bg-white/70 backdrop-blur-sm border border-afro-purple/20 rounded-lg overflow-hidden">
                  <TabsTrigger value="latest" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-afro-purple data-[state=active]:to-afro-gold data-[state=active]:text-white">
                    Latest
                  </TabsTrigger>
                  <TabsTrigger value="trending" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-afro-purple data-[state=active]:to-afro-gold data-[state=active]:text-white">
                    Trending
                  </TabsTrigger>
                  <TabsTrigger value="featured" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-afro-purple data-[state=active]:to-afro-gold data-[state=active]:text-white">
                    Featured
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="relative w-full md:w-auto md:min-w-[300px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search tech news..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border-afro-purple/20 focus-visible:ring-afro-purple"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="text-afro-purple" size={18} />
                <span className="text-sm text-gray-600">Filter by category:</span>
              </div>
              
              <div className="flex flex-1 items-center gap-2 w-full sm:w-auto">
                <Newspaper className="text-afro-purple/70" size={16} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="flex-1 rounded-md border border-afro-purple/20 py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-afro-purple bg-white/80"
                >
                  {NEWS_CATEGORIES.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* News Articles Grid */}
          <MotionSection
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredNews.length > 0 ? (
              filteredNews.map((news, index) => (
                <MotionDiv
                  key={news.id}
                  variants={fadeIn(index * 0.1)}
                  className="group bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={news.image} 
                      alt={news.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-afro-purple/90 hover:bg-afro-purple text-white">
                        {news.category}
                      </Badge>
                    </div>
                    {news.trending && (
                      <div className="absolute top-3 right-3 px-2 py-1 bg-red-500 text-white text-xs rounded-full animate-pulse">
                        Trending
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={news.author.avatar}
                          alt={news.author.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-xs text-gray-700">{news.author.name}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-500 text-xs gap-1">
                        <Calendar size={12} />
                        <span>{news.date}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 group-hover:text-afro-purple transition-colors line-clamp-2">
                      <a href={`#article/${news.id}`}>{news.title}</a>
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {news.excerpt}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3 text-gray-500">
                        <button className="flex items-center gap-1 hover:text-afro-red transition-colors">
                          <Heart size={16} />
                          <span className="text-xs">{news.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-afro-blue transition-colors">
                          <MessageSquare size={16} />
                          <span className="text-xs">{news.comments}</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-afro-gold transition-colors">
                          <Bookmark size={16} />
                          <span className="text-xs">{news.bookmarks}</span>
                        </button>
                      </div>
                      
                      <div className="flex items-center text-gray-500 text-xs gap-1">
                        <Clock size={12} />
                        <span>{news.readTime}</span>
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
          
          {/* Newsletter Subscription */}
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
              <Newspaper size={200} />
            </motion.div>
            
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-2xl font-bold mb-3 text-afro-purple">Stay Updated</h2>
              <p className="text-gray-700 mb-6">
                Subscribe to our weekly newsletter for the latest tech news, insights, and opportunities from across Africa.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  placeholder="Enter your email"
                  type="email"
                  className="flex-grow border-afro-purple/30 focus-visible:ring-afro-purple"
                />
                <Button className="bg-afro-purple hover:bg-afro-purple/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </MainLayout>
  );
};

export default TechNews;
