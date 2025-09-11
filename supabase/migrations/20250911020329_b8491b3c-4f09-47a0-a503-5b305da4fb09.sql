-- Add WhatsApp and Instagram fields to properties table
ALTER TABLE public.propriedades 
ADD COLUMN whatsapp text,
ADD COLUMN instagram text;

-- Update the get_property_public_view function to include WhatsApp and Instagram
CREATE OR REPLACE FUNCTION public.get_property_public_view()
 RETURNS TABLE(id uuid, nome text, descricao text, endereco text, cidade text, estado text, tipo_propriedade text, tamanho_hectares numeric, preco_visita numeric, capacidade_visitantes integer, horario_funcionamento text, atividades text[], infraestrutura text[], destaque boolean, has_contact boolean, imagens text[], latitude numeric, longitude numeric, whatsapp text, instagram text, created_at timestamp with time zone)
 LANGUAGE sql
 SECURITY DEFINER
AS $function$
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
    CASE 
      WHEN p.telefone IS NOT NULL OR p.email IS NOT NULL OR p.website IS NOT NULL OR p.whatsapp IS NOT NULL OR p.instagram IS NOT NULL
      THEN true 
      ELSE false 
    END as has_contact,
    p.imagens,
    p.latitude,
    p.longitude,
    p.whatsapp,
    p.instagram,
    p.created_at
  FROM propriedades p
  WHERE p.ativo = true
  ORDER BY p.destaque DESC, p.created_at DESC;
$function$

-- Create a function to get detailed property contact info including WhatsApp and Instagram
CREATE OR REPLACE FUNCTION public.get_property_contact_info(property_id uuid)
 RETURNS TABLE(telefone text, email text, website text, whatsapp text, instagram text)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT 
    p.telefone,
    p.email,
    p.website,
    p.whatsapp,
    p.instagram
  FROM public.propriedades p
  WHERE p.id = property_id 
    AND p.ativo = true
    AND auth.role() = 'authenticated';
$function$