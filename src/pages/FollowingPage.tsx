import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { FollowButton } from "@/components/FollowButton";
import { MainLayout } from "@/components/layout/MainLayout";

interface User {
    _id: string;
    fullName: string;
    profileImage?: string;
    username: string;
}

export default function FollowingPage() {
    const { userId } = useParams();
    const { user } = useAuth();

    const { data: following, isLoading } = useQuery({
        queryKey: ['following', userId],
        queryFn: async () => {
            const response = await api.get(`/follow/following/${userId}`);
            return response.data.following as User[];
        }
    });

    return (
        <MainLayout>
            <div className="container py-8">
                <h1 className="text-2xl font-bold mb-6">Following</h1>
                <div className="bg-white rounded-lg shadow p-6">
                    {isLoading ? (
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex items-center justify-between p-4">
                                    <div className="flex items-center gap-4">
                                        <Skeleton className="h-12 w-12 rounded-full" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-[150px]" />
                                            <Skeleton className="h-3 w-[100px]" />
                                        </div>
                                    </div>
                                    <Skeleton className="h-9 w-24 rounded-md" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {following?.map(followedUser => (
                                <div key={followedUser._id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={followedUser.profileImage} />
                                            <AvatarFallback>{followedUser.fullName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">{followedUser.fullName}</p>
                                            <p className="text-sm text-gray-500">@{followedUser.username}</p>
                                        </div>
                                    </div>
                                    {user?._id !== followedUser._id && (
                                        <FollowButton
                                            userId={followedUser._id}
                                            isFollowing={user?.following?.includes(followedUser._id) || false}
                                        />
                                    )}
                                </div>
                            ))}
                            {following?.length === 0 && (
                                <p className="text-center text-gray-500 py-8">Not following anyone yet</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}