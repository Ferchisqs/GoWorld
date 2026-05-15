import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PackageCard from "../ui/PackageCard";
import PackageModal from "../ui/PackageModal";
import { packages, type Package } from "../../data/packages.data";

const Packages: React.FC = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<Package | null>(null);

  return (
    <section
      id="packages"
      className="bg-white dark:bg-neutral-950 transition-colors duration-300 py-20 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="font-[Poppins] font-extrabold text-4xl md:text-5xl text-neutral-900 dark:text-white text-center mb-12">
          {t("packages.title")}
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <PackageCard
              key={pkg.id}
              cityKey={pkg.cityKey}
              image={pkg.image}
              startDate={pkg.startDate}
              endDate={pkg.endDate}
              price={pkg.price}
              currency={pkg.currency}
              variant={index === 1 ? "green" : "dark"}
              onSeeMore={() => setSelected(pkg)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected !== null && (
        <PackageModal
          cityKey={selected.cityKey}
          image={selected.image}
          startDate={selected.startDate}
          endDate={selected.endDate}
          price={selected.price}
          currency={selected.currency}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
};

export default Packages;