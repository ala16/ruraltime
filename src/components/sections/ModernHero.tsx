import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, MapPin, Star } from 'lucide-react';
import heroImage from '@/assets/hero-banner.jpg';

interface ModernHeroProps {
  onSectionClick: (sectionId: string) => void;
}

export const ModernHero: React.FC<ModernHeroProps> = ({ onSectionClick }) => {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative h-[22vh] min-h-[180px] max-h-[220px] flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Paisagem rural brasileira" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-3">
          <div className="max-w-xl space-y-2 animate-fade-in scale-[0.8] md:scale-[0.9] origin-left">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/20 text-white/90 rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase">
                <MapPin className="w-3 h-3" />
                Turismo Rural
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-[1.15] tracking-tight">
              Turismo Rural e Experiências{' '}
              <span className="text-rural-secondary">Autênticas no Brasil</span>
            </h1>

            <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-md">
              Descubra fazendas para visitar, sítios, experiências no campo e artesanato regional — tudo em um só lugar.
            </p>

            <div className="pt-1">
              <Button
                size="default"
                onClick={() => onSectionClick('atrativos')}
                className="bg-rural-secondary hover:bg-rural-secondary/90 text-rural-secondary-foreground font-semibold shadow-xl group text-sm px-5"
                aria-label="Explorar atrativos de turismo rural no Brasil"
              >
                Explorar atrativos
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
