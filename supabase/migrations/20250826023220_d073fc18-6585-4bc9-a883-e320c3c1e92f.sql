-- Limpar todos os dados de usuários
DELETE FROM public.admin_profiles;

-- Limpar usuários do auth (isso vai cascata para admin_profiles também)
DELETE FROM auth.users;

-- Atualizar a função de trigger para criar admin automaticamente
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Nova função que cria automaticamente o perfil admin
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Só insere se não existir um perfil para este user_id
  INSERT INTO public.admin_profiles (user_id, username, is_admin)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    CASE WHEN COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)) = 'admin' THEN true ELSE false END
  )
  ON CONFLICT (user_id) DO UPDATE SET
    username = COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    is_admin = CASE WHEN COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)) = 'admin' THEN true ELSE false END,
    updated_at = now();

  RETURN NEW;
END;
$$;

-- Recria o trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();