import { useTranslation } from "react-i18next";

const PassportRight = () => {
  const { t } = useTranslation();

  return (
    <div className="relative flex flex-col justify-between bg-[#061202] rounded-r-2xl rounded-l-none p-8 min-h-[340px] overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-white"
            style={{ top: `${(i + 1) * 8}%` }}
          />
        ))}
      </div>

      {/* Top label */}
      <div className="relative z-10">
        <p className="text-white/40 text-[10px] uppercase tracking-[0.25em] font-['Poppins'] font-medium mb-1">
          {t("about.passportLabel")}
        </p>
        <h3 className="text-white text-xl sm:text-2xl font-bold font-['Poppins'] leading-snug">
          {t("about.whoWeAre")}
        </h3>
      </div>

      {/* Divider */}
      <div className="relative z-10 my-4 w-12 h-0.5 bg-white/20" />

      {/* Description */}
      <div className="relative z-10 flex-1">
        <p className="text-white/70 text-sm font-['Poppins'] leading-relaxed">
          {t("about.description")}
        </p>
      </div>

      {/* Stats */}
      <div className="relative z-10 mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-5">
        {[
          { value: t("about.stat1Value"), label: t("about.stat1Label") },
          { value: t("about.stat2Value"), label: t("about.stat2Label") },
          { value: t("about.stat3Value"), label: t("about.stat3Label") },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <span className="text-white font-bold text-lg sm:text-xl font-['Poppins']">
              {stat.value}
            </span>
            <span className="text-white/40 text-[10px] font-['Poppins'] uppercase tracking-wider mt-0.5">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PassportRight;