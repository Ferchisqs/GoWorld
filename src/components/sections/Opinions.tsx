import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";
import ReviewCard from "../ui/ReviewCard";
import { reviewsData } from "../../data/reviewsData";



const Opinions = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const reviews = reviewsData.map((r) => ({
    ...r,
    name: t(r.nameKey),
    review: t(r.reviewKey),
  }));

  const bgClass = theme === "dark" ? "bg-gray-950" : "bg-white";
  const titleClass = theme === "dark" ? "text-white" : "text-[#061202]";
  const subtitleClass = theme === "dark" ? "text-gray-400" : "text-gray-500";

  return (
    <section
      id="opinions"
      className={`w-full py-20 px-4 sm:px-8 transition-colors duration-300 ${bgClass}`}
    >
      <div className="max-w-5xl mx-auto">

        <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] grid-rows-[auto_auto_auto] gap-6 items-center">

          {/* Row 1 */}
          <ReviewCard {...reviews[0]} theme={theme} />
          <div /> 
          <ReviewCard {...reviews[2]} theme={theme} />

          {/* Row 2 */}
          <div /> 
          <div className="text-center px-8 py-6">
            <h2 className={`text-3xl xl:text-4xl font-bold font-['Poppins'] leading-tight ${titleClass}`}>
              {t("opinions.titleLine1")}
              <br />
              {t("opinions.titleLine2")}
            </h2>
            <p className={`mt-3 text-sm font-['Poppins'] ${subtitleClass}`}>
              {t("opinions.subtitle")}
            </p>
          </div>
          <div /> 

          {/* Row 3 */}
          <ReviewCard {...reviews[1]} theme={theme} />
          <div /> 
          <ReviewCard {...reviews[3]} theme={theme} />
        </div>

        {/* Tablet */}
        <div className="hidden sm:flex lg:hidden flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <ReviewCard {...reviews[0]} theme={theme} />
            <ReviewCard {...reviews[2]} theme={theme} />
          </div>

          <div className="text-center py-4">
            <h2 className={`text-3xl font-bold font-['Poppins'] leading-tight ${titleClass}`}>
              {t("opinions.titleLine1")}
              <br />
              {t("opinions.titleLine2")}
            </h2>
            <p className={`mt-3 text-sm font-['Poppins'] ${subtitleClass}`}>
              {t("opinions.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <ReviewCard {...reviews[1]} theme={theme} />
            <ReviewCard {...reviews[3]} theme={theme} />
          </div>
        </div>

        {/* Mobile*/}
        <div className="flex sm:hidden flex-col gap-6">
          <div className="text-center">
            <h2 className={`text-3xl font-bold font-['Poppins'] leading-tight ${titleClass}`}>
              {t("opinions.titleLine1")}
              <br />
              {t("opinions.titleLine2")}
            </h2>
            <p className={`mt-3 text-sm font-['Poppins'] ${subtitleClass}`}>
              {t("opinions.subtitle")}
            </p>
          </div>
          {reviews.map((r) => (
            <ReviewCard key={r.id} {...r} theme={theme} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Opinions;