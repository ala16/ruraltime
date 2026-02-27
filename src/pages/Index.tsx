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
import { BookingStats } from "@/components/sections/BookingStats";
import { IncluiCampo } from "@/components/sections/IncluiCampo";
import { BlogCarousel } from "@/components/sections/BlogCarousel";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { AIRecommendationChat } from "@/components/sections/AIRecommendationChat";
import { FAQSection } from "@/components/seo/FAQSection";

const homeFAQs = [
  {
    question: "O que é turismo rural?",
    answer: "Turismo rural é uma modalidade de turismo que acontece em áreas rurais, como fazendas, sítios e chácaras. Inclui experiências autênticas no campo, como ordenha, trilhas, gastronomia regional e contato com a natureza."
  },
  {
    question: "Como funciona a Rural Time?",
    answer: "A Rural Time conecta turistas a propriedades rurais em todo o Brasil. Você pode explorar atrativos, conhecer artesanatos locais e encontrar fazendas para visitar. Basta navegar pelo mapa ou usar nossa IA de recomendações."
  },
  {
    question: "Quais tipos de propriedades posso visitar?",
    answer: "Na Rural Time você encontra fazendas, sítios, chácaras, vinícolas, cachaçarias, pesqueiros e muito mais. Cada propriedade oferece experiências únicas como trilhas ecológicas, degustações, hospedagem rural e atividades educativas."
  },
  {
    question: "O turismo rural é indicado para famílias com crianças?",
    answer: "Sim! O turismo rural é uma excelente opção para famílias. As crianças podem ter contato com animais, aprender sobre a origem dos alimentos, brincar ao ar livre e viver experiências educativas que não encontram na cidade."
  },
  {
    question: "Como cadastrar minha propriedade rural na plataforma?",
    answer: "O cadastro é gratuito. Acesse a área 'Seja Parceiro', preencha os dados da sua propriedade, adicione fotos e descrições. Sua propriedade aparecerá no mapa e nos resultados de busca para turistas de todo o Brasil."
  }
];

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
        <title>Turismo Rural no Brasil | Experiências no Campo e Artesanato - Rural Time</title>
        <meta name="description" content="Descubra as melhores experiências de turismo rural no Brasil. Reserve fazendas, sítios e conheça o autêntico artesanato local na Rural Time." />
        <meta name="keywords" content="turismo rural, turismo rural no Brasil, experiências no campo, fazendas para visitar, agroturismo, artesanato rural, hospedagem rural, sítios turísticos, ecoturismo, turismo de fazenda" />
        <link rel="canonical" href="https://ruraltime.com.br" />
        
        {/* Open Graph / Facebook / WhatsApp */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ruraltime.com.br" />
        <meta property="og:title" content="Turismo Rural no Brasil | Fazendas, Experiências e Artesanato - Rural Time" />
        <meta property="og:description" content="Descubra as melhores experiências de turismo rural no Brasil. Reserve fazendas, sítios e conheça o autêntico artesanato local." />
        <meta property="og:image" content="https://ruraltime.com.br/lovable-uploads/rural-time-logo-new.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Rural Time" />
        <meta property="og:locale" content="pt_BR" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://ruraltime.com.br" />
        <meta name="twitter:title" content="Turismo Rural no Brasil | Fazendas e Experiências no Campo" />
        <meta name="twitter:description" content="Descubra as melhores experiências de turismo rural no Brasil. Reserve fazendas e sítios na Rural Time." />
        <meta name="twitter:image" content="https://ruraltime.com.br/lovable-uploads/rural-time-logo-new.png" />
        <meta name="twitter:site" content="@ruraltime" />
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
        <BookingStats />
        <PlataformaResumo />
        <Artesanatos />
        <BlogCarousel />
        <Depoimentos />
        
        
        
        
        <QuemSomos />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQSection 
            title="Perguntas Frequentes sobre Turismo Rural" 
            faqs={homeFAQs} 
          />
        </div>
        
        <Apoiadores />
      </main>
      
      <Footer onSectionClick={scrollToSection} />
    </div>;
};
export default Index;