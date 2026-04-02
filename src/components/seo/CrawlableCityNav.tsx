import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CityLink {
  cidade: string;
  estado: string;
  count: number;
}

const toSlug = (str: string) =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const normalizeName = (str: string) =>
  str
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\b\w/g, (c) => c.toUpperCase());

export const CrawlableCityNav = () => {
  const [cities, setCities] = useState<CityLink[]>([]);
  const [expandedStates, setExpandedStates] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchCities = async () => {
      const { data } = await supabase.rpc("get_property_public_view");
      if (!data) return;

      const cityMap = new Map<string, CityLink>();
      for (const prop of data) {
        if (!prop.imagens || prop.imagens.length === 0) continue;
        const normalizedCity = normalizeName(prop.cidade);
        const normalizedState = prop.estado.toUpperCase().trim();
        const key = `${normalizedCity}-${normalizedState}`;
        if (cityMap.has(key)) {
          cityMap.get(key)!.count++;
        } else {
          cityMap.set(key, {
            cidade: normalizedCity,
            estado: normalizedState,
            count: 1,
          });
        }
      }

      setCities(
        Array.from(cityMap.values())
          .filter((c) => c.count > 0)
          .sort((a, b) => a.cidade.localeCompare(b.cidade))
      );
    };

    fetchCities();
  }, []);

  if (cities.length === 0) return null;

  const grouped = cities.reduce<Record<string, CityLink[]>>((acc, city) => {
    const estado = city.estado;
    if (!acc[estado]) acc[estado] = [];
    acc[estado].push(city);
    return acc;
  }, {});

  const toggleState = (estado: string) => {
    setExpandedStates((prev) => {
      const next = new Set(prev);
      if (next.has(estado)) next.delete(estado);
      else next.add(estado);
      return next;
    });
  };

  const VISIBLE_LIMIT = 5;

  return (
    <nav
      aria-label="Navegação por cidades de turismo rural"
      className="border-t border-white/20 mt-8 pt-8"
    >
      <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
        <MapPin className="h-4 w-4" />
        Turismo Rural por Cidade
      </h4>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(grouped).map(([estado, estadoCities]) => {
          const isExpanded = expandedStates.has(estado);
          const hasMore = estadoCities.length > VISIBLE_LIMIT;
          const visible = isExpanded ? estadoCities : estadoCities.slice(0, VISIBLE_LIMIT);

          return (
            <div key={estado}>
              <h5 className="font-medium text-white/90 mb-2">{estado}</h5>
              <ul className="space-y-1">
                {visible.map((city) => (
                  <li key={`${city.cidade}-${city.estado}`}>
                    <Link
                      to={`/destinos/${toSlug(city.estado)}/${toSlug(city.cidade)}`}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      Turismo Rural em {city.cidade}{" "}
                      <span className="text-white/50">({city.count})</span>
                    </Link>
                  </li>
                ))}
              </ul>
              {hasMore && (
                <button
                  onClick={() => toggleState(estado)}
                  className="mt-2 text-xs text-white/60 hover:text-white flex items-center gap-1 transition-colors"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="h-3 w-3" /> Ver menos
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-3 w-3" /> Ver mais ({estadoCities.length - VISIBLE_LIMIT})
                    </>
                  )}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};