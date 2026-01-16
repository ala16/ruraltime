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
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { FAQSection } from "@/components/seo/FAQSection";
import { AIRecommendationChat } from "@/components/sections/AIRecommendationChat";

const homeFAQs = [
  {
    question: "O que é turismo rural?",
    answer: "Turismo rural é uma modalidade de turismo que permite ao visitante experienciar a vida no campo, conhecer propriedades rurais, participar de atividades agrícolas, degustar produtos artesanais e conectar-se com a natureza. É uma forma sustentável de turismo que beneficia comunidades rurais."
  },
  {
    question: "Como encontrar fazendas para visitar no Brasil?",
    answer: "Na Rural Time você encontra centenas de propriedades rurais cadastradas em todo o Brasil. Use nossa busca por estado ou cidade para encontrar fazendas, sítios e chácaras que oferecem experiências de turismo rural, hospedagem e atividades no campo."
  },
  {
    question: "Quais atividades posso fazer em uma propriedade rural?",
    answer: "As atividades variam conforme a propriedade, mas geralmente incluem: trilhas ecológicas, cavalgadas, ordenha de vacas, colheita de frutas, degustação de produtos artesanais como queijos e vinhos, pesca, observação de aves, e vivências culturais do campo."
  },
  {
    question: "O turismo rural é adequado para famílias com crianças?",
    answer: "Sim! O turismo rural é excelente para famílias. As crianças podem ter contato com animais, aprender sobre a produção de alimentos, brincar ao ar livre e conhecer a vida no campo. Muitas propriedades oferecem atividades específicas para crianças."
  },
  {
    question: "Como cadastrar minha propriedade rural na Rural Time?",
    answer: "Para cadastrar sua fazenda, sítio ou chácara, acesse nossa página de cadastro de propriedades. Preencha as informações sobre sua propriedade, adicione fotos e descreva as experiências oferecidas. Nossa equipe analisará o cadastro e entrará em contato."
  }
];

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
        <BrazilMap />
        <Atrativos />
        <AIRecommendationChat />
        <Artesanatos />
        <Oferecemos />
        
        <ComoFunciona />
        <ImpactoCNA />
        <BlogCarousel />
        <Depoimentos />
        
        {/* FAQ Section for SGE and Featured Snippets */}
        <div className="container mx-auto px-4">
          <FAQSection 
            title="Perguntas Frequentes sobre Turismo Rural"
            faqs={homeFAQs}
          />
        </div>
        
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