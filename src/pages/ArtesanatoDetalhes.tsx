import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ArrowLeft, Star, Mail, Phone, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

interface Artesanato {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  artesao_nome: string;
  artesao_contato: string;
  imagens: string[];
  destaque: boolean;
}

const ArtesanatoDetalhes = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [artesanato, setArtesanato] = useState<Artesanato | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtesanato = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('artesanatos')
          .select('*')
          .eq('id', id)
          .eq('disponivel', true)
          .single();

        if (error) {
          console.error('Erro ao carregar artesanato:', error);
          return;
        }

        setArtesanato(data);
      } catch (error) {
        console.error('Erro ao carregar artesanato:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtesanato();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="grid lg:grid-cols-2 gap-8">
            <Skeleton className="h-96 w-full rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!artesanato) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Artesanato não encontrado</h1>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao início
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Imagens */}
          <div className="space-y-4">
            {artesanato.imagens && artesanato.imagens.length > 0 ? (
              artesanato.imagens.length === 1 ? (
                <img
                  src={artesanato.imagens[0]}
                  alt={artesanato.nome}
                  className="w-full h-96 object-cover rounded-lg"
                />
              ) : (
                <Carousel className="w-full">
                  <CarouselContent>
                    {artesanato.imagens.map((imagem, index) => (
                      <CarouselItem key={index}>
                        <img
                          src={imagem}
                          alt={`${artesanato.nome} - ${index + 1}`}
                          className="w-full h-96 object-cover rounded-lg"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              )
            ) : (
              <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Sem imagem</span>
              </div>
            )}
          </div>

          {/* Detalhes */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold">{artesanato.nome}</h1>
                {artesanato.destaque && (
                  <Badge className="bg-primary/90 text-primary-foreground">
                    <Star className="w-3 h-3 mr-1" />
                    Destaque
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary">{artesanato.categoria}</Badge>
                <div className="text-2xl font-bold text-primary">
                  R$ {artesanato.preco?.toFixed(2)}
                </div>
              </div>
            </div>

            {artesanato.descricao && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Descrição</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {artesanato.descricao}
                  </p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Artesão</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{artesanato.artesao_nome}</span>
                  </div>
                  {artesanato.artesao_contato && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {artesanato.artesao_contato.includes('@') ? (
                        <>
                          <Mail className="w-4 h-4" />
                          <a 
                            href={`mailto:${artesanato.artesao_contato}`}
                            className="hover:text-primary transition-colors"
                          >
                            {artesanato.artesao_contato}
                          </a>
                        </>
                      ) : (
                        <>
                          <Phone className="w-4 h-4" />
                          <a 
                            href={`tel:${artesanato.artesao_contato}`}
                            className="hover:text-primary transition-colors"
                          >
                            {artesanato.artesao_contato}
                          </a>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Artesanato da Região Bragantina</h3>
                    <p className="text-sm text-muted-foreground">
                      Peça única criada por talentosos artesãos da nossa região, 
                      preservando tradições e agregando valor cultural às experiências rurais.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtesanatoDetalhes;