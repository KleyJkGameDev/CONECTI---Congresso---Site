/**
 * COMPONENTE: Schedule
 * 
 * Seção de cronograma com:
 * - Tabs para cada dia do evento
 * - Itens de agenda com horários, títulos e badges
 * - Informações de palestrantes
 * 
 * INTEGRAÇÃO COM BACKEND:
 * - Dados de cronograma devem vir de uma API
 * - Permitir edição via admin panel
 * - Sincronizar com calendários (Google Calendar, etc.)
 */

import { useState } from 'react';

interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  speaker?: string;
  badge: 'Abertura' | 'Palestra' | 'Workshop' | 'Pausa' | 'Artigos';
}

const scheduleData: Record<string, ScheduleItem[]> = {
  day1: [
    {
      time: '08:00–09:00',
      title: 'Credenciamento e Boas-Vindas',
      description: 'Recepção dos participantes, entrega de kits e acesso ao sistema de credenciamento',
      badge: 'Abertura',
    },
    {
      time: '09:00–10:30',
      title: 'Cerimônia de Abertura Oficial',
      description: 'Palavra da direção do IFMA e apresentação da programação completa do evento',
      speaker: 'Dir. Acadêmico do IFMA + Comissão Organizadora',
      badge: 'Abertura',
    },
    {
      time: '10:30–12:00',
      title: 'Keynote: O Futuro da IA no Brasil',
      description:
        'Visão estratégica sobre como a inteligência artificial está transformando o mercado e as oportunidades para engenheiros brasileiros',
      speaker: 'Dr. Rafael Moreira — INPE',
      badge: 'Palestra',
    },
    {
      time: '12:00–13:30',
      title: 'Intervalo para Almoço',
      description: 'Área de alimentação e networking no pátio do IFMA',
      badge: 'Pausa',
    },
    {
      time: '13:30–15:30',
      title: 'Workshop: Machine Learning na Prática',
      description:
        'Mãos na massa com scikit-learn e TensorFlow. Construção, validação e deploy de modelos reais',
      speaker: 'Profa. Dra. Camila Torres — UFMA',
      badge: 'Workshop',
    },
  ],
  day2: [
    {
      time: '08:00–09:00',
      title: 'Credenciamento',
      description: 'Recepção dos participantes',
      badge: 'Abertura',
    },
    {
      time: '09:00–10:30',
      title: 'Palestra: Segurança em Aplicações Web',
      description: 'Vulnerabilidades comuns, OWASP Top 10 e boas práticas de desenvolvimento seguro',
      speaker: 'Eng. João Silva — Empresa XYZ',
      badge: 'Palestra',
    },
    {
      time: '10:30–12:00',
      title: 'Workshop: DevOps com Kubernetes',
      description: 'Containerização, orquestração e deploy em produção',
      speaker: 'Eng. Marina Costa — Cloud Provider ABC',
      badge: 'Workshop',
    },
  ],
  day3: [
    {
      time: '08:00–09:00',
      title: 'Credenciamento',
      description: 'Recepção dos participantes',
      badge: 'Abertura',
    },
    {
      time: '09:00–11:00',
      title: 'Mesa Redonda: Carreira em Tech',
      description: 'Profissionais compartilham experiências e dicas para crescimento na área',
      speaker: 'Moderador: Prof. Dr. Carlos Mendes',
      badge: 'Palestra',
    },
    {
      time: '11:00–12:30',
      title: 'Encerramento e Premiação',
      description: 'Cerimônia de encerramento e entrega de certificados',
      badge: 'Abertura',
    },
  ],
};

const badgeColors: Record<string, string> = {
  Abertura: 'bg-[rgba(79,142,247,0.2)] text-[#4f8ef7]',
  Palestra: 'bg-[rgba(124,85,232,0.2)] text-[#7c55e8]',
  Workshop: 'bg-[rgba(51,217,240,0.2)] text-[#33d9f0]',
  Pausa: 'bg-[rgba(68,85,119,0.2)] text-[#8899bb]',
  Artigos: 'bg-[rgba(79,142,247,0.2)] text-[#4f8ef7]',
};

export default function Schedule() {
  const [activeDay, setActiveDay] = useState<'day1' | 'day2' | 'day3'>('day1');

  const days = [
    { id: 'day1', label: 'Dia 1 — 14/08' },
    { id: 'day2', label: 'Dia 2 — 15/08' },
    { id: 'day3', label: 'Dia 3 — 16/08' },
  ];

  return (
    <section id="cronograma" className="py-20 md:py-32 bg-[#0c1018] animate-fade-in">
      <div className="container max-w-4xl mx-auto px-6">
        <div className="text-xs font-bold uppercase tracking-widest text-[#4f8ef7] mb-4">
          // Programação
        </div>
        <div className="accent-bar" />
        <h2 className="text-4xl md:text-5xl font-black mb-12 leading-tight">Grade do Evento</h2>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-10 border-b border-[rgba(79,142,247,0.14)] pb-6">
          {days.map((day) => (
            <button
              key={day.id}
              onClick={() => setActiveDay(day.id as 'day1' | 'day2' | 'day3')}
              className={`px-4 py-2 font-bold uppercase tracking-wider text-sm transition-all ${
                activeDay === day.id
                  ? 'text-[#4f8ef7] border-b-2 border-[#4f8ef7]'
                  : 'text-[#8899bb] hover:text-[#4f8ef7]'
              }`}
            >
              {day.label}
            </button>
          ))}
        </div>

        {/* Schedule Items */}
        <div className="space-y-4">
          {scheduleData[activeDay].map((item, idx) => (
            <div
              key={idx}
              className="flex gap-6 p-6 rounded-lg bg-[#131a2a] border border-[rgba(79,142,247,0.14)] hover:border-[rgba(79,142,247,0.28)] hover:shadow-lg hover:shadow-[rgba(79,142,247,0.1)] transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Time */}
              <div className="min-w-fit">
                <div className="text-sm font-bold text-[#4f8ef7] whitespace-nowrap">{item.time}</div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h4 className="text-white font-bold mb-2">{item.title}</h4>
                <p className="text-sm text-[#8899bb] mb-3">{item.description}</p>
                {item.speaker && (
                  <p className="text-xs text-[#445577] font-semibold">{item.speaker}</p>
                )}
              </div>

              {/* Badge */}
              <div className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap h-fit ${badgeColors[item.badge]}`}>
                {item.badge}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
