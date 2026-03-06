import { ExternalLink, Accessibility } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import incluiCampoLogo from "@/assets/incluicampo-logo.png";
import { useLanguage } from "@/contexts/LanguageContext";

export function IncluiCampo() {
  const { t } = useLanguage();

  return (
    <section id="incluicampo" className="py-6 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden border-2">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 flex items-center justify-center">
                  <img src={incluiCampoLogo} alt="IncluiCampo - Caminhos sem Barreiras" className="w-full max-w-xs" />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <Accessibility className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold">{t('incluiCampo.title')}</h2>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    <strong className="text-foreground">Inclui Campo</strong> {t('incluiCampo.desc')}
                  </p>
                  <Button variant="default" className="w-full sm:w-auto" onClick={() => window.open('https://incluicampo.com.br/', '_blank')}>
                    {t('incluiCampo.cta')}<ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
