import { api } from "../configs/api";
import type { IUser } from "../types";

// دریافت اطلاعات کاربر لاگین‌شده
export const getProfile = async (): Promise<IUser> => {
  const { data } = await api.get("/user/whoami");
  return data;
};