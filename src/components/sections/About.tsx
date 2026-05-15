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
          {/* PC */}
          <div className="hidden sm:grid sm:grid-cols-[1fr_1fr]">
            <PassportLeft theme={theme} />
            <PassportRight />
          </div>

          {/* Mobile */}
          <div className="flex sm:hidden flex-col">
          
            <div className="relative flex flex-col items-center p-6 overflow-hidden bg-gray-100">
              {/* Dots rail */}
              <div className="absolute left-0 top-0 h-full w-3 flex flex-col justify-around items-center py-3">
                {Array.from({ length: 14 }).map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-gray-200" />
                ))}
              </div>

              {/* Logo */}
              <img
                src="/images/logo/Logo.png"
                alt="Go World logo"
                className="h-9 object-contain mb-5 self-start ml-4"
              />

              {/* Stamps */}
              <div className="w-full flex items-center justify-center px-4">
                <img
                  src="/images/about/Sello.png"
                  alt="Travel stamps"
                  className="w-full max-w-xs object-contain"
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