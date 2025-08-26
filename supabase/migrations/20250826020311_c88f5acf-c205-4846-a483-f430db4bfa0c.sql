-- Primeiro, vamos limpar qualquer usuário admin existente problemático
-- e criar um usuário admin válido

-- Criar um usuário admin válido se não existir
DO $$
BEGIN
  -- Inserir perfil admin diretamente na tabela admin_profiles
  INSERT INTO public.admin_profiles (user_id, username, is_admin)
  VALUES ('00000000-0000-0000-0000-000000000001'::uuid, 'rickk6', true)
  ON CONFLICT (user_id) DO UPDATE SET 
    username = 'rickk6',
    is_admin = true;
END $$;

-- Atualizar as políticas RLS para garantir que admins possam fazer tudo
DROP POLICY IF EXISTS "Admin users can manage all properties" ON public.propriedades;

CREATE POLICY "Admin users can manage all properties"
ON public.propriedades
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_profiles 
    WHERE user_id = auth.uid() AND is_admin = true
  )
  OR ativo = true  -- Permitir SELECT para propriedades ativas por qualquer usuário autenticado
);

-- Política específica para admins poderem ver propriedades inativas também
DROP POLICY IF EXISTS "Admins can view all properties including inactive" ON public.propriedades;

CREATE POLICY "Admins can view all properties including inactive"
ON public.propriedades
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_profiles 
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

-- Atualizar a função de trigger para ser mais robusta
DROP TRIGGER IF EXISTS on_auth_admin_user_created ON auth.users;

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

-- Recriar o trigger
CREATE TRIGGER on_auth_admin_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE PROCEDURE public.handle_admin_user();