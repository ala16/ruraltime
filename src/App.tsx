import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LanguageProvider } from "@/contexts/LanguageContext";

import { ScrollToTop } from "./components/ScrollToTop";
import Index from "./pages/Index";

// Lazy-loaded routes
const NotFound = lazy(() => import("./pages/NotFound"));
const CadastroPropriedade = lazy(() => import("./pages/CadastroPropriedade"));
const Agendamento = lazy(() => import("./pages/Agendamento"));
const PropriedadesRurais = lazy(() => import("./pages/PropriedadesRurais"));
const Login = lazy(() => import("./pages/Login"));
const Admin = lazy(() => import("./pages/Admin"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const ComprarVoucher = lazy(() => import("./pages/ComprarVoucher"));
const VoucherSuccess = lazy(() => import("./pages/VoucherSuccess"));
const VoucherCanceled = lazy(() => import("./pages/VoucherCanceled"));
const ValidarVoucher = lazy(() => import("./pages/ValidarVoucher"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const ArtesanatoDetalhes = lazy(() => import("./pages/ArtesanatoDetalhes"));
const PropriedadeDetalhes = lazy(() => import("./pages/PropriedadeDetalhes"));
const TodosAtrativos = lazy(() => import("./pages/TodosAtrativos"));
const TodosArtesanatos = lazy(() => import("./pages/TodosArtesanatos"));
const Roadmap = lazy(() => import("./pages/Roadmap"));
const TurismoRuralIndex = lazy(() => import("./pages/TurismoRuralIndex"));
const TurismoRuralEstado = lazy(() => import("./pages/TurismoRuralEstado"));
const TurismoRuralCidade = lazy(() => import("./pages/TurismoRuralCidade"));
const Agroturismo = lazy(() => import("./pages/clusters/Agroturismo"));
const TurismoDeFazenda = lazy(() => import("./pages/clusters/TurismoDeFazenda"));
const ExperienciasCampo = lazy(() => import("./pages/clusters/ExperienciasCampo"));
const TurismoSustentavel = lazy(() => import("./pages/clusters/TurismoSustentavel"));
const Sobre = lazy(() => import("./pages/Sobre"));
const FAQ = lazy(() => import("./pages/FAQ"));
const CityLandingPage = lazy(() => import("./pages/CityLandingPage"));
const RuralTimeAI = lazy(() => import("./pages/RuralTimeAI"));

const queryClient = new QueryClient();

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-pulse text-primary font-semibold">Carregando...</div>
  </div>
);

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
          <ScrollToTop />
          <Suspense fallback={<PageFallback />}>
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
            <Route path="/agroturismo" element={<Agroturismo />} />
            <Route path="/turismo-de-fazenda" element={<TurismoDeFazenda />} />
            <Route path="/experiencia-no-campo" element={<ExperienciasCampo />} />
            <Route path="/turismo-rural-sustentavel" element={<TurismoSustentavel />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/destinos/:estado/:cidade" element={<CityLandingPage />} />
            <Route path="/ia" element={<RuralTimeAI />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
          <FloatingBanner />
        </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
