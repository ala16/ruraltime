-- Create table for handicrafts/artesanatos
CREATE TABLE public.artesanatos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  nome TEXT NOT NULL,
  descricao TEXT,
  preco NUMERIC,
  categoria TEXT NOT NULL,
  artesao_nome TEXT NOT NULL,
  artesao_contato TEXT,
  imagens TEXT[],
  disponivel BOOLEAN NOT NULL DEFAULT true,
  destaque BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.artesanatos ENABLE ROW LEVEL SECURITY;

-- Create policies for artesanatos
CREATE POLICY "Admin users can manage all handicrafts" 
ON public.artesanatos 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM admin_profiles 
    WHERE admin_profiles.user_id = auth.uid() 
    AND admin_profiles.is_admin = true
  )
);

CREATE POLICY "Public can view available handicrafts" 
ON public.artesanatos 
FOR SELECT 
USING (disponivel = true);

CREATE POLICY "Users can manage their own handicrafts" 
ON public.artesanatos 
FOR ALL 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_artesanatos_updated_at
  BEFORE UPDATE ON public.artesanatos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to get public view of handicrafts
CREATE OR REPLACE FUNCTION public.get_artesanatos_public_view()
RETURNS TABLE(
  id uuid,
  nome text,
  descricao text,
  preco numeric,
  categoria text,
  artesao_nome text,
  imagens text[],
  destaque boolean,
  created_at timestamp with time zone
)
LANGUAGE sql
SECURITY DEFINER
AS $function$
  SELECT 
    a.id,
    a.nome,
    a.descricao,
    a.preco,
    a.categoria,
    a.artesao_nome,
    a.imagens,
    a.destaque,
    a.created_at
  FROM artesanatos a
  WHERE a.disponivel = true
  ORDER BY a.destaque DESC, a.created_at DESC;
$function$;