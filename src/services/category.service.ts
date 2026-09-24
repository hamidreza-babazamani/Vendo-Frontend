import { api } from "../configs/api";
import type { ICategory, ICreateCategoryPayload, IApiResponse } from "../types";

// دریافت همه دسته‌بندی‌ها
export const getCategories = async (): Promise<ICategory[]> => {
  const { data } = await api.get("/category");
  return data;
};

// ساخت دسته‌بندی جدید
export const createCategory = async (
  payload: ICreateCategoryPayload
): Promise<IApiResponse> => {
  const { data } = await api.post("/category", payload);
  return data;
};

// حذف دسته‌بندی
export const deleteCategory = async (id: string): Promise<IApiResponse> => {
  const { data } = await api.delete(`/category/${id}`);
  return data;
};