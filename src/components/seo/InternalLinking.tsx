import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { MapPin, TreeDeciduous, Leaf, Mountain, Users } from "lucide-react";

interface LinkItem {
  label: string;
  url: string;
  count?: number;
}

interface LinkGroup {
  title: string;
  icon?: 'map' | 'tree' | 'leaf' | 'mountain' | 'users';
  links: LinkItem[];
}

interface InternalLinkingProps {
  title?: string;
  groups: LinkGroup[];
  variant?: 'sidebar' | 'footer' | 'inline';
}

const iconMap = {
  map: MapPin,
  tree: TreeDeciduous,
  leaf: Leaf,
  mountain: Mountain,
  users: Users,
};

export const InternalLinking = ({ 
  title = "Explore Mais",
  groups,
  variant = 'sidebar'
}: InternalLinkingProps) => {
  if (variant === 'inline') {
    return (
      <nav className="py-4" aria-label="Links relacionados">
        <div className="flex flex-wrap gap-2">
          {groups.flatMap(group => 
            group.links.map((link, index) => (
              <Link key={`${group.title}-${index}`} to={link.url}>
                <Badge 
                  variant="outline" 
                  className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                >
                  {link.label}
                  {link.count !== undefined && (
                    <span className="ml-1 text-xs opacity-70">({link.count})</span>
                  )}
                </Badge>
              </Link>
            ))
          )}
        </div>
      </nav>
    );
  }

  if (variant === 'footer') {
    return (
      <nav className="py-8 border-t" aria-label="Links de navegação">
        <h3 className="text-lg font-semibold mb-6">{title}</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {groups.map((group, groupIndex) => {
            const Icon = group.icon ? iconMap[group.icon] : TreeDeciduous;
            return (
              <div key={groupIndex}>
                <div className="flex items-center gap-2 mb-4">
                  <Icon className="h-4 w-4 text-primary" />
                  <h4 className="font-medium">{group.title}</h4>
                </div>
                <ul className="space-y-2">
                  {group.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        to={link.url}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                        {link.count !== undefined && (
                          <span className="text-xs ml-1">({link.count})</span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </nav>
    );
  }

  // Sidebar variant (default)
  return (
    <aside className="bg-card rounded-lg border p-6" aria-label="Navegação lateral">
      <h3 className="text-lg font-semibold mb-6">{title}</h3>
      <div className="space-y-6">
        {groups.map((group, groupIndex) => {
          const Icon = group.icon ? iconMap[group.icon] : TreeDeciduous;
          return (
            <div key={groupIndex}>
              <div className="flex items-center gap-2 mb-3">
                <Icon className="h-4 w-4 text-primary" />
                <h4 className="font-medium text-sm">{group.title}</h4>
              </div>
              <ul className="space-y-2 pl-6">
                {group.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.url}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-between"
                    >
                      <span>{link.label}</span>
                      {link.count !== undefined && (
                        <Badge variant="secondary" className="text-xs">
                          {link.count}
                        </Badge>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
