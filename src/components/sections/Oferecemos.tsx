import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MapPin, TrendingUp, Network } from "lucide-react";

export function Oferecemos() {
  return (
    <section id="oferecemos" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">O que Oferecemos</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Soluções completas para turistas e produtores rurais
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Para Turistas */}
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-primary">Para Turistas</h3>
            </div>
            
            <div className="space-y-4">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Experiências Autênticas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Descubra vivências únicas no campo, desde ordenha de vacas até colheitas sazonais 
                    e culinária rural tradicional.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Reservas Online</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Plataforma intuitiva para encontrar, reservar e pagar experiências rurais 
                    com segurança e praticidade.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Histórias Reais</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Conheça as histórias dos produtores, suas tradições familiares e 
                    a importância do agronegócio regional.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Para Produtores */}
          <div className="space-y-6">
            <div className="text-center mb-8">
              <MapPin className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-primary">Para Produtores Rurais</h3>
            </div>
            
            <div className="space-y-4">
              <Card className="hover:shadow-lg transition-shadow border-secondary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-secondary" />
                    Cadastro Gratuito
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Cadastre sua propriedade e experiências sem custos. 
                    Comece a receber turistas e diversificar sua renda.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-secondary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Network className="w-5 h-5 text-secondary" />
                    Marketing Digital
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Apoio completo para promover sua propriedade online, 
                    com fotografias profissionais e estratégias de divulgação.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-secondary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Relatórios e Rede</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Acesse relatórios de desempenho e conecte-se com outros produtores 
                    para trocar experiências e boas práticas.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}