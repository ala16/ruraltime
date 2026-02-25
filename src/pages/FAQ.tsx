import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { ModernNavigation } from "@/components/ui/modern-navigation";
import { Footer } from "@/components/sections/Footer";
import { FAQSection } from "@/components/seo/FAQSection";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { useNavigate } from "react-router-dom";

const faqs = [
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

const FAQ = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (sectionId: string) => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Perguntas Frequentes - Rural Time | Turismo Rural no Brasil</title>
        <meta name="description" content="Tire suas dúvidas sobre turismo rural no Brasil. Saiba como encontrar fazendas, cadastrar propriedades e aproveitar experiências autênticas no campo." />
        <link rel="canonical" href="https://ruraltime.com.br/faq" />
      </Helmet>

      <SchemaMarkup type="organization" />

      <ModernNavigation onSectionClick={scrollToSection} />

      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <FAQSection
            title="Perguntas Frequentes sobre Turismo Rural"
            faqs={faqs}
          />
        </div>
      </main>

      <Footer onSectionClick={scrollToSection} />
    </div>
  );
};

export default FAQ;
