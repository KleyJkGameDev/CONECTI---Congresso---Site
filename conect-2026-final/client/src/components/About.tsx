/**
 * COMPONENTE: About
 * 
 * Seção "Sobre o evento" com:
 * - Descrição do CONECT
 * - Cards com temas principais (IA, Segurança, Cloud, IoT, Mobile, Pesquisa)
 * - Botão de inscrição
 * 
 * INTEGRAÇÃO COM BACKEND:
 * - Os temas podem ser carregados dinamicamente de uma API
 * - Descrição pode ser editável via admin panel
 */

export default function About() {
  const themes = [
    {
      title: 'Inteligência Artificial',
      description: 'ML, Deep Learning e IA Generativa',
    },
    {
      title: 'Cibersegurança',
      description: 'Pentest, CTF e proteção de sistemas',
    },
    {
      title: 'Cloud & DevOps',
      description: 'AWS, Azure, Kubernetes e CI/CD',
    },
    {
      title: 'IoT & Embarcados',
      description: 'Arduino, Raspberry Pi e MQTT',
    },
    {
      title: 'Mobile',
      description: 'Flutter, React Native e UX mobile',
    },
    {
      title: 'Pesquisa Científica',
      description: 'Artigos, TCCs e projetos de extensão',
    },
  ];

  return (
    <section id="sobre" className="py-20 md:py-32 bg-[#07090f] animate-fade-in">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column: Text */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#4f8ef7] mb-4">
              // Sobre o evento
            </div>
            <div className="accent-bar" />
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Tecnologia, Inovação
              <br />e Futuro no IFMA
            </h2>

            <p className="text-[#8899bb] font-light mb-4 leading-relaxed">
              O CONECT é o principal congresso de Engenharia de Computação do Instituto Federal do
              Maranhão — uma plataforma para estudantes, pesquisadores e profissionais apresentarem
              pesquisas, aprenderem com os melhores especialistas e construírem conexões duradouras.
            </p>

            <p className="text-[#8899bb] font-light mb-8 leading-relaxed">
              Com uma grade que abrange IA, cibersegurança, IoT e computação em nuvem, o CONECT 2026
              promete ser a edição mais completa da história do evento.
            </p>

            <a
              href="#inscricao"
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#4f8ef7] to-[#7c55e8] text-white font-bold rounded-lg hover:opacity-90 transition-all"
            >
              → Participar do CONECT!26
            </a>
          </div>

          {/* Right Column: Theme Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {themes.map((theme, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg bg-[#131a2a] border border-[rgba(79,142,247,0.14)] hover:border-[rgba(79,142,247,0.28)] hover:shadow-lg hover:shadow-[rgba(79,142,247,0.1)] transition-all duration-300 group cursor-pointer"
              >
                <h4 className="text-white font-bold mb-2">{theme.title}</h4>
                <p className="text-sm text-[#8899bb]">{theme.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
