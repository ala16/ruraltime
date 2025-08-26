import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User, LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        navigate('/admin');
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth event:', event, session?.user?.email);
        if (session?.user) {
          setUser(session.user);
          navigate('/admin');
        } else {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // For admin login with specific credentials
      if (email === 'admin' && password === 'admin123') {
        // Use a valid email format
        const adminEmail = 'admin@ruraltime.com.br';
        
        // Try to sign in first
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: adminEmail,
          password: password
        });

        if (signInError) {
          console.log('Sign in error:', signInError.message);
          
          // If user doesn't exist, create admin user
          if (signInError.message.includes('Invalid login credentials')) {
            
            const { data, error: signUpError } = await supabase.auth.signUp({
              email: adminEmail,
              password: password,
              options: {
                data: {
                  username: 'admin'
                },
                emailRedirectTo: `${window.location.origin}/admin`
              }
            });

            if (signUpError) {
              console.error('Sign up error:', signUpError);
              throw signUpError;
            }

            // Since email confirmation is disabled, signup should auto-login
            if (data.session) {
              toast({
                title: "Admin criado e logado com sucesso!",
                description: "Redirecionando para o painel administrativo..."
              });
              // Navigation will happen via auth state change
            } else {
              toast({
                title: "Admin criado com sucesso!",
                description: "Fazendo login..."
              });
              
              // Try immediate login since email confirmation is disabled
              const { error: immediateLoginError } = await supabase.auth.signInWithPassword({
                email: adminEmail,
                password: password
              });
              
              if (!immediateLoginError) {
                toast({
                  title: "Login realizado com sucesso!",
                  description: "Redirecionando para o painel administrativo..."
                });
              }
            }
          } else {
            throw signInError;
          }
        } else {
          toast({
            title: "Login realizado com sucesso!",
            description: "Redirecionando para o painel administrativo..."
          });
        }
      } else {
        throw new Error('Credenciais inválidas. Use: admin / admin123');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Erro no login",
        description: error.message || "Verifique suas credenciais",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
            <User className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Login Administrativo</CardTitle>
          <CardDescription>
            Acesse o painel de controle das propriedades rurais
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuário</Label>
              <Input
                id="username"
                type="text"
                placeholder="Digite seu usuário (admin)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha (admin123)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? (
                "Entrando..."
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Entrar
                </>
              )}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-sm"
            >
              Voltar para o site
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;