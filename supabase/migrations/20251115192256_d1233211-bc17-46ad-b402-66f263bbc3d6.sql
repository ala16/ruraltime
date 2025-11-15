-- Recriar função get_property_contact_info para permitir acesso público
DROP FUNCTION IF EXISTS public.get_property_contact_info(uuid);

CREATE OR REPLACE FUNCTION public.get_property_contact_info(property_id uuid)
 RETURNS TABLE(telefone text, email text, website text, whatsapp text)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $$
  SELECT 
    p.telefone,
    p.email,
    p.website,
    p.whatsapp
  FROM public.propriedades p
  WHERE p.id = property_id 
    AND p.ativo = true;
$$;