/**
 * COMPONENTE: Hero
 * 
 * Seção inicial do site com:
 * - Título principal com gradiente
 * - Descrição do evento
 * - Contagem regressiva até o evento
 * - Botões de CTA (Inscrição e Saiba Mais)
 * - Estatísticas do evento
 * - Background com grid e gradientes
 * 
 * INTEGRAÇÃO COM BACKEND:
 * - A data de contagem regressiva pode vir de uma API
 * - As estatísticas (vagas, palestrantes, etc.) podem ser dinâmicas
 */

import { useEffect, useState } from 'react';

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Hero() {
  const [countdown, setCountdown] = useState<CountdownState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calcular contagem regressiva
  useEffect(() => {
    const calculateCountdown = () => {
      const targetDate = new Date('2026-08-14T08:00:00').getTime();
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (num: number) => String(num).padStart(2, '0');

  const stats = [
    { number: '3', label: 'Dias de evento' },
    { number: '20+', label: 'Palestrantes' },
    { number: '500', label: 'Vagas disponíveis' },
    { number: '12', label: 'Workshops' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#07090f] via-[#0c1018] to-[#07090f]" />
        {/* Radial gradients para efeito de profundidade */}
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[rgba(79,142,247,0.08)] rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-1/4 w-96 h-96 bg-[rgba(124,85,232,0.08)] rounded-full blur-3xl" />
      </div>

      {/* Grid Background */}
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(79,142,247,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79,142,247,0.045) 1px, transparent 1px)
          `,
          backgroundSize: '58px 58px',
          maskImage: 'radial-gradient(ellipse 90% 80% at 60% 40%, black 0%, transparent 75%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 container max-w-4xl mx-auto px-6 py-20">
        {/* Pill Badge */}
        <div className="flex justify-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-[rgba(79,142,247,0.1)] border border-[rgba(79,142,247,0.28)] rounded-full px-5 py-2">
            <div className="w-2 h-2 bg-[#33d9f0] rounded-full blink" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#4f8ef7]">
              IFMA Campus Santa Inês · 14–16 Ago 2026
            </span>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-black text-center leading-tight mb-6 tracking-tighter">
          <span className="grad-text">CONECT!26</span>
          <br />
          Congresso de Engenharia
          <br />
          de Computação
        </h1>

        {/* Subtitle */}
        <p className="text-center text-[#8899bb] text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          O maior evento de tecnologia e inovação do Maranhão. Três dias de palestras, workshops,
          submissão de artigos e networking com profissionais do setor.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href="#inscricao"
            className="px-8 py-4 bg-gradient-to-r from-[#4f8ef7] to-[#7c55e8] text-white font-bold rounded-lg hover:opacity-90 transition-all transform hover:scale-105 text-center"
          >
            → Garantir Inscrição
          </a>
          <a
            href="#sobre"
            className="px-8 py-4 border border-[rgba(79,142,247,0.28)] text-[#4f8ef7] font-bold rounded-lg hover:bg-[rgba(79,142,247,0.1)] transition-all text-center"
          >
            ↓ Saiba mais
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-3xl md:text-4xl font-black grad-text mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-[#8899bb] font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Countdown */}
        <div className="bg-[rgba(19,26,42,0.6)] border border-[rgba(79,142,247,0.14)] rounded-lg p-8 backdrop-blur-sm">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8899bb]">
              Faltam para o evento
            </span>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[
              { value: countdown.days, label: 'Dias' },
              { value: countdown.hours, label: 'Horas' },
              { value: countdown.minutes, label: 'Min' },
              { value: countdown.seconds, label: 'Seg' },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-4xl font-black grad-text mb-2">
                  {pad(item.value)}
                </div>
                <div className="text-xs text-[#8899bb] font-semibold uppercase">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
