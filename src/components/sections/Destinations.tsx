import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDestinations } from "../../hooks/useDestinations";
import DestinationSlide from "../ui/DestinationSlide"; 

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

const Destinations: React.FC = () => {
  const { t } = useTranslation();
  const { destinations, loading, error } = useDestinations();
  const [activeIndex, setActiveIndex] = useState(0);
  const total = destinations.length;

  const changeIndex = (next: number) => setActiveIndex(next);
  const goLeft  = () => changeIndex((activeIndex - 1 + total) % total);
  const goRight = () => changeIndex((activeIndex + 1) % total);

  const getPosition = (index: number): "left" | "center" | "right" | null => {
    if (total === 0) return null;
    if (index === activeIndex)                    return "center";
    if (index === (activeIndex - 1 + total) % total) return "left";
    if (index === (activeIndex + 1) % total)         return "right";
    return null;
  };

  return (
    <section
      id="destinations"
      className="bg-white dark:bg-neutral-950 transition-colors duration-300 py-20 px-6 md:px-16 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">

        <h2 className="font-[Poppins] font-extrabold text-4xl md:text-5xl text-neutral-900 dark:text-white text-center mb-14">
          {t("destinations.title")}
        </h2>

        {loading && (
          <div className="flex flex-col items-center gap-4 py-20">
            <div className="w-10 h-10 border-4 border-[#8ED77C] border-t-transparent rounded-full animate-spin" />
            <p className="text-neutral-500 dark:text-neutral-400 font-[Poppins] text-sm">
              {t("destinations.loading")}
            </p>
          </div>
        )}

        {error && (
          <p className="text-center text-red-500 font-[Poppins] py-10">{error}</p>
        )}

        {!loading && !error && destinations.length > 0 && (
          <>
            {/* ── Mobile: solo slide activo ── */}
            <div className="block md:hidden">
              <DestinationSlide
                key={activeIndex}
                destination={destinations[activeIndex]}
                position="center"
                onClick={() => {}}
              />
              <Controls
                total={total}
                activeIndex={activeIndex}
                onLeft={goLeft}
                onRight={goRight}
                onDot={changeIndex}
              />
            </div>

            {/*Desktop*/}
            <div className="hidden md:block">
              <div className="relative flex items-center justify-center h-[420px]">
                {destinations.map((dest, i) => {
                  const pos = getPosition(i);
                  if (!pos) return null; 

                  return (
                    <DestinationSlide
                      key={dest.name}
                      destination={dest}
                      position={pos}
                      onClick={() => changeIndex(i)}
                    />
                  );
                })}
              </div>

              <Controls
                total={total}
                activeIndex={activeIndex}
                onLeft={goLeft}
                onRight={goRight}
                onDot={changeIndex}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Destinations;