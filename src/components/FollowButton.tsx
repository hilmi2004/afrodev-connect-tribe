import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/api";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function FollowButton({ userId, isFollowing }: { userId: string; isFollowing: boolean }) {
    const { user, updateUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleFollow = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const endpoint = isFollowing ? `/follow/unfollow/${userId}` : `/follow/follow/${userId}`;
            await api.post(endpoint);
            await updateUser(); // Refresh user data
            toast({
                title: "Success",
                description: isFollowing ? "Unfollowed successfully" : "Followed successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Operation failed",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    if (user?._id === userId) return null; // Don't show button for own profile

    return (
        <Button
            onClick={handleFollow}
            variant={isFollowing ? "outline" : "default"}
            disabled={loading}
            size="sm"
        >
            {isFollowing ? "Following" : "Follow"}
        </Button>
    );
}