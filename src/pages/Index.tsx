import { useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Hero } from "@/components/sections/Hero";
import { QuemSomos } from "@/components/sections/QuemSomos";
import { Oferecemos } from "@/components/sections/Oferecemos";
import { Beneficios } from "@/components/sections/Beneficios";
import { ComoFunciona } from "@/components/sections/ComoFunciona";
import { ImpactoCNA } from "@/components/sections/ImpactoCNA";
import { Depoimentos } from "@/components/sections/Depoimentos";
import { SejaParceiro } from "@/components/sections/SejaParcerio";
import { Contato } from "@/components/sections/Contato";
import { Footer } from "@/components/sections/Footer";

const Index = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = "Rural Time - Turismo Rural Digital na Região Bragantina";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Conectamos turistas a pequenas propriedades rurais da Região Bragantina. Experiências autênticas no campo e transformação digital no agro. Projeto CNA Jovem.');
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation onSectionClick={scrollToSection} />
      
      <main>
        <Hero onSectionClick={scrollToSection} />
        <QuemSomos />
        <Oferecemos />
        <Beneficios />
        <ComoFunciona />
        <ImpactoCNA />
        <Depoimentos />
        <SejaParceiro />
        <Contato />
      </main>
      
      <Footer onSectionClick={scrollToSection} />
    </div>
  );
};

export default Index;
