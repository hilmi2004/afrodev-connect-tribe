
import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserRound, ThumbsUp, Reply, MoreHorizontal, Edit, Trash, AlertCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import { formatDistanceToNow } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";

type CommentType = {
  _id: string;
  content: string;
  author: {
    _id: string;
    fullName: string;
    profileImage?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  isEdited: boolean;
  likes: number;
  likedByCurrentUser?: boolean;
  replies?: CommentType[];
};

interface CommentSectionProps {
  entityId: string;
  entityType: 'project' | 'article';
  comments: CommentType[];
  onAddComment: (content: string, parentId?: string) => Promise<void>;
  onEditComment: (commentId: string, content: string) => Promise<void>;
  onDeleteComment: (commentId: string) => Promise<void>;
  onLikeComment: (commentId: string, isLiked: boolean) => Promise<void>;
}

export function CommentSection({
  entityId,
  entityType,
  comments,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onLikeComment
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;
    
    try {
      setIsSubmitting(true);
      await onAddComment(newComment);
      setNewComment("");
      toast({
        title: "Comment added",
        description: "Your comment has been added successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add comment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitReply = async (parentId: string) => {
    if (!replyContent.trim()) return;
    
    try {
      setIsSubmitting(true);
      await onAddComment(replyContent, parentId);
      setReplyContent("");
      setReplyToId(null);
      toast({
        title: "Reply added",
        description: "Your reply has been added successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add reply. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSubmit = async (commentId: string) => {
    if (!editContent.trim()) return;
    
    try {
      setIsSubmitting(true);
      await onEditComment(commentId, editContent);
      setEditingId(null);
      setEditContent("");
      toast({
        title: "Comment updated",
        description: "Your comment has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update comment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      await onDeleteComment(commentId);
      toast({
        title: "Comment deleted",
        description: "Your comment has been deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete comment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const startEditing = (comment: CommentType) => {
    setEditingId(comment._id);
    setEditContent(comment.content);
  };

  const handleLike = async (commentId: string, isLiked: boolean) => {
    try {
      await onLikeComment(commentId, !isLiked);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to like/unlike comment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderComment = (comment: CommentType, isReply = false) => (
    <Card key={comment._id} className={`p-4 mb-4 ${isReply ? "ml-12 mt-2" : ""}`}>
      <div className="flex items-start gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={comment.author.profileImage} alt={comment.author.fullName} />
          <AvatarFallback>
            <UserRound className="h-6 w-6 text-gray-400" />
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{comment.author.fullName}</p>
              <p className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                {comment.isEdited && " (edited)"}
              </p>
            </div>
            
            {user && (user._id === comment.author._id) && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => startEditing(comment)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleDelete(comment._id)}
                    className="text-red-600 focus:text-red-600"
                  >
                    <Trash className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          
          {editingId === comment._id ? (
            <div className="mt-2">
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                placeholder="Edit your comment..."
                className="min-h-[80px]"
              />
              <div className="flex justify-end gap-2 mt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </Button>
                <Button 
                  size="sm"
                  onClick={() => handleEditSubmit(comment._id)}
                  disabled={isSubmitting}
                >
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <p className="mt-1 text-sm">{comment.content}</p>
          )}
          
          <div className="flex items-center gap-4 mt-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`flex items-center gap-1 px-2 h-8 ${comment.likedByCurrentUser ? 'text-blue-600' : 'text-gray-500'}`}
              onClick={() => handleLike(comment._id, !!comment.likedByCurrentUser)}
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{comment.likes || 0}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1 px-2 h-8 text-gray-500"
              onClick={() => setReplyToId(replyToId === comment._id ? null : comment._id)}
            >
              <Reply className="h-4 w-4" />
              <span>Reply</span>
            </Button>
          </div>
          
          <AnimatePresence>
            {replyToId === comment._id && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 overflow-hidden"
              >
                <div className="flex gap-3 items-start">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.profileImage} alt={user?.fullName} />
                    <AvatarFallback>
                      <UserRound className="h-4 w-4 text-gray-400" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Write a reply..."
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      className="min-h-[80px]"
                    />
                    <div className="flex justify-end gap-2 mt-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setReplyToId(null)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleSubmitReply(comment._id)}
                        disabled={isSubmitting || !replyContent.trim()}
                      >
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4">
          {comment.replies.map(reply => renderComment(reply, true))}
        </div>
      )}
    </Card>
  );

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        
        {user ? (
          <div className="flex gap-3 items-start">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.profileImage} alt={user.fullName} />
              <AvatarFallback>
                <UserRound className="h-6 w-6 text-gray-400" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-end mt-2">
                <Button 
                  onClick={handleSubmitComment}
                  disabled={isSubmitting || !newComment.trim()}
                  className="bg-afro-purple hover:bg-afro-purple/90"
                >
                  Comment
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Card className="p-4 flex items-center gap-3 bg-amber-50">
            <AlertCircle className="text-amber-500 h-5 w-5" />
            <p className="text-sm">Please <a href="/login" className="text-afro-purple font-medium">sign in</a> to comment</p>
          </Card>
        )}
      </div>
      
      <Separator className="my-6" />
      
      <div>
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Be the first to comment!</p>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">{comments.length} comments</p>
              <Badge variant="outline" className="bg-afro-purple/10 text-afro-purple border-afro-purple/20">
                {entityType === 'project' ? 'Project Discussion' : 'Article Discussion'}
              </Badge>
            </div>
            {comments.map(comment => renderComment(comment))}
          </div>
        )}
      </div>
    </div>
  );
}
