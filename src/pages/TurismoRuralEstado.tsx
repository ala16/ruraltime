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
  TreeDeciduous,
  Leaf,
  Building2
} from "lucide-react";

interface CidadeCount {
  cidade: string;
  count: number;
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

const TurismoRuralEstado = () => {
  const { estado } = useParams<{ estado: string }>();
  const navigate = useNavigate();
  const [cidades, setCidades] = useState<CidadeCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPropriedades, setTotalPropriedades] = useState(0);
  
  const estadoUF = estado?.toUpperCase() || '';
  const estadoNome = estadosNomes[estadoUF] || estado;

  useEffect(() => {
    const fetchCidades = async () => {
      try {
        const { data, error } = await supabase
          .rpc('get_property_public_view');

        if (error) throw error;
        
        // Agrupar por cidade
        const cidadeMap = new Map<string, number>();
        (data || []).forEach((prop: any) => {
          if (prop.estado.toUpperCase() === estadoUF && prop.imagens && prop.imagens.length > 0) {
            const cidade = prop.cidade.trim();
            cidadeMap.set(cidade, (cidadeMap.get(cidade) || 0) + 1);
          }
        });
        
        const cidadesArray = Array.from(cidadeMap.entries())
          .map(([cidade, count]) => ({ cidade, count }))
          .sort((a, b) => b.count - a.count);
        
        setCidades(cidadesArray);
        setTotalPropriedades(cidadesArray.reduce((acc, c) => acc + c.count, 0));
      } catch (error) {
        console.error('Erro ao buscar cidades:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCidades();
  }, [estadoUF]);

  const formatSlug = (cidade: string) => {
    return cidade.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  };

  const pageTitle = `Turismo Rural em ${estadoNome} - Fazendas e Experiências no Campo`;
  const pageDescription = `Explore ${totalPropriedades} propriedades rurais em ${cidades.length} cidades de ${estadoNome}. Descubra fazendas, sítios e experiências de agroturismo no ${estadoNome}.`;
  const pageUrl = `/turismo-rural/${estado}`;

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
        keywords={`turismo rural ${estadoNome}, fazendas ${estadoNome}, agroturismo ${estadoNome}, experiências rurais ${estadoNome}, hospedagem rural ${estadoNome}`}
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
          { name: estadoNome, url: pageUrl }
        ]}
      />
      
      <ModernNavigation onSectionClick={scrollToSection} />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/turismo-rural')}
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
              <span className="text-primary">{estadoNome}</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Turismo Rural em <span className="text-primary">{estadoNome}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-6">
              Descubra as melhores experiências de turismo rural em {estadoNome}. 
              Fazendas históricas, sítios acolhedores e paisagens deslumbrantes esperam por você.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              <Badge variant="outline" className="text-sm py-2 px-4">
                <MapPin className="h-4 w-4 mr-2" />
                {estadoNome}
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4">
                <Building2 className="h-4 w-4 mr-2" />
                {cidades.length} cidades
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4">
                <TreeDeciduous className="h-4 w-4 mr-2" />
                {totalPropriedades} propriedades
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
              <h2 className="text-2xl font-bold mb-4">Turismo Rural no {estadoNome}</h2>
              <p className="text-muted-foreground leading-relaxed">
                O {estadoNome} é um dos destinos mais procurados para turismo rural no Brasil. 
                Com uma rica tradição agrícola e paisagens diversificadas, o estado oferece experiências 
                únicas para quem busca contato com a natureza e a cultura do campo.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Das montanhas às planícies, das fazendas históricas aos sítios familiares, 
                o turismo rural no {estadoNome} proporciona momentos inesquecíveis de descanso, 
                aprendizado e conexão com as raízes do Brasil.
              </p>
            </div>
          </div>
        </section>
        
        {/* Cidades */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Cidades com Turismo Rural em {estadoNome}
            </h2>
            
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-6 bg-muted rounded w-3/4" />
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 bg-muted rounded w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : cidades.length === 0 ? (
              <div className="text-center py-16">
                <Building2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-xl font-semibold mb-4">Nenhuma cidade encontrada em {estadoNome}</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Ainda não temos propriedades rurais cadastradas neste estado. 
                  Seja o primeiro a cadastrar!
                </p>
                <Button onClick={() => navigate('/cadastro-propriedade')}>
                  Cadastrar Propriedade
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {cidades.map((cidade) => (
                  <Link 
                    key={cidade.cidade} 
                    to={`/turismo-rural/${estado}/${formatSlug(cidade.cidade)}`}
                  >
                    <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary cursor-pointer h-full">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-primary" />
                          {cidade.cidade}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          {cidade.count} {cidade.count === 1 ? 'propriedade rural' : 'propriedades rurais'}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Tem uma propriedade rural em {estadoNome}?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Cadastre sua fazenda, sítio ou chácara na Rural Time e conecte-se com milhares de turistas.
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

export default TurismoRuralEstado;
