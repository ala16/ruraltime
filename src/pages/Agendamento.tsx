import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  ArrowLeft, 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  MessageCircle,
  MapPin,
  Phone
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Propriedade {
  id: string;
  nome: string;
  telefone: string;
  atividades: string[];
  cidade: string;
  estado: string;
}

const Agendamento = () => {
  const navigate = useNavigate();
  const { propriedadeId } = useParams();
  const { toast } = useToast();
  
  const [propriedade, setPropriedade] = useState<Propriedade | null>(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    horario: "",
    numeroIntegrantes: "",
    atividade: "",
    nomeContato: "",
    telefoneContato: ""
  });

  const horariosDisponiveis = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00"
  ];

  useEffect(() => {
    if (propriedadeId) {
      buscarPropriedade();
    }
  }, [propriedadeId]);

  const buscarPropriedade = async () => {
    try {
      const { data, error } = await supabase
        .from('propriedades')
        .select('id, nome, telefone, atividades, cidade, estado')
        .eq('id', propriedadeId)
        .eq('ativo', true)
        .single();

      if (error) throw error;
      setPropriedade(data);
    } catch (error) {
      console.error('Erro ao buscar propriedade:', error);
      toast({
        title: "Erro",
        description: "Propriedade não encontrada.",
        variant: "destructive"
      });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const gerarMensagemWhatsApp = () => {
    if (!date || !formData.horario || !formData.numeroIntegrantes || !formData.atividade || !formData.nomeContato) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const dataFormatada = format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    
    const mensagem = `Olá! Gostaria de agendar uma atividade rural.

*Dados do agendamento:*
• Atividade: ${formData.atividade}
• Data: ${dataFormatada}
• Horário: ${formData.horario}
• Número de pessoas: ${formData.numeroIntegrantes}
• Nome do contato: ${formData.nomeContato}
${formData.telefoneContato ? `• Telefone: ${formData.telefoneContato}` : ''}

Gostaria de confirmar a disponibilidade para essa data e horário.

Obrigado!`;

    const telefoneFormatado = propriedade?.telefone?.replace(/\D/g, '') || '';
    const whatsappUrl = `https://wa.me/55${telefoneFormatado}?text=${encodeURIComponent(mensagem)}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Mensagem enviada!",
      description: "Você será redirecionado para o WhatsApp da propriedade.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-rural-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  if (!propriedade) {
    return (
      <div className="min-h-screen bg-rural-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Propriedade não encontrada</h2>
          <Button onClick={() => navigate('/')}>
            Voltar ao início
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rural-cream py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-primary mb-2">
              Agendar Atividade Rural
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <MapPin className="h-4 w-4" />
              <span className="font-semibold">{propriedade.nome}</span>
              <span>• {propriedade.cidade}, {propriedade.estado}</span>
            </div>
            {propriedade.telefone && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{propriedade.telefone}</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Seleção de Data */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Selecionar Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < new Date()}
                className={cn("w-full pointer-events-auto")}
                locale={ptBR}
              />
            </CardContent>
          </Card>

          {/* Detalhes do Agendamento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Detalhes do Agendamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Horário */}
              <div>
                <Label htmlFor="horario">Horário *</Label>
                <Select
                  value={formData.horario}
                  onValueChange={(value) => handleInputChange('horario', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o horário" />
                  </SelectTrigger>
                  <SelectContent>
                    {horariosDisponiveis.map((horario) => (
                      <SelectItem key={horario} value={horario}>
                        {horario}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Número de Integrantes */}
              <div>
                <Label htmlFor="numeroIntegrantes">
                  <Users className="inline h-4 w-4 mr-1" />
                  Número de Pessoas *
                </Label>
                <Input
                  id="numeroIntegrantes"
                  type="number"
                  min="1"
                  max="50"
                  value={formData.numeroIntegrantes}
                  onChange={(e) => handleInputChange('numeroIntegrantes', e.target.value)}
                  placeholder="Ex: 5"
                />
              </div>

              {/* Atividade */}
              <div>
                <Label htmlFor="atividade">Atividade Desejada *</Label>
                <Select
                  value={formData.atividade}
                  onValueChange={(value) => handleInputChange('atividade', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a atividade" />
                  </SelectTrigger>
                  <SelectContent>
                    {propriedade.atividades?.map((atividade) => (
                      <SelectItem key={atividade} value={atividade}>
                        {atividade}
                      </SelectItem>
                    ))}
                    {(!propriedade.atividades || propriedade.atividades.length === 0) && (
                      <SelectItem value="Visita geral">Visita geral à propriedade</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Nome do Contato */}
              <div>
                <Label htmlFor="nomeContato">Seu Nome *</Label>
                <Input
                  id="nomeContato"
                  value={formData.nomeContato}
                  onChange={(e) => handleInputChange('nomeContato', e.target.value)}
                  placeholder="Digite seu nome"
                />
              </div>

              {/* Telefone do Contato */}
              <div>
                <Label htmlFor="telefoneContato">Seu Telefone (opcional)</Label>
                <Input
                  id="telefoneContato"
                  value={formData.telefoneContato}
                  onChange={(e) => handleInputChange('telefoneContato', e.target.value)}
                  placeholder="(11) 99999-9999"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resumo e Envio */}
        {date && formData.horario && formData.numeroIntegrantes && formData.atividade && formData.nomeContato && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Resumo do Agendamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg mb-4">
                <h4 className="font-semibold mb-2">Detalhes:</h4>
                <ul className="space-y-1 text-sm">
                  <li><strong>Propriedade:</strong> {propriedade.nome}</li>
                  <li><strong>Atividade:</strong> {formData.atividade}</li>
                  <li><strong>Data:</strong> {format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</li>
                  <li><strong>Horário:</strong> {formData.horario}</li>
                  <li><strong>Número de pessoas:</strong> {formData.numeroIntegrantes}</li>
                  <li><strong>Contato:</strong> {formData.nomeContato}</li>
                  {formData.telefoneContato && (
                    <li><strong>Telefone:</strong> {formData.telefoneContato}</li>
                  )}
                </ul>
              </div>
              
              <Button
                onClick={gerarMensagemWhatsApp}
                className="w-full"
                size="lg"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Enviar Solicitação via WhatsApp
              </Button>
              
              <p className="text-sm text-muted-foreground text-center mt-2">
                Você será redirecionado para o WhatsApp da propriedade com a mensagem pronta
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Agendamento;