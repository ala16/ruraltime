import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/seo/SEOHead";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { ModernNavigation } from "@/components/ui/modern-navigation";
import { Footer } from "@/components/sections/Footer";
import { ShareButtons } from "@/components/ShareButtons";
import { 
  ArrowLeft, 
  Sunrise,
  TreeDeciduous, 
  Camera,
  Heart,
  Mountain,
  Sparkles,
  MapPin,
  ChevronRight,
  Bird,
  Tent
} from "lucide-react";

const ExperienciasCampo = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const pageTitle = "Experiências no Campo: Vivências Rurais Autênticas no Brasil";
  const pageDescription = "Viva experiências únicas no campo brasileiro: trilhas, nascer do sol, observação de aves, acampamentos rurais, piqueniques e conexão com a natureza. Guia completo.";
  const pageUrl = "/experiencia-no-campo";

  const faqs = [
    {
      question: "O que são experiências no campo?",
      answer: "São vivências turísticas que proporcionam contato direto com a natureza e a cultura rural, incluindo trilhas, observação de fauna, atividades ao ar livre, gastronomia típica e momentos de desconexão do mundo digital."
    },
    {
      question: "Quais experiências são ideais para iniciantes?",
      answer: "Para quem está começando, recomendamos trilhas leves, piqueniques rurais, observação do pôr do sol e visitas a fazendas com atividades guiadas. São experiências seguras e acessíveis."
    },
    {
      question: "Posso levar crianças para experiências no campo?",
      answer: "Sim! Muitas experiências são perfeitas para famílias. Atividades como alimentar animais, colher frutas e trilhas curtas são ótimas para crianças de todas as idades."
    },
    {
      question: "O que devo levar para uma experiência rural?",
      answer: "Recomendamos roupas confortáveis, calçados fechados, protetor solar, repelente, água, lanche leve e câmera fotográfica. Cada propriedade pode ter recomendações específicas."
    }
  ];

  const experiences = [
    { icon: Sunrise, title: "Nascer do Sol", desc: "Contemple o amanhecer no campo" },
    { icon: Bird, title: "Observação de Aves", desc: "Descubra a fauna silvestre" },
    { icon: Mountain, title: "Trilhas Ecológicas", desc: "Explore a natureza a pé" },
    { icon: Tent, title: "Camping Rural", desc: "Durma sob as estrelas" },
    { icon: Camera, title: "Fotografia Rural", desc: "Registre paisagens únicas" },
    { icon: Heart, title: "Retiros de Bem-estar", desc: "Relaxe longe da cidade" },
  ];

  const relatedPages = [
    { title: "Turismo Rural", url: "/turismo-rural", desc: "Todas as opções de turismo no campo" },
    { title: "Agroturismo", url: "/agroturismo", desc: "Experiências em fazendas produtivas" },
    { title: "Turismo de Fazenda", url: "/turismo-de-fazenda", desc: "Hospedagem em fazendas" },
    { title: "Turismo Sustentável", url: "/turismo-rural-sustentavel", desc: "Viagens eco-conscientes" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        keywords="experiências no campo, vivências rurais, trilhas ecológicas, observação de aves, camping rural, turismo de aventura rural, ecoturismo, natureza brasil"
        canonicalUrl={pageUrl}
        ogType="article"
      />
      
      <SchemaMarkup
        type="webPage"
        name={pageTitle}
        description={pageDescription}
        url={pageUrl}
      />
      
      <SchemaMarkup
        type="breadcrumb"
        items={[
          { name: 'Rural Time', url: '/' },
          { name: 'Turismo Rural', url: '/turismo-rural' },
          { name: 'Experiências no Campo', url: '/experiencia-no-campo' }
        ]}
      />
      
      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        })
      }} />
      
      <ModernNavigation onSectionClick={scrollToSection} />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-sky-500/10 via-emerald-500/5 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <Button variant="ghost" onClick={() => navigate('/turismo-rural')} className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Turismo Rural
            </Button>
            
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <Link to="/" className="hover:text-primary transition-colors">Rural Time</Link>
              <ChevronRight className="h-4 w-4" />
              <Link to="/turismo-rural" className="hover:text-primary transition-colors">Turismo Rural</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary">Experiências no Campo</span>
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="h-10 w-10 text-sky-600" />
              <h1 className="text-3xl md:text-5xl font-bold">
                Experiências no <span className="text-sky-600">Campo</span>
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-6">
              Descubra vivências únicas que conectam você à natureza e à essência do campo brasileiro. 
              Trilhas, observação de fauna, acampamentos, retiros e momentos inesquecíveis 
              longe da rotina urbana.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              <Badge variant="outline" className="text-sm py-2 px-4">
                <Mountain className="h-4 w-4 mr-2" />
                Aventura
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4">
                <Bird className="h-4 w-4 mr-2" />
                Natureza
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4">
                <Heart className="h-4 w-4 mr-2" />
                Bem-estar
              </Badge>
            </div>
            
            <ShareButtons url={pageUrl} title={pageTitle} description={pageDescription} />
          </div>
        </section>
        
        {/* Conteúdo Principal */}
        <section className="py-12 bg-card">
          <div className="container mx-auto px-4">
            <div className="prose prose-lg max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">O Poder das Experiências Rurais</h2>
              <p className="text-muted-foreground leading-relaxed">
                As <strong>experiências no campo</strong> vão além do turismo tradicional. São momentos 
                de reconexão com a natureza, consigo mesmo e com as raízes culturais do Brasil. 
                Estudos comprovam que o contato com ambientes rurais reduz o estresse, melhora a saúde 
                mental e proporciona bem-estar duradouro.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                No Brasil, a diversidade de biomas e paisagens oferece uma infinidade de possibilidades: 
                das serras gaúchas ao cerrado goiano, da mata atlântica paulista aos pampas, cada região 
                oferece experiências únicas e memoráveis.
              </p>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">Tipos de Experiências no Campo</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Trilhas ecológicas:</strong> Caminhadas por matas, montanhas e paisagens naturais preservadas</li>
                <li><strong>Observação de fauna:</strong> Avistamento de aves, animais silvestres e vida selvagem</li>
                <li><strong>Camping e glamping:</strong> Noites sob as estrelas em ambiente rural seguro</li>
                <li><strong>Piqueniques rurais:</strong> Refeições ao ar livre com produtos locais e artesanais</li>
                <li><strong>Retiros de bem-estar:</strong> Yoga, meditação e práticas de relaxamento na natureza</li>
                <li><strong>Fotografia de paisagens:</strong> Tours guiados para registrar a beleza do campo</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">Benefícios para Corpo e Mente</h3>
              <p className="text-muted-foreground leading-relaxed">
                Pesquisas científicas demonstram que experiências na natureza proporcionam:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Redução dos níveis de cortisol (hormônio do estresse)</li>
                <li>Melhora na qualidade do sono</li>
                <li>Aumento da criatividade e capacidade de concentração</li>
                <li>Fortalecimento do sistema imunológico</li>
                <li>Sensação de bem-estar e felicidade</li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Experiências Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Tipos de Experiências
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experiences.map((exp, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <exp.icon className="h-12 w-12 mx-auto text-sky-600 mb-4" />
                    <CardTitle className="text-lg">{exp.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{exp.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button size="lg" onClick={() => navigate('/turismo-rural')}>
                <MapPin className="mr-2 h-5 w-5" />
                Encontrar Experiências
              </Button>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Perguntas Frequentes
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Páginas Relacionadas */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Explore Mais
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedPages.map((page, index) => (
                <Link key={index} to={page.url}>
                  <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary h-full">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <TreeDeciduous className="h-5 w-5 text-primary" />
                        {page.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{page.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-sky-500/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ofereça Experiências Inesquecíveis
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Sua propriedade rural pode proporcionar momentos únicos para visitantes. 
              Cadastre-se e faça parte da maior rede de turismo rural do Brasil.
            </p>
            <Button size="lg" onClick={() => navigate('/cadastro-propriedade')}>
              Cadastrar Minha Propriedade
            </Button>
          </div>
        </section>
      </main>
      
      <Footer onSectionClick={scrollToSection} />
    </div>
  );
};

export default ExperienciasCampo;
