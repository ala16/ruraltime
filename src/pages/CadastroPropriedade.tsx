import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, MapPin, Phone, Mail, Globe, Clock, Users, DollarSign } from "lucide-react";

const CadastroPropriedade = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    endereco: "",
    cidade: "",
    estado: "SP",
    cep: "",
    telefone: "",
    email: "",
    website: "",
    tipo_propriedade: "",
    tamanho_hectares: "",
    preco_visita: "",
    capacidade_visitantes: "",
    horario_funcionamento: "",
    atividades: [] as string[],
    infraestrutura: [] as string[],
    latitude: "",
    longitude: ""
  });

  const tiposPropriedade = [
    "Fazenda",
    "Sítio",
    "Chácara",
    "Rancho",
    "Estância",
    "Haras",
    "Pesqueiro",
    "Apiário",
    "Vinícola",
    "Outros"
  ];

  const atividadesDisponiveis = [
    "Trilhas ecológicas",
    "Passeios a cavalo",
    "Pesca esportiva",
    "Ordenha de vacas",
    "Colheita de frutas",
    "Culinária rural",
    "Observação de aves",
    "Camping",
    "Hospedagem rural",
    "Produção de queijos",
    "Apicultura",
    "Degustação de vinhos"
  ];

  const infraestruturaDisponivel = [
    "Restaurante",
    "Lanchonete",
    "Estacionamento",
    "Banheiros",
    "Hospedagem",
    "Piscina",
    "Playground",
    "Salão de eventos",
    "Wi-Fi",
    "Ar condicionado",
    "Churrasqueira",
    "Área de camping"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: 'atividades' | 'infraestrutura', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Erro",
          description: "Você precisa estar logado para cadastrar uma propriedade.",
          variant: "destructive"
        });
        return;
      }

      const propriedadeData = {
        ...formData,
        user_id: user.id,
        tamanho_hectares: formData.tamanho_hectares ? parseFloat(formData.tamanho_hectares) : null,
        preco_visita: formData.preco_visita ? parseFloat(formData.preco_visita) : null,
        capacidade_visitantes: formData.capacidade_visitantes ? parseInt(formData.capacidade_visitantes) : null,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null
      };

      const { error } = await supabase
        .from('propriedades')
        .insert([propriedadeData]);

      if (error) throw error;

      toast({
        title: "Sucesso!",
        description: "Propriedade cadastrada com sucesso.",
      });

      navigate('/');
    } catch (error) {
      console.error('Erro ao cadastrar propriedade:', error);
      toast({
        title: "Erro",
        description: "Erro ao cadastrar propriedade. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-rural-cream py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold text-primary mb-2">
            Cadastro de Propriedade Rural
          </h1>
          <p className="text-muted-foreground">
            Cadastre sua propriedade para oferecer experiências de turismo rural autênticas
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6">
            {/* Informações Básicas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Informações Básicas
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nome">Nome da Propriedade *</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => handleInputChange('nome', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="tipo_propriedade">Tipo de Propriedade *</Label>
                    <Select
                      value={formData.tipo_propriedade}
                      onValueChange={(value) => handleInputChange('tipo_propriedade', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {tiposPropriedade.map((tipo) => (
                          <SelectItem key={tipo} value={tipo}>
                            {tipo}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e) => handleInputChange('descricao', e.target.value)}
                    placeholder="Descreva sua propriedade e as experiências que oferece..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Localização */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Localização
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div>
                  <Label htmlFor="endereco">Endereço *</Label>
                  <Input
                    id="endereco"
                    value={formData.endereco}
                    onChange={(e) => handleInputChange('endereco', e.target.value)}
                    required
                  />
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="cidade">Cidade *</Label>
                    <Input
                      id="cidade"
                      value={formData.cidade}
                      onChange={(e) => handleInputChange('cidade', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="estado">Estado</Label>
                    <Input
                      id="estado"
                      value={formData.estado}
                      onChange={(e) => handleInputChange('estado', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cep">CEP</Label>
                    <Input
                      id="cep"
                      value={formData.cep}
                      onChange={(e) => handleInputChange('cep', e.target.value)}
                      placeholder="00000-000"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="latitude">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      Latitude (Coordenada Geográfica)
                    </Label>
                    <Input
                      id="latitude"
                      type="number"
                      step="any"
                      value={formData.latitude}
                      onChange={(e) => handleInputChange('latitude', e.target.value)}
                      placeholder="-23.123456"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Use Google Maps para obter as coordenadas exatas
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="longitude">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      Longitude (Coordenada Geográfica)
                    </Label>
                    <Input
                      id="longitude"
                      type="number"
                      step="any"
                      value={formData.longitude}
                      onChange={(e) => handleInputChange('longitude', e.target.value)}
                      placeholder="-46.123456"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Copie e cole as coordenadas do Google Maps
                    </p>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-2">
                  <p className="text-sm text-blue-800 mb-2">
                    <strong>Como obter as coordenadas:</strong>
                  </p>
                  <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                    <li>Abra o Google Maps</li>
                    <li>Busque pelo endereço da sua propriedade</li>
                    <li>Clique com o botão direito no local exato</li>
                    <li>Clique nas coordenadas que aparecem no topo</li>
                    <li>Cole a primeira coordenada em Latitude e a segunda em Longitude</li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            {/* Contato */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Informações de Contato
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="telefone">
                      <Phone className="inline h-4 w-4 mr-1" />
                      Telefone
                    </Label>
                    <Input
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) => handleInputChange('telefone', e.target.value)}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">
                      <Mail className="inline h-4 w-4 mr-1" />
                      E-mail
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="contato@propriedade.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">
                      <Globe className="inline h-4 w-4 mr-1" />
                      Website
                    </Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      placeholder="https://www.propriedade.com"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detalhes da Propriedade */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Detalhes da Propriedade
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="tamanho_hectares">Tamanho (hectares)</Label>
                    <Input
                      id="tamanho_hectares"
                      type="number"
                      step="0.1"
                      value={formData.tamanho_hectares}
                      onChange={(e) => handleInputChange('tamanho_hectares', e.target.value)}
                      placeholder="10.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="preco_visita">
                      <DollarSign className="inline h-4 w-4 mr-1" />
                      Preço da Visita (R$)
                    </Label>
                    <Input
                      id="preco_visita"
                      type="number"
                      step="0.01"
                      value={formData.preco_visita}
                      onChange={(e) => handleInputChange('preco_visita', e.target.value)}
                      placeholder="50.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="capacidade_visitantes">
                      <Users className="inline h-4 w-4 mr-1" />
                      Capacidade de Visitantes
                    </Label>
                    <Input
                      id="capacidade_visitantes"
                      type="number"
                      value={formData.capacidade_visitantes}
                      onChange={(e) => handleInputChange('capacidade_visitantes', e.target.value)}
                      placeholder="20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="horario_funcionamento">
                      <Clock className="inline h-4 w-4 mr-1" />
                      Horário de Funcionamento
                    </Label>
                    <Input
                      id="horario_funcionamento"
                      value={formData.horario_funcionamento}
                      onChange={(e) => handleInputChange('horario_funcionamento', e.target.value)}
                      placeholder="8h às 17h"
                    />
                  </div>
                </div>

                <div>
                  <Label>Atividades Oferecidas</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {atividadesDisponiveis.map((atividade) => (
                      <label key={atividade} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.atividades.includes(atividade)}
                          onChange={() => handleArrayChange('atividades', atividade)}
                          className="rounded border-input"
                        />
                        <span className="text-sm">{atividade}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Infraestrutura Disponível</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {infraestruturaDisponivel.map((item) => (
                      <label key={item} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.infraestrutura.includes(item)}
                          onChange={() => handleArrayChange('infraestrutura', item)}
                          className="rounded border-input"
                        />
                        <span className="text-sm">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/')}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1"
              >
                {loading ? "Cadastrando..." : "Cadastrar Propriedade"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroPropriedade;