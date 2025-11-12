import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

export function FloatingBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isPeeking, setIsPeeking] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollCount, setScrollCount] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Detecta se houve scroll significativo (mais de 50px)
      if (Math.abs(currentScrollY - lastScrollY) > 50) {
        setScrollCount(prev => {
          const newCount = prev + 1;
          if (newCount >= 2 && !isPeeking && !isExpanded) {
            setIsPeeking(true);
          }
          return newCount;
        });
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isPeeking, isExpanded]);

  const handleClick = () => {
    if (isPeeking && !isExpanded) {
      setIsExpanded(true);
    }
  };

  if (!isVisible) return null;

  const getTransform = () => {
    if (isExpanded) return "translateX(0)";
    if (isPeeking) return "translateX(calc(100% - 40px))"; // Mostra apenas 40px
    return "translateX(100%)"; // Escondido completamente
  };

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 transition-transform duration-500 ease-out ${isPeeking && !isExpanded ? 'cursor-pointer' : ''}`}
      style={{ transform: getTransform() }}
      onClick={handleClick}
    >
    <div className="relative bg-gradient-primary text-white rounded-lg shadow-2xl p-3 w-52 hover:shadow-xl transition-shadow duration-300">
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
