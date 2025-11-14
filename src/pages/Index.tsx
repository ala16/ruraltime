import { useEffect } from "react";
import { Helmet } from 'react-helmet-async';
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
import { BrazilMap } from "@/components/sections/BrazilMap";
import { IncluiCampo } from "@/components/sections/IncluiCampo";
import { BlogCarousel } from "@/components/sections/BlogCarousel";

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

  return <div className="min-h-screen">
      <Helmet>
        <title>Rural Time - Turismo Rural Digital no Brasil | Experiências Autênticas no Campo</title>
        <meta name="description" content="Conectamos turistas a pequenas propriedades rurais em todo o Brasil. Descubra experiências autênticas no campo, hospedagem rural, artesanato local e transformação digital no agro. Projeto CNA Jovem." />
        <meta name="keywords" content="turismo rural, agroturismo, turismo no campo, hospedagem rural, fazendas para visitar, experiências rurais, artesanato rural, CNA Jovem, agronegócio, rural time, turismo rural brasil" />
        <link rel="canonical" href={window.location.origin} />
        
        {/* Open Graph / Facebook / WhatsApp */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.origin} />
        <meta property="og:title" content="Rural Time - Turismo Rural Digital no Brasil" />
        <meta property="og:description" content="🌾 Conectamos turistas a pequenas propriedades rurais. Experiências autênticas no campo brasileiro!" />
        <meta property="og:site_name" content="Rural Time" />
        <meta property="og:locale" content="pt_BR" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={window.location.origin} />
        <meta property="twitter:title" content="Rural Time - Turismo Rural Digital no Brasil" />
        <meta property="twitter:description" content="Conectamos turistas a pequenas propriedades rurais. Experiências autênticas no campo!" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Rural Time",
            "description": "Plataforma de turismo rural digital conectando turistas a propriedades rurais brasileiras",
            "url": window.location.origin,
            "logo": `${window.location.origin}/lovable-uploads/rural-time-logo.png`,
            "sameAs": [
              "https://instagram.com/ruraltime"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "availableLanguage": "Portuguese"
            }
          })}
        </script>
      </Helmet>
      
      <ModernNavigation onSectionClick={scrollToSection} />
      
      <main>
        <ModernHero onSectionClick={scrollToSection} />
        <ModernBookingBar />
        <BrazilMap />
        <Atrativos />
        <Artesanatos />
        <Oferecemos />
        
        <ComoFunciona />
        <ImpactoCNA />
        <BlogCarousel />
        <Depoimentos />
        <SejaParceiro />
        <Contato />
        <QuemSomos />
        <Apoiadores />
        <IncluiCampo />
      </main>
      
      <Footer onSectionClick={scrollToSection} />
    </div>;
};
export default Index;