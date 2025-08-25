-- Criar tabela para propriedades rurais
CREATE TABLE public.propriedades (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  nome TEXT NOT NULL,
  descricao TEXT,
  endereco TEXT NOT NULL,
  cidade TEXT NOT NULL,
  estado TEXT NOT NULL DEFAULT 'SP',
  cep TEXT,
  telefone TEXT,
  email TEXT,
  website TEXT,
  tipo_propriedade TEXT NOT NULL CHECK (tipo_propriedade IN ('fazenda', 'sitio', 'chacara', 'rancho', 'estancia', 'outro')),
  tamanho_hectares DECIMAL(10,2),
  atividades TEXT[], -- Array de atividades oferecidas
  infraestrutura TEXT[], -- Array de infraestruturas disponíveis
  preco_visita DECIMAL(10,2),
  capacidade_visitantes INTEGER,
  horario_funcionamento TEXT,
  imagens TEXT[], -- Array de URLs das imagens
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  ativo BOOLEAN NOT NULL DEFAULT true,
  destaque BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar Row Level Security
ALTER TABLE public.propriedades ENABLE ROW LEVEL SECURITY;

-- Criar políticas para acesso às propriedades
CREATE POLICY "Qualquer um pode visualizar propriedades ativas" 
ON public.propriedades 
FOR SELECT 
USING (ativo = true);

CREATE POLICY "Usuários podem criar suas próprias propriedades" 
ON public.propriedades 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar suas próprias propriedades" 
ON public.propriedades 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar suas próprias propriedades" 
ON public.propriedades 
FOR DELETE 
USING (auth.uid() = user_id);

-- Função para atualizar timestamp automaticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar updated_at automaticamente
CREATE TRIGGER update_propriedades_updated_at
  BEFORE UPDATE ON public.propriedades
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Criar índices para melhor performance
CREATE INDEX idx_propriedades_user_id ON public.propriedades(user_id);
CREATE INDEX idx_propriedades_cidade ON public.propriedades(cidade);
CREATE INDEX idx_propriedades_tipo ON public.propriedades(tipo_propriedade);
CREATE INDEX idx_propriedades_ativo ON public.propriedades(ativo);
CREATE INDEX idx_propriedades_destaque ON public.propriedades(destaque);