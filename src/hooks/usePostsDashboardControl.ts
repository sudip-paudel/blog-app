import { Post } from "@/types/post";
import { useState, useEffect, useMemo } from "react";
import { useDebounce } from "./useDebounce";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const usePostsDashboardControls = (posts: Post[], searchPosts: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [postToDeleteId, setPostToDeleteId] = useState<number | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const category = categoryFilter === "all" ? undefined : categoryFilter;
    const tags = selectedTags.length > 0 ? selectedTags : undefined;
    searchPosts(debouncedSearchTerm || undefined, category, tags);
  }, [categoryFilter, selectedTags, debouncedSearchTerm, searchPosts]);

  const { availableCategories, availableTags } = useMemo(() => {
    const category = new Set<string>();
    const tags = new Set<string>();

    posts.forEach((p) => {
      if (p.category) category.add(p.category);
      if (p.tags) p.tags.forEach((t) => tags.add(t));
    });

    return {
      availableCategories: Array.from(category),
      availableTags: Array.from(tags),
    };
  }, [posts]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    setSelectedTags([]);
  };

  const hasActiveFilters =
    !!searchTerm || categoryFilter !== "all" || selectedTags.length > 0;

  return {
    state: {
      searchTerm,
      categoryFilter,
      selectedTags,
      postToDeleteId,
      availableCategories,
      availableTags,
      hasActiveFilters,
      debouncedSearchTerm,
    },
    actions: {
      setSearchTerm,
      setCategoryFilter,
      toggleTag,
      clearFilters,
      setPostToDeleteId,
    },
  };
};
