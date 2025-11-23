import { DashboardHeader } from "@/components/DashboardHeader";
import { Dialog } from "@/components/Dialog";
import { FilterBar } from "@/components/FilterBar";
import { PostCard } from "@/components/PostCard";
import { TagList } from "@/components/TagList";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { usePosts } from "@/hooks/usePosts";
import { usePostsDashboardControls } from "@/hooks/usePostsDashboardControl";
import { useAuthStore } from "@/stores/authStore";
import { Loader2, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { user } = useAuthStore();

  // Data fetching hook
  const { posts, loading, hasMore, total, loadMore, deletePost, searchPosts } =
    usePosts();

  // Logic and Local State
  const { state, actions } = usePostsDashboardControls(posts, searchPosts);

  // Infinite Scroll
  const handleLoadMore = () => {
    const category =
      state.categoryFilter === "all" ? undefined : state.categoryFilter;
    const tags = state.selectedTags.length > 0 ? state.selectedTags : undefined;
    loadMore(state.debouncedSearchTerm || undefined, category, tags);
  };

  const sentinelRef = useInfiniteScroll({
    onIntersect: handleLoadMore,
    hasMore,
    loading,
  });

  // Handlers
  const handleConfirmDelete = async () => {
    if (state.postToDeleteId) {
      await deletePost(state.postToDeleteId);
      actions.setPostToDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} onLogout={logout} />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-4 mb-8">
          {/* Filters Section */}
          <FilterBar
            searchTerm={state.searchTerm}
            setSearchTerm={actions.setSearchTerm}
            categoryFilter={state.categoryFilter}
            setCategoryFilter={actions.setCategoryFilter}
            availableCategories={state.availableCategories}
            onCreatePost={() => navigate("/posts/create")}
          />

          <TagList
            availableTags={state.availableTags}
            selectedTags={state.selectedTags}
            toggleTag={actions.toggleTag}
          />

          {/* Active Filters Summary */}
          {state.hasActiveFilters && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">
                Showing {posts.length} of {total} posts
              </span>
              <Button variant="ghost" size="sm" onClick={actions.clearFilters}>
                Clear filters
              </Button>
            </div>
          )}
        </div>

        {/* Content Section */}
        {!loading && posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              {state.hasActiveFilters
                ? "No posts found matching your filters"
                : "No posts yet. Create your first post!"}
            </p>
            {!state.hasActiveFilters && (
              <Button onClick={() => navigate("/posts/create")}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Create First Post
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  canEdit={post.authorId === user?.id}
                  onDelete={(id) => actions.setPostToDeleteId(id)}
                />
              ))}
            </div>

            {loading && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}

            <div ref={sentinelRef} className="h-4" />
          </>
        )}
      </main>

      <Dialog
        isOpen={!!state.postToDeleteId}
        onClose={() => actions.setPostToDeleteId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete"
        description="Are you sure you want to delete this post?"
        actionTitle="Delete"
      />
    </div>
  );
}
