import { useEffect, useCallback } from "react";
import { usePostsStore } from "@/stores/postsStore";
import { useAuthStore } from "@/stores/authStore";
import { postsAPI } from "@/lib/api";
import { PostFormData } from "@/types/post";
import { toast } from "sonner";

export const usePosts = () => {
  const {
    posts,
    loading,
    error,
    hasMore,
    currentPage,
    total,
    setPosts,
    appendPosts,
    addPost,
    updatePost: updatePostInStore,
    deletePost: deletePostFromStore,
    setLoading,
    setError,
    setHasMore,
    setTotal,
    resetPagination,
  } = usePostsStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchPosts(1);
  }, []);

  const fetchPosts = async (
    page: number = 1,
    search?: string,
    category?: string,
    tags?: string[]
  ) => {
    setLoading(true);
    setError(null);
    try {
      const result = await postsAPI.getPosts(page, 9, search, category, tags);

      if (page === 1) {
        setPosts(result.posts);
      } else {
        appendPosts(result.posts);
      }

      setHasMore(result.hasMore);
      setTotal(result.total);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch posts";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = useCallback(
    async (search?: string, category?: string, tags?: string[]) => {
      if (!hasMore || loading) return;
      await fetchPosts(currentPage + 1, search, category, tags);
    },
    [hasMore, loading, currentPage]
  );

  const searchPosts = useCallback(
    async (search?: string, category?: string, tags?: string[]) => {
      resetPagination();
      await fetchPosts(1, search, category, tags);
    },
    []
  );

  const createPost = async (data: PostFormData) => {
    if (!user) {
      toast.error("You must be logged in to create a post");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const newPost = await postsAPI.createPost(data, user.id, user.name);
      addPost(newPost);
      toast.success("Post created successfully!");
      return newPost;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create post";
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (id: number, data: PostFormData) => {
    if (!user) {
      toast.error("You must be logged in to update a post");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const updatedPost = await postsAPI.updatePost(id, data, user.id);
      updatePostInStore(id, updatedPost);
      toast.success("Post updated successfully!");
      return updatedPost;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update post";
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: number) => {
    if (!user) {
      toast.error("You must be logged in to delete a post");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await postsAPI.deletePost(id, user.id);
      deletePostFromStore(id);
      toast.success("Post deleted successfully!");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete post";
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    resetPagination();
    fetchPosts(1);
  };

  return {
    posts,
    loading,
    error,
    hasMore,
    total,
    currentPage,
    loadMore,
    searchPosts,
    createPost,
    updatePost,
    deletePost,
    refresh,
  };
};
