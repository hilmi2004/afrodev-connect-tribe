import { MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Comment {
    _id: string;
    user: {
        _id: string;
        fullName: string;
        profileImage?: string;
    };
    content: string;
    createdAt: string;
    replies: Array<{
        user: {
            _id: string;
            fullName: string;
            profileImage?: string;
        };
        content: string;
        isCreator: boolean;
        createdAt: string;
    }>;
}

interface CommentSectionProps {
    targetId: string;
    targetType?: 'project' | 'article';
    commentCount: number;
    isExpanded: boolean;
    onToggleExpand: () => void;
}

export function CommentSection({
                                   targetId,
                                   targetType = 'project',
                                   commentCount,
                                   isExpanded,
                                   onToggleExpand
                               }: CommentSectionProps) {
    const { user } = useAuth();
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentInput, setCommentInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});

    const fetchComments = async () => {
        try {
            setLoading(true);
            const response = await api.get('/comments', {
                params: { targetType, targetId }
            });
            setComments(response.data.comments || []);
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isExpanded && comments.length === 0) {
            fetchComments();
        }
    }, [isExpanded]);

    const handleCommentSubmit = async () => {
        try {
            if (!commentInput.trim()) return;

            const response = await api.post('/comments', {
                content: commentInput,
                targetType,
                targetId
            });

            setComments(prev => [response.data.comment, ...prev]);
            setCommentInput('');
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    const handleReplySubmit = async (commentId: string) => {
        try {
            const replyContent = replyInputs[commentId];
            if (!replyContent?.trim()) return;

            const response = await api.post(`/comments/${commentId}/reply`, {
                content: replyContent
            });

            setComments(prev =>
                prev.map(comment =>
                    comment._id === commentId
                        ? { ...comment, replies: [...comment.replies, response.data.reply] }
                        : comment
                )
            );
            setReplyInputs(prev => ({ ...prev, [commentId]: '' }));
        } catch (error) {
            console.error('Error submitting reply:', error);
        }
    };

    return (
        <div className="w-full">
            <button
                onClick={onToggleExpand}
                className="flex items-center gap-1 text-gray-500 hover:text-purple-600"
            >
                <MessageSquare className="h-4 w-4" />
                <span className="text-xs">{commentCount}</span>
            </button>

            {isExpanded && (
                <div className="mt-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="mb-4 max-h-60 overflow-y-auto">
                        {loading ? (
                            <p className="text-center text-gray-500">Loading comments...</p>
                        ) : comments.length > 0 ? (
                            <div className="space-y-4">
                                {comments.map(comment => (
                                    <div key={comment._id} className="border-b pb-3 last:border-0">
                                        <div className="flex gap-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={comment.user.profileImage} />
                                                <AvatarFallback>
                                                    {comment.user.fullName.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="font-medium text-sm">
                                                    {comment.user.fullName}
                                                </div>
                                                <div className="text-sm text-gray-700">
                                                    {comment.content}
                                                </div>
                                            </div>
                                        </div>

                                        {comment.replies.length > 0 && (
                                            <div className="ml-10 mt-2 space-y-2">
                                                {comment.replies.map((reply, i) => (
                                                    <div key={i} className="flex gap-2">
                                                        <Avatar className="h-6 w-6">
                                                            <AvatarImage src={reply.user.profileImage} />
                                                            <AvatarFallback>
                                                                {reply.user.fullName.charAt(0)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-1">
                                <span className="font-medium text-xs">
                                  {reply.user.fullName}
                                </span>
                                                                {reply.isCreator && (
                                                                    <span className="text-xs bg-purple-100 text-purple-800 px-1 rounded">
                                    Creator
                                  </span>
                                                                )}
                                                            </div>
                                                            <div className="text-xs text-gray-700">
                                                                {reply.content}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {user && (
                                            <div className="ml-10 mt-2 flex gap-2">
                                                <Input
                                                    type="text"
                                                    placeholder="Reply..."
                                                    value={replyInputs[comment._id] || ''}
                                                    onChange={(e) => setReplyInputs(prev => ({
                                                        ...prev,
                                                        [comment._id]: e.target.value
                                                    }))}
                                                    className="flex-1 text-sm"
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            handleReplySubmit(comment._id);
                                                        }
                                                    }}
                                                />
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleReplySubmit(comment._id)}
                                                >
                                                    Reply
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm text-center">No comments yet</p>
                        )}
                    </div>

                    {user && (
                        <div className="flex gap-2">
                            <Input
                                type="text"
                                value={commentInput}
                                onChange={(e) => setCommentInput(e.target.value)}
                                placeholder="Add a comment..."
                                className="flex-1"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleCommentSubmit();
                                    }
                                }}
                            />
                            <Button onClick={handleCommentSubmit}>
                                Post
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}