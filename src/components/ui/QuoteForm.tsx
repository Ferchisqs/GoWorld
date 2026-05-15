import { useTranslation } from "react-i18next";
import { DESTINATIONS, TRAVEL_STYLES, ADDITIONAL_SERVICES } from "../../data/quoteData";

interface QuoteFormProps {
  destination: string;
  travelers: number;
  nights: number;
  style: string;
  services: string[];
  theme: string;
  onDestinationChange: (v: string) => void;
  onTravelersChange: (v: number) => void;
  onNightsChange: (v: number) => void;
  onStyleChange: (v: string) => void;
  onServiceToggle: (key: string) => void;
  onCalculate: () => void;
}

const QuoteForm = ({
  destination, travelers, nights, style, services, theme,
  onDestinationChange, onTravelersChange, onNightsChange,
  onStyleChange, onServiceToggle, onCalculate,
}: QuoteFormProps) => {
  const { t } = useTranslation();

  const labelClass = `font-['Poppins'] font-semibold text-sm mb-1.5 block ${
    theme === "dark" ? "text-gray-300" : "text-[#061202]"
  }`;

  const inputClass = `w-full rounded-xl px-4 py-3 font-['Poppins'] text-sm outline-none border transition-all duration-200 focus:ring-2 focus:ring-[#8ED77C]/60 focus:border-[#8ED77C] ${
    theme === "dark"
      ? "bg-[#061202] border-[#0f2a08] text-white placeholder-white/30"
      : "bg-[#061202] border-[#0a2006] text-white placeholder-white/40"
  }`;

  return (
    <div className="flex flex-col gap-5">

      {/* Destination */}
      <div>
        <label className={labelClass}>{t("quote.form.destination")}</label>
        <select
          value={destination}
          onChange={(e) => onDestinationChange(e.target.value)}
          className={inputClass}
        >
          <option value="">{t("quote.form.destinationPlaceholder")}</option>
          {DESTINATIONS.map((d) => (
            <option key={d.key} value={d.key}>{d.label}</option>
          ))}
        </select>
      </div>

      {/* Travelers - Nights */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{t("quote.form.travelers")}</label>
          <input
            type="number"
            min={1}
            max={20}
            value={travelers}
            onChange={(e) => onTravelersChange(Math.max(1, parseInt(e.target.value) || 1))}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>{t("quote.form.nights")}</label>
          <input
            type="number"
            min={1}
            max={90}
            value={nights}
            onChange={(e) => onNightsChange(Math.max(1, parseInt(e.target.value) || 1))}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>{t("quote.form.travelStyle")}</label>
        <div className="grid grid-cols-3 gap-3">
          {TRAVEL_STYLES.map((s) => (
            <button
              key={s.key}
              onClick={() => onStyleChange(s.key)}
              className={`rounded-xl py-3 flex flex-col items-center gap-1 border-2 transition-all duration-200 font-['Poppins'] text-xs font-semibold ${
                style === s.key
                  ? "bg-[#061202] border-[#8ED77C] text-white scale-[1.03] shadow-lg shadow-[#8ED77C]/20"
                  : theme === "dark"
                  ? "bg-[#061202] border-[#0f2a08] text-white/60 hover:border-[#8ED77C]/40"
                  : "bg-[#061202] border-[#0a2006] text-white/60 hover:border-[#8ED77C]/40"
              }`}
            >
              <span className="text-xl"></span>
              <span>{t(`quote.styles.${s.key}`)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Additional services */}
      <div>
        <label className={labelClass}>{t("quote.form.additionalServices")}</label>
        <div className="flex flex-col gap-2">
          {ADDITIONAL_SERVICES.map((svc) => {
            const active = services.includes(svc.key);
            return (
              <button
                key={svc.key}
                onClick={() => onServiceToggle(svc.key)}
                className={`flex items-center justify-between rounded-xl px-4 py-3 border-2 transition-all duration-200 ${
                  active
                    ? "bg-[#061202] border-[#8ED77C] shadow-md shadow-[#8ED77C]/10"
                    : theme === "dark"
                    ? "bg-[#061202]/60 border-[#0f2a08] hover:border-[#8ED77C]/30"
                    : "bg-[#061202]/80 border-[#0a2006] hover:border-[#8ED77C]/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`font-['Poppins'] text-sm font-medium ${
                    active ? "text-white" : "text-white/60"
                  }`}>
                    {t(svc.labelKey)}
                  </span>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                  active ? "bg-[#8ED77C] border-[#8ED77C]" : "border-white/30"
                }`}>
                  {active && (
                    <svg className="w-3 h-3 text-[#061202]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Calculate */}
      <button
        onClick={onCalculate}
        className="mt-1 w-fit rounded-xl bg-[#8ED77C] text-[#061202] font-['Poppins'] font-bold text-sm px-10 py-3.5 hover:bg-[#7bc96a] active:scale-95 transition-all duration-200 shadow-lg shadow-[#8ED77C]/30"
      >
        {t("quote.form.calculate")}
      </button>
    </div>
  );
};

export default QuoteForm;