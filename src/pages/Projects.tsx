
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProjectShowcase } from "@/components/home/ProjectShowcase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Search, Filter } from "lucide-react";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    country: "",
    technology: "",
    category: ""
  });
  
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };
  
  const clearFilters = () => {
    setFilters({
      country: "",
      technology: "",
      category: ""
    });
    setSelectedTags([]);
  };

  const countries = ["Kenya", "Nigeria", "South Africa", "Ghana", "Egypt", "Rwanda", "Senegal"];
  const technologies = ["React", "Vue", "Angular", "Node.js", "Django", "Flask", "Laravel", "Next.js"];
  const categories = ["Web", "Mobile", "AI/ML", "Blockchain", "IoT", "Data Science", "Design", "E-commerce"];

  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-afro-purple/20 to-transparent">
        <div className="max-w-6xl mx-auto py-16 px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover African Tech Projects</h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-8">
            Explore innovative projects built by developers across Africa, from web applications to mobile solutions.
          </p>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filters.country} onValueChange={(value) => setFilters({...filters, country: value})}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={filters.technology} onValueChange={(value) => setFilters({...filters, technology: value})}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Technology" />
                </SelectTrigger>
                <SelectContent>
                  {technologies.map((tech) => (
                    <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={filters.category} onValueChange={(value) => setFilters({...filters, category: value})}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-wrap gap-2 items-center">
              <span className="flex items-center text-sm text-gray-500">
                <Filter className="h-4 w-4 mr-1" />
                Active Filters:
              </span>
              
              {selectedTags.length === 0 && Object.values(filters).every(f => f === "") ? (
                <span className="text-sm text-gray-500">None</span>
              ) : (
                <>
                  {selectedTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button onClick={() => removeTag(tag)} className="ml-1">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  
                  {Object.entries(filters).map(([key, value]) => 
                    value ? (
                      <Badge key={key} variant="secondary" className="flex items-center gap-1">
                        {key}: {value}
                        <button 
                          onClick={() => setFilters({...filters, [key]: ""})} 
                          className="ml-1"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ) : null
                  )}
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="text-xs text-gray-500"
                  >
                    Clear all
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* ProjectShowcase component is reused here */}
      <ProjectShowcase />
      
      {/* Additional rows of projects would be displayed here */}
      <div className="w-full py-12 text-center">
        <Button className="bg-afro-purple hover:bg-afro-purple/90">
          Load More Projects
        </Button>
      </div>
    </MainLayout>
  );
};

export default Projects;
