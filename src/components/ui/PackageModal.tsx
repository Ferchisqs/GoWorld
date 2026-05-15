import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface PackageModalProps {
  cityKey: string;
  image: string;
  startDate: string;
  endDate: string;
  price: number;
  currency: string;
  onClose: () => void;
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

const PackageModal: React.FC<PackageModalProps> = ({
  cityKey, image, startDate, endDate, price, currency, onClose,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const includes = t(`packages.${cityKey}.includes`, { returnObjects: true }) as string[];

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .modal-enter { animation: fadeUp 0.25s ease-out forwards; }
      `}</style>

      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="modal-enter relative bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden w-full max-w-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Hero image */}
          <div className="relative h-56 overflow-hidden flex-shrink-0">
            <img src={image} alt={t(`packages.${cityKey}.city`)} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <span className="absolute bottom-4 left-5 font-[Poppins] font-extrabold text-2xl text-white tracking-widest uppercase">
              {t(`packages.${cityKey}.city`)}
            </span>
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6 flex flex-col gap-4 max-h-[60vh] overflow-y-auto">

            <h2 className="font-[Poppins] font-bold text-xl text-neutral-900 dark:text-white">
              {t(`packages.${cityKey}.title`)}
            </h2>

            <div className="flex rounded-2xl overflow-hidden border border-neutral-100 dark:border-neutral-800">
              {/* Departure */}
              <div className="flex-1 flex flex-col items-center gap-1.5 py-3 px-4 bg-neutral-50 dark:bg-neutral-800/60">
                <PlaneTakeoff className="w-5 h-5 text-[#8ED77C]" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-[Poppins]">
                  {t("packages.departure")}
                </span>
                <span className="font-[Poppins] font-bold text-sm text-neutral-900 dark:text-white text-center">
                  {startDate}
                </span>
              </div>

              {/* Arrow connector */}
              <div className="flex items-center justify-center px-3 bg-neutral-50 dark:bg-neutral-800/60 border-x border-neutral-100 dark:border-neutral-800">
                <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>

              {/* Return */}
              <div className="flex-1 flex flex-col items-center gap-1.5 py-3 px-4 bg-neutral-50 dark:bg-neutral-800/60">
                <PlaneLanding className="w-5 h-5 text-[#8ED77C]" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-[Poppins]">
                  {t("packages.return")}
                </span>
                <span className="font-[Poppins] font-bold text-sm text-neutral-900 dark:text-white text-center">
                  {endDate}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-1.5">
              <span className="font-[Poppins] font-extrabold text-4xl text-[#8ED77C]">
                ${price.toLocaleString()}
              </span>
              <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{currency}</span>
            </div>

            <p className="font-[Poppins] text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {t(`packages.${cityKey}.fullDescription`)}
            </p>

            <ul className="flex flex-col gap-2">
              {Array.isArray(includes) && includes.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                  <span className="w-5 h-5 rounded-full bg-[#8ED77C]/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-[#8ED77C]" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="#quote"
              onClick={onClose}
              className="mt-2 w-full py-3.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-[Poppins] font-bold text-sm text-center hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 block"
            >
              {t("packages.modal.cta")}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default PackageModal;