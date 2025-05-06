
import { IUser } from "./User";

export interface IBookmark {
  _id: string;
  user: string | IUser;
  contentType: "project" | "article" | "news" | "question" | "discussion";
  contentId: string;
  contentTitle: string;
  contentSummary?: string;
  contentImage?: string;
  contentAuthor?: {
    _id: string;
    fullName: string;
    profileImage?: string;
  };
  createdAt: Date;
}
