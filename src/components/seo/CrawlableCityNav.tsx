import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CityLink {
  cidade: string;
  estado: string;
  count: number;
}

export const CrawlableCityNav = () => {
  const [cities, setCities] = useState<CityLink[]>([]);

  useEffect(() => {
    const fetchCities = async () => {
      const { data } = await supabase.rpc("get_property_public_view");
      if (!data) return;

      const cityMap = new Map<string, CityLink>();
      for (const prop of data) {
        const key = `${prop.cidade}-${prop.estado}`;
        if (cityMap.has(key)) {
          cityMap.get(key)!.count++;
        } else {
          cityMap.set(key, {
            cidade: prop.cidade,
            estado: prop.estado,
            count: 1,
          });
        }
      }

      setCities(
        Array.from(cityMap.values()).sort((a, b) =>
          a.cidade.localeCompare(b.cidade)
        )
      );
    };

    fetchCities();
  }, []);

  if (cities.length === 0) return null;

  const toSlug = (str: string) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  const grouped = cities.reduce<Record<string, CityLink[]>>((acc, city) => {
    const estado = city.estado.toUpperCase();
    if (!acc[estado]) acc[estado] = [];
    acc[estado].push(city);
    return acc;
  }, {});

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
        {Object.entries(grouped).map(([estado, estadoCities]) => (
          <div key={estado}>
            <h5 className="font-medium text-white/90 mb-2">{estado}</h5>
            <ul className="space-y-1">
              {estadoCities.map((city) => (
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
          </div>
        ))}
      </div>
    </nav>
  );
};
