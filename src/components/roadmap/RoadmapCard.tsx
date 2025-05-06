import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, Heart, Share2, Users, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RoadmapCardProps {
    roadmap: {
        id: string;
        title: string;
        description: string;
        author?: string;
        authorImage?: string;
        likes?: number;
        downloads?: number;
        image?: string;
        tags?: string[];
        steps?: any[];
        difficulty?: string;
        timeToComplete?: string;
        communityRating?: number;
        communitySize?: number;
    };
    featured?: boolean;
}

export function RoadmapCard({ roadmap, featured = false }: RoadmapCardProps) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/roadmap/${roadmap.id}`);
    };

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        // Handle like logic here
    };

    const handleDownload = (e: React.MouseEvent) => {
        e.stopPropagation();
        // Handle download logic here
    };

    const handleShare = (e: React.MouseEvent) => {
        e.stopPropagation();
        // Handle share logic here
    };

    return (
        <Card
            onClick={handleCardClick}
            className={`group cursor-pointer transition-all duration-300 hover:-translate-y-1 overflow-hidden border-0 shadow-lg ${
                featured ? 'md:col-span-2 md:row-span-2' : ''
            }`}
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    src={roadmap.image || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"}
                    alt={roadmap.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>

                <div className="absolute bottom-0 left-0 p-4 w-full">
                    <div className="flex gap-2 mb-2 flex-wrap">
                        {roadmap.tags?.slice(0, featured ? 4 : 2).map((tag, i) => (
                            <Badge key={i} className="bg-afro-purple text-white border-none">
                                {tag}
                            </Badge>
                        ))}
                        {roadmap.tags && roadmap.tags.length > (featured ? 4 : 2) && (
                            <Badge variant="outline" className="bg-black/30 text-white border-white/20">
                                +{roadmap.tags.length - (featured ? 4 : 2)} more
                            </Badge>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-white/90">
                            <Users size={14} />
                            <span className="text-xs">{roadmap.communitySize || 0}</span>
                        </div>

                        <div className="flex items-center gap-1 text-white/90">
                            <Clock size={14} />
                            <span className="text-xs">{roadmap.timeToComplete || '2 weeks'}</span>
                        </div>

                        <div className="flex items-center gap-1 text-white/90">
                            <Heart size={14} className="fill-white/90" />
                            <span className="text-xs">{roadmap.likes || 0}</span>
                        </div>
                    </div>
                </div>
            </div>

            <CardContent className="p-4 pt-5">
                <div className="flex justify-between items-start mb-3">
                    <h3 className={`font-bold text-gray-900 ${featured ? 'text-xl' : 'text-lg'} line-clamp-2`}>
                        {roadmap.title}
                    </h3>

                    <Badge
                        variant="outline"
                        className={`
              ${roadmap.difficulty === 'Beginner' ? 'border-green-500 text-green-700 bg-green-50' :
                            roadmap.difficulty === 'Intermediate' ? 'border-amber-500 text-amber-700 bg-amber-50' :
                                'border-red-500 text-red-700 bg-red-50'}
            `}
                    >
                        {roadmap.difficulty || 'Beginner'}
                    </Badge>
                </div>

                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {roadmap.description}
                </p>

                <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                            <img
                                src={roadmap.authorImage || "https://api.dicebear.com/6.x/avataaars/svg?seed=Felix"}
                                alt={roadmap.author || "Author"}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="text-xs text-gray-600 ml-2">
              {roadmap.author || "Anonymous"}
            </span>
                    </div>

                    <div className="flex-grow"></div>

                    <div className="flex items-center text-xs text-gray-500">
                        <BookOpen size={14} className="mr-1" />
                        <span>{roadmap.steps?.length || 0} steps</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between w-full">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 hover:text-afro-purple hover:bg-afro-purple/5"
                        onClick={(e) => handleLike(e)}
                    >
                        <Heart size={16} className="mr-1" />
                        Like
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 hover:text-afro-purple hover:bg-afro-purple/5"
                        onClick={(e) => handleDownload(e)}
                    >
                        <Download size={16} className="mr-1" />
                        Download
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 hover:text-afro-purple hover:bg-afro-purple/5"
                        onClick={(e) => handleShare(e)}
                    >
                        <Share2 size={16} className="mr-1" />
                        Share
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}