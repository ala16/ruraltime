import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export function FloatingBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
    <div className="relative bg-gradient-primary text-white rounded-lg shadow-2xl p-3 w-52">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-1 right-1 text-white/80 hover:text-white transition-colors"
          aria-label="Fechar"
        >
          <X size={16} />
        </button>
        
        <div className="pt-4">
          <p className="text-xs font-medium mb-2 leading-tight">
            Cadastre sua propriedade ou artesanato rural
          </p>
          
          <Button
            variant="secondary"
            size="sm"
            className="w-full text-xs h-8"
            onClick={() => window.open('https://forms.gle/UFPLAfFNQmTmD2VdA', '_blank')}
          >
            Cadastrar
          </Button>
        </div>
      </div>
    </div>
  );
}
