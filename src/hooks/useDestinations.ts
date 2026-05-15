import { useEffect, useState } from "react";

export interface DestinationData {
  name: string;
  timezone: string;
  languages: string;
  population: string;
  currencies: string;
  image: string;
  flagEmoji?: string;
}

interface CountryRaw {
  name: { common: string };
  timezones: string[];
  languages: Record<string, string>;
  population: number;
  currencies: Record<string, { name: string; symbol: string }>;
}

const UNSPLASH_ACCESS_KEY = "469FEa9m3dS16TFvr_m5HQ11iNbjO3RYfJAtjUJbKhY";


const COUNTRIES = [
  { query: "canada",   search: "canadian flag" },
  { query: "brazil",   search: "christ redeemer rio" },
  { query: "thailand", search: "wat arun bangkok" },
];

async function fetchCountry(name: string): Promise<CountryRaw> {
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${name}?fullText=true&fields=name,timezones,languages,population,currencies`
  );
  if (!res.ok) throw new Error(`Error fetching country: ${name}`);
  const data: CountryRaw[] = await res.json();
  return data[0];
}

async function fetchUnsplashImage(query: string): Promise<string> {
  console.log(`🔍 Buscando imagen para: "${query}"`);

  if (!UNSPLASH_ACCESS_KEY) {
    const fallback = `https://picsum.photos/seed/${encodeURIComponent(query)}/800/600`;
    console.warn(` Sin API key — usando fallback Picsum: ${fallback}`);
    return fallback;
  }

  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=3&orientation=landscape&content_filter=high`;
  console.log(`📡 Fetch a Unsplash:`, url);

  const res = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
    },
  });

  console.log(`Respuesta Unsplash status: ${res.status}`);

  if (!res.ok) throw new Error("Error fetching Unsplash image");

  const data = await res.json();
  console.log(`Resultados para "${query}":`, data.results?.length ?? 0, "fotos");
  data.results?.forEach((r: { id: string; likes: number; urls: { regular: string } }, i: number) => {
    console.log(`  [${i}] id: ${r.id} | likes: ${r.likes} | url: ${r.urls?.regular?.slice(0, 60)}...`);
  });

  const sorted = [...(data.results ?? [])].sort((a: { likes: number }, b: { likes: number }) => b.likes - a.likes);
  const finalUrl = sorted[0]?.urls?.regular ?? "";
  console.log(`Imagen seleccionada para "${query}": ${finalUrl.slice(0, 80)}...`);

  return finalUrl;
}

function formatPopulation(pop: number): string {
  if (pop >= 1_000_000) return `${(pop / 1_000_000).toFixed(1)}M`;
  if (pop >= 1_000) return `${(pop / 1_000).toFixed(0)}K`;
  return String(pop);
}

export function useDestinations() {
  const [destinations, setDestinations] = useState<DestinationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      console.log("useDestinations: iniciando carga...");
      try {
        setLoading(true);
        setError(null);

        const results = await Promise.all(
          COUNTRIES.map(async ({ query, search }) => {
            const [country, image] = await Promise.all([
              fetchCountry(query),
              fetchUnsplashImage(search),
            ]);

            console.log(`País cargado: ${country.name.common} | imagen: ${image.slice(0, 60)}...`);

            const languages = Object.values(country.languages ?? {}).join(", ");
            const currencies = Object.values(country.currencies ?? {})
              .map((c) => `${c.name} (${c.symbol})`)
              .join(", ");
            const timezone = country.timezones?.[0] ?? "N/A";
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

        console.log("Todos los destinos cargados:", results.map(r => r.name));
        if (!cancelled) setDestinations(results);
      } catch (err) {
        console.error("Error en useDestinations:", err);
        if (!cancelled) setError("Error loading destinations. Try again later.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { destinations, loading, error };
}