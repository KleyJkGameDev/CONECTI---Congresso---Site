/**
 * COMPONENTE: MapSection
 * 
 * Exibe informações de localização com:
 * - Endereço do campus
 * - Hotéis e restaurantes próximos
 * - Instruções de acesso
 * 
 * NOTA: Google Maps pode ser integrado posteriormente
 * adicionando script na client/index.html e configurando API key
 */

export default function MapSection() {
  return (
    <section className="py-20 md:py-32 bg-[#07090f]">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-4xl font-black mb-4">Mapa e Localização</h2>
          <div className="accent-bar" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Location Info */}
          <div className="space-y-6">
            <div className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#33d9f0] mb-4">Local do Evento</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-[#445577] text-sm">Instituição</p>
                  <p className="text-white font-semibold">Instituto Federal do Maranhão</p>
                </div>
                <div>
                  <p className="text-[#445577] text-sm">Campus</p>
                  <p className="text-white font-semibold">Campus Santa Inês</p>
                </div>
                <div>
                  <p className="text-[#445577] text-sm">Cidade</p>
                  <p className="text-white font-semibold">Santa Inês, Maranhão - Brasil</p>
                </div>
                <div>
                  <p className="text-[#445577] text-sm">Coordenadas</p>
                  <p className="text-white font-semibold">-3.2611°, -45.2608°</p>
                </div>
              </div>
            </div>

            <div className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#33d9f0] mb-4">Como Chegar</h3>
              <ul className="space-y-3 text-sm text-[#8899bb]">
                <li className="flex gap-3">
                  <span className="text-[#33d9f0] font-bold">1.</span>
                  <span>De carro: Siga pela BR-135 em direção a Santa Inês</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#33d9f0] font-bold">2.</span>
                  <span>De ônibus: Linhas urbanas passam pelo campus</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#33d9f0] font-bold">3.</span>
                  <span>Estacionamento disponível no campus</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#33d9f0] font-bold">4.</span>
                  <span>Distância de São Luís: aproximadamente 140 km (capital do estado)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Nearby Places */}
          <div className="space-y-6">
            <div className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#33d9f0] mb-4">Hotéis Próximos</h3>
              <div className="space-y-3">
                <div className="pb-3 border-b border-[rgba(79,142,247,0.14)]">
                  <p className="text-white font-semibold text-sm">Hotel Muniz</p>
                  <p className="text-[#8899bb] text-xs">1,8 km • (98) 3653-1118</p>
                </div>
                <div className="pb-3 border-b border-[rgba(79,142,247,0.14)]">
                  <p className="text-white font-semibold text-sm">Hotel São Lázaro</p>
                  <p className="text-[#8899bb] text-xs">1,5 km • Econômico</p>
                </div>
                <div className="pb-3 border-b border-[rgba(79,142,247,0.14)]">
                  <p className="text-white font-semibold text-sm">Hotel Tupinambá</p>
                  <p className="text-[#8899bb] text-xs">2,5 km • (98) 3653-1200</p>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Hotel Lorenna</p>
                  <p className="text-[#8899bb] text-xs">2,2 km • Bom custo-benefício</p>
                </div>
              </div>
            </div>

            <div className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#33d9f0] mb-4">Restaurantes Próximos</h3>
              <div className="space-y-3">
                <div className="pb-3 border-b border-[rgba(79,142,247,0.14)]">
                  <p className="text-white font-semibold text-sm">Gallet Star</p>
                  <p className="text-[#8899bb] text-xs">Culinária Brasileira • 11h-22h</p>
                </div>
                <div className="pb-3 border-b border-[rgba(79,142,247,0.14)]">
                  <p className="text-white font-semibold text-sm">João & Rita Café</p>
                  <p className="text-[#8899bb] text-xs">Café e Lanches • 7h-20h</p>
                </div>
                <div className="pb-3 border-b border-[rgba(79,142,247,0.14)]">
                  <p className="text-white font-semibold text-sm">Churrascaria Magnólia</p>
                  <p className="text-[#8899bb] text-xs">Rodízio • 11h-23h</p>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Império Pizzaria</p>
                  <p className="text-[#8899bb] text-xs">Pizzas • 18h-23h30</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 p-6 bg-[rgba(79,142,247,0.05)] border border-[rgba(79,142,247,0.14)] rounded-lg">
          <p className="text-[#8899bb] text-sm">
            Para integração com Google Maps interativo, configure a API key em variáveis de ambiente. 
            Consulte a documentação em INTEGRACAO_BACKEND.md para mais detalhes.
          </p>
        </div>
      </div>
    </section>
  );
}
