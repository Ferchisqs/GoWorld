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

const PlaneTakeoff: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 19h19v2h-19v-2zm7.18-1.73l4.35 1.16 5.31-1.42c.8-.22 1.29-1.03 1.07-1.85-.22-.8-1.03-1.29-1.85-1.07l-3.28.88-2.5-4.32-1.5.4 1.05 4.54-3.12.84-.77-1.44-1.14.31.38 2.97z"/>
  </svg>
);

const PlaneLanding: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 19h19v2h-19v-2zm19.57-9.01c-.21-.81-1.03-1.29-1.84-1.09l-3.28.87-7.02-4.1-1.49.4 3.94 5.07-3.12.84-1.35-1.26-1.13.31.7 3.22 16.55-4.42c.81-.21 1.29-1.03 1.04-1.84z"/>
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

  const labelClass = isGreen ? "text-neutral-500" : "text-neutral-500";
  const valueClass = isGreen ? "text-neutral-900" : "text-white";
  const iconClass  = isGreen ? "text-neutral-600" : "text-[#8ED77C]";

  return (
    <div
      className={[
        "rounded-3xl overflow-hidden flex flex-col",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-2 hover:shadow-2xl",
        isGreen ? "bg-[#8ED77C]" : "bg-neutral-900 dark:bg-neutral-800",
      ].join(" ")}
    >
      {/* Title */}
      <div className={["px-5 py-3", isGreen ? "bg-[#8ED77C]" : "bg-neutral-900 dark:bg-neutral-800"].join(" ")}>
        <h3 className={["font-[Poppins] font-bold text-base", isGreen ? "text-neutral-900" : "text-white"].join(" ")}>
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
        <div className="flex items-center gap-4">
          {/* Departure */}
          <div className="flex flex-col gap-0.5 flex-1">
            <span className={["text-[10px] font-semibold uppercase tracking-wider font-[Poppins]", labelClass].join(" ")}>
              {t("packages.departure")}
            </span>
            <span className={["flex items-center gap-1.5 text-sm font-semibold font-[Poppins]", valueClass].join(" ")}>
              <PlaneTakeoff className={["w-4 h-4 flex-shrink-0", iconClass].join(" ")} />
              {startDate}
            </span>
          </div>

          {/* Divider */}
          <div className={["w-px h-8 self-center opacity-30", isGreen ? "bg-neutral-700" : "bg-neutral-600"].join(" ")} />

          {/* Return */}
          <div className="flex flex-col gap-0.5 flex-1">
            <span className={["text-[10px] font-semibold uppercase tracking-wider font-[Poppins]", labelClass].join(" ")}>
              {t("packages.return")}
            </span>
            <span className={["flex items-center gap-1.5 text-sm font-semibold font-[Poppins]", valueClass].join(" ")}>
              <PlaneLanding className={["w-4 h-4 flex-shrink-0", iconClass].join(" ")} />
              {endDate}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className={["font-[Poppins] font-extrabold text-3xl", isGreen ? "text-neutral-900" : "text-[#8ED77C]"].join(" ")}>
            ${price.toLocaleString()}
          </span>
          <span className={["font-[Poppins] text-sm font-medium", isGreen ? "text-neutral-600" : "text-neutral-400"].join(" ")}>
            {currency}
          </span>
        </div>

        {/* Description */}
        <p className={["font-[Poppins] text-sm leading-snug", isGreen ? "text-neutral-800" : "text-neutral-300"].join(" ")}>
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