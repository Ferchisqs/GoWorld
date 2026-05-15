import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";
import QuoteForm from "../../components/ui/QuoteForm";
import QuoteResultPanel from "../../components/ui/QuoteResultPanel";
import { calculateQuote } from "../../data/quoteData";
import type { QuoteResult } from "../../data/quoteData";


const Quote = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  //  Form state 
  const [destination, setDestination] = useState("");
  const [travelers, setTravelers] = useState(2);
  const [nights, setNights] = useState(7);
  const [style, setStyle] = useState("standard");
  const [services, setServices] = useState<string[]>([]);

  //  Result state 
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [calculated, setCalculated] = useState(false);
  const [error, setError] = useState(false);

  const toggleService = (key: string) => {
    setServices((prev) =>
      prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key]
    );
  };

  const handleCalculate = () => {
    if (!destination) {
      setError(true);
      setTimeout(() => setError(false), 2500);
      return;
    }
    setError(false);
    const r = calculateQuote({ destination, travelers, nights, style, services });
    setResult(r);
    setCalculated(true);
  };

  const bgClass = theme === "dark" ? "bg-gray-950" : "bg-gray-50";
  const titleClass = theme === "dark" ? "text-white" : "text-[#061202]";

  return (
    <section
      id="quote"
      className={`w-full py-20 px-4 sm:px-8 transition-colors duration-300 ${bgClass}`}
    >
      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl sm:text-4xl font-extrabold font-['Poppins'] ${titleClass}`}>
            {t("quote.title")}
          </h2>
          <p className={`mt-3 text-sm font-['Poppins'] ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
            {t("quote.subtitle")}
          </p>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-300 rounded-xl px-5 py-3 max-w-md mx-auto">
            <span className="text-red-500 text-lg">Alert</span>
            <p className="text-red-700 font-['Poppins'] text-sm font-medium">
              {t("quote.errors.selectDestination")}
            </p>
          </div>
        )}

        {/* Main */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <QuoteForm
            destination={destination}
            travelers={travelers}
            nights={nights}
            style={style}
            services={services}
            theme={theme}
            onDestinationChange={setDestination}
            onTravelersChange={setTravelers}
            onNightsChange={setNights}
            onStyleChange={setStyle}
            onServiceToggle={toggleService}
            onCalculate={handleCalculate}
          />
          <div className="md:sticky md:top-24">
            <QuoteResultPanel result={result} calculated={calculated} theme={theme} />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Quote;