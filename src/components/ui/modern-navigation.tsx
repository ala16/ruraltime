import React, { useState, useEffect } from 'react';
import { Button } from './button';
import { Menu, X, MapPin, Phone, Mail } from 'lucide-react';

interface ModernNavigationProps {
  onSectionClick: (sectionId: string) => void;
}

export const ModernNavigation: React.FC<ModernNavigationProps> = ({ onSectionClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { label: 'Início', id: 'hero' },
    { label: 'Atrativos', id: 'atrativos' },
    { label: 'Artesanato', id: 'artesanatos' },
    { label: 'O que Oferecemos', id: 'oferecemos' },
    { label: 'Como Funciona', id: 'como-funciona' },
    { label: 'Seja Parceiro', id: 'seja-parceiro' },
    { label: 'Contato', id: 'contato' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-rural-primary text-primary-foreground py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Região Bragantina - São Paulo</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>(11) 99999-9999</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>contato@ruraltime.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass shadow-soft py-2' 
          : 'bg-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">RT</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Rural Time</h1>
                <p className="text-sm text-rural-text-light">Turismo e Artesanato na Região Bragantina</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSectionClick(item.id)}
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  {item.label}
                </button>
              ))}
              <Button 
                onClick={() => onSectionClick('propriedades')}
                className="btn-modern bg-gradient-primary hover:bg-gradient-secondary text-primary-foreground px-6 py-2"
              >
                Ver Propriedades
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-foreground"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="glass border-t border-border/20 backdrop-blur-xl">
              <div className="px-4 py-6 space-y-4">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSectionClick(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-3 px-4 text-foreground hover:text-primary hover:bg-accent/50 rounded-lg transition-all duration-200"
                  >
                    {item.label}
                  </button>
                ))}
                <Button 
                  onClick={() => {
                    onSectionClick('propriedades');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full btn-modern bg-gradient-primary hover:bg-gradient-secondary text-primary-foreground"
                >
                  Ver Propriedades
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};