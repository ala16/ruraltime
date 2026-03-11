import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModernNavigation } from "@/components/ui/modern-navigation";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Eye, MessageCircle, Instagram, ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ShareButtons } from "@/components/ShareButtons";
import { SEOHead } from "@/components/seo/SEOHead";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";

interface Propriedade {
  id: string;
  nome: string;
  descricao: string;
  tipo_propriedade: string;
  cidade: string;
  estado: string;
  imagens: string[];
  whatsapp?: string;
  instagram?: string;
}

export default function TodosAtrativos() {
  const navigate = useNavigate();
  const [propriedades, setPropriedades] = useState<Propriedade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchPropriedades = async () => {
      try {
        const { data, error } = await supabase.rpc('get_property_public_view');
        
        if (error) {
          console.error('Erro ao buscar propriedades:', error);
          return;
        }

        const propriedadesComImagens = (data || []).filter(
          (prop: any) => prop.imagens && prop.imagens.length > 0
        );
        setPropriedades(propriedadesComImagens);
      } catch (error) {
        console.error('Erro:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropriedades();
  }, []);

  const scrollToSection = (sectionId: string) => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const siteUrl = 'https://ruraltime.com.br';

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Atrativos Turísticos Rurais no Brasil - Descubra o Campo"
        description="Explore todos os atrativos turísticos rurais disponíveis no Brasil. Fazendas, sítios e propriedades rurais com experiências autênticas no campo. Reserve sua visita!"
        keywords="atrativos rurais, turismo rural brasil, fazendas para visitar, sítios turísticos, propriedades rurais, agroturismo, experiências no campo, turismo no interior"
        canonicalUrl="/atrativos"
        ogImage={propriedades[0]?.imagens?.[0] || undefined}
      />

      {/* Breadcrumb Schema */}
      <SchemaMarkup
        type="breadcrumb"
        items={[
          { name: 'Início', url: '/' },
          { name: 'Atrativos Turísticos Rurais', url: '/atrativos' }
        ]}
      />

      {/* WebPage Schema */}
      <SchemaMarkup
        type="webPage"
        name="Atrativos Turísticos Rurais no Brasil"
        description="Explore todos os atrativos turísticos rurais disponíveis no Brasil. Fazendas, sítios e propriedades rurais com experiências autênticas no campo."
        url="/atrativos"
      />

      {/* ItemList Schema for Google rich results */}
      {!loading && propriedades.length > 0 && (
        <SchemaMarkup
          type="itemList"
          name="Atrativos de Turismo Rural no Brasil"
          description="Lista completa de fazendas, sítios e propriedades rurais para turismo no Brasil"
          url="/atrativos"
          items={propriedades.map((prop, index) => ({
            name: prop.nome,
            url: `/propriedade/${prop.id}`,
            image: prop.imagens?.[0],
            description: prop.descricao?.substring(0, 200),
            position: index + 1,
          }))}
        />
      )}
      
      <ModernNavigation onSectionClick={scrollToSection} />
      
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb visual */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:text-primary transition-colors">Início</a>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <span className="text-foreground font-medium">Atrativos Turísticos Rurais</span>
              </li>
            </ol>
          </nav>

          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mb-4"
              aria-label="Voltar para a página inicial"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para home
            </Button>
            
            <h1 className="text-4xl font-bold text-primary mb-4">
              Atrativos Turísticos Rurais no Brasil
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Explore todos os destinos rurais disponíveis e descubra experiências autênticas em propriedades por todo o Brasil. Fazendas, sítios, vinícolas e muito mais.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="space-y-4">
                  <Skeleton className="h-64 w-full rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : propriedades.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                Nenhum atrativo disponível no momento.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {propriedades.map((propriedade) => (
                <article
                  key={propriedade.id}
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/propriedade/${propriedade.id}`)}
                >
                  <img
                    src={propriedade.imagens[0]}
                    alt={`${propriedade.nome} - ${propriedade.tipo_propriedade} em ${propriedade.cidade}, ${propriedade.estado} - Turismo Rural`}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    width={400}
                    height={256}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                        {propriedade.tipo_propriedade}
                      </span>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                        {propriedade.cidade} - {propriedade.estado}
                      </span>
                    </div>
                    
                    <h2 className="text-lg font-semibold mb-1">{propriedade.nome}</h2>
                    <p className="text-sm text-white/90 line-clamp-2 mb-3">
                      {propriedade.descricao}
                    </p>
                    
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        size="sm"
                        onClick={() => navigate(`/propriedade/${propriedade.id}`)}
                        className="flex items-center gap-1 text-xs bg-primary/90 hover:bg-primary text-primary-foreground"
                        aria-label={`Ver detalhes de ${propriedade.nome}`}
                      >
                        <Eye className="w-3 h-3" />
                        Ver mais
                      </Button>
                      
                      {propriedade.whatsapp && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(
                              `https://wa.me/${propriedade.whatsapp?.replace(/\D/g, '')}`,
                              '_blank'
                            );
                          }}
                          className="flex items-center gap-1 text-xs bg-green-100/90 border-green-200 text-green-700 hover:bg-green-200"
                          aria-label={`Contatar ${propriedade.nome} pelo WhatsApp`}
                        >
                          <MessageCircle className="w-3 h-3" />
                          WhatsApp
                        </Button>
                      )}
                      
                      {propriedade.instagram && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(
                              `https://instagram.com/${propriedade.instagram?.replace('@', '')}`,
                              '_blank'
                            );
                          }}
                          className="flex items-center gap-1 text-xs bg-pink-100/90 border-pink-200 text-pink-700 hover:bg-pink-200"
                          aria-label={`Ver Instagram de ${propriedade.nome}`}
                        >
                          <Instagram className="w-3 h-3" />
                          Instagram
                        </Button>
                      )}
                    </div>
                    
                    <div onClick={(e) => e.stopPropagation()}>
                      <ShareButtons
                        url={`/propriedade/${propriedade.id}`}
                        title={propriedade.nome}
                        description={propriedade.tipo_propriedade}
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* SEO content section for Google indexing */}
          {!loading && propriedades.length > 0 && (
            <section className="mt-16 prose prose-lg max-w-4xl mx-auto text-muted-foreground">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Descubra os Melhores Atrativos de Turismo Rural do Brasil
              </h2>
              <p>
                O Brasil oferece uma rica variedade de experiências de turismo rural, desde fazendas históricas 
                até sítios ecológicos e vinícolas artesanais. Na Rural Time, reunimos os melhores atrativos 
                turísticos rurais para que você possa planejar sua próxima aventura no campo.
              </p>
              <p>
                Explore {propriedades.length} propriedades rurais em diferentes estados brasileiros, 
                cada uma oferecendo experiências únicas como trilhas ecológicas, degustação de produtos 
                artesanais, cavalgadas, pesca esportiva e muito mais.
              </p>
              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                Por que escolher o turismo rural?
              </h3>
              <p>
                O turismo rural proporciona contato direto com a natureza, gastronomia típica, 
                tranquilidade e experiências educativas para toda a família. É a forma ideal de 
                desconectar da rotina urbana e conhecer a cultura e tradições do interior brasileiro.
              </p>
            </section>
          )}
        </div>
      </main>
      
      <Footer onSectionClick={scrollToSection} />
    </div>
  );
}
