import { LoginFormData, RegisterFormData, User } from "@/types/auth";
import { Post, PostFormData } from "@/types/post";

const API_DELAY = 800;

const mockUsers = [
  { id: 1, email: "demo@blog.com", password: "password123", name: "Demo User" },
];

let mockPosts: Post[] = [
  {
    id: 1,
    title: "Getting Started with React",
    content:
      "<p>React is a powerful JavaScript library for building user interfaces...</p>",
    excerpt: "Learn the basics of React and start building amazing apps",
    author: "Demo User",
    authorId: 1,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    category: "Tutorial",
    tags: ["react", "javascript", "tutorial"],
  },
  {
    id: 2,
    title: "Understanding State Management",
    content:
      "<p>State management is crucial for complex applications. Let's explore different approaches...</p>",
    excerpt: "A comprehensive guide to state management in modern web apps",
    author: "Demo User",
    authorId: 1,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    category: "Advanced",
    tags: ["state", "zustand", "redux"],
  },
  {
    id: 3,
    title: "Building Beautiful UIs with Tailwind CSS",
    content:
      "<p>Tailwind CSS is a utility-first CSS framework that makes styling a breeze...</p>",
    excerpt: "Master Tailwind CSS and create stunning user interfaces",
    author: "Demo User",
    authorId: 1,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    category: "Design",
    tags: ["tailwind", "css", "design"],
  },
];

let nextPostId = 4;

export const authAPI = {
  login: async (data: LoginFormData): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, API_DELAY));

    const user = mockUsers.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const token = `mock-jwt-token-${Date.now()}`;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      token,
    };
  },

  register: async (data: RegisterFormData): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, API_DELAY));

    if (mockUsers.some((u) => u.email === data.email)) {
      throw new Error("Email already registered");
    }

    const newUser = {
      id: mockUsers.length + 1,
      email: data.email,
      password: data.password,
      name: data.name,
    };

    mockUsers.push(newUser);

    const token = `mock-jwt-token-${Date.now()}`;

    return {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      token,
    };
  },
};

export const postsAPI = {
  getPosts: async (
    page: number = 1,
    limit: number = 9,
    search?: string,
    category?: string,
    tags?: string[]
  ): Promise<{ posts: Post[]; hasMore: boolean; total: number }> => {
    await new Promise((resolve) => setTimeout(resolve, API_DELAY));

    let filtered = [...mockPosts].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    if (search && search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          post.excerpt?.toLowerCase().includes(searchLower) ||
          post.content.toLowerCase().includes(searchLower)
      );
    }

    if (category && category !== "all") {
      filtered = filtered.filter((post) => post.category === category);
    }

    if (tags && tags.length > 0) {
      filtered = filtered.filter((post) =>
        tags.some((tag) => post.tags?.includes(tag))
      );
    }

    const total = filtered.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const posts = filtered.slice(start, end);
    const hasMore = end < total;

    return { posts, hasMore, total };
  },

  getPost: async (id: number): Promise<Post> => {
    await new Promise((resolve) => setTimeout(resolve, API_DELAY));
    const post = mockPosts.find((p) => p.id === id);
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  },

  createPost: async (
    data: PostFormData,
    userId: number,
    userName: string
  ): Promise<Post> => {
    await new Promise((resolve) => setTimeout(resolve, API_DELAY));

    const newPost: Post = {
      id: nextPostId++,
      ...data,
      author: userName,
      authorId: userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockPosts.push(newPost);
    return newPost;
  },

  updatePost: async (
    id: number,
    data: PostFormData,
    userId: number
  ): Promise<Post> => {
    await new Promise((resolve) => setTimeout(resolve, API_DELAY));

    const postIndex = mockPosts.findIndex((p) => p.id === id);
    if (postIndex === -1) {
      throw new Error("Post not found");
    }

    const post = mockPosts[postIndex];
    if (post.authorId !== userId) {
      throw new Error("Unauthorized");
    }

    const updatedPost = {
      ...post,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    mockPosts[postIndex] = updatedPost;
    return updatedPost;
  },

  deletePost: async (id: number, userId: number): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, API_DELAY));

    const post = mockPosts.find((p) => p.id === id);
    if (!post) {
      throw new Error("Post not found");
    }

    if (post.authorId !== userId) {
      throw new Error("Unauthorized");
    }

    mockPosts = mockPosts.filter((p) => p.id !== id);
  },
};
