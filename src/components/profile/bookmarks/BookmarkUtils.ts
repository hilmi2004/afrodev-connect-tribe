
import { IBookmark } from "@/models/Bookmark";
import { Bookmark, Newspaper, FileText, MessageSquare, Code, HelpCircle } from "lucide-react";

// Helper function to get icon by content type
export const getContentTypeIcon = (type: string) => {
  switch (type) {
    case "project":
      return <Code className="text-blue-500" />;
    case "article":
      return <FileText className="text-purple-500" />;
    case "news":
      return <Newspaper className="text-green-500" />;
    case "question":
      return <HelpCircle className="text-amber-500" />;
    case "discussion":
      return <MessageSquare className="text-rose-500" />;
    default:
      return <Bookmark className="text-gray-500" />;
  }
};

// Helper function to get URL by content type
export const getContentUrl = (type: string, id: string) => {
  switch (type) {
    case "project":
      return `/projects/${id}`;
    case "article":
      return `/articles/${id}`;
    case "news":
      return `/news/${id}`;
    case "question":
    case "discussion":
      return `/forum/${id}`;
    default:
      return "#";
  }
};

// Get formatted date from timestamp
export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date));
};

// Mock data for bookmarks
export const MOCK_BOOKMARKS: IBookmark[] = [
  {
    _id: "b1",
    user: "1",
    contentType: "project",
    contentId: "p1",
    contentTitle: "AfroCommerce Platform",
    contentSummary: "An e-commerce solution tailored for African businesses",
    contentImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
    contentAuthor: {
      _id: "u2",
      fullName: "Tunde Olatunji",
      profileImage: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    createdAt: new Date("2023-09-10")
  },
  {
    _id: "b2",
    user: "1",
    contentType: "article",
    contentId: "a1",
    contentTitle: "Building Accessible Web Apps for Low Bandwidth",
    contentSummary: "Techniques for optimizing web applications in regions with limited internet access",
    contentAuthor: {
      _id: "u3",
      fullName: "Amara Okafor",
      profileImage: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    createdAt: new Date("2023-10-05")
  },
  {
    _id: "b3",
    user: "1",
    contentType: "discussion",
    contentId: "d1",
    contentTitle: "Best practices for handling payments across African countries",
    contentSummary: "Discussion on integrating various payment gateways like Flutterwave, Paystack and M-Pesa",
    contentAuthor: {
      _id: "u4",
      fullName: "Kwame Mensah",
      profileImage: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    createdAt: new Date("2023-11-12")
  },
  {
    _id: "b4",
    user: "1",
    contentType: "question",
    contentId: "q1",
    contentTitle: "How to optimize React performance in low-end devices?",
    contentSummary: "Looking for strategies to make React apps run smoothly on budget smartphones",
    contentAuthor: {
      _id: "u5",
      fullName: "Fatima Hassan",
      profileImage: "https://randomuser.me/api/portraits/women/55.jpg"
    },
    createdAt: new Date("2023-12-01")
  },
  {
    _id: "b5",
    user: "1",
    contentType: "news",
    contentId: "n1",
    contentTitle: "Africa's Tech Ecosystem Receives $2B Investment in 2023",
    contentSummary: "Record funding flowing into African startups despite global economic challenges",
    contentImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1170&auto=format&fit=crop",
    createdAt: new Date("2024-01-15")
  }
];
