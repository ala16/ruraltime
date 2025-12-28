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
  Apple,
  Grape,
  Wheat,
  Sun,
  Mountain,
  Users,
  Calendar,
  MapPin,
  ChevronRight
} from "lucide-react";

const Agroturismo = () => {
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

  const pageTitle = "Agroturismo no Brasil: Guia Completo de Experiências Rurais";
  const pageDescription = "Descubra o agroturismo brasileiro: visite fazendas produtivas, participe de colheitas, deguste produtos artesanais e viva experiências autênticas no campo. Guia completo 2024.";
  const pageUrl = "/agroturismo";

  const faqs = [
    {
      question: "O que é agroturismo?",
      answer: "O agroturismo é uma modalidade de turismo rural que acontece em propriedades agrícolas produtivas. O visitante participa das atividades do dia a dia da fazenda, como colheita, ordenha, alimentação de animais e produção de alimentos artesanais."
    },
    {
      question: "Qual a diferença entre agroturismo e turismo rural?",
      answer: "O turismo rural é um conceito mais amplo que engloba qualquer atividade turística no campo. O agroturismo é específico de propriedades agrícolas produtivas, onde o turista vivencia as atividades agropecuárias."
    },
    {
      question: "O agroturismo é seguro para crianças?",
      answer: "Sim, o agroturismo é excelente para famílias com crianças. As atividades são adaptadas para diferentes idades e proporcionam aprendizado sobre origem dos alimentos, contato com animais e natureza."
    },
    {
      question: "Quanto custa uma experiência de agroturismo?",
      answer: "Os preços variam de R$ 50 a R$ 300 por pessoa para visitas de um dia, dependendo das atividades incluídas. Hospedagens em fazendas podem custar de R$ 200 a R$ 800 por diária."
    },
    {
      question: "Preciso reservar com antecedência?",
      answer: "Sim, é recomendado reservar com pelo menos uma semana de antecedência, especialmente em fins de semana e feriados. Muitas propriedades têm capacidade limitada de visitantes."
    }
  ];

  const experiences = [
    { icon: Grape, title: "Colheita de Uvas", desc: "Participe da vindima e aprenda sobre vinicultura" },
    { icon: Apple, title: "Colheita de Frutas", desc: "Colha maçãs, pêssegos, morangos e muito mais" },
    { icon: Wheat, title: "Produção Artesanal", desc: "Faça queijos, pães, geleias e doces caseiros" },
    { icon: Sun, title: "Café da Manhã Rural", desc: "Saboreie produtos frescos direto da fazenda" },
  ];

  const relatedPages = [
    { title: "Turismo Rural", url: "/turismo-rural", desc: "Explore todas as opções de turismo no campo" },
    { title: "Turismo de Fazenda", url: "/turismo-de-fazenda", desc: "Hospede-se em fazendas históricas" },
    { title: "Experiências no Campo", url: "/experiencia-no-campo", desc: "Vivências únicas na natureza" },
    { title: "Turismo Rural Sustentável", url: "/turismo-rural-sustentavel", desc: "Viagens eco-conscientes" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        keywords="agroturismo, agroturismo brasil, turismo em fazendas, colheita de frutas, experiências agrícolas, turismo agropecuário, visita a fazendas, turismo rural"
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
          { name: 'Agroturismo', url: '/agroturismo' }
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
        <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-background py-16 md:py-24">
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
              <span className="text-primary">Agroturismo</span>
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <Leaf className="h-10 w-10 text-primary" />
              <h1 className="text-3xl md:text-5xl font-bold">
                Agroturismo no <span className="text-primary">Brasil</span>
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-6">
              O agroturismo conecta você às raízes da produção agrícola brasileira. 
              Visite fazendas produtivas, participe de colheitas, aprenda técnicas ancestrais 
              e descubra de onde vem a comida que chega à sua mesa.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              <Badge variant="outline" className="text-sm py-2 px-4">
                <Leaf className="h-4 w-4 mr-2" />
                Produção Agrícola
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4">
                <Apple className="h-4 w-4 mr-2" />
                Colheita de Frutas
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4">
                <Wheat className="h-4 w-4 mr-2" />
                Produtos Artesanais
              </Badge>
            </div>
            
            <ShareButtons url={pageUrl} title={pageTitle} description={pageDescription} />
          </div>
        </section>
        
        {/* Conteúdo Principal */}
        <section className="py-12 bg-card">
          <div className="container mx-auto px-4">
            <div className="prose prose-lg max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">O Que é Agroturismo?</h2>
              <p className="text-muted-foreground leading-relaxed">
                O <strong>agroturismo</strong> é uma das modalidades mais autênticas do turismo rural brasileiro. 
                Diferente de outras formas de turismo no campo, o agroturismo acontece especificamente em 
                <strong> propriedades agrícolas produtivas</strong>, onde o visitante tem a oportunidade de 
                participar ativamente das atividades do dia a dia.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                No Brasil, o agroturismo ganhou força nas últimas décadas, impulsionado pela busca crescente 
                por experiências autênticas e pelo interesse em conhecer a origem dos alimentos. Regiões como 
                o <Link to="/turismo-rural/sp" className="text-primary hover:underline">interior de São Paulo</Link>, 
                <Link to="/turismo-rural/mg" className="text-primary hover:underline"> Minas Gerais</Link> e o 
                <Link to="/turismo-rural/rs" className="text-primary hover:underline"> Sul do país</Link> se destacam 
                como polos de agroturismo.
              </p>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">Principais Atividades do Agroturismo</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Colheita de frutas e hortaliças:</strong> Participe da colheita sazonal de uvas, maçãs, morangos, café e muito mais</li>
                <li><strong>Ordenha e manejo animal:</strong> Aprenda a ordenhar vacas, alimentar animais e entender a produção leiteira</li>
                <li><strong>Produção artesanal:</strong> Faça queijos, pães, geleias, cachaça e outros produtos típicos</li>
                <li><strong>Passeios pelas plantações:</strong> Conheça as técnicas de cultivo e a rotina de uma fazenda produtiva</li>
                <li><strong>Degustação de produtos:</strong> Prove produtos frescos, orgânicos e artesanais direto do produtor</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">Benefícios do Agroturismo</h3>
              <p className="text-muted-foreground leading-relaxed">
                O agroturismo oferece benefícios tanto para os visitantes quanto para os produtores rurais:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Para visitantes:</strong> Contato com a natureza, alimentação saudável, aprendizado cultural e descanso</li>
                <li><strong>Para produtores:</strong> Diversificação de renda, valorização do trabalho rural e preservação de tradições</li>
                <li><strong>Para a região:</strong> Desenvolvimento econômico local e fortalecimento da identidade cultural</li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Experiências */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Experiências de Agroturismo
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {experiences.map((exp, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <exp.icon className="h-12 w-12 mx-auto text-primary mb-4" />
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
                Encontrar Propriedades de Agroturismo
              </Button>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Perguntas Frequentes sobre Agroturismo
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
              Explore Mais sobre Turismo Rural
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
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ofereça Experiências de Agroturismo
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Cadastre sua propriedade agrícola na Rural Time e conecte-se com milhares de turistas 
              que buscam experiências autênticas de agroturismo.
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

export default Agroturismo;
