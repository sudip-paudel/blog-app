import { Badge } from "./ui/badge";

export const TagList = ({
  availableTags,
  selectedTags,
  toggleTag,
}: {
  availableTags: string[];
  selectedTags: string[];
  toggleTag: (tag: string) => void;
}) => {
  if (availableTags.length === 0) return null;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Filter by tags:</label>
      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className="cursor-pointer transition-colors"
            onClick={() => toggleTag(tag)}
          >
            #{tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};
