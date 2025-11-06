import React, { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Star, Eye, MessageCircle, Instagram } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import Autoplay from "embla-carousel-autoplay";

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

  const handleViewDetails = (id: string) => {
    window.location.href = `/artesanato/${id}`;
  };

  useEffect(() => {
    const fetchArtesanatos = async () => {
      try {
        const { data, error } = await supabase.rpc('get_artesanatos_public_view');
        
        if (error) {
          console.error('Erro ao carregar artesanatos:', error);
          return;
        }

        // Filter only handicrafts with images
        const artesanatosWithImages = data?.filter((artesanato: Artesanato) => 
          artesanato.imagens && artesanato.imagens.length > 0
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

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-background via-secondary/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-64 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="overflow-hidden">
                <Skeleton className="h-64 w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-32 mb-4" />
                  <Skeleton className="h-8 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!artesanatos.length) {
    return (
      <section className="py-20 bg-gradient-to-br from-background via-secondary/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Artesanato Brasileiro
          </h2>
          <p className="text-muted-foreground text-lg">
            Em breve, artesanatos únicos da nossa região estarão disponíveis aqui.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="artesanatos" className="py-24 bg-gradient-to-br from-background via-rural-neutral to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 bg-rural-secondary/10 rounded-full mb-6">
            <span className="text-rural-secondary font-medium">✨ Tradição & Arte</span>
          </div>
          <h2 className="text-4xl font-bold text-primary mb-4">Artesanato Rural</h2>
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-xl text-rural-text-light leading-relaxed">
              O turismo também é artesanato! Descubra peças únicas criadas por talentosos artesãos da região, 
              que preservam tradições e agregam valor cultural às suas experiências rurais.
            </p>
          </div>
        </div>

        <div className="relative">
          <Carousel
            className="w-full"
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: false,
              }),
            ]}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {artesanatos.map((artesanato) => (
                <CarouselItem key={artesanato.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden h-full group hover-lift border-0 bg-gradient-card shadow-soft">
                    <div className="relative overflow-hidden cursor-pointer" onClick={() => handleViewDetails(artesanato.id)}>
                      <img
                        src={artesanato.imagens[0]}
                        alt={artesanato.nome}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {artesanato.destaque && (
                        <Badge className="absolute top-4 left-4 bg-rural-secondary/90 text-rural-secondary-foreground backdrop-blur-sm border-0 shadow-glow">
                          <Star className="w-3 h-3 mr-1" />
                          Destaque
                        </Badge>
                      )}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="p-2 rounded-full glass hover:bg-white/20 transition-colors">
                          <Heart className="w-4 h-4 text-white hover:text-rural-secondary" />
                        </button>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <h3 className="font-semibold text-xl text-foreground group-hover:text-rural-primary transition-colors">
                          {artesanato.nome}
                        </h3>
                      </div>
                      
                      <Badge variant="secondary" className="mb-4 bg-rural-accent/20 text-rural-primary border-rural-accent/30">
                        {artesanato.categoria}
                      </Badge>
                      
                      <p className="text-rural-text-light text-sm mb-6 line-clamp-2 leading-relaxed">
                        {artesanato.descricao}
                      </p>
                      
                      <div className="space-y-3">
                        <div className="text-sm text-rural-text-light">
                          Por: <span className="font-medium text-rural-primary">{artesanato.artesao_nome}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 flex-wrap">
                          {artesanato.artesao_whatsapp && (
                            <a
                              href={`https://wa.me/${artesanato.artesao_whatsapp.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md text-xs transition-colors"
                            >
                              <MessageCircle className="w-3 h-3" />
                              WhatsApp
                            </a>
                          )}
                          {artesanato.artesao_instagram && (
                            <a
                              href={`https://instagram.com/${artesanato.artesao_instagram.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2 py-1 bg-pink-500 hover:bg-pink-600 text-white rounded-md text-xs transition-colors"
                            >
                              <Instagram className="w-3 h-3" />
                              Instagram
                            </a>
                          )}
                        </div>
                        
                        <Button 
                          size="sm" 
                          onClick={() => handleViewDetails(artesanato.id)}
                          className="btn-modern bg-gradient-primary hover:bg-gradient-secondary text-primary-foreground w-full shadow-soft"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Ver detalhes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-white/90 border-2 shadow-lg hover:bg-white w-12 h-12" />
            <CarouselNext className="right-4 bg-white/90 border-2 shadow-lg hover:bg-white w-12 h-12" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};