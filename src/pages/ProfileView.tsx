import { MainLayout } from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Github,
  Globe,
  Twitter,
  Linkedin,
  Mail,
  MapPin,
  Briefcase,
  Calendar,
  Code,
  Users,
  BookOpen,
  Star,
  Award,
  User as UserIcon,
  Clock
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import {
  MotionDiv,
  MotionSection,
  fadeIn,
  slideInUp,
  slideInLeft,
  slideInRight,
  staggerContainer
} from "@/components/ui/motion";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import qs from "qs";
import { MessageSquare } from "lucide-react";
import { CommentSection } from "@/components/CommentSection";
import { FollowButton } from "@/components/FollowButton";
import { Skeleton } from "@/components/ui/skeleton";

type Project = {
  comments: number;
  _id: string;
  title: string;
  description: string;
  image?: string;
  techStack?: string[];
  likes?: number;
  demoUrl?: string;
  repoUrl?: string;
  status?: string;
  lookingForContributors?: boolean;
  creator?: {
    _id: string;
    fullName: string;
    profileImage?: string;
    country?: string;
  };
  tribeId?: {
    _id: string;
    name?: string;
    country?: string;
  };
};

type Article = {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  tags?: string[];
  readTime: string;
  createdAt: string;
  likes: number;
  comments: number;
};

type UserProfile = {
  _id: string;
  fullName: string;
  username?: string;
  email: string;
  bio?: string;
  country?: string;
  profileImage?: string;
  coverImage?: string;
  programmingLanguages?: string[];
  languages?: string[];
  followers?: string[];
  following?: string[];
  socialLinks?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  experience?: Array<{
    title: string;
    company: string;
    period: string;
    description: string;
  }>;
  education?: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  createdAt: string;
};

const getTimelineIcon = (type: string) => {
  switch (type) {
    case "award":
      return <Award className="text-amber-500" />;
    case "project":
      return <Code className="text-blue-500" />;
    case "event":
    case "learning":
      return <Users className="text-green-500" />;
    case "article":
      return <BookOpen className="text-purple-500" />;
    case "career":
      return <Briefcase className="text-orange-500" />;
    default:
      return <Calendar className="text-gray-500" />;
  }
};

export default function ProfileView() {
  const [activeTab, setActiveTab] = useState("projects");
  const [expandedComments, setExpandedComments] = useState<string | null>(null);
  const navigate = useNavigate();
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const queryClient = useQueryClient();

  // Update the user query to handle undefined userId
  const {
    data: profileUser,
    isLoading: userLoading,
    error: userError
  } = useQuery<UserProfile>({
    queryKey: ["user", userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User ID is required");
      }
      const response = await api.get(`/users/${userId}`);
      return response.data.user || response.data; // Handle both response formats
    },
    enabled: !!userId, // Only run if userId exists
  });

  const {
    data: userProjects = [],
    isLoading: projectsLoading,
    error: projectsError,
    refetch: refetchProjects
  } = useQuery<Project[]>({
    queryKey: ["userProjects", userId],
    queryFn: async () => {
      try {
        const response = await api.get("/projects", {
          params: {
            creator: userId
          },
          paramsSerializer: params => {
            return qs.stringify(params, { indices: false });
          }
        });
        return response.data.projects || [];
      } catch (error: any) {
        console.error("Projects fetch error:", error);
        throw error;
      }
    },
    enabled: !!userId,
    retry: 2,
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: userArticles = [],
    isLoading: articlesLoading,
    error: articlesError,
    refetch: refetchArticles
  } = useQuery<Article[]>({
    queryKey: ["userArticles", userId],
    queryFn: async () => {
      try {
        const response = await api.get(`/articles/user/${userId}`);
        return response.data.articles || [];
      } catch (error) {
        console.error("Articles fetch error:", error);
        throw error;
      }
    },
    enabled: !!userId,
    retry: 2,
    staleTime: 1000 * 60 * 5,
  });

  const handleEditProfile = () => {
    navigate("/profile/edit");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const joinDate = profileUser?.createdAt
      ? formatDate(profileUser.createdAt)
      : "Unknown";

  if (userLoading) {
    return (
        <MainLayout>
          <div className="container py-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-1/3 space-y-6">
                <Skeleton className="h-64 rounded-xl" />
                <Skeleton className="h-32 rounded-xl" />
                <Skeleton className="h-64 rounded-xl" />
              </div>
              <div className="w-full lg:w-2/3">
                <Skeleton className="h-96 rounded-xl" />
              </div>
            </div>
          </div>
        </MainLayout>
    );
  }

  if (userError) {
    return (
        <MainLayout>
          <div className="container py-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Error Loading Profile</h1>
            <p className="text-red-500 mb-4">Failed to load user profile</p>
            <Button onClick={() => queryClient.refetchQueries({ queryKey: ["user", userId] })}>
              Retry
            </Button>
          </div>
        </MainLayout>
    );
  }

  return (
      <MainLayout>
        <div className="relative overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-600/10 rounded-full blur-3xl"></div>

          <div className="container py-8 relative">
            <div className="h-64 md:h-80 rounded-2xl overflow-hidden relative mb-20">
              <img
                  src={profileUser?.coverImage || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1470&auto=format&fit=crop"}
                  alt="Cover"
                  className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              <div className="absolute -bottom-16 left-8 md:left-12">
                <div className="relative">
                  <Avatar className="w-32 h-32 rounded-full border-4 border-white shadow-xl">
                    {profileUser?.profileImage ? (
                        <AvatarImage
                            src={profileUser.profileImage}
                            alt={profileUser.fullName || "User"}
                            className="object-cover"
                        />
                    ) : (
                        <AvatarFallback className="bg-gray-200 text-gray-500">
                          <UserIcon className="w-12 h-12" />
                        </AvatarFallback>
                    )}
                  </Avatar>
                  {currentUser?._id === userId && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <MotionDiv
                  variants={slideInLeft()}
                  initial="hidden"
                  animate="visible"
                  className="w-full lg:w-1/3 space-y-6"
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="flex flex-col sm:flex-row lg:flex-col items-start justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">{profileUser?.fullName}</h1>
                      {profileUser?.username && (
                          <p className="text-gray-500">@{profileUser.username}</p>
                      )}
                      <p className="mt-3 text-gray-700">{profileUser?.bio || "No bio yet"}</p>
                      <div className="flex items-center mt-3 text-sm text-gray-500">
                        <MapPin size={16} className="mr-1" />
                        <span>{profileUser?.country || "Unknown location"}</span>
                        <span className="mx-2">•</span>
                        <Calendar size={16} className="mr-1" />
                        <span>Joined {joinDate}</span>
                      </div>
                    </div>
                    {currentUser?._id === userId ? (
                        <div className="flex flex-wrap gap-2">
                          <Button
                              size="sm"
                              variant="outline"
                              onClick={handleEditProfile}
                              className="gap-1 border-purple-600 text-purple-600 hover:bg-purple-600/10"
                          >
                            <Code size={16} />
                            <span>Edit Profile</span>
                          </Button>
                        </div>
                    ) : (
                        <FollowButton
                            userId={userId || ""}
                            isFollowing={currentUser?.following?.includes(userId || "") || false}
                        />
                    )}
                  </div>
                  <div className="flex items-center justify-around mt-6 pt-4 border-t border-gray-200">
                    <Link
                        to={`/users/${userId}/followers`}
                        className="text-center hover:bg-gray-50 p-2 rounded-lg transition-colors flex-1"
                    >
                      <div className="text-lg font-semibold text-gray-900">
                        {profileUser?.followers?.length || 0}
                      </div>
                      <div className="text-xs text-gray-500">Followers</div>
                    </Link>
                    <Link
                        to={`/users/${userId}/following`}
                        className="text-center hover:bg-gray-50 p-2 rounded-lg transition-colors flex-1"
                    >
                      <div className="text-lg font-semibold text-gray-900">
                        {profileUser?.following?.length || 0}
                      </div>
                      <div className="text-xs text-gray-500">Following</div>
                    </Link>
                    <div className="text-center flex-1">
                      <div className="text-lg font-semibold text-gray-900">
                        {userProjects?.length || 0}
                      </div>
                      <div className="text-xs text-gray-500">Projects</div>
                    </div>
                  </div>
                </div>


                {profileUser?.programmingLanguages && profileUser.programmingLanguages.length > 0 && (
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100">
                      <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Skills</h2>
                      <div className="flex flex-wrap gap-2">
                        {profileUser.programmingLanguages.map((skill, index) => (
                            <Badge key={index} variant="outline" className="bg-purple-600/5 text-purple-600 border-purple-600/20">
                              {skill}
                            </Badge>
                        ))}
                      </div>
                    </div>
                )}

                {profileUser?.languages && profileUser.languages.length > 0 && (
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100">
                      <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Languages</h2>
                      <div className="flex flex-wrap gap-2">
                        {profileUser.languages.map((language, index) => (
                            <Badge key={index} variant="outline" className="bg-green-600/5 text-green-600 border-green-600/20">
                              {language}
                            </Badge>
                        ))}
                      </div>
                    </div>
                )}

                {profileUser?.experience && profileUser.experience.length > 0 && (
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100">
                      <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Experience</h2>
                      <div className="space-y-4">
                        {profileUser.experience.map((exp, index) => (
                            <div key={index} className="relative pl-6 pb-4 border-l-2 border-purple-600/30 last:border-0">
                              <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-purple-600"></div>
                              <h3 className="font-medium text-gray-900">{exp.title}</h3>
                              <div className="text-sm text-gray-500">{exp.company} • {exp.period}</div>
                              <p className="mt-1 text-sm text-gray-600">{exp.description}</p>
                            </div>
                        ))}
                      </div>
                    </div>
                )}

                {profileUser?.education && profileUser.education.length > 0 && (
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100">
                      <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Education</h2>
                      <div className="space-y-4">
                        {profileUser.education.map((edu, index) => (
                            <div key={index} className="relative pl-6 pb-4 border-l-2 border-purple-600/30 last:border-0">
                              <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-purple-600"></div>
                              <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                              <div className="text-sm text-gray-600">{edu.institution} • {edu.year}</div>
                            </div>
                        ))}
                      </div>
                    </div>
                )}

                <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100">
                  <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Connect</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {profileUser?.socialLinks?.github && (
                        <Button variant="outline" size="sm" asChild className="w-full flex items-center justify-center gap-2 border-gray-200 text-gray-700 hover:bg-gray-100">
                          <a href={profileUser.socialLinks.github} target="_blank" rel="noopener noreferrer">
                            <Github size={16} />
                            <span>GitHub</span>
                          </a>
                        </Button>
                    )}
                    {profileUser?.socialLinks?.twitter && (
                        <Button variant="outline" size="sm" asChild className="w-full flex items-center justify-center gap-2 border-gray-200 text-gray-700 hover:bg-gray-100">
                          <a href={profileUser.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                            <Twitter size={16} />
                            <span>Twitter</span>
                          </a>
                        </Button>
                    )}
                    {profileUser?.socialLinks?.linkedin && (
                        <Button variant="outline" size="sm" asChild className="w-full flex items-center justify-center gap-2 border-gray-200 text-gray-700 hover:bg-gray-100">
                          <a href={profileUser.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin size={16} />
                            <span>LinkedIn</span>
                          </a>
                        </Button>
                    )}
                    {profileUser?.socialLinks?.website && (
                        <Button variant="outline" size="sm" asChild className="w-full flex items-center justify-center gap-2 border-gray-200 text-gray-700 hover:bg-gray-100">
                          <a href={profileUser.socialLinks.website} target="_blank" rel="noopener noreferrer">
                            <Globe size={16} />
                            <span>Website</span>
                          </a>
                        </Button>
                    )}
                    <Button variant="outline" size="sm" asChild className="w-full col-span-2 flex items-center justify-center gap-2 border-gray-200 text-gray-700 hover:bg-gray-100">
                      <a href={`mailto:${profileUser?.email}`}>
                        <Mail size={16} />
                        <span>Email</span>
                      </a>
                    </Button>
                  </div>
                </div>
              </MotionDiv>

              <MotionDiv
                  variants={slideInRight()}
                  initial="hidden"
                  animate="visible"
                  className="w-full lg:w-2/3"
              >
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full bg-white/70 backdrop-blur-sm border border-purple-600/20 rounded-lg overflow-hidden grid grid-cols-3 mb-6">
                    <TabsTrigger value="projects" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white">
                      Projects
                    </TabsTrigger>
                    <TabsTrigger value="articles" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white">
                      Articles
                    </TabsTrigger>
                    <TabsTrigger value="timeline" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white">
                      Timeline
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="projects" className="mt-0">
                    <MotionSection
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      {projectsLoading ? (
                          <div className="col-span-2 flex justify-center py-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
                          </div>
                      ) : projectsError ? (
                          <div className="col-span-2 text-center py-10">
                            <p className="text-red-500">Failed to load projects</p>
                            <Button
                                onClick={() => refetchProjects()}
                                variant="outline"
                                className="mt-2 border-purple-600 text-purple-600 hover:bg-purple-600/10"
                            >
                              Retry
                            </Button>
                          </div>
                      ) : userProjects.length > 0 ? (
                          userProjects.map((project: Project, index: number) => (
                              <MotionDiv
                                  key={project._id}
                                  variants={fadeIn(index * 0.1)}
                                  className="group bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                              >
                                <div className="h-48 relative overflow-hidden">
                                  <img
                                      src={project.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1170&auto=format&fit=crop"}
                                      alt={project.title}
                                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                <div className="p-5">
                                  <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                                    {project.title}
                                  </h3>
                                  <p className="text-gray-600 text-sm mb-3">
                                    {project.description}
                                  </p>

                                  <div className="flex flex-wrap gap-2 mb-4">
                                    {project.techStack?.map((tech, i) => (
                                        <Badge
                                            key={i}
                                            variant="outline"
                                            className="bg-purple-600/5 text-purple-600/90 border-purple-600/10 text-xs"
                                        >
                                          {tech}
                                        </Badge>
                                    ))}
                                  </div>

                                  <div className="flex justify-between items-center mt-4">
                                    <div className="flex items-center gap-1 text-amber-500">
                                      <Star size={16} />
                                      <span>{project.likes || 0}</span>
                                    </div>

                                    <CommentSection
                                        targetId={project._id}
                                        targetType="project"
                                        commentCount={project.comments}
                                        isExpanded={expandedComments === project._id}
                                        onToggleExpand={() =>
                                            setExpandedComments(expandedComments === project._id ? null : project._id)
                                        }
                                    />

                                    <Button
                                        size="sm"
                                        variant="outline"
                                        asChild
                                        className="border-purple-600 text-purple-600 hover:bg-purple-600/10"
                                    >
                                      <a
                                          href={project.demoUrl || project.repoUrl || "#"}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                      >
                                        View Project
                                      </a>
                                    </Button>
                                  </div>
                                </div>
                              </MotionDiv>
                          ))
                      ) : (
                          <div className="col-span-2 text-center py-10">
                            <p className="text-gray-500">No projects yet</p>
                            {currentUser?._id === userId && (
                                <Button
                                    onClick={() => navigate("/profile/edit?tab=projects")}
                                    className="mt-4"
                                >
                                  Add Project
                                </Button>
                            )}
                          </div>
                      )}
                    </MotionSection>
                  </TabsContent>

                  <TabsContent value="articles" className="mt-0">
                    <MotionSection
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="space-y-5"
                    >
                      {articlesLoading ? (
                          <div className="col-span-2 flex justify-center py-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
                          </div>
                      ) : articlesError ? (
                          <div className="col-span-2 text-center py-10">
                            <p className="text-red-500">Failed to load articles</p>
                            <Button
                                onClick={() => refetchArticles()}
                                variant="outline"
                                className="mt-2 border-purple-600 text-purple-600 hover:bg-purple-600/10"
                            >
                              Retry
                            </Button>
                          </div>
                      ) : userArticles.length > 0 ? (
                          userArticles.map((article, index) => (
                              <MotionDiv
                                  key={article._id}
                                  variants={fadeIn(index * 0.1)}
                                  className="group bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6"
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                    {article.title}
                                  </h3>
                                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                                    <Calendar size={14} />
                                    <span>{formatDate(article.createdAt)}</span>
                                  </div>
                                </div>

                                <p className="text-gray-600 mb-4">
                                  {article.excerpt}
                                </p>

                                {article.tags && article.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                      {article.tags.map((tag, i) => (
                                          <Badge
                                              key={i}
                                              variant="outline"
                                              className="bg-purple-600/5 text-purple-600/90 border-purple-600/10 text-xs"
                                          >
                                            {tag}
                                          </Badge>
                                      ))}
                                    </div>
                                )}

                                <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                                    <Clock size={14} />
                                    <span>{article.readTime} min read</span>
                                  </div>

                                  <Button
                                      size="lg"
                                      variant="outline"
                                      asChild
                                      className="border-purple-600 text-purple-600 hover:bg-purple-600/10"
                                  >
                                    <Link to={`/articleview/${article.slug}`}>
                                      Read Article
                                    </Link>
                                  </Button>
                                </div>
                              </MotionDiv>
                          ))
                      ) : (
                          <div className="col-span-2 text-center py-10">
                            <p className="text-gray-500">No articles yet</p>
                            {currentUser?._id === userId && (
                                <Button
                                    onClick={() => navigate("/profile/edit?tab=content")}
                                    className="mt-4"
                                >
                                  Add Article
                                </Button>
                            )}
                          </div>
                      )}
                    </MotionSection>
                  </TabsContent>

                  <TabsContent value="timeline" className="mt-0">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 p-6">
                      <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Developer Journey</h2>
                      <div className="text-center py-10">
                        <p className="text-gray-500">Timeline feature coming soon</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </MotionDiv>
            </div>
          </div>
        </div>
      </MainLayout>
  );
}