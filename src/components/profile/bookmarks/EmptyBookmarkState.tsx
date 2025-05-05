
import { Link } from "react-router-dom";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyBookmarkStateProps {
  activeTab: string;
}

export function EmptyBookmarkState({ activeTab }: EmptyBookmarkStateProps) {
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
