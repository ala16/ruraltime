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
  Leaf,
  TreeDeciduous, 
  Recycle,
  Droplets,
  Sun,
  MapPin,
  ChevronRight,
  Earth,
  Sprout
} from "lucide-react";

const TurismoSustentavel = () => {
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

  const pageTitle = "Turismo Rural Sustentável: Viaje com Consciência Ambiental";
  const pageDescription = "Descubra o turismo rural sustentável no Brasil: propriedades ecológicas, práticas de conservação, energia renovável e experiências que preservam o meio ambiente.";
  const pageUrl = "/turismo-rural-sustentavel";

  const faqs = [
    {
      question: "O que é turismo rural sustentável?",
      answer: "É uma forma de turismo que minimiza impactos ambientais, respeita comunidades locais, preserva tradições culturais e contribui para a conservação da natureza, gerando benefícios econômicos para os produtores rurais."
    },
    {
      question: "Como identificar uma propriedade rural sustentável?",
      answer: "Busque propriedades com práticas de manejo sustentável, uso de energia renovável, tratamento de resíduos, preservação de áreas nativas, produção orgânica e respeito à cultura local."
    },
    {
      question: "O turismo sustentável é mais caro?",
      answer: "Não necessariamente. Muitas propriedades sustentáveis têm preços similares às convencionais. O valor está na experiência de contribuir positivamente para o meio ambiente e comunidades locais."
    },
    {
      question: "Como ser um turista mais sustentável?",
      answer: "Respeite a natureza, não deixe lixo, economize água e energia, consuma produtos locais, respeite a cultura e tradições, e escolha propriedades comprometidas com a sustentabilidade."
    }
  ];

  const practices = [
    { icon: Sun, title: "Energia Renovável", desc: "Uso de solar, eólica e biomassa" },
    { icon: Droplets, title: "Gestão da Água", desc: "Captação de chuva e reuso" },
    { icon: Recycle, title: "Reciclagem", desc: "Compostagem e destinação correta" },
    { icon: Sprout, title: "Produção Orgânica", desc: "Sem agrotóxicos e pesticidas" },
    { icon: TreeDeciduous, title: "Reflorestamento", desc: "Recuperação de áreas degradadas" },
    { icon: Earth, title: "Conservação", desc: "Proteção de fauna e flora nativas" },
  ];

  const relatedPages = [
    { title: "Turismo Rural", url: "/turismo-rural", desc: "Todas as opções de turismo no campo" },
    { title: "Agroturismo", url: "/agroturismo", desc: "Experiências em fazendas produtivas" },
    { title: "Experiências no Campo", url: "/experiencia-no-campo", desc: "Vivências únicas na natureza" },
    { title: "Turismo de Fazenda", url: "/turismo-de-fazenda", desc: "Hospedagem em fazendas" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        keywords="turismo sustentável, ecoturismo rural, turismo ecológico, propriedades sustentáveis, turismo verde, viagem sustentável, turismo consciente, meio ambiente"
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
          { name: 'Turismo Sustentável', url: '/turismo-rural-sustentavel' }
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
        <section className="relative bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-background py-16 md:py-24">
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
              <span className="text-primary">Turismo Sustentável</span>
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <Leaf className="h-10 w-10 text-emerald-600" />
              <h1 className="text-3xl md:text-5xl font-bold">
                Turismo Rural <span className="text-emerald-600">Sustentável</span>
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-6">
              Viaje com consciência ambiental. Descubra propriedades rurais comprometidas 
              com a preservação do meio ambiente, práticas ecológicas e desenvolvimento 
              sustentável das comunidades locais.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              <Badge variant="outline" className="text-sm py-2 px-4 bg-emerald-500/10">
                <Leaf className="h-4 w-4 mr-2" />
                Ecológico
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4 bg-emerald-500/10">
                <Recycle className="h-4 w-4 mr-2" />
                Sustentável
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4 bg-emerald-500/10">
                <Earth className="h-4 w-4 mr-2" />
                Consciente
              </Badge>
            </div>
            
            <ShareButtons url={pageUrl} title={pageTitle} description={pageDescription} />
          </div>
        </section>
        
        {/* Conteúdo Principal */}
        <section className="py-12 bg-card">
          <div className="container mx-auto px-4">
            <div className="prose prose-lg max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">O Que é Turismo Rural Sustentável?</h2>
              <p className="text-muted-foreground leading-relaxed">
                O <strong>turismo rural sustentável</strong> é uma abordagem consciente de viajar 
                que busca minimizar impactos negativos ao meio ambiente enquanto maximiza benefícios 
                para comunidades locais. Vai além de simplesmente visitar áreas rurais – trata-se de 
                contribuir ativamente para a conservação da natureza e a preservação cultural.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                No Brasil, esse movimento ganha força à medida que turistas se conscientizam sobre 
                a importância de escolhas responsáveis. Propriedades rurais em todo o país estão 
                adotando práticas sustentáveis, desde energia solar até permacultura, oferecendo 
                experiências que alinham lazer e responsabilidade ambiental.
              </p>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">Pilares do Turismo Sustentável</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Ambiental:</strong> Conservação da natureza, redução de impactos, uso de recursos renováveis</li>
                <li><strong>Social:</strong> Respeito às comunidades locais, valorização da cultura, geração de empregos</li>
                <li><strong>Econômico:</strong> Distribuição justa de benefícios, apoio à economia local, viabilidade de longo prazo</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">Por Que Escolher o Turismo Sustentável?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ao optar por propriedades sustentáveis, você:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Contribui para a preservação de ecossistemas naturais</li>
                <li>Apoia produtores rurais comprometidos com práticas responsáveis</li>
                <li>Vive experiências mais autênticas e significativas</li>
                <li>Ajuda a manter tradições culturais vivas</li>
                <li>Reduz sua pegada de carbono ao viajar</li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Práticas Sustentáveis */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Práticas Sustentáveis no Campo
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {practices.map((practice, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow border-emerald-200">
                  <CardHeader>
                    <practice.icon className="h-12 w-12 mx-auto text-emerald-600 mb-4" />
                    <CardTitle className="text-lg">{practice.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{practice.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button size="lg" onClick={() => navigate('/turismo-rural')} className="bg-emerald-600 hover:bg-emerald-700">
                <MapPin className="mr-2 h-5 w-5" />
                Encontrar Propriedades Sustentáveis
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
        <section className="py-16 bg-emerald-500/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Sua Propriedade é Sustentável?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Cadastre-se na Rural Time e mostre ao mundo suas práticas de conservação. 
              Turistas conscientes buscam experiências como a sua.
            </p>
            <Button size="lg" onClick={() => navigate('/cadastro-propriedade')} className="bg-emerald-600 hover:bg-emerald-700">
              Cadastrar Propriedade Sustentável
            </Button>
          </div>
        </section>
      </main>
      
      <Footer onSectionClick={scrollToSection} />
    </div>
  );
};

export default TurismoSustentavel;
