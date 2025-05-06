
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { IBookmark } from "@/models/Bookmark";
import { MotionSection } from "@/components/ui/motion";
import { staggerContainer } from "@/components/ui/motion";
import { MOCK_BOOKMARKS } from "./bookmarks/BookmarkUtils";
import { BookmarkLoadingSkeleton } from "./bookmarks/BookmarkLoadingSkeleton";
import { EmptyBookmarkState } from "./bookmarks/EmptyBookmarkState";
import { BookmarkCard } from "./bookmarks/BookmarkCard";
import { BookmarkFilter } from "./bookmarks/BookmarkFilter";

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
    return <BookmarkLoadingSkeleton />;
  }

  if (filteredBookmarks.length === 0) {
    return <EmptyBookmarkState activeTab={activeTab} />;
  }

  return (
    <div className="space-y-6">
      <BookmarkFilter activeTab={activeTab} onTabChange={setActiveTab} />

      <MotionSection
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {filteredBookmarks.map((bookmark, index) => (
          <BookmarkCard 
            key={bookmark._id}
            bookmark={bookmark} 
            index={index}
            onRemove={handleRemoveBookmark}
          />
        ))}
      </MotionSection>
    </div>
  );
}
