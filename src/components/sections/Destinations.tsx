import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDestinations } from "../../hooks/useDestinations";
import type { DestinationData } from "../../types/destination.types";

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

interface ControlsProps {
  total: number;
  activeIndex: number;
  onLeft: () => void;
  onRight: () => void;
  onDot: (i: number) => void;
}

const Controls: React.FC<ControlsProps> = ({ total, activeIndex, onLeft, onRight, onDot }) => (
  <div className="flex items-center justify-center gap-4 mt-8">
    <button
      onClick={onLeft}
      aria-label="Previous"
      className="w-9 h-9 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:border-[#8ED77C] hover:text-[#8ED77C] transition-colors duration-200"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <div className="flex gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDot(i)}
          aria-label={`Go to slide ${i + 1}`}
          className={[
            "rounded-full transition-all duration-300",
            i === activeIndex
              ? "w-6 h-2.5 bg-[#8ED77C]"
              : "w-2.5 h-2.5 bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400",
          ].join(" ")}
        />
      ))}
    </div>

    <button
      onClick={onRight}
      aria-label="Next"
      className="w-9 h-9 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:border-[#8ED77C] hover:text-[#8ED77C] transition-colors duration-200"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
);

const DestinationInfo: React.FC<{ dest: DestinationData; visible: boolean }> = ({ dest, visible }) => {
  const { t } = useTranslation();
  return (
    <div
      className={[
        "mt-5 flex flex-col items-center gap-4 px-4 transition-all duration-400",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none",
      ].join(" ")}
    >
      <h3 className="font-[Poppins] font-extrabold text-2xl md:text-3xl text-neutral-900 dark:text-white uppercase tracking-widest text-center">
        {dest.name}
      </h3>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
        <InfoPill label={t("destinations.timezone")} value={dest.timezone} />
        <InfoPill label={t("destinations.languages")} value={dest.languages} />
        <InfoPill label={t("destinations.population")} value={dest.population} />
        <InfoPill label={t("destinations.currencies")} value={dest.currencies} />
      </div>
    </div>
  );
};

const Destinations: React.FC = () => {
  const { t } = useTranslation();
  const { destinations, loading, error } = useDestinations();
  const [activeIndex, setActiveIndex] = useState(0);
  const [infoVisible, setInfoVisible] = useState(true);
  const total = destinations.length;

  const changeIndex = (next: number) => {
    setInfoVisible(false);
    setTimeout(() => {
      setActiveIndex(next);
      setInfoVisible(true);
    }, 250);
  };

  const goLeft = () => changeIndex((activeIndex - 1 + total) % total);
  const goRight = () => changeIndex((activeIndex + 1) % total);

  const active = destinations[activeIndex];

  const getPosition = (index: number): "left" | "center" | "right" | null => {
    if (total === 0) return null;
    const leftIndex = (activeIndex - 1 + total) % total;
    const rightIndex = (activeIndex + 1) % total;
    if (index === activeIndex) return "center";
    if (index === leftIndex) return "left";
    if (index === rightIndex) return "right";
    return null;
  };

  return (
    <section
      id="destinations"
      className="bg-white dark:bg-neutral-950 transition-colors duration-300 py-20 px-6 md:px-16 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <h2 className="font-[Poppins] font-extrabold text-4xl md:text-5xl text-neutral-900 dark:text-white text-center mb-14">
          {t("destinations.title")}
        </h2>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center gap-4 py-20">
            <div className="w-10 h-10 border-4 border-[#8ED77C] border-t-transparent rounded-full animate-spin" />
            <p className="text-neutral-500 dark:text-neutral-400 font-[Poppins] text-sm">
              {t("destinations.loading")}
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-red-500 font-[Poppins] py-10">{error}</p>
        )}

        {!loading && !error && destinations.length > 0 && (
          <>
            {/* ── Mobile */}
            <div className="block md:hidden">
              <div
                key={activeIndex}
                className="w-full rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] animate-fadeIn"
              >
                <img
                  src={active.image}
                  alt={active.name}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>

              {/* Info */}
              <DestinationInfo dest={active} visible={infoVisible} />

              <Controls
                total={total}
                activeIndex={activeIndex}
                onLeft={goLeft}
                onRight={goRight}
                onDot={(i) => changeIndex(i)}
              />
            </div>

            {/* PC */}
            <div className="hidden md:block">
             
              <div className="relative flex items-center justify-center h-[380px]">
                {destinations.map((dest, i) => {
                  const pos = getPosition(i);
                  const isCenter = pos === "center";
                  const isVisible = pos !== null;

                  const styleMap: Record<string, React.CSSProperties> = {
                    center: { transform: "translateX(0)    scale(1)",    opacity: 1,   zIndex: 20, pointerEvents: "none" },
                    left:   { transform: "translateX(-62%) scale(0.86)", opacity: 0.6, zIndex: 10, pointerEvents: "auto" },
                    right:  { transform: "translateX(62%)  scale(0.86)", opacity: 0.6, zIndex: 10, pointerEvents: "auto" },
                  };

                  const hiddenStyle: React.CSSProperties = {
                    transform: "translateX(0) scale(0.75)",
                    opacity: 0,
                    zIndex: 0,
                    pointerEvents: "none",
                  };

                  return (
                    <div
                      key={dest.name}
                      onClick={(!isCenter && isVisible) ? () => changeIndex(i) : undefined}
                      role={(!isCenter && isVisible) ? "button" : undefined}
                      tabIndex={(!isCenter && isVisible) ? 0 : undefined}
                      onKeyDown={
                        (!isCenter && isVisible)
                          ? (e) => { if (e.key === "Enter" || e.key === " ") changeIndex(i); }
                          : undefined
                      }
                      style={{
                        ...(pos ? styleMap[pos] : hiddenStyle),
                        transition: "transform 500ms cubic-bezier(0.4,0,0.2,1), opacity 400ms ease, box-shadow 400ms ease",
                        position: "absolute",
                        width: "52%",
                        cursor: (!isCenter && isVisible) ? "pointer" : "default",
                      }}
                    >
                      <div className={["rounded-3xl overflow-hidden", isCenter ? "shadow-2xl" : "shadow-lg"].join(" ")}>
                        <div className="aspect-[3/2]">
                          <img
                            src={dest.image}
                            alt={dest.name}
                            className="w-full h-full object-cover"
                            draggable={false}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Info below carousel */}
              <DestinationInfo dest={active} visible={infoVisible} />

              <Controls
                total={total}
                activeIndex={activeIndex}
                onLeft={goLeft}
                onRight={goRight}
                onDot={(i) => changeIndex(i)}
              />
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.35s ease-out both; }
      `}</style>
    </section>
  );
};

export default Destinations;