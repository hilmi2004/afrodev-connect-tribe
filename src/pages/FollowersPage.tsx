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

export default function FollowersPage() {
    const { userId } = useParams();
    const { user } = useAuth();

    const { data: followers, isLoading } = useQuery({
        queryKey: ['followers', userId],
        queryFn: async () => {
            const response = await api.get(`/follow/followers/${userId}`);
            return response.data.followers as User[];
        }
    });

    return (
        <MainLayout>
            <div className="container py-8">
                <h1 className="text-2xl font-bold mb-6">Followers</h1>
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
                            {followers?.map(follower => (
                                <div key={follower._id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={follower.profileImage} />
                                            <AvatarFallback>{follower.fullName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">{follower.fullName}</p>
                                            <p className="text-sm text-gray-500">@{follower.username}</p>
                                        </div>
                                    </div>
                                    {user?._id !== follower._id && (
                                        <FollowButton
                                            userId={follower._id}
                                            isFollowing={user?.following?.includes(follower._id) || false}
                                        />
                                    )}
                                </div>
                            ))}
                            {followers?.length === 0 && (
                                <p className="text-center text-gray-500 py-8">No followers yet</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}