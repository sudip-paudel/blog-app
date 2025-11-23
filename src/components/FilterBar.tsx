import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select";
import { Search, X, PlusCircle } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const FilterBar = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  availableCategories,
  onCreatePost,
}: {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  categoryFilter: string;
  setCategoryFilter: (val: string) => void;
  availableCategories: string[];
  onCreatePost: () => void;
}) => (
  <div className="flex flex-col sm:flex-row gap-4">
    <div className="flex-1 relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search posts by title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10"
      />
      {searchTerm && (
        <button
          onClick={() => setSearchTerm("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>

    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
      <SelectTrigger className="w-full sm:w-[200px]">
        <SelectValue placeholder="Filter by category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
        {availableCategories.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

    <Button onClick={onCreatePost}>
      <PlusCircle className="h-4 w-4 sm:mr-2" />
      <span className="hidden sm:inline">New Post</span>
    </Button>
  </div>
);
