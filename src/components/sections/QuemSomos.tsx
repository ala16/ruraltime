import { Card, CardContent } from "@/components/ui/card";

export function QuemSomos() {
  return (
    <section id="quem-somos" className="py-20 bg-accent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Quem Somos</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Uma iniciativa que nasceu da paixão pelo campo e pela inovação
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-primary mb-4">
              Nossa História
            </h3>
            <p className="text-lg text-foreground leading-relaxed">
              O Rural Time surge como uma resposta inovadora aos desafios do turismo rural no Brasil. 
              Nossa plataforma digital conecta pequenos produtores rurais a turistas em busca de experiências 
              autênticas no campo.
            </p>
            <p className="text-lg text-foreground leading-relaxed">
              <strong className="text-primary">Nossa missão:</strong> Aumentar a oferta de turismo rural, 
              diversificar a renda dos produtores e aproximar cidade e campo por meio da tecnologia.
            </p>
            
            <Card className="bg-gradient-primary text-white border-0">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">Criado por</h4>
                <p className="text-primary-foreground">
                  <strong>Ricardo Augusto Lima Rodrigues</strong><br />
                  Instrutor do Senar e Líder do Agro<br />
                  Participante do CNA Jovem – 6ª edição São Paulo
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <img 
                src="/lovable-uploads/90cfd02e-03c8-4d03-b0f9-ef03d64c6bbc.png" 
                alt="Ricardo Augusto Lima Rodrigues" 
                className="w-80 h-80 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">CNA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}