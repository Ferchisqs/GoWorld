export type FormStatus = "idle" | "loading" | "success" | "error";

export interface FormFields {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}