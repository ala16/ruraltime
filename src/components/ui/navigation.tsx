import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./button";
import ruralTimeLogo from "@/assets/rural-time-logo.png";

interface NavigationProps {
  onSectionClick: (section: string) => void;
}

export function Navigation({ onSectionClick }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Início", id: "inicio" },
    { label: "Quem Somos", id: "quem-somos" },
    { label: "O que Oferecemos", id: "oferecemos" },
    { label: "Benefícios", id: "beneficios" },
    { label: "Como Funciona", id: "como-funciona" },
    { label: "Impacto CNA Jovem", id: "impacto" },
    { label: "Depoimentos", id: "depoimentos" },
    { label: "Parceiros", id: "parceiros" },
    { label: "Contato", id: "contato" },
  ];

  const handleMenuClick = (sectionId: string) => {
    onSectionClick(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={ruralTimeLogo} 
              alt="Rural Time" 
              className="h-10 w-auto cursor-pointer"
              onClick={() => handleMenuClick("inicio")}
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Button 
              variant="default" 
              size="sm"
              onClick={() => handleMenuClick("parceiros")}
            >
              Seja Parceiro
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-accent">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleMenuClick("parceiros")}
                >
                  Seja Parceiro
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}