import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

export function FloatingBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsMinimized(true);
      }, 2000); // Minimiza após 2 segundos de scroll
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const handleClick = () => {
    setIsActive(true);
    setIsMinimized(false);
    
    setTimeout(() => {
      setIsActive(false);
    }, 3000); // Volta ao normal após 3 segundos
  };

  if (!isVisible) return null;

  const getOpacity = () => {
    if (isActive) return "opacity-100";
    if (isMinimized) return "opacity-30";
    return "opacity-70";
  };

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 animate-fade-in transition-opacity duration-500 ${getOpacity()}`}
      onClick={handleClick}
    >
    <div className="relative bg-gradient-primary text-white rounded-lg shadow-2xl p-3 w-52 cursor-pointer hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(false);
          }}
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
            onClick={(e) => {
              e.stopPropagation();
              window.open('https://forms.gle/UFPLAfFNQmTmD2VdA', '_blank');
            }}
          >
            Cadastrar
          </Button>
        </div>
      </div>
    </div>
  );
}
