import { useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { ModernNavigation } from "@/components/ui/modern-navigation";
import { ModernHero } from "@/components/sections/ModernHero";
import { QuemSomos } from "@/components/sections/QuemSomos";
import { Atrativos } from "@/components/sections/Atrativos";
import { PlataformaResumo } from "@/components/sections/PlataformaResumo";
import { Depoimentos } from "@/components/sections/Depoimentos";
import { SejaParceiro } from "@/components/sections/SejaParcerio";
import { Contato } from "@/components/sections/Contato";
import { Footer } from "@/components/sections/Footer";
import { Apoiadores } from "@/components/sections/Apoiadores";
import { Artesanatos } from "@/components/sections/Artesanatos";
import { ModernBookingBar } from "@/components/sections/ModernBookingBar";
import { BrazilMap } from "@/components/sections/BrazilMap";
import { IncluiCampo } from "@/components/sections/IncluiCampo";
import { BlogCarousel } from "@/components/sections/BlogCarousel";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { AIRecommendationChat } from "@/components/sections/AIRecommendationChat";


const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  return <div className="min-h-screen">
      <Helmet>
        <title>Rural Time - Turismo Rural Digital no Brasil | Experiências Autênticas no Campo</title>
        <meta name="description" content="O maior portal de turismo rural do Brasil. Conectamos turistas a pequenas propriedades rurais, fazendas, sítios e chácaras em todo o país. Descubra experiências autênticas no campo." />
        <meta name="keywords" content="turismo rural, agroturismo, turismo no campo, hospedagem rural, fazendas para visitar, experiências rurais, artesanato rural, turismo rural brasil, fazendas turísticas, ecoturismo" />
        <link rel="canonical" href="https://ruraltime.com.br" />
        
        {/* Open Graph / Facebook / WhatsApp */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ruraltime.com.br" />
        <meta property="og:title" content="Rural Time - O Maior Portal de Turismo Rural do Brasil" />
        <meta property="og:description" content="Conectamos turistas a pequenas propriedades rurais. Descubra fazendas, sítios e experiências autênticas no campo brasileiro!" />
        <meta property="og:image" content="https://ruraltime.com.br/lovable-uploads/rural-time-logo-new.png" />
        <meta property="og:site_name" content="Rural Time" />
        <meta property="og:locale" content="pt_BR" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://ruraltime.com.br" />
        <meta property="twitter:title" content="Rural Time - O Maior Portal de Turismo Rural do Brasil" />
        <meta property="twitter:description" content="Conectamos turistas a pequenas propriedades rurais. Experiências autênticas no campo!" />
        <meta property="twitter:image" content="https://ruraltime.com.br/lovable-uploads/rural-time-logo-new.png" />
      </Helmet>
      
      {/* Schema Markups for Entity SEO */}
      <SchemaMarkup type="organization" />
      <SchemaMarkup type="webSite" />
      
      <ModernNavigation onSectionClick={scrollToSection} />
      
      <main>
        <ModernHero onSectionClick={scrollToSection} />
        <ModernBookingBar />
        <Atrativos />
        <AIRecommendationChat />
        <BrazilMap />
        <Artesanatos />
        <PlataformaResumo />
        <BlogCarousel />
        <Depoimentos />
        
        
        
        
        <QuemSomos />
        <Apoiadores />
      </main>
      
      <Footer onSectionClick={scrollToSection} />
    </div>;
};
export default Index;