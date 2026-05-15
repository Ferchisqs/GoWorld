import React from "react";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer
      style={{ backgroundColor: "#061202" }}
      className="text-white px-6 md:px-16 pt-12 pb-6"
    >
      <div className="max-w-7xl mx-auto">

        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo */}
          <div className="flex flex-col gap-4">
            <img
              src="/images/logo/Logo-Dark.png"
              alt="Go World"
              className="h-10 w-auto object-contain self-start"
            />
            <div className="flex flex-col gap-2 mt-1">
              <p className="font-[Poppins] text-xs text-neutral-400">
                {t("footer.location")}
              </p>
              <a
                href="mailto:GoWorld@gmail.com"
                className="font-[Poppins] text-xs text-[#8ED77C] hover:underline"
              >
                GoWorld@gmail.com
              </a>
              <a
                href="tel:+52xxxxxxxxx"
                className="font-[Poppins] text-xs text-neutral-400 hover:text-[#8ED77C] transition-colors"
              >
                +52 xxx xxx xxx
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="flex flex-col gap-3">
            <h4 className="font-[Poppins] font-bold text-sm tracking-widest uppercase text-white">
              {t("footer.explore")}
            </h4>
            <ul className="flex flex-col gap-2">
              {(["home", "packages", "destinations"] as const).map((key) => (
                <li key={key}>
                  <a
                    href={`#${key}`}
                    className="font-[Poppins] text-sm text-neutral-400 hover:text-[#8ED77C] transition-colors duration-200"
                  >
                    {t(`nav.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-3">
            <h4 className="font-[Poppins] font-bold text-sm tracking-widest uppercase text-white">
              {t("footer.company")}
            </h4>
            <ul className="flex flex-col gap-2">
              {(["about", "opinions"] as const).map((key) => (
                <li key={key}>
                  <a
                    href={`#${key}`}
                    className="font-[Poppins] text-sm text-neutral-400 hover:text-[#8ED77C] transition-colors duration-200"
                  >
                    {t(`nav.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-3">
            <h4 className="font-[Poppins] font-bold text-sm tracking-widest uppercase text-white">
              {t("footer.support")}
            </h4>
            <ul className="flex flex-col gap-2">
              {(["questions", "quote"] as const).map((key) => (
                <li key={key}>
                  <a
                    href={`#${key === "quote" ? "contact" : key}`}
                    className="font-[Poppins] text-sm text-neutral-400 hover:text-[#8ED77C] transition-colors duration-200"
                  >
                    {t(`nav.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Icons */}
        <div className="mt-10 flex gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-10 h-10 rounded-lg border-2 border-[#8ED77C] flex items-center justify-center hover:bg-[#8ED77C]/10 transition-colors duration-200"
          >
            <svg className="w-5 h-5 text-[#8ED77C]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-10 h-10 rounded-lg border-2 border-[#8ED77C] flex items-center justify-center hover:bg-[#8ED77C]/10 transition-colors duration-200"
          >
            <svg className="w-5 h-5 text-[#8ED77C]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
          </a>
        </div>

        <div className="mt-10 border-t border-white/20" />

        {/* Copyright */}
        <div className="mt-5">
          <p className="font-[Poppins] text-xs text-neutral-500 text-center md:text-left">
            {t("footer.copyright")}
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;