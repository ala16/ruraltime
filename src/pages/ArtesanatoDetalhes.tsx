import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SEOHead } from '@/components/seo/SEOHead';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { RelatedContent } from '@/components/seo/RelatedContent';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Star, Mail, Phone, MapPin, Instagram, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { ShareButtons } from '@/components/ShareButtons';

interface Artesanato {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
  artesao_nome: string;
  artesao_contato: string;
  artesao_instagram?: string;
  artesao_whatsapp?: string;
  imagens: string[];
  destaque: boolean;
}

const ArtesanatoDetalhes = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [artesanato, setArtesanato] = useState<Artesanato | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handlePreviousImage = () => {
    if (artesanato?.imagens) {
      setSelectedImageIndex(prev => 
        prev === 0 ? artesanato.imagens.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (artesanato?.imagens) {
      setSelectedImageIndex(prev => 
        prev === artesanato.imagens.length - 1 ? 0 : prev + 1
      );
    }
  };

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

  const siteUrl = 'https://ruraltime.com.br';
  const imageUrl = artesanato.imagens?.[0]
    ? (artesanato.imagens[0].startsWith('http')
        ? artesanato.imagens[0]
        : `${siteUrl}${artesanato.imagens[0]}`)
    : `${siteUrl}/placeholder.svg`;
  const artDescription = artesanato.descricao || 'Descubra artesanatos autênticos do campo na Rural Time';
  const metaDesc = `${artDescription.substring(0, 100)}. Artesanato ${artesanato.categoria} por ${artesanato.artesao_nome}.`.substring(0, 160);

  return (
    <article className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background overflow-x-hidden">
      <SEOHead
        title={`${artesanato.nome} - Artesanato ${artesanato.categoria} | Rural Time`}
        description={metaDesc}
        keywords={`artesanato rural, ${artesanato.categoria}, ${artesanato.artesao_nome}, artesanato brasileiro, produtos artesanais`}
        canonicalUrl={`/artesanato/${id}`}
        ogImage={imageUrl}
      />

      <SchemaMarkup
        type="product"
        name={artesanato.nome}
        description={artDescription}
        image={imageUrl}
        category={artesanato.categoria}
        manufacturer={artesanato.artesao_nome}
      />

      <SchemaMarkup
        type="breadcrumb"
        items={[
          { name: 'Início', url: '/' },
          { name: 'Artesanatos', url: '/artesanatos' },
          { name: artesanato.nome, url: `/artesanato/${id}` }
        ]}
      />

      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Breadcrumb visual */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><a href="/" className="hover:text-primary transition-colors">Início</a></li>
            <li aria-hidden="true">/</li>
            <li><a href="/artesanatos" className="hover:text-primary transition-colors">Artesanatos</a></li>
            <li aria-hidden="true">/</li>
            <li><span className="text-foreground font-medium">{artesanato.nome}</span></li>
          </ol>
        </nav>

        <Button variant="ghost" onClick={() => navigate('/')} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Imagens */}
          <section className="space-y-4">
            {artesanato.imagens && artesanato.imagens.length > 0 ? (
              <>
                <div className="relative w-full">
                  <img
                    src={artesanato.imagens[selectedImageIndex]}
                    alt={`${artesanato.categoria} - ${artesanato.nome} por ${artesanato.artesao_nome} - Imagem ${selectedImageIndex + 1}`}
                    className="w-full h-56 sm:h-72 md:h-80 lg:h-96 object-cover rounded-lg"
                    width={800}
                    height={600}
                    loading="eager"
                  />
                  {artesanato.imagens.length > 1 && (
                    <>
                      <Button variant="ghost" size="icon" onClick={handlePreviousImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/90 hover:bg-background w-9 h-9 sm:w-12 sm:h-12 rounded-full shadow-lg" aria-label="Imagem anterior">
                        <ChevronLeft className="w-6 h-6" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={handleNextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/90 hover:bg-background w-9 h-9 sm:w-12 sm:h-12 rounded-full shadow-lg" aria-label="Próxima imagem">
                        <ChevronRight className="w-6 h-6" />
                      </Button>
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-foreground/50 text-background px-3 py-1 rounded-full text-sm">
                        {selectedImageIndex + 1} / {artesanato.imagens.length}
                      </div>
                    </>
                  )}
                </div>
                {artesanato.imagens.length > 1 && (
                  <div className="relative">
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                      {artesanato.imagens.map((imagem, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                            selectedImageIndex === index
                              ? 'border-primary shadow-lg ring-2 ring-primary/30'
                              : 'border-muted hover:border-muted-foreground/50'
                          }`}
                        >
                          <img src={imagem} alt={`${artesanato.nome} miniatura ${index + 1}`} className="w-full h-full object-cover" loading="lazy" width={80} height={80} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-56 sm:h-72 lg:h-96 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Sem imagem</span>
              </div>
            )}
          </section>

          {/* Detalhes */}
          <section className="space-y-6">
            <div>
              <div className="flex flex-wrap items-start gap-2 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold break-words">{artesanato.nome}</h1>
                {artesanato.destaque && (
                  <Badge className="bg-primary/90 text-primary-foreground">
                    <Star className="w-3 h-3 mr-1" />
                    Destaque
                  </Badge>
                )}
              </div>
              <div className="mb-4">
                <Badge variant="secondary">{artesanato.categoria}</Badge>
              </div>
              <div className="mb-4">
                <ShareButtons url={`/artesanato/${artesanato.id}`} title={artesanato.nome} description={`Artesanato ${artesanato.categoria} por ${artesanato.artesao_nome}`} />
              </div>
            </div>

            {artesanato.descricao && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-semibold mb-3">Descrição</h2>
                  <p className="text-muted-foreground leading-relaxed">{artesanato.descricao}</p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold mb-3">Artesão</h2>
                <div className="space-y-3">
                  <span className="font-medium">{artesanato.artesao_nome}</span>
                  <div className="flex flex-wrap gap-3">
                    {artesanato.artesao_whatsapp && (
                      <a href={`https://wa.me/${artesanato.artesao_whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-80 transition-colors text-sm">
                        <MessageCircle className="w-4 h-4" /> WhatsApp
                      </a>
                    )}
                    {artesanato.artesao_instagram && (
                      <a href={`https://instagram.com/${artesanato.artesao_instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-80 transition-colors text-sm">
                        <Instagram className="w-4 h-4" /> Instagram
                      </a>
                    )}
                    {artesanato.artesao_contato && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {artesanato.artesao_contato.includes('@') ? (
                          <><Mail className="w-4 h-4" /><a href={`mailto:${artesanato.artesao_contato}`} className="hover:text-primary transition-colors">{artesanato.artesao_contato}</a></>
                        ) : (
                          <><Phone className="w-4 h-4" /><a href={`tel:${artesanato.artesao_contato}`} className="hover:text-primary transition-colors">{artesanato.artesao_contato}</a></>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Artesanato Brasileiro</h3>
                    <p className="text-sm text-muted-foreground">
                      Peça única criada por talentosos artesãos brasileiros, preservando tradições e agregando valor cultural às experiências rurais.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Cross-selling / Related content */}
        <RelatedContent
          title="Explore Mais na Rural Time"
          items={[
            { title: 'Todos os Artesanatos', description: 'Veja a coleção completa de artesanatos rurais brasileiros', url: '/artesanatos', type: 'propriedade' as const },
            { title: 'Atrativos de Turismo Rural', description: 'Descubra propriedades e experiências rurais autênticas', url: '/atrativos', type: 'propriedade' as const },
            { title: 'Agroturismo no Brasil', description: 'Conheça fazendas e sítios com atividades agrícolas', url: '/agroturismo', type: 'cluster' as const },
          ]}
          variant="list"
        />
      </div>
    </article>
  );
};

export default ArtesanatoDetalhes;
