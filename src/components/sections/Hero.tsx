import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.jpg";

interface HeroProps {
  onSectionClick: (section: string) => void;
}

export function Hero({ onSectionClick }: HeroProps) {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Conectando o Campo <br />
          <span className="text-rural-green-light">com a Cidade</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto">
          O Rural Time conecta turistas a pequenas propriedades rurais da Região Bragantina, 
          promovendo experiências autênticas no campo e impulsionando a transformação digital no agro.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => onSectionClick("oferecemos")}
            className="text-lg px-8 py-4"
          >
            Descubra Experiências
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => onSectionClick("parceiros")}
            className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary"
          >
            Cadastre sua Propriedade
          </Button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}