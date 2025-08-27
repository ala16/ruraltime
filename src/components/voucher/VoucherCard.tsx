import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Gift, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface VoucherCardProps {
  propriedadeId: string;
  propriedadeNome: string;
  preco?: number;
}

export function VoucherCard({ propriedadeId, propriedadeNome, preco = 199.99 }: VoucherCardProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [compradorNome, setCompradorNome] = useState("");
  const [compradorEmail, setCompradorEmail] = useState("");
  const [beneficiarioNome, setBeneficiarioNome] = useState("");
  const [beneficiarioEmail, setBeneficiarioEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleComprarVoucher = async () => {
    if (!compradorNome || !compradorEmail) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha seu nome e email.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('create-voucher-payment', {
        body: {
          propriedadeId,
          compradorNome,
          compradorEmail,
          beneficiarioNome: beneficiarioNome || compradorNome,
          beneficiarioEmail: beneficiarioEmail || compradorEmail,
          valor: Math.round(preco * 100) // Convert to cents
        }
      });

      if (error) throw error;

      // Redirect to Stripe Checkout
      window.open(data.url, '_blank');
      
      toast({
        title: "Redirecionando para pagamento",
        description: "Você será direcionado para o Stripe para finalizar a compra."
      });

    } catch (error) {
      console.error('Error creating voucher payment:', error);
      toast({
        title: "Erro",
        description: "Não foi possível processar sua solicitação. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Gift className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle className="flex items-center gap-2 justify-center">
          <Heart className="h-5 w-5 text-red-500" />
          Presenteie uma Experiência
        </CardTitle>
        <CardDescription>
          Compre um voucher de experiência rural em {propriedadeNome}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="text-center p-4 bg-secondary/50 rounded-lg">
          <p className="text-2xl font-bold text-primary">
            R$ {preco.toFixed(2).replace('.', ',')}
          </p>
          <p className="text-sm text-muted-foreground">
            Válido por 1 ano
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="comprador-nome">Seu Nome *</Label>
            <Input
              id="comprador-nome"
              value={compradorNome}
              onChange={(e) => setCompradorNome(e.target.value)}
              placeholder="Digite seu nome completo"
            />
          </div>

          <div>
            <Label htmlFor="comprador-email">Seu Email *</Label>
            <Input
              id="comprador-email"
              type="email"
              value={compradorEmail}
              onChange={(e) => setCompradorEmail(e.target.value)}
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <Label htmlFor="beneficiario-nome">Nome do Presenteado (opcional)</Label>
            <Input
              id="beneficiario-nome"
              value={beneficiarioNome}
              onChange={(e) => setBeneficiarioNome(e.target.value)}
              placeholder="Deixe vazio se for para você mesmo"
            />
          </div>

          <div>
            <Label htmlFor="beneficiario-email">Email do Presenteado (opcional)</Label>
            <Input
              id="beneficiario-email"
              type="email"
              value={beneficiarioEmail}
              onChange={(e) => setBeneficiarioEmail(e.target.value)}
              placeholder="email@presenteado.com"
            />
          </div>

          <div>
            <Label htmlFor="mensagem">Mensagem Especial (opcional)</Label>
            <Textarea
              id="mensagem"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              placeholder="Adicione uma mensagem carinhosa..."
              rows={3}
            />
          </div>
        </div>

        <Button 
          onClick={handleComprarVoucher}
          disabled={isLoading}
          className="w-full"
          size="lg"
        >
          {isLoading ? "Processando..." : `Comprar Voucher - R$ ${preco.toFixed(2).replace('.', ',')}`}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Pagamento seguro via Stripe. Você receberá o voucher com QR Code por email após a confirmação do pagamento.
        </p>
      </CardContent>
    </Card>
  );
}