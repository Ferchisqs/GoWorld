import { useTranslation } from "react-i18next";
import type { QuoteResult } from "../../data/quoteData";
import { fmt } from "../../data/quoteData";

interface QuoteResultPanelProps {
  result: QuoteResult | null;
  calculated: boolean;
  theme: string;
  currency: "USD" | "MXN";
}

const QuoteResultPanel = ({ result, calculated, theme, currency }: QuoteResultPanelProps) => {
  const { t } = useTranslation();

  const panelBg = theme === "dark" ? "bg-gray-900 border-[#0f2a08]" : "bg-white border-gray-200";
  const textMain = theme === "dark" ? "text-white" : "text-[#061202]";
  const textMuted = theme === "dark" ? "text-gray-400" : "text-gray-500";
  const rowBg = theme === "dark" ? "bg-white/5" : "bg-gray-50";

  if (!calculated || !result) {
    return (
      <div className={`rounded-2xl border p-8 flex flex-col items-center justify-center min-h-[340px] transition-colors duration-300 ${panelBg}`}>
        <p className={`font-['Poppins'] font-semibold text-base text-center ${textMain}`}>
          {t("quote.result.placeholder")}
        </p>
        <p className={`font-['Poppins'] text-sm text-center mt-2 ${textMuted}`}>
          {t("quote.result.placeholderSub")}
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border overflow-hidden transition-all duration-500 ${panelBg}`}>
      {/* Header */}
      <div className="bg-[#061202] px-6 py-5">
        <p className="text-[#8ED77C] font-['Poppins'] text-xs uppercase tracking-widest font-semibold mb-1">
          {t("quote.result.destination")}
        </p>
        <h3 className="text-white font-['Poppins'] font-extrabold text-2xl uppercase tracking-wider">
          {result.destinationLabel}
        </h3>
        <p className="text-white/40 font-['Poppins'] text-xs mt-1">{result.styleLabel}</p>
      </div>

      {/* Box */}
      <div className="bg-[#061202]/90 px-6 py-4 border-t border-white/5">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-white/50 font-['Poppins'] text-xs">{t("quote.result.totalCost")}</p>
            <p className="text-[#8ED77C] font-['Poppins'] font-extrabold text-3xl mt-0.5">
              {fmt(result.grandTotal, currency)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-white/50 font-['Poppins'] text-xs">{t("quote.result.dailyCost")}</p>
            <p className="text-white font-['Poppins'] font-bold text-xl mt-0.5">
              {fmt(result.dailyPerPerson, currency)}
            </p>
            <p className="text-white/30 font-['Poppins'] text-[10px]">{t("quote.result.perPersonPerNight")}</p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-white/10">
          <p className="text-white/50 font-['Poppins'] text-xs">
            {t("quote.result.perPerson")}:{" "}
            <span className="text-white font-semibold">{fmt(result.perPerson, currency)}</span>
          </p>
        </div>
      </div>

      {/* Breakdown */}
      <div className="px-6 py-5">
        <p className={`font-['Poppins'] font-semibold text-sm mb-3 ${textMain}`}>
          {t("quote.result.costDetails")}
        </p>
        <div className="flex flex-col gap-2">
          {result.breakdown.map((item, i) => (
            <div key={i} className={`flex justify-between items-center rounded-xl px-3 py-2.5 ${rowBg}`}>
              <p className={`font-['Poppins'] text-xs flex-1 pr-2 ${textMuted}`}>{item.label}</p>
              <p className={`font-['Poppins'] font-semibold text-sm flex-shrink-0 ${textMain}`}>
                {fmt(item.amount, currency)}
              </p>
            </div>
          ))}
          {/* Total */}
          <div className="flex justify-between items-center rounded-xl px-3 py-2.5 bg-[#8ED77C]/15 border border-[#8ED77C]/30 mt-1">
            <p className="font-['Poppins'] font-bold text-xs text-[#061202] dark:text-[#8ED77C]">
              {t("quote.result.total")}
            </p>
            <p className="font-['Poppins'] font-extrabold text-sm text-[#061202]">
              {fmt(result.grandTotal, currency)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteResultPanel;