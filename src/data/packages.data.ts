export interface Package {
  id: number;
  cityKey: string;
  image: string;
  startDate: string;
  endDate: string;
  price: number;
  currency: string;
}

export const packages: Package[] = [
  {
    id: 1,
    cityKey: "tokyo",
    image: "/images/packages/tokyo.jpg",
    startDate: "04 Feb 2026",
    endDate: "22 Feb 2026",
    price: 4650,
    currency: "USD",
  },
  {
    id: 2,
    cityKey: "rome",
    image: "/images/packages/rome.jpg",
    startDate: "04 Feb 2026",
    endDate: "22 Feb 2026",
    price: 4650,
    currency: "USD",
  },
  {
    id: 3,
    cityKey: "paris",
    image: "/images/packages/paris.jpg",
    startDate: "04 Feb 2026",
    endDate: "22 Feb 2026",
    price: 4650,
    currency: "USD",
  },
];