import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Users, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AnimatedStatCard } from '@/components/ui/animated-stat-card';

interface Propriedade {
  id: string;
  nome: string;
  cidade: string;
  telefone?: string;
}

interface Stats {
  atrativos: number;
  cidades: number;
  artesaos: number;
  acessos: number;
}

export const ModernBookingBar = () => {
  const [propriedades, setPropriedades] = useState<Propriedade[]>([]);
  const [stats, setStats] = useState<Stats>({
    atrativos: 0,
    cidades: 0,
    artesaos: 0,
    acessos: 0
  });
  const [searchData, setSearchData] = useState({
    destination: '',
    date: '',
    guests: ''
  });

  useEffect(() => {
    carregarPropriedades();
    carregarEstatisticas();
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

  const carregarEstatisticas = async () => {
    try {
      // Contar atrativos (propriedades ativas)
      const { count: atrativos } = await supabase
        .from('propriedades')
        .select('*', { count: 'exact', head: true })
        .eq('ativo', true);

      // Contar cidades únicas
      const { data: cidadesData } = await supabase
        .from('propriedades')
        .select('cidade')
        .eq('ativo', true);
      
      const cidadesUnicas = new Set(cidadesData?.map(p => p.cidade) || []);

      // Contar artesãos
      const { count: artesaos } = await supabase
        .from('artesanatos')
        .select('*', { count: 'exact', head: true })
        .eq('disponivel', true);

      // Calcular acessos únicos: começa em 3391 e aumenta 19 por dia
      const dataInicial = new Date('2025-01-01');
      const hoje = new Date();
      const diasPassados = Math.floor((hoje.getTime() - dataInicial.getTime()) / (1000 * 60 * 60 * 24));
      const totalAcessos = 3391 + (diasPassados * 19);

      setStats({
        atrativos: (atrativos || 0) * 2,
        cidades: cidadesUnicas.size,
        artesaos: artesaos || 0,
        acessos: totalAcessos
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchData.destination || !searchData.date || !searchData.guests) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos para continuar.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Buscar a propriedade selecionada
      const propriedadeSelecionada = propriedades.find(prop => prop.id === searchData.destination);

      if (!propriedadeSelecionada) {
        toast({
          title: "Propriedade não encontrada",
          description: "Por favor, selecione uma propriedade da lista.",
          variant: "destructive",
        });
        return;
      }

      // Buscar informações de contato da propriedade
      const { data: contactInfo, error } = await supabase
        .rpc('get_property_contact_info', { property_id: propriedadeSelecionada.id });

      if (error || !contactInfo?.[0]?.telefone) {
        toast({
          title: "Contato não disponível",
          description: "Esta propriedade não tem telefone cadastrado.",
          variant: "destructive",
        });
        return;
      }

      // Gerar mensagem personalizada
      const dataObj = new Date(searchData.date);
      const dataFormatada = format(dataObj, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
      
      const mensagem = `Olá! Gostaria de agendar uma visita no *${propriedadeSelecionada.nome}*.

📅 Data: ${dataFormatada}
👥 Número de pessoas: ${searchData.guests}

Poderia me informar sobre disponibilidade, horários e valores?

Mensagem enviada através do Rural Time.`;

      const telefone = contactInfo[0].telefone.replace(/\D/g, '');
      const mensagemEncoded = encodeURIComponent(mensagem);
      const whatsappUrl = `https://wa.me/55${telefone}?text=${mensagemEncoded}`;
      
      window.open(whatsappUrl, '_blank');

      toast({
        title: "Mensagem enviada!",
        description: `Sua solicitação foi enviada para ${propriedadeSelecionada.nome} via WhatsApp.`,
      });

    } catch (error) {
      console.error('Erro ao processar busca:', error);
      toast({
        title: "Erro",
        description: "Erro ao processar sua solicitação. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-rural-neutral to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 bg-rural-secondary/10 rounded-full mb-4">
            <Calendar className="w-4 h-4 text-rural-secondary mr-2" />
            <span className="text-rural-secondary font-medium">Reserve sua Experiência</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-rural-primary mb-4">
            Agende seus Atrativos Turísticos
          </h2>
          <p className="text-rural-text-light text-lg max-w-2xl mx-auto">
            Encontre e reserve as melhores experiências rurais do Brasil
          </p>
        </div>

        {/* Booking Form */}
        <Card className="glass-dark backdrop-blur-xl border-white/20 shadow-xl-soft hover-lift">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
              
              {/* Destino */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Destino
                </label>
                <Select onValueChange={(value) => setSearchData({...searchData, destination: value})}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 h-12">
                    <SelectValue placeholder="Escolha a propriedade" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border z-50 max-h-64 overflow-y-auto">
                    {propriedades.map((propriedade) => (
                      <SelectItem key={propriedade.id} value={propriedade.id} className="cursor-pointer">
                        <div className="flex flex-col">
                          <div className="font-medium text-foreground">{propriedade.nome}</div>
                          <div className="text-sm text-muted-foreground">{propriedade.cidade}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

            {/* Quick Links */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <div className="flex flex-wrap gap-3 justify-center">
                <span className="text-white/70 text-sm">Buscar por:</span>
                {['Trilhas', 'Fazendas', 'Artesanato', 'Gastronomia'].map((tag) => (
                  <button
                    key={tag}
                    className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white/90 text-sm rounded-full transition-colors border border-white/20"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          <AnimatedStatCard
            value={stats.atrativos}
            label="Atrativos Turísticos Rurais"
            suffix="+"
            color="hsl(142, 72%, 29%)"
            maxValue={50}
            delay={0}
          />
          
          <AnimatedStatCard
            value={stats.cidades}
            label="Cidades Parceiras"
            suffix=""
            color="hsl(142, 72%, 35%)"
            maxValue={20}
            delay={200}
          />

          <AnimatedStatCard
            value={stats.artesaos}
            label="Artesãos Cadastrados"
            suffix="+"
            color="hsl(142, 72%, 40%)"
            maxValue={30}
            delay={400}
          />

          <AnimatedStatCard
            value={stats.acessos}
            label="Acessos Totais"
            suffix="+"
            color="hsl(142, 72%, 45%)"
            maxValue={15000}
            delay={600}
          />
        </div>
      </div>
    </section>
  );
};