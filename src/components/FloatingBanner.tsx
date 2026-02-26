import { X, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export function FloatingBanner() {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded Card */}
      {isOpen && (
        <div className="relative bg-background border-2 border-primary/20 rounded-2xl shadow-2xl p-5 w-72 animate-fade-in">
          <button
            onClick={() => setIsDismissed(true)}
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Plus className="h-4 w-4 text-primary" />
              </div>
              <h3 className="text-sm font-bold text-foreground">Seja um parceiro</h3>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Cadastre sua propriedade rural ou artesanato e apareça para milhares de turistas.
            </p>

            <Button
              size="sm"
              className="w-full text-sm font-semibold"
              onClick={() => {
                window.open('https://forms.gle/UFPLAfFNQmTmD2VdA', '_blank');
              }}
            >
              Cadastrar agora
            </Button>
          </div>
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Cadastrar propriedade"
      >
        <Plus className={`h-6 w-6 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
      </button>
    </div>
  );
}
