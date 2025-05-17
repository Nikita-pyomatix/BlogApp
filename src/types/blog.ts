import { User, Comment } from "@prisma/client";

export type Blog = {
  id: number;
  title: string;
  description: string;
  image?: string | null;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
};

export interface CreateBlogData {
  title: string;
  description: string;
  image?: string;
  authorId: number;
}

export interface UpdateBlogData {
  title?: string;
  description?: string;
  image?: string;
}

export interface BlogWithAuthor extends Blog {
  author: {
    id: number;
    name: string;
    profilePicture: string | null;
  };
}

export interface CommentWithAuthor extends Comment {
  author: {
    id: number;
    name: string;
    profilePicture: string | null;
  };
  replies: Array<{
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    author: {
      id: number;
      name: string;
      profilePicture: string | null;
    };
  }>;
}

export interface BlogWithComments extends BlogWithAuthor {
  comments: CommentWithAuthor[];
} 