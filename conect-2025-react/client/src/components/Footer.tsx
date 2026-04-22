/**
 * COMPONENTE: Footer
 * 
 * Rodapé do site com:
 * - Informações de contato
 * - Links rápidos
 * - Copyright
 */

export default function Footer() {
  return (
    <footer className="bg-[#07090f] border-t border-[rgba(79,142,247,0.14)] py-12">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Sobre */}
          <div>
            <h4 className="text-white font-bold mb-4">CONECT 2025</h4>
            <p className="text-[#8899bb] text-sm leading-relaxed">
              O principal congresso de Engenharia de Computação do Instituto Federal do Maranhão.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-white font-bold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#sobre" className="text-[#8899bb] hover:text-[#4f8ef7] transition-colors">
                  Sobre o Evento
                </a>
              </li>
              <li>
                <a href="#cronograma" className="text-[#8899bb] hover:text-[#4f8ef7] transition-colors">
                  Cronograma
                </a>
              </li>
              <li>
                <a href="#inscricao" className="text-[#8899bb] hover:text-[#4f8ef7] transition-colors">
                  Inscrição
                </a>
              </li>
              <li>
                <a href="#faq" className="text-[#8899bb] hover:text-[#4f8ef7] transition-colors">
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
              <li>IFMA Campus Santa Inês — São Luís, MA</li>
              <li>(98) 3216-0000</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[rgba(79,142,247,0.14)] pt-8">
          <p className="text-center text-[#445577] text-sm">
            © 2025 CONECT — Congresso de Engenharia de Computação. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
