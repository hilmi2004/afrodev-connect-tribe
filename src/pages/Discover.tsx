
import { MainLayout } from "@/components/layout/MainLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Globe, Briefcase, FileCode, User, ChevronRight } from "lucide-react";

const Discover = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  
  const developers = [
    {
      id: 1,
      name: "Amara Ndubisi",
      title: "Senior Frontend Developer",
      location: "Lagos, Nigeria",
      skills: ["React", "TypeScript", "TailwindCSS"],
      languages: ["English", "Yoruba"],
      available: true,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      name: "Kwame Osei",
      title: "Backend Engineer",
      location: "Accra, Ghana",
      skills: ["Node.js", "Express", "MongoDB"],
      languages: ["English", "Twi"],
      available: false,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      name: "Fatima Ahmed",
      title: "UI/UX Designer",
      location: "Cairo, Egypt",
      skills: ["Figma", "Adobe XD", "UI Design"],
      languages: ["Arabic", "English"],
      available: true,
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      id: 4,
      name: "David Kamau",
      title: "Full Stack Developer",
      location: "Nairobi, Kenya",
      skills: ["React", "Django", "PostgreSQL"],
      languages: ["English", "Swahili"],
      available: true,
      avatar: "https://randomuser.me/api/portraits/men/67.jpg"
    },
    {
      id: 5,
      name: "Zainab Ndlovu",
      title: "Mobile Developer",
      location: "Harare, Zimbabwe",
      skills: ["Flutter", "Firebase", "Dart"],
      languages: ["English", "Shona"],
      available: false,
      avatar: "https://randomuser.me/api/portraits/women/22.jpg"
    },
    {
      id: 6,
      name: "Moussa Diop",
      title: "DevOps Engineer",
      location: "Dakar, Senegal",
      skills: ["AWS", "Docker", "Kubernetes"],
      languages: ["French", "Wolof", "English"],
      available: true,
      avatar: "https://randomuser.me/api/portraits/men/19.jpg"
    }
  ];
  
  const countries = ["Nigeria", "Ghana", "Egypt", "Kenya", "Zimbabwe", "Senegal", "South Africa", "Rwanda"];
  const skills = ["React", "Node.js", "Python", "UI Design", "Mobile Development", "DevOps", "AWS", "Flutter"];

  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-afro-gold/20 to-transparent">
        <div className="max-w-6xl mx-auto py-16 px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover Developers</h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-8">
            Connect with talented tech professionals across Africa. Filter by country, skills, or languages.
          </p>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search developers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Skill" />
                </SelectTrigger>
                <SelectContent>
                  {skills.map((skill) => (
                    <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" className="bg-afro-purple/10 text-afro-purple border border-afro-purple/20">
                Available for Work
              </Button>
              <Button variant="outline" size="sm">Speaks English</Button>
              <Button variant="outline" size="sm">Remote Only</Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {developers.map((developer) => (
            <Card key={developer.id} className="overflow-hidden hover:shadow-md transition-all">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <img 
                      src={developer.avatar} 
                      alt={developer.name} 
                      className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{developer.name}</h3>
                      <p className="text-gray-600">{developer.title}</p>
                      
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{developer.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FileCode className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium">Skills:</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {developer.skills.map((skill, i) => (
                        <Badge key={i} variant="secondary" className="bg-gray-100">{skill}</Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium">Languages:</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {developer.languages.map((language, i) => (
                        <span key={i} className="text-sm text-gray-600">{language}{i < developer.languages.length - 1 ? ',' : ''}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex border-t">
                  <div className="flex-1 p-3 text-center border-r">
                    <div className={`flex items-center justify-center gap-1 ${developer.available ? 'text-green-600' : 'text-gray-400'}`}>
                      <div className={`h-2 w-2 rounded-full ${developer.available ? 'bg-green-600' : 'bg-gray-400'}`}></div>
                      <span className="text-xs">{developer.available ? 'Available for work' : 'Unavailable'}</span>
                    </div>
                  </div>
                  <div className="flex-1 p-3 text-center">
                    <Button variant="ghost" size="sm" className="text-afro-purple hover:text-afro-purple/80 flex items-center justify-center w-full">
                      View Profile
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button className="bg-afro-purple hover:bg-afro-purple/90">
            Load More Developers
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Discover;
