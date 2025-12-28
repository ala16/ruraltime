import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  GraduationCap, 
  FileText, 
  Users, 
  Camera, 
  BadgeCheck, 
  ArrowRight, 
  ExternalLink,
  BookOpen,
  Building2,
  Target,
  Sparkles,
  CheckCircle2,
  Play,
  Clock,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ModernNavigation } from '@/components/ui/modern-navigation';
import { Footer } from '@/components/sections/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const roadmapSteps = [
  {
    step: 1,
    title: 'Avalie sua Propriedade',
    description: 'Identifique os atrativos naturais, culturais e produtivos da sua propriedade que podem interessar visitantes.',
    icon: MapPin,
    tips: [
      'Mapeie paisagens, nascentes, trilhas e áreas de preservação',
      'Liste atividades agrícolas que podem ser demonstradas',
      'Identifique elementos culturais e históricos',
      'Avalie a infraestrutura existente'
    ],
    duration: '1-2 semanas'
  },
  {
    step: 2,
    title: 'Capacite-se',
    description: 'Faça cursos de turismo rural, atendimento ao cliente, gestão de negócios e segurança alimentar.',
    icon: GraduationCap,
    tips: [
      'Cursos gratuitos no SENAR Play',
      'Capacitações presenciais do SENAR SP',
      'Cursos de hospitalidade e atendimento',
      'Treinamentos em segurança e primeiros socorros'
    ],
    duration: '2-3 meses'
  },
  {
    step: 3,
    title: 'Regularize seu Negócio',
    description: 'Obtenha as licenças necessárias, cadastre-se como produtor rural e formalize seu empreendimento.',
    icon: FileText,
    tips: [
      'Cadastro no CAR (Cadastro Ambiental Rural)',
      'Alvará de funcionamento municipal',
      'Licenças sanitárias para alimentação',
      'Seguro de responsabilidade civil'
    ],
    duration: '1-3 meses'
  },
  {
    step: 4,
    title: 'Monte sua Estrutura',
    description: 'Prepare a infraestrutura básica para receber visitantes com conforto e segurança.',
    icon: Building2,
    tips: [
      'Sanitários adequados e acessíveis',
      'Estacionamento sinalizado',
      'Área de recepção e acolhimento',
      'Sinalização interna e externa'
    ],
    duration: '2-6 meses'
  },
  {
    step: 5,
    title: 'Crie suas Experiências',
    description: 'Desenvolva roteiros e atividades que proporcionem experiências autênticas e memoráveis.',
    icon: Sparkles,
    tips: [
      'Trilhas ecológicas guiadas',
      'Colheita e degustação de produtos',
      'Oficinas de artesanato e culinária',
      'Vivências com animais da fazenda'
    ],
    duration: '1-2 meses'
  },
  {
    step: 6,
    title: 'Divulgue e Conecte',
    description: 'Promova sua propriedade nas redes sociais, plataformas de turismo e parcerias locais.',
    icon: Camera,
    tips: [
      'Cadastre-se no Rural Time',
      'Perfis em redes sociais com fotos de qualidade',
      'Parcerias com agências e roteiros turísticos',
      'Integração com sindicatos rurais e associações'
    ],
    duration: 'Contínuo'
  }
];

const senarCourses = [
  {
    title: 'Turismo Rural',
    description: 'Aprenda a planejar e implementar atividades turísticas na sua propriedade rural.',
    duration: '40 horas',
    type: 'Presencial',
    link: 'https://faespsenar.com.br/',
    highlight: true
  },
  {
    title: 'Comercialização de Produtos Agrícolas com Valor Agregado',
    description: 'Estratégias para comercializar produtos como carnes, queijos e cafés especiais.',
    duration: '3 horas',
    type: 'Online',
    link: 'https://ead.senar.org.br/cursos/comercializacao-de-produtos-agricolas-com-valor-agregado'
  },
  {
    title: 'Negócio Certo Rural',
    description: 'Ferramentas de gestão para pequenos produtores rurais e suas famílias.',
    duration: '46 horas',
    type: 'Híbrido',
    link: 'https://ead.senar.org.br/cursos/empreendedor-rural'
  },
  {
    title: 'Boas Práticas de Fabricação de Alimentos',
    description: 'Normas e procedimentos para produção segura de alimentos artesanais.',
    duration: '16 horas',
    type: 'Presencial',
    link: 'https://faespsenar.com.br/'
  },
  {
    title: 'Atendimento ao Cliente no Meio Rural',
    description: 'Técnicas de hospitalidade e relacionamento com visitantes.',
    duration: '8 horas',
    type: 'Online',
    link: 'https://ead.senar.org.br/'
  },
  {
    title: 'Primeiros Socorros',
    description: 'Procedimentos básicos de emergência para garantir a segurança dos visitantes.',
    duration: '8 horas',
    type: 'Presencial',
    link: 'https://faespsenar.com.br/'
  }
];

const benefits = [
  { icon: Target, title: 'Diversificação de Renda', desc: 'Nova fonte de receita além da produção agrícola' },
  { icon: Users, title: 'Valorização Cultural', desc: 'Preservação de tradições e saberes locais' },
  { icon: Star, title: 'Desenvolvimento Local', desc: 'Geração de empregos e renda na comunidade' },
  { icon: BadgeCheck, title: 'Reconhecimento', desc: 'Visibilidade para sua propriedade e produtos' }
];

export default function Roadmap() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Roadmap Turismo Rural | Como Começar | Rural Time</title>
        <meta name="description" content="Guia completo para iniciar no turismo rural. Conheça os passos, cursos do SENAR e como transformar sua propriedade em um destino turístico." />
      </Helmet>

      <ModernNavigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/20 text-primary border-primary/30">
              <BookOpen className="w-4 h-4 mr-2" />
              Guia Completo
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Comece no <span className="text-primary">Turismo Rural</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transforme sua propriedade rural em um destino turístico de sucesso. 
              Siga nosso roadmap e conte com o apoio do SENAR para sua capacitação.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2" asChild>
                <a href="#roadmap">
                  Ver Roadmap <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <a href="#cursos">
                  Cursos SENAR <GraduationCap className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Por que investir em Turismo Rural?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              O turismo rural é uma oportunidade de diversificar sua renda e valorizar a cultura do campo.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-border/50 hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Passo a Passo</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Roadmap do Turismo Rural
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Siga estas etapas para transformar sua propriedade em um destino turístico de sucesso.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {roadmapSteps.map((item, index) => (
              <div key={item.step} className="relative">
                {/* Connection Line */}
                {index < roadmapSteps.length - 1 && (
                  <div className="absolute left-8 top-24 bottom-0 w-0.5 bg-primary/30 hidden md:block" />
                )}
                
                <div className="flex gap-6 mb-8">
                  {/* Step Number */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25">
                      <item.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Content Card */}
                  <Card className="flex-1 border-border/50 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="text-xs">Etapa {item.step}</Badge>
                        <Badge variant="secondary" className="text-xs gap-1">
                          <Clock className="w-3 h-3" />
                          {item.duration}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl text-foreground">{item.title}</CardTitle>
                      <CardDescription className="text-base">{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {item.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SENAR Section */}
      <section id="cursos" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-500/20 text-green-600 border-green-500/30">
              Parceiro Oficial
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Programa de Turismo Rural do SENAR
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              O SENAR (Serviço Nacional de Aprendizagem Rural) oferece cursos gratuitos e capacitações 
              para produtores rurais que desejam diversificar suas atividades com o turismo rural.
            </p>
          </div>

          {/* SENAR Info Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-foreground">SENAR SP</CardTitle>
                    <CardDescription>Cursos Presenciais</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  O SENAR São Paulo oferece capacitações presenciais em todo o estado, 
                  através dos Sindicatos Rurais. Os cursos são gratuitos para produtores 
                  rurais e trabalhadores do campo.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Turismo Rural e Receptivo
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Boas Práticas de Fabricação
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Artesanato Rural
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Gestão da Propriedade Rural
                  </li>
                </ul>
                <Button className="w-full gap-2" asChild>
                  <a href="https://faespsenar.com.br/" target="_blank" rel="noopener noreferrer">
                    Acessar SENAR SP <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                    <Play className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-foreground">SENAR Play</CardTitle>
                    <CardDescription>Cursos Online Gratuitos</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Plataforma EAD do SENAR com mais de 220 cursos gratuitos em programas temáticos. 
                  Mais de 2,3 milhões de alunos já se capacitaram através do SENAR Play.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-secondary/50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-primary">+220</div>
                    <div className="text-xs text-muted-foreground">Cursos Disponíveis</div>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-primary">+2.3M</div>
                    <div className="text-xs text-muted-foreground">Alunos Capacitados</div>
                  </div>
                </div>
                <Button className="w-full gap-2 bg-green-600 hover:bg-green-700" asChild>
                  <a href="https://ead.senar.org.br/" target="_blank" rel="noopener noreferrer">
                    Acessar SENAR Play <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Courses Grid */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6 text-foreground text-center">
              Cursos Recomendados
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {senarCourses.map((course, index) => (
              <Card 
                key={index} 
                className={`hover:shadow-lg transition-all ${course.highlight ? 'border-primary/50 ring-1 ring-primary/20' : 'border-border/50'}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={course.type === 'Online' ? 'secondary' : 'outline'} className="text-xs">
                      {course.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {course.duration}
                    </span>
                  </div>
                  <CardTitle className="text-lg text-foreground">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full gap-2" asChild>
                    <a href={course.link} target="_blank" rel="noopener noreferrer">
                      Saiba Mais <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto text-center border-primary/20 bg-card/80 backdrop-blur">
            <CardContent className="pt-12 pb-10 px-8">
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
                Próximo Passo
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Pronto para Começar?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Cadastre sua propriedade no Rural Time e conecte-se com turistas de todo o Brasil. 
                Faça parte da maior rede de turismo rural do país.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2" asChild>
                  <Link to="/cadastro-propriedade">
                    Cadastrar Propriedade <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="gap-2" asChild>
                  <Link to="/atrativos">
                    Explorar Atrativos <MapPin className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </>
  );
}