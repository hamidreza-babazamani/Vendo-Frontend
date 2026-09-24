import { api } from "../configs/api";
import type {
  ISendOtpPayload,
  ICheckOtpPayload,
  IAuthResponse,
} from "../types";

// ارسال کد OTP
export const sendOtp = async (
  payload: ISendOtpPayload
): Promise<IAuthResponse> => {
  const { data } = await api.post("/auth/send-otp", payload);
  return data;
};

// تایید کد OTP و ورود
export const checkOtp = async (
  payload: ICheckOtpPayload
): Promise<IAuthResponse> => {
  const { data } = await api.post("/auth/check-otp", payload);
  return data;
};

// خروج
export const logout = async (): Promise<IAuthResponse> => {
  const { data } = await api.get("/auth/logout");
  return data;
};