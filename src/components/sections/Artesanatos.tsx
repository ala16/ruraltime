import React, { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Star, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import Autoplay from "embla-carousel-autoplay";

interface Artesanato {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  artesao_nome: string;
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
            Artesanato da Região Bragantina
          </h2>
          <p className="text-muted-foreground text-lg">
            Em breve, artesanatos únicos da nossa região estarão disponíveis aqui.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Artesanato da Região Bragantina
          </h2>
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-muted-foreground text-lg leading-relaxed">
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
                  <Card className="overflow-hidden h-full group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-card/50 backdrop-blur-sm">
                    <div className="relative overflow-hidden">
                      <img
                        src={artesanato.imagens[0]}
                        alt={artesanato.nome}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {artesanato.destaque && (
                        <Badge className="absolute top-4 left-4 bg-primary/90 text-primary-foreground backdrop-blur-sm">
                          <Star className="w-3 h-3 mr-1" />
                          Destaque
                        </Badge>
                      )}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors">
                          <Heart className="w-4 h-4 text-muted-foreground hover:text-primary" />
                        </button>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                          {artesanato.nome}
                        </h3>
                        <div className="text-right">
                          <div className="text-xl font-bold text-primary">
                            R$ {artesanato.preco?.toFixed(2)}
                          </div>
                        </div>
                      </div>
                      
                      <Badge variant="secondary" className="mb-3">
                        {artesanato.categoria}
                      </Badge>
                      
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {artesanato.descricao}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Por: <span className="font-medium text-foreground">{artesanato.artesao_nome}</span>
                        </span>
                        <Button 
                          size="sm" 
                          onClick={() => handleViewDetails(artesanato.id)}
                          className="ml-2"
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
            <CarouselPrevious className="hidden md:flex -left-12 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background" />
            <CarouselNext className="hidden md:flex -right-12 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};