import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import { supabase } from "@/integrations/supabase/client";
import { Eye, MessageCircle, Instagram } from "lucide-react";
import { ShareButtons } from "@/components/ShareButtons";
interface Propriedade {
  id: string;
  nome: string;
  tipo_propriedade: string;
  imagens: string[];
  whatsapp?: string;
  instagram?: string;
}
export function Atrativos() {
  const navigate = useNavigate();
  const [propriedades, setPropriedades] = useState<Propriedade[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPropriedades = async () => {
      try {
        const {
          data,
          error
        } = await supabase.rpc('get_property_public_view');
        if (error) {
          console.error('Erro ao buscar propriedades:', error);
          return;
        }

        // Filtrar apenas propriedades que têm imagens
        const propriedadesComImagens = (data || []).filter((prop: any) => prop.imagens && prop.imagens.length > 0);
        setPropriedades(propriedadesComImagens);
      } catch (error) {
        console.error('Erro:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPropriedades();
  }, []);
  if (loading) {
    return <section id="atrativos" className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>;
  }
  if (propriedades.length === 0) {
    return <section id="atrativos" className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-primary mb-4">Atrativos da Região</h2>
            <p className="text-xl text-muted-foreground">
              Em breve teremos propriedades cadastradas com fotos para mostrar aqui.
            </p>
          </div>
        </div>
      </section>;
  }
  return <section id="atrativos" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Atrativos de Turismo Rurais</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Viaje pelos destinos rurais do Brasil e descubra experiências autênticas, cheias de sabor, história e simplicidade.</p>
          <div className="mt-6">
            <Button 
              type="button"
              onClick={() => {
                navigate('/atrativos');
                window.scrollTo(0, 0);
              }} 
              size="lg"
              className="bg-gradient-primary text-primary-foreground hover:opacity-90"
            >
              Ver Todos os Atrativos
            </Button>
          </div>
        </div>

        <Carousel plugins={[Autoplay({
        delay: 3000
      })]} className="w-full" opts={{
        align: "start",
        loop: true
      }}>
          <CarouselContent className="-ml-2 md:-ml-4">
            {propriedades.map(propriedade => <CarouselItem key={propriedade.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer" onClick={() => navigate(`/propriedade/${propriedade.id}`)}>
                  <img src={propriedade.imagens[0]} alt={propriedade.nome} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                        {propriedade.tipo_propriedade}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{propriedade.nome}</h3>
                    
                    {/* Botões de ação */}
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => navigate(`/propriedade/${propriedade.id}`)} className="flex items-center gap-1 text-xs bg-primary/90 hover:bg-primary text-primary-foreground">
                          <Eye className="w-3 h-3" />
                          Ver mais
                        </Button>
                        
                        {propriedade.whatsapp && <Button size="sm" variant="outline" onClick={e => {
                      e.stopPropagation();
                      window.open(`https://wa.me/${propriedade.whatsapp?.replace(/\D/g, '')}`, '_blank');
                    }} className="flex items-center gap-1 text-xs bg-green-100/90 border-green-200 text-green-700 hover:bg-green-200">
                            <MessageCircle className="w-3 h-3" />
                            WhatsApp
                          </Button>}
                        
                        {propriedade.instagram && <Button size="sm" variant="outline" onClick={e => {
                      e.stopPropagation();
                      window.open(`https://instagram.com/${propriedade.instagram?.replace('@', '')}`, '_blank');
                    }} className="flex items-center gap-1 text-xs bg-pink-100/90 border-pink-200 text-pink-700 hover:bg-pink-200">
                            <Instagram className="w-3 h-3" />
                            Instagram
                          </Button>}
                      </div>
                      
                      <div onClick={(e) => e.stopPropagation()}>
                        <ShareButtons
                          url={`/propriedade/${propriedade.id}`}
                          title={propriedade.nome}
                          description={propriedade.tipo_propriedade}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>)}
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-white/90 border-2 shadow-lg hover:bg-white w-12 h-12" />
          <CarouselNext className="right-4 bg-white/90 border-2 shadow-lg hover:bg-white w-12 h-12" />
        </Carousel>
      </div>
    </section>;
}