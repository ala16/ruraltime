import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModernNavigation } from "@/components/ui/modern-navigation";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Eye, MessageCircle, Instagram, ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ShareButtons } from "@/components/ShareButtons";

interface Artesanato {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
  artesao_nome: string;
  artesao_whatsapp: string;
  artesao_instagram: string;
  imagens: string[];
  destaque: boolean;
}

export default function TodosArtesanatos() {
  const navigate = useNavigate();
  const [artesanatos, setArtesanatos] = useState<Artesanato[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Todos os Artesanatos Rurais - Rural Time";
    
    const fetchArtesanatos = async () => {
      try {
        const { data, error } = await supabase.rpc('get_artesanatos_public_view');
        
        if (error) {
          console.error('Erro ao carregar artesanatos:', error);
          return;
        }

        const artesanatosWithImages = data?.filter(
          (artesanato: Artesanato) => artesanato.imagens && artesanato.imagens.length > 0
        ) || [];
        
        setArtesanatos(artesanatosWithImages);
      } catch (error) {
        console.error('Erro ao carregar artesanatos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtesanatos();
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

  const handleViewDetails = (id: string) => {
    navigate(`/artesanato/${id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <ModernNavigation onSectionClick={scrollToSection} />
      
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para home
            </Button>
            
            <h1 className="text-4xl font-bold text-primary mb-4">
              Artesanato Rural
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Descubra peças únicas criadas por talentosos artesãos da região, que preservam tradições e agregam valor cultural.
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
          ) : artesanatos.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                Nenhum artesanato disponível no momento.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artesanatos.map((artesanato) => (
                <div
                  key={artesanato.id}
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => handleViewDetails(artesanato.id)}
                >
                  <img
                    src={artesanato.imagens[0]}
                    alt={artesanato.nome}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                        {artesanato.categoria}
                      </span>
                      {artesanato.destaque && (
                        <span className="text-xs bg-yellow-500/80 px-2 py-1 rounded-full backdrop-blur-sm">
                          Destaque
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-1">{artesanato.nome}</h3>
                    <p className="text-sm text-white/80 mb-1">Por {artesanato.artesao_nome}</p>
                    <p className="text-sm text-white/90 line-clamp-2 mb-3">
                      {artesanato.descricao}
                    </p>
                    
                    <div className="flex gap-1.5 flex-wrap">
                      <Button
                        size="sm"
                        onClick={() => handleViewDetails(artesanato.id)}
                        className="flex items-center gap-0.5 text-[10px] px-2 py-1 h-7 bg-primary/90 hover:bg-primary text-primary-foreground"
                      >
                        <Eye className="w-2.5 h-2.5" />
                        Ver detalhes
                      </Button>
                      
                      {artesanato.artesao_whatsapp && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(
                              `https://wa.me/${artesanato.artesao_whatsapp.replace(/\D/g, '')}`,
                              '_blank'
                            );
                          }}
                          className="flex items-center gap-0.5 text-[10px] px-2 py-1 h-7 bg-green-100/90 border-green-200 text-green-700 hover:bg-green-200"
                        >
                          <MessageCircle className="w-2.5 h-2.5" />
                          WhatsApp
                        </Button>
                      )}
                      
                      {artesanato.artesao_instagram && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(
                              `https://instagram.com/${artesanato.artesao_instagram.replace('@', '')}`,
                              '_blank'
                            );
                          }}
                          className="flex items-center gap-0.5 text-[10px] px-2 py-1 h-7 bg-pink-100/90 border-pink-200 text-pink-700 hover:bg-pink-200"
                        >
                          <Instagram className="w-2.5 h-2.5" />
                          Instagram
                        </Button>
                      )}
                    </div>
                    
                    <div onClick={(e) => e.stopPropagation()}>
                      <ShareButtons
                        url={`/artesanato/${artesanato.id}`}
                        title={artesanato.nome}
                        description={artesanato.categoria}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer onSectionClick={scrollToSection} />
    </div>
  );
}
