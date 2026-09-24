// ==================== User ====================
export interface IUser {
  _id: string;
  mobile: string;
  fullName?: string;
  role: "USER" | "ADMIN";
  verifiedMobile: boolean;
  createdAt: string;
  updatedAt: string;
}

// ==================== Auth ====================
export interface ISendOtpPayload {
  mobile: string;
}

export interface ICheckOtpPayload {
  mobile: string;
  code: string;
}

export interface IAuthResponse {
  message: string;
}

// ==================== Category ====================
export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  icon: string;
  parent?: string | null;
  parents: string[];
  children?: ICategory[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateCategoryPayload {
  name: string;
  slug?: string;
  icon: string;
  parent?: string;
}

// ==================== Option ====================
export type OptionType = "number" | "string" | "array" | "boolean";

export interface IOption {
  _id: string;
  title: string;
  key: string;
  type: OptionType;
  values: string[];
  guid?: string;
  required: boolean;
  category: string | ICategory;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateOptionPayload {
  title: string;
  key: string;
  type: OptionType;
  values?: string[];
  guid?: string;
  required: boolean;
  category: string;
}

// ==================== Post ====================
export interface IPost {
  _id: string;
  title: string;
  userId: string;
  amount: number;
  content: string;
  category: ICategory;
  province?: string;
  city?: string;
  district?: string;
  address?: string;
  coordinate: [number, number];
  images: string[];
  options: Record<string, any>;
  userMobile?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreatePostPayload {
  title: string;
  amount: number;
  content: string;
  category: string;
  lat: string;
  lng: string;
  images: File[];
  options: Record<string, any>;
}

// ==================== API Response ====================
export interface IApiResponse<T = any> {
  message?: string;
  data?: T;
}

export interface IPaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// ==================== React Query ====================
export interface IQueryOptions {
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
}

// ==================== Forms ====================
export interface IAuthForm {
  mobile: string;
  code?: string;
}

export interface IPostForm {
  title: string;
  amount: string;
  content: string;
  category: string;
  province: string;
  city: string;
  address: string;
  lat: string;
  lng: string;
}