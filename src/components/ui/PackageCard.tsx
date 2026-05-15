import React from "react";
import { useTranslation } from "react-i18next";

interface PackageCardProps {
  cityKey: string;
  image: string;
  startDate: string;
  endDate: string;
  price: number;
  currency: string;
  variant: "dark" | "green";
  onSeeMore: () => void;
}

const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const PackageCard: React.FC<PackageCardProps> = ({
  cityKey,
  image,
  startDate,
  endDate,
  price,
  currency,
  variant,
  onSeeMore,
}) => {
  const { t } = useTranslation();
  const isGreen = variant === "green";

  return (
    <div
      className={[
        "rounded-3xl overflow-hidden flex flex-col",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-2 hover:shadow-2xl",
        isGreen
          ? "bg-[#8ED77C]"
          : "bg-neutral-900 dark:bg-neutral-800",
      ].join(" ")}
    >
      {/* Title */}
      <div
        className={[
          "px-5 py-3",
          isGreen ? "bg-[#8ED77C]" : "bg-neutral-900 dark:bg-neutral-800",
        ].join(" ")}
      >
        <h3
          className={[
            "font-[Poppins] font-bold text-base",
            isGreen ? "text-neutral-900" : "text-white",
          ].join(" ")}
        >
          {t(`packages.${cityKey}.title`)}
        </h3>
      </div>

      {/* Image */}
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        <img
          src={image}
          alt={t(`packages.${cityKey}.city`)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <span className="absolute bottom-3 left-4 font-[Poppins] font-extrabold text-xl text-white tracking-widest uppercase">
          {t(`packages.${cityKey}.city`)}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-5 py-4 gap-3">
        {/* Dates */}
        <div className="flex items-center gap-5 flex-wrap">
          <span
            className={[
              "flex items-center gap-1.5 text-sm",
              isGreen ? "text-neutral-700" : "text-neutral-400",
            ].join(" ")}
          >
            <CalendarIcon
              className={[
                "w-4 h-4 flex-shrink-0",
                isGreen ? "text-neutral-600" : "text-neutral-500",
              ].join(" ")}
            />
            {startDate}
          </span>
          <span
            className={[
              "flex items-center gap-1.5 text-sm",
              isGreen ? "text-neutral-700" : "text-neutral-400",
            ].join(" ")}
          >
            <CalendarIcon
              className={[
                "w-4 h-4 flex-shrink-0",
                isGreen ? "text-neutral-600" : "text-neutral-500",
              ].join(" ")}
            />
            {endDate}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span
            className={[
              "font-[Poppins] font-extrabold text-3xl",
              isGreen ? "text-neutral-900" : "text-[#8ED77C]",
            ].join(" ")}
          >
            ${price.toLocaleString()}
          </span>
          <span
            className={[
              "font-[Poppins] text-sm font-medium",
              isGreen ? "text-neutral-600" : "text-neutral-400",
            ].join(" ")}
          >
            {currency}
          </span>
        </div>

        {/* Description */}
        <p
          className={[
            "font-[Poppins] text-sm leading-snug",
            isGreen ? "text-neutral-800" : "text-neutral-300",
          ].join(" ")}
        >
          {t(`packages.${cityKey}.description`)}
        </p>

        {/* CTA */}
        <div className="mt-auto pt-2">
          <button
            onClick={onSeeMore}
            className={[
              "w-full py-3 rounded-xl font-[Poppins] font-bold text-sm",
              "transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
              isGreen
                ? "bg-neutral-900 text-white hover:bg-neutral-700"
                : "bg-[#8ED77C] text-neutral-900 hover:bg-[#7bc96a]",
            ].join(" ")}
          >
            {t("packages.seeMore")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;