-- Primeiro, adicionar constraint única na tabela admin_profiles
ALTER TABLE public.admin_profiles ADD CONSTRAINT admin_profiles_user_id_unique UNIQUE (user_id);

-- Simplificar as políticas RLS
DROP POLICY IF EXISTS "Admin users can manage all properties" ON public.propriedades;
DROP POLICY IF EXISTS "Admins can view all properties including inactive" ON public.propriedades;

-- Política para admins gerirem todas as propriedades
CREATE POLICY "Admin users can manage all properties"
ON public.propriedades
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_profiles 
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

-- Política para qualquer um visualizar propriedades ativas
CREATE POLICY "Anyone can view active properties"
ON public.propriedades
FOR SELECT
TO authenticated
USING (ativo = true);

-- Atualizar a função de trigger para ser mais simples
CREATE OR REPLACE FUNCTION public.handle_admin_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Só criar perfil admin se o username for rickk6
  IF NEW.raw_user_meta_data ->> 'username' = 'rickk6' THEN
    INSERT INTO public.admin_profiles (user_id, username, is_admin)
    VALUES (NEW.id, 'rickk6', true)
    ON CONFLICT (user_id) DO UPDATE SET 
      username = 'rickk6',
      is_admin = true;
  END IF;
  RETURN NEW;
END;
$$;