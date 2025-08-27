import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Download, Home, QrCode } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import QRCode from "qrcode";

interface VoucherData {
  codigo: string;
  qrCodeData: string;
  valor: number;
  dataExpiracao: string;
}

export default function VoucherSuccess() {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [voucher, setVoucher] = useState<VoucherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      createVoucher();
    }
  }, [sessionId]);

  useEffect(() => {
    if (voucher?.qrCodeData) {
      generateQrCode();
    }
  }, [voucher]);

  const createVoucher = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('create-voucher', {
        body: { sessionId }
      });

      if (error) throw error;

      if (data.success) {
        setVoucher(data.voucher);
        toast({
          title: "Voucher criado com sucesso!",
          description: "Seu voucher de experiência rural está pronto.",
        });
      }
    } catch (error) {
      console.error('Error creating voucher:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o voucher. Entre em contato conosco.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateQrCode = async () => {
    if (!voucher?.qrCodeData) return;

    try {
      const url = await QRCode.toDataURL(voucher.qrCodeData, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(url);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const downloadQrCode = () => {
    if (!qrCodeUrl || !voucher) return;

    const link = document.createElement('a');
    link.download = `voucher-${voucher.codigo}.png`;
    link.href = qrCodeUrl;
    link.click();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex items-center justify-center p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Processando seu voucher...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!voucher) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-red-600">Erro</CardTitle>
            <CardDescription>
              Não foi possível processar seu voucher. Entre em contato conosco.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/">
              <Button className="w-full">
                <Home className="mr-2 h-4 w-4" />
                Voltar ao Início
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-green-600">Pagamento Confirmado!</CardTitle>
          <CardDescription>
            Seu voucher de experiência rural foi criado com sucesso
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center p-4 bg-secondary/50 rounded-lg">
            <Badge variant="default" className="mb-2">
              Voucher Ativo
            </Badge>
            <p className="text-2xl font-bold font-mono">
              {voucher.codigo}
            </p>
            <p className="text-sm text-muted-foreground">
              Código do voucher
            </p>
          </div>

          {qrCodeUrl && (
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <img 
                  src={qrCodeUrl} 
                  alt="QR Code do Voucher" 
                  className="border rounded-lg"
                />
              </div>
              <Button 
                onClick={downloadQrCode}
                variant="outline"
                className="w-full"
              >
                <Download className="mr-2 h-4 w-4" />
                Baixar QR Code
              </Button>
            </div>
          )}

          <div className="space-y-2 text-sm">
            <p><strong>Valor:</strong> R$ {voucher.valor.toFixed(2).replace('.', ',')}</p>
            <p><strong>Válido até:</strong> {formatDate(voucher.dataExpiracao)}</p>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-2">
              <QrCode className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Como usar seu voucher:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Apresente o QR Code na propriedade</li>
                  <li>Ou informe o código do voucher</li>
                  <li>Agende sua visita com antecedência</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Link to="/propriedades">
              <Button className="w-full" variant="outline">
                Ver Propriedades
              </Button>
            </Link>
            <Link to="/">
              <Button className="w-full">
                <Home className="mr-2 h-4 w-4" />
                Voltar ao Início
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}