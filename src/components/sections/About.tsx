import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";
import PassportLeft from "../ui/PassportLeft";
import PassportRight from "../ui/PassportRight";

const About = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const bgClass = theme === "dark" ? "bg-gray-950" : "bg-gray-50";
  const titleClass = theme === "dark" ? "text-white" : "text-[#061202]";

  return (
    <section
      id="about"
      className={`w-full py-20 px-4 sm:px-8 transition-colors duration-300 ${bgClass}`}
    >
      <div className="max-w-4xl mx-auto">
        <h2
          className={`text-3xl sm:text-4xl font-bold font-['Poppins'] text-center mb-12 ${titleClass}`}
        >
          {t("about.title")}
        </h2>

        <div
          className={`rounded-2xl overflow-hidden shadow-2xl border transition-colors duration-300 ${
            theme === "dark"
              ? "border-[#0f2a08] shadow-[0_20px_60px_rgba(6,18,2,0.6)]"
              : "border-gray-200 shadow-[0_20px_60px_rgba(6,18,2,0.15)]"
          }`}
        >
          <div className="hidden sm:grid sm:grid-cols-[1fr_1fr]">
            <PassportLeft theme={theme} />
            <PassportRight />
          </div>

          <div className="flex sm:hidden flex-col">
            <div
              className={`relative flex flex-col items-start p-6 overflow-hidden transition-colors duration-300 ${
                theme === "dark" ? "bg-gray-100" : "bg-white"
              }`}
            >
              {/* Logo */}
              <img
                src={theme === "dark" ? "/images/logo/Logo-Dark.png" : "/images/logo/Logo.png"}
                alt="Go World logo"
                className="h-9 object-contain mb-4"
              />

              {/* Sello */}
              <div className="relative w-full h-44">
                <img
                  src="/images/about/Sello.png"
                  alt="Travel stamps"
                  className="w-full h-full object-contain object-left"
                />
              </div>
            </div>

            <PassportRight />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;