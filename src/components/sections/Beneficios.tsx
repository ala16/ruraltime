import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Heart, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Beneficios() {
  const { t } = useLanguage();

  return (
    <section id="beneficios" className="py-12 bg-gradient-secondary text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{t('benefits.title')}</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">{t('benefits.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="text-center">
              <Leaf className="w-12 h-12 mx-auto mb-4 text-rural-green-light" />
              <CardTitle className="text-xl">{t('benefits.countryside.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><h4 className="font-semibold">{t('benefits.countryside.income')}</h4><p className="text-white/80 text-sm">{t('benefits.countryside.incomeDesc')}</p></div>
              <div className="space-y-2"><h4 className="font-semibold">{t('benefits.countryside.culture')}</h4><p className="text-white/80 text-sm">{t('benefits.countryside.cultureDesc')}</p></div>
              <div className="space-y-2"><h4 className="font-semibold">{t('benefits.countryside.digital')}</h4><p className="text-white/80 text-sm">{t('benefits.countryside.digitalDesc')}</p></div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="text-center">
              <Heart className="w-12 h-12 mx-auto mb-4 text-rural-green-light" />
              <CardTitle className="text-xl">{t('benefits.city.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><h4 className="font-semibold">{t('benefits.city.authentic')}</h4><p className="text-white/80 text-sm">{t('benefits.city.authenticDesc')}</p></div>
              <div className="space-y-2"><h4 className="font-semibold">{t('benefits.city.education')}</h4><p className="text-white/80 text-sm">{t('benefits.city.educationDesc')}</p></div>
              <div className="space-y-2"><h4 className="font-semibold">{t('benefits.city.wellbeing')}</h4><p className="text-white/80 text-sm">{t('benefits.city.wellbeingDesc')}</p></div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="text-center">
              <Globe className="w-12 h-12 mx-auto mb-4 text-rural-green-light" />
              <CardTitle className="text-xl">{t('benefits.society.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><h4 className="font-semibold">{t('benefits.society.sustainability')}</h4><p className="text-white/80 text-sm">{t('benefits.society.sustainabilityDesc')}</p></div>
              <div className="space-y-2"><h4 className="font-semibold">{t('benefits.society.economy')}</h4><p className="text-white/80 text-sm">{t('benefits.society.economyDesc')}</p></div>
              <div className="space-y-2"><h4 className="font-semibold">{t('benefits.society.integration')}</h4><p className="text-white/80 text-sm">{t('benefits.society.integrationDesc')}</p></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
