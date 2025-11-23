import { Post } from "@/types/post";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Calendar, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

interface PostCardProps {
  post: Post;
  onDelete?: (id: number) => void;
  canEdit?: boolean;
}

export const PostCard = ({
  post,
  onDelete,
  canEdit = false,
}: PostCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
            <CardDescription className="line-clamp-2">
              {post.excerpt || "No excerpt available"}
            </CardDescription>
          </div>
          {post.category && <Badge variant="secondary">{post.category}</Badge>}
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags?.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(post.createdAt), "MMM d, yyyy")}</span>
          </div>
        </div>
      </CardContent>

      {canEdit && (
        <CardFooter className="gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/posts/edit/${post.id}`)}
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete?.(post.id)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
