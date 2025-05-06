import { MainLayout } from "@/components/layout/MainLayout";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Globe, Briefcase, FileCode, User, ChevronRight, Clock, MessageSquare, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useDevelopers } from "@/hooks/useDevelopers";
import { useAuth } from "@/hooks/useAuth";
import { FollowButton } from "@/components/FollowButton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Developer {
  _id: string;
  fullName: string;
  username?: string;
  title?: string;
  country: string;
  bio?: string;
  programmingLanguages?: string[];
  interests?: string[];
  languages?: string[];
  profileImage?: string;
  followers?: string[];
  following?: string[];
  available?: boolean;
  likes?: number;
  comments?: number;
}

const Discover = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [page, setPage] = useState(1);
  const [allDevelopers, setAllDevelopers] = useState<Developer[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const limit = 6;

  const { user: currentUser } = useAuth();
  const { data, isLoading, error, refetch } = useDevelopers(
      searchTerm,
      selectedCountry,
      selectedSkill,
      page,
      limit
  );

  const countries = ["Nigeria", "Ghana", "Egypt", "Kenya", "Zimbabwe", "Senegal", "South Africa", "Rwanda"];
  const skills = ["React", "Node.js", "Python", "UI Design", "Mobile Development", "DevOps", "AWS", "Flutter"];

  useEffect(() => {
    if (data) {
      if (page === 1) {
        setAllDevelopers(data.data);
      } else {
        setAllDevelopers(prev => [...prev, ...data.data]);
      }
      setHasMore(data.total > page * limit);
    }
  }, [data, page, limit]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

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
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setPage(1);
                      }}
                      className="pl-10"
                  />
                </div>

                <Select
                    value={selectedCountry}
                    onValueChange={(value) => {
                      setSelectedCountry(value);
                      setPage(1);
                    }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                    value={selectedSkill}
                    onValueChange={(value) => {
                      setSelectedSkill(value);
                      setPage(1);
                    }}
                >
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
          {isLoading && page === 1 ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
              </div>
          ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">Error loading developers</p>
                <Button
                    onClick={() => refetch()}
                    variant="outline"
                    className="mt-4 border-purple-600 text-purple-600 hover:bg-purple-600/10"
                >
                  Retry
                </Button>
              </div>
          ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {allDevelopers.map((developer) => (
                      <Card key={developer._id} className="overflow-hidden hover:shadow-md transition-all group">
                        <CardContent className="p-0">
                          <div className="p-6">
                            <div className="flex items-start gap-4">
                              <Link to={`/users/${developer._id}`} className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm">
                                {developer.profileImage ? (
                                    <img
                                        src={developer.profileImage}
                                        alt={developer.fullName}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                      <User className="h-8 w-8 text-gray-500" />
                                    </div>
                                )}
                              </Link>
                              <div>
                                <Link to={`/users/${developer._id}`} className="font-bold text-lg hover:text-purple-600 transition-colors">
                                  {developer.fullName}
                                </Link>
                                {developer.username && (
                                    <p className="text-sm text-gray-500">@{developer.username}</p>
                                )}

                                {developer.interests?.[0] && (
                                    <p className="text-gray-600 text-sm mt-1">
                                      <Briefcase className="h-4 w-4 inline mr-1" />
                                      {developer.interests[0]}
                                    </p>
                                )}

                                {developer.title && (
                                    <p className="text-gray-600 text-sm">{developer.title}</p>
                                )}

                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  <span>{developer.country}</span>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4">
                              <div className="flex items-center gap-2 mb-2">
                                <FileCode className="h-4 w-4 text-gray-400" />
                                <span className="text-sm font-medium">Skills:</span>
                              </div>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {developer.programmingLanguages?.map((skill, i) => (
                                    <Badge key={i} variant="secondary" className="bg-gray-100">{skill}</Badge>
                                ))}
                              </div>

                              {developer.languages && (
                                  <>
                                    <div className="flex items-center gap-2 mb-2">
                                      <Globe className="h-4 w-4 text-gray-400" />
                                      <span className="text-sm font-medium">Languages:</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                      {developer.languages.map((language, i) => (
                                          <span key={i} className="text-sm text-gray-600">
                                  {language}{i < developer.languages.length - 1 ? ',' : ''}
                                </span>
                                      ))}
                                    </div>
                                  </>
                              )}
                            </div>
                          </div>

                          <div className="flex border-t">
                            <div className="flex-1 p-3 text-center flex items-center justify-center border-r">
                              <div className={`flex items-center justify-center gap-1 ${developer.available ? 'text-green-600' : 'text-gray-400'}`}>
                                <div className={`h-2 w-2 rounded-full flex ${developer.available ? 'bg-green-600' : 'bg-gray-400'}`}></div>
                                <span className="text-xs flex items-center justify-center">{developer.available ? 'Available' : 'Unavailable'}</span>
                              </div>
                            </div>
                            <div className="flex-1 p-3 text-center flex items-center justify-center">
                              {currentUser?._id !== developer._id && (
                                  <FollowButton
                                      userId={developer._id}
                                      isFollowing={currentUser?.following?.includes(developer._id) || false}
                                  />
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                  ))}
                </div>

                {hasMore && (
                    <div className="text-center">
                      <Button
                          className="bg-afro-purple hover:bg-afro-purple/90"
                          onClick={handleLoadMore}
                          disabled={isLoading}
                      >
                        {isLoading ? 'Loading...' : 'Load More Developers'}
                      </Button>
                    </div>
                )}
              </>
          )}
        </div>
      </MainLayout>
  );
};

export default Discover;