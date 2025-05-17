export interface Blog {
  id: number;
  title: string;
  description: string;
  image?: string | null;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBlogData {
  title: string;
  description: string;
  image?: string | null;
  authorId: number;
}

export interface UpdateBlogData {
  title?: string;
  description?: string;
  image?: string | null;
} 