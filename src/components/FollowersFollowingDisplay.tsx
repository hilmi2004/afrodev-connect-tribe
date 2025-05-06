import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import {FollowButton} from "@/components/FollowButton.tsx";
import {useState} from "react";

interface User {
    _id: string;
    fullName: string;
    profileImage?: string;
    username: string;
}

export function FollowersFollowingDisplay({ userId }: { userId: string }) {
    const [activeTab, setActiveTab] = useState<'followers' | 'following'>('followers');

    const { data: followers, isLoading: followersLoading } = useQuery({
        queryKey: ['followers', userId],
        queryFn: async () => {
            const response = await api.get(`/api/follow/followers/${userId}`);
            return response.data.followers as User[];
        }
    });

    const { data: following, isLoading: followingLoading } = useQuery({
        queryKey: ['following', userId],
        queryFn: async () => {
            const response = await api.get(`/api/follow/following/${userId}`);
            return response.data.following as User[];
        }
    });

    return (
        <div className="space-y-4">
            <div className="flex border-b">
                <Button
                    variant="ghost"
                    onClick={() => setActiveTab('followers')}
                    className={`${activeTab === 'followers' ? 'border-b-2 border-primary' : ''}`}
                >
                    Followers
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => setActiveTab('following')}
                    className={`${activeTab === 'following' ? 'border-b-2 border-primary' : ''}`}
                >
                    Following
                </Button>
            </div>

            <div className="space-y-3">
                {activeTab === 'followers' ? (
                    followersLoading ? (
                        <div className="space-y-2">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="flex items-center gap-3 p-2">
                                    <Skeleton className="h-10 w-10 rounded-full" />
                                    <div className="space-y-1">
                                        <Skeleton className="h-4 w-[120px]" />
                                        <Skeleton className="h-3 w-[80px]" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        followers?.map(user => (
                            <UserListItem key={user._id} user={user} />
                        ))
                    )
                ) : (
                    followingLoading ? (
                        <div className="space-y-2">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="flex items-center gap-3 p-2">
                                    <Skeleton className="h-10 w-10 rounded-full" />
                                    <div className="space-y-1">
                                        <Skeleton className="h-4 w-[120px]" />
                                        <Skeleton className="h-3 w-[80px]" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        following?.map(user => (
                            <UserListItem key={user._id} user={user} />
                        ))
                    )
                )}
            </div>
        </div>
    );
}

function UserListItem({ user }: { user: User }) {
    return (
        <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={user.profileImage} />
                    <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-medium">{user.fullName}</p>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                </div>
            </div>
            <FollowButton userId={user._id} isFollowing={false} />
        </div>
    );
}