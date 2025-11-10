import ruralTimeLogo from "@/assets/rural-time-logo-new.png";
interface FooterProps {
  onSectionClick: (section: string) => void;
}
export function Footer({
  onSectionClick
}: FooterProps) {
  return <footer className="bg-primary text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="md:col-span-2">
            <img src={ruralTimeLogo} alt="Rural Time Logo" className="h-24 w-auto mb-4" />
            <p className="text-white/80 leading-relaxed mb-4">
              Rural Time – Plataforma de Turismo Rural e Inovação no Agro. 
              Um projeto conectado aos valores e objetivos do CNA Jovem.
            </p>
            <p className="text-white/70 text-sm">
              Criado por <strong>Ricardo Augusto Lima Rodrigues</strong><br />
              Instrutor do Senar e Líder do Agro
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSectionClick("inicio")} className="text-white/80 hover:text-white transition-colors">
                  Início
                </button>
              </li>
              <li>
                <button onClick={() => onSectionClick("quem-somos")} className="text-white/80 hover:text-white transition-colors">
                  Quem Somos
                </button>
              </li>
              <li>
                <button onClick={() => onSectionClick("parceiros")} className="text-white/80 hover:text-white transition-colors">
                  Seja Parceiro
                </button>
              </li>
              <li>
                <button onClick={() => onSectionClick("contato")} className="text-white/80 hover:text-white transition-colors">
                  Contato
                </button>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contato</h4>
            <ul className="space-y-2 text-white/80">
              <li>São Paulo - SP - Brasil</li>
              <li>
                <a href="mailto:contato@ruraltime.com.br" className="hover:text-white transition-colors">
                  contato@ruraltime.com.br
                </a>
              </li>
              <li>
                
              </li>
            </ul>
          </div>
        </div>

        {/* Linha de Separação */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-sm mb-4 md:mb-0">
              © 2024 Rural Time. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-white/70 text-sm">Powered by</span>
              <div className="bg-white/20 rounded-full px-3 py-1">
                <span className="text-white font-bold text-sm">CNA JOVEM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>;
}