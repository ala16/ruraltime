import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Mail, MessageCircle, Instagram, Facebook } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Contato() {
  const { t } = useLanguage();

  return <section id="contato" className="py-8 bg-accent">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2">{t('contact.title')}</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t('contact.subtitle')}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardHeader><MapPin className="w-8 h-8 text-primary mx-auto mb-2" /><CardTitle className="text-xl">{t('contact.location')}</CardTitle></CardHeader>
          <CardContent><p className="text-muted-foreground">Bragança Paulista - SP - Brasil</p></CardContent>
        </Card>
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardHeader><Mail className="w-8 h-8 text-primary mx-auto mb-2" /><CardTitle className="text-xl">{t('contact.email')}</CardTitle></CardHeader>
          <CardContent><a href="mailto:contato@ruraltime.com.br" className="text-primary font-semibold hover:underline text-lg">contato@ruraltime.com.br</a></CardContent>
        </Card>
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardHeader><MessageCircle className="w-8 h-8 text-primary mx-auto mb-2" /><CardTitle className="text-xl">WhatsApp</CardTitle></CardHeader>
          <CardContent><a href="https://wa.me/5511943032251" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline text-lg">(11) 94303-2251</a></CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-xl font-bold text-primary mb-4">{t('contact.socialTitle')}</h3>
        <div className="flex justify-center space-x-6">
          <a href="https://www.instagram.com/agroruraltime/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="Instagram"><Instagram className="w-6 h-6 text-white" /></a>
          <a href="https://www.facebook.com/AgroRuralTime/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="Facebook"><Facebook className="w-6 h-6 text-white" /></a>
        </div>
        <p className="text-muted-foreground mt-4">{t('contact.socialSubtitle')}</p>
      </div>

      <div className="mt-8"><Card className="bg-gradient-secondary text-white border-0"></Card></div>
    </div>
  </section>;
}
