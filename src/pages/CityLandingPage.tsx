import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { SEOHead } from "@/components/seo/SEOHead";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { FAQSection } from "@/components/seo/FAQSection";
import { ModernNavigation } from "@/components/ui/modern-navigation";
import { Footer } from "@/components/sections/Footer";
import { OptimizedImage } from "@/components/ui/optimized-image";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  MapPin,
  Calendar,
  Star,
  ImageIcon,
  Users,
  Clock,
  DollarSign,
  Leaf,
  TreeDeciduous,
  Mountain,
} from "lucide-react";

interface Propriedade {
  id: string;
  nome: string;
  descricao: string;
  endereco: string;
  cidade: string;
  estado: string;
  tipo_propriedade: string;
  tamanho_hectares: number;
  preco_visita: number;
  capacidade_visitantes: number;
  horario_funcionamento: string;
  atividades: string[];
  infraestrutura: string[];
  destaque: boolean;
  imagens: string[];
  latitude: number;
  longitude: number;
  whatsapp: string;
  instagram: string;
}

const estadosNomes: Record<string, string> = {
  'AC': 'Acre', 'AL': 'Alagoas', 'AP': 'Amapá', 'AM': 'Amazonas',
  'BA': 'Bahia', 'CE': 'Ceará', 'DF': 'Distrito Federal', 'ES': 'Espírito Santo',
  'GO': 'Goiás', 'MA': 'Maranhão', 'MT': 'Mato Grosso', 'MS': 'Mato Grosso do Sul',
  'MG': 'Minas Gerais', 'PA': 'Pará', 'PB': 'Paraíba', 'PR': 'Paraná',
  'PE': 'Pernambuco', 'PI': 'Piauí', 'RJ': 'Rio de Janeiro', 'RN': 'Rio Grande do Norte',
  'RS': 'Rio Grande do Sul', 'RO': 'Rondônia', 'RR': 'Roraima', 'SC': 'Santa Catarina',
  'SP': 'São Paulo', 'SE': 'Sergipe', 'TO': 'Tocantins'
};

const CityLandingPage = () => {
  const { estado, cidade } = useParams<{ estado: string; cidade: string }>();
  const navigate = useNavigate();
  const [propriedades, setPropriedades] = useState<Propriedade[]>([]);
  const [artesanatos, setArtesanatos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const estadoUF = estado?.toUpperCase() || '';
  const estadoNome = estadosNomes[estadoUF] || estado;
  const cidadeSlug = cidade || '';
  const cidadeNomeDisplay = cidadeSlug.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  const toSlug = (str: string) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  // We'll store the real city name from the first matched property
  const [realCidadeNome, setRealCidadeNome] = useState(cidadeNomeDisplay);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propResult, artResult] = await Promise.all([
          supabase.rpc('get_property_public_view'),
          supabase.rpc('get_artesanatos_public_view'),
        ]);

        if (propResult.data) {
          const filtered = (propResult.data as Propriedade[]).filter((prop) => {
            const propCidadeSlug = toSlug(prop.cidade.trim());
            const estadoMatch = prop.estado.toUpperCase().trim() === estadoUF;
            return propCidadeSlug === cidadeSlug && estadoMatch && prop.imagens && prop.imagens.length > 0;
          });
          setPropriedades(filtered);
          if (filtered.length > 0) {
            setRealCidadeNome(filtered[0].cidade.trim());
          }
        }

        if (artResult.data) {
          // Artesanatos don't have city field, so we show all for now
          setArtesanatos(artResult.data.slice(0, 6));
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [realCidadeNome, estadoUF]);

  const pageTitle = `Turismo Rural em ${realCidadeNome} - Passeios e Fazendas | Rural Time`;
  const pageDescription = `Descubra ${propriedades.length > 0 ? propriedades.length + ' propriedades rurais' : 'experiências autênticas'} de turismo rural em ${realCidadeNome}, ${estadoNome}. Fazendas, sítios, trilhas ecológicas, gastronomia do campo e artesanato local.`;
  const pageUrl = `/destinos/${estado}/${cidade}`;

  const scrollToSection = (sectionId: string) => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const attractionNames = propriedades.map(p => p.nome);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        keywords={`turismo rural ${realCidadeNome}, fazendas ${realCidadeNome}, agroturismo ${estadoNome}, experiências rurais ${realCidadeNome}, hospedagem rural ${realCidadeNome}, passeios ${realCidadeNome}, artesanato ${realCidadeNome}`}
        canonicalUrl={pageUrl}
        ogType="website"
      />

      {/* Schema: TouristDestination */}
      <SchemaMarkup
        type="touristDestination"
        name={`Turismo Rural em ${realCidadeNome}`}
        description={pageDescription}
        address={{ city: realCidadeNome, state: estadoUF }}
        attractions={attractionNames}
      />

      {/* Schema: BreadcrumbList */}
      <SchemaMarkup
        type="breadcrumb"
        items={[
          { name: 'Rural Time', url: '/' },
          { name: 'Destinos', url: '/turismo-rural' },
          { name: estadoNome, url: `/turismo-rural/${estado}` },
          { name: realCidadeNome, url: pageUrl }
        ]}
      />

      {/* Schema: ItemList of properties */}
      {propriedades.length > 0 && (
        <SchemaMarkup
          type="itemList"
          name={`Propriedades Rurais em ${realCidadeNome}`}
          description={`Lista de propriedades rurais para turismo em ${realCidadeNome}, ${estadoNome}`}
          url={pageUrl}
          items={propriedades.map((p, i) => ({
            name: p.nome,
            url: `/propriedade/${p.id}`,
            image: p.imagens?.[0],
            description: p.descricao?.substring(0, 160),
            position: i + 1,
          }))}
        />
      )}

      <ModernNavigation onSectionClick={scrollToSection} />

      <main className="pt-20">
        {/* Hero with Breadcrumbs */}
        <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            {/* Structured Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/">Início</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/turismo-rural">Destinos</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to={`/turismo-rural/${estado}`}>{estadoNome}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{realCidadeNome}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </nav>

            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Turismo Rural e Experiências em <span className="text-primary">{realCidadeNome}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-6">
              Explore fazendas, sítios e propriedades rurais em {realCidadeNome}, {estadoNome}.
              Viva experiências autênticas no campo brasileiro.
            </p>

            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="text-sm py-2 px-4">
                <MapPin className="h-4 w-4 mr-2" />
                {realCidadeNome}, {estadoUF}
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4">
                <TreeDeciduous className="h-4 w-4 mr-2" />
                {propriedades.length} {propriedades.length === 1 ? 'propriedade' : 'propriedades'}
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4">
                <Leaf className="h-4 w-4 mr-2" />
                Agroturismo
              </Badge>
            </div>
          </div>
        </section>

        {/* Rich SEO Content Section (~300 words) */}
        <section className="py-12 bg-card">
          <div className="container mx-auto px-4">
            <article className="prose prose-lg max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Descubra o Turismo Rural em {realCidadeNome}, {estadoNome}</h2>
              <p className="text-muted-foreground leading-relaxed">
                O turismo rural em {realCidadeNome} é uma porta de entrada para experiências genuínas que conectam
                visitantes à cultura, gastronomia e natureza do interior de {estadoNome}. A região se destaca
                por suas paisagens exuberantes, fazendas históricas e pela hospitalidade característica do campo
                brasileiro. Quem visita {realCidadeNome} encontra um ambiente de tranquilidade, longe da agitação
                urbana, ideal para famílias, casais e grupos de amigos em busca de lazer e descanso.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Entre as principais atividades disponíveis estão trilhas ecológicas em meio à mata nativa,
                cavalgadas por estradas rurais, colheita de frutas da estação, degustação de produtos artesanais
                — como queijos, doces caseiros e cachaças — e a vivência do dia a dia no campo. Diversas
                propriedades rurais da região investem em infraestrutura turística, oferecendo hospedagem
                confortável, restaurantes com gastronomia típica e programação educativa para crianças.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4">Por que visitar {realCidadeNome}?</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Contato direto com a natureza e a vida no campo</li>
                <li>Gastronomia regional com ingredientes frescos e orgânicos</li>
                <li>Atividades ao ar livre para toda a família</li>
                <li>Artesanato local e cultura popular</li>
                <li>Hospedagem em fazendas e pousadas rurais com charme</li>
                <li>Fácil acesso a partir dos grandes centros urbanos de {estadoNome}</li>
              </ul>

              <h3 className="text-xl font-semibold mt-8 mb-4">Planeje sua visita</h3>
              <p className="text-muted-foreground leading-relaxed">
                Para aproveitar ao máximo o turismo rural em {realCidadeNome}, recomendamos entrar em contato
                direto com as propriedades listadas abaixo. Cada uma oferece experiências diferenciadas e
                pode orientar sobre horários de funcionamento, disponibilidade e atividades sazonais.
                Reserve sua visita com antecedência e prepare-se para uma imersão inesquecível no campo.
              </p>
            </article>
          </div>
        </section>

        {/* Property Grid */}
        <section className="py-16" id="propriedades">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Propriedades Rurais em {realCidadeNome}
            </h2>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden animate-pulse">
                    <div className="aspect-video bg-muted" />
                    <CardHeader><div className="h-6 bg-muted rounded w-3/4" /></CardHeader>
                    <CardContent><div className="h-16 bg-muted rounded" /></CardContent>
                  </Card>
                ))}
              </div>
            ) : propriedades.length === 0 ? (
              <div className="text-center py-16">
                <Mountain className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-xl font-semibold mb-4">Nenhuma propriedade encontrada em {realCidadeNome}</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Ainda não temos propriedades rurais cadastradas nesta cidade.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button onClick={() => navigate('/turismo-rural')}>Ver Todas as Cidades</Button>
                  <Button variant="outline" onClick={() => navigate('/cadastro-propriedade')}>Cadastrar Propriedade</Button>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {propriedades.map((prop) => (
                  <Card key={prop.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                    {prop.destaque && (
                      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-2">
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-sm font-medium">Destaque</span>
                        </div>
                      </div>
                    )}

                    <div className="aspect-video relative overflow-hidden">
                      {prop.imagens?.[0] ? (
                        <OptimizedImage
                          src={prop.imagens[0]}
                          alt={`${prop.nome} - ${prop.tipo_propriedade} para turismo rural em ${realCidadeNome}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          width={400}
                          height={225}
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
                        </div>
                      )}
                    </div>

                    <CardHeader>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {prop.nome}
                      </CardTitle>
                      <Badge variant="secondary" className="w-fit mt-1">{prop.tipo_propriedade}</Badge>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{prop.cidade}, {prop.estado}</span>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {prop.descricao && (
                        <p className="text-sm text-muted-foreground line-clamp-3">{prop.descricao}</p>
                      )}

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        {prop.preco_visita && (
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-primary" />
                            <span>R$ {prop.preco_visita.toFixed(2)}</span>
                          </div>
                        )}
                        {prop.capacidade_visitantes && (
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            <span>Até {prop.capacidade_visitantes}</span>
                          </div>
                        )}
                        {prop.horario_funcionamento && (
                          <div className="flex items-center gap-2 col-span-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span>{prop.horario_funcionamento}</span>
                          </div>
                        )}
                      </div>

                      {prop.atividades && prop.atividades.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {prop.atividades.slice(0, 3).map((ativ, i) => (
                            <Badge key={i} variant="outline" className="text-xs">{ativ}</Badge>
                          ))}
                          {prop.atividades.length > 3 && (
                            <Badge variant="outline" className="text-xs">+{prop.atividades.length - 3}</Badge>
                          )}
                        </div>
                      )}

                      <div className="flex gap-2 pt-4">
                        <Button onClick={() => navigate(`/propriedade/${prop.id}`)} className="flex-1">
                          Ver Detalhes
                        </Button>
                        <Button variant="outline" onClick={() => navigate(`/agendamento/${prop.id}`)} className="flex-1">
                          <Calendar className="mr-2 h-4 w-4" />Agendar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* FAQ for SGE */}
        <section className="py-12 container mx-auto px-4">
          <FAQSection
            title={`Perguntas Frequentes sobre Turismo Rural em ${realCidadeNome}`}
            faqs={[
              {
                question: `O que fazer em ${realCidadeNome} para turismo rural?`,
                answer: `${realCidadeNome} oferece diversas experiências de turismo rural, incluindo visitas a fazendas, trilhas ecológicas, degustação de produtos artesanais, hospedagem rural e contato direto com a natureza.`
              },
              {
                question: `Quais são as melhores propriedades rurais em ${realCidadeNome}?`,
                answer: `Na Rural Time você encontra ${propriedades.length > 0 ? propriedades.length : 'diversas'} propriedades rurais em ${realCidadeNome}, ${estadoNome}. Cada uma oferece experiências únicas de agroturismo e ecoturismo.`
              },
              {
                question: `Turismo rural em ${realCidadeNome} é adequado para crianças?`,
                answer: `Sim! Muitas propriedades em ${realCidadeNome} oferecem atividades pensadas para crianças, como contato com animais, colheita de frutas e atividades educativas sobre a vida no campo.`
              },
              {
                question: `Como reservar uma visita a uma fazenda em ${realCidadeNome}?`,
                answer: `Você pode reservar diretamente pela Rural Time. Acesse a propriedade desejada, escolha a data e envie sua reserva via WhatsApp. O processo é rápido e simples.`
              }
            ]}
          />
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Tem uma propriedade rural em {realCidadeNome}?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Cadastre sua fazenda, sítio ou chácara na Rural Time e conecte-se com turistas
              que buscam experiências autênticas no campo brasileiro.
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

export default CityLandingPage;
