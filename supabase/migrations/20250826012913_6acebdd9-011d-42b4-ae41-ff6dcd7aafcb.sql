-- Create trigger to handle admin user creation
CREATE TRIGGER on_auth_admin_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  WHEN (NEW.raw_user_meta_data ->> 'username' = 'rickk6')
  EXECUTE PROCEDURE public.handle_admin_user();