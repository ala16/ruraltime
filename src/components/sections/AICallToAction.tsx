import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bot, Sparkles, ArrowRight } from "lucide-react";

export function AICallToAction() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-card/80 backdrop-blur-sm border border-primary/15 rounded-3xl p-8 md:p-12 shadow-xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Inteligência Artificial</span>
          </div>

          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
              <Bot className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Quer implementar turismo rural na sua propriedade?
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Converse com a <strong className="text-foreground">Ruraltime AI</strong> — nossa assistente especializada em turismo rural.
            Receba dicas personalizadas sobre como começar, legislação, sustentabilidade e muito mais.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/ia")}
              className="text-lg px-8 py-4 bg-primary hover:bg-primary/90 shadow-lg group"
            >
              <Bot className="w-5 h-5 mr-2" />
              Conversar com a IA
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
            <span className="px-3 py-1 bg-muted rounded-full flex items-center gap-1"><Leaf className="h-3 w-3" /> Sustentabilidade</span>
            <span className="px-3 py-1 bg-muted rounded-full flex items-center gap-1"><FileText className="h-3 w-3" /> Legislação</span>
            <span className="px-3 py-1 bg-muted rounded-full flex items-center gap-1"><Lightbulb className="h-3 w-3" /> Dicas de negócio</span>
            <span className="px-3 py-1 bg-muted rounded-full flex items-center gap-1"><Home className="h-3 w-3" /> Infraestrutura</span>
          </div>
        </div>
      </div>
    </section>
  );
}
