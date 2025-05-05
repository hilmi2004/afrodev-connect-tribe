
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface BookmarkButtonProps {
  contentType: 'project' | 'article' | 'news' | 'question' | 'discussion';
  contentId: string;
  contentTitle: string;
  contentSummary?: string;
  contentImage?: string;
  contentAuthor?: {
    _id: string;
    fullName: string;
    profileImage?: string;
  };
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export function BookmarkButton({
  contentType,
  contentId,
  contentTitle,
  contentSummary,
  contentImage,
  contentAuthor,
  variant = 'outline',
  size = 'sm',
  className = ''
}: BookmarkButtonProps) {
  const { user } = useAuth();
  const { loading, addBookmark, removeBookmark, checkIsBookmarked } = useBookmarks();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (!user?._id) return;
      
      const bookmarked = await checkIsBookmarked(user._id, contentType, contentId);
      setIsBookmarked(bookmarked);
    };
    
    checkBookmarkStatus();
  }, [user, contentType, contentId, checkIsBookmarked]);
  
  const handleToggleBookmark = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to bookmark items",
        variant: "destructive"
      });
      return;
    }
    
    if (isBookmarked) {
      // We don't have the bookmark ID in this component
      // In a real implementation, we would get it from the API
      const success = await removeBookmark("temp-id");
      if (success) {
        setIsBookmarked(false);
      }
    } else {
      const success = await addBookmark(
        user._id as string,
        contentType,
        contentId,
        contentTitle,
        contentSummary,
        contentImage,
        contentAuthor
      );
      if (success) {
        setIsBookmarked(true);
      }
    }
  };
  
  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggleBookmark}
      disabled={loading}
      className={`gap-1.5 ${isBookmarked ? 'text-amber-500 border-amber-200 hover:bg-amber-50 hover:text-amber-600' : ''} ${className}`}
    >
      <Bookmark size={size === 'icon' ? 18 : 16} className={isBookmarked ? 'fill-amber-500' : ''} />
      {size !== 'icon' && (isBookmarked ? 'Bookmarked' : 'Bookmark')}
    </Button>
  );
}
