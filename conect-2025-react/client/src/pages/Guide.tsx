/**
 * PÁGINA: Guide
 * 
 * Página com informações de hospedagem, alimentação e local do evento
 * Estrutura preparada para ser preenchida posteriormente com dados reais
 */

export default function Guide() {
  const accommodations = [
    {
      name: 'Hotel Tupinambá',
      description: 'Hotel 3 estrelas com acomodações confortáveis e serviços básicos',
      distance: '2,5 km',
      price: 'A partir de R$ 150/noite',
      phone: '(98) 3653-1200',
    },
    {
      name: 'Hotel Muniz',
      description: 'Hospedagem tradicional com mais de 60 anos, localizado no centro de Santa Inês',
      distance: '1,8 km',
      price: 'A partir de R$ 120/noite',
      phone: '(98) 3653-1118',
    },
    {
      name: 'Hotel Lorenna',
      description: 'Hotel com bom custo-benefício, próximo a comércios e serviços',
      distance: '2,2 km',
      price: 'A partir de R$ 140/noite',
      phone: '(98) 3653-XXXX',
    },
    {
      name: 'Hotel São Lázaro',
      description: 'Opção econômica com estrutura básica para hóspedes',
      distance: '1,5 km',
      price: 'A partir de R$ 100/noite',
      phone: '(98) 3653-XXXX',
    },
    {
      name: 'Pousada Alemanha',
      description: 'Pousada aconchegante com atendimento personalizado',
      distance: '3,0 km',
      price: 'A partir de R$ 130/noite',
      phone: '(98) 98809-2069',
    },
    {
      name: 'Pousada das Águias',
      description: 'Hospedagem com ambiente familiar e tranquilo',
      distance: '2,8 km',
      price: 'A partir de R$ 125/noite',
      phone: 'Consulte disponibilidade',
    },
  ];

  const dining = [
    {
      name: 'Gallet Star',
      description: 'Restaurante especializado em culinária brasileira e sul-americana',
      type: 'Restaurante',
      hours: '11h00 - 22h00',
      rating: '3,9/5',
    },
    {
      name: 'João & Rita Café',
      description: 'Café aconchegante com café da manhã, almoço e lanches variados',
      type: 'Café/Lanchonete',
      hours: '07h00 - 20h00',
      rating: '4,5/5',
    },
    {
      name: 'Churrascaria Magnólia I',
      description: 'Churrascaria com rodízio completo e buffet de saladas',
      type: 'Churrascaria',
      hours: '11h00 - 23h00',
      rating: '4,1/5',
    },
    {
      name: 'Império Pizzaria',
      description: 'Pizzaria com variedade de sabores e entrega rápida',
      type: 'Pizzaria',
      hours: '18h00 - 23h30',
      rating: '5,0/5',
    },
    {
      name: 'Ponto do Lanche',
      description: 'Lanchonete com cardápio variado, carne artesanal, sucos e vitaminas',
      type: 'Lanchonete',
      hours: '10h00 - 22h00',
      rating: 'Recomendado',
      phone: '(98) 98422-4966',
    },
    {
      name: 'O Zebrão',
      description: 'Restaurante com pratos típicos da região e ambiente agradável',
      type: 'Restaurante',
      hours: '11h00 - 22h00',
      rating: '4,5/5',
    },
  ];

  return (
    <div className="min-h-screen bg-[#07090f] text-white">
      {/* Header */}
      <div className="pt-32 pb-12 bg-gradient-to-b from-[#0c1018] to-[#07090f]">
        <div className="container max-w-6xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            Guia do CONECT!26
          </h1>
          <p className="text-[#8899bb] text-lg max-w-2xl">
            Informações sobre hospedagem, alimentação e orientações para participantes
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-20">
        <div className="container max-w-6xl mx-auto px-6">
          {/* Location Section */}
          <section className="mb-20">
            <div className="mb-8">
              <h2 className="text-4xl font-black mb-4">Local do Evento</h2>
              <div className="accent-bar" />
            </div>
            <div className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-[#33d9f0] mb-4">Endereço</h3>
                  <p className="text-[#8899bb] mb-2 font-semibold">
                    Instituto Federal do Maranhão
                  </p>
                  <p className="text-[#8899bb] mb-2">
                    Campus Santa Inês
                  </p>
                  <p className="text-[#8899bb] mb-4">
                    São Luís, Maranhão - Brasil
                  </p>
                  <p className="text-sm text-[#445577]">
                    O campus está localizado na região central de Santa Inês, com fácil acesso via transporte público e particular.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#33d9f0] mb-4">Datas e Horários</h3>
                  <p className="text-[#8899bb] mb-2 font-semibold">
                    14 a 16 de Agosto de 2026
                  </p>
                  <p className="text-[#8899bb] mb-4">
                    8h00 - 18h00 (Horário de Brasília)
                  </p>
                  <p className="text-sm text-[#445577]">
                    Recomendamos chegar 15 minutos antes do início para credenciamento. O evento ocorre em três dias consecutivos com programação completa.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Accommodation Section */}
          <section className="mb-20">
            <div className="mb-8">
              <h2 className="text-4xl font-black mb-4">Hospedagem</h2>
              <div className="accent-bar" />
            </div>
            <p className="text-[#8899bb] mb-8">
              Confira as opções de hospedagem próximas ao Campus Santa Inês. Todos os hotéis listados estão a menos de 3 km do local do evento.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {accommodations.map((acc, idx) => (
                <div
                  key={idx}
                  className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-6 hover:border-[rgba(79,142,247,0.28)] transition-all"
                >
                  <h3 className="text-lg font-bold text-white mb-2">{acc.name}</h3>
                  <p className="text-[#8899bb] text-sm mb-4">{acc.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#445577]">Distância:</span>
                      <span className="text-[#8899bb]">{acc.distance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#445577]">Preço:</span>
                      <span className="text-[#8899bb]">{acc.price}</span>
                    </div>
                    {acc.phone && (
                      <div className="flex justify-between">
                        <span className="text-[#445577]">Telefone:</span>
                        <span className="text-[#8899bb]">{acc.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-[rgba(79,142,247,0.05)] border border-[rgba(79,142,247,0.14)] rounded-lg">
              <p className="text-[#8899bb]">
                Recomendamos fazer reservas com antecedência, especialmente se viajar durante o período do evento. Entre em contato com os hotéis para confirmar disponibilidade e possíveis promoções para participantes do CONECT!26.
              </p>
            </div>
          </section>

          {/* Dining Section */}
          <section className="mb-20">
            <div className="mb-8">
              <h2 className="text-4xl font-black mb-4">Alimentação</h2>
              <div className="accent-bar" />
            </div>
            <p className="text-[#8899bb] mb-8">
              Diversas opções de restaurantes, lanchonetes e cafés próximas ao campus para suas refeições durante o evento.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {dining.map((rest, idx) => (
                <div
                  key={idx}
                  className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-6 hover:border-[rgba(79,142,247,0.28)] transition-all"
                >
                  <h3 className="text-lg font-bold text-white mb-2">{rest.name}</h3>
                  <p className="text-[#8899bb] text-sm mb-4">{rest.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#445577]">Tipo:</span>
                      <span className="text-[#8899bb]">{rest.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#445577]">Horário:</span>
                      <span className="text-[#8899bb]">{rest.hours}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#445577]">Avaliação:</span>
                      <span className="text-[#33d9f0]">{rest.rating}</span>
                    </div>
                    {rest.phone && (
                      <div className="flex justify-between">
                        <span className="text-[#445577]">Contato:</span>
                        <span className="text-[#8899bb]">{rest.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-[rgba(79,142,247,0.05)] border border-[rgba(79,142,247,0.14)] rounded-lg">
              <p className="text-[#8899bb]">
                O CONECT!26 oferecerá coffee break nos intervalos das palestras. Além disso, há cantina no campus com lanches e bebidas. Recomendamos explorar as opções listadas para suas refeições principais.
              </p>
            </div>
          </section>

          {/* Transport Section */}
          <section className="mb-20">
            <div className="mb-8">
              <h2 className="text-4xl font-black mb-4">Transporte</h2>
              <div className="accent-bar" />
            </div>
            <div className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-[#33d9f0] mb-4">Ônibus Urbano</h3>
                  <p className="text-[#8899bb] text-sm mb-4">
                    Santa Inês possui sistema de transporte público com diversas linhas de ônibus. O Campus Santa Inês é bem servido por linhas que passam pela região central da cidade. Consulte a prefeitura local para informações sobre horários e tarifas.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#33d9f0] mb-4">Estacionamento</h3>
                  <p className="text-[#8899bb] text-sm mb-4">
                    O Campus Santa Inês oferece estacionamento para visitantes. Chegue com antecedência para garantir vaga. Há também opções de estacionamento pago na região central de Santa Inês.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-[rgba(79,142,247,0.14)]">
                <h3 className="text-lg font-bold text-[#33d9f0] mb-4">Acesso Rodoviário</h3>
                <p className="text-[#8899bb] text-sm">
                  Santa Inês está localizada no interior do Maranhão e é acessível via BR-135. Se viajar de carro, utilize GPS ou mapas para melhor orientação. Distância aproximada: 140 km de São Luís (capital).
                </p>
              </div>
            </div>
          </section>

          {/* Tips Section */}
          <section>
            <div className="mb-8">
              <h2 className="text-4xl font-black mb-4">Dicas Importantes</h2>
              <div className="accent-bar" />
            </div>
            <div className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-8">
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <span className="text-[#33d9f0] font-bold">1.</span>
                  <span className="text-[#8899bb]">
                    Leve seu documento de identidade e comprovante de inscrição para o credenciamento
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="text-[#33d9f0] font-bold">2.</span>
                  <span className="text-[#8899bb]">
                    Chegue com 15 minutos de antecedência para evitar filas no credenciamento
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="text-[#33d9f0] font-bold">3.</span>
                  <span className="text-[#8899bb]">
                    Traga carregador para seu dispositivo eletrônico — o campus oferece pontos de recarga
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="text-[#33d9f0] font-bold">4.</span>
                  <span className="text-[#8899bb]">
                    Verifique a previsão do tempo e leve um guarda-chuva — agosto é período de chuvas no Maranhão
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="text-[#33d9f0] font-bold">5.</span>
                  <span className="text-[#8899bb]">
                    Mantenha contato com a organização através do e-mail conect@ifma.edu.br ou WhatsApp
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="text-[#33d9f0] font-bold">6.</span>
                  <span className="text-[#8899bb]">
                    Use roupas confortáveis e adequadas ao clima tropical do Maranhão
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="text-[#33d9f0] font-bold">7.</span>
                  <span className="text-[#8899bb]">
                    Leve protetor solar e repelente — a região é tropical e ensolarada
                  </span>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
