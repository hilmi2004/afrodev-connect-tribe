import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Bookmark, Share } from "lucide-react";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { CommentSection } from "@/components/CommentSection";

interface ProjectAuthor {
    name: string;
    country: string;
    avatar: string;
}

interface ProjectTribe {
    name: string;
    country?: string;
}

interface Project {
    id: string;
    title: string;
    description: string;
    image?: string;

    author: ProjectAuthor;
    tags: string[];
    likes: number;
    comments: number;
    bookmarks: number;
    tribe?: ProjectTribe | null;
    liked?: boolean;
}

export function ProjectShowcase() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showMore, setShowMore] = useState(false);
    const [expandedComments, setExpandedComments] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await api.get('/projects');
                console.log('API Response:', response.data);

                if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
                    throw new Error('Backend returned HTML instead of JSON. Check your API endpoint.');
                }

                let projectsData = response.data;
                if (response.data?.projects) {
                    projectsData = response.data.projects;
                } else if (!Array.isArray(response.data)) {
                    throw new Error('Invalid projects data format');
                }

                const validatedProjects = projectsData.map((project: any) => ({
                    id: project._id?.toString() || project.id,
                    title: project.title || 'Untitled Project',
                    description: project.description || '',
                    image: project.image || 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&h=400',
                    author: {
                        name: project.author?.name || project.creator?.fullName || 'Anonymous',
                        country: project.author?.country || project.creator?.country || '',
                        avatar: project.author?.avatar || project.creator?.profileImage || 'https://randomuser.me/api/portraits/lego/1.jpg'
                    },
                    tags: project.tags || project.techStack || [],
                    likes: project.likes || 0,
                    comments: project.comments || 0,
                    bookmarks: project.bookmarks || 0,
                    tribe: project.tribe || (project.tribeId ? {
                        name: project.tribeId.name,
                        country: project.tribeId.country
                    } : null),
                    liked: project.likedByUsers?.includes(user?._id) || false
                }));

                setProjects(validatedProjects);
            } catch (err) {
                console.error('Fetch projects error:', {
                    error: err,
                    response: err.response?.data
                });
                setError(err.response?.data?.message || err.message || 'Failed to load projects');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [user?._id]);

    const handleLike = async (projectId: string) => {
        if (!user) {
            toast({
                title: "Please login",
                description: "You need to be logged in to like projects",
                variant: "destructive"
            });
            return;
        }

        try {
            const response = await api.post(`/projects/${projectId}/like`);

            if (response.data.success) {
                setProjects(prevProjects =>
                    prevProjects.map(project =>
                        project.id === projectId
                            ? {
                                ...project,
                                likes: response.data.likes,
                                liked: true
                            }
                            : project
                    )
                );
            }
        } catch (error) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Failed to like project",
                variant: "destructive"
            });
        }
    };

    const handleUnlike = async (projectId: string) => {
        if (!user) {
            toast({
                title: "Please login",
                description: "You need to be logged in to unlike projects",
                variant: "destructive"
            });
            return;
        }

        try {
            const response = await api.post(`/projects/${projectId}/unlike`);

            if (response.data.success) {
                setProjects(prevProjects =>
                    prevProjects.map(project =>
                        project.id === projectId
                            ? {
                                ...project,
                                likes: response.data.likes,
                                liked: false
                            }
                            : project
                    )
                );
            }
        } catch (error) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Failed to unlike project",
                variant: "destructive"
            });
        }
    };

    const displayedProjects = showMore ? projects : projects.slice(0, 3);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                        <Skeleton className="h-48 w-full" />
                        <CardHeader>
                            <div className="flex items-center gap-2 mb-2">
                                <Skeleton className="h-8 w-8 rounded-full" />
                                <div className="space-y-1">
                                    <Skeleton className="h-4 w-[100px]" />
                                    <Skeleton className="h-3 w-[80px]" />
                                </div>
                            </div>
                            <Skeleton className="h-6 w-[200px] mb-2" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            {[...Array(3)].map((_, i) => (
                                <Skeleton key={i} className="h-6 w-[60px] rounded-full" />
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="text-red-500 mb-4">Error loading projects</div>
                <div className="text-sm text-gray-600 mb-6">{error}</div>
                <Button
                    onClick={() => window.location.reload()}
                    variant="outline"
                    className="mr-4"
                >
                    Retry
                </Button>
                <Button
                    onClick={() => setError(null)}
                    variant="ghost"
                >
                    Dismiss
                </Button>
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-500 mb-4">No projects found</div>
                <Button
                    onClick={() => window.location.reload()}
                    variant="outline"
                >
                    Refresh
                </Button>
            </div>
        );
    }

    return (
        <section className="w-full py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
                        <p className="text-lg text-gray-600 max-w-2xl">
                            Discover impressive projects built by developers across the continent.
                        </p>
                    </div>
                    <button
                        className="text-afro-purple hover:underline"
                        onClick={() => setShowMore(!showMore)}
                    >
                        {showMore ? "Show Less" : "View All Projects →"}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                    {displayedProjects.map((project) => (
                        <Card key={project.id} className="overflow-hidden group transition-all hover:shadow-lg flex flex-col">
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    loading="lazy"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400';
                                    }}
                                />
                            </div>
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 mb-2">
                                    <img
                                        src={project.author.avatar}
                                        alt={project.author.name}
                                        className="w-8 h-8 rounded-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://randomuser.me/api/portraits/lego/1.jpg';
                                        }}
                                    />
                                    <div>
                                        <p className="text-sm font-medium">{project.author.name}</p>
                                        {project.author.country && (
                                            <p className="text-xs text-muted-foreground">{project.author.country}</p>
                                        )}
                                    </div>
                                </div>
                                <CardTitle>{project.title}</CardTitle>
                                <CardDescription className="line-clamp-2 mt-1">
                                    {project.description}
                                </CardDescription>
                                {project.tribe && (
                                    <div className="mt-2">
                                        <Badge variant="outline">
                                            Tribe: {project.tribe.name}
                                            {project.tribe.country && ` • ${project.tribe.country}`}
                                        </Badge>
                                    </div>
                                )}
                            </CardHeader>
                            <CardContent className="pb-2">
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, i) => (
                                        <Badge key={i} variant="secondary" className="bg-gray-100">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="border-t pt-4 flex flex-col">
                                <div className="flex justify-between w-full mb-2">
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() =>
                                                project.liked
                                                    ? handleUnlike(project.id)
                                                    : handleLike(project.id)
                                            }
                                            className={`flex items-center gap-1 ${project.liked ? 'text-afro-red' : 'text-gray-500 hover:text-afro-red'}`}
                                        >
                                            <Heart className="h-4 w-4" fill={project.liked ? "#ef4444" : "none"} />
                                            <span className="text-xs">{project.likes}</span>
                                        </button>
                                        <CommentSection
                                            targetId={project.id}
                                            targetType="project"
                                            commentCount={project.comments}
                                            isExpanded={expandedComments === project.id}
                                            onToggleExpand={() =>
                                                setExpandedComments(expandedComments === project.id ? null : project.id)
                                            }
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="text-gray-500 hover:text-afro-gold">
                                            <Bookmark className="h-4 w-4" />
                                        </button>
                                        <button className="text-gray-500 hover:text-afro-green">
                                            <Share className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>


                            </CardFooter>


                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}