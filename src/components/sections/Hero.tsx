import React from "react";
import { useTranslation } from "react-i18next";

import heroImg1 from "../../../public/images/hero/hero1.jpg";
import heroImg2 from "../../../public/images/hero/hero2.jpg";

const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className="relative min-h-screen pt-10 overflow-hidden bg-white dark:bg-neutral-950 transition-colors duration-300"
    >
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            className="block dark:hidden"
            points="1440,280 1440,900 0,900 0,720"
            fill="#8ED77C"
          />
          <polygon
            className="hidden dark:block"
            points="1440,280 1440,900 0,900 0,720"
            fill="#3B6D11"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 flex flex-col lg:flex-row items-center justify-between min-h-[calc(100vh-80px)] py-12 gap-12 lg:gap-4">

        {/* Left */}
        <div
          className="flex-1 z-10 text-center lg:text-left max-w-lg mx-auto lg:mx-0
            animate-[heroLeft_0.8s_ease_both]"
        >
          <h1 className="font-[Poppins] font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1] text-neutral-900 dark:text-white uppercase tracking-tighter">
            {t("hero.titleLine1")}
            <br />
            {t("hero.titleLine2")}
            <br />
            {t("hero.titleLine3Pre")}{" "}
            <span className="text-[#8ED77C] dark:text-[#8ED77C]">
              {t("hero.titleHighlight")}
            </span>
          </h1>

          <p
            className="mt-6 font-[Poppins] text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-sm leading-snug mx-auto lg:mx-0
              animate-[heroFade_0.8s_0.2s_ease_both]"
            style={{ animationFillMode: "backwards" }}
          >
            {t("hero.subtitle")}
          </p>

          <a
            href="#destinations"
            className="mt-10 inline-block bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-[Poppins] font-bold text-base px-10 py-4 rounded-2xl hover:scale-105 transition-transform duration-200 shadow-xl
              animate-[heroFade_0.8s_0.4s_ease_both]"
            style={{ animationFillMode: "backwards" }}
          >
            {t("hero.cta")}
          </a>
        </div>

        {/* Right */}
        <div
          className="flex-1 relative w-full max-w-sm sm:max-w-md lg:max-w-none mx-auto lg:mx-0 h-[220px] sm:h-[280px] md:h-[360px] lg:h-[520px] xl:h-[600px]
            animate-[heroRight_0.9s_0.1s_ease_both]"
          style={{ animationFillMode: "backwards" }}
        >
          {/* Back image */}
          <div
            className="absolute top-0 right-0 w-[72%] aspect-[4/3] rounded-[1.5rem] lg:rounded-[2.5rem] overflow-hidden shadow-2xl
              animate-[heroFade_0.8s_0.3s_ease_both]"
            style={{
              transform: "rotate(-6deg) translateX(0.5rem)",
              animationFillMode: "backwards",
            }}
          >
            <img
              src={heroImg1}
              alt={t("hero.img1Alt")}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 dark:bg-black/20 transition-colors duration-300" />
          </div>

          {/* Front image */}
          <div
            className="absolute top-[30%] left-0 w-[72%] aspect-[4/3] rounded-[1.5rem] lg:rounded-[2.5rem] overflow-hidden z-10
              animate-[heroFade_0.8s_0.5s_ease_both]"
            style={{
              transform: "rotate(2deg)",
              boxShadow: "0 20px 50px -10px rgba(0,0,0,0.45)",
              border: "8px solid transparent",
              animationFillMode: "backwards",
            }}
          >
            <img
              src={heroImg2}
              alt={t("hero.img2Alt")}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 dark:bg-black/20 transition-colors duration-300" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;