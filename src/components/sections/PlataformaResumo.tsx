import { Card, CardContent } from "@/components/ui/card";
import { Users, MapPin, TrendingUp, Network, Smartphone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function PlataformaResumo() {
  const { t } = useLanguage();

  return (
    <section id="oferecemos" className="py-8 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-primary mb-1">{t('platform.title')}</h2>
          <p className="text-sm text-muted-foreground">{t('platform.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-3 mb-8">
          <Card className="border-primary/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-sm text-primary">{t('platform.forTourists')}</h3>
              </div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• {t('platform.tourist1')}</li>
                <li>• {t('platform.tourist2')}</li>
                <li>• {t('platform.tourist3')}</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-secondary/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-secondary" />
                <h3 className="font-bold text-sm text-primary">{t('platform.forProducers')}</h3>
              </div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• {t('platform.producer1')}</li>
                <li>• {t('platform.producer2')}</li>
                <li>• {t('platform.producer3')}</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-primary text-white border-0">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="bg-white/20 rounded-full px-3 py-1 text-xs font-bold whitespace-nowrap">CNA JOVEM</span>
                <p className="text-sm">{t('platform.cnaProject')}</p>
              </div>
              <div className="flex gap-4 flex-shrink-0">
                {[
                  { icon: TrendingUp, label: t('platform.supply') },
                  { icon: Users, label: t('platform.diversification') },
                  { icon: Network, label: t('platform.collaboration') },
                  { icon: Smartphone, label: t('platform.technology') },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <item.icon className="w-5 h-5 mx-auto mb-1 text-white/80" />
                    <span className="text-[10px] text-white/70">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
