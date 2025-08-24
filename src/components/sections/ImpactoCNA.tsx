import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Network, Smartphone } from "lucide-react";

export function ImpactoCNA() {
  return (
    <section id="impacto" className="py-20 bg-rural-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Impacto CNA Jovem</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Alinhado aos objetivos do programa, gerando transformação real no agronegócio
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow bg-white">
            <CardHeader className="pb-4">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Aumento da Oferta</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                <strong className="text-primary">Meta:</strong> Aumentar o número de propriedades 
                ofertando turismo rural na Região Bragantina.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow bg-white">
            <CardHeader className="pb-4">
              <Users className="w-12 h-12 text-secondary mx-auto mb-2" />
              <CardTitle className="text-lg">Diversificação</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                <strong className="text-primary">Meta:</strong> Ampliar a renda do produtor rural 
                através de atividades complementares sustentáveis.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow bg-white">
            <CardHeader className="pb-4">
              <Network className="w-12 h-12 text-rural-green mx-auto mb-2" />
              <CardTitle className="text-lg">Colaboração</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                <strong className="text-primary">Meta:</strong> Aumentar a colaboração entre 
                sindicatos, federações e produtores rurais.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow bg-white">
            <CardHeader className="pb-4">
              <Smartphone className="w-12 h-12 text-rural-green-light mx-auto mb-2" />
              <CardTitle className="text-lg">Tecnologia</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                <strong className="text-primary">Meta:</strong> Reduzir barreiras de acesso 
                à tecnologia digital no campo.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Destaque CNA Jovem */}
        <div className="mt-16">
          <Card className="bg-gradient-primary text-white border-0">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">CNA Jovem - 6ª Edição São Paulo</h3>
              <p className="text-lg leading-relaxed max-w-4xl mx-auto">
                O Rural Time representa o espírito inovador e empreendedor do Programa CNA Jovem, 
                combinando tradição rural com tecnologia moderna para criar soluções que beneficiam 
                toda a cadeia produtiva do agronegócio brasileiro.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 bg-white/20 rounded-full px-6 py-2">
                <span className="font-semibold">Um projeto</span>
                <span className="bg-white text-primary px-3 py-1 rounded-full text-sm font-bold">
                  CNA JOVEM
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}