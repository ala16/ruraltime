import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";

const atrativos = [
  {
    id: 1,
    nome: "Adega Vicchini",
    subtitulo: "Vinhas & Vinhos",
    descricao: "Vinho familiar, café moído e em grãos, geleias, mel, patês e uvas frescas selecionadas",
    endereco: "Estrada Municipal Ver. Álvaro Alessandri s/n, Campo Novo, Bragança Paulista - SP",
    telefone: "(11) 4033-6966",
    instagram: "https://www.instagram.com/adegavicchini/",
    facebook: "https://www.facebook.com/VicchiniVV",
    categoria: "Vinícola",
    emoji: "🍷"
  },
  {
    id: 2,
    nome: "Hotel Fazenda Boa Esperança",
    subtitulo: "Espaço Terroir de Bragança",
    descricao: "800 hectares de história nas encostas da Serra da Bocaina. Casa sede neoclássica, terreiro de café, plantação e muito charme rural",
    endereco: "Estr. Mun. Dr. Renato Ferrara, km 5 – Bocaina, Bragança Paulista - SP",
    telefone: "(11) 4032-7788",
    site: "https://maisonterroir.com.br/",
    categoria: "Hotel Fazenda",
    emoji: "🏨"
  },
  {
    id: 3,
    nome: "Aromas de Bragança",
    subtitulo: "Torrefação de Café",
    descricao: "Torrefação artesanal com experiências gastronômicas únicas. 4.982 avaliações no Google",
    endereco: "Estr. Municipal Doutor Renato Ferrara, km5 - Bocaina, Bragança Paulista - SP, 12921-880",
    telefone: "(11) 94485-2320",
    horario: "Segunda às 08:00",
    categoria: "Café",
    emoji: "☕"
  },
  {
    id: 4,
    nome: "Lagarta Sucateira",
    subtitulo: "Ateliê da Infância e Educação",
    descricao: "Escola de artes e educação criativa. 5.022 avaliações no Google",
    endereco: "Estr. Mun. Aurelio Frias Fernandes - Bairro do Menin, Bragança Paulista - SP, 12929-899",
    horario: "Domingo às 19:00",
    instagram: "https://www.instagram.com/lagarta_sucateira/",
    facebook: "https://www.facebook.com/LagartaSucateira/",
    categoria: "Arte e Educação",
    emoji: "🎨"
  }
];

export function Atrativos() {
  return (
    <section id="atrativos" className="py-20 bg-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Atrativos Turísticos de Bragança Paulista
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Descubra experiências autênticas na região bragantina. Do campo à mesa, 
            de vinícolas históricas a ateliês criativos, cada destino conta uma história única.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {atrativos.map((atrativo) => (
            <Card key={atrativo.id} className="hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{atrativo.emoji}</span>
                  <div>
                    <CardTitle className="text-xl text-primary group-hover:text-secondary transition-colors">
                      {atrativo.nome}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground font-medium">
                      {atrativo.subtitulo}
                    </p>
                  </div>
                </div>
                <div className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full">
                  {atrativo.categoria}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {atrativo.descricao}
                </p>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{atrativo.endereco}</span>
                  </div>
                  
                  {atrativo.telefone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                      <a 
                        href={`tel:${atrativo.telefone.replace(/\D/g, '')}`}
                        className="text-primary hover:underline font-medium"
                      >
                        {atrativo.telefone}
                      </a>
                    </div>
                  )}
                  
                  {atrativo.horario && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{atrativo.horario}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {atrativo.instagram && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      asChild
                      className="hover:bg-primary hover:text-white"
                    >
                      <a href={atrativo.instagram} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Instagram
                      </a>
                    </Button>
                  )}
                  
                  {atrativo.facebook && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      asChild
                      className="hover:bg-primary hover:text-white"
                    >
                      <a href={atrativo.facebook} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Facebook
                      </a>
                    </Button>
                  )}
                  
                  {atrativo.site && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      asChild
                      className="hover:bg-secondary hover:text-white"
                    >
                      <a href={atrativo.site} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Site Oficial
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Card className="bg-gradient-primary text-white border-0 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Mais Destinos em Breve</h3>
              <p className="text-lg leading-relaxed mb-6">
                Estamos mapeando e cadastrando novos atrativos turísticos da Região Bragantina. 
                Em breve, teremos 34+ destinos únicos para você explorar.
              </p>
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
              >
                Cadastre Seu Atrativo
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}