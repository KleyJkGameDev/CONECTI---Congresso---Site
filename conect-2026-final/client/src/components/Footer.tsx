/**
 * COMPONENTE: Footer
 * 
 * Rodapé do site com:
 * - Informações de contato
 * - Links rápidos
 * - Copyright
 */

export default function Footer() {
  const handleFooterLink = (hash: string) => {
    const currentPath = window.location.pathname;
    if (currentPath !== '/') {
      // Se não estiver na home, redireciona para home com hash
      window.location.href = `/${hash}`;
    } else {
      // Se já estiver na home, apenas pula para a seção
      window.location.hash = hash;
    }
  };

  return (
    <footer className="bg-[#07090f] border-t border-[rgba(79,142,247,0.14)] py-12">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Sobre */}
          <div>
            <h4 className="text-white font-bold mb-4">CONECT 2026</h4>
            <p className="text-[#8899bb] text-sm leading-relaxed">
              O principal congresso de Engenharia de Computação do Instituto Federal do Maranhão.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-white font-bold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); handleFooterLink('#sobre'); }} className="text-[#8899bb] hover:text-[#4f8ef7] transition-colors cursor-pointer">
                  Sobre o Evento
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); handleFooterLink('#cronograma'); }} className="text-[#8899bb] hover:text-[#4f8ef7] transition-colors cursor-pointer">
                  Cronograma
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); handleFooterLink('#inscricao'); }} className="text-[#8899bb] hover:text-[#4f8ef7] transition-colors cursor-pointer">
                  Inscrição
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); handleFooterLink('#faq'); }} className="text-[#8899bb] hover:text-[#4f8ef7] transition-colors cursor-pointer">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-white font-bold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-[#8899bb]">
              <li>conect@ifma.edu.br</li>
              <li>IFMA Campus Santa Inês — Santa Inês, MA</li>
              <li>(98) 3216-0000</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[rgba(79,142,247,0.14)] pt-8">
          <p className="text-center text-[#445577] text-sm">
            © 2026 CONECT — Congresso de Engenharia de Computação. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
