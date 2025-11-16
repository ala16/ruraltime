import React, { useState, useEffect } from 'react';
import { Button } from './button';
import { Menu, X, MapPin, Phone, Mail, Moon, Sun, Globe } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/contexts/LanguageContext';
import ruralTimeLogo from "@/assets/rural-time-logo-new.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ModernNavigationProps {
  onSectionClick: (sectionId: string) => void;
}

export const ModernNavigation: React.FC<ModernNavigationProps> = ({ onSectionClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { label: t('nav.home'), id: '/', isRoute: true },
    { label: t('nav.attractions'), id: 'atrativos', isRoute: false },
    { label: t('nav.crafts'), id: 'artesanatos', isRoute: false },
    { label: t('nav.offer'), id: 'oferecemos', isRoute: false },
    { label: t('nav.howItWorks'), id: 'como-funciona', isRoute: false },
    { label: t('nav.blog'), id: '/blog', isRoute: true },
    { label: t('nav.contact'), id: 'contato', isRoute: false },
  ];

  const languages = [
    { code: 'pt' as const, label: 'PT', flag: '🇧🇷' },
    { code: 'en' as const, label: 'EN', flag: '🇺🇸' },
    { code: 'es' as const, label: 'ES', flag: '🇪🇸' },
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
            <div className="hidden lg:flex items-center space-x-6">
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
              
              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`transition-colors ${
                      isScrolled ? 'text-rural-primary hover:bg-rural-accent/20' : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <Globe className="h-4 w-4 mr-1" />
                    {languages.find(l => l.code === language)?.label}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background/95 backdrop-blur-lg border-border z-[100]">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={language === lang.code ? 'bg-accent' : ''}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`transition-colors ${
                  isScrolled ? 'text-rural-primary hover:bg-rural-accent/20' : 'text-white hover:bg-white/10'
                }`}
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              {/* Theme Toggle Mobile */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`transition-colors ${
                  isScrolled ? 'text-rural-primary hover:bg-rural-accent/20' : 'text-white hover:bg-white/10'
                }`}
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              
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
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-rural-accent/20 shadow-xl">
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
                
                {/* Language Selector Mobile */}
                <div className="pt-4 border-t border-rural-accent/20">
                  <p className="text-sm text-muted-foreground mb-2 px-4">Idioma / Language</p>
                  <div className="flex gap-2">
                    {languages.map((lang) => (
                      <Button
                        key={lang.code}
                        variant={language === lang.code ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setLanguage(lang.code)}
                        className="flex-1"
                      >
                        <span className="mr-1">{lang.flag}</span>
                        {lang.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};