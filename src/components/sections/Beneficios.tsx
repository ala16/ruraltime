import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Heart, Globe } from "lucide-react";

export function Beneficios() {
  return (
    <section id="beneficios" className="py-12 bg-gradient-secondary text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Benefícios para Todos</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Impacto positivo que transforma vidas e comunidades
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="text-center">
              <Leaf className="w-12 h-12 mx-auto mb-4 text-rural-green-light" />
              <CardTitle className="text-xl">Para o Campo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Diversificação da Renda</h4>
                <p className="text-white/80 text-sm">
                  Nova fonte de receita complementar às atividades agrícolas tradicionais.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Valorização Cultural</h4>
                <p className="text-white/80 text-sm">
                  Preservação e divulgação das tradições e conhecimentos rurais.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Transformação Digital</h4>
                <p className="text-white/80 text-sm">
                  Acesso facilitado às tecnologias digitais e marketing online.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="text-center">
              <Heart className="w-12 h-12 mx-auto mb-4 text-rural-green-light" />
              <CardTitle className="text-xl">Para a Cidade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Experiências Autênticas</h4>
                <p className="text-white/80 text-sm">
                  Conexão verdadeira com a natureza e modos de vida rurais.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Educação Rural</h4>
                <p className="text-white/80 text-sm">
                  Aprendizado sobre agricultura, pecuária e sustentabilidade.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Bem-estar</h4>
                <p className="text-white/80 text-sm">
                  Momentos de descanso e reconexão longe do estresse urbano.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="text-center">
              <Globe className="w-12 h-12 mx-auto mb-4 text-rural-green-light" />
              <CardTitle className="text-xl">Para a Sociedade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Sustentabilidade</h4>
                <p className="text-white/80 text-sm">
                  Promoção de práticas ambientalmente responsáveis e conscientes.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Economia Local</h4>
                <p className="text-white/80 text-sm">
                  Fortalecimento da economia regional e geração de empregos.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Integração Social</h4>
                <p className="text-white/80 text-sm">
                  Aproximação entre diferentes realidades e culturas.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}