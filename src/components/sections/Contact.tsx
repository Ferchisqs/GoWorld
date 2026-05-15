import React from "react";
import { useTranslation } from "react-i18next";
import FormAlert from "../ui/FormAlert";
import { useContactForm } from "../../hooks/useContactForm";

interface FieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

const Field: React.FC<FieldProps> = ({ label, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="font-[Poppins] text-sm font-semibold text-neutral-800 dark:text-neutral-200">
      {label}
    </label>
    {children}
    {error && (
      <span className="text-xs text-red-500 font-[Poppins] flex items-center gap-1">
        <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        {error}
      </span>
    )}
  </div>
);

const inputClass = (hasError: boolean) =>
  [
    "w-full px-4 py-3 rounded-xl font-[Poppins] text-sm",
    "bg-neutral-900 dark:bg-neutral-950 text-white placeholder-neutral-500",
    "border-2 outline-none transition-colors duration-200",
    hasError
      ? "border-red-500"
      : "border-transparent focus:border-[#8ED77C]",
  ].join(" ");

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const { fields, errors, status, handleChange, handleSubmit, resetStatus } =
    useContactForm(t);

  return (
    <section
      id="contact"
      className="bg-white dark:bg-neutral-950 transition-colors duration-300 py-20 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">

        <div className="flex-1 flex flex-col gap-6">
          <div>
            <p className="font-[Poppins] text-sm font-semibold text-[#8ED77C] mb-2">
              {t("contact.eyebrow")}
            </p>
            <h2 className="font-[Poppins] font-extrabold text-4xl md:text-5xl text-neutral-900 dark:text-white uppercase leading-tight">
              {t("contact.titleLine1")}
              <br />
              {t("contact.titleLine2")}
            </h2>
          </div>

          <p className="font-[Poppins] text-neutral-600 dark:text-neutral-400 text-base max-w-sm leading-relaxed">
            {t("contact.description")}
          </p>

          <div className="flex flex-col gap-4 mt-2">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-neutral-800 dark:text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-[Poppins] font-semibold text-sm text-neutral-900 dark:text-white">
                  {t("contact.emailLabel")}
                </p>
                <a href="mailto:GoWorld@gmail.com" className="font-[Poppins] text-sm text-[#8ED77C] hover:underline">
                  GoWorld@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-neutral-800 dark:text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="font-[Poppins] font-semibold text-sm text-neutral-900 dark:text-white">
                  {t("contact.phoneLabel")}
                </p>
                <a href="tel:+52xxxxxxxxx" className="font-[Poppins] text-sm text-[#8ED77C] hover:underline">
                  + 52 xxx xxx xxx
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full">
          <div className="bg-[#8ED77C] rounded-3xl p-6 md:p-8 flex flex-col gap-5">
            {status === "success" && (
              <FormAlert type="success" message={t("contact.alert.success")} onClose={resetStatus} />
            )}
            {status === "error" && (
              <FormAlert type="error" message={t("contact.alert.error")} onClose={resetStatus} />
            )}

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              <Field label={t("contact.form.name")} error={errors.name}>
                <input type="text" name="name" value={fields.name} onChange={handleChange} placeholder={t("contact.form.namePlaceholder")} className={inputClass(!!errors.name)} autoComplete="name" />
              </Field>

              <Field label={t("contact.form.email")} error={errors.email}>
                <input type="email" name="email" value={fields.email} onChange={handleChange} placeholder={t("contact.form.emailPlaceholder")} className={inputClass(!!errors.email)} autoComplete="email" />
              </Field>

              <Field label={t("contact.form.phone")} error={errors.phone}>
                <input type="tel" name="phone" value={fields.phone} onChange={handleChange} placeholder={t("contact.form.phonePlaceholder")} className={inputClass(!!errors.phone)} autoComplete="tel" />
              </Field>

              <Field label={t("contact.form.message")} error={errors.message}>
                <textarea name="message" value={fields.message} onChange={handleChange} placeholder={t("contact.form.messagePlaceholder")} rows={4} className={[inputClass(!!errors.message), "resize-none"].join(" ")} />
              </Field>

              <button
                type="submit"
                disabled={status === "loading"}
                className={[
                  "mt-2 w-auto self-start px-10 py-3.5 rounded-xl",
                  "font-[Poppins] font-bold text-sm text-white",
                  "bg-neutral-900 hover:bg-neutral-700",
                  "transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
                  "disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100",
                  "flex items-center gap-2",
                ].join(" ")}
              >
                {status === "loading" ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    {t("contact.form.sending")}
                  </>
                ) : (
                  t("contact.form.send")
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;