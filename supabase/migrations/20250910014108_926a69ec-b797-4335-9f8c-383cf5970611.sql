-- Update the public view function to include new contact fields
DROP FUNCTION IF EXISTS public.get_artesanatos_public_view();

CREATE OR REPLACE FUNCTION public.get_artesanatos_public_view()
 RETURNS TABLE(id uuid, nome text, descricao text, categoria text, artesao_nome text, artesao_contato text, artesao_whatsapp text, artesao_instagram text, imagens text[], destaque boolean, created_at timestamp with time zone)
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT 
    a.id,
    a.nome,
    a.descricao,
    a.categoria,
    a.artesao_nome,
    a.artesao_contato,
    a.artesao_whatsapp,
    a.artesao_instagram,
    a.imagens,
    a.destaque,
    a.created_at
  FROM artesanatos a
  WHERE a.disponivel = true
  ORDER BY a.destaque DESC, a.created_at DESC;
$function$