import ruralTimeLogo from "@/assets/rural-time-logo-new.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { CrawlableCityNav } from "@/components/seo/CrawlableCityNav";

interface FooterProps {
  onSectionClick?: (section: string) => void;
}

export function Footer({ onSectionClick }: FooterProps) {
  const { t } = useLanguage();

  return <footer className="bg-primary text-white py-10">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <img src={ruralTimeLogo} alt="Rural Time" className="h-24 w-auto mb-4" loading="lazy" />
          <p className="text-white/80 leading-relaxed mb-4">{t('footer.desc')}</p>
          <p className="text-white/70 text-sm">
            {t('footer.createdBy')} <strong>Ricardo Augusto Lima Rodrigues</strong><br />
            {t('footer.role')}
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-4">{t('footer.quickLinks')}</h4>
          <ul className="space-y-2">
            <li><button onClick={() => onSectionClick?.("inicio")} className="text-white/80 hover:text-white transition-colors">{t('footer.start')}</button></li>
            <li><button onClick={() => onSectionClick?.("quem-somos")} className="text-white/80 hover:text-white transition-colors">{t('footer.aboutUs')}</button></li>
            <li><button onClick={() => onSectionClick?.("parceiros")} className="text-white/80 hover:text-white transition-colors">{t('footer.bePartner')}</button></li>
            <li><a href="https://linktr.ee/ricardorodrigues173" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">{t('footer.contact')}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-4">{t('footer.contactTitle')}</h4>
          <ul className="space-y-2 text-white/80 mb-4">
            <li>Bragança Paulista - SP - Brasil</li>
            <li><a href="mailto:contato@rbitengenharia.com.br" className="hover:text-white transition-colors">contato@rbitengenharia.com.br</a></li>
            <li><a href="https://wa.me/5511943032251" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">(11) 94303-2251</a></li>
          </ul>
          <div className="flex gap-3">
            <a href="https://www.instagram.com/agroruraltime" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-white font-medium text-sm transition-all duration-200 hover:scale-105">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              Instagram
            </a>
            <a href="https://linktr.ee/ricardorodrigues173" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-white font-medium text-sm transition-all duration-200 hover:scale-105">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M7.953 15.066l-.038.02c-.036.018-.075.035-.113.055a1.27 1.27 0 01-.584.15c-.397 0-.72-.308-.72-.689 0-.229.126-.44.324-.56l4.308-2.66v5.618l-3.177-1.934zm8.132-1.932a.714.714 0 01-.32.56l-3.178 1.932V10.01l4.308 2.66c.036.017.073.035.109.053l.042.022a.69.69 0 01.321.558c0 .381-.323.689-.72.689a1.27 1.27 0 01-.562-.138zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"/></svg>
              Linktree
            </a>
          </div>
        </div>
      </div>

      <CrawlableCityNav />

      <div className="border-t border-white/20 mt-12 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm mb-4 md:mb-0">{t('footer.rights')}</p>
          <div className="flex items-center space-x-4">
            <span className="text-white/70 text-sm">{t('footer.poweredBy')}</span>
            <a href="https://rbitengenharia.com.br/" target="_blank" rel="noopener noreferrer" className="bg-white/20 rounded-full px-3 py-1"><span className="text-white font-bold text-sm">RBIT HUB</span></a>
          </div>
        </div>
      </div>
    </div>
  </footer>;
}
