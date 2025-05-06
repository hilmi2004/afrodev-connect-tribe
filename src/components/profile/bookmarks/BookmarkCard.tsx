
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MotionDiv } from "@/components/ui/motion";
import { Link } from "react-router-dom";
import { X, ExternalLink } from "lucide-react";
import { IBookmark } from "@/models/Bookmark";
import { getContentTypeIcon, getContentUrl, formatDate } from "./BookmarkUtils";

interface BookmarkCardProps {
  bookmark: IBookmark;
  index: number;
  onRemove: (bookmarkId: string) => void;
}

export function BookmarkCard({ bookmark, index, onRemove }: BookmarkCardProps) {
  return (
    <MotionDiv
      key={bookmark._id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            delay: index * 0.1,
            duration: 0.5
          }
        }
      }}
      className="relative"
    >
      <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 hover:shadow-md transition-all duration-300">
        <Button 
          size="icon" 
          variant="ghost" 
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          onClick={() => onRemove(bookmark._id)}
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
  );
}
