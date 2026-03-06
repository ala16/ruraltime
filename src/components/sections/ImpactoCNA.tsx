import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Network, Smartphone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function ImpactoCNA() {
  const { t } = useLanguage();

  return (
    <section id="impacto" className="py-8 bg-rural-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary mb-2">{t('cna.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t('cna.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow bg-white">
            <CardHeader className="pb-2"><TrendingUp className="w-8 h-8 text-primary mx-auto mb-1" /><CardTitle className="text-lg">{t('cna.supply')}</CardTitle></CardHeader>
            <CardContent><p className="text-muted-foreground text-sm"><strong className="text-primary">{t('cna.goal')}</strong> {t('cna.supplyDesc')}</p></CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-shadow bg-white">
            <CardHeader className="pb-2"><Users className="w-8 h-8 text-secondary mx-auto mb-1" /><CardTitle className="text-lg">{t('cna.diversification')}</CardTitle></CardHeader>
            <CardContent><p className="text-muted-foreground text-sm"><strong className="text-primary">{t('cna.goal')}</strong> {t('cna.diversificationDesc')}</p></CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-shadow bg-white">
            <CardHeader className="pb-2"><Network className="w-8 h-8 text-rural-green mx-auto mb-1" /><CardTitle className="text-lg">{t('cna.collaboration')}</CardTitle></CardHeader>
            <CardContent><p className="text-muted-foreground text-sm"><strong className="text-primary">{t('cna.goal')}</strong> {t('cna.collaborationDesc')}</p></CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-shadow bg-white">
            <CardHeader className="pb-2"><Smartphone className="w-8 h-8 text-rural-green-light mx-auto mb-1" /><CardTitle className="text-lg">{t('cna.technology')}</CardTitle></CardHeader>
            <CardContent><p className="text-muted-foreground text-sm"><strong className="text-primary">{t('cna.goal')}</strong> {t('cna.technologyDesc')}</p></CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card className="bg-gradient-primary text-white border-0">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold mb-2">{t('cna.editionTitle')}</h3>
              <p className="text-base leading-relaxed max-w-4xl mx-auto">{t('cna.editionDesc')}</p>
              <div className="mt-4 inline-flex items-center gap-2 bg-white/20 rounded-full px-6 py-2">
                <span className="font-semibold">{t('cna.aProject')}</span>
                <span className="bg-white text-primary px-3 py-1 rounded-full text-sm font-bold">CNA JOVEM</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
