import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  Building2,
  Mountain,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface EstadoCount {
  estado: string;
  estadoNome: string;
  cidades: number;
  propriedades: number;
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

const TurismoRuralIndex = () => {
  const navigate = useNavigate();
  const [estados, setEstados] = useState<EstadoCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalPropriedades, setTotalPropriedades] = useState(0);
  const [totalCidades, setTotalCidades] = useState(0);

  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const { data, error } = await supabase
          .rpc('get_property_public_view');

        if (error) throw error;
        
        // Agrupar por estado
        const estadoMap = new Map<string, { cidades: Set<string>; count: number }>();
        (data || []).forEach((prop: any) => {
          if (prop.imagens && prop.imagens.length > 0) {
            const estado = prop.estado.toUpperCase();
            if (!estadoMap.has(estado)) {
              estadoMap.set(estado, { cidades: new Set(), count: 0 });
            }
            const estadoData = estadoMap.get(estado)!;
            estadoData.cidades.add(prop.cidade.trim());
            estadoData.count++;
          }
        });
        
        const estadosArray = Array.from(estadoMap.entries())
          .map(([estado, data]) => ({
            estado,
            estadoNome: estadosNomes[estado] || estado,
            cidades: data.cidades.size,
            propriedades: data.count
          }))
          .sort((a, b) => b.propriedades - a.propriedades);
        
        setEstados(estadosArray);
        setTotalPropriedades(estadosArray.reduce((acc, e) => acc + e.propriedades, 0));
        setTotalCidades(estadosArray.reduce((acc, e) => acc + e.cidades, 0));
      } catch (error) {
        console.error('Erro ao buscar estados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEstados();
  }, []);

  const filteredEstados = estados.filter(estado =>
    estado.estadoNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    estado.estado.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageTitle = "Turismo Rural no Brasil - Fazendas, Sítios e Experiências no Campo";
  const pageDescription = `Explore ${totalPropriedades} propriedades rurais em ${totalCidades} cidades do Brasil. Descubra fazendas para visitar, agroturismo, hospedagem rural e experiências autênticas no campo brasileiro.`;
  const pageUrl = "/turismo-rural";

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
        keywords="turismo rural, fazendas para visitar, agroturismo brasil, experiências rurais, hospedagem rural, turismo no campo, fazendas turísticas, sítios para visitar, turismo rural brasil"
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
          { name: 'Turismo Rural', url: '/turismo-rural' }
        ]}
      />
      
      <ModernNavigation onSectionClick={scrollToSection} />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
            
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <Link to="/" className="hover:text-primary transition-colors">Rural Time</Link>
              <span>/</span>
              <span className="text-primary">Turismo Rural</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Turismo Rural no <span className="text-primary">Brasil</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-6">
              Explore fazendas, sítios e propriedades rurais em todo o Brasil. 
              Descubra experiências autênticas de agroturismo e contato com a natureza.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              <Badge variant="outline" className="text-sm py-2 px-4">
                <MapPin className="h-4 w-4 mr-2" />
                {estados.length} estados
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4">
                <Building2 className="h-4 w-4 mr-2" />
                {totalCidades} cidades
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
            
            {/* Barra de Busca */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar por estado..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-6 text-lg"
              />
            </div>
            
            <div className="mt-6">
              <ShareButtons url={pageUrl} title={pageTitle} description={pageDescription} />
            </div>
          </div>
        </section>
        
        {/* Conteúdo SEO */}
        <section className="py-12 bg-card">
          <div className="container mx-auto px-4">
            <div className="prose prose-lg max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">O que é Turismo Rural?</h2>
              <p className="text-muted-foreground leading-relaxed">
                O turismo rural é uma modalidade de turismo que acontece no meio rural, proporcionando 
                ao visitante experiências autênticas de contato com a natureza, a cultura e o modo de vida 
                do campo. No Brasil, o agroturismo tem crescido significativamente, oferecendo alternativas 
                para quem busca escapar da rotina urbana.
              </p>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">Benefícios do Turismo Rural</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Contato direto com a natureza e ar puro</li>
                <li>Experiências gastronômicas com produtos frescos e artesanais</li>
                <li>Aprendizado sobre agricultura, pecuária e tradições rurais</li>
                <li>Descanso e desconexão do estresse urbano</li>
                <li>Atividades ao ar livre como trilhas, cavalgadas e pesca</li>
                <li>Hospedagem em ambientes acolhedores e familiares</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">Por que escolher a Rural Time?</h3>
              <p className="text-muted-foreground leading-relaxed">
                A Rural Time é o maior portal de turismo rural do Brasil, conectando turistas a 
                pequenas propriedades rurais em todo o país. Nossa plataforma facilita a descoberta 
                de experiências únicas, com propriedades verificadas e informações completas para 
                você planejar sua viagem ao campo.
              </p>
            </div>
          </div>
        </section>
        
        {/* Estados */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Estados com Turismo Rural
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
            ) : filteredEstados.length === 0 ? (
              <div className="text-center py-16">
                <Mountain className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-xl font-semibold mb-4">
                  {searchTerm ? 'Nenhum estado encontrado' : 'Nenhuma propriedade cadastrada'}
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  {searchTerm 
                    ? 'Tente buscar por outro termo.' 
                    : 'Seja o primeiro a cadastrar sua propriedade rural!'}
                </p>
                {!searchTerm && (
                  <Button onClick={() => navigate('/cadastro-propriedade')}>
                    Cadastrar Propriedade
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredEstados.map((estado) => (
                  <Link 
                    key={estado.estado} 
                    to={`/turismo-rural/${estado.estado.toLowerCase()}`}
                  >
                    <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary cursor-pointer h-full">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-primary" />
                          {estado.estadoNome}
                        </CardTitle>
                        <Badge variant="secondary" className="w-fit">
                          {estado.estado}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-1 text-muted-foreground text-sm">
                          <p>{estado.cidades} {estado.cidades === 1 ? 'cidade' : 'cidades'}</p>
                          <p>{estado.propriedades} {estado.propriedades === 1 ? 'propriedade' : 'propriedades'}</p>
                        </div>
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
              Tem uma propriedade rural?
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

export default TurismoRuralIndex;
