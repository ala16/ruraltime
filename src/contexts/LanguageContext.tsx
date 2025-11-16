import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  pt: {
    // Navigation
    'nav.home': 'Início',
    'nav.attractions': 'Atrativos',
    'nav.crafts': 'Artesanato',
    'nav.offer': 'O que Oferecemos',
    'nav.howItWorks': 'Como Funciona',
    'nav.blog': 'Blog',
    'nav.contact': 'Contato',
    
    // Hero
    'hero.badge': 'Turismo Rural e Artesanato Brasileiro',
    'hero.title': 'Descubra o',
    'hero.titleHighlight': 'Campo Autêntico',
    'hero.subtitle': 'Conectamos você às melhores experiências rurais e ao artesanato autêntico do Brasil. Viva momentos inesquecíveis no campo.',
    'hero.ctaExplore': 'Explorar Experiências',
    'hero.ctaCrafts': 'Ver Artesanato',
    'hero.feature1.title': 'Turismo Rural',
    'hero.feature1.desc': 'Experiências autênticas no campo',
    'hero.feature2.title': 'Artesanato Local',
    'hero.feature2.desc': 'Peças únicas da região',
    'hero.feature3.title': 'Conexão Humana',
    'hero.feature3.desc': 'Conhecendo produtores locais',
    'hero.location': 'Brasil Rural',
    'hero.locationDesc': 'Um país rico em tradições, cultura e belezas naturais. Conecte-se com a essência do campo brasileiro através de experiências únicas.',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.attractions': 'Attractions',
    'nav.crafts': 'Handicrafts',
    'nav.offer': 'What We Offer',
    'nav.howItWorks': 'How It Works',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.badge': 'Rural Tourism and Brazilian Handicrafts',
    'hero.title': 'Discover the',
    'hero.titleHighlight': 'Authentic Countryside',
    'hero.subtitle': 'We connect you to the best rural experiences and authentic handicrafts from Brazil. Live unforgettable moments in the countryside.',
    'hero.ctaExplore': 'Explore Experiences',
    'hero.ctaCrafts': 'View Handicrafts',
    'hero.feature1.title': 'Rural Tourism',
    'hero.feature1.desc': 'Authentic countryside experiences',
    'hero.feature2.title': 'Local Handicrafts',
    'hero.feature2.desc': 'Unique regional pieces',
    'hero.feature3.title': 'Human Connection',
    'hero.feature3.desc': 'Meeting local producers',
    'hero.location': 'Rural Brazil',
    'hero.locationDesc': 'A country rich in traditions, culture and natural beauty. Connect with the essence of the Brazilian countryside through unique experiences.',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.attractions': 'Atractivos',
    'nav.crafts': 'Artesanía',
    'nav.offer': 'Qué Ofrecemos',
    'nav.howItWorks': 'Cómo Funciona',
    'nav.blog': 'Blog',
    'nav.contact': 'Contacto',
    
    // Hero
    'hero.badge': 'Turismo Rural y Artesanía Brasileña',
    'hero.title': 'Descubre el',
    'hero.titleHighlight': 'Campo Auténtico',
    'hero.subtitle': 'Conectamos contigo a las mejores experiencias rurales y a la artesanía auténtica de Brasil. Vive momentos inolvidables en el campo.',
    'hero.ctaExplore': 'Explorar Experiencias',
    'hero.ctaCrafts': 'Ver Artesanía',
    'hero.feature1.title': 'Turismo Rural',
    'hero.feature1.desc': 'Experiencias auténticas en el campo',
    'hero.feature2.title': 'Artesanía Local',
    'hero.feature2.desc': 'Piezas únicas de la región',
    'hero.feature3.title': 'Conexión Humana',
    'hero.feature3.desc': 'Conociendo productores locales',
    'hero.location': 'Brasil Rural',
    'hero.locationDesc': 'Un país rico en tradiciones, cultura y bellezas naturales. Conéctate con la esencia del campo brasileño a través de experiencias únicas.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['pt']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
