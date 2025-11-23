import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { authAPI } from "@/lib/api";
import { LoginFormData, RegisterFormData } from "@/types/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login: setUser, logout: clearUser } = useAuthStore();
  const navigate = useNavigate();

  const login = async (data: LoginFormData) => {
    setLoading(true);
    setError(null);
    try {
      const user = await authAPI.login(data);
      setUser(user);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterFormData) => {
    setLoading(true);
    setError(null);
    try {
      const user = await authAPI.register(data);
      setUser(user);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Registration failed";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearUser();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return {
    login,
    register,
    logout,
    loading,
    error,
  };
};
