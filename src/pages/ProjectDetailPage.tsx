
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MainLayout } from "@/components/layout/MainLayout";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { useToast } from "@/components/ui/use-toast";

// Mock data for demo
const MOCK_PROJECT = {
  _id: "1",
  title: "AfroStream - African Content Streaming Platform",
  description: "AfroStream is a comprehensive streaming platform dedicated to showcasing African content across various genres. The platform aims to bring authentic African stories to a global audience while supporting local content creators. Features include user profiles, content recommendations, creator dashboards, and multi-language support.",
  creator: {
    _id: "user1",
    fullName: "Tunde Olaniran",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    profession: "Full Stack Developer"
  },
  image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1074&auto=format&fit=crop",
  repoUrl: "https://github.com/example/afrostream",
  demoUrl: "https://afrostream-example.com",
  techStack: ["React", "Node.js", "MongoDB", "Express", "AWS", "Redux"],
  contributors: [
    {
      _id: "user2",
      fullName: "Amina Kimathi",
      profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
      role: "Frontend Developer"
    },
    {
      _id: "user3",
      fullName: "David Mensah",
      profileImage: "https://randomuser.me/api/portraits/men/46.jpg",
      role: "Backend Developer"
    }
  ],
  category: "Entertainment",
  status: "in-progress" as const,
  lookingForContributors: true,
  likes: 342,
  tags: ["Streaming", "African Content", "Entertainment", "Media"],
  createdAt: new Date("2023-07-15"),
  updatedAt: new Date("2023-12-03")
};

// Mock comments
const MOCK_COMMENTS = [
  {
    _id: "comment1",
    content: "This project looks amazing! I love the idea of promoting African content to a global audience.",
    author: {
      _id: "user4",
      fullName: "Fatou Diallo",
      profileImage: "https://randomuser.me/api/portraits/women/21.jpg"
    },
    createdAt: new Date("2023-11-10"),
    updatedAt: new Date("2023-11-10"),
    isEdited: false,
    likes: 15,
    likedByCurrentUser: false,
    replies: [
      {
        _id: "reply1",
        content: "Thanks Fatou! We're working hard to make this a platform that truly represents African creativity.",
        author: {
          _id: "user1",
          fullName: "Tunde Olaniran",
          profileImage: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        createdAt: new Date("2023-11-11"),
        updatedAt: new Date("2023-11-11"),
        isEdited: false,
        likes: 5,
        likedByCurrentUser: true
      }
    ]
  },
  {
    _id: "comment2",
    content: "Have you considered adding support for local payment methods across different African countries?",
    author: {
      _id: "user5",
      fullName: "Kwame Adetokunbo",
      profileImage: "https://randomuser.me/api/portraits/men/52.jpg"
    },
    createdAt: new Date("2023-11-18"),
    updatedAt: new Date("2023-11-18"),
    isEdited: false,
    likes: 8,
    likedByCurrentUser: false
  }
];

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [project, setProject] = useState(MOCK_PROJECT);
  const [comments, setComments] = useState(MOCK_COMMENTS);
  
  // In a real implementation, these would make API calls
  const handleAddComment = async (content: string, parentId?: string) => {
    const newComment = {
      _id: `comment${Math.random().toString(36).substr(2, 9)}`,
      content,
      author: {
        _id: "currentUser",
        fullName: "Current User",
        profileImage: "https://randomuser.me/api/portraits/women/65.jpg"
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      isEdited: false,
      likes: 0,
      likedByCurrentUser: false
    };
    
    if (parentId) {
      // Add as reply
      const updatedComments = comments.map(comment => {
        if (comment._id === parentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newComment]
          };
        }
        return comment;
      });
      setComments(updatedComments);
    } else {
      // Add as new comment
      setComments([newComment, ...comments]);
    }
    
    return Promise.resolve();
  };
  
  const handleEditComment = async (commentId: string, content: string) => {
    const updatedComments = comments.map(comment => {
      if (comment._id === commentId) {
        return {
          ...comment,
          content,
          isEdited: true,
          updatedAt: new Date()
        };
      }
      
      // Check in replies if exists
      if (comment.replies) {
        return {
          ...comment,
          replies: comment.replies.map((reply: any) => {
            if (reply._id === commentId) {
              return {
                ...reply,
                content,
                isEdited: true,
                updatedAt: new Date()
              };
            }
            return reply;
          })
        };
      }
      
      return comment;
    });
    
    setComments(updatedComments);
    return Promise.resolve();
  };
  
  const handleDeleteComment = async (commentId: string) => {
    // First check if it's a top-level comment
    const isTopLevel = comments.some(comment => comment._id === commentId);
    
    if (isTopLevel) {
      setComments(comments.filter(comment => comment._id !== commentId));
    } else {
      // It's a reply
      const updatedComments = comments.map(comment => {
        if (comment.replies) {
          return {
            ...comment,
            replies: comment.replies.filter((reply: any) => reply._id !== commentId)
          };
        }
        return comment;
      });
      
      setComments(updatedComments);
    }
    
    return Promise.resolve();
  };
  
  const handleLikeComment = async (commentId: string, isLiked: boolean) => {
    const updatedComments = comments.map(comment => {
      if (comment._id === commentId) {
        return {
          ...comment,
          likes: isLiked ? comment.likes - 1 : comment.likes + 1,
          likedByCurrentUser: !isLiked
        };
      }
      
      // Check in replies if exists
      if (comment.replies) {
        return {
          ...comment,
          replies: comment.replies.map((reply: any) => {
            if (reply._id === commentId) {
              return {
                ...reply,
                likes: isLiked ? reply.likes - 1 : reply.likes + 1,
                likedByCurrentUser: !isLiked
              };
            }
            return reply;
          })
        };
      }
      
      return comment;
    });
    
    setComments(updatedComments);
    return Promise.resolve();
  };
  
  const handleLikeProject = async () => {
    setProject({
      ...project,
      likes: project.likes + 1
    });
    
    toast({
      title: "Project liked!",
      description: "You liked this project.",
    });
    
    return Promise.resolve();
  };
  
  // In a real app, you would fetch the project and comments based on the id parameter
  
  return (
    <MainLayout>
      <ProjectDetail
        project={project}
        comments={comments}
        onAddComment={handleAddComment}
        onEditComment={handleEditComment}
        onDeleteComment={handleDeleteComment}
        onLikeComment={handleLikeComment}
        onLikeProject={handleLikeProject}
      />
    </MainLayout>
  );
}
