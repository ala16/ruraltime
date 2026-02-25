import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import ricardoPhoto from "@/assets/ricardo-photo.jpg";

export function QuemSomos() {
  return (
    <section id="quem-somos" className="py-8 bg-accent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary mb-2">Quem Somos</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Uma iniciativa que nasceu da paixão pelo campo e pela inovação
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Card className="bg-gradient-primary text-white border-0">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">Fundador</h4>
                <p className="text-primary-foreground">
                  <strong>Ricardo Rodrigues Filho</strong><br />
                  Formado em Engenharia e Tecnologia, com especialização em Agronegócio e Marketing Digital. 
                  Reconhecido pela Forbes Under 30 por sua inovação no agro, atua como instrutor do SENAR e é 
                  fundador da RuralTime.com.br.
                </p>
                <div className="flex gap-3 mt-3">
                  <a 
                    href="https://www.instagram.com/ricardorodrigues173/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors underline"
                  >
                    Instagram <ExternalLink className="h-3 w-3" />
                  </a>
                  <a 
                    href="https://linktr.ee/ricardorodrigues173" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors underline"
                  >
                    Linktree <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <img 
                src={ricardoPhoto} 
                alt="Ricardo Rodrigues Filho - Fundador da Rural Time" 
                className="w-80 h-80 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs text-center leading-tight">Forbes<br/>U30</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
