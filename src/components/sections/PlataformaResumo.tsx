import { Card, CardContent } from "@/components/ui/card";
import { Users, MapPin, TrendingUp, Network, Smartphone, Search, Calendar } from "lucide-react";

export function PlataformaResumo() {
  return (
    <section id="oferecemos" className="py-8 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-primary mb-1">Como a Rural Time Funciona</h2>
          <p className="text-sm text-muted-foreground">
            Conectamos turistas a produtores rurais em 3 passos simples
          </p>
        </div>

        {/* Como Funciona - 3 passos em linha */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { step: 1, icon: MapPin, title: "Produtor Cadastra", desc: "Cadastra propriedade e experiências oferecidas", color: "bg-primary" },
            { step: 2, icon: Search, title: "Turista Encontra", desc: "Busca e reserva experiências na plataforma", color: "bg-secondary" },
            { step: 3, icon: Calendar, title: "Experiência Acontece", desc: "Visita a propriedade e vive momentos únicos", color: "bg-primary" },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className={`w-10 h-10 ${item.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-bold text-muted-foreground">Passo {item.step}</span>
              <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
              <p className="text-xs text-muted-foreground hidden sm:block">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* O que oferecemos - grid compacto */}
        <div className="grid md:grid-cols-2 gap-3 mb-8">
          <Card className="border-primary/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-sm text-primary">Para Turistas</h3>
              </div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Experiências autênticas no campo</li>
                <li>• Reservas online com segurança</li>
                <li>• Roteiros personalizados</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-secondary/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-secondary" />
                <h3 className="font-bold text-sm text-primary">Para Produtores</h3>
              </div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Cadastro gratuito de propriedades</li>
                <li>• Marketing digital e divulgação</li>
                <li>• Relatórios e rede de parceiros</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Impacto CNA - faixa compacta */}
        <Card className="bg-gradient-primary text-white border-0">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="bg-white/20 rounded-full px-3 py-1 text-xs font-bold whitespace-nowrap">CNA JOVEM</span>
                <p className="text-sm">
                  Projeto alinhado ao Programa CNA Jovem — 6ª Edição São Paulo
                </p>
              </div>
              <div className="flex gap-4 flex-shrink-0">
                {[
                  { icon: TrendingUp, label: "Oferta" },
                  { icon: Users, label: "Diversificação" },
                  { icon: Network, label: "Colaboração" },
                  { icon: Smartphone, label: "Tecnologia" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <item.icon className="w-5 h-5 mx-auto mb-1 text-white/80" />
                    <span className="text-[10px] text-white/70">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
