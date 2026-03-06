import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Handshake, Building, Users, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export function SejaParceiro() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ nome: "", email: "", telefone: "", organizacao: "", tipo: "", mensagem: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: t('partner.successTitle'), description: t('partner.successDesc') });
    setFormData({ nome: "", email: "", telefone: "", organizacao: "", tipo: "", mensagem: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="parceiros" className="py-8 bg-gradient-primary text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">{t('partner.title')}</h2>
          <p className="text-lg opacity-90 max-w-3xl mx-auto mb-4">{t('partner.subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('/atrativos')} className="h-11 px-8 rounded-md bg-white text-primary hover:bg-white/90 font-semibold shadow-lg transition-all duration-300 cursor-pointer">
              {t('partner.iamTourist')}
            </button>
            <button onClick={() => window.open('https://forms.gle/hWsAQR4uZ9B9sBCx7', '_blank')} className="h-11 px-8 rounded-md bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-semibold transition-all duration-300 cursor-pointer">
              {t('partner.iamProducer')}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-8">
            <h3 className="text-2xl font-bold mb-6">{t('partner.why')}</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4"><Handshake className="w-8 h-8 text-rural-green-light flex-shrink-0 mt-1" /><div><h4 className="font-semibold text-lg mb-2">{t('partner.unions')}</h4><p className="text-white/80">{t('partner.unionsDesc')}</p></div></div>
              <div className="flex items-start gap-4"><Building className="w-8 h-8 text-rural-green-light flex-shrink-0 mt-1" /><div><h4 className="font-semibold text-lg mb-2">{t('partner.cooperatives')}</h4><p className="text-white/80">{t('partner.cooperativesDesc')}</p></div></div>
              <div className="flex items-start gap-4"><Users className="w-8 h-8 text-rural-green-light flex-shrink-0 mt-1" /><div><h4 className="font-semibold text-lg mb-2">{t('partner.institutions')}</h4><p className="text-white/80">{t('partner.institutionsDesc')}</p></div></div>
              <div className="flex items-start gap-4"><Heart className="w-8 h-8 text-rural-green-light flex-shrink-0 mt-1" /><div><h4 className="font-semibold text-lg mb-2">{t('partner.supporters')}</h4><p className="text-white/80">{t('partner.supportersDesc')}</p></div></div>
            </div>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader><CardTitle className="text-white text-xl">{t('partner.contactTitle')}</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div><Label htmlFor="nome" className="text-white">{t('partner.fullName')}</Label><Input id="nome" value={formData.nome} onChange={(e) => handleInputChange("nome", e.target.value)} className="bg-white/20 border-white/30 text-white placeholder:text-white/60" placeholder={t('partner.namePlaceholder')} required /></div>
                  <div><Label htmlFor="email" className="text-white">{t('contact.email')}</Label><Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} className="bg-white/20 border-white/30 text-white placeholder:text-white/60" placeholder={t('partner.emailPlaceholder')} required /></div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><Label htmlFor="telefone" className="text-white">{t('partner.phone')}</Label><Input id="telefone" value={formData.telefone} onChange={(e) => handleInputChange("telefone", e.target.value)} className="bg-white/20 border-white/30 text-white placeholder:text-white/60" placeholder="(11) 99999-9999" /></div>
                  <div><Label htmlFor="organizacao" className="text-white">{t('partner.organization')}</Label><Input id="organizacao" value={formData.organizacao} onChange={(e) => handleInputChange("organizacao", e.target.value)} className="bg-white/20 border-white/30 text-white placeholder:text-white/60" placeholder={t('partner.orgPlaceholder')} /></div>
                </div>
                <div>
                  <Label htmlFor="tipo" className="text-white">{t('partner.partnershipType')}</Label>
                  <Select value={formData.tipo} onValueChange={(value) => handleInputChange("tipo", value)}>
                    <SelectTrigger className="bg-white/20 border-white/30 text-white"><SelectValue placeholder={t('partner.selectType')} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sindicato">{t('partner.typeUnion')}</SelectItem>
                      <SelectItem value="cooperativa">{t('partner.typeCooperative')}</SelectItem>
                      <SelectItem value="instituicao">{t('partner.typeInstitution')}</SelectItem>
                      <SelectItem value="empresa">{t('partner.typeCompany')}</SelectItem>
                      <SelectItem value="apoiador">{t('partner.typeSupporter')}</SelectItem>
                      <SelectItem value="outro">{t('partner.typeOther')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="mensagem" className="text-white">{t('partner.message')}</Label>
                  <Textarea id="mensagem" value={formData.mensagem} onChange={(e) => handleInputChange("mensagem", e.target.value)} className="bg-white/20 border-white/30 text-white placeholder:text-white/60 min-h-[100px]" placeholder={t('partner.messagePlaceholder')} />
                </div>
                <Button type="submit" variant="hero" className="w-full bg-white text-primary hover:bg-white/90">{t('partner.submit')}</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
