-- Update get_property_contact_info to be public (no authentication required)
CREATE OR REPLACE FUNCTION public.get_property_contact_info(property_id uuid)
 RETURNS TABLE(telefone text, email text, website text)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $$
  SELECT 
    p.telefone,
    p.email,
    p.website
  FROM public.propriedades p
  WHERE p.id = property_id 
    AND p.ativo = true;
$$;