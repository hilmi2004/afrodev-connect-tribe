import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { MainLayout } from "@/components/layout/MainLayout";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Clock, User as UserIcon, ArrowLeft, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MotionDiv, fadeIn } from "@/components/ui/motion";

export default function ArticlePage() {
    const { slug } = useParams();
    const { toast } = useToast();
    const { user } = useAuth();
    const navigate = useNavigate();

    const {
        data: article,
        isLoading,
        error,
        isError
    } = useQuery({
        queryKey: ['article', slug],
        queryFn: async () => {
            const response = await api.get(`articles/${slug}`);
            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to fetch article');
            }
            return response.data.article;
        },
        retry: 2,
        staleTime: 1000 * 60 * 5 // 5 minutes
    });

    // Increment views when article loads
    useEffect(() => {
        if (article?._id) {
            api.post(`/articles/${article._id}/views`);
        }
    }, [article?._id]);

    // Show error toast if there's an error
    useEffect(() => {
        if (isError) {
            toast({
                title: "Error loading article",
                description: error.message,
                variant: "destructive"
            });
        }
    }, [isError, error, toast]);

    if (isLoading) {
        return (
            <MainLayout>
                <div className="container py-8 flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
                </div>
            </MainLayout>
        );
    }

    if (!article || isError) {
        return (
            <MainLayout>
                <div className="container py-8 text-center">
                    <h1 className="text-2xl font-bold mb-4">Article not found</h1>
                    <Button asChild>
                        <Link to="/">Back to Home</Link>
                    </Button>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <MotionDiv
                variants={fadeIn(0.1)}
                initial="hidden"
                animate="visible"
                className="container py-8 max-w-4xl mx-auto"
            >
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="mb-6 gap-2 text-gray-600 hover:text-purple-600"
                >
                    <ArrowLeft size={16} />
                    <span>Back to articles</span>
                </Button>

                <article className="prose prose-lg max-w-none">
                    <header className="mb-10">
                        <div className="flex items-center gap-4 mb-6">
                            <Avatar className="w-12 h-12">
                                <AvatarImage
                                    src={article.author.profileImage}
                                    alt={article.author.fullName}
                                />
                                <AvatarFallback>
                                    <UserIcon size={24} />
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-medium">{article.author.fullName}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={14} />
                                        {new Date(article.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock size={14} />
                                        {article.readTime} min read
                                    </span>
                                    <span>{article.views} views</span>
                                </div>
                            </div>
                        </div>

                        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
                        <p className="text-xl text-gray-600 mb-6">{article.excerpt}</p>

                        <div className="flex flex-wrap gap-2">
                            {article.tags.map((tag, i) => (
                                <Badge
                                    key={i}
                                    variant="outline"
                                    className="bg-purple-600/5 text-purple-600/90 border-purple-600/10 text-sm"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </header>

                    <div
                        className="article-content"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                </article>

                {user?._id === article.author._id && (
                    <div className="mt-10 border-t pt-6 flex justify-end">
                        <Button variant="outline" asChild className="gap-2">
                            <Link to={`/profile/edit?tab=content`}>
                                <Edit size={16} />
                                <span>Edit Article</span>
                            </Link>
                        </Button>
                    </div>
                )}
            </MotionDiv>
        </MainLayout>
    );
}