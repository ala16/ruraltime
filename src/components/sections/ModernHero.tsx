import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, MapPin } from 'lucide-react';
import heroImage from '@/assets/hero-banner.jpg';

interface ModernHeroProps {
  onSectionClick: (sectionId: string) => void;
}

export const ModernHero: React.FC<ModernHeroProps> = ({ onSectionClick }) => {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative min-h-[320px] md:min-h-[380px] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Paisagem rural brasileira" className="w-full h-full object-cover" width={1920} height={1080} fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 w-full pb-10 pt-28 md:pt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white/90 rounded-full px-4 py-1.5 text-xs font-medium tracking-widest uppercase">
              <MapPin className="w-3.5 h-3.5" />
              {t('hero.badge')}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              {t('hero.title')}{' '}
              <span className="text-rural-secondary">{t('hero.titleHighlight')}</span>
            </h1>

            <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-lg">
              {t('hero.subtitle')}
            </p>

            <div className="pt-2">
              <Button
                size="lg"
                onClick={() => onSectionClick('atrativos')}
                className="bg-rural-secondary hover:bg-rural-secondary/90 text-rural-secondary-foreground font-semibold shadow-xl group"
                aria-label={t('hero.ctaExplore')}
              >
                {t('hero.ctaExplore')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
