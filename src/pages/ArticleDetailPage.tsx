
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MainLayout } from "@/components/layout/MainLayout";
import { ArticleDetail } from "@/components/articles/ArticleDetail";
import { useToast } from "@/components/ui/use-toast";

// Mock data for demo
const MOCK_ARTICLE = {
  _id: "1",
  title: "Building Scalable Web Applications with React and Node.js",
  content: `<p>In today's digital landscape, building scalable web applications is more important than ever. As user bases grow and demands increase, your application architecture must be able to handle increased loads without sacrificing performance or user experience.</p>
            <h2>Why React and Node.js?</h2>
            <p>React's component-based architecture makes it ideal for building complex UIs that can scale as your application grows. By breaking your interface into small, reusable components, you can maintain a clean codebase and optimize rendering performance.</p>
            <p>Node.js, on the other hand, provides an event-driven, non-blocking I/O model that makes it lightweight and efficient for data-intensive real-time applications that run across distributed devices.</p>
            <h2>Key Principles for Scalability</h2>
            <ol>
              <li><strong>Modular Architecture:</strong> Break your application into independent, interchangeable modules that can be developed, tested, and maintained separately.</li>
              <li><strong>State Management:</strong> Implement a robust state management solution like Redux or Context API that can handle complex application states.</li>
              <li><strong>Code Splitting:</strong> Use dynamic imports to split your code and load only what's necessary, reducing initial load times.</li>
              <li><strong>Database Optimization:</strong> Design your database schema carefully, use indexes appropriately, and implement caching strategies.</li>
              <li><strong>Horizontal Scaling:</strong> Design your backend to be stateless so you can scale by adding more servers rather than upgrading existing ones.</li>
            </ol>`,
  author: {
    _id: "user1",
    fullName: "Tunde Olaniran",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    profession: "Senior Software Engineer"
  },
  authorName: "Tunde Olaniran",
  slug: "building-scalable-web-applications-react-nodejs",
  excerpt: "Learn how to build web applications that can scale to handle millions of users using React for the frontend and Node.js for the backend.",
  featuredImage: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1031&auto=format&fit=crop",
  tags: ["React", "Node.js", "Scalability", "Web Development", "Architecture"],
  category: "Technology",
  readTime: 8,
  likes: 235,
  comments: [],
  createdAt: new Date("2023-09-15"),
  updatedAt: new Date("2023-09-15"),
  status: "published" as const,
  isPromoted: true,
  views: 4582
};

// Mock comments
const MOCK_COMMENTS = [
  {
    _id: "comment1",
    content: "Great article! I especially liked the section about state management strategies.",
    author: {
      _id: "user4",
      fullName: "Grace Mutesi",
      profileImage: "https://randomuser.me/api/portraits/women/21.jpg"
    },
    createdAt: new Date("2023-09-16"),
    updatedAt: new Date("2023-09-16"),
    isEdited: false,
    likes: 12,
    likedByCurrentUser: false
  },
  {
    _id: "comment2",
    content: "Have you considered discussing microservices architecture as well?",
    author: {
      _id: "user5",
      fullName: "Kwame Adetokunbo",
      profileImage: "https://randomuser.me/api/portraits/men/52.jpg"
    },
    createdAt: new Date("2023-09-17"),
    updatedAt: new Date("2023-09-17"),
    isEdited: false,
    likes: 8,
    likedByCurrentUser: false,
    replies: [
      {
        _id: "reply1",
        content: "That's a great suggestion! I'm planning a follow-up article specifically about microservices with Node.js.",
        author: {
          _id: "user1",
          fullName: "Tunde Olaniran",
          profileImage: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        createdAt: new Date("2023-09-17"),
        updatedAt: new Date("2023-09-17"),
        isEdited: false,
        likes: 5,
        likedByCurrentUser: false
      }
    ]
  }
];

export default function ArticleDetailPage() {
  const { id, slug } = useParams<{ id: string, slug: string }>();
  const { toast } = useToast();
  const [article, setArticle] = useState(MOCK_ARTICLE);
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
  
  const handleLikeArticle = async () => {
    setArticle({
      ...article,
      likes: article.likes + 1
    });
    
    toast({
      title: "Article liked!",
      description: "You liked this article.",
    });
    
    return Promise.resolve();
  };
  
  // In a real app, you would fetch the article and comments based on the id or slug parameter
  
  return (
    <MainLayout>
      <ArticleDetail
        article={article}
        comments={comments}
        onAddComment={handleAddComment}
        onEditComment={handleEditComment}
        onDeleteComment={handleDeleteComment}
        onLikeComment={handleLikeComment}
        onLikeArticle={handleLikeArticle}
      />
    </MainLayout>
  );
}
