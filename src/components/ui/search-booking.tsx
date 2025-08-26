import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { CalendarIcon, MapPin, Clock, Users } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface SearchBookingProps {
  className?: string;
}

export function SearchBooking({ className }: SearchBookingProps) {
  const [destino, setDestino] = useState("");
  const [data, setData] = useState<Date>();
  const [horario, setHorario] = useState("");
  const [numPessoas, setNumPessoas] = useState("");

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
      // Buscar propriedades da cidade selecionada
      const { data: propriedades, error } = await supabase
        .from('propriedades')
        .select('*')
        .eq('cidade', destino)
        .eq('ativo', true);

      if (error) {
        console.error('Erro ao buscar propriedades:', error);
        toast({
          title: "Erro",
          description: "Erro ao buscar propriedades. Tente novamente.",
          variant: "destructive",
        });
        return;
      }

      if (!propriedades || propriedades.length === 0) {
        toast({
          title: "Nenhuma propriedade encontrada",
          description: `Não encontramos propriedades em ${destino}. Tente outra cidade.`,
          variant: "destructive",
        });
        return;
      }

      // Gerar mensagem para todas as propriedades da cidade
      const dataFormatada = format(data, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
      
      const mensagem = `Olá! Gostaria de agendar uma visita para turismo rural em ${destino}.

📅 Data: ${dataFormatada}
🕐 Horário: ${horario}
👥 Número de pessoas: ${numPessoas}

Poderia me informar sobre disponibilidade e valores?

Mensagem enviada através do Rural Time.`;

      // Enviar para a primeira propriedade com telefone disponível
      const propriedadeComTelefone = propriedades.find(prop => prop.telefone);
      
      if (!propriedadeComTelefone || !propriedadeComTelefone.telefone) {
        toast({
          title: "Contato não disponível",
          description: "Nenhuma propriedade em " + destino + " tem telefone cadastrado.",
          variant: "destructive",
        });
        return;
      }

      const telefone = propriedadeComTelefone.telefone.replace(/\D/g, '');
      const mensagemEncoded = encodeURIComponent(mensagem);
      const whatsappUrl = `https://wa.me/55${telefone}?text=${mensagemEncoded}`;
      
      window.open(whatsappUrl, '_blank');

      toast({
        title: "Mensagem enviada!",
        description: `Sua solicitação foi enviada para ${propriedadeComTelefone.nome} via WhatsApp.`,
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
        <div className="space-y-2">
          <label className="text-sm font-medium text-card-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Destino
          </label>
          <Input
            placeholder="Ex: Atibaia, Bragança Paulista..."
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
            className="bg-background/80"
          />
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