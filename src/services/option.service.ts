import { api } from "../configs/api";
import type { IOption, ICreateOptionPayload, IApiResponse } from "../types";

// دریافت همه گزینه‌ها
export const getOptions = async (): Promise<IOption[]> => {
  const { data } = await api.get("/option");
  return data;
};

// دریافت گزینه‌های یک دسته (با id)
export const getOptionsByCategoryId = async (
  categoryId: string
): Promise<IOption[]> => {
  const { data } = await api.get(`/option/by-category/${categoryId}`);
  return data;
};

// دریافت گزینه‌های یک دسته (با slug)
export const getOptionsByCategorySlug = async (
  slug: string
): Promise<IOption[]> => {
  const { data } = await api.get(`/option/by-category-slug/${slug}`);
  return data;
};

// دریافت یک گزینه
export const getOptionById = async (id: string): Promise<IOption> => {
  const { data } = await api.get(`/option/${id}`);
  return data;
};

// ساخت گزینه جدید
export const createOption = async (
  payload: ICreateOptionPayload
): Promise<IApiResponse> => {
  const { data } = await api.post("/option", payload);
  return data;
};

// ویرایش گزینه
export const updateOption = async (
  id: string,
  payload: Partial<ICreateOptionPayload>
): Promise<IApiResponse> => {
  const { data } = await api.put(`/option/${id}`, payload);
  return data;
};

// حذف گزینه
export const deleteOption = async (id: string): Promise<IApiResponse> => {
  const { data } = await api.delete(`/option/${id}`);
  return data;
};