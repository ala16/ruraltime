import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Users, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';


interface Propriedade {
  id: string;
  nome: string;
  cidade: string;
  telefone?: string;
  whatsapp?: string;
}


export const ModernBookingBar = () => {
  const navigate = useNavigate();
  const [propriedades, setPropriedades] = useState<Propriedade[]>([]);
  const [destinoText, setDestinoText] = useState('');
  const [selectedPropId, setSelectedPropId] = useState('');
  const [sugestoes, setSugestoes] = useState<Propriedade[]>([]);
  const [showSugestoes, setShowSugestoes] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const [searchData, setSearchData] = useState({
    destination: '',
    date: '',
    guests: ''
  });

  useEffect(() => {
    carregarPropriedades();
  }, []);

  const carregarPropriedades = async () => {
    try {
      const { data, error } = await supabase.rpc('get_property_public_view');
      
      if (error) {
        console.error('Erro ao carregar propriedades:', error);
        return;
      }

      // Transformar os dados para o formato necessário
      const propriedadesFormatadas = data?.map((prop: any) => ({
        id: prop.id,
        nome: prop.nome,
        cidade: prop.cidade,
        telefone: null // Será obtido quando necessário
      })) || [];

      setPropriedades(propriedadesFormatadas);
    } catch (error) {
      console.error('Erro ao carregar propriedades:', error);
    }
  };

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setShowSugestoes(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDestinoChange = (value: string) => {
    setDestinoText(value);
    setSelectedPropId('');
    setSearchData(prev => ({ ...prev, destination: '' }));

    if (value.length >= 2) {
      const filtradas = propriedades.filter(prop =>
        prop.nome.toLowerCase().includes(value.toLowerCase()) ||
        prop.cidade.toLowerCase().includes(value.toLowerCase())
      );
      setSugestoes(filtradas);
      setShowSugestoes(filtradas.length > 0);
    } else {
      setShowSugestoes(false);
    }
  };

  const selecionarDestino = (prop: Propriedade) => {
    setDestinoText(prop.nome);
    setSelectedPropId(prop.id);
    setSearchData(prev => ({ ...prev, destination: prop.id }));
    setShowSugestoes(false);
  };


  const handleSearch = () => {
    if (!searchData.destination) {
      toast({
        title: "Selecione um destino",
        description: "Por favor, selecione uma propriedade da lista.",
        variant: "destructive",
      });
      return;
    }

    const params = new URLSearchParams();
    if (searchData.date) params.set('date', searchData.date);
    if (searchData.guests) params.set('guests', searchData.guests);
    
    const queryString = params.toString();
    navigate(`/propriedade/${searchData.destination}${queryString ? `?${queryString}` : ''}`);
  };

  return (
    <section className="py-6 bg-gradient-to-br from-rural-neutral to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-6 animate-fade-in">
          <div className="inline-flex items-center px-4 py-1.5 bg-rural-secondary/10 rounded-full mb-2">
            <Calendar className="w-4 h-4 text-rural-secondary mr-2" />
            <span className="text-rural-secondary font-medium text-sm">Reserve sua Experiência</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-rural-primary mb-2">
            Agende seus Atrativos Turísticos
          </h2>
          <p className="text-rural-text-light max-w-2xl mx-auto">
            Encontre e reserve as melhores experiências rurais do Brasil
          </p>
        </div>

        {/* Booking Form */}
        <Card className="glass-dark backdrop-blur-xl border-white/20 shadow-xl-soft hover-lift">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
              
              {/* Destino */}
              <div className="space-y-2 relative" ref={suggestionsRef}>
                <label className="text-sm font-medium text-white/90 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Destino
                </label>
                <Input
                  placeholder="Digite o nome da propriedade..."
                  value={destinoText}
                  onChange={(e) => handleDestinoChange(e.target.value)}
                  onFocus={() => {
                    if (destinoText.length >= 2) {
                      const filtradas = propriedades.filter(prop =>
                        prop.nome.toLowerCase().includes(destinoText.toLowerCase()) ||
                        prop.cidade.toLowerCase().includes(destinoText.toLowerCase())
                      );
                      setSugestoes(filtradas);
                      setShowSugestoes(filtradas.length > 0);
                    }
                  }}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 h-12"
                />
                {showSugestoes && sugestoes.length > 0 && (
                  <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-auto">
                    {sugestoes.map((prop) => (
                      <button
                        key={prop.id}
                        onClick={() => selecionarDestino(prop)}
                        className="w-full text-left px-4 py-2.5 hover:bg-muted transition-colors border-b border-border/50 last:border-b-0"
                      >
                        <div className="font-medium text-popover-foreground text-sm">{prop.nome}</div>
                        <div className="text-xs text-muted-foreground">{prop.cidade}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Data */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Data da Visita
                </label>
                <Input
                  type="date"
                  value={searchData.date}
                  onChange={(e) => setSearchData({...searchData, date: e.target.value})}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 h-12 [color-scheme:dark]"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Número de Pessoas */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Pessoas
                </label>
                <Select onValueChange={(value) => setSearchData({...searchData, guests: value})}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 h-12">
                    <SelectValue placeholder="Quantas pessoas?" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border z-50">
                    {[1,2,3,4,5,6,7,8,9,10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'pessoa' : 'pessoas'}
                      </SelectItem>
                    ))}
                    <SelectItem value="10+">Mais de 10 pessoas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Botão de Busca */}
              <div className="space-y-2">
                <div className="h-6"></div> {/* Spacer for alignment */}
                <Button 
                  onClick={handleSearch}
                  className="w-full btn-modern bg-gradient-secondary hover:bg-gradient-primary text-rural-secondary-foreground px-8 py-3 h-12 text-lg font-semibold shadow-glow"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Buscar
                </Button>
              </div>
            </div>

          </CardContent>
        </Card>

      </div>
    </section>
  );
};