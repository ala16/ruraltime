import { VoucherValidator } from "@/components/voucher/VoucherValidator";

export default function ValidarVoucher() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Validação de Voucher
          </h1>
          <p className="text-muted-foreground">
            Sistema para validar e utilizar vouchers de experiências rurais
          </p>
        </div>
        
        <div className="flex justify-center">
          <VoucherValidator />
        </div>
      </div>
    </div>
  );
}