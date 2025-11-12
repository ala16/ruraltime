import { useEffect, useState, useRef } from "react";
import monteMorLogo from "@/assets/apoiador-monte-mor.png";
import aromasSaboresLogo from "@/assets/apoiador-aromas-sabores.png";
import ranchoFerreiroLogo from "@/assets/apoiador-rancho-ferreiro.png";
import saoIgnacioLogo from "@/assets/apoiador-sao-ignacio.png";
import candidaBaptistaLogo from "@/assets/apoiador-candida-baptista.jpg";
import adegaVicchiniLogo from "@/assets/apoiador-adega-vicchini.png";
import incluiCampoLogo from "@/assets/apoiador-incluicampo.png";
import sindicatoPorangabaLogo from "@/assets/apoiador-sindicato-porangaba.jpg";
import cafeSantaSerraLogo from "@/assets/apoiador-cafe-santa-serra.png";

export function Apoiadores() {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const apoiadores = [
    {
      nome: "FAESP",
      logo: "/lovable-uploads/2edc709e-34ba-4fca-ba0e-8708c15dd363.png",
      alt: "Logo FAESP"
    },
    {
      nome: "SENAR",
      logo: "/lovable-uploads/9f8fe04f-5a65-42a9-842f-3f2da97920e4.png",
      alt: "Logo SENAR"
    },
    {
      nome: "Sindicato Rural de Piracaia",
      logo: "/lovable-uploads/8f4c3935-a693-45a8-a5f5-286ebc58b661.png",
      alt: "Logo Sindicato Rural de Piracaia"
    },
    {
      nome: "Sindicato Rural de Atibaia",
      logo: "/lovable-uploads/1b844a56-a2d5-439d-b9b7-4861b7ab0615.png",
      alt: "Logo Sindicato Rural de Atibaia"
    },
    {
      nome: "Sindicato Rural de Bragança Paulista",
      logo: "/lovable-uploads/7b6d29b4-588a-4f88-a07a-9a003ec14747.png",
      alt: "Logo Sindicato Rural de Bragança Paulista"
    },
    {
      nome: "Sindicato Rural de Monte Mor",
      logo: monteMorLogo,
      alt: "Logo Sindicato Rural de Monte Mor - SP"
    },
    {
      nome: "Aromas e Sabores Cafeteria Artesanal",
      logo: aromasSaboresLogo,
      alt: "Logo Aromas e Sabores Cafeteria Artesanal"
    },
    {
      nome: "Rancho do Ferreiro",
      logo: ranchoFerreiroLogo,
      alt: "Logo Rancho do Ferreiro"
    },
    {
      nome: "São Ignácio Pesqueiro e Restaurante",
      logo: saoIgnacioLogo,
      alt: "Logo São Ignácio Pesqueiro e Restaurante"
    },
    {
      nome: "Candida Baptista Turismo Rural",
      logo: candidaBaptistaLogo,
      alt: "Logo Candida Baptista Turismo Rural"
    },
    {
      nome: "Adega Vicchini",
      logo: adegaVicchiniLogo,
      alt: "Logo Adega Vicchini - vinhas & vinhos"
    },
    {
      nome: "IncluiCampo",
      logo: incluiCampoLogo,
      alt: "Logo IncluiCampo - Caminhos sem Barreiras"
    },
    {
      nome: "Sindicato Rural de Porangaba",
      logo: sindicatoPorangabaLogo,
      alt: "Logo Sindicato Rural de Porangaba"
    },
    {
      nome: "Café Santa Serra",
      logo: cafeSantaSerraLogo,
      alt: "Logo Café Santa Serra"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const increment = apoiadores.length / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= apoiadores.length) {
          setCount(apoiadores.length);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible, apoiadores.length]);

  return (
    <section ref={sectionRef} id="apoiadores" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <h2 className="text-4xl font-bold text-primary">Nossos Apoiadores</h2>
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border-2 border-primary">
              <span className="text-2xl font-bold text-primary">{count}</span>
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Contamos com o apoio de importantes instituições do setor rural
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center">
          {apoiadores.map((apoiador, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={apoiador.logo}
                alt={apoiador.alt}
                className="max-h-24 md:max-h-28 w-auto object-contain filter hover:brightness-110 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}