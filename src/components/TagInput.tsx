import { X } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

interface TagManagerProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  disabled?: boolean;
}

export const TagInput = ({ tags, onChange, disabled }: TagManagerProps) => {
  const [input, setInput] = useState("");

  const handleAdd = (e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.preventDefault();
    const trimmed = input.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
      setInput("");
    }
  };

  const handleRemove = (tagToRemove: string) => {
    onChange(tags.filter((t) => t !== tagToRemove));
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="tags">Tags (Optional)</Label>
      <div className="flex gap-2">
        <Input
          id="tags"
          placeholder="Add a tag..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd(e)}
          disabled={disabled}
        />
        <Button
          type="button"
          variant="outline"
          onClick={handleAdd}
          disabled={disabled}
        >
          Add
        </Button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <div
              key={tag}
              className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm flex items-center gap-2 animate-in fade-in zoom-in duration-200"
            >
              #{tag}
              <button
                type="button"
                onClick={() => handleRemove(tag)}
                className="hover:text-destructive transition-colors"
                disabled={disabled}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
