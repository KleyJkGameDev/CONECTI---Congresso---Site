/**
 * PÁGINA: Guide
 * 
 * Página com informações de hospedagem, alimentação e local do evento
 * Inclui Navbar e Footer para navegação completa
 * Filtros por categoria para hospedagem e alimentação
 */

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MapSection from '@/components/MapSection';
import Breadcrumb from '@/components/Breadcrumb';

export default function Guide() {
  const [selectedAccommodationType, setSelectedAccommodationType] = useState('Todos');
  const [selectedDiningType, setSelectedDiningType] = useState('Todos');

  const accommodations = [
    {
      name: 'Hotel Muniz',
      description: 'Hotel tradicional no centro de Santa Inês com conforto e bom atendimento',
      distance: '1,2 km',
      price: 'A partir de R$ 120/noite',
      phone: '(98) 3653-1118',
      type: 'Hotel',
    },
    {
      name: 'Hotel Tupinambá',
      description: 'Hotel 3 estrelas com acomodações confortáveis, Wi-Fi e ar condicionado',
      distance: '2,1 km',
      price: 'A partir de R$ 150/noite',
      phone: '(98) 3653-1200',
      type: 'Hotel',
    },
    {
      name: 'Pousada São Lourenço',
      description: 'Pousada aconchegante com café da manhã incluído e ambiente familiar',
      distance: '1,8 km',
      price: 'A partir de R$ 100/noite',
      phone: '(98) 3653-2345',
      type: 'Pousada',
    },
    {
      name: 'Hotel Central',
      description: 'Hospedagem econômica no coração da cidade com fácil acesso ao campus',
      distance: '1,5 km',
      price: 'A partir de R$ 90/noite',
      phone: '(98) 3653-3456',
      type: 'Hotel',
    },
    {
      name: 'Pousada Maranhense',
      description: 'Pousada com características regionais e atendimento personalizado',
      distance: '2,5 km',
      price: 'A partir de R$ 110/noite',
      phone: '(98) 3653-4567',
      type: 'Pousada',
    },
    {
      name: 'Hotel Recanto',
      description: 'Hotel com estrutura completa, piscina e restaurante próprio',
      distance: '2,8 km',
      price: 'A partir de R$ 140/noite',
      phone: '(98) 3653-5678',
      type: 'Hotel',
    },
  ];

  const dining = [
    {
      name: 'Restaurante Sabor da Terra',
      description: 'Especializado em pratos típicos maranhenses e culinária regional',
      type: 'Restaurante',
      hours: '11h00 - 22h00',
      rating: '4,6/5',
      phone: '(98) 3653-6789',
    },
    {
      name: 'Café & Cia',
      description: 'Café da manhã completo, almoço e café da tarde em ambiente aconchegante',
      type: 'Café/Lanchonete',
      hours: '07h00 - 20h00',
      rating: '4,7/5',
      phone: '(98) 3653-7890',
    },
    {
      name: 'Churrascaria do Povo',
      description: 'Rodízio completo com carnes selecionadas e buffet de saladas',
      type: 'Churrascaria',
      hours: '11h00 - 23h00',
      rating: '4,5/5',
      phone: '(98) 3653-8901',
    },
    {
      name: 'Pizzaria Bella Itália',
      description: 'Pizzas artesanais com ingredientes de qualidade e entrega rápida',
      type: 'Pizzaria',
      hours: '18h00 - 23h30',
      rating: '4,8/5',
      phone: '(98) 3653-9012',
    },
    {
      name: 'Lanchonete do Comércio',
      description: 'Lanches, pastéis, caldo de cana e bebidas naturais',
      type: 'Lanchonete',
      hours: '10h00 - 22h00',
      rating: '4,4/5',
      phone: '(98) 98422-4966',
    },
    {
      name: 'Restaurante Tacacá da Vovó',
      description: 'Comida caseira maranhense com pratos tradicionais e aconchego',
      type: 'Restaurante',
      hours: '11h00 - 22h00',
      rating: '4,6/5',
      phone: '(98) 3653-0123',
    },
  ];

  // Filtrar hospedagens
  const filteredAccommodations = selectedAccommodationType === 'Todos'
    ? accommodations
    : accommodations.filter((acc) => acc.type === selectedAccommodationType);

  // Filtrar alimentação
  const filteredDining = selectedDiningType === 'Todos'
    ? dining
    : dining.filter((restaurant) => restaurant.type === selectedDiningType);

  // Obter tipos únicos
  const accommodationTypes = ['Todos', ...Array.from(new Set(accommodations.map((acc) => acc.type)))];
  const diningTypes = ['Todos', ...Array.from(new Set(dining.map((rest) => rest.type)))];


  return (
    <div className="min-h-screen bg-[#07090f] text-white pt-16">
      <Navbar />

      <main className="container max-w-6xl mx-auto px-6 py-20">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Guia' }]} />

        {/* Header */}
        <div className="mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-black mb-4">Guia do CONECT!26</h1>
          <p className="text-[#8899bb] text-lg">
            Informações sobre hospedagem, alimentação e orientações para participantes
          </p>
        </div>

        {/* Local Section */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-4xl font-black mb-4">Local do Evento</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#4f8ef7] to-[#7c55e8]" />
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-6">
              <h3 className="text-xl font-bold text-[#33d9f0] mb-4">Endereço</h3>
              <p className="text-[#8899bb] mb-2 font-semibold">
                Instituto Federal do Maranhão
              </p>
              <p className="text-[#8899bb] mb-2">
                Campus Santa Inês
              </p>
              <p className="text-[#8899bb] mb-4">
                Santa Inês, Maranhão - Brasil
              </p>
              <p className="text-sm text-[#445577]">
                O campus está localizado na região central de Santa Inês, com fácil acesso via transporte público e particular.
              </p>
            </div>
            <div className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-6">
              <h3 className="text-xl font-bold text-[#33d9f0] mb-4">Datas e Horários</h3>
              <p className="text-[#8899bb] mb-2 font-semibold">
                02 a 04 de Junho de 2026
              </p>
              <p className="text-[#8899bb] mb-4">
                8h00 - 18h00 (Horário de Brasília)
              </p>
              <p className="text-sm text-[#445577]">
                Recomendamos chegar 15 minutos antes do início para credenciamento. O evento ocorre em três dias consecutivos com programação completa.
              </p>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <MapSection />

        {/* Accommodations Section with Filter */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-4xl font-black mb-4">Hospedagem</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#4f8ef7] to-[#7c55e8]" />
          </div>
          <p className="text-[#8899bb] mb-6">
            Confira as opções de hospedagem próximas ao Campus Santa Inês. Todos os hotéis listados estão a menos de 3 km do local do evento.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            {accommodationTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedAccommodationType(type)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedAccommodationType === type
                    ? 'bg-gradient-to-r from-[#4f8ef7] to-[#7c55e8] text-white'
                    : 'bg-[#131a2a] border border-[rgba(79,142,247,0.14)] text-[#8899bb] hover:border-[#4f8ef7]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Accommodations Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredAccommodations.map((hotel, idx) => (
              <div
                key={idx}
                className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-6 hover:border-[rgba(79,142,247,0.28)] transition-all hover:shadow-lg"
              >
                <h3 className="text-lg font-bold text-white mb-2">{hotel.name}</h3>
                <p className="text-[#8899bb] text-sm mb-4">{hotel.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#445577]">Tipo:</span>
                    <span className="text-[#33d9f0] font-semibold">{hotel.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#445577]">Distância:</span>
                    <span className="text-[#8899bb]">{hotel.distance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#445577]">Preço:</span>
                    <span className="text-[#33d9f0] font-semibold">{hotel.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#445577]">Telefone:</span>
                    <span className="text-[#8899bb]">{hotel.phone}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 pt-4 border-t border-[rgba(79,142,247,0.14)]">
                  <a
                    href={`tel:${hotel.phone.replace(/\D/g, '')}`}
                    className="flex-1 px-3 py-2 bg-[rgba(79,142,247,0.1)] hover:bg-[rgba(79,142,247,0.2)] text-[#4f8ef7] font-semibold rounded text-sm transition-colors text-center"
                  >
                    Ligar
                  </a>
                  <a
                    href={`https://wa.me/55${hotel.phone.replace(/\D/g, '')}?text=Ola%2C%20gostaria%20de%20informacoes%20sobre%20hospedagem%20para%20o%20CONECT!26`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-3 py-2 bg-[rgba(51,217,240,0.1)] hover:bg-[rgba(51,217,240,0.2)] text-[#33d9f0] font-semibold rounded text-sm transition-colors text-center"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredAccommodations.length === 0 && (
            <div className="text-center py-8">
              <p className="text-[#8899bb]">Nenhuma hospedagem encontrada para este filtro.</p>
            </div>
          )}

          <div className="mt-8 p-6 bg-[rgba(79,142,247,0.05)] border border-[rgba(79,142,247,0.14)] rounded-lg">
            <p className="text-[#8899bb]">
              Recomendamos fazer reservas com antecedência, especialmente se viajar durante o período do evento. Entre em contato com os hotéis para confirmar disponibilidade e possíveis promoções para participantes do CONECT!26.
            </p>
          </div>
        </section>

        {/* Dining Section with Filter */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-4xl font-black mb-4">Alimentação</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#4f8ef7] to-[#7c55e8]" />
          </div>
          <p className="text-[#8899bb] mb-6">
            Diversas opções de restaurantes, lanchonetes e cafés próximas ao campus para suas refeições durante o evento.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            {diningTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedDiningType(type)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedDiningType === type
                    ? 'bg-gradient-to-r from-[#4f8ef7] to-[#7c55e8] text-white'
                    : 'bg-[#131a2a] border border-[rgba(79,142,247,0.14)] text-[#8899bb] hover:border-[#4f8ef7]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Dining Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredDining.map((restaurant, idx) => (
              <div
                key={idx}
                className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-6 hover:border-[rgba(79,142,247,0.28)] transition-all hover:shadow-lg"
              >
                <h3 className="text-lg font-bold text-white mb-2">{restaurant.name}</h3>
                <p className="text-[#8899bb] text-sm mb-4">{restaurant.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#445577]">Tipo:</span>
                    <span className="text-[#33d9f0] font-semibold">{restaurant.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#445577]">Horário:</span>
                    <span className="text-[#8899bb]">{restaurant.hours}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#445577]">Avaliação:</span>
                    <span className="text-[#33d9f0] font-semibold">{restaurant.rating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#445577]">Telefone:</span>
                    <span className="text-[#8899bb]">{restaurant.phone}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 pt-4 border-t border-[rgba(79,142,247,0.14)]">
                  <a
                    href={`tel:${restaurant.phone.replace(/\D/g, '')}`}
                    className="flex-1 px-3 py-2 bg-[rgba(79,142,247,0.1)] hover:bg-[rgba(79,142,247,0.2)] text-[#4f8ef7] font-semibold rounded text-sm transition-colors text-center"
                  >
                    Ligar
                  </a>
                  <a
                    href={`https://wa.me/55${restaurant.phone.replace(/\D/g, '')}?text=Ola%2C%20gostaria%20de%20fazer%20uma%20reserva%20para%20o%20CONECT!26`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-3 py-2 bg-[rgba(51,217,240,0.1)] hover:bg-[rgba(51,217,240,0.2)] text-[#33d9f0] font-semibold rounded text-sm transition-colors text-center"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredDining.length === 0 && (
            <div className="text-center py-8">
              <p className="text-[#8899bb]">Nenhum restaurante encontrado para este filtro.</p>
            </div>
          )}

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
            <div className="w-16 h-1 bg-gradient-to-r from-[#4f8ef7] to-[#7c55e8]" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#33d9f0] mb-3">Ônibus Urbano</h3>
              <p className="text-[#8899bb] text-sm">
                Santa Inês possui sistema de transporte público com diversas linhas de ônibus. O Campus Santa Inês é bem servido por linhas que passam pela região central da cidade. Tarifa: R$ 3,50 (meia entrada).
              </p>
            </div>

            <div className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#33d9f0] mb-3">Estacionamento</h3>
              <p className="text-[#8899bb] text-sm">
                O Campus Santa Inês oferece estacionamento gratuito para visitantes. Chegue com antecedência para garantir vaga. Há também opções de estacionamento pago na região central (R$ 5-10/dia).
              </p>
            </div>

            <div className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#33d9f0] mb-3">Acesso Rodoviário</h3>
              <p className="text-[#8899bb] text-sm">
                Santa Inês está localizada no interior do Maranhão e é acessível via BR-135. Distância aproximada: 140 km de São Luís. Tempo de viagem: aproximadamente 2h30.
              </p>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-4xl font-black mb-4">Dicas Importantes</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#4f8ef7] to-[#7c55e8]" />
          </div>

          <div className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-8">
            <ul className="space-y-3 text-[#8899bb]">
              <li>1. Leve seu documento de identidade e comprovante de inscrição para o credenciamento</li>
              <li>2. Chegue com 15 minutos de antecedência para evitar filas no credenciamento</li>
              <li>3. Traga carregador para seu dispositivo eletrônico — o campus oferece pontos de recarga</li>
              <li>4. Verifique a previsão do tempo e leve um guarda-chuva — agosto é período de chuvas no Maranhão</li>
              <li>5. Mantenha contato com a organização através do e-mail conect@ifma.edu.br ou WhatsApp</li>
              <li>6. Use roupas confortáveis e adequadas ao clima tropical do Maranhão</li>
              <li>7. Leve protetor solar e repelente — a região é tropical e ensolarada</li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
