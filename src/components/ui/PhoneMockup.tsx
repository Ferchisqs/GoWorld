import { useTranslation } from "react-i18next";

interface PhoneMockupProps {
  theme: string;
}

const PhoneMockup = ({ theme }: PhoneMockupProps) => {
  const { t } = useTranslation();

  return (
    <div className="relative flex items-center justify-center">
      {/* Glow */}
      <div
        className={`absolute inset-0 rounded-[3rem] blur-3xl opacity-20 pointer-events-none ${
          theme === "dark" ? "bg-green-900" : "bg-[#061202]"
        }`}
      />

      <div
        className={`relative w-[200px] h-[400px] sm:w-[240px] sm:h-[480px] lg:w-[260px] lg:h-[520px] rounded-[3rem] border-[10px] shadow-2xl flex flex-col items-center justify-center overflow-hidden transition-colors duration-300 ${
          theme === "dark"
            ? "border-[#1a3a14] bg-[#061202] shadow-[0_0_60px_rgba(6,18,2,0.8)]"
            : "border-[#061202] bg-[#061202] shadow-[0_20px_60px_rgba(6,18,2,0.4)]"
        }`}
      >
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-10" />

        <div className="w-full h-full flex flex-col items-center justify-center px-4 pt-8 pb-6 gap-4">
          {/* Icon */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute w-12 h-10 bg-white/20 rounded-2xl rounded-bl-none top-0 left-0" />
              <div className="absolute w-10 h-8 bg-white/10 rounded-2xl rounded-tr-none bottom-0 right-0" />
            </div>

            <h3 className="text-white font-bold text-base text-center leading-tight font-['Poppins']">
              {t("qa.title")}
            </h3>
            <p className="text-white/60 text-xs text-center font-['Poppins'] leading-relaxed">
              {t("qa.subtitle")}
            </p>
          </div>

          <div className="w-full flex flex-col gap-2 mt-2">
            {[100, 80, 90, 70].map((w, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full bg-white/20"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>

          {/* Bottom */}
          <div className="mt-auto bg-white/10 rounded-xl px-4 py-2 text-center">
            <p className="text-white/80 text-[10px] font-['Poppins'] font-medium">
              Go World Travel
            </p>
          </div>
        </div>

        <div className="absolute bottom-3 w-20 h-1 bg-white/30 rounded-full" />
      </div>
    </div>
  );
};

export default PhoneMockup;