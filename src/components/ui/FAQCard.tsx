import { useState } from "react";

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  side: "left" | "right";
}

interface FAQCardProps {
  item: FAQItem;
  theme: string;
  side: "left" | "right";
}

const FAQCard = ({ item, theme, side }: FAQCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`group relative rounded-2xl p-4 cursor-pointer transition-all duration-300 border ${
        theme === "dark"
          ? "bg-[#061202] border-[#0f2a08] hover:border-[#1a4a12] text-white"
          : "bg-[#061202] border-[#0a2006] hover:border-[#1a5010] text-white"
      } hover:shadow-[0_8px_32px_rgba(6,18,2,0.5)] hover:-translate-y-1`}
      onClick={() => setOpen((o) => !o)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && setOpen((o) => !o)}
      aria-expanded={open}
    >
      <div
        className={`absolute top-1/2 -translate-y-1/2 hidden lg:block w-6 h-0.5 bg-[#061202]/40 ${
          side === "left" ? "-right-6" : "-left-6"
        }`}
      />

      {/* Question */}
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs sm:text-sm font-semibold font-['Poppins'] leading-snug flex-1 text-white/90">
          {item.question}
        </p>
        <span
          className={`text-white/60 text-lg transition-transform duration-300 flex-shrink-0 leading-none ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </div>

      {/* Answer */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-white/60 text-xs font-['Poppins'] leading-relaxed border-t border-white/10 pt-3">
          {item.answer}
        </p>
      </div>
    </div>
  );
};

export default FAQCard;