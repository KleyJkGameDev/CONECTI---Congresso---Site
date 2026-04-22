/**
 * COMPONENTE: Registration
 * 
 * Seção de inscrição com:
 * - Seleção de categoria de ingresso
 * - Formulário de inscrição com validação
 * - Máscaras para CPF e telefone
 * - Integração com backend para salvar dados
 * 
 * INTEGRAÇÃO COM BACKEND:
 * - Enviar dados para API POST /api/inscricoes
 * - Validar CPF no backend
 * - Enviar e-mail de confirmação
 * - Verificar vagas disponíveis
 * - Processar pagamento (se aplicável)
 */

import { useState } from 'react';
import { Toast } from './Toast';
import { Modal } from './Modal';

interface TicketOption {
  id: string;
  name: string;
  description: string;
  price: string;
  free?: boolean;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  cpf: string;
  phone: string;
  institution: string;
  category: string;
  area: string;
  terms: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const tickets: TicketOption[] = [
  {
    id: 'ifma-ufma',
    name: 'Estudante IFMA / UFMA',
    description: 'Com comprovante de matrícula vigente',
    price: 'Gratuito',
    free: true,
  },
  {
    id: 'other-ies',
    name: 'Estudante Outras IES',
    description: 'Graduação ou Pós-Graduação',
    price: 'R$ 45',
  },
  {
    id: 'professional',
    name: 'Profissional',
    description: 'Acesso completo a todas as atividades',
    price: 'R$ 120',
  },
  {
    id: 'researcher',
    name: 'Pesquisador / Professor',
    description: 'Com certificação e acesso aos anais',
    price: 'R$ 90',
  },
];

const areas = [
  'Inteligência Artificial',
  'Cibersegurança',
  'Cloud & DevOps',
  'IoT & Embarcados',
  'Mobile',
  'Empreendedorismo Tech',
  'Múltiplas Áreas',
];

export default function Registration() {
  const [selectedTicket, setSelectedTicket] = useState('ifma-ufma');
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    cpf: '',
    phone: '',
    institution: '',
    category: 'Estudante IFMA / UFMA',
    area: 'Inteligência Artificial',
    terms: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<{
    type: 'success' | 'error';
    title: string;
    message: string;
  } | null>(null);

  // Máscaras de entrada
  const maskCPF = (value: string) => {
    const cleaned = value.replace(/\D/g, '').substring(0, 11);
    return cleaned
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const maskPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '').substring(0, 11);
    if (cleaned.length <= 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    }
    return cleaned.replace(/(\d{2})(\d{1})(\d{4})(\d{0,4})/, '($1) $2 $3-$4');
  };

  // Validações
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateCPF = (cpf: string) => {
    const cleaned = cpf.replace(/\D/g, '');
    return cleaned.length === 11 && !/^(\d)\1+$/.test(cleaned);
  };

  const handleTicketSelect = (ticketId: string) => {
    setSelectedTicket(ticketId);
    const ticket = tickets.find((t) => t.id === ticketId);
    if (ticket) {
      const categoryMap: Record<string, string> = {
        'ifma-ufma': 'Estudante IFMA / UFMA',
        'other-ies': 'Estudante de Outras IES',
        professional: 'Profissional',
        researcher: 'Pesquisador / Professor',
      };
      setFormData((prev) => ({
        ...prev,
        category: categoryMap[ticketId] || prev.category,
      }));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (name === 'cpf') {
      setFormData((prev) => ({ ...prev, [name]: maskCPF(value) }));
    } else if (name === 'phone') {
      setFormData((prev) => ({ ...prev, [name]: maskPhone(value) }));
    } else if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Limpar erro do campo ao editar
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'Nome é obrigatório';
    if (!formData.lastName.trim()) newErrors.lastName = 'Sobrenome é obrigatório';
    if (!validateEmail(formData.email)) newErrors.email = 'E-mail inválido';
    if (!validateCPF(formData.cpf)) newErrors.cpf = 'CPF inválido';
    if (!formData.institution.trim()) newErrors.institution = 'Instituição é obrigatória';
    if (!formData.terms) newErrors.terms = 'Aceite os termos para continuar';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setToastMessage({
        type: 'error',
        title: 'Atenção',
        message: 'Corrija os campos destacados para continuar.',
      });
      return;
    }

    try {
      // TODO: Integração com backend
      // const response = await fetch('/api/inscricoes', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     nome: `${formData.firstName} ${formData.lastName}`,
      //     email: formData.email,
      //     cpf: formData.cpf,
      //     telefone: formData.phone,
      //     instituicao: formData.institution,
      //     categoria: formData.category,
      //     area: formData.area,
      //     timestamp: new Date().toISOString(),
      //   }),
      // });

      // Simulação local (remover quando conectar ao backend)
      console.log('Dados de inscrição:', {
        nome: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        cpf: formData.cpf,
        telefone: formData.phone,
        instituicao: formData.institution,
        categoria: formData.category,
        area: formData.area,
        timestamp: new Date().toISOString(),
      });

      setShowModal(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        cpf: '',
        phone: '',
        institution: '',
        category: 'Estudante IFMA / UFMA',
        area: 'Inteligência Artificial',
        terms: false,
      });
    } catch (error) {
      setToastMessage({
        type: 'error',
        title: 'Erro',
        message: 'Falha na conexão. Tente novamente.',
      });
    }
  };

  return (
    <section id="inscricao" className="py-20 md:py-32 bg-[#07090f] animate-fade-in">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="text-xs font-bold uppercase tracking-widest text-[#4f8ef7] mb-4">
          // Inscrição
        </div>
        <div className="accent-bar" />

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: Ticket Selection */}
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Garanta sua Vaga no CONECT'25
            </h2>
            <p className="text-[#8899bb] mb-8 leading-relaxed">
              Inscrições abertas até 10/08/2025 ou enquanto houver vagas. Estudantes do IFMA e UFMA
              têm acesso gratuito com comprovante de matrícula vigente.
            </p>

            {/* Ticket Cards */}
            <div className="space-y-3 mb-8">
              {tickets.map((ticket) => (
                <button
                  key={ticket.id}
                  onClick={() => handleTicketSelect(ticket.id)}
                  className={`w-full p-4 rounded-lg border transition-all text-left ${
                    selectedTicket === ticket.id
                      ? 'bg-[rgba(79,142,247,0.15)] border-[#4f8ef7] shadow-lg shadow-[rgba(79,142,247,0.2)]'
                      : 'bg-[#131a2a] border-[rgba(79,142,247,0.14)] hover:border-[rgba(79,142,247,0.28)]'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-white">{ticket.name}</div>
                      <div className="text-sm text-[#8899bb]">{ticket.description}</div>
                    </div>
                    <div
                      className={`font-bold whitespace-nowrap ml-4 ${
                        ticket.free ? 'text-[#4f8ef7]' : 'text-white'
                      }`}
                    >
                      {ticket.price}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Includes Box */}
            <div className="p-4 rounded-lg bg-[#131a2a] border border-[rgba(79,142,247,0.14)]">
              <div className="text-xs font-bold uppercase tracking-widest text-[#4f8ef7] mb-3">
                Incluso em todas as categorias
              </div>
              <ul className="space-y-2 text-sm text-[#8899bb]">
                <li>✓ Acesso a todas as palestras e mesas-redondas</li>
                <li>✓ Certificado digital (24h de carga horária)</li>
                <li>✓ Coffee breaks e kit do participante</li>
                <li>✓ Acesso aos anais digitais do CONECT</li>
                <li>✓ Grupo exclusivo no WhatsApp do evento</li>
              </ul>
            </div>
          </div>

          {/* Right: Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-2xl font-bold text-white mb-6">Formulário de Inscrição</div>

            {/* Name Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Nome *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Seu nome"
                  className={`w-full px-4 py-2 rounded-lg bg-[#0c1018] border transition-all ${
                    errors.firstName
                      ? 'border-red-500'
                      : 'border-[rgba(79,142,247,0.14)] focus:border-[#4f8ef7]'
                  } text-white placeholder-[#445577] focus:outline-none`}
                />
                {errors.firstName && (
                  <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Sobrenome *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Sobrenome"
                  className={`w-full px-4 py-2 rounded-lg bg-[#0c1018] border transition-all ${
                    errors.lastName
                      ? 'border-red-500'
                      : 'border-[rgba(79,142,247,0.14)] focus:border-[#4f8ef7]'
                  } text-white placeholder-[#445577] focus:outline-none`}
                />
                {errors.lastName && (
                  <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">E-mail *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="seu@email.com"
                className={`w-full px-4 py-2 rounded-lg bg-[#0c1018] border transition-all ${
                  errors.email
                    ? 'border-red-500'
                    : 'border-[rgba(79,142,247,0.14)] focus:border-[#4f8ef7]'
                } text-white placeholder-[#445577] focus:outline-none`}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* CPF */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">CPF *</label>
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleInputChange}
                placeholder="000.000.000-00"
                maxLength={14}
                className={`w-full px-4 py-2 rounded-lg bg-[#0c1018] border transition-all ${
                  errors.cpf
                    ? 'border-red-500'
                    : 'border-[rgba(79,142,247,0.14)] focus:border-[#4f8ef7]'
                } text-white placeholder-[#445577] focus:outline-none`}
              />
              {errors.cpf && <p className="text-xs text-red-500 mt-1">{errors.cpf}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Telefone / WhatsApp
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(98) 9 0000-0000"
                className="w-full px-4 py-2 rounded-lg bg-[#0c1018] border border-[rgba(79,142,247,0.14)] focus:border-[#4f8ef7] text-white placeholder-[#445577] focus:outline-none transition-all"
              />
            </div>

            {/* Institution */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Instituição *</label>
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleInputChange}
                placeholder="Nome da sua faculdade ou empresa"
                className={`w-full px-4 py-2 rounded-lg bg-[#0c1018] border transition-all ${
                  errors.institution
                    ? 'border-red-500'
                    : 'border-[rgba(79,142,247,0.14)] focus:border-[#4f8ef7]'
                } text-white placeholder-[#445577] focus:outline-none`}
              />
              {errors.institution && (
                <p className="text-xs text-red-500 mt-1">{errors.institution}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Categoria</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-[#0c1018] border border-[rgba(79,142,247,0.14)] focus:border-[#4f8ef7] text-white focus:outline-none transition-all"
              >
                {tickets.map((ticket) => (
                  <option
                    key={ticket.id}
                    value={
                      {
                        'ifma-ufma': 'Estudante IFMA / UFMA',
                        'other-ies': 'Estudante de Outras IES',
                        professional: 'Profissional',
                        researcher: 'Pesquisador / Professor',
                      }[ticket.id]
                    }
                  >
                    {ticket.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Area of Interest */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Principal Área de Interesse
              </label>
              <select
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-[#0c1018] border border-[rgba(79,142,247,0.14)] focus:border-[#4f8ef7] text-white focus:outline-none transition-all"
              >
                {areas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>

            {/* Terms Checkbox */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 rounded border-[rgba(79,142,247,0.14)] bg-[#0c1018] cursor-pointer"
                />
                <span className="text-sm text-[#8899bb]">
                  Concordo com os termos de uso e autorizo o uso dos meus dados para fins do evento.
                </span>
              </label>
              {errors.terms && <p className="text-xs text-red-500 mt-2">{errors.terms}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#4f8ef7] to-[#7c55e8] text-white font-bold rounded-lg hover:opacity-90 transition-all"
            >
              → Concluir Inscrição
            </button>
          </form>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <Toast
          type={toastMessage.type}
          title={toastMessage.title}
          message={toastMessage.message}
          onClose={() => setToastMessage(null)}
        />
      )}

      {/* Success Modal */}
      {showModal && (
        <Modal
          icon="🎉"
          title="Inscrição Confirmada!"
          message="Sua inscrição no CONECT 2025 foi registrada com sucesso. Um e-mail de confirmação com os próximos passos será enviado em breve."
          onClose={() => setShowModal(false)}
        />
      )}
    </section>
  );
}
