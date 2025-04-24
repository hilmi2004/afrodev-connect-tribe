import { MainLayout } from "@/components/layout/MainLayout";
import { Tribes as TribesComponent } from "@/components/home/Tribes";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TribeCreate } from "@/components/tribes/TribeCreate";

const Tribes = () => {
  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-afro-green/20 to-transparent">
        <div className="max-w-6xl mx-auto py-16 px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Tech Tribes</h1>
              <p className="text-lg text-gray-600 max-w-3xl">
                Join specialized tech communities based on location, language, or interest to collaborate and grow together.
              </p>
            </div>
            <TribeCreate />
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search tribes by name, location, or technology..."
                className="pl-10"
              />
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="rounded-full">All Tribes</Button>
              <Button variant="outline" size="sm" className="rounded-full">Web Development</Button>
              <Button variant="outline" size="sm" className="rounded-full">Mobile Apps</Button>
              <Button variant="outline" size="sm" className="rounded-full">UI/UX Design</Button>
              <Button variant="outline" size="sm" className="rounded-full">AI/ML</Button>
              <Button variant="outline" size="sm" className="rounded-full">Blockchain</Button>
              <Button variant="outline" size="sm" className="rounded-full">Data Science</Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reuse Tribes component from the home page */}
      <TribesComponent />

      {/* Add more rows of tribes */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-8">Recent Tribes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all">
              <div className="h-32 bg-gradient-to-r from-afro-purple to-indigo-500 relative">
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                  Tribe #{i}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">Africa DevOps Engineers</h3>
                <p className="text-gray-600 text-sm mb-4">A community for DevOps engineers across Africa sharing infrastructure as code tips and cloud deployment strategies.</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">56 members</span>
                  <Button variant="outline" size="sm">Join Tribe</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button className="bg-afro-purple hover:bg-afro-purple/90">
            Load More Tribes
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Tribes;
