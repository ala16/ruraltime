import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, TreeDeciduous } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface RelatedProperty {
  id: string;
  nome: string;
  cidade: string;
  estado: string;
  tipo_propriedade: string;
  imagens: string[];
  descricao: string;
}

interface RelatedPropertiesProps {
  currentPropertyId: string;
  cidade: string;
  estado: string;
  maxItems?: number;
}

export const RelatedProperties = ({
  currentPropertyId,
  cidade,
  estado,
  maxItems = 4,
}: RelatedPropertiesProps) => {
  const [properties, setProperties] = useState<RelatedProperty[]>([]);

  useEffect(() => {
    const fetchRelated = async () => {
      const { data } = await supabase.rpc("get_property_public_view");
      if (!data) return;

      const sameCidade = data.filter(
        (p: any) =>
          p.id !== currentPropertyId &&
          p.cidade?.toLowerCase() === cidade?.toLowerCase()
      );

      const sameEstado = data.filter(
        (p: any) =>
          p.id !== currentPropertyId &&
          p.estado === estado &&
          p.cidade?.toLowerCase() !== cidade?.toLowerCase()
      );

      const combined = [...sameCidade, ...sameEstado].slice(0, maxItems);
      setProperties(combined);
    };

    fetchRelated();
  }, [currentPropertyId, cidade, estado, maxItems]);

  if (properties.length === 0) return null;

  return (
    <aside aria-label="Propriedades relacionadas" className="py-10">
      <h2 className="text-2xl font-bold mb-6">
        Propriedades Relacionadas nesta Região
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {properties.map((prop) => (
          <Link key={prop.id} to={`/propriedade/${prop.id}`}>
            <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all group overflow-hidden">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={prop.imagens?.[0] || "/placeholder.svg"}
                  alt={`${prop.nome} - Turismo Rural em ${prop.cidade}, ${prop.estado}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width={400}
                  height={225}
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <TreeDeciduous className="h-4 w-4 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-1">
                      {prop.nome}
                    </h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {prop.cidade}, {prop.estado}
                    </p>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      {prop.tipo_propriedade}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </aside>
  );
};
