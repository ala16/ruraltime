-- Fix search path security warnings for the functions we just created
DROP FUNCTION IF EXISTS public.get_property_public_view();
DROP FUNCTION IF EXISTS public.get_property_contact_info(uuid);

-- Recreate the functions with proper search_path settings
CREATE OR REPLACE FUNCTION public.get_property_public_view()
RETURNS TABLE (
  id uuid,
  nome text,
  descricao text,
  endereco text,
  cidade text,
  estado text,
  tipo_propriedade text,
  tamanho_hectares numeric,
  preco_visita numeric,
  capacidade_visitantes integer,
  horario_funcionamento text,
  atividades text[],
  infraestrutura text[],
  destaque boolean,
  created_at timestamp with time zone,
  has_contact boolean
) 
LANGUAGE sql 
STABLE 
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT 
    p.id,
    p.nome,
    p.descricao,
    p.endereco,
    p.cidade,
    p.estado,
    p.tipo_propriedade,
    p.tamanho_hectares,
    p.preco_visita,
    p.capacidade_visitantes,
    p.horario_funcionamento,
    p.atividades,
    p.infraestrutura,
    p.destaque,
    p.created_at,
    (p.telefone IS NOT NULL OR p.email IS NOT NULL OR p.website IS NOT NULL) as has_contact
  FROM public.propriedades p
  WHERE p.ativo = true;
$$;

-- Create a function for authenticated users to get contact info
CREATE OR REPLACE FUNCTION public.get_property_contact_info(property_id uuid)
RETURNS TABLE (
  telefone text,
  email text,
  website text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT 
    p.telefone,
    p.email,
    p.website
  FROM public.propriedades p
  WHERE p.id = property_id 
    AND p.ativo = true
    AND auth.role() = 'authenticated';
$$;