import { useState, useEffect } from "react";
import { 
  Bookmark, 
  Newspaper, 
  FileText, 
  MessageSquare, 
  Code,
  HelpCircle,
  X,
  ExternalLink
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { IBookmark } from "@/models/Bookmark";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MotionDiv, 
  fadeIn, 
  staggerContainer 
} from "@/components/ui/motion";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Mock data for bookmarks
const MOCK_BOOKMARKS: IBookmark[] = [
  {
    _id: "b1",
    user: "1",
    contentType: "project",
    contentId: "p1",
    contentTitle: "AfroCommerce Platform",
    contentSummary: "An e-commerce solution tailored for African businesses",
    contentImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
    contentAuthor: {
      _id: "u2",
      fullName: "Tunde Olatunji",
      profileImage: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    createdAt: new Date("2023-09-10")
  },
  {
    _id: "b2",
    user: "1",
    contentType: "article",
    contentId: "a1",
    contentTitle: "Building Accessible Web Apps for Low Bandwidth",
    contentSummary: "Techniques for optimizing web applications in regions with limited internet access",
    contentAuthor: {
      _id: "u3",
      fullName: "Amara Okafor",
      profileImage: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    createdAt: new Date("2023-10-05")
  },
  {
    _id: "b3",
    user: "1",
    contentType: "discussion",
    contentId: "d1",
    contentTitle: "Best practices for handling payments across African countries",
    contentSummary: "Discussion on integrating various payment gateways like Flutterwave, Paystack and M-Pesa",
    contentAuthor: {
      _id: "u4",
      fullName: "Kwame Mensah",
      profileImage: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    createdAt: new Date("2023-11-12")
  },
  {
    _id: "b4",
    user: "1",
    contentType: "question",
    contentId: "q1",
    contentTitle: "How to optimize React performance in low-end devices?",
    contentSummary: "Looking for strategies to make React apps run smoothly on budget smartphones",
    contentAuthor: {
      _id: "u5",
      fullName: "Fatima Hassan",
      profileImage: "https://randomuser.me/api/portraits/women/55.jpg"
    },
    createdAt: new Date("2023-12-01")
  },
  {
    _id: "b5",
    user: "1",
    contentType: "news",
    contentId: "n1",
    contentTitle: "Africa's Tech Ecosystem Receives $2B Investment in 2023",
    contentSummary: "Record funding flowing into African startups despite global economic challenges",
    contentImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1170&auto=format&fit=crop",
    createdAt: new Date("2024-01-15")
  }
];

// Helper function to get icon by content type
const getContentTypeIcon = (type: string) => {
  switch (type) {
    case "project":
      return <Code className="text-blue-500" />;
    case "article":
      return <FileText className="text-purple-500" />;
    case "news":
      return <Newspaper className="text-green-500" />;
    case "question":
      return <HelpCircle className="text-amber-500" />;
    case "discussion":
      return <MessageSquare className="text-rose-500" />;
    default:
      return <Bookmark className="text-gray-500" />;
  }
};

// Helper function to get URL by content type
const getContentUrl = (type: string, id: string) => {
  switch (type) {
    case "project":
      return `/projects/${id}`;
    case "article":
      return `/articles/${id}`;
    case "news":
      return `/news/${id}`;
    case "question":
    case "discussion":
      return `/forum/${id}`;
    default:
      return "#";
  }
};

// Get formatted date from timestamp
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date));
};

interface UserBookmarksProps {
  userId: string;
}

export function UserBookmarks({ userId }: UserBookmarksProps) {
  const [bookmarks, setBookmarks] = useState<IBookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, this would be an API call to fetch bookmarks
    const fetchBookmarks = async () => {
      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setBookmarks(MOCK_BOOKMARKS);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
        toast({
          title: "Error",
          description: "Failed to load bookmarks. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [userId, toast]);

  const handleRemoveBookmark = async (bookmarkId: string) => {
    try {
      // In a real app, this would be an API call to remove the bookmark
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update local state
      setBookmarks(prev => prev.filter(bookmark => bookmark._id !== bookmarkId));
      
      toast({
        title: "Success",
        description: "Bookmark removed successfully",
      });
    } catch (error) {
      console.error("Error removing bookmark:", error);
      toast({
        title: "Error",
        description: "Failed to remove bookmark. Please try again.",
        variant: "destructive"
      });
    }
  };

  const filteredBookmarks = activeTab === "all" 
    ? bookmarks 
    : bookmarks.filter(bookmark => bookmark.contentType === activeTab);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(index => (
          <Card key={index} className="bg-white/90 backdrop-blur-sm border border-gray-100">
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-16 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-4 w-1/4" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (filteredBookmarks.length === 0) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 p-10 text-center">
        <Bookmark className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-medium text-gray-700 mb-2">No Bookmarks Found</h3>
        <p className="text-gray-500 mb-6">
          {activeTab === "all" 
            ? "You haven't bookmarked any content yet." 
            : `You haven't bookmarked any ${activeTab} content yet.`}
        </p>
        <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link to="/discover">Discover Content</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-gray-100 p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-6 gap-2">
            <TabsTrigger value="all" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              All
            </TabsTrigger>
            <TabsTrigger value="project" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Projects
            </TabsTrigger>
            <TabsTrigger value="article" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              Articles
            </TabsTrigger>
            <TabsTrigger value="news" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
              News
            </TabsTrigger>
            <TabsTrigger value="question" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
              Questions
            </TabsTrigger>
            <TabsTrigger value="discussion" className="data-[state=active]:bg-rose-500 data-[state=active]:text-white">
              Discussions
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <MotionSection
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {filteredBookmarks.map((bookmark, index) => (
          <MotionDiv
            key={bookmark._id}
            variants={fadeIn(index * 0.1)}
            className="relative"
          >
            <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <Button 
                size="icon" 
                variant="ghost" 
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                onClick={() => handleRemoveBookmark(bookmark._id)}
              >
                <X size={18} />
                <span className="sr-only">Remove bookmark</span>
              </Button>

              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className={`
                    ${bookmark.contentType === 'project' ? 'bg-blue-50 text-blue-600 border-blue-200' : ''}
                    ${bookmark.contentType === 'article' ? 'bg-purple-50 text-purple-600 border-purple-200' : ''}
                    ${bookmark.contentType === 'news' ? 'bg-green-50 text-green-600 border-green-200' : ''}
                    ${bookmark.contentType === 'question' ? 'bg-amber-50 text-amber-600 border-amber-200' : ''}
                    ${bookmark.contentType === 'discussion' ? 'bg-rose-50 text-rose-600 border-rose-200' : ''}
                  `}>
                    <span className="flex items-center gap-1.5">
                      {getContentTypeIcon(bookmark.contentType)}
                      <span>{bookmark.contentType.charAt(0).toUpperCase() + bookmark.contentType.slice(1)}</span>
                    </span>
                  </Badge>
                  <span className="text-xs text-gray-500">{formatDate(bookmark.createdAt)}</span>
                </div>
                <CardTitle className="text-lg">
                  <Link 
                    to={getContentUrl(bookmark.contentType, bookmark.contentId)}
                    className="hover:text-purple-600 transition-colors"
                  >
                    {bookmark.contentTitle}
                  </Link>
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                {bookmark.contentSummary && (
                  <p className="text-gray-600 text-sm mb-4">{bookmark.contentSummary}</p>
                )}
                
                {bookmark.contentImage && (
                  <div className="h-40 rounded-md overflow-hidden mb-4">
                    <img 
                      src={bookmark.contentImage} 
                      alt={bookmark.contentTitle} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                {bookmark.contentAuthor && (
                  <div className="flex items-center gap-2 mt-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={bookmark.contentAuthor.profileImage} alt={bookmark.contentAuthor.fullName} />
                      <AvatarFallback>{bookmark.contentAuthor.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-gray-600">{bookmark.contentAuthor.fullName}</span>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="pt-0 flex justify-between">
                <Button 
                  size="sm" 
                  variant="outline" 
                  asChild
                  className="text-xs"
                >
                  <Link to={getContentUrl(bookmark.contentType, bookmark.contentId)}>
                    <ExternalLink size={14} className="mr-1" />
                    View {bookmark.contentType}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </MotionDiv>
        ))}
      </MotionSection>
    </div>
  );
}
