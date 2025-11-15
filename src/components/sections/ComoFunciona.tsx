import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Search, Calendar } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

export function ComoFunciona() {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.2 });
  
  return <section id="como-funciona" className="py-12 bg-background" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl font-bold text-primary mb-4">Como Funciona</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Processo simples e eficiente para conectar campo e cidade
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          {/* Passo 1 */}
          <div className={`text-center flex-1 max-w-sm transition-all duration-700 ${
            isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`} style={{ transitionDelay: '0.2s' }}>
            <Card className="hover:shadow-xl hover:-translate-y-2 transition-all duration-500 border-primary/20 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
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

          {/* Seta 1 */}
          <div className="hidden md:flex items-center justify-center flex-shrink-0">
            <div className="w-16 h-0.5 bg-gradient-primary relative">
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-primary border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
            </div>
          </div>

          {/* Passo 2 */}
          <div className={`text-center flex-1 max-w-sm transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: '0.4s' }}>
            <Card className="hover:shadow-xl hover:-translate-y-2 transition-all duration-500 border-secondary/20 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
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

          {/* Seta 2 */}
          <div className="hidden md:flex items-center justify-center flex-shrink-0">
            <div className="w-16 h-0.5 bg-gradient-primary relative">
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-primary border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
            </div>
          </div>

          {/* Passo 3 */}
          <div className={`text-center flex-1 max-w-sm transition-all duration-700 ${
            isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`} style={{ transitionDelay: '0.6s' }}>
            <Card className="hover:shadow-xl hover:-translate-y-2 transition-all duration-500 border-rural-green/20 bg-gradient-to-r from-accent to-rural-cream group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div className="bg-rural-green text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">
                  A Experiência Acontece!
                </h3>
                <p className="text-muted-foreground">
                  No dia agendado, o turista visita a propriedade rural e vive uma experiência única no campo, 
                  criando memórias especiais e contribuindo para a economia local.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          
        </div>
      </div>
    </section>;
}