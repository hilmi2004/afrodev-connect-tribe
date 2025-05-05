
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Search,
  MessagesSquare,
  MessageSquare,
  Clock,
  Calendar,
  Eye,
  Heart,
  ArrowUp,
  BookOpen,
  Filter,
  MessageCircle
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Mock discussion data
const FORUM_DISCUSSIONS = [
  {
    id: "1",
    title: "Best practices for scaling Node.js applications in production",
    content: "I'm currently working on a Node.js application that needs to handle thousands of concurrent connections. What are your recommendations for scaling it efficiently? I've tried clustering but looking for more advanced patterns.",
    category: "Backend",
    tags: ["Node.js", "Scaling", "Performance"],
    author: {
      name: "Ade Johnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      reputation: 1240
    },
    createdAt: "3 hours ago",
    views: 342,
    replies: 18,
    upvotes: 34,
    isHot: true,
    solved: false
  },
  {
    id: "2",
    title: "How to implement authentication in React Native with local storage?",
    content: "I'm building a React Native app and need to implement user authentication. What's the best way to store tokens securely? I've read about AsyncStorage but concerned about security implications.",
    category: "Mobile",
    tags: ["React Native", "Authentication", "Security"],
    author: {
      name: "Amina Said",
      avatar: "https://randomuser.me/api/portraits/women/41.jpg",
      reputation: 850
    },
    createdAt: "5 hours ago",
    views: 189,
    replies: 12,
    upvotes: 26,
    isHot: false,
    solved: true
  },
  {
    id: "3",
    title: "Trouble with CSS Grid layout in Safari - any workarounds?",
    content: "I've built a responsive layout using CSS Grid that works perfectly in Chrome and Firefox, but it's breaking in Safari. Specifically, the grid-gap property doesn't seem to be working correctly. Has anyone else encountered this?",
    category: "Frontend",
    tags: ["CSS", "Safari", "Grid Layout"],
    author: {
      name: "Kofi Mensah",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      reputation: 723
    },
    createdAt: "1 day ago",
    views: 245,
    replies: 15,
    upvotes: 38,
    isHot: true,
    solved: true
  },
  {
    id: "4",
    title: "Recommendations for learning AI/ML as a backend developer",
    content: "I have 3 years of experience as a backend developer (primarily with Python/Django), and I'm interested in moving into AI/ML. What resources would you recommend for someone with my background? Any specific courses or projects that helped you?",
    category: "Career",
    tags: ["AI", "Machine Learning", "Learning Path"],
    author: {
      name: "Fatou Diallo",
      avatar: "https://randomuser.me/api/portraits/women/26.jpg",
      reputation: 512
    },
    createdAt: "2 days ago",
    views: 378,
    replies: 23,
    upvotes: 57,
    isHot: true,
    solved: false
  },
  {
    id: "5",
    title: "Best database choice for a high-write, low-read application?",
    content: "I'm developing an IoT platform that will receive large volumes of sensor data (high write operations) but will only occasionally query that data for analytics. What database would be most appropriate for this use case?",
    category: "DevOps",
    tags: ["Databases", "IoT", "Performance"],
    author: {
      name: "Emmanuel Osei",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg",
      reputation: 965
    },
    createdAt: "3 days ago",
    views: 198,
    replies: 14,
    upvotes: 32,
    isHot: false,
    solved: false
  },
  {
    id: "6",
    title: "How do you handle state management in large React applications?",
    content: "As our React application grows, managing state is becoming increasingly complex. We're currently using Redux, but I'm curious about other approaches. What do you use for state management in large React apps, and why?",
    category: "Frontend",
    tags: ["React", "State Management", "Redux"],
    author: {
      name: "Zainab Ahmed",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      reputation: 1103
    },
    createdAt: "4 days ago",
    views: 412,
    replies: 28,
    upvotes: 63,
    isHot: true,
    solved: true
  }
];

// Mock categories data
const FORUM_CATEGORIES = [
  { id: "all", name: "All Categories" },
  { id: "frontend", name: "Frontend", count: 876 },
  { id: "backend", name: "Backend", count: 743 },
  { id: "mobile", name: "Mobile", count: 512 },
  { id: "devops", name: "DevOps", count: 354 },
  { id: "career", name: "Career", count: 287 },
  { id: "design", name: "UI/UX", count: 245 },
  { id: "databases", name: "Databases", count: 198 },
  { id: "security", name: "Security", count: 167 }
];

// Discussion form schema
const discussionSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title must be less than 100 characters"),
  content: z.string().min(20, "Content must be at least 20 characters"),
  category: z.string().min(1, "Please select a category"),
  tags: z.string().optional(),
  type: z.enum(["discussion", "question"], {
    required_error: "Please select a post type",
  }),
});

const Forum = () => {
  const [activeTab, setActiveTab] = useState("discussions");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [solved, setSolved] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Form for creating new discussion
  const discussionForm = useForm<z.infer<typeof discussionSchema>>({
    resolver: zodResolver(discussionSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
      tags: "",
      type: "discussion",
    }
  });

  const handleCreateDiscussion = (values: z.infer<typeof discussionSchema>) => {
    // In a real app, this would send data to the backend
    console.log("New discussion:", values);
    
    // You could add the new discussion to the list here
    // For now we'll just close the dialog
    setDialogOpen(false);
    discussionForm.reset();
  };
  
  const filterDiscussions = () => {
    let filtered = [...FORUM_DISCUSSIONS];
    
    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(discussion => 
        discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discussion.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discussion.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(discussion => 
        discussion.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Apply solved filter
    if (solved) {
      filtered = filtered.filter(discussion => discussion.solved);
    }
    
    return filtered;
  };
  
  const filteredDiscussions = filterDiscussions();
  
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
              Developer Forum
            </h1>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              Ask questions, share knowledge, and connect with developers across Africa. Get help with coding challenges and technical discussions.
            </p>
          </MotionDiv>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8 bg-white/50 backdrop-blur-sm border border-afro-purple/20 shadow-lg overflow-hidden rounded-xl">
              <TabsTrigger value="discussions" className="text-base py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-afro-purple data-[state=active]:to-afro-gold data-[state=active]:text-white">
                Discussions
              </TabsTrigger>
              <TabsTrigger value="questions" className="text-base py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-afro-purple data-[state=active]:to-afro-gold data-[state=active]:text-white">
                Questions
              </TabsTrigger>
              <TabsTrigger value="popular" className="text-base py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-afro-purple data-[state=active]:to-afro-gold data-[state=active]:text-white">
                Popular
              </TabsTrigger>
            </TabsList>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Left Sidebar - Categories */}
              <MotionDiv
                variants={slideInLeft()}
                initial="hidden"
                animate="visible"
                className="lg:col-span-1"
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-100 mb-6">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-afro-purple">Categories</h3>
                  </div>
                  <div className="p-2">
                    <ul className="space-y-1">
                      {FORUM_CATEGORIES.map(category => (
                        <li key={category.id}>
                          <button
                            onClick={() => setSelectedCategory(category.id)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                              selectedCategory === category.id 
                                ? 'bg-afro-purple/10 text-afro-purple font-medium' 
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            <span>{category.name}</span>
                            {category.id !== 'all' && (
                              <Badge variant="outline" className="bg-afro-purple/5 text-afro-purple/70 border-afro-purple/10">
                                {category.count}
                              </Badge>
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-100 mb-6">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-afro-purple">Filters</h3>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        id="solved"
                        checked={solved}
                        onChange={() => setSolved(!solved)}
                        className="rounded text-afro-purple focus:ring-afro-purple"
                      />
                      <label htmlFor="solved" className="ml-2 text-gray-700">
                        Solved Only
                      </label>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedCategory("all");
                        setSolved(false);
                        setSearchTerm("");
                      }}
                      className="w-full border-afro-purple text-afro-purple hover:bg-afro-purple/10"
                    >
                      Reset Filters
                    </Button>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-afro-purple/20 to-afro-blue/10 rounded-xl overflow-hidden shadow-lg border border-afro-purple/10 p-4 text-center">
                  <BookOpen className="w-10 h-10 mx-auto mb-2 text-afro-purple/70" />
                  <h3 className="font-medium text-gray-900 mb-2">Forum Guidelines</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Review our community guidelines to make the most of the forum.
                  </p>
                  <Button variant="outline" size="sm" className="border-afro-purple text-afro-purple hover:bg-afro-purple/10">
                    Read Guidelines
                  </Button>
                </div>
              </MotionDiv>
              
              {/* Main Content Area */}
              <div className="lg:col-span-3">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search discussions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border-afro-purple/20 focus-visible:ring-afro-purple w-full"
                    />
                  </div>
                  
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="whitespace-nowrap w-full sm:w-auto bg-afro-purple hover:bg-afro-purple/90">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Start Discussion
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-afro-purple">Start a New Discussion</DialogTitle>
                      </DialogHeader>
                      
                      <Form {...discussionForm}>
                        <form onSubmit={discussionForm.handleSubmit(handleCreateDiscussion)} className="space-y-6 pt-4">
                          <FormField
                            control={discussionForm.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Discussion Title</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="What's your discussion about?" 
                                    {...field} 
                                    className="border-afro-purple/20 focus-visible:ring-afro-purple"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={discussionForm.control}
                            name="type"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Post Type</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="border-afro-purple/20 focus-visible:ring-afro-purple">
                                      <SelectValue placeholder="Select post type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="discussion">Discussion</SelectItem>
                                    <SelectItem value="question">Question</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                                <p className="text-xs text-gray-500 mt-1">
                                  {field.value === "question" 
                                    ? "Questions can be marked as solved when you get a satisfactory answer" 
                                    : "Discussions are open-ended conversations without a specific answer"}
                                </p>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={discussionForm.control}
                            name="category"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                  <select
                                    {...field}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-afro-purple/20 focus-visible:ring-afro-purple"
                                  >
                                    <option value="">Select a category</option>
                                    {FORUM_CATEGORIES.filter(cat => cat.id !== 'all').map(category => (
                                      <option key={category.id} value={category.id}>
                                        {category.name}
                                      </option>
                                    ))}
                                  </select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={discussionForm.control}
                            name="content"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Discussion Content</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Describe your discussion or question in detail..." 
                                    className="min-h-[160px] resize-y border-afro-purple/20 focus-visible:ring-afro-purple" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={discussionForm.control}
                            name="tags"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tags (comma separated)</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="e.g. React, TypeScript, API" 
                                    {...field} 
                                    className="border-afro-purple/20 focus-visible:ring-afro-purple"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="flex justify-end gap-3">
                            <DialogClose asChild>
                              <Button type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button 
                              type="submit" 
                              className="bg-afro-purple hover:bg-afro-purple/90"
                            >
                              <MessageCircle className="mr-2 h-4 w-4" />
                              Post Discussion
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <TabsContent value="discussions" className="mt-0 animate-in fade-in-50">
                  <MotionSection
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                  >
                    {filteredDiscussions.length > 0 ? (
                      filteredDiscussions.map((discussion, index) => (
                        <DiscussionCard key={discussion.id} discussion={discussion} index={index} />
                      ))
                    ) : (
                      <div className="py-16 text-center">
                        <p className="text-xl text-gray-500">No discussions found matching your criteria.</p>
                        <p className="text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
                      </div>
                    )}
                  </MotionSection>
                </TabsContent>
                
                <TabsContent value="questions" className="mt-0 animate-in fade-in-50">
                  <MotionSection
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                  >
                    {filteredDiscussions
                      .filter(d => !d.solved)
                      .map((discussion, index) => (
                        <DiscussionCard key={discussion.id} discussion={discussion} index={index} />
                      ))}
                  </MotionSection>
                </TabsContent>
                
                <TabsContent value="popular" className="mt-0 animate-in fade-in-50">
                  <MotionSection
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                  >
                    {filteredDiscussions
                      .sort((a, b) => b.upvotes - a.upvotes)
                      .map((discussion, index) => (
                        <DiscussionCard key={discussion.id} discussion={discussion} index={index} />
                      ))}
                  </MotionSection>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

interface DiscussionCardProps {
  discussion: typeof FORUM_DISCUSSIONS[0];
  index: number;
}

const DiscussionCard = ({ discussion, index }: DiscussionCardProps) => {
  return (
    <MotionDiv
      variants={fadeIn(index * 0.1)}
      className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex flex-col items-center gap-2">
            <button className="p-1 rounded-full hover:bg-afro-purple/10 transition-colors">
              <ArrowUp className="w-6 h-6 text-afro-purple" />
            </button>
            <span className="font-medium text-gray-700">{discussion.upvotes}</span>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className="bg-afro-purple text-white">
                {discussion.category}
              </Badge>
              
              {discussion.solved && (
                <Badge className="bg-green-600 text-white">
                  Solved
                </Badge>
              )}
              
              {discussion.isHot && (
                <Badge className="bg-red-500 text-white animate-pulse">
                  Hot
                </Badge>
              )}
            </div>
            
            <h3 className="text-xl font-bold mb-2 hover:text-afro-purple transition-colors">
              <a href={`#discussion/${discussion.id}`}>{discussion.title}</a>
            </h3>
            
            <p className="text-gray-600 mb-4 line-clamp-2">
              {discussion.content}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {discussion.tags.map(tag => (
                <Badge key={tag} variant="outline" className="bg-afro-purple/5 text-afro-purple/90 border-afro-purple/10">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center gap-3 mb-3 sm:mb-0">
                <img 
                  src={discussion.author.avatar} 
                  alt={discussion.author.name} 
                  className="w-8 h-8 rounded-full border border-white shadow-sm"
                />
                <div>
                  <p className="text-sm font-medium">{discussion.author.name}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500">{discussion.createdAt}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs text-afro-purple">{discussion.author.reputation} rep</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-gray-500 text-sm">
                <div className="flex items-center gap-1">
                  <Eye size={16} />
                  <span>{discussion.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare size={16} />
                  <span>{discussion.replies}</span>
                </div>
                <div className="sm:hidden flex items-center gap-1">
                  <Heart size={16} className="text-afro-red" />
                  <span>{discussion.upvotes}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
};

export default Forum;
