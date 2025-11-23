import { BookOpen, LogOut } from "lucide-react";
import { Button } from "./ui/button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DashboardHeader = ({ user, onLogout }: { user: any; onLogout: () => void }) => (
  <header className="border-b bg-card sticky top-0 z-10 shadow-sm">
    <div className="container mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Blog Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground hidden sm:inline">
            Welcome, {user?.name}
          </span>
          <Button variant="outline" size="sm" onClick={onLogout}>
            <LogOut className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </div>
  </header>
);