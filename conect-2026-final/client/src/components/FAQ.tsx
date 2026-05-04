/**
 * COMPONENTE: FAQ
 * 
 * Seção de Perguntas Frequentes com accordion
 * Apenas uma pergunta aberta por vez
 */

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'Qual é a data do CONECT 2026?',
    answer: 'O CONECT 2026 acontece de 14 a 16 de agosto de 2026 no câmpus Monte Castelo do IFMA em São Luís, Maranhão.',
  },
  {
    question: 'Quanto custa a inscrição?',
    answer: 'O valor varia conforme a categoria: Estudantes do IFMA/UFMA (Gratuito), Estudantes de Outras IES (R$ 45), Profissionais (R$ 120) e Pesquisadores/Professores (R$ 90).',
  },
  {
    question: 'Como faço para submeter um artigo ou trabalho?',
    answer: 'Você pode submeter artigos, TCCs ou projetos de extensão através da seção "Submissão" do site. O prazo é até 05/08/2026. A comissão científica avaliará e você receberá o resultado por e-mail em até 48h úteis.',
  },
  {
    question: 'Há certificado para os participantes?',
    answer: 'Sim! Todos os inscritos recebem certificado digital com 24 horas de carga horária. Participantes de workshops específicos recebem certificados adicionais.',
  },
  {
    question: 'Posso levar acompanhante?',
    answer: 'Não. Cada pessoa deve fazer sua própria inscrição. Todos os participantes têm acesso às mesmas atividades conforme sua categoria de ingresso.',
  },
  {
    question: 'E se eu não conseguir chegar na hora?',
    answer: 'Não há problema! As inscrições são abertas até 10/08/2026 ou enquanto houver vagas. Você pode chegar a qualquer momento durante o evento.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-32 bg-[#0c1018] animate-fade-in">
      <div className="container max-w-4xl mx-auto px-6">
        <div className="text-xs font-bold uppercase tracking-widest text-[#4f8ef7] mb-4">
          // Dúvidas Frequentes
        </div>
        <div className="accent-bar" />
        <h2 className="text-4xl md:text-5xl font-black mb-12 leading-tight">FAQ</h2>

        <div className="space-y-3">
          {faqItems.map((item, idx) => (
            <div
              key={idx}
              className="border border-[rgba(79,142,247,0.14)] rounded-lg overflow-hidden hover:border-[rgba(79,142,247,0.28)] transition-all"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className={`w-full p-6 flex items-center justify-between transition-all ${
                  openIndex === idx
                    ? 'bg-[rgba(79,142,247,0.1)] text-[#4f8ef7]'
                    : 'bg-[#131a2a] text-white hover:bg-[#192035]'
                }`}
              >
                <span className="font-bold text-left">{item.question}</span>
                <ChevronDown
                  size={20}
                  className={`transition-transform ml-4 flex-shrink-0 ${
                    openIndex === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === idx && (
                <div className="p-6 bg-[#0c1018] border-t border-[rgba(79,142,247,0.14)] text-[#8899bb]">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
