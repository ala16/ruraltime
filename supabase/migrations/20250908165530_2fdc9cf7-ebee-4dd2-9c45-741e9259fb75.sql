-- Fix search_path for get_artesanatos_public_view function
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
SET search_path = public
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