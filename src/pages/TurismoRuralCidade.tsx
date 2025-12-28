import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { SEOHead } from "@/components/seo/SEOHead";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { ModernNavigation } from "@/components/ui/modern-navigation";
import { Footer } from "@/components/sections/Footer";
import { ShareButtons } from "@/components/ShareButtons";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar,
  Star,
  ImageIcon,
  Users,
  Clock,
  DollarSign,
  Leaf,
  Mountain,
  TreeDeciduous
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

// Mapeamento de estados
const estadosNomes: Record<string, string> = {
  'AC': 'Acre', 'AL': 'Alagoas', 'AP': 'Amapá', 'AM': 'Amazonas',
  'BA': 'Bahia', 'CE': 'Ceará', 'DF': 'Distrito Federal', 'ES': 'Espírito Santo',
  'GO': 'Goiás', 'MA': 'Maranhão', 'MT': 'Mato Grosso', 'MS': 'Mato Grosso do Sul',
  'MG': 'Minas Gerais', 'PA': 'Pará', 'PB': 'Paraíba', 'PR': 'Paraná',
  'PE': 'Pernambuco', 'PI': 'Piauí', 'RJ': 'Rio de Janeiro', 'RN': 'Rio Grande do Norte',
  'RS': 'Rio Grande do Sul', 'RO': 'Rondônia', 'RR': 'Roraima', 'SC': 'Santa Catarina',
  'SP': 'São Paulo', 'SE': 'Sergipe', 'TO': 'Tocantins'
};

const TurismoRuralCidade = () => {
  const { estado, cidade } = useParams<{ estado: string; cidade: string }>();
  const navigate = useNavigate();
  const [propriedades, setPropriedades] = useState<Propriedade[]>([]);
  const [loading, setLoading] = useState(true);
  
  const estadoUF = estado?.toUpperCase() || '';
  const estadoNome = estadosNomes[estadoUF] || estado;
  const cidadeNome = cidade?.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ') || '';

  useEffect(() => {
    const fetchPropriedades = async () => {
      try {
        const { data, error } = await supabase
          .rpc('get_property_public_view');

        if (error) throw error;
        
        // Filtrar por cidade e estado
        const filtered = (data || []).filter((prop: Propriedade) => {
          const cidadeMatch = prop.cidade.toLowerCase().trim() === cidadeNome.toLowerCase().trim();
          const estadoMatch = prop.estado.toUpperCase() === estadoUF;
          return cidadeMatch && estadoMatch && prop.imagens && prop.imagens.length > 0;
        });
        
        setPropriedades(filtered);
      } catch (error) {
        console.error('Erro ao buscar propriedades:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropriedades();
  }, [cidadeNome, estadoUF]);

  const pageTitle = `Turismo Rural em ${cidadeNome}, ${estadoUF} - Fazendas e Experiências no Campo`;
  const pageDescription = `Descubra ${propriedades.length > 0 ? propriedades.length : 'as melhores'} propriedades rurais para turismo em ${cidadeNome}, ${estadoNome}. Experiências autênticas no campo, agroturismo, hospedagem rural e fazendas para visitar.`;
  const pageUrl = `/turismo-rural/${estado}/${cidade}`;

  const scrollToSection = (sectionId: string) => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        keywords={`turismo rural ${cidadeNome}, fazendas ${cidadeNome}, agroturismo ${estadoNome}, experiências rurais ${cidadeNome}, hospedagem rural ${cidadeNome}, visitar fazenda ${cidadeNome}`}
        canonicalUrl={pageUrl}
        ogType="website"
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
          { name: estadoNome, url: `/turismo-rural/${estado}` },
          { name: cidadeNome, url: pageUrl }
        ]}
      />
      
      {propriedades.map((prop) => (
        <SchemaMarkup
          key={prop.id}
          type="touristAttraction"
          name={prop.nome}
          description={prop.descricao || `Propriedade rural para turismo em ${cidadeNome}`}
          address={{ city: prop.cidade, state: prop.estado }}
          image={prop.imagens?.[0]}
          geo={prop.latitude && prop.longitude ? { latitude: prop.latitude, longitude: prop.longitude } : undefined}
        />
      ))}
      
      <ModernNavigation onSectionClick={scrollToSection} />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
            
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <Link to="/" className="hover:text-primary transition-colors">Rural Time</Link>
              <span>/</span>
              <Link to="/turismo-rural" className="hover:text-primary transition-colors">Turismo Rural</Link>
              <span>/</span>
              <Link to={`/turismo-rural/${estado}`} className="hover:text-primary transition-colors">{estadoNome}</Link>
              <span>/</span>
              <span className="text-primary">{cidadeNome}</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Turismo Rural em <span className="text-primary">{cidadeNome}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-6">
              Explore as melhores fazendas, sítios e propriedades rurais para turismo em {cidadeNome}, {estadoNome}. 
              Viva experiências autênticas no campo brasileiro.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              <Badge variant="outline" className="text-sm py-2 px-4">
                <MapPin className="h-4 w-4 mr-2" />
                {cidadeNome}, {estadoUF}
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
            
            <ShareButtons url={pageUrl} title={pageTitle} description={pageDescription} />
          </div>
        </section>
        
        {/* Conteúdo SEO */}
        <section className="py-12 bg-card">
          <div className="container mx-auto px-4">
            <div className="prose prose-lg max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Sobre o Turismo Rural em {cidadeNome}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {cidadeNome}, localizada no estado de {estadoNome}, oferece experiências únicas de turismo rural para quem busca 
                contato com a natureza e a cultura do campo. A região é conhecida por suas belas paisagens rurais, 
                propriedades históricas e a hospitalidade do povo brasileiro.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                O turismo rural em {cidadeNome} proporciona atividades como trilhas ecológicas, cavalgadas, 
                colheita de frutas, degustação de produtos artesanais, hospedagem em fazendas e muito mais. 
                É uma oportunidade perfeita para famílias, casais e grupos que desejam escapar da rotina urbana.
              </p>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">O que fazer em {cidadeNome}?</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Visitar fazendas históricas e conhecer a produção agrícola local</li>
                <li>Participar de trilhas ecológicas em meio à mata nativa</li>
                <li>Degustar produtos artesanais como queijos, doces e cachaças</li>
                <li>Aproveitar a gastronomia típica do campo</li>
                <li>Relaxar em pousadas rurais com vista para as montanhas</li>
                <li>Conhecer o artesanato local e a cultura rural</li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Propriedades */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Propriedades Rurais em {cidadeNome}
            </h2>
            
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden animate-pulse">
                    <div className="aspect-video bg-muted" />
                    <CardHeader>
                      <div className="h-6 bg-muted rounded w-3/4" />
                      <div className="h-4 bg-muted rounded w-1/2 mt-2" />
                    </CardHeader>
                    <CardContent>
                      <div className="h-16 bg-muted rounded" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : propriedades.length === 0 ? (
              <div className="text-center py-16">
                <Mountain className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-xl font-semibold mb-4">Nenhuma propriedade encontrada em {cidadeNome}</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Ainda não temos propriedades rurais cadastradas nesta cidade. 
                  Explore outras cidades ou cadastre sua propriedade!
                </p>
                <div className="flex gap-4 justify-center">
                  <Button onClick={() => navigate('/turismo-rural')}>
                    Ver Todas as Cidades
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/cadastro-propriedade')}>
                    Cadastrar Propriedade
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {propriedades.map((propriedade) => (
                  <Card key={propriedade.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                    {propriedade.destaque && (
                      <div className="bg-gradient-to-r from-primary to-primary/80 text-white px-4 py-2">
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-sm font-medium">Destaque</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="aspect-video relative overflow-hidden">
                      {propriedade.imagens?.[0] ? (
                        <img 
                          src={propriedade.imagens[0]} 
                          alt={`${propriedade.nome} - Turismo Rural em ${cidadeNome}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
                        </div>
                      )}
                    </div>

                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {propriedade.nome}
                          </CardTitle>
                          <Badge variant="secondary" className="mt-2">
                            {propriedade.tipo_propriedade}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{propriedade.cidade}, {propriedade.estado}</span>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {propriedade.descricao && (
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {propriedade.descricao}
                        </p>
                      )}

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        {propriedade.preco_visita && (
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-primary" />
                            <span>R$ {propriedade.preco_visita.toFixed(2)}</span>
                          </div>
                        )}
                        
                        {propriedade.capacidade_visitantes && (
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            <span>Até {propriedade.capacidade_visitantes}</span>
                          </div>
                        )}
                        
                        {propriedade.horario_funcionamento && (
                          <div className="flex items-center gap-2 col-span-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span>{propriedade.horario_funcionamento}</span>
                          </div>
                        )}
                      </div>

                      {propriedade.atividades && propriedade.atividades.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {propriedade.atividades.slice(0, 3).map((atividade, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {atividade}
                            </Badge>
                          ))}
                          {propriedade.atividades.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{propriedade.atividades.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}

                      <div className="flex gap-2 pt-4">
                        <Button
                          onClick={() => navigate(`/propriedade/${propriedade.id}`)}
                          className="flex-1"
                        >
                          Ver Detalhes
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => navigate(`/agendamento/${propriedade.id}`)}
                          className="flex-1"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          Agendar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Tem uma propriedade rural em {cidadeNome}?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Cadastre sua fazenda, sítio ou chácara na Rural Time e conecte-se com milhares de turistas 
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

export default TurismoRuralCidade;
