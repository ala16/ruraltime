import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { VoucherCard } from "@/components/voucher/VoucherCard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Propriedade {
  id: string;
  nome: string;
  descricao: string;
  cidade: string;
  estado: string;
  preco_visita: number;
}

export default function ComprarVoucher() {
  const { propriedadeId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [propriedade, setPropriedade] = useState<Propriedade | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (propriedadeId) {
      buscarPropriedade();
    }
  }, [propriedadeId]);

  const buscarPropriedade = async () => {
    try {
      const { data, error } = await supabase
        .from('propriedades')
        .select('id, nome, descricao, cidade, estado, preco_visita')
        .eq('id', propriedadeId)
        .eq('ativo', true)
        .single();

      if (error) throw error;

      if (data) {
        setPropriedade(data);
      } else {
        toast({
          title: "Propriedade não encontrada",
          description: "A propriedade solicitada não foi encontrada.",
          variant: "destructive"
        });
        navigate('/propriedades');
      }
    } catch (error) {
      console.error('Erro ao buscar propriedade:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados da propriedade.",
        variant: "destructive"
      });
      navigate('/propriedades');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  if (!propriedade) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/propriedades')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar às Propriedades
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Comprar Voucher de Experiência
            </h1>
            <h2 className="text-xl text-primary mb-2">
              {propriedade.nome}
            </h2>
            <p className="text-muted-foreground">
              {propriedade.cidade}, {propriedade.estado}
            </p>
            {propriedade.descricao && (
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                {propriedade.descricao}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex justify-center">
          <VoucherCard 
            propriedadeId={propriedade.id}
            propriedadeNome={propriedade.nome}
            preco={propriedade.preco_visita || 199.99}
          />
        </div>
      </div>
    </div>
  );
}