/**
 * PÁGINA: Admin Dashboard
 * 
 * Dashboard para gerenciar:
 * - Inscrições (listar, filtrar, exportar)
 * - Submissões de artigos (listar, avaliar, aceitar/rejeitar)
 * - Estatísticas do evento
 * 
 * TODO: Integrar com backend para dados reais
 */

import { useState } from 'react';
import { BarChart3, Users, FileText, TrendingUp } from 'lucide-react';

interface Registration {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cpf: string;
  institution: string;
  category: string;
  area: string;
  date: string;
}

interface Submission {
  id: string;
  title: string;
  authors: string;
  email: string;
  area: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

const mockRegistrations: Registration[] = [
  {
    id: '1',
    firstName: 'João',
    lastName: 'Silva',
    email: 'joao@email.com',
    cpf: '123.456.789-00',
    institution: 'IFMA',
    category: 'Estudante IFMA',
    area: 'Inteligência Artificial',
    date: '2026-07-15',
  },
  {
    id: '2',
    firstName: 'Maria',
    lastName: 'Santos',
    email: 'maria@email.com',
    cpf: '987.654.321-00',
    institution: 'UFMA',
    category: 'Estudante Outra IES',
    area: 'Cibersegurança',
    date: '2026-07-16',
  },
];

const mockSubmissions: Submission[] = [
  {
    id: '1',
    title: 'IA em Diagnóstico Médico',
    authors: 'João Silva, Maria Santos',
    email: 'joao@email.com',
    area: 'Inteligência Artificial',
    status: 'pending',
    date: '2026-07-20',
  },
  {
    id: '2',
    title: 'Segurança em APIs REST',
    authors: 'Pedro Costa',
    email: 'pedro@email.com',
    area: 'Cibersegurança',
    status: 'approved',
    date: '2026-07-18',
  },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'overview' | 'registrations' | 'submissions'>('overview');
  const [registrations] = useState<Registration[]>(mockRegistrations);
  const [submissions, setSubmissions] = useState<Submission[]>(mockSubmissions);

  const stats = [
    {
      icon: Users,
      label: 'Inscrições',
      value: registrations.length,
      color: 'text-[#33d9f0]',
    },
    {
      icon: FileText,
      label: 'Submissões',
      value: submissions.length,
      color: 'text-[#4f8ef7]',
    },
    {
      icon: TrendingUp,
      label: 'Aprovadas',
      value: submissions.filter((s) => s.status === 'approved').length,
      color: 'text-[#10b981]',
    },
    {
      icon: BarChart3,
      label: 'Pendentes',
      value: submissions.filter((s) => s.status === 'pending').length,
      color: 'text-[#f59e0b]',
    },
  ];

  const handleSubmissionStatus = (id: string, status: 'approved' | 'rejected') => {
    setSubmissions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, status } : sub))
    );
  };

  return (
    <div className="min-h-screen bg-[#07090f] text-white">
      {/* Header */}
      <div className="pt-32 pb-12 bg-gradient-to-b from-[#0c1018] to-[#07090f] border-b border-[rgba(79,142,247,0.14)]">
        <div className="container max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-black mb-2">Dashboard Admin</h1>
          <p className="text-[#8899bb]">Gerenciar inscrições, submissões e visualizar estatísticas</p>
        </div>
      </div>

      {/* Content */}
      <div className="py-12">
        <div className="container max-w-7xl mx-auto px-6">
          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Icon className={`${stat.color}`} size={24} />
                  </div>
                  <div className="text-3xl font-black mb-1">{stat.value}</div>
                  <div className="text-sm text-[#8899bb]">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Tabs */}
          <div className="mb-8 flex gap-4 border-b border-[rgba(79,142,247,0.14)]">
            {(['overview', 'registrations', 'submissions'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                  activeTab === tab
                    ? 'border-[#4f8ef7] text-[#4f8ef7]'
                    : 'border-transparent text-[#8899bb] hover:text-white'
                }`}
              >
                {tab === 'overview' && 'Visão Geral'}
                {tab === 'registrations' && 'Inscrições'}
                {tab === 'submissions' && 'Submissões'}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Resumo do Evento</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-[#33d9f0] font-bold mb-4">Inscrições por Categoria</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-[#8899bb]">Estudante IFMA</span>
                        <span className="font-bold">1</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8899bb]">Estudante Outra IES</span>
                        <span className="font-bold">1</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8899bb]">Profissional</span>
                        <span className="font-bold">0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8899bb]">Pesquisador/Professor</span>
                        <span className="font-bold">0</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[#33d9f0] font-bold mb-4">Submissões por Área</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-[#8899bb]">Inteligência Artificial</span>
                        <span className="font-bold">1</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8899bb]">Cibersegurança</span>
                        <span className="font-bold">1</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8899bb]">Cloud & DevOps</span>
                        <span className="font-bold">0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8899bb]">Outras</span>
                        <span className="font-bold">0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Registrations Tab */}
          {activeTab === 'registrations' && (
            <div className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0c1018] border-b border-[rgba(79,142,247,0.14)]">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#8899bb]">
                        Nome
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#8899bb]">
                        E-mail
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#8899bb]">
                        Categoria
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#8899bb]">
                        Instituição
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#8899bb]">
                        Data
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((reg) => (
                      <tr
                        key={reg.id}
                        className="border-b border-[rgba(79,142,247,0.14)] hover:bg-[rgba(79,142,247,0.05)] transition-colors"
                      >
                        <td className="px-6 py-4 text-sm">
                          {reg.firstName} {reg.lastName}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#8899bb]">{reg.email}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className="px-3 py-1 bg-[rgba(79,142,247,0.1)] text-[#4f8ef7] rounded text-xs font-semibold">
                            {reg.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#8899bb]">{reg.institution}</td>
                        <td className="px-6 py-4 text-sm text-[#8899bb]">{reg.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Submissions Tab */}
          {activeTab === 'submissions' && (
            <div className="space-y-6">
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-6"
                >
                  <div className="mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold">{sub.title}</h3>
                      <span
                        className={`px-3 py-1 rounded text-xs font-semibold ${
                          sub.status === 'approved'
                            ? 'bg-[rgba(16,185,129,0.1)] text-[#10b981]'
                            : sub.status === 'rejected'
                              ? 'bg-[rgba(239,68,68,0.1)] text-[#ef4444]'
                              : 'bg-[rgba(245,158,11,0.1)] text-[#f59e0b]'
                        }`}
                      >
                        {sub.status === 'approved'
                          ? 'Aprovada'
                          : sub.status === 'rejected'
                            ? 'Rejeitada'
                            : 'Pendente'}
                      </span>
                    </div>
                    <p className="text-sm text-[#8899bb]">Autores: {sub.authors}</p>
                    <p className="text-sm text-[#8899bb]">Área: {sub.area}</p>
                    <p className="text-xs text-[#445577]">Enviado em: {sub.date}</p>
                  </div>

                  {sub.status === 'pending' && (
                    <div className="flex gap-3 pt-4 border-t border-[rgba(79,142,247,0.14)]">
                      <button
                        onClick={() => handleSubmissionStatus(sub.id, 'approved')}
                        className="flex-1 px-4 py-2 bg-[rgba(16,185,129,0.1)] text-[#10b981] font-semibold rounded hover:bg-[rgba(16,185,129,0.2)] transition-colors text-sm"
                      >
                        Aprovar
                      </button>
                      <button
                        onClick={() => handleSubmissionStatus(sub.id, 'rejected')}
                        className="flex-1 px-4 py-2 bg-[rgba(239,68,68,0.1)] text-[#ef4444] font-semibold rounded hover:bg-[rgba(239,68,68,0.2)] transition-colors text-sm"
                      >
                        Rejeitar
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
