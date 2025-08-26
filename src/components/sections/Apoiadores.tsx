export function Apoiadores() {
  const apoiadores = [
    {
      nome: "FAESP SENAR",
      logo: "/lovable-uploads/e430ecfc-bbb1-4ef9-9d79-e3299560f3de.png",
      alt: "Logo FAESP SENAR"
    },
    {
      nome: "Sindicato Rural de Piracaia",
      logo: "/lovable-uploads/715d953e-9ffa-4677-a467-b493dc3f95e9.png",
      alt: "Logo Sindicato Rural de Piracaia"
    },
    {
      nome: "Sindicato Rural de Bragança Paulista",
      logo: "/lovable-uploads/56834f25-7ee7-4b35-b278-5ce4bbdd0cde.png",
      alt: "Logo Sindicato Rural de Bragança Paulista"
    },
    {
      nome: "Sindicato Rural de Atibaia",
      logo: "/lovable-uploads/d9ba2bf5-c2e2-4db0-a909-744769d5fbca.png",
      alt: "Logo Sindicato Rural de Atibaia"
    }
  ];

  return (
    <section id="apoiadores" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Nossos Apoiadores</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Contamos com o apoio de importantes instituições do setor rural
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center">
          {apoiadores.map((apoiador, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={apoiador.logo}
                alt={apoiador.alt}
                className="max-h-16 md:max-h-20 w-auto object-contain filter hover:brightness-110 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}