import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Upload, X, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ArtesanatoFormProps {
  artesanato?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

const CATEGORIAS = [
  'Cerâmica',
  'Madeira',
  'Tecido',
  'Couro',
  'Palha',
  'Metais',
  'Decoração',
  'Utilitários',
  'Bijuterias',
  'Outros'
];

const ArtesanatoForm: React.FC<ArtesanatoFormProps> = ({ artesanato, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    categoria: '',
    artesao_nome: '',
    artesao_contato: '',
    artesao_whatsapp: '',
    artesao_instagram: '',
    imagens: [] as string[],
    disponivel: true,
    destaque: false,
  });
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (artesanato) {
      setFormData({
        nome: artesanato.nome || '',
        descricao: artesanato.descricao || '',
        categoria: artesanato.categoria || '',
        artesao_nome: artesanato.artesao_nome || '',
        artesao_contato: artesanato.artesao_contato || '',
        artesao_whatsapp: artesanato.artesao_whatsapp || '',
        artesao_instagram: artesanato.artesao_instagram || '',
        imagens: artesanato.imagens || [],
        disponivel: artesanato.disponivel ?? true,
        destaque: artesanato.destaque ?? false,
      });
    }
  }, [artesanato]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `artesanatos/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('property-images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from('property-images')
          .getPublicUrl(filePath);

        return data.publicUrl;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setFormData(prev => ({
        ...prev,
        imagens: [...prev.imagens, ...uploadedUrls]
      }));

      toast({
        title: "Imagens enviadas",
        description: `${uploadedUrls.length} imagem(ns) adicionada(s) com sucesso.`
      });
    } catch (error: any) {
      toast({
        title: "Erro no upload",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
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
    if (!formData.nome || !formData.categoria || !formData.artesao_nome) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const artesanatoData = {
        ...formData,
        user_id: user.id,
      };

      if (artesanato) {
        const { error } = await supabase
          .from('artesanatos')
          .update(artesanatoData)
          .eq('id', artesanato.id);
        
        if (error) throw error;
        
        toast({
          title: "Artesanato atualizado",
          description: "As informações foram salvas com sucesso."
        });
      } else {
        const { error } = await supabase
          .from('artesanatos')
          .insert([artesanatoData]);
        
        if (error) throw error;
        
        toast({
          title: "Artesanato cadastrado",
          description: "O artesanato foi adicionado com sucesso."
        });
      }

      onSuccess();
    } catch (error: any) {
      toast({
        title: "Erro ao salvar",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="mr-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold">
          {artesanato ? 'Editar Artesanato' : 'Novo Artesanato'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
            <CardDescription>
              Dados fundamentais sobre o artesanato
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome">Nome do Artesanato *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                  placeholder="Ex: Vaso de Cerâmica Artesanal"
                  required
                />
              </div>
              <div>
                <Label htmlFor="categoria">Categoria *</Label>
                <Select
                  value={formData.categoria}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, categoria: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIAS.map((categoria) => (
                      <SelectItem key={categoria} value={categoria}>
                        {categoria}
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
                onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
                placeholder="Descreva o artesanato, materiais utilizados, técnicas..."
                rows={4}
              />
            </div>

          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informações do Artesão</CardTitle>
            <CardDescription>
              Dados sobre quem produz o artesanato
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="artesao_nome">Nome do Artesão *</Label>
                <Input
                  id="artesao_nome"
                  value={formData.artesao_nome}
                  onChange={(e) => setFormData(prev => ({ ...prev, artesao_nome: e.target.value }))}
                  placeholder="Nome do produtor"
                  required
                />
              </div>
              <div>
                <Label htmlFor="artesao_whatsapp">WhatsApp</Label>
                <Input
                  id="artesao_whatsapp"
                  value={formData.artesao_whatsapp}
                  onChange={(e) => setFormData(prev => ({ ...prev, artesao_whatsapp: e.target.value }))}
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div>
                <Label htmlFor="artesao_instagram">Instagram</Label>
                <Input
                  id="artesao_instagram"
                  value={formData.artesao_instagram}
                  onChange={(e) => setFormData(prev => ({ ...prev, artesao_instagram: e.target.value }))}
                  placeholder="@usuario_instagram"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="artesao_contato">Outros Contatos</Label>
              <Input
                id="artesao_contato"
                value={formData.artesao_contato}
                onChange={(e) => setFormData(prev => ({ ...prev, artesao_contato: e.target.value }))}
                placeholder="Email, telefone adicional ou outros meios de contato"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Imagens</CardTitle>
            <CardDescription>
              Adicione fotos do artesanato (máximo 10 imagens)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading || formData.imagens.length >= 10}
                  className="hidden"
                  id="image-upload"
                />
                <Label
                  htmlFor="image-upload"
                  className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                    uploading || formData.imagens.length >= 10 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'border-muted-foreground/25 hover:border-muted-foreground/50'
                  }`}
                >
                  {uploading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Enviando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Upload className="w-5 h-5" />
                      <span>
                        {formData.imagens.length >= 10 
                          ? 'Limite de imagens atingido' 
                          : 'Clique para adicionar imagens'
                        }
                      </span>
                    </div>
                  )}
                </Label>
              </div>

              {formData.imagens.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.imagens.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Imagem ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configurações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="disponivel"
                checked={formData.disponivel}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, disponivel: checked }))}
              />
              <Label htmlFor="disponivel">Artesanato disponível</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="destaque"
                checked={formData.destaque}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, destaque: checked }))}
              />
              <Label htmlFor="destaque">Destacar na página inicial</Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              artesanato ? 'Atualizar' : 'Cadastrar'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ArtesanatoForm;