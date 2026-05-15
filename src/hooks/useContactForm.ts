import { useState } from "react";

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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s+\-().]{7,20}$/;

function validate(fields: FormFields, t: (key: string) => string): FormErrors {
  const errors: FormErrors = {};

  if (!fields.name.trim()) {
    errors.name = t("contact.errors.nameRequired");
  } else if (fields.name.trim().length < 2) {
    errors.name = t("contact.errors.nameMin");
  }

  if (!fields.email.trim()) {
    errors.email = t("contact.errors.emailRequired");
  } else if (!EMAIL_REGEX.test(fields.email)) {
    errors.email = t("contact.errors.emailInvalid");
  }

  if (fields.phone.trim() && !PHONE_REGEX.test(fields.phone)) {
    errors.phone = t("contact.errors.phoneInvalid");
  }

  if (!fields.message.trim()) {
    errors.message = t("contact.errors.messageRequired");
  } else if (fields.message.trim().length < 10) {
    errors.message = t("contact.errors.messageMin");
  }

  return errors;
}

export function useContactForm(t: (key: string) => string) {
  const [fields, setFields] = useState<FormFields>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate(fields, t);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus("loading");
    setErrors({});

    try {
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.1) {
            resolve();
          } else {
            reject();
          }
        }, 1500);
      });
      setStatus("success");
      setFields({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const resetStatus = () => setStatus("idle");

  return { fields, errors, status, handleChange, handleSubmit, resetStatus };
}