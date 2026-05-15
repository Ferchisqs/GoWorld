import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";
import FAQCard from "../ui/FAQCard";
import PhoneMockup from "../ui/PhoneMockup";
import { getFAQData } from "../../data/faqData";

const Questions = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const faqData = getFAQData(t);
  const leftItems = faqData.filter((f) => f.side === "left");
  const rightItems = faqData.filter((f) => f.side === "right");

  return (
    <section
      id="questions"
      className={`w-full py-20 px-4 sm:px-8 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-950 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl sm:text-5xl font-bold font-['Poppins'] tracking-tight ${
              theme === "dark" ? "text-white" : "text-[#061202]"
            }`}
          >
            {t("qa.title")}
          </h2>
          <p
            className={`mt-3 text-sm sm:text-base font-['Poppins'] ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {t("qa.subtitle")}
          </p>
        </div>

        {/* PC */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-center">
          <div className="flex flex-col gap-4">
            {leftItems.map((item) => (
              <FAQCard key={item.id} item={item} theme={theme} side="left" />
            ))}
          </div>

          <PhoneMockup theme={theme} />

          <div className="flex flex-col gap-4">
            {rightItems.map((item) => (
              <FAQCard key={item.id} item={item} theme={theme} side="right" />
            ))}
          </div>
        </div>

        {/* Tablet */}
        <div className="hidden sm:flex lg:hidden flex-col items-center gap-10">
          <PhoneMockup theme={theme} />
          <div className="grid grid-cols-2 gap-4 w-full">
            {faqData.map((item) => (
              <FAQCard
                key={item.id}
                item={item}
                theme={theme}
                side={item.side}
              />
            ))}
          </div>
        </div>

        {/* Mobile*/}
        <div className="flex sm:hidden flex-col items-center gap-8">
          <PhoneMockup theme={theme} />
          <div className="flex flex-col gap-4 w-full">
            {faqData.map((item) => (
              <FAQCard
                key={item.id}
                item={item}
                theme={theme}
                side={item.side}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Questions;