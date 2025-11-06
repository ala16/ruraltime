import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export function FloatingBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <div className="relative bg-gradient-primary text-white rounded-lg shadow-2xl p-4 max-w-sm">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-white/80 hover:text-white transition-colors"
          aria-label="Fechar"
        >
          <X size={20} />
        </button>
        
        <div className="pr-6">
          <p className="text-sm font-medium mb-3">
            Quero cadastrar a minha propriedade de turismo rural ou Artesanato Rural
          </p>
          
          <Button
            variant="secondary"
            size="sm"
            className="w-full"
            onClick={() => window.open('https://forms.gle/UFPLAfFNQmTmD2VdA', '_blank')}
          >
            Cadastrar Agora
          </Button>
        </div>
      </div>
    </div>
  );
}
