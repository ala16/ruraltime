import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Mail, Phone, Instagram, Facebook, Linkedin } from "lucide-react";

export function Contato() {
  return (
    <section id="contato" className="py-20 bg-accent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Contato</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Entre em contato conosco e faça parte da transformação do turismo rural
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Localização */}
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
              <CardTitle className="text-xl">Localização</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                <strong className="text-primary">Região Bragantina</strong><br />
                São Paulo - SP<br />
                Cobrimos toda a região com foco em pequenas propriedades rurais
              </p>
            </CardContent>
          </Card>

          {/* E-mail */}
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Mail className="w-12 h-12 text-primary mx-auto mb-2" />
              <CardTitle className="text-xl">E-mail</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Para parcerias, dúvidas ou suporte:
              </p>
              <a 
                href="mailto:contato@ruraltime.com.br" 
                className="text-primary font-semibold hover:underline text-lg"
              >
                contato@ruraltime.com.br
              </a>
            </CardContent>
          </Card>

          {/* Telefone */}
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Phone className="w-12 h-12 text-primary mx-auto mb-2" />
              <CardTitle className="text-xl">Telefone</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Atendimento personalizado:
              </p>
              <a 
                href="tel:+5511963907046" 
                className="text-primary font-semibold hover:underline text-lg"
              >
                (11) 96390-7046
              </a>
              <p className="text-sm text-muted-foreground mt-2">
                Segunda a sexta, 8h às 18h
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Redes Sociais */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-primary mb-8">Siga-nos nas Redes Sociais</h3>
          <div className="flex justify-center space-x-6">
            <a 
              href="#" 
              className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6 text-white" />
            </a>
            <a 
              href="#" 
              className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6 text-white" />
            </a>
            <a 
              href="#" 
              className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6 text-white" />
            </a>
          </div>
          <p className="text-muted-foreground mt-4">
            Acompanhe novidades, dicas e histórias inspiradoras do campo
          </p>
        </div>

        {/* Mapa conceitual ou call to action */}
        <div className="mt-16">
          <Card className="bg-gradient-secondary text-white border-0">
            <CardContent className="p-8 text-center">
              <h4 className="text-2xl font-bold mb-4">Região Bragantina</h4>
              <p className="text-lg leading-relaxed max-w-3xl mx-auto">
                Atendemos produtores e turistas em Bragança Paulista, Atibaia, Piracaia, 
                Nazaré Paulista, Vargem, Tuiuti e toda a região, conectando experiências 
                autênticas do campo com a proximidade da Grande São Paulo.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}