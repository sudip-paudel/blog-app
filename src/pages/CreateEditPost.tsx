import { RichTextEditor } from "@/components/RichTextEditor";
import { TagInput } from "@/components/TagInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePostForm } from "@/hooks/usePostForm";
import { usePostsStore } from "@/stores/postsStore";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateEditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts } = usePostsStore();

  const postId = id ? Number(id) : undefined;
  const isEditing = !!postId;

  const existingPost = posts.find((p) => p.id === postId);

  const { formData, errors, loading, setField, handleSubmit } =
    usePostForm(existingPost);

  return (
    <div className="min-h-screen bg-background">
      {}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className=""
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">
            {isEditing ? "Edit Post" : "Create New Post"}
          </h1>
        </div>
      </header>

      {}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="border-muted/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">
              {isEditing ? "Update your post" : "Write something amazing"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => handleSubmit(e, postId)}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter post title..."
                  value={formData.title}
                  onChange={(e) => setField("title", e.target.value)}
                  disabled={loading}
                  className={errors.title ? "border-destructive" : ""}
                />
                {errors.title && (
                  <p className="text-sm text-destructive font-medium">
                    {errors.title}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Description (Optional)</Label>
                <Textarea
                  id="excerpt"
                  placeholder="Brief summary of your post..."
                  value={formData.excerpt}
                  onChange={(e) => setField("excerpt", e.target.value)}
                  disabled={loading}
                  rows={3}
                />
                {errors.excerpt && (
                  <p className="text-sm text-destructive">{errors.excerpt}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category (Optional)</Label>
                  <Input
                    id="category"
                    placeholder="e.g., Tutorial"
                    value={formData.category}
                    onChange={(e) => setField("category", e.target.value)}
                    disabled={loading}
                  />
                </div>

                {}
                <TagInput
                  tags={formData.tags || []}
                  onChange={(newTags) => setField("tags", newTags)}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label>Content *</Label>
                <div
                  className={
                    errors.content ? "border border-destructive rounded-md" : ""
                  }
                >
                  <RichTextEditor
                    initialValue={formData.content}
                    onChange={(html) => setField("content", html)}
                    placeholder="Start writing your post..."
                  />
                </div>
                {errors.content && (
                  <p className="text-sm text-destructive font-medium">
                    {errors.content}
                  </p>
                )}
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button
                  type="submit"
                  disabled={loading}
                  className="min-w-[140px]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {isEditing ? "Updating..." : "Publishing..."}
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      {isEditing ? "Update Post" : "Publish Post"}
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/dashboard")}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
