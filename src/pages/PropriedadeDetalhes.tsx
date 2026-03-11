import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { SEOHead } from '@/components/seo/SEOHead';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Star, Mail, Phone, MapPin, Instagram, MessageCircle, Globe, TreePine, Users, Clock, Coins, CalendarDays, CalendarIcon, Minus, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { ShareButtons } from '@/components/ShareButtons';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

interface Propriedade {
  id: string;
  nome: string;
  descricao: string;
  endereco: string;
  cidade: string;
  estado: string;
  tipo_propriedade: string;
  tamanho_hectares: number;
  preco_visita: number;
  capacidade_visitantes: number;
  horario_funcionamento: string;
  atividades: string[];
  infraestrutura: string[];
  destaque: boolean;
  imagens: string[];
  whatsapp?: string;
  instagram?: string;
}

interface ContactInfo {
  telefone?: string;
  email?: string;
  website?: string;
  whatsapp?: string;
  instagram?: string;
}

const DESCRICAO_LIMIT = 400;

function DescricaoCard({ descricao, t }: { descricao: string; t: (key: string) => string }) {
  const [expanded, setExpanded] = useState(false);
  const needsTruncation = descricao.length > DESCRICAO_LIMIT;
  const displayText = !expanded && needsTruncation
    ? descricao.slice(0, DESCRICAO_LIMIT) + '...'
    : descricao;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        <h3 className="font-semibold mb-3">{t('detail.about')}</h3>
        <p className="text-muted-foreground leading-relaxed break-words" style={{ overflowWrap: 'anywhere' }}>
          {displayText}
        </p>
        {needsTruncation && (
          <Button
            variant="link"
            className="p-0 h-auto mt-2"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? t('detail.viewLess') : t('detail.viewMore')}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

const PropriedadeDetalhes = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const bookingDate = searchParams.get('date');
  const bookingGuests = searchParams.get('guests');
  const [propriedade, setPropriedade] = useState<Propriedade | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(bookingDate ? new Date(bookingDate + 'T12:00:00') : undefined);
  const [guests, setGuests] = useState(bookingGuests ? Number(bookingGuests) : 1);
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: false },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedImageIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const fetchPropriedade = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase.rpc('get_property_public_view');
        
        if (error) {
          console.error('Erro ao carregar propriedade:', error);
          return;
        }

        const propriedadeEncontrada = data?.find((prop: any) => prop.id === id);
        if (propriedadeEncontrada) {
          setPropriedade(propriedadeEncontrada);
          
          // Buscar informações de contato
          const { data: contactData, error: contactError } = await supabase.rpc('get_property_contact_info', {
            property_id: id
          });

          if (!contactError && contactData && contactData.length > 0) {
            setContactInfo(contactData[0]);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar propriedade:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropriedade();
  }, [id]);

  const handleContactAction = (type: 'phone' | 'email' | 'website' | 'whatsapp' | 'instagram', value: string, customMessage?: string) => {
    const defaultMessage = 'Olá vi a sua propriedade de turismo rural no site da www.ruraltime.com.br gostaria de agendar uma visita turística.';
    const whatsappMessage = encodeURIComponent(customMessage || defaultMessage);
    
    switch (type) {
      case 'phone':
        const phoneNumber = value.replace(/\D/g, '');
        const formattedPhone = phoneNumber.startsWith('55') ? phoneNumber : `55${phoneNumber}`;
        window.open(`https://wa.me/${formattedPhone}?text=${whatsappMessage}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:${value}`, '_self');
        break;
      case 'website':
        window.open(value, '_blank');
        break;
      case 'whatsapp':
        const whatsappNumber = value.replace(/\D/g, '');
        const formattedWhatsapp = whatsappNumber.startsWith('55') ? whatsappNumber : `55${whatsappNumber}`;
        window.open(`https://wa.me/${formattedWhatsapp}?text=${whatsappMessage}`, '_blank');
        break;
      case 'instagram':
        window.open(`https://instagram.com/${value.replace('@', '')}`, '_blank');
        break;
    }
  };

  const handleBookingWhatsApp = () => {
    const whatsappNumber = contactInfo?.whatsapp || propriedade?.whatsapp || contactInfo?.telefone;
    if (!whatsappNumber || !propriedade) return;

    let dataFormatada = '';
    if (selectedDate) {
      try {
        dataFormatada = format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
      } catch {
        dataFormatada = '';
      }
    }

    const mensagem = `Olá! Gostaria de agendar uma visita no *${propriedade.nome}*.
${dataFormatada ? `\n📅 Data: ${dataFormatada}` : ''}
${guests ? `👥 Número de pessoas: ${guests}` : ''}

Poderia me informar sobre disponibilidade, horários e valores?

Mensagem enviada através do Rural Time.`;

    handleContactAction('whatsapp', whatsappNumber, mensagem);
  };

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

  if (!propriedade) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Propriedade não encontrada</h1>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao início
          </Button>
        </Card>
      </div>
    );
  }

  const pageUrl = `${window.location.origin}/propriedade/${id}`;
  const imageUrl = propriedade?.imagens?.[0] 
    ? (propriedade.imagens[0].startsWith('http') 
        ? propriedade.imagens[0] 
        : `${window.location.origin}${propriedade.imagens[0]}`)
    : `${window.location.origin}/placeholder.svg`;
  const propertyDescription = propriedade?.descricao || 'Descubra experiências autênticas de turismo rural na Rural Time';

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": propriedade?.nome,
    "description": propertyDescription,
    "image": imageUrl,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": propriedade?.endereco,
      "addressLocality": propriedade?.cidade,
      "addressRegion": propriedade?.estado,
      "addressCountry": "BR"
    },
    "url": pageUrl,
    "touristType": propriedade?.tipo_propriedade,
    "priceRange": propriedade?.preco_visita ? `R$ ${propriedade.preco_visita.toFixed(2)}` : undefined,
    "availableLanguage": "pt-BR"
  };

  const keywords = [
    'turismo rural',
    propriedade?.cidade,
    propriedade?.estado,
    propriedade?.tipo_propriedade,
    ...(propriedade?.atividades || []),
    'rural time',
    'turismo no campo',
    'experiências rurais',
    'agroturismo'
  ].filter(Boolean).join(', ');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background overflow-x-hidden">
      <Helmet>
        <title>{propriedade?.nome || 'Atrativo Rural'} - Turismo Rural em {propriedade?.cidade}, {propriedade?.estado} | Rural Time</title>
        <meta name="description" content={`${propertyDescription} ${propriedade?.cidade}, ${propriedade?.estado}. ${propriedade?.atividades?.slice(0, 3).join(', ')}. Reserve sua visita!`} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={pageUrl} />
        
        {/* Open Graph / Facebook / WhatsApp */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={`${propriedade?.nome || 'Atrativo Rural'} - Rural Time`} />
        <meta property="og:description" content={`🌾 Conheça ${propriedade?.nome || 'este atrativo'} na Rural Time. ${propertyDescription.substring(0, 150)}... Descubra o autêntico turismo rural brasileiro!`} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Rural Time" />
        <meta property="og:locale" content="pt_BR" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={pageUrl} />
        <meta property="twitter:title" content={`${propriedade?.nome || 'Atrativo Rural'} - Rural Time`} />
        <meta property="twitter:description" content={`🌾 Conheça ${propriedade?.nome || 'este atrativo'} na Rural Time. ${propertyDescription.substring(0, 150)}...`} />
        <meta property="twitter:image" content={imageUrl} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('detail.back')}
        </Button>

        {/* Barra de agendamento inline */}
        {(contactInfo?.whatsapp || propriedade?.whatsapp || contactInfo?.telefone) && (
          <Card className="mb-6 border-primary/30 bg-primary/5">
            <CardContent className="p-4 sm:p-5">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-primary" />
                {t('detail.bookVisit')}
              </h3>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
                {/* Data */}
                <div className="flex-1">
                  <label className="text-sm text-muted-foreground mb-1 block">{t('detail.date')}</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "dd/MM/yyyy") : t('detail.selectDate')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} disabled={(date) => date < new Date()} initialFocus className={cn("p-3 pointer-events-auto")} />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex-1">
                  <label className="text-sm text-muted-foreground mb-1 block">{t('detail.people')}</label>
                  <div className="flex items-center border rounded-md h-10">
                    <Button type="button" variant="ghost" size="icon" className="h-full rounded-r-none" onClick={() => setGuests(Math.max(1, guests - 1))}><Minus className="w-4 h-4" /></Button>
                    <span className="flex-1 text-center font-medium text-sm">{guests} {guests === 1 ? t('detail.person') : t('detail.persons')}</span>
                    <Button type="button" variant="ghost" size="icon" className="h-full rounded-l-none" onClick={() => setGuests(guests + 1)}><Plus className="w-4 h-4" /></Button>
                  </div>
                </div>
                <Button onClick={handleBookingWhatsApp} className="bg-green-600 hover:bg-green-700 text-white h-10 sm:px-6">
                  <MessageCircle className="w-4 h-4 mr-2" />{t('detail.sendWhatsapp')}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 min-w-0">
          {/* Imagens */}
          <div className="space-y-3 min-w-0">
            {propriedade.imagens && propriedade.imagens.length > 0 ? (
              <>
                {/* Embla Carousel */}
                <div className="overflow-hidden rounded-lg" ref={emblaRef}>
                  <div className="flex">
                    {propriedade.imagens.map((imagem, index) => (
                      <div key={index} className="flex-[0_0_100%] min-w-0">
                        <img
                          src={imagem}
                          alt={`${propriedade.nome} em ${propriedade.cidade}, ${propriedade.estado} - Imagem ${index + 1}`}
                          className="w-full h-56 sm:h-72 md:h-80 lg:h-96 object-cover"
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dots indicator */}
                {propriedade.imagens.length > 1 && (
                  <div className="flex justify-center gap-2 pt-1">
                    {propriedade.imagens.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => emblaApi?.scrollTo(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          selectedImageIndex === index
                            ? 'bg-primary scale-125'
                            : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                        }`}
                        aria-label={`Ir para imagem ${index + 1}`}
                      />
                    ))}
                  </div>
                )}

                {/* Thumbnails */}
                {propriedade.imagens.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                    {propriedade.imagens.map((imagem, index) => (
                      <button
                        key={index}
                        onClick={() => emblaApi?.scrollTo(index)}
                        className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImageIndex === index
                            ? 'border-primary shadow-lg'
                            : 'border-transparent hover:border-muted-foreground/50'
                        }`}
                      >
                        <img
                          src={imagem}
                          alt={`${propriedade.nome} miniatura ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-56 sm:h-72 lg:h-96 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Sem imagem</span>
              </div>
            )}
          </div>

          {/* Detalhes */}
          <div className="space-y-4 lg:space-y-6 min-w-0">
            <div>
              <div className="flex flex-wrap items-start gap-2 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold break-words">{propriedade.nome}</h1>
                {propriedade.destaque && (
                  <Badge className="bg-primary/90 text-primary-foreground">
                    <Star className="w-3 h-3 mr-1" />
                    Destaque
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{propriedade.tipo_propriedade}</Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {propriedade.cidade}, {propriedade.estado}
                </div>
              </div>

              <div className="mb-4">
                <ShareButtons
                  url={`/propriedade/${propriedade.id}`}
                  title={propriedade.nome}
                  description={`${propriedade.tipo_propriedade} em ${propriedade.cidade}, ${propriedade.estado}`}
                />
              </div>
            </div>

            {propriedade.descricao && (
              <DescricaoCard descricao={propriedade.descricao} t={t} />
            )}

            {/* Informações da propriedade */}
            <div className="grid grid-cols-2 gap-3">
              {propriedade.tamanho_hectares && (
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <TreePine className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Tamanho</p>
                      <p className="font-semibold">{propriedade.tamanho_hectares} hectares</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {propriedade.capacidade_visitantes && (
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Capacidade</p>
                      <p className="font-semibold">{propriedade.capacidade_visitantes} visitantes</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {propriedade.preco_visita && (
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <Coins className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Preço da visita</p>
                      <p className="font-semibold">R$ {propriedade.preco_visita.toFixed(2)}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {propriedade.horario_funcionamento && (
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Horário</p>
                      <p className="font-semibold text-sm">{propriedade.horario_funcionamento}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Atividades */}
            {propriedade.atividades && propriedade.atividades.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Atividades</h3>
                  <div className="flex flex-wrap gap-2">
                    {propriedade.atividades.map((atividade, index) => (
                      <Badge key={index} variant="outline">
                        {atividade}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Infraestrutura */}
            {propriedade.infraestrutura && propriedade.infraestrutura.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Infraestrutura</h3>
                  <div className="flex flex-wrap gap-2">
                    {propriedade.infraestrutura.map((item, index) => (
                      <Badge key={index} variant="secondary">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contato */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Contato</h3>
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    {propriedade.endereco}
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {(propriedade.instagram || contactInfo?.instagram) && (
                      <button 
                        onClick={() => handleContactAction('instagram', propriedade.instagram || contactInfo?.instagram || '')}
                        className="flex items-center gap-2 px-3 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors text-sm"
                      >
                        <Instagram className="w-4 h-4" />
                        Instagram
                      </button>
                    )}
                    
                    {contactInfo?.email && (
                      <button 
                        onClick={() => handleContactAction('email', contactInfo.email!)}
                        className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                      >
                        <Mail className="w-4 h-4" />
                        Email
                      </button>
                    )}
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

export default PropriedadeDetalhes;