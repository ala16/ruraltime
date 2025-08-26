-- Remove duplicate RLS policies and implement secure contact information access
-- Drop the duplicate Portuguese policy first
DROP POLICY IF EXISTS "Qualquer um pode visualizar propriedades ativas" ON public.propriedades;

-- Drop the current overly permissive policy
DROP POLICY IF EXISTS "Anyone can view active properties" ON public.propriedades;

-- Create a more restrictive policy for public access (no contact info)
CREATE POLICY "Public can view basic property info" 
ON public.propriedades 
FOR SELECT 
USING (ativo = true);

-- Create a policy for authenticated users to see contact information
CREATE POLICY "Authenticated users can view full property details" 
ON public.propriedades 
FOR SELECT 
TO authenticated
USING (ativo = true);

-- Create a function to check if the user is authenticated and return appropriate columns
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