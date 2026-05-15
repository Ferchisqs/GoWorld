import React from "react";
import { useTranslation } from "react-i18next";
import type { DestinationData } from "../../hooks/useDestinations";

interface DestinationSlideProps {
  destination: DestinationData;
  position: "left" | "center" | "right";
  onClick: () => void;
}

const InfoPill: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col items-center gap-0.5">
    <span className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-semibold">
      {label}
    </span>
    <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200 text-center">
      {value}
    </span>
  </div>
);

const DestinationSlide: React.FC<DestinationSlideProps> = ({
  destination,
  position,
  onClick,
}) => {
  const { t } = useTranslation();
  const isCenter = position === "center";

  const positionClasses = {
    left: "absolute left-0 top-1/2 -translate-y-1/2 w-[36%] z-10 scale-[0.88] opacity-70 cursor-pointer",
    center: "relative w-[55%] z-20 scale-100 opacity-100 mx-auto",
    right: "absolute right-0 top-1/2 -translate-y-1/2 w-[36%] z-10 scale-[0.88] opacity-70 cursor-pointer",
  };

  return (
    <div
      className={["transition-all duration-500 ease-in-out", positionClasses[position]].join(" ")}
      onClick={!isCenter ? onClick : undefined}
      role={!isCenter ? "button" : undefined}
      tabIndex={!isCenter ? 0 : undefined}
      onKeyDown={
        !isCenter
          ? (e) => { if (e.key === "Enter" || e.key === " ") onClick(); }
          : undefined
      }
    >
      {/* Image */}
      <div className={["rounded-3xl overflow-hidden shadow-xl", isCenter ? "shadow-2xl" : ""].join(" ")}>
        <div className={isCenter ? "aspect-[3/2]" : "aspect-[4/3]"}>
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>
      </div>

      {/* Info  */}
      {isCenter && (
        <div className="mt-5 flex flex-col items-center gap-4 px-4">
          <h3 className="font-[Poppins] font-extrabold text-3xl text-neutral-900 dark:text-white uppercase tracking-widest text-center">
            {destination.name}
          </h3>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            <InfoPill label={t("destinations.timezone")} value={destination.timezone} />
            <InfoPill label={t("destinations.languages")} value={destination.languages} />
            <InfoPill label={t("destinations.population")} value={destination.population} />
            <InfoPill label={t("destinations.currencies")} value={destination.currencies} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationSlide;