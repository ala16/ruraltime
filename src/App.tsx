import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CadastroPropriedade from "./pages/CadastroPropriedade";
import Agendamento from "./pages/Agendamento";
import PropriedadesRurais from "./pages/PropriedadesRurais";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AuthPage from "./pages/AuthPage";
import ComprarVoucher from "./pages/ComprarVoucher";
import VoucherSuccess from "./pages/VoucherSuccess";
import VoucherCanceled from "./pages/VoucherCanceled";
import ValidarVoucher from "./pages/ValidarVoucher";
import ArtesanatoDetalhes from "./pages/ArtesanatoDetalhes";
import PropriedadeDetalhes from "./pages/PropriedadeDetalhes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/propriedades" element={<PropriedadesRurais />} />
            <Route path="/cadastro-propriedade" element={<CadastroPropriedade />} />
            <Route path="/agendamento/:propriedadeId" element={<Agendamento />} />
            <Route path="/login" element={<Login />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/voucher/:propriedadeId" element={<ComprarVoucher />} />
            <Route path="/voucher-success" element={<VoucherSuccess />} />
            <Route path="/voucher-canceled" element={<VoucherCanceled />} />
            <Route path="/validar-voucher" element={<ValidarVoucher />} />
            <Route path="/artesanato/:id" element={<ArtesanatoDetalhes />} />
            <Route path="/propriedade/:id" element={<PropriedadeDetalhes />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;