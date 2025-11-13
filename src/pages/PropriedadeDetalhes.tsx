import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Star, Mail, Phone, MapPin, Instagram, MessageCircle, Globe, TreePine, Users, Clock, Coins } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { ShareButtons } from '@/components/ShareButtons';

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

const PropriedadeDetalhes = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [propriedade, setPropriedade] = useState<Propriedade | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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

  const handleContactAction = (type: 'phone' | 'email' | 'website' | 'whatsapp' | 'instagram', value: string) => {
    const whatsappMessage = encodeURIComponent('Olá vi a sua propriedade de turismo rural no site da www.ruraltime.com.br gostaria de agendar uma visita turística.');
    
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
            {propriedade.imagens && propriedade.imagens.length > 0 ? (
              <>
                <div className="w-full">
                  <img
                    src={propriedade.imagens[selectedImageIndex]}
                    alt={`${propriedade.nome} - ${selectedImageIndex + 1}`}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </div>
                
                {propriedade.imagens.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {propriedade.imagens.map((imagem, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImageIndex === index 
                            ? 'border-primary shadow-lg' 
                            : 'border-transparent hover:border-muted-foreground/50'
                        }`}
                      >
                        <img
                          src={imagem}
                          alt={`${propriedade.nome} miniatura ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
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
                <h1 className="text-3xl font-bold">{propriedade.nome}</h1>
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
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Sobre</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {propriedade.descricao}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Informações da propriedade */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    {(propriedade.whatsapp || contactInfo?.whatsapp) && (
                      <button 
                        onClick={() => handleContactAction('whatsapp', propriedade.whatsapp || contactInfo?.whatsapp || '')}
                        className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                      >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </button>
                    )}
                    
                    {(propriedade.instagram || contactInfo?.instagram) && (
                      <button 
                        onClick={() => handleContactAction('instagram', propriedade.instagram || contactInfo?.instagram || '')}
                        className="flex items-center gap-2 px-3 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors text-sm"
                      >
                        <Instagram className="w-4 h-4" />
                        Instagram
                      </button>
                    )}
                    
                    {contactInfo?.telefone && (
                      <button 
                        onClick={() => handleContactAction('phone', contactInfo.telefone!)}
                        className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                      >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
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
                    
                    {contactInfo?.website && (
                      <button 
                        onClick={() => handleContactAction('website', contactInfo.website!)}
                        className="flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm"
                      >
                        <Globe className="w-4 h-4" />
                        Website
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