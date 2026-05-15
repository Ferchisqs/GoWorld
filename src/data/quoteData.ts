// ─── Destination base prices (USD per person per night) ───────────────────
export const DESTINATIONS = [
  { key: "japan",   label: "Japan 🇯🇵",   basePrice: 180, flag: "🇯🇵" },
  { key: "france",  label: "France 🇫🇷",  basePrice: 160, flag: "🇫🇷" },
  { key: "italy",   label: "Italy 🇮🇹",   basePrice: 150, flag: "🇮🇹" },
  { key: "mexico",  label: "Mexico 🇲🇽",  basePrice:  90, flag: "🇲🇽" },
  { key: "usa",     label: "USA 🇺🇸",     basePrice: 200, flag: "🇺🇸" },
  { key: "spain",   label: "Spain 🇪🇸",   basePrice: 140, flag: "🇪🇸" },
  { key: "sweden",  label: "Sweden 🇸🇪",  basePrice: 170, flag: "🇸🇪" },
  { key: "belgium", label: "Belgium 🇧🇪", basePrice: 145, flag: "🇧🇪" },
];

// ─── Travel style multipliers ──────────────────────────────────────────────
export const TRAVEL_STYLES = [
  { key: "basic",    label: "Basic",    multiplier: 1.0,},
  { key: "standard", label: "Standard", multiplier: 1.5 },
  { key: "premium",  label: "Premium",  multiplier: 2.4 },
];

// ─── Additional services ───────────────────────────────────────────────────
export interface AdditionalService {
  key: string;
  labelKey: string;
  pricePerPerson: number;
}

export const ADDITIONAL_SERVICES: AdditionalService[] = [
  { key: "transfer",  labelKey: "quote.services.transfer",  pricePerPerson:  40,  },
  { key: "insurance", labelKey: "quote.services.insurance", pricePerPerson:  60,  },
  { key: "tours",     labelKey: "quote.services.tours",     pricePerPerson:  80,  },
  { key: "hotel",     labelKey: "quote.services.hotel",     pricePerPerson: 120,  },
  { key: "advisory",  labelKey: "quote.services.advisory",  pricePerPerson:  50,  },
];

// ─── Price calculator ──────────────────────────────────────────────────────
export interface QuoteInput {
  destination: string;
  travelers: number;
  nights: number;
  style: string;
  services: string[];
}

export interface QuoteResult {
  destinationLabel: string;
  baseTotal: number;
  styleLabel: string;
  styleMultiplier: number;
  servicesTotal: number;
  grandTotal: number;
  perPerson: number;
  dailyPerPerson: number;
  breakdown: { label: string; amount: number }[];
}

export const calculateQuote = (input: QuoteInput): QuoteResult | null => {
  const dest = DESTINATIONS.find((d) => d.key === input.destination);
  const style = TRAVEL_STYLES.find((s) => s.key === input.style);
  if (!dest || !style || input.travelers < 1 || input.nights < 1) return null;

  const basePerPersonPerNight = dest.basePrice * style.multiplier;
  const baseTotal = basePerPersonPerNight * input.travelers * input.nights;

  const selectedServices = ADDITIONAL_SERVICES.filter((s) =>
    input.services.includes(s.key)
  );
  const servicesTotal = selectedServices.reduce(
    (sum, s) => sum + s.pricePerPerson * input.travelers,
    0
  );

  const grandTotal = baseTotal + servicesTotal;
  const perPerson = grandTotal / input.travelers;
  const dailyPerPerson = perPerson / input.nights;

  const breakdown = [
    {
      label: `${dest.label} · ${style.label} · ${input.nights}n · ${input.travelers}pax`,
      amount: baseTotal,
    },
    ...selectedServices.map((s) => ({
      label: " " + s.key,
      amount: s.pricePerPerson * input.travelers,
    })),
  ];

  return {
    destinationLabel: dest.label,
    baseTotal,
    styleLabel: style.label,
    styleMultiplier: style.multiplier,
    servicesTotal,
    grandTotal,
    perPerson,
    dailyPerPerson,
    breakdown,
  };
};

export const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);