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
  Home,
  TreeDeciduous, 
  Bed,
  UtensilsCrossed,
  Mountain,
  Sparkles,
  MapPin,
  ChevronRight,
  Star
} from "lucide-react";

const TurismoDeFazenda = () => {
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

  const pageTitle = "Turismo de Fazenda: Hospedagem Rural e Experiências Únicas";
  const pageDescription = "Descubra o turismo de fazenda no Brasil: hospede-se em fazendas históricas, desfrute de gastronomia típica, atividades ao ar livre e o conforto do campo. Guia completo.";
  const pageUrl = "/turismo-de-fazenda";

  const faqs = [
    {
      question: "O que é turismo de fazenda?",
      answer: "O turismo de fazenda é uma modalidade de turismo rural focada na hospedagem em propriedades rurais. O visitante se hospeda na fazenda e desfruta de atividades como cavalgadas, trilhas, pesca, gastronomia típica e contato com a natureza."
    },
    {
      question: "Qual a diferença entre hotel fazenda e turismo de fazenda?",
      answer: "O hotel fazenda é uma estrutura hoteleira instalada em ambiente rural. O turismo de fazenda acontece em fazendas reais, produtivas ou históricas, oferecendo experiência mais autêntica e contato direto com a rotina do campo."
    },
    {
      question: "As fazendas são adequadas para casamentos e eventos?",
      answer: "Sim, muitas fazendas oferecem estrutura para eventos como casamentos, festas e confraternizações corporativas. Os espaços rurais proporcionam cenários únicos e memoráveis."
    },
    {
      question: "Como escolher a fazenda ideal para se hospedar?",
      answer: "Considere localização, tipo de atividades oferecidas, infraestrutura, avaliações de outros hóspedes e se aceita pets ou crianças. A Rural Time ajuda a encontrar a fazenda perfeita para seu perfil."
    }
  ];

  const features = [
    { icon: Bed, title: "Hospedagem Aconchegante", desc: "Quartos rústicos com todo conforto" },
    { icon: UtensilsCrossed, title: "Gastronomia Rural", desc: "Comida caseira e produtos frescos" },
    { icon: Mountain, title: "Natureza Exuberante", desc: "Paisagens deslumbrantes e ar puro" },
    { icon: Sparkles, title: "Experiências Únicas", desc: "Cavalgadas, trilhas e muito mais" },
  ];

  const relatedPages = [
    { title: "Turismo Rural", url: "/turismo-rural", desc: "Todas as opções de turismo no campo" },
    { title: "Agroturismo", url: "/agroturismo", desc: "Experiências em fazendas produtivas" },
    { title: "Experiências no Campo", url: "/experiencia-no-campo", desc: "Vivências únicas na natureza" },
    { title: "Turismo Rural de Luxo", url: "/turismo-rural-de-luxo", desc: "Sofisticação no campo" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        keywords="turismo de fazenda, hospedagem rural, hotel fazenda, fazendas para hospedagem, turismo rural, pousada rural, fazenda turística, hospedagem no campo"
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
          { name: 'Turismo de Fazenda', url: '/turismo-de-fazenda' }
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
        <section className="relative bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-background py-16 md:py-24">
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
              <span className="text-primary">Turismo de Fazenda</span>
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <Home className="h-10 w-10 text-amber-600" />
              <h1 className="text-3xl md:text-5xl font-bold">
                Turismo de <span className="text-amber-600">Fazenda</span>
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-6">
              Hospede-se em fazendas históricas e produtivas do Brasil. Desfrute de paisagens 
              deslumbrantes, gastronomia típica, atividades ao ar livre e a autêntica 
              hospitalidade rural brasileira.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              <Badge variant="outline" className="text-sm py-2 px-4">
                <Bed className="h-4 w-4 mr-2" />
                Hospedagem
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4">
                <UtensilsCrossed className="h-4 w-4 mr-2" />
                Gastronomia
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4">
                <Star className="h-4 w-4 mr-2" />
                Experiências
              </Badge>
            </div>
            
            <ShareButtons url={pageUrl} title={pageTitle} description={pageDescription} />
          </div>
        </section>
        
        {/* Conteúdo Principal */}
        <section className="py-12 bg-card">
          <div className="container mx-auto px-4">
            <div className="prose prose-lg max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">O Encanto do Turismo de Fazenda</h2>
              <p className="text-muted-foreground leading-relaxed">
                O <strong>turismo de fazenda</strong> oferece uma experiência imersiva no campo brasileiro. 
                Diferente de hotéis convencionais, a hospedagem em fazendas proporciona contato 
                autêntico com a cultura rural, a natureza exuberante e as tradições do interior do Brasil.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Das <strong>fazendas históricas</strong> do Vale do Café no Rio de Janeiro às 
                propriedades produtivas do interior de São Paulo e Minas Gerais, o Brasil oferece 
                uma variedade impressionante de opções para quem busca descanso e reconexão com a natureza.
              </p>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">O Que Esperar de uma Fazenda Turística</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Hospedagem acolhedora:</strong> Quartos rústicos ou sofisticados, com todo conforto necessário</li>
                <li><strong>Gastronomia autêntica:</strong> Café da manhã colonial, almoço com comida caseira, churrascos</li>
                <li><strong>Atividades ao ar livre:</strong> Cavalgadas, trilhas, pesca, banho de rio, observação de aves</li>
                <li><strong>Contato com animais:</strong> Interação com cavalos, vacas, galinhas e outros animais da fazenda</li>
                <li><strong>Paz e tranquilidade:</strong> Escape do estresse urbano em um ambiente sereno</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">Tipos de Fazendas para Turismo</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Fazendas históricas:</strong> Propriedades centenárias com arquitetura colonial preservada</li>
                <li><strong>Fazendas produtivas:</strong> Propriedades ativas com produção agrícola ou pecuária</li>
                <li><strong>Eco-fazendas:</strong> Foco em sustentabilidade e preservação ambiental</li>
                <li><strong>Fazendas de luxo:</strong> Estrutura premium com spa, piscina e serviços diferenciados</li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Features */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Por Que Escolher o Turismo de Fazenda?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feat, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <feat.icon className="h-12 w-12 mx-auto text-amber-600 mb-4" />
                    <CardTitle className="text-lg">{feat.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{feat.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button size="lg" onClick={() => navigate('/turismo-rural')}>
                <MapPin className="mr-2 h-5 w-5" />
                Encontrar Fazendas para Hospedagem
              </Button>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Perguntas Frequentes sobre Turismo de Fazenda
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
              Explore Mais Modalidades
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
        <section className="py-16 bg-amber-500/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Sua Fazenda Recebe Turistas?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Cadastre sua propriedade na Rural Time e alcance milhares de visitantes 
              em busca de experiências autênticas no campo.
            </p>
            <Button size="lg" onClick={() => navigate('/cadastro-propriedade')}>
              Cadastrar Minha Fazenda
            </Button>
          </div>
        </section>
      </main>
      
      <Footer onSectionClick={scrollToSection} />
    </div>
  );
};

export default TurismoDeFazenda;
