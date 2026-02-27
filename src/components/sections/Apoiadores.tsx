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
import cachacaTradeFairLogo from "@/assets/apoiador-cachaca-trade-fair.jpg";
import wineTradeFairLogo from "@/assets/apoiador-wine-trade-fair.jpg";

export function Apoiadores() {
  const apoiadores = [
    { nome: "FAESP", logo: "/lovable-uploads/2edc709e-34ba-4fca-ba0e-8708c15dd363.png", alt: "Logo FAESP" },
    { nome: "SENAR", logo: "/lovable-uploads/9f8fe04f-5a65-42a9-842f-3f2da97920e4.png", alt: "Logo SENAR" },
    { nome: "Sindicato Rural de Piracaia", logo: "/lovable-uploads/8f4c3935-a693-45a8-a5f5-286ebc58b661.png", alt: "Logo Sindicato Rural de Piracaia" },
    { nome: "Sindicato Rural de Atibaia", logo: "/lovable-uploads/1b844a56-a2d5-439d-b9b7-4861b7ab0615.png", alt: "Logo Sindicato Rural de Atibaia" },
    { nome: "Sindicato Rural de Bragança Paulista", logo: "/lovable-uploads/7b6d29b4-588a-4f88-a07a-9a003ec14747.png", alt: "Logo Sindicato Rural de Bragança Paulista" },
    { nome: "Sindicato Rural de Monte Mor", logo: monteMorLogo, alt: "Logo Sindicato Rural de Monte Mor - SP" },
    { nome: "Aromas e Sabores", logo: aromasSaboresLogo, alt: "Logo Aromas e Sabores Cafeteria Artesanal" },
    { nome: "Rancho do Ferreiro", logo: ranchoFerreiroLogo, alt: "Logo Rancho do Ferreiro" },
    { nome: "São Ignácio", logo: saoIgnacioLogo, alt: "Logo São Ignácio Pesqueiro e Restaurante" },
    { nome: "Candida Baptista", logo: candidaBaptistaLogo, alt: "Logo Candida Baptista Turismo Rural" },
    { nome: "Adega Vicchini", logo: adegaVicchiniLogo, alt: "Logo Adega Vicchini" },
    { nome: "IncluiCampo", logo: incluiCampoLogo, alt: "Logo IncluiCampo" },
    { nome: "Sindicato Rural de Porangaba", logo: sindicatoPorangabaLogo, alt: "Logo Sindicato Rural de Porangaba" },
    { nome: "Café Santa Serra", logo: cafeSantaSerraLogo, alt: "Logo Café Santa Serra" },
    { nome: "Cachaça Trade Fair", logo: cachacaTradeFairLogo, alt: "Logo Cachaça Trade Fair" },
    { nome: "Wine Trade Fair", logo: wineTradeFairLogo, alt: "Logo São Paulo International Wine Trade Fair" },
  ];

  // Duplicate for seamless infinite scroll
  const duplicated = [...apoiadores, ...apoiadores];

  return (
    <section id="apoiadores" className="py-4 bg-muted/30 overflow-hidden" aria-label="Apoiadores e parceiros do turismo rural">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-sm text-muted-foreground mb-3">
          Nossos <strong className="text-foreground">{apoiadores.length} apoiadores</strong> — instituições do setor rural
        </h2>

        <div className="relative">
          <div className="flex gap-8 animate-marquee">
            {duplicated.map((apoiador, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center h-12"
              >
                <img
                  src={apoiador.logo}
                  alt={apoiador.alt}
                  className="h-14 w-auto object-contain opacity-90 hover:opacity-100 transition-all duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
