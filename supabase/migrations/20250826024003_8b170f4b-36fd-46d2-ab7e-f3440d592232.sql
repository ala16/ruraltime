-- Confirmar todos os usuários existentes que estão como unconfirmed
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email_confirmed_at IS NULL;