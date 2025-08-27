import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, Home, ShoppingCart } from "lucide-react";

export default function VoucherCanceled() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-red-100 rounded-full">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <CardTitle className="text-red-600">Pagamento Cancelado</CardTitle>
          <CardDescription>
            A compra do voucher foi cancelada. Você pode tentar novamente quando quiser.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Não se preocupe!</strong> Nenhuma cobrança foi realizada e você pode tentar comprar seu voucher novamente a qualquer momento.
            </p>
          </div>

          <div className="space-y-2">
            <Link to="/propriedades">
              <Button className="w-full">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Tentar Novamente
              </Button>
            </Link>
            <Link to="/">
              <Button className="w-full" variant="outline">
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