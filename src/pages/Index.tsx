import { useEffect } from "react";
import { ModernNavigation } from "@/components/ui/modern-navigation";
import { ModernHero } from "@/components/sections/ModernHero";
import { QuemSomos } from "@/components/sections/QuemSomos";
import { Oferecemos } from "@/components/sections/Oferecemos";
import { Atrativos } from "@/components/sections/Atrativos";
import { Beneficios } from "@/components/sections/Beneficios";
import { ComoFunciona } from "@/components/sections/ComoFunciona";
import { ImpactoCNA } from "@/components/sections/ImpactoCNA";
import { Depoimentos } from "@/components/sections/Depoimentos";
import { SejaParceiro } from "@/components/sections/SejaParcerio";
import { Contato } from "@/components/sections/Contato";
import { Footer } from "@/components/sections/Footer";
import { Apoiadores } from "@/components/sections/Apoiadores";
import { Artesanatos } from "@/components/sections/Artesanatos";
import { ModernBookingBar } from "@/components/sections/ModernBookingBar";

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
    document.title = "Rural Time - Turismo Rural Digital no Brasil";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Conectamos turistas a pequenas propriedades rurais em todo o Brasil. Experiências autênticas no campo e transformação digital no agro. Projeto CNA Jovem.');
    }
  }, []);

  return (
    <div className="min-h-screen">
      <ModernNavigation onSectionClick={scrollToSection} />
      
      <main>
        <ModernHero onSectionClick={scrollToSection} />
        <ModernBookingBar />
        <Atrativos />
        <Artesanatos />
        <Oferecemos />
        <Beneficios />
        <ComoFunciona />
        <ImpactoCNA />
        <Depoimentos />
        <SejaParceiro />
        <Contato />
        <QuemSomos />
        <Apoiadores />
      </main>
      
      <Footer onSectionClick={scrollToSection} />
    </div>
  );
};

export default Index;
