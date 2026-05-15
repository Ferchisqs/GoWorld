import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import PackageCard from "../ui/PackageCard";
import PackageModal from "../ui/PackageModal";
import { packages, type Package } from "../../data/packages.data";

type Continent = "all" | "asia" | "europe" | "america" | "africa" | "oceania";
type BudgetRange = "all" | "low" | "mid" | "high";

const CONTINENTS: { key: Continent; label: string }[] = [
  { key: "all",     label: "packages.filter.all" },
  { key: "asia",    label: "packages.filter.asia" },
  { key: "europe",  label: "packages.filter.europe" },
  { key: "america", label: "packages.filter.america" },
  { key: "africa",  label: "packages.filter.africa" },
  { key: "oceania", label: "packages.filter.oceania" },
];

const BUDGETS: { key: BudgetRange; label: string }[] = [
  { key: "all",  label: "packages.filter.anyBudget" },
  { key: "low",  label: "packages.filter.low" },
  { key: "mid",  label: "packages.filter.mid" },
  { key: "high", label: "packages.filter.high" },
];

function matchesBudget(pkg: Package, range: BudgetRange, isES: boolean): boolean {
  const price = isES ? pkg.priceMXN : pkg.priceUSD;
  if (range === "all") return true;
  if (isES) {
    if (range === "low")  return price < 60_000;
    if (range === "mid")  return price >= 60_000 && price <= 100_000;
    if (range === "high") return price > 100_000;
  } else {
    if (range === "low")  return price < 3_000;
    if (range === "mid")  return price >= 3_000 && price <= 6_000;
    if (range === "high") return price > 6_000;
  }
  return true;
}

const Packages: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selected, setSelected] = useState<Package | null>(null);
  const [continent, setContinent] = useState<Continent>("all");
  const [budget, setBudget] = useState<BudgetRange>("all");

  const isES = i18n.language === "es";
  const currency = isES ? "MXN" : "USD";

  const filtered = useMemo(() =>
    packages.filter((pkg) =>
      (continent === "all" || pkg.continent === continent) &&
      matchesBudget(pkg, budget, isES)
    ),
    [continent, budget, isES]
  );

  const chipBase =
    "font-[Poppins] text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap";
  const chipActive =
    "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-md";
  const chipInactive =
    "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700";

  return (
    <section
      id="packages"
      className="bg-white dark:bg-neutral-950 transition-colors duration-300 py-20 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="font-[Poppins] font-extrabold text-4xl md:text-5xl text-neutral-900 dark:text-white text-center mb-10">
          {t("packages.title")}
        </h2>

        {/* Filters */}
        <div className="flex flex-col gap-4 mb-10">

          {/* Continent */}
          <div className="flex flex-wrap gap-2 justify-center">
            {CONTINENTS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setContinent(key)}
                className={[chipBase, continent === key ? chipActive : chipInactive].join(" ")}
              >
                {t(label)}
              </button>
            ))}
          </div>

          {/* Budget */}
          <div className="flex flex-wrap gap-2 justify-center">
            {BUDGETS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setBudget(key)}
                className={[chipBase, budget === key ? chipActive : chipInactive].join(" ")}
              >
                {t(label)}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filtered.map((pkg, index) => (
              <PackageCard
                key={pkg.id}
                cityKey={pkg.cityKey}
                image={pkg.image}
                startDate={pkg.startDate}
                endDate={pkg.endDate}
                price={isES ? pkg.priceMXN : pkg.priceUSD}
                currency={currency}
                variant={index === 1 ? "green" : "dark"}
                onSeeMore={() => setSelected(pkg)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center font-[Poppins] text-neutral-500 dark:text-neutral-400 mt-10">
            {t("packages.filter.empty")}
          </p>
        )}
      </div>

      {selected !== null && (
        <PackageModal
          cityKey={selected.cityKey}
          image={selected.image}
          startDate={selected.startDate}
          endDate={selected.endDate}
          price={isES ? selected.priceMXN : selected.priceUSD}
          currency={currency}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
};

export default Packages;