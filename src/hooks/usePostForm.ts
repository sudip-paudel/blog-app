import { postSchema } from "@/lib/validations";
import { PostFormData } from "@/types/post";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "./usePosts";

export const usePostForm = (existingPost: PostFormData | null | undefined) => {
  const navigate = useNavigate();
  const { createPost, updatePost, loading } = usePosts();

  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    tags: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (existingPost) {
      setFormData({
        title: existingPost.title,
        content: existingPost.content,
        excerpt: existingPost.excerpt || "",
        category: existingPost.category || "",
        tags: existingPost.tags || [],
      });
    }
  }, [existingPost]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setField = (field: keyof PostFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent, id?: number) => {
    e.preventDefault();
    setErrors({});

    const result = postSchema.safeParse(formData);

    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) formattedErrors[err.path[0].toString()] = err.message;
      });
      setErrors(formattedErrors);
      return;
    }

    try {
      if (id) {
        await updatePost(id, formData);
      } else {
        await createPost(formData);
      }
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to save post:", err);
    }
  };

  return {
    formData,
    errors,
    loading,
    setField,
    handleSubmit,
  };
};
