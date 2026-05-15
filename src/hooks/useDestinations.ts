import { useEffect, useState } from "react";
import type { DestinationData } from "../types/destination.types";

interface CountryRaw {
  name: { common: string };
  timezones: string[];
  languages: Record<string, string>;
  population: number;
  currencies: Record<string, { name: string; symbol: string }>;
}

// Variables de entorno 
const BASE_URL_COUNTRIES = import.meta.env.VITE_BASE_URL_COUNTRIES as string;
const BASE_URL_UNSPLASH  = import.meta.env.VITE_BASE_URL_UNSPLASH  as string;
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY as string;

const COUNTRIES = [
  { query: "canada",   search: "canadian flag" },
  { query: "brazil",   search: "christ redeemer rio" },
  { query: "thailand", search: "wat arun bangkok" },
];

//  Fetchers 
async function fetchCountry(name: string): Promise<CountryRaw> {
  const url = `${BASE_URL_COUNTRIES}/name/${name}?fullText=true&fields=name,timezones,languages,population,currencies`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error fetching country: ${name}`);
  const data: CountryRaw[] = await res.json();
  return data[0];
}

async function fetchUnsplashImage(query: string): Promise<string> {
  if (!UNSPLASH_ACCESS_KEY) {
    return `https://picsum.photos/seed/${encodeURIComponent(query)}/800/600`;
  }

  const url = `${BASE_URL_UNSPLASH}/search/photos?query=${encodeURIComponent(query)}&per_page=3&orientation=landscape&content_filter=high`;

  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
  });

  if (!res.ok) throw new Error("Error fetching Unsplash image");

  const data = await res.json();
  const sorted = [...(data.results ?? [])].sort(
    (a: { likes: number }, b: { likes: number }) => b.likes - a.likes
  );

  return sorted[0]?.urls?.regular ?? "";
}

//  Helpers 
function formatPopulation(pop: number): string {
  if (pop >= 1_000_000) return `${(pop / 1_000_000).toFixed(1)}M`;
  if (pop >= 1_000)     return `${(pop / 1_000).toFixed(0)}K`;
  return String(pop);
}

// Hook 
export function useDestinations() {
  const [destinations, setDestinations] = useState<DestinationData[]>([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const results = await Promise.all(
          COUNTRIES.map(async ({ query, search }) => {
            const [country, image] = await Promise.all([
              fetchCountry(query),
              fetchUnsplashImage(search),
            ]);

            const languages  = Object.values(country.languages  ?? {}).join(", ");
            const currencies = Object.values(country.currencies ?? {})
              .map((c) => `${c.name} (${c.symbol})`)
              .join(", ");
            const timezone   = country.timezones?.[0] ?? "N/A";
            const population = formatPopulation(country.population);

            return {
              name: country.name.common,
              timezone,
              languages,
              population,
              currencies,
              image,
            } satisfies DestinationData;
          })
        );

        if (!cancelled) setDestinations(results);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        if (!cancelled) setError("Error loading destinations. Try again later.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { destinations, loading, error };
}