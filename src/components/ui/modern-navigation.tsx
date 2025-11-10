import React, { useState, useEffect } from 'react';
import { Button } from './button';
import { Menu, X, MapPin, Phone, Mail } from 'lucide-react';
import ruralTimeLogo from "@/assets/rural-time-logo-new.png";

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
    { label: 'Início', id: '/', isRoute: true },
    { label: 'Atrativos', id: 'atrativos', isRoute: false },
    { label: 'Artesanato', id: 'artesanatos', isRoute: false },
    { label: 'O que Oferecemos', id: 'oferecemos', isRoute: false },
    { label: 'Como Funciona', id: 'como-funciona', isRoute: false },
    { label: 'Blog', id: '/blog', isRoute: true },
    { label: 'Contato', id: 'contato', isRoute: false },
  ];

  const handleNavClick = (item: typeof navigationItems[0]) => {
    if (item.isRoute) {
      window.location.href = item.id;
    } else {
      onSectionClick(item.id);
    }
  };

  return (
    <>
      {/* Main Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-white/20 py-3' 
          : 'bg-white/10 backdrop-blur-md py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img 
                src={ruralTimeLogo} 
                alt="Rural Time Logo" 
                className="h-16 w-auto"
              />
              <div>
                <h1 className={`text-xl font-bold transition-colors ${
                  isScrolled ? 'text-rural-primary' : 'text-white'
                }`}>Rural Time</h1>
                <p className={`text-sm transition-colors ${
                  isScrolled ? 'text-rural-text-light' : 'text-white/90'
                }`}>Turismo Rural e Artesanato Brasileiro</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`font-medium transition-all duration-200 hover:scale-105 ${
                    isScrolled 
                      ? 'text-rural-primary hover:text-rural-secondary' 
                      : 'text-white hover:text-rural-secondary'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`transition-colors ${
                  isScrolled ? 'text-rural-primary hover:bg-rural-accent/20' : 'text-white hover:bg-white/10'
                }`}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="bg-white/95 backdrop-blur-lg border-t border-rural-accent/20 shadow-xl">
              <div className="px-4 py-6 space-y-4">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      handleNavClick(item);
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-3 px-4 text-rural-primary hover:text-rural-secondary hover:bg-rural-accent/10 rounded-lg transition-all duration-200 font-medium"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};