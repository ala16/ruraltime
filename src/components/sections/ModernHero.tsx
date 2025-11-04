import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  const features = [
    {
      icon: TreePine,
      title: 'Turismo Rural',
      description: 'Experiências autênticas no campo'
    },
    {
      icon: Palette,
      title: 'Artesanato Local',
      description: 'Peças únicas da região'
    },
    {
      icon: Users,
      title: 'Conexão Humana',
      description: 'Conhecendo produtores locais'
    }
  ];


  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Text Content */}
            <div className="space-y-8 animate-fade-in">
              {/* Hero Badge */}
              <Badge className="bg-rural-secondary/20 text-rural-secondary border-rural-secondary/30 backdrop-blur-sm px-4 py-2 text-sm font-medium">
                <Leaf className="w-4 h-4 mr-2" />
                Turismo Rural e Artesanato Brasileiro
              </Badge>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  Descubra o
                  <span className="block bg-gradient-to-r from-rural-secondary to-rural-accent bg-clip-text text-transparent">
                    Campo Autêntico
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-xl">
                  Conectamos você às melhores experiências rurais e ao artesanato autêntico do Brasil. 
                  Viva momentos inesquecíveis no campo.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  onClick={() => onSectionClick('atrativos')}
                  className="btn-modern bg-rural-secondary hover:bg-rural-secondary/90 text-rural-secondary-foreground px-8 py-4 text-lg font-semibold shadow-glow group"
                >
                  Explorar Experiências
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => onSectionClick('artesanatos')}
                  className="glass border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-sm"
                >
                  <Palette className="mr-2 h-5 w-5" />
                  Ver Artesanato
                </Button>
              </div>

            </div>

            {/* Right Column - Feature Cards */}
            <div className="space-y-6 animate-slide-up">
              {features.map((feature, index) => (
                <Card key={index} className="bg-black/20 backdrop-blur-md border-white/20 hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-gradient-primary rounded-xl">
                        <feature.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-white/90">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Location Card */}
              <Card className="bg-black/30 backdrop-blur-md border-white/20 hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <MapPin className="w-5 h-5 text-rural-secondary" />
                    <h3 className="text-lg font-semibold text-white">
                      Brasil Rural
                    </h3>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-rural-secondary text-rural-secondary" />
                      ))}
                    </div>
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Um país rico em tradições, cultura e belezas naturais. 
                    Conecte-se com a essência do campo brasileiro através de experiências únicas.
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