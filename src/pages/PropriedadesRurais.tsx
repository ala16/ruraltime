import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Clock, 
  Users, 
  DollarSign,
  Calendar,
  Star,
  ImageIcon,
  Navigation
} from "lucide-react";

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
  has_contact: boolean;
  imagens: string[];
  latitude: number;
  longitude: number;
}

interface ContactInfo {
  telefone: string;
  email: string;
  website: string;
}

const PropriedadesRurais = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [propriedades, setPropriedades] = useState<Propriedade[]>([]);
  const [loading, setLoading] = useState(true);
  const [contactInfo, setContactInfo] = useState<Record<string, ContactInfo>>({});

  useEffect(() => {
    buscarPropriedades();
  }, []);

  const buscarPropriedades = async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_property_public_view')
        .order('destaque', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPropriedades(data || []);
    } catch (error) {
      console.error('Erro ao buscar propriedades:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar propriedades.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const buscarContato = async (propriedadeId: string) => {
    if (contactInfo[propriedadeId]) return;
    
    try {
      const { data, error } = await supabase
        .rpc('get_property_contact_info', { property_id: propriedadeId });

      if (error) throw error;
      if (data && data.length > 0) {
        setContactInfo(prev => ({
          ...prev,
          [propriedadeId]: data[0]
        }));
      }
    } catch (error) {
      console.error('Erro ao buscar contato:', error);
    }
  };

  const handleAgendar = (propriedadeId: string) => {
    navigate(`/agendamento/${propriedadeId}`);
  };

  const handleContactAction = async (propriedadeId: string, type: 'phone' | 'email' | 'website') => {
    // First ensure we have contact info
    if (!contactInfo[propriedadeId]) {
      await buscarContato(propriedadeId);
    }

    const contact = contactInfo[propriedadeId];
    if (!contact) return;

    switch (type) {
      case 'phone':
        if (contact.telefone) {
          // Format phone number for WhatsApp (remove special characters and add country code if needed)
          const phoneNumber = contact.telefone.replace(/\D/g, ''); // Remove non-digits
          const formattedNumber = phoneNumber.startsWith('55') ? phoneNumber : `55${phoneNumber}`;
          window.open(`https://wa.me/${formattedNumber}`, '_blank');
        }
        break;
      case 'email':
        if (contact.email) {
          window.open(`mailto:${contact.email}`);
        }
        break;
      case 'website':
        if (contact.website) {
          window.open(contact.website, '_blank');
        }
        break;
    }
  };

  const handleOpenGoogleMaps = (propriedade: Propriedade) => {
    if (propriedade.latitude && propriedade.longitude) {
      const url = `https://www.google.com/maps?q=${propriedade.latitude},${propriedade.longitude}`;
      window.open(url, '_blank');
    } else if (propriedade.endereco) {
      const address = `${propriedade.endereco}, ${propriedade.cidade}, ${propriedade.estado}`;
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
      window.open(url, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-rural-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Carregando propriedades...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rural-cream py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          
          <h1 className="text-3xl font-bold text-primary mb-2">
            Propriedades Rurais
          </h1>
          <p className="text-muted-foreground">
            Descubra experiências autênticas no turismo rural do Brasil
          </p>
        </div>

        {propriedades.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-4">Nenhuma propriedade encontrada</h3>
            <p className="text-muted-foreground mb-6">
              Ainda não temos propriedades cadastradas. Seja o primeiro!
            </p>
            <Button onClick={() => navigate('/cadastro-propriedade')}>
              Cadastrar Propriedade
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {propriedades.map((propriedade) => (
              <Card key={propriedade.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {propriedade.destaque && (
                  <div className="bg-gradient-primary text-white px-4 py-2">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-medium">Destaque</span>
                    </div>
                  </div>
                )}
                
                {/* Carrossel de Imagens */}
                {propriedade.imagens && propriedade.imagens.length > 0 ? (
                  <div className="relative">
                    {propriedade.imagens.length === 1 ? (
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={propriedade.imagens[0]} 
                          alt={`${propriedade.nome} - Imagem principal`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement?.classList.add('hidden');
                          }}
                        />
                      </div>
                    ) : (
                      <Carousel className="w-full">
                        <CarouselContent>
                          {propriedade.imagens.map((imagem, index) => (
                            <CarouselItem key={index}>
                              <div className="aspect-video relative overflow-hidden">
                                <img 
                                  src={imagem} 
                                  alt={`${propriedade.nome} - Imagem ${index + 1}`}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                  }}
                                />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-2" />
                        <CarouselNext className="right-2" />
                      </Carousel>
                    )}
                  </div>
                ) : (
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Nenhuma imagem disponível</p>
                    </div>
                  </div>
                )}

                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{propriedade.nome}</CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        {propriedade.tipo_propriedade}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{propriedade.cidade}, {propriedade.estado}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {propriedade.descricao && (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {propriedade.descricao}
                    </p>
                  )}

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {propriedade.preco_visita && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <span>R$ {propriedade.preco_visita.toFixed(2)}</span>
                      </div>
                    )}
                    
                    {propriedade.capacidade_visitantes && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span>Até {propriedade.capacidade_visitantes} pessoas</span>
                      </div>
                    )}
                    
                    {propriedade.horario_funcionamento && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{propriedade.horario_funcionamento}</span>
                      </div>
                    )}

                    {propriedade.tamanho_hectares && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{propriedade.tamanho_hectares} hectares</span>
                      </div>
                    )}
                  </div>

                  {propriedade.atividades && propriedade.atividades.length > 0 && (
                    <div>
                      <h4 className="font-medium text-sm mb-2">Atividades:</h4>
                      <div className="flex flex-wrap gap-1">
                        {propriedade.atividades.slice(0, 3).map((atividade, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {atividade}
                          </Badge>
                        ))}
                        {propriedade.atividades.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{propriedade.atividades.length - 3} mais
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={() => handleAgendar(propriedade.id)}
                      className="flex-1"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Agendar Visita
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => handleOpenGoogleMaps(propriedade)}
                      className="flex-1"
                    >
                      <Navigation className="mr-2 h-4 w-4" />
                      Ver no Mapa
                    </Button>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg">
                      <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                        🎁 Presente uma Experiência
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Compre um voucher de experiência rural como presente
                      </p>
                      <Link to={`/voucher/${propriedade.id}`}>
                        <Button variant="default" size="sm" className="w-full">
                          Comprar Voucher - R$ {propriedade.preco_visita?.toFixed(2).replace('.', ',') || '199,99'}
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {propriedade.has_contact && (
                    <div className="flex gap-2">
                      {!contactInfo[propriedade.id] ? (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => buscarContato(propriedade.id)}
                        >
                          Ver Informações de Contato
                        </Button>
                      ) : (
                        <>
                          {contactInfo[propriedade.id].telefone && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1"
                              onClick={() => handleContactAction(propriedade.id, 'phone')}
                            >
                              <Phone className="mr-1 h-3 w-3" />
                              Telefone
                            </Button>
                          )}
                          {contactInfo[propriedade.id].email && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1"
                              onClick={() => handleContactAction(propriedade.id, 'email')}
                            >
                              <Mail className="mr-1 h-3 w-3" />
                              E-mail
                            </Button>
                          )}
                          {contactInfo[propriedade.id].website && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1"
                              onClick={() => handleContactAction(propriedade.id, 'website')}
                            >
                              <Globe className="mr-1 h-3 w-3" />
                              Website
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropriedadesRurais;