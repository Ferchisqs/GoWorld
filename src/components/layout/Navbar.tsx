import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";

const navLinks = [
  { key: "home", href: "#home" },
  { key: "packages", href: "#packages" },
  { key: "destinations", href: "#destinations" },
  { key: "questions", href: "#questions" },
  { key: "opinions", href: "#opinions" },
  { key: "about", href: "#about" },
  { key: "quote", href: "#quote" },
  { key: "contact", href: "#contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === "en" ? "es" : "en");
  };

  const logoSrc = theme === "light"
    ? "/images/logo/Logo.png"
    : "/images/logo/Logo-Dark.png";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-neutral-900 shadow-sm transition-colors duration-300 border-b border-neutral-100 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <a href="#home" className="flex items-center z-50">
          <img
            src={logoSrc}
            alt="Go World logo"
            className="h-10 w-auto object-contain"
          />
        </a>

        <ul className="hidden lg:flex items-center gap-7 font-sans text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {navLinks.map((link) => (
            <li key={link.key}>
              <a
                href={link.href}
                className="hover:text-brand-green transition-colors duration-200 capitalize"
              >
                {t(`nav.${link.key}`)}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-5">
          <button
            onClick={toggleLang}
            className="font-sans text-sm font-bold text-neutral-800 dark:text-white hover:text-brand-green transition-colors"
          >
            {i18n.language === "en" ? "ES" : "EN"}
          </button>

          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="text-xl hover:scale-110 transition-transform"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>

        {/* Hamburger Icon */}
        <button
          className="lg:hidden z-50 p-2 flex flex-col gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-neutral-900 dark:bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-neutral-900 dark:bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-neutral-900 dark:bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-white dark:bg-neutral-900 z-40 transition-transform duration-500 ease-in-out lg:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-28 px-10 pb-12">
          <ul className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <li key={link.key}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-xl font-medium text-neutral-700 dark:text-neutral-300 capitalize hover:text-[#8ED77C] transition-colors duration-200"
                >
                  {t(`nav.${link.key}`)}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-center gap-10 border-t border-neutral-100 dark:border-neutral-800 pt-8">
            <button
              onClick={toggleLang}
              className="text-2xl font-bold text-neutral-900 dark:text-white"
            >
              {i18n.language === "en" ? "ES" : "EN"}
            </button>
            <button
              onClick={toggleTheme}
              className="text-3xl"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}