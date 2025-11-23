import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import { BookOpen, PenLine, Users, Zap } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-blog">
      <div className="container mx-auto px-4 py-16">
        {}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="h-16 w-16 text-primary-foreground" />
          </div>
          <h1 className="text-5xl font-bold text-primary-foreground mb-4">
            Welcome to BlogHub
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            A modern blogging platform built with React, Zustand, and Lexical.
            Create, manage, and share your stories with the world.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/login")}
              variant="secondary"
            >
              Sign In
            </Button>
            <Button
              size="lg"
              onClick={() => navigate("/register")}
              variant="outline"
              className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Get Started
            </Button>
          </div>
        </div>

        {}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-card p-6 rounded-lg shadow-lg">
            <PenLine className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Rich Text Editor</h3>
            <p className="text-muted-foreground">
              Write with our powerful Lexical-based editor. Format text, add
              links, and create beautiful content.
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-lg">
            <Zap className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fast & Modern</h3>
            <p className="text-muted-foreground">
              Built with React and Zustand for lightning-fast performance and
              seamless state management.
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-lg">
            <Users className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Secure Authentication
            </h3>
            <p className="text-muted-foreground">
              JWT-based authentication keeps your account safe. Only you can
              edit and delete your posts.
            </p>
          </div>
        </div>

        {}
        <div className="mt-16 text-center">
          <p className="text-primary-foreground/80 text-sm">
            Built with React • Vite • TypeScript • Tailwind CSS • Zustand •
            Lexical • Zod
          </p>
        </div>
      </div>
    </div>
  );
}
