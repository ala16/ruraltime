import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, Leaf, Palette } from 'lucide-react';
import heroImage from '@/assets/hero-banner.jpg';

interface ModernHeroProps {
  onSectionClick: (sectionId: string) => void;
}

export const ModernHero: React.FC<ModernHeroProps> = ({ onSectionClick }) => {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative min-h-[35vh] flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Paisagem rural brasileira" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      <div className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-2xl space-y-3 animate-fade-in">
            <Badge className="bg-rural-secondary/20 text-rural-secondary border-rural-secondary/30 backdrop-blur-sm px-3 py-1 text-xs font-medium">
              <Leaf className="w-3 h-3 mr-1" />
              Turismo Rural Digital
            </Badge>

            <h1 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
              Conecte-se ao{' '}
              <span className="bg-gradient-to-r from-rural-secondary to-rural-accent bg-clip-text text-transparent">
                campo brasileiro
              </span>
            </h1>

            <p className="text-sm text-white/85 max-w-lg">
              Encontre propriedades rurais, experiências autênticas e artesanato em todo o Brasil.
            </p>

            <div className="flex gap-3 pt-1">
              <Button
                size="sm"
                onClick={() => onSectionClick('atrativos')}
                className="bg-rural-secondary hover:bg-rural-secondary/90 text-rural-secondary-foreground font-semibold shadow-glow group"
              >
                Explorar
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSectionClick('artesanatos')}
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                <Palette className="mr-1 h-4 w-4" />
                Artesanato
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
