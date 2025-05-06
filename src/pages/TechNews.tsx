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
import { useState, useEffect } from "react";
import {
  MotionDiv,
  MotionSection,
  fadeIn,
  slideInUp,
  slideInRight,
  staggerContainer,
  pulseAnimation,
  floatAnimation
} from "@/components/ui/motion";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

// Categories for filtering
const NEWS_CATEGORIES = [
  "All Categories",
  "technology",
  "business",
  "science",
  "health",
  "startups",
  "innovation",
  "mobile",
  "web",
  "ai",
  "fintech"
];

const TechNews = () => {
  const [activeTab, setActiveTab] = useState("latest");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const { toast } = useToast();

  // Fetch news data from API
  const { data: newsData, isLoading, error, refetch } = useQuery({
    queryKey: ['techNews', activeTab, searchTerm, selectedCategory],
    queryFn: async () => {
      const filter = activeTab === 'trending' ? 'trending' :
          activeTab === 'featured' ? 'featured' : undefined;

      const category = selectedCategory !== 'All Categories' ? selectedCategory : undefined;

      try {
        const response = await api.get('/news', {
          params: {
            filter,
            search: searchTerm,
            category,
            limit: 20
          }
        });
        // Ensure we always return the expected structure
        return {
          success: true,
          articles: response.data.articles || [],
          total: response.data.total || 0,
          page: response.data.page || 1,
          totalPages: response.data.totalPages || 1
        };
      } catch (err) {
        // Return a fallback structure when there's an error
        return {
          success: false,
          articles: [],
          total: 0,
          page: 1,
          totalPages: 1,
          message: 'Failed to fetch news articles'
        };
      }
    },
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading news",
        description: error.message,
        variant: "destructive"
      });
    }
  }, [error, toast]);

  const filteredNews = newsData?.articles || [];
  const highlightedArticle = filteredNews.find(news => news.featured) || filteredNews[0];

  // Loading skeleton
  if (isLoading && !newsData) {
    return (
        <MainLayout>
          <div className="container py-10 md:py-16 relative">
            <div className="text-center mb-12">
              <Skeleton className="h-12 w-1/2 mx-auto mb-4" />
              <Skeleton className="h-6 w-1/3 mx-auto" />
            </div>

            {/* Highlighted Article Skeleton */}
            <div className="mb-16 bg-white/80 rounded-xl overflow-hidden shadow-xl border border-gray-200">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 h-64 md:h-auto">
                  <Skeleton className="w-full h-full" />
                </div>
                <div className="md:w-1/2 p-6 md:p-8">
                  <Skeleton className="h-6 w-24 mb-4" />
                  <Skeleton className="h-8 w-full mb-3" />
                  <Skeleton className="h-16 w-full mb-5" />
                  <div className="flex items-center gap-4 mb-5">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-32" />
                    <div className="flex gap-4">
                      <Skeleton className="h-6 w-6" />
                      <Skeleton className="h-6 w-6" />
                      <Skeleton className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Skeleton */}
            <div className="mb-10">
              <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
                <Skeleton className="h-10 w-full md:w-96" />
                <Skeleton className="h-10 w-full md:w-64" />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            {/* News Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white/90 rounded-xl overflow-hidden shadow-lg border border-gray-200">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-3">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                      <Skeleton className="h-6 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <div className="flex justify-between items-center">
                        <div className="flex gap-3">
                          <Skeleton className="h-4 w-12" />
                          <Skeleton className="h-4 w-12" />
                          <Skeleton className="h-4 w-12" />
                        </div>
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </MainLayout>
    );
  }

  return (
      <MainLayout>
        <div className="relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-600/10 rounded-full blur-3xl"></div>

          <div className="container py-10 md:py-16 relative">
            <MotionDiv
                variants={fadeIn()}
                initial="hidden"
                animate="visible"
                className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
                Tech News & Insights
              </h1>
              <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
                Stay updated with the latest developments, innovations, and trends in the African tech ecosystem.
              </p>
            </MotionDiv>

            {/* Highlighted Article */}
            {highlightedArticle && (
                <MotionDiv
                    variants={slideInUp()}
                    initial="hidden"
                    animate="visible"
                    className="mb-16"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-purple-600/10 relative">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                        <img
                            src={highlightedArticle.imageUrl || "https://images.unsplash.com/photo-1553484771-371a605b060b?q=80&w=1470&auto=format&fit=crop"}
                            alt={highlightedArticle.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent md:hidden"></div>
                      </div>

                      <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center relative">
                        <Badge className="mb-4 bg-purple-600/20 text-purple-600 hover:bg-purple-600/30 w-fit">
                          {highlightedArticle.category || "Technology"}
                        </Badge>

                        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 hover:text-purple-600 transition-colors">
                          <a href={highlightedArticle.url} target="_blank" rel="noopener noreferrer">
                            {highlightedArticle.title}
                          </a>
                        </h2>

                        <p className="text-gray-600 mb-5">
                          {highlightedArticle.excerpt}
                        </p>

                        <div className="flex items-center gap-4 mb-5">
                          <div className="flex items-center gap-2">
                            <img
                                src={highlightedArticle.author?.avatar || "https://randomuser.me/api/portraits/men/34.jpg"}
                                alt={highlightedArticle.author?.name || "Unknown"}
                                className="w-10 h-10 rounded-full"
                            />
                            <span className="text-sm text-gray-700">
                          {highlightedArticle.author?.name || "Unknown"}
                        </span>
                          </div>

                          <div className="flex items-center text-gray-500 text-sm gap-1">
                            <Calendar size={14} />
                            <span>
                          {new Date(highlightedArticle.publishDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                          </div>

                          <div className="flex items-center text-gray-500 text-sm gap-1">
                            <Clock size={14} />
                            <span>{highlightedArticle.readTime || "5 min read"}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Button asChild className="bg-purple-600 hover:bg-purple-600/90">
                            <a href={highlightedArticle.url} target="_blank" rel="noopener noreferrer">
                              Read Full Article <ArrowRight size={16} className="ml-2" />
                            </a>
                          </Button>

                          <motion.div
                              animate={pulseAnimation}
                              className="flex items-center gap-4"
                          >
                            <button className="text-red-500 hover:text-red-500/80 transition-colors">
                              <Heart size={20} />
                            </button>
                            <button className="text-purple-600 hover:text-purple-600/80 transition-colors">
                              <Bookmark size={20} />
                            </button>
                            <button className="text-blue-500 hover:text-blue-500/80 transition-colors">
                              <Share size={20} />
                            </button>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </MotionDiv>
            )}

            {/* News Filter & Search */}
            <div className="mb-10">
              <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                  <TabsList className="grid grid-cols-3 bg-white/70 backdrop-blur-sm border border-purple-600/20 rounded-lg overflow-hidden">
                    <TabsTrigger value="latest" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white">
                      Latest
                    </TabsTrigger>
                    <TabsTrigger value="trending" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white">
                      Trending
                    </TabsTrigger>
                    <TabsTrigger value="featured" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white">
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
                      className="pl-10 pr-4 py-2 border-purple-600/20 focus-visible:ring-purple-600"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Filter className="text-purple-600" size={18} />
                  <span className="text-sm text-gray-600">Filter by category:</span>
                </div>

                <div className="flex flex-1 items-center gap-2 w-full sm:w-auto">
                  <Newspaper className="text-purple-600/70" size={16} />
                  <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="flex-1 rounded-md border border-purple-600/20 py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white/80"
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
                          key={news._id || index}
                          variants={fadeIn(index * 0.1)}
                          className="group bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="h-48 relative overflow-hidden">
                          <img
                              src={news.imageUrl || "https://images.unsplash.com/photo-1553484771-371a605b060b?q=80&w=1470&auto=format&fit=crop"}
                              alt={news.title}
                              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-purple-600/90 hover:bg-purple-600 text-white">
                              {news.category || "Technology"}
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
                                  src={news.author?.avatar || "https://randomuser.me/api/portraits/men/34.jpg"}
                                  alt={news.author?.name || "Unknown"}
                                  className="w-8 h-8 rounded-full"
                              />
                              <span className="text-xs text-gray-700">
                          {news.author?.name || "Unknown"}
                        </span>
                            </div>

                            <div className="flex items-center text-gray-500 text-xs gap-1">
                              <Calendar size={12} />
                              <span>
                          {new Date(news.publishDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                            </div>
                          </div>

                          <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                            <a href={news.url} target="_blank" rel="noopener noreferrer">
                              {news.title}
                            </a>
                          </h3>

                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {news.excerpt}
                          </p>

                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3 text-gray-500">
                              <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                                <Heart size={16} />
                                <span className="text-xs">{news.likes || 0}</span>
                              </button>
                              <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                                <MessageSquare size={16} />
                                <span className="text-xs">{news.comments || 0}</span>
                              </button>
                              <button className="flex items-center gap-1 hover:text-yellow-500 transition-colors">
                                <Bookmark size={16} />
                                <span className="text-xs">{news.bookmarks || 0}</span>
                              </button>
                            </div>

                            <div className="flex items-center text-gray-500 text-xs gap-1">
                              <Clock size={12} />
                              <span>{news.readTime || "5 min read"}</span>
                            </div>
                          </div>
                        </div>
                      </MotionDiv>
                  ))
              ) : (
                  <div className="col-span-full py-16 text-center">
                    <p className="text-xl text-gray-500">No articles found matching your criteria.</p>
                    <p className="text-gray-400 mt-2">Try adjusting your filters or search term.</p>
                    <Button
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedCategory("All Categories");
                          setActiveTab("latest");
                          refetch();
                        }}
                        className="mt-4"
                        variant="outline"
                    >
                      Reset Filters
                    </Button>
                  </div>
              )}
            </MotionSection>

            {/* Newsletter Subscription */}
            <MotionDiv
                variants={fadeIn(0.3)}
                initial="hidden"
                animate="visible"
                className="mt-16 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl p-8 border border-purple-600/10 relative overflow-hidden"
            >
              <motion.div
                  className="absolute -right-16 -top-16 text-purple-600/10"
                  animate={floatAnimation}
              >
                <Newspaper size={200} />
              </motion.div>

              <div className="relative z-10 max-w-2xl">
                <h2 className="text-2xl font-bold mb-3 text-purple-600">Stay Updated</h2>
                <p className="text-gray-700 mb-6">
                  Subscribe to our weekly newsletter for the latest tech news, insights, and opportunities from across Africa.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                      placeholder="Enter your email"
                      type="email"
                      className="flex-grow border-purple-600/30 focus-visible:ring-purple-600"
                  />
                  <Button className="bg-purple-600 hover:bg-purple-600/90">
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