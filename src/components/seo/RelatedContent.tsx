import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, TreeDeciduous, Mountain } from "lucide-react";

interface RelatedItem {
  title: string;
  description: string;
  url: string;
  type: 'cidade' | 'estado' | 'cluster' | 'propriedade';
  badge?: string;
  image?: string;
}

interface RelatedContentProps {
  title?: string;
  items: RelatedItem[];
  variant?: 'cards' | 'list' | 'compact';
}

const typeIcons = {
  cidade: MapPin,
  estado: Mountain,
  cluster: TreeDeciduous,
  propriedade: TreeDeciduous,
};

export const RelatedContent = ({ 
  title = "Você também pode gostar", 
  items,
  variant = 'cards'
}: RelatedContentProps) => {
  if (items.length === 0) return null;

  if (variant === 'compact') {
    return (
      <div className="bg-card rounded-lg p-6 border">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={index}>
              <Link 
                to={item.url}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
              >
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                <span>{item.title}</span>
                {item.badge && (
                  <Badge variant="outline" className="ml-auto text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <section className="py-8">
        <h3 className="text-xl font-bold mb-6">{title}</h3>
        <div className="space-y-4">
          {items.map((item, index) => {
            const Icon = typeIcons[item.type];
            return (
              <Link 
                key={index}
                to={item.url}
                className="flex items-start gap-4 p-4 rounded-lg border hover:border-primary/50 hover:bg-primary/5 transition-all group"
              >
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <h3 className="text-2xl font-bold mb-8 text-center">{title}</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => {
          const Icon = typeIcons[item.type];
          return (
            <Link key={index} to={item.url}>
              <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all group overflow-hidden">
                {item.image && (
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                )}
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {item.description}
                      </p>
                      {item.badge && (
                        <Badge variant="secondary" className="mt-2 text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
