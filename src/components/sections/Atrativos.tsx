import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const atrativos = [{
  id: 1,
  nome: "Adega Vicchini",
  subtitulo: "Vinhas & Vinhos",
  imagem: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
  categoria: "Vinícola",
  emoji: "🍷"
}, {
  id: 2,
  nome: "Hotel Fazenda Boa Esperança",
  subtitulo: "Espaço Terroir de Bragança",
  imagem: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
  categoria: "Hotel Fazenda",
  emoji: "🏨"
}, {
  id: 3,
  nome: "Aromas de Bragança",
  subtitulo: "Torrefação de Café",
  imagem: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop",
  categoria: "Café",
  emoji: "☕"
}, {
  id: 4,
  nome: "Lagarta Sucateira",
  subtitulo: "Ateliê da Infância e Educação",
  imagem: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
  categoria: "Arte e Educação",
  emoji: "🎨"
}];

export function Atrativos() {
  return (
    <section id="atrativos" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Atrativos da Região</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubra os melhores destinos rurais da Região Bragantina
          </p>
        </div>

        <Carousel
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {atrativos.map((atrativo) => (
              <CarouselItem key={atrativo.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={atrativo.imagem}
                    alt={atrativo.nome}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{atrativo.emoji}</span>
                      <span className="text-sm bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                        {atrativo.categoria}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{atrativo.nome}</h3>
                    <p className="text-sm text-white/90">{atrativo.subtitulo}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}