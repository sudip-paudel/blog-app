export interface Post {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  author: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  category?: string;
  tags?: string[];
}

export interface PostFormData {
  title: string;
  content: string;
  excerpt?: string;
  category?: string;
  tags?: string[];
}
