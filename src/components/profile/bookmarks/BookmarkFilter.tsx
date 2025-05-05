
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BookmarkFilterProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export function BookmarkFilter({ activeTab, onTabChange }: BookmarkFilterProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-gray-100 p-4">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
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
  );
}
