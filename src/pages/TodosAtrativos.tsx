import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModernNavigation } from "@/components/ui/modern-navigation";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Eye, MessageCircle, Instagram, ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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
    document.title = "Todos os Atrativos Turísticos Rurais - Rural Time";
    
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
              Atrativos Turísticos Rurais
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Explore todos os destinos rurais disponíveis e descubra experiências autênticas em propriedades por todo o Brasil.
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
                <div
                  key={propriedade.id}
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/propriedade/${propriedade.id}`)}
                >
                  <img
                    src={propriedade.imagens[0]}
                    alt={propriedade.nome}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
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
                    
                    <h3 className="text-lg font-semibold mb-1">{propriedade.nome}</h3>
                    <p className="text-sm text-white/90 line-clamp-2 mb-3">
                      {propriedade.descricao}
                    </p>
                    
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        size="sm"
                        onClick={() => navigate(`/propriedade/${propriedade.id}`)}
                        className="flex items-center gap-1 text-xs bg-primary/90 hover:bg-primary text-primary-foreground"
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
                        >
                          <Instagram className="w-3 h-3" />
                          Instagram
                        </Button>
                      )}
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
