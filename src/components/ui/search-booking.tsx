import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { CalendarIcon, MapPin, Clock, Users, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface SearchBookingProps {
  className?: string;
}

interface Propriedade {
  id: string;
  nome: string;
  cidade: string;
  telefone?: string;
}

export function SearchBooking({ className }: SearchBookingProps) {
  const [destino, setDestino] = useState("");
  const [data, setData] = useState<Date>();
  const [horario, setHorario] = useState("");
  const [numPessoas, setNumPessoas] = useState("");
  const [propriedades, setPropriedades] = useState<Propriedade[]>([]);
  const [sugestoes, setSugestoes] = useState<Propriedade[]>([]);
  const [showSugestoes, setShowSugestoes] = useState(false);
  const [showTodosDestinos, setShowTodosDestinos] = useState(false);

  useEffect(() => {
    carregarPropriedades();
  }, []);

  const carregarPropriedades = async () => {
    try {
      const { data: props, error } = await supabase
        .from('propriedades')
        .select('id, nome, cidade, telefone')
        .eq('ativo', true)
        .order('nome');

      if (error) {
        console.error('Erro ao carregar propriedades:', error);
        return;
      }

      setPropriedades(props || []);
    } catch (error) {
      console.error('Erro ao carregar propriedades:', error);
    }
  };

  const handleDestinoChange = (value: string) => {
    setDestino(value);
    
    if (value.length >= 3) {
      const filtradas = propriedades.filter(prop => 
        prop.nome.toLowerCase().includes(value.toLowerCase()) ||
        prop.cidade.toLowerCase().includes(value.toLowerCase())
      );
      setSugestoes(filtradas);
      setShowSugestoes(true);
    } else {
      setShowSugestoes(false);
    }
  };

  const selecionarDestino = (propriedade: Propriedade) => {
    setDestino(propriedade.nome);
    setShowSugestoes(false);
    setShowTodosDestinos(false);
  };

  const handleBuscar = async () => {
    if (!destino || !data || !horario || !numPessoas) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos para continuar.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Buscar a propriedade selecionada
      const propriedadeSelecionada = propriedades.find(prop => 
        prop.nome.toLowerCase() === destino.toLowerCase()
      );

      if (!propriedadeSelecionada) {
        toast({
          title: "Propriedade não encontrada",
          description: "Por favor, selecione uma propriedade da lista.",
          variant: "destructive",
        });
        return;
      }

      if (!propriedadeSelecionada.telefone) {
        toast({
          title: "Contato não disponível",
          description: "Esta propriedade não tem telefone cadastrado.",
          variant: "destructive",
        });
        return;
      }

      // Gerar mensagem personalizada
      const dataFormatada = format(data, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
      
      const mensagem = `Olá! Gostaria de agendar uma visita no *${propriedadeSelecionada.nome}*.

📅 Data: ${dataFormatada}
🕐 Horário: ${horario}
👥 Número de pessoas: ${numPessoas}

Poderia me informar sobre disponibilidade e valores?

Mensagem enviada através do Rural Time.`;

      const telefone = propriedadeSelecionada.telefone.replace(/\D/g, '');
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
    <Card className={cn("p-6 bg-card/95 backdrop-blur-sm border-primary/20", className)}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* Destino */}
        <div className="space-y-2 relative">
          <label className="text-sm font-medium text-card-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Destino
          </label>
          <div className="relative">
            <Input
              placeholder="Digite o nome da propriedade..."
              value={destino}
              onChange={(e) => handleDestinoChange(e.target.value)}
              onFocus={() => destino.length >= 3 && setShowSugestoes(true)}
              className="bg-background/80 pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowTodosDestinos(!showTodosDestinos)}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          {/* Sugestões de autocomplete */}
          {showSugestoes && sugestoes.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-auto">
              {sugestoes.map((prop) => (
                <button
                  key={prop.id}
                  onClick={() => selecionarDestino(prop)}
                  className="w-full text-left px-4 py-2 hover:bg-muted transition-colors border-b border-border/50 last:border-b-0"
                >
                  <div className="font-medium text-popover-foreground">{prop.nome}</div>
                  <div className="text-sm text-muted-foreground">{prop.cidade}</div>
                </button>
              ))}
            </div>
          )}

          {/* Lista de todos os destinos */}
          {showTodosDestinos && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-auto">
              <div className="px-4 py-2 bg-muted/50 border-b border-border">
                <span className="text-sm font-medium text-popover-foreground">Propriedades Disponíveis</span>
              </div>
              {propriedades.map((prop) => (
                <button
                  key={prop.id}
                  onClick={() => selecionarDestino(prop)}
                  className="w-full text-left px-4 py-2 hover:bg-muted transition-colors border-b border-border/50 last:border-b-0"
                >
                  <div className="font-medium text-popover-foreground">{prop.nome}</div>
                  <div className="text-sm text-muted-foreground">{prop.cidade}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Data */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-card-foreground flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            Data
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-background/80",
                  !data && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data ? format(data, "dd/MM/yyyy") : "Selecione"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={data}
                onSelect={setData}
                disabled={(date) => date < new Date()}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Horário */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-card-foreground flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Horário
          </label>
          <Select value={horario} onValueChange={setHorario}>
            <SelectTrigger className="bg-background/80">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="07:00">07:00</SelectItem>
              <SelectItem value="08:00">08:00</SelectItem>
              <SelectItem value="09:00">09:00</SelectItem>
              <SelectItem value="10:00">10:00</SelectItem>
              <SelectItem value="11:00">11:00</SelectItem>
              <SelectItem value="13:00">13:00</SelectItem>
              <SelectItem value="14:00">14:00</SelectItem>
              <SelectItem value="15:00">15:00</SelectItem>
              <SelectItem value="16:00">16:00</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Número de Pessoas */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-card-foreground flex items-center gap-2">
            <Users className="h-4 w-4" />
            Pessoas
          </label>
          <Select value={numPessoas} onValueChange={setNumPessoas}>
            <SelectTrigger className="bg-background/80">
              <SelectValue placeholder="Qtd" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} pessoa{num > 1 ? 's' : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Botão de Busca */}
      <div className="mt-6 flex justify-center">
        <Button 
          onClick={handleBuscar}
          size="lg"
          className="px-12 py-3 text-lg bg-gradient-primary hover:opacity-90 transition-opacity"
        >
          Enviar Solicitação via WhatsApp
        </Button>
      </div>
    </Card>
  );
}