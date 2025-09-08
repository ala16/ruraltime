import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { LogOut, Plus, Edit, Trash2, Eye } from 'lucide-react';
import PropertyForm from '@/components/admin/PropertyForm';
import PropertyList from '@/components/admin/PropertyList';
import ArtesanatoForm from '@/components/admin/ArtesanatoForm';
import ArtesanatoList from '@/components/admin/ArtesanatoList';

const Admin = () => {
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);
  const [artesanatos, setArtesanatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProperty, setEditingProperty] = useState(null);
  const [editingArtesanato, setEditingArtesanato] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('properties');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    loadProperties();
    loadArtesanatos();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      navigate('/login');
    } else {
      setUser(session.user);
    }
  };

  const loadProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('propriedades')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar propriedades",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadArtesanatos = async () => {
    try {
      const { data, error } = await supabase
        .from('artesanatos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArtesanatos(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar artesanatos",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Erro ao sair",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleDeleteProperty = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta propriedade?')) return;

    try {
      const { error } = await supabase
        .from('propriedades')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Propriedade excluída",
        description: "A propriedade foi removida com sucesso."
      });

      loadProperties();
    } catch (error: any) {
      toast({
        title: "Erro ao excluir propriedade",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleDeleteArtesanato = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este artesanato?')) return;

    try {
      const { error } = await supabase
        .from('artesanatos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Artesanato excluído",
        description: "O artesanato foi removido com sucesso."
      });

      loadArtesanatos();
    } catch (error: any) {
      toast({
        title: "Erro ao excluir artesanato",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingProperty(null);
    setEditingArtesanato(null);
    if (activeTab === 'properties') {
      loadProperties();
    } else {
      loadArtesanatos();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Painel Administrativo - Rural Time
              </h1>
              <p className="text-sm text-gray-500">
                Bem-vindo, {user?.email}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
              >
                <Eye className="w-4 h-4 mr-2" />
                Ver Site
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm ? (
          activeTab === 'properties' ? (
            <PropertyForm
              property={editingProperty}
              onSuccess={handleFormSuccess}
              onCancel={() => {
                setShowForm(false);
                setEditingProperty(null);
              }}
            />
          ) : (
            <ArtesanatoForm
              artesanato={editingArtesanato}
              onSuccess={handleFormSuccess}
              onCancel={() => {
                setShowForm(false);
                setEditingArtesanato(null);
              }}
            />
          )
        ) : (
          <>
            {/* Tabs */}
            <div className="flex space-x-1 mb-6 bg-muted rounded-lg p-1">
              <button
                onClick={() => setActiveTab('properties')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'properties'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Propriedades ({properties.length})
              </button>
              <button
                onClick={() => setActiveTab('artesanatos')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'artesanatos'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Artesanatos ({artesanatos.length})
              </button>
            </div>

            {/* Actions Bar */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {activeTab === 'properties' ? 'Gerenciar Propriedades' : 'Gerenciar Artesanatos'}
              </h2>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                {activeTab === 'properties' ? 'Nova Propriedade' : 'Novo Artesanato'}
              </Button>
            </div>

            {/* Content */}
            {activeTab === 'properties' ? (
              <PropertyList
                properties={properties}
                onEdit={(property) => {
                  setEditingProperty(property);
                  setShowForm(true);
                }}
                onDelete={handleDeleteProperty}
              />
            ) : (
              <ArtesanatoList
                artesanatos={artesanatos}
                onEdit={(artesanato) => {
                  setEditingArtesanato(artesanato);
                  setShowForm(true);
                }}
                onDelete={handleDeleteArtesanato}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Admin;