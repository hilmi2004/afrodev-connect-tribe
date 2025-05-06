// src/pages/Tribes.tsx
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TribeCreate } from "@/components/tribes/TribeCreate";
import { useTribes } from '@/hooks/useTribes';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, User, ArrowRight } from 'lucide-react';
import { Tribe } from '@/types/tribe';

const Tribes = () => {
  const navigate = useNavigate();
  const { tribes, loading, error, fetchTribes } = useTribes();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('');

  useEffect(() => {
    fetchTribes({ search: searchTerm, tag: filterTag });
  }, [searchTerm, filterTag, fetchTribes]);

  const popularTags = [
    'All Tribes', 'Web Development', 'Mobile Apps', 'UI/UX Design',
    'AI/ML', 'Blockchain', 'Data Science'
  ];

  if (error) {
    return (
        <MainLayout>
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <Button onClick={() => fetchTribes({})} className="mt-4">
              Retry
            </Button>
          </div>
        </MainLayout>
    );
  }

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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                    <Button
                        key={tag}
                        variant={filterTag === tag || (tag === 'All Tribes' && !filterTag) ? 'default' : 'outline'}
                        size="sm"
                        className="rounded-full"
                        onClick={() => tag === 'All Tribes' ? setFilterTag('') : setFilterTag(tag)}
                    >
                      {tag}
                    </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-12">
          {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-afro-purple"></div>
              </div>
          ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  {tribes.map((tribe: Tribe) => (
                      <div
                          key={tribe._id}
                          className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all cursor-pointer"
                          onClick={() => navigate(`/tribes/${tribe._id}`)}
                      >
                        <div className="h-32 bg-gradient-to-r from-afro-purple to-indigo-500 relative overflow-hidden">
                          <img
                              src={tribe.image || "https://images.unsplash.com/photo-1653564142048-d5af2cf9b50f?q=80&w=1930&auto=format&fit=crop"}
                              alt={tribe.name}
                              className="w-full h-full object-cover opacity-30"
                          />
                          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                            {tribe.name}
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="font-bold text-lg mb-2">{tribe.name}</h3>
                          <p className="text-gray-600 text-sm mb-4">{tribe.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {tribe.tags.slice(0, 3).map((tag, i) => (
                                <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{tribe.country}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <User className="h-4 w-4 mr-1" />
                              <span>{tribe.members.length} members</span>
                            </div>
                          </div>
                        </div>
                        <CardFooter className="bg-gray-50 border-t">
                          <button
                              className="w-full py-2 text-afro-purple font-medium flex items-center justify-center hover:bg-gray-100 transition-colors rounded"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle join/leave logic here
                              }}
                          >
                            Join Tribe
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </button>
                        </CardFooter>
                      </div>
                  ))}
                </div>

                <div className="text-center">
                  <Button
                      className="bg-afro-purple hover:bg-afro-purple/90"
                      onClick={() => fetchTribes({ limit: tribes.length + 9 })}
                      disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Load More Tribes'}
                  </Button>
                </div>
              </>
          )}
        </div>
      </MainLayout>
  );
};

export default Tribes;