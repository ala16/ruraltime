import React, { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Star, Eye, MessageCircle, Instagram } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import Autoplay from "embla-carousel-autoplay";
import { ShareButtons } from "@/components/ShareButtons";
import { useInView } from "@/hooks/use-in-view";
interface Artesanato {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
  artesao_nome: string;
  artesao_contato: string;
  artesao_whatsapp: string;
  artesao_instagram: string;
  imagens: string[];
  destaque: boolean;
}
export const Artesanatos = () => {
  const [artesanatos, setArtesanatos] = useState<Artesanato[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref: headerRef, isInView: headerInView } = useInView({ threshold: 0.2 });
  const { ref: carouselRef, isInView: carouselInView } = useInView({ threshold: 0.1 });
  const handleViewDetails = (id: string) => {
    window.location.href = `/artesanato/${id}`;
  };
  useEffect(() => {
    const fetchArtesanatos = async () => {
      try {
        const {
          data,
          error
        } = await supabase.rpc('get_artesanatos_public_view');
        if (error) {
          console.error('Erro ao carregar artesanatos:', error);
          return;
        }

        // Filter only handicrafts with images
        const artesanatosWithImages = data?.filter((artesanato: Artesanato) => artesanato.imagens && artesanato.imagens.length > 0) || [];
        setArtesanatos(artesanatosWithImages);
      } catch (error) {
        console.error('Erro ao carregar artesanatos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArtesanatos();
  }, []);
  if (loading) {
    return <section className="py-20 bg-gradient-to-br from-background via-secondary/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-64 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(item => <Card key={item} className="overflow-hidden">
                <Skeleton className="h-64 w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-32 mb-4" />
                  <Skeleton className="h-8 w-24" />
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>;
  }
  if (!artesanatos.length) {
    return <section className="py-20 bg-gradient-to-br from-background via-secondary/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Artesanato Brasileiro
          </h2>
          <p className="text-muted-foreground text-lg">
            Em breve, artesanatos únicos da nossa região estarão disponíveis aqui.
          </p>
        </div>
      </section>;
  }
  return <section id="artesanatos" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl font-bold text-primary mb-4 animate-fade-in">Artesanato Rural</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>O turismo também é artesanato! Descubra peças únicas criadas por talentosos artesãos da região, que preservam tradições e agregam valor cultural às suas experiências rurais.</p>
          <div className="mt-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button 
              type="button"
              onClick={() => {
                window.location.href = '/artesanatos';
                window.scrollTo(0, 0);
              }} 
              size="lg"
              className="bg-gradient-primary text-primary-foreground hover:opacity-90 hover:scale-105 transition-transform duration-300 shadow-glow"
            >
              Ver Todos os Artesanatos
            </Button>
          </div>
        </div>

        <div 
          ref={carouselRef}
          className={`transition-all duration-700 ${
            carouselInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
        <Carousel plugins={[Autoplay({
        delay: 3000
      })]} className="w-full" opts={{
        align: "start",
        loop: true
      }}>
          <CarouselContent className="-ml-2 md:-ml-4">
              {artesanatos.map((artesanato, index) => <CarouselItem key={artesanato.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-2 hover:scale-[1.02]" onClick={() => handleViewDetails(artesanato.id)}>
                    <img src={artesanato.imagens[0]} alt={artesanato.nome} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                          {artesanato.categoria}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{artesanato.nome}</h3>
                      
                      {/* Botões de ação */}
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-1.5">
                          <Button size="sm" onClick={() => handleViewDetails(artesanato.id)} className="flex items-center gap-0.5 text-[10px] px-2 py-1 h-7 bg-primary/90 hover:bg-primary text-primary-foreground">
                            <Eye className="w-2.5 h-2.5" />
                            Ver detalhes
                          </Button>
                          
                          {artesanato.artesao_whatsapp && <Button size="sm" variant="outline" onClick={e => {
                        e.stopPropagation();
                        window.open(`https://wa.me/${artesanato.artesao_whatsapp.replace(/\D/g, '')}`, '_blank');
                      }} className="flex items-center gap-0.5 text-[10px] px-2 py-1 h-7 bg-green-100/90 border-green-200 text-green-700 hover:bg-green-200">
                              <MessageCircle className="w-2.5 h-2.5" />
                              WhatsApp
                            </Button>}
                          
                          {artesanato.artesao_instagram && <Button size="sm" variant="outline" onClick={e => {
                        e.stopPropagation();
                        window.open(`https://instagram.com/${artesanato.artesao_instagram.replace('@', '')}`, '_blank');
                      }} className="flex items-center gap-0.5 text-[10px] px-2 py-1 h-7 bg-pink-100/90 border-pink-200 text-pink-700 hover:bg-pink-200">
                              <Instagram className="w-2.5 h-2.5" />
                              Instagram
                            </Button>}
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
                  </div>
                </CarouselItem>)}
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-white/90 border-2 shadow-lg hover:bg-white w-12 h-12" />
          <CarouselNext className="right-4 bg-white/90 border-2 shadow-lg hover:bg-white w-12 h-12" />
        </Carousel>
        </div>
      </div>
    </section>;
};