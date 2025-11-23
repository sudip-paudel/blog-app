import { create } from "zustand";
import { Post } from "@/types/post";

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  currentPage: number;
  total: number;
  setPosts: (posts: Post[]) => void;
  appendPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  updatePost: (id: number, post: Partial<Post>) => void;
  deletePost: (id: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setHasMore: (hasMore: boolean) => void;
  setCurrentPage: (page: number) => void;
  setTotal: (total: number) => void;
  resetPagination: () => void;
}

export const usePostsStore = create<PostsState>((set) => ({
  posts: [],
  loading: false,
  error: null,
  hasMore: true,
  currentPage: 1,
  total: 0,
  setPosts: (posts) => set({ posts, currentPage: 1 }),
  appendPosts: (newPosts) =>
    set((state) => ({
      posts: [...state.posts, ...newPosts],
      currentPage: state.currentPage + 1,
    })),
  addPost: (post) =>
    set((state) => ({
      posts: [post, ...state.posts],
      total: state.total + 1,
    })),
  updatePost: (id, updatedPost) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === id ? { ...post, ...updatedPost } : post
      ),
    })),
  deletePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id),
      total: state.total - 1,
    })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setHasMore: (hasMore) => set({ hasMore }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setTotal: (total) => set({ total }),
  resetPagination: () =>
    set({ posts: [], currentPage: 1, hasMore: true, total: 0 }),
}));
