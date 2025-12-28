import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/seo/SEOHead";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { ModernNavigation } from "@/components/ui/modern-navigation";
import { Footer } from "@/components/sections/Footer";
import { 
  ArrowLeft, 
  Users,
  Target,
  Heart,
  Award,
  Leaf,
  Globe,
  Shield,
  BookOpen,
  ChevronRight
} from "lucide-react";
import ricardoPhoto from "@/assets/ricardo-photo.jpg";

const Sobre = () => {
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

  const pageTitle = "Sobre a Rural Time - O Maior Portal de Turismo Rural do Brasil";
  const pageDescription = "Conheça a Rural Time, plataforma digital que conecta turistas a propriedades rurais brasileiras. Nossa missão, valores e o time por trás do projeto CNA Jovem.";
  const pageUrl = "/sobre";

  const values = [
    { 
      icon: Heart, 
      title: "Autenticidade", 
      desc: "Valorizamos experiências genuínas e a verdadeira cultura rural brasileira" 
    },
    { 
      icon: Leaf, 
      title: "Sustentabilidade", 
      desc: "Promovemos turismo responsável que preserva o meio ambiente e as tradições" 
    },
    { 
      icon: Users, 
      title: "Conexão", 
      desc: "Criamos pontes entre turistas urbanos e produtores rurais" 
    },
    { 
      icon: Shield, 
      title: "Confiança", 
      desc: "Oferecemos informações verificadas e propriedades de qualidade" 
    },
  ];

  const milestones = [
    { year: "2023", title: "Fundação", desc: "Nascimento da Rural Time como projeto CNA Jovem" },
    { year: "2024", title: "Lançamento", desc: "Plataforma digital disponibilizada ao público" },
    { year: "2024", title: "Expansão", desc: "Presença em múltiplos estados brasileiros" },
    { year: "2025", title: "Crescimento", desc: "Milhares de propriedades e turistas conectados" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        keywords="sobre rural time, quem somos, turismo rural brasil, CNA jovem, missão rural time, equipe rural time"
        canonicalUrl={pageUrl}
        ogType="website"
      />
      
      <SchemaMarkup type="organization" />
      
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
          { name: 'Sobre', url: '/sobre' }
        ]}
      />
      
      <ModernNavigation onSectionClick={scrollToSection} />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <Button variant="ghost" onClick={() => navigate('/')} className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
            
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <Link to="/" className="hover:text-primary transition-colors">Rural Time</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary">Sobre Nós</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Sobre a <span className="text-primary">Rural Time</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-6">
              Somos o maior portal de turismo rural do Brasil, conectando turistas a experiências 
              autênticas no campo brasileiro. Uma iniciativa do CNA Jovem para transformar e 
              digitalizar o turismo rural nacional.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="text-sm py-2 px-4">
                <Award className="h-4 w-4 mr-2" />
                CNA Jovem
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4">
                <Globe className="h-4 w-4 mr-2" />
                Brasil inteiro
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4">
                <BookOpen className="h-4 w-4 mr-2" />
                Desde 2023
              </Badge>
            </div>
          </div>
        </section>
        
        {/* Missão */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold">Nossa Missão</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Democratizar o acesso ao turismo rural brasileiro, conectando pequenos e médios 
                    produtores rurais a turistas que buscam experiências autênticas no campo. 
                    Queremos transformar a forma como as pessoas descobrem, planejam e vivem 
                    experiências rurais.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Acreditamos que o turismo rural é uma ferramenta poderosa de desenvolvimento 
                    sustentável, capaz de gerar renda para comunidades rurais, preservar tradições 
                    culturais e oferecer aos visitantes momentos únicos de conexão com a natureza.
                  </p>
                </div>
                <div className="bg-muted/50 p-8 rounded-2xl">
                  <h3 className="text-xl font-semibold mb-4">Nosso Propósito</h3>
                  <blockquote className="text-lg italic text-primary border-l-4 border-primary pl-4">
                    "Ser a ponte digital entre o campo e a cidade, promovendo o turismo rural 
                    como motor de desenvolvimento sustentável e preservação cultural do Brasil."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Valores */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Nossos Valores
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <value.icon className="h-12 w-12 mx-auto text-primary mb-4" />
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{value.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Fundador */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Fundador
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <Card className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img 
                      src={ricardoPhoto} 
                      alt="Ricardo Augusto Lima Rodrigues - Fundador da Rural Time"
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <h3 className="text-xl font-bold mb-2">Ricardo Augusto Lima Rodrigues</h3>
                    <p className="text-primary font-medium mb-4">Fundador & CEO</p>
                    <p className="text-muted-foreground mb-4">
                      Produtor rural, empreendedor e entusiasta do turismo rural brasileiro. 
                      Membro ativo do CNA Jovem, Ricardo criou a Rural Time com o objetivo de 
                      digitalizar e democratizar o acesso às experiências rurais do Brasil.
                    </p>
                    <p className="text-muted-foreground">
                      Formado em Administração com especialização em Agronegócio, ele combina 
                      conhecimento técnico com a vivência prática no campo para desenvolver 
                      soluções que beneficiam tanto produtores quanto turistas.
                    </p>
                    <div className="mt-4 flex gap-2">
                      <Badge variant="secondary">CNA Jovem</Badge>
                      <Badge variant="secondary">Empreendedor Rural</Badge>
                      <Badge variant="secondary">Turismo Rural</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Timeline */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Nossa Trajetória
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        {milestone.year.slice(-2)}
                      </div>
                      {index < milestones.length - 1 && (
                        <div className="w-0.5 h-full bg-primary/20 mt-2" />
                      )}
                    </div>
                    <div className="pb-6">
                      <h3 className="text-lg font-semibold">{milestone.title}</h3>
                      <p className="text-sm text-muted-foreground">{milestone.year}</p>
                      <p className="text-muted-foreground mt-2">{milestone.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Política Editorial */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-primary" />
                Política Editorial
              </h2>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  A Rural Time é comprometida com a qualidade e precisão das informações publicadas. 
                  Todo o conteúdo é produzido por nossa equipe editorial ou colaboradores especializados 
                  em turismo rural e agronegócio.
                </p>
                
                <h3 className="text-xl font-semibold mt-6 mb-4">Nossos Compromissos</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Veracidade:</strong> Publicamos apenas informações verificadas e atualizadas</li>
                  <li><strong>Imparcialidade:</strong> Não favorecemos propriedades em troca de benefícios</li>
                  <li><strong>Transparência:</strong> Identificamos claramente conteúdos patrocinados</li>
                  <li><strong>Atualização:</strong> Revisamos regularmente as informações publicadas</li>
                  <li><strong>Acessibilidade:</strong> Tornamos o conteúdo acessível a todos os públicos</li>
                </ul>
                
                <h3 className="text-xl font-semibold mt-6 mb-4">Fontes e Parcerias</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Trabalhamos em parceria com a Confederação da Agricultura e Pecuária do Brasil (CNA), 
                  o SENAR, sindicatos rurais e secretarias de turismo para garantir informações confiáveis 
                  sobre o turismo rural brasileiro.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Faça Parte da Rural Time
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Seja como turista descobrindo experiências ou como produtor compartilhando sua propriedade, 
              você é parte essencial da nossa comunidade.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/turismo-rural')}>
                Explorar Destinos
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/cadastro-propriedade')}>
                Cadastrar Propriedade
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer onSectionClick={scrollToSection} />
    </div>
  );
};

export default Sobre;
