import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  ArrowRight, 
  Leaf, 
  Users, 
  Heart,
  MapPin,
  Star,
  Palette,
  Camera,
  TreePine
} from 'lucide-react';
import heroImage from '@/assets/hero-banner.jpg';

interface ModernHeroProps {
  onSectionClick: (sectionId: string) => void;
}

export const ModernHero: React.FC<ModernHeroProps> = ({ onSectionClick }) => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: TreePine,
      title: t('hero.feature1.title'),
      description: t('hero.feature1.desc')
    },
    {
      icon: Palette,
      title: t('hero.feature2.title'),
      description: t('hero.feature2.desc')
    },
    {
      icon: Users,
      title: t('hero.feature3.title'),
      description: t('hero.feature3.desc')
    }
  ];


  return (
    <section id="hero" className="relative min-h-[50vh] flex items-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Paisagem rural brasileira" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-2 gap-6 items-center">
            
            {/* Left Column - Text Content */}
            <div className="space-y-3 animate-fade-in">
              {/* Hero Badge */}
              <Badge className="bg-rural-secondary/20 text-rural-secondary border-rural-secondary/30 backdrop-blur-sm px-3 py-1 text-xs font-medium">
                <Leaf className="w-4 h-4 mr-2" />
                {t('hero.badge')}
              </Badge>

              {/* Main Heading */}
              <div className="space-y-2">
                <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                  {t('hero.title')}
                  <span className="block bg-gradient-to-r from-rural-secondary to-rural-accent bg-clip-text text-transparent">
                    {t('hero.titleHighlight')}
                  </span>
                </h1>
                <p className="text-base text-white/90 leading-relaxed max-w-xl">
                  {t('hero.subtitle')}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  size="default"
                  onClick={() => onSectionClick('atrativos')}
                  className="btn-modern bg-rural-secondary hover:bg-rural-secondary/90 text-rural-secondary-foreground px-6 py-2 font-semibold shadow-glow group"
                >
                  {t('hero.ctaExplore')}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline"
                  size="default"
                  onClick={() => onSectionClick('artesanatos')}
                  className="glass border-white/30 text-white hover:bg-white/10 px-6 py-2 font-semibold backdrop-blur-sm"
                >
                  <Palette className="mr-2 h-4 w-4" />
                  {t('hero.ctaCrafts')}
                </Button>
              </div>

            </div>

            {/* Right Column - Feature Cards */}
            <div className="space-y-2 animate-slide-up">
              {features.map((feature, index) => (
                <Card key={index} className="bg-black/20 backdrop-blur-md border-white/20 hover-lift">
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-primary rounded-lg">
                        <feature.icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-white">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-white/80">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Location Card */}
              <Card className="bg-black/30 backdrop-blur-md border-white/20 hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <MapPin className="w-5 h-5 text-rural-secondary" />
                    <h3 className="text-lg font-semibold text-white">
                      {t('hero.location')}
                    </h3>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-rural-secondary text-rural-secondary" />
                      ))}
                    </div>
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed">
                    {t('hero.locationDesc')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 right-10 animate-float">
        <div className="w-20 h-20 bg-rural-secondary/20 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center">
          <Heart className="w-8 h-8 text-white" />
        </div>
      </div>
      
      <div className="absolute bottom-32 left-10 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-16 h-16 bg-rural-accent/20 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center">
          <Camera className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};