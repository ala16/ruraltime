import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { FloatingBanner } from "@/components/FloatingBanner";
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
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ArtesanatoDetalhes from "./pages/ArtesanatoDetalhes";
import PropriedadeDetalhes from "./pages/PropriedadeDetalhes";
import TodosAtrativos from "./pages/TodosAtrativos";
import TodosArtesanatos from "./pages/TodosArtesanatos";
import Roadmap from "./pages/Roadmap";
import TurismoRuralIndex from "./pages/TurismoRuralIndex";
import TurismoRuralEstado from "./pages/TurismoRuralEstado";
import TurismoRuralCidade from "./pages/TurismoRuralCidade";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/propriedades" element={<PropriedadesRurais />} />
            <Route path="/atrativos" element={<TodosAtrativos />} />
            <Route path="/artesanatos" element={<TodosArtesanatos />} />
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
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/turismo-rural" element={<TurismoRuralIndex />} />
            <Route path="/turismo-rural/:estado" element={<TurismoRuralEstado />} />
            <Route path="/turismo-rural/:estado/:cidade" element={<TurismoRuralCidade />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <FloatingBanner />
        </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;