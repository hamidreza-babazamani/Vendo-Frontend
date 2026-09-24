import { api } from "../configs/api";
import type { IPost, IApiResponse } from "../types";

// دریافت همه آگهی‌ها (با فیلتر)
export const getAllPosts = async (params?: {
  category?: string;
  search?: string;
}): Promise<IPost[]> => {
  const { data } = await api.get("/", { params });
  return data;
};

// دریافت آگهی‌های من
export const getMyPosts = async (): Promise<IPost[]> => {
  const { data } = await api.get("/post/my");
  return data;
};

// دریافت یک آگهی
export const getPostById = async (id: string): Promise<IPost> => {
  const { data } = await api.get(`/post/${id}`);
  return data;
};

// ساخت آگهی جدید
export const createPost = async (formData: FormData): Promise<IApiResponse> => {
  const { data } = await api.post("/post/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

// حذف آگهی
export const deletePost = async (id: string): Promise<IApiResponse> => {
  const { data } = await api.delete(`/post/delete/${id}`);
  return data;
};