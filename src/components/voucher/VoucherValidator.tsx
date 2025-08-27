import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { QrCode, CheckCircle, XCircle, Calendar, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface VoucherData {
  valid: boolean;
  voucher_id: string;
  propriedade_nome: string;
  beneficiario_nome: string;
  valor: number;
  data_expiracao: string;
  status: string;
}

export function VoucherValidator() {
  const { toast } = useToast();
  const [codigo, setCodigo] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [voucher, setVoucher] = useState<VoucherData | null>(null);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [isUsing, setIsUsing] = useState(false);

  const validateVoucher = async () => {
    if (!codigo.trim()) {
      toast({
        title: "Código necessário",
        description: "Por favor, digite o código do voucher.",
        variant: "destructive"
      });
      return;
    }

    setIsValidating(true);
    setVoucher(null);

    try {
      const { data, error } = await supabase.rpc('validate_voucher', {
        voucher_code: codigo.toUpperCase()
      });

      if (error) throw error;

      if (data && data.length > 0) {
        setVoucher(data[0]);
        if (data[0].valid) {
          toast({
            title: "Voucher válido!",
            description: "O voucher está ativo e pode ser utilizado.",
          });
        } else {
          toast({
            title: "Voucher inválido",
            description: "Este voucher não pode ser utilizado (expirado ou já usado).",
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Voucher não encontrado",
          description: "Código do voucher não existe.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error validating voucher:', error);
      toast({
        title: "Erro",
        description: "Não foi possível validar o voucher. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsValidating(false);
    }
  };

  const useVoucher = async () => {
    if (!nomeUsuario.trim()) {
      toast({
        title: "Nome necessário",
        description: "Por favor, digite o nome de quem está usando o voucher.",
        variant: "destructive"
      });
      return;
    }

    setIsUsing(true);

    try {
      const { data, error } = await supabase.rpc('use_voucher', {
        voucher_code: codigo.toUpperCase(),
        used_by_name: nomeUsuario
      });

      if (error) throw error;

      if (data) {
        toast({
          title: "Voucher utilizado!",
          description: "O voucher foi marcado como usado com sucesso.",
        });
        setVoucher(null);
        setCodigo("");
        setNomeUsuario("");
      } else {
        toast({
          title: "Erro ao usar voucher",
          description: "Não foi possível marcar o voucher como usado.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error using voucher:', error);
      toast({
        title: "Erro",
        description: "Não foi possível usar o voucher. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsUsing(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <QrCode className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle>Validar Voucher</CardTitle>
        <CardDescription>
          Digite o código do voucher para verificar sua validade
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="codigo">Código do Voucher</Label>
          <Input
            id="codigo"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value.toUpperCase())}
            placeholder="RT202400001"
            className="font-mono"
          />
        </div>

        <Button 
          onClick={validateVoucher}
          disabled={isValidating}
          className="w-full"
        >
          {isValidating ? "Validando..." : "Validar Voucher"}
        </Button>

        {voucher && (
          <div className="mt-6 p-4 border rounded-lg space-y-3">
            <div className="flex items-center gap-2">
              {voucher.valid ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <Badge variant={voucher.valid ? "default" : "destructive"}>
                {voucher.valid ? "Válido" : "Inválido"}
              </Badge>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{voucher.propriedade_nome}</span>
              </div>
              
              {voucher.beneficiario_nome && (
                <p><strong>Beneficiário:</strong> {voucher.beneficiario_nome}</p>
              )}
              
              <p><strong>Valor:</strong> R$ {voucher.valor.toFixed(2).replace('.', ',')}</p>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Expira em: {formatDate(voucher.data_expiracao)}</span>
              </div>
              
              <p><strong>Status:</strong> {voucher.status}</p>
            </div>

            {voucher.valid && (
              <div className="mt-4 pt-4 border-t space-y-3">
                <Label htmlFor="nome-usuario">Nome de quem está usando</Label>
                <Input
                  id="nome-usuario"
                  value={nomeUsuario}
                  onChange={(e) => setNomeUsuario(e.target.value)}
                  placeholder="Digite o nome completo"
                />
                <Button 
                  onClick={useVoucher}
                  disabled={isUsing}
                  variant="destructive"
                  className="w-full"
                >
                  {isUsing ? "Processando..." : "Marcar como Usado"}
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}