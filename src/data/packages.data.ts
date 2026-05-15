export interface Package {
  id: number;
  cityKey: string;
  image: string;
  startDate: string;
  endDate: string;
  priceUSD: number;
  priceMXN: number;
  continent: "asia" | "europe" | "america" | "africa" | "oceania";
  durationDays: number;
}

export const packages: Package[] = [
  {
    id: 1,
    cityKey: "tokyo",
    image: "/images/packages/tokyo.jpg",
    startDate: "04 Feb 2026",
    endDate: "22 Feb 2026",
    priceUSD: 4650,
    priceMXN: 89500,
    continent: "asia",
    durationDays: 18,
  },
  {
    id: 2,
    cityKey: "rome",
    image: "/images/packages/rome.jpg",
    startDate: "04 Feb 2026",
    endDate: "22 Feb 2026",
    priceUSD: 4650,
    priceMXN: 89500,
    continent: "europe",
    durationDays: 18,
  },
  {
    id: 3,
    cityKey: "paris",
    image: "/images/packages/paris.jpg",
    startDate: "04 Feb 2026",
    endDate: "22 Feb 2026",
    priceUSD: 4650,
    priceMXN: 89500,
    continent: "europe",
    durationDays: 18,
  },
];