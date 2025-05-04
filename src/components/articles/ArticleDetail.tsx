
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  UserRound, Calendar, Heart, Share2, Clock, ArrowLeft,
  BookOpen, Tags, Eye, ArrowRight
} from "lucide-react";
import { CommentSection } from "@/components/comments/CommentSection";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

interface ArticleDetailProps {
  article: {
    _id: string;
    title: string;
    content: string;
    author: {
      _id: string;
      fullName: string;
      profileImage?: string;
      profession?: string;
    };
    authorName: string;
    slug: string;
    excerpt: string;
    featuredImage?: string;
    tags: string[];
    category: string;
    readTime: number;
    likes: number;
    comments: any[];
    createdAt: Date;
    updatedAt: Date;
    status: 'draft' | 'published';
    isPromoted: boolean;
    views: number;
  };
  comments: any[];
  onAddComment: (content: string, parentId?: string) => Promise<void>;
  onEditComment: (commentId: string, content: string) => Promise<void>;
  onDeleteComment: (commentId: string) => Promise<void>;
  onLikeComment: (commentId: string, isLiked: boolean) => Promise<void>;
  onLikeArticle: () => Promise<void>;
}

export function ArticleDetail({
  article,
  comments,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onLikeComment,
  onLikeArticle
}: ArticleDetailProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("article");

  const handleBackToProfile = () => {
    navigate(`/profile/${article.author._id}`);
  };

  return (
    <div className="container max-w-5xl py-8">
      <Button 
        variant="outline" 
        onClick={handleBackToProfile} 
        className="mb-6 flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Author's Profile</span>
      </Button>
      
      <div className="grid grid-cols-1 gap-8">
        {/* Article Header */}
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                  {article.category}
                </Badge>
                
                {article.isPromoted && (
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                    Featured
                  </Badge>
                )}
                
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <Eye className="h-4 w-4" />
                  <span>{article.views} views</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mt-2">{article.title}</h1>
            </div>
            
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <Button 
                variant="outline"
                onClick={onLikeArticle}
                className="flex items-center gap-2"
              >
                <Heart className="h-4 w-4" />
                <span>{article.likes}</span>
              </Button>
              
              <Button 
                variant="outline"
                className="flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
          </div>
          
          <div className="w-full h-80 rounded-xl overflow-hidden bg-gray-200 mb-6">
            {article.featuredImage ? (
              <img 
                src={article.featuredImage} 
                alt={article.title} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-100">
                <BookOpen className="h-16 w-16 text-gray-400" />
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{formatDistanceToNow(new Date(article.createdAt), { addSuffix: true })}</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{article.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Author Info */}
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-afro-purple/20 to-afro-blue/20 p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-white">
                <AvatarImage src={article.author.profileImage} alt={article.author.fullName} />
                <AvatarFallback>
                  <UserRound className="h-8 w-8 text-gray-400" />
                </AvatarFallback>
              </Avatar>
              
              <div>
                <h2 className="text-xl font-semibold">{article.author.fullName}</h2>
                <p className="text-gray-600">{article.author.profession || "Writer"}</p>
              </div>
              
              <div className="ml-auto">
                <Button 
                  onClick={handleBackToProfile}
                  variant="outline"
                  className="bg-white hover:bg-gray-100"
                >
                  View Profile
                </Button>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Tab Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="article">Article</TabsTrigger>
            <TabsTrigger value="discussion">
              Discussion
              <Badge className="ml-2">{comments.length}</Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="article">
            <Card>
              <CardContent className="p-6">
                <div className="prose prose-lg max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>
                
                <Separator className="my-8" />
                
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Tags className="h-5 w-5 text-afro-purple" />
                    <span>Tags</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <Button 
                    onClick={() => setActiveTab("discussion")}
                    className="bg-afro-purple hover:bg-afro-purple/90 flex items-center gap-2"
                  >
                    <span>Join the discussion</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="discussion">
            <Card>
              <CardContent className="p-6">
                <CommentSection 
                  entityId={article._id}
                  entityType="article"
                  comments={comments}
                  onAddComment={onAddComment}
                  onEditComment={onEditComment}
                  onDeleteComment={onDeleteComment}
                  onLikeComment={onLikeComment}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
