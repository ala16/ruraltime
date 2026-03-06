import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { useLanguage } from "@/contexts/LanguageContext";

export function Depoimentos() {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 });
  const { t } = useLanguage();

  const depoimentos = [
    { texto: t('testimonials.1.text'), autor: "Maria Silva", tipo: t('testimonials.1.type'), local: "Sítio Flores do Campo - Bragança Paulista" },
    { texto: t('testimonials.2.text'), autor: "Carlos Mendes", tipo: t('testimonials.2.type'), local: "São Paulo - SP" },
    { texto: t('testimonials.3.text'), autor: "João Santos", tipo: t('testimonials.3.type'), local: "Fazenda São José - Atibaia" },
  ];

  return (
    <section id="depoimentos" className="py-8 bg-background" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-8 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl font-bold text-primary mb-2">{t('testimonials.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t('testimonials.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {depoimentos.map((depoimento, index) => (
            <Card key={index} className={`hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${index * 0.2}s` }}>
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-primary mb-4 opacity-50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
                <blockquote className="text-foreground leading-relaxed mb-6">"{depoimento.texto}"</blockquote>
                <div className="border-t pt-4">
                  <p className="font-semibold text-primary">{depoimento.autor}</p>
                  <p className="text-sm text-muted-foreground">{depoimento.tipo}</p>
                  <p className="text-xs text-muted-foreground mt-1">{depoimento.local}</p>
                </div>
              </CardContent>
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-primary opacity-10 rounded-bl-full"></div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-6">
          <p className="text-muted-foreground mb-4">{t('testimonials.cta')}</p>
          <a href="https://forms.gle/mQMzuVsidJ1gTgZt9" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
            {t('testimonials.send')}
          </a>
        </div>
      </div>
    </section>
  );
}
