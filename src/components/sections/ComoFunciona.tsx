import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Search, Calendar } from "lucide-react";

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Como Funciona</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Processo simples e eficiente para conectar campo e cidade
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Passo 1 */}
          <div className="text-center">
            <Card className="hover:shadow-xl transition-all duration-300 border-primary/20">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div className="bg-primary text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">
                  Produtor Cadastra
                </h3>
                <p className="text-muted-foreground">
                  O produtor rural cadastra sua propriedade e as experiências que oferece, 
                  como visitas guiadas, degustações e atividades interativas.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Seta */}
          <div className="hidden md:flex items-center justify-center">
            <div className="w-full h-0.5 bg-gradient-primary relative">
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-primary border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
            </div>
          </div>

          {/* Passo 2 */}
          <div className="text-center">
            <Card className="hover:shadow-xl transition-all duration-300 border-secondary/20">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <div className="bg-secondary text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">
                  Turista Encontra
                </h3>
                <p className="text-muted-foreground">
                  O turista navega pela plataforma, descobre experiências que despertam seu interesse 
                  e faz a reserva online de forma segura.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Seta */}
          <div className="hidden md:flex items-center justify-center md:col-span-1">
            <div className="w-full h-0.5 bg-gradient-primary relative">
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-primary border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
            </div>
          </div>

          {/* Resultado */}
          <div className="text-center md:col-span-2">
            <Card className="hover:shadow-xl transition-all duration-300 border-rural-green/20 bg-gradient-to-r from-accent to-rural-cream">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div className="bg-rural-green text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4">
                  3
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">
                  A Experiência Acontece!
                </h3>
                <p className="text-foreground text-lg">
                  No dia agendado, o turista visita a propriedade rural e vive uma experiência única no campo, 
                  criando memórias especiais e contribuindo para a economia local.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-primary rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Pronto para começar?</h3>
            <p className="text-lg mb-6">
              Faça parte da maior rede de turismo rural do Brasil
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Sou Turista
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
                Sou Produtor
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}