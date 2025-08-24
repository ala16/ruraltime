import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

export function Depoimentos() {
  const depoimentos = [
    {
      texto: "O Rural Time transformou nossa propriedade. Agora recebemos famílias da cidade que se encantam com nossa rotina e ainda geram uma renda extra importante para nossa família.",
      autor: "Maria Silva",
      tipo: "Produtora Rural",
      local: "Sítio Flores do Campo - Bragança Paulista"
    },
    {
      texto: "Foi incrível! Meus filhos aprenderam de onde vem o leite, participaram da ordenha e se divertiram muito. Uma experiência educativa que toda família deveria viver.",
      autor: "Carlos Mendes",
      tipo: "Turista",
      local: "São Paulo - SP"
    },
    {
      texto: "A plataforma é muito fácil de usar. Em poucos minutos consegui cadastrar minha propriedade e já estou recebendo as primeiras reservas. Tecnologia que realmente funciona!",
      autor: "João Santos",
      tipo: "Produtor Rural",
      local: "Fazenda São José - Atibaia"
    }
  ];

  return (
    <section id="depoimentos" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Depoimentos</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Histórias reais de quem já faz parte da família Rural Time
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {depoimentos.map((depoimento, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-primary mb-4 opacity-50" />
                <blockquote className="text-foreground leading-relaxed mb-6">
                  "{depoimento.texto}"
                </blockquote>
                <div className="border-t pt-4">
                  <p className="font-semibold text-primary">{depoimento.autor}</p>
                  <p className="text-sm text-muted-foreground">{depoimento.tipo}</p>
                  <p className="text-xs text-muted-foreground mt-1">{depoimento.local}</p>
                </div>
              </CardContent>
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-primary opacity-10 rounded-bl-full"></div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Quer compartilhar sua experiência?
          </p>
          <button className="text-primary font-semibold hover:underline">
            Envie seu depoimento
          </button>
        </div>
      </div>
    </section>
  );
}