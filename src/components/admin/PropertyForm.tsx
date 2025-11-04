import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Save, ArrowLeft, Upload, X } from 'lucide-react';

const PropertyForm = ({ property, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    endereco: '',
    cidade: '',
    estado: 'SP',
    cep: '',
    telefone: '',
    email: '',
    website: '',
    tipo_propriedade: 'fazenda',
    atividades: [],
    infraestrutura: [],
    horario_funcionamento: '',
    preco_visita: '',
    capacidade_visitantes: '',
    tamanho_hectares: '',
    destaque: false,
    imagens: [],
    latitude: '',
    longitude: ''
  });
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const { toast } = useToast();

  const tiposPropriedade = ['fazenda', 'sitio', 'rancho', 'estancia', 'chacara'];
  
  const atividadesDisponiveis = [
    'Ordenha de vacas', 'Cavalgada', 'Pesca esportiva', 'Trilha ecológica',
    'Alimentação dos animais', 'Degustação de vinhos', 'Tour pela vinícola',
    'Colheita da uva', 'Workshop de vinicultura', 'Workshop de plantas medicinais',
    'Colheita de ervas', 'Destilação de óleos essenciais', 'Caminhada sensorial',
    'Oficina de reciclagem', 'Arte com sucata', 'Educação ambiental',
    'Horta orgânica', 'Compostagem'
  ];

  const infraestruturaDisponivel = [
    'Piscina', 'Restaurante', 'Chalés', 'Estacionamento', 'Quadra poliesportiva',
    'Loja de produtos', 'Área de degustação', 'Banheiros', 'Laboratório de destilação',
    'Estufa de plantas', 'Área de convivência', 'Oficina de arte', 'Horta comunitária',
    'Composteira', 'Banheiro ecológico'
  ];

  useEffect(() => {
    if (property) {
      setFormData({
        ...property,
        preco_visita: property.preco_visita?.toString() || '',
        capacidade_visitantes: property.capacidade_visitantes?.toString() || '',
        tamanho_hectares: property.tamanho_hectares?.toString() || '',
        latitude: property.latitude?.toString() || '',
        longitude: property.longitude?.toString() || '',
        imagens: property.imagens || []
      });
    }
  }, [property]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setUploadingImages(true);
    const uploadedImages = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
        const filePath = `property-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('property-images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from('property-images')
          .getPublicUrl(filePath);

        uploadedImages.push(data.publicUrl);
      }

      setFormData(prev => ({
        ...prev,
        imagens: [...prev.imagens, ...uploadedImages]
      }));

      toast({
        title: "Imagens enviadas",
        description: `${uploadedImages.length} imagem(ns) adicionada(s) com sucesso.`
      });
    } catch (error: any) {
      toast({
        title: "Erro ao enviar imagens",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setUploadingImages(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      imagens: prev.imagens.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        throw new Error('Usuário não autenticado');
      }

      const propertyData = {
        ...formData,
        user_id: session.user.id,
        preco_visita: formData.preco_visita ? parseFloat(formData.preco_visita) : null,
        capacidade_visitantes: formData.capacidade_visitantes ? parseInt(formData.capacidade_visitantes) : null,
        tamanho_hectares: formData.tamanho_hectares ? parseFloat(formData.tamanho_hectares) : null,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
      };

      if (property) {
        // Update existing property
        const { error } = await supabase
          .from('propriedades')
          .update(propertyData)
          .eq('id', property.id);

        if (error) throw error;

        toast({
          title: "Propriedade atualizada",
          description: "As informações foram salvas com sucesso."
        });
      } else {
        // Create new property
        const { error } = await supabase
          .from('propriedades')
          .insert(propertyData);

        if (error) throw error;

        toast({
          title: "Propriedade criada",
          description: "A nova propriedade foi cadastrada com sucesso."
        });
      }

      onSuccess();
    } catch (error: any) {
      toast({
        title: "Erro ao salvar propriedade",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onCancel}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <h2 className="text-2xl font-bold">
          {property ? 'Editar Propriedade' : 'Nova Propriedade'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposPropriedade.map(tipo => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
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
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle>Imagens da Propriedade</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="images">Adicionar Imagens</Label>
              <div className="flex items-center space-x-4">
                <Input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImages}
                />
                <Button
                  type="button"
                  variant="outline"
                  disabled={uploadingImages}
                  onClick={() => document.getElementById('images')?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {uploadingImages ? 'Enviando...' : 'Escolher Arquivos'}
                </Button>
              </div>
            </div>
            {formData.imagens.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.imagens.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Imagem ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => removeImage(index)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader>
            <CardTitle>Localização</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="endereco">Endereço *</Label>
              <Input
                id="endereco"
                value={formData.endereco}
                onChange={(e) => handleInputChange('endereco', e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <Label htmlFor="estado">Estado *</Label>
                <Input
                  id="estado"
                  value={formData.estado}
                  onChange={(e) => handleInputChange('estado', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="cep">CEP</Label>
                <Input
                  id="cep"
                  value={formData.cep}
                  onChange={(e) => handleInputChange('cep', e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="latitude">Latitude (Coordenada Geográfica)</Label>
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
                <Label htmlFor="longitude">Longitude (Coordenada Geográfica)</Label>
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
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
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

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle>Contato</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => handleInputChange('telefone', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Details */}
        <Card>
          <CardHeader>
            <CardTitle>Detalhes da Propriedade</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="horario_funcionamento">Horário de Funcionamento</Label>
              <Input
                id="horario_funcionamento"
                value={formData.horario_funcionamento}
                onChange={(e) => handleInputChange('horario_funcionamento', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="preco_visita">Preço da Visita (R$)</Label>
                <Input
                  id="preco_visita"
                  type="number"
                  step="0.01"
                  value={formData.preco_visita}
                  onChange={(e) => handleInputChange('preco_visita', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="capacidade_visitantes">Capacidade de Visitantes</Label>
                <Input
                  id="capacidade_visitantes"
                  type="number"
                  value={formData.capacidade_visitantes}
                  onChange={(e) => handleInputChange('capacidade_visitantes', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="tamanho_hectares">Tamanho (Hectares)</Label>
                <Input
                  id="tamanho_hectares"
                  type="number"
                  step="0.1"
                  value={formData.tamanho_hectares}
                  onChange={(e) => handleInputChange('tamanho_hectares', e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="destaque"
                checked={formData.destaque}
                onChange={(e) => handleInputChange('destaque', e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="destaque">Propriedade em destaque</Label>
            </div>
          </CardContent>
        </Card>

        {/* Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Atividades Disponíveis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {atividadesDisponiveis.map(atividade => (
                <div key={atividade} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`atividade-${atividade}`}
                    checked={formData.atividades.includes(atividade)}
                    onChange={() => handleArrayChange('atividades', atividade)}
                    className="rounded"
                  />
                  <Label htmlFor={`atividade-${atividade}`} className="text-sm">
                    {atividade}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Infrastructure */}
        <Card>
          <CardHeader>
            <CardTitle>Infraestrutura</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {infraestruturaDisponivel.map(item => (
                <div key={item} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`infra-${item}`}
                    checked={formData.infraestrutura.includes(item)}
                    onChange={() => handleArrayChange('infraestrutura', item)}
                    className="rounded"
                  />
                  <Label htmlFor={`infra-${item}`} className="text-sm">
                    {item}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Salvando...' : 'Salvar Propriedade'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;