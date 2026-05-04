/**
 * PÁGINA: Admin Dashboard Unificado
 * 
 * Dashboard administrativo completo com:
 * - Gerenciamento de inscrições
 * - Gerenciamento de submissões de artigos
 * - Gerenciamento de eventos
 * - Estatísticas e relatórios
 * - Proteção por autenticação de admin
 */

import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { BarChart3, Users, FileText, TrendingUp, Download, Search, Filter, Home, Plus, Edit2, Trash2, Eye, EyeOff, Calendar, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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

interface CongressEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  capacity: number;
  registered: number;
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

const mockEvents: CongressEvent[] = [
  { id: '1', title: 'Palestra: IA e Machine Learning', date: '2026-06-02', time: '09:00', location: 'Auditório Principal', description: 'Palestra sobre aplicações de IA', capacity: 100, registered: 85 },
  { id: '2', title: 'Workshop: Cibersegurança', date: '2026-06-03', time: '14:00', location: 'Sala 201', description: 'Workshop prático de segurança', capacity: 50, registered: 42 },
];

export default function Admin() {
  const [, navigate] = useLocation();
  const { user, isAdmin, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'registrations' | 'submissions' | 'events'>('overview');
  const [registrations] = useState<Registration[]>(mockRegistrations);
  const [submissions, setSubmissions] = useState<Submission[]>(mockSubmissions);
  const [events, setEvents] = useState<CongressEvent[]>(mockEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<CongressEvent>>({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    capacity: 0,
  });

  // Proteger rota - redirecionar se não for admin
  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin-login');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null;
  }

  const stats = [
    {
      icon: Users,
      label: 'Inscrições',
      value: registrations.length,
      color: 'text-[#33d9f0]',
      bg: 'bg-[rgba(51,217,240,0.1)]',
    },
    {
      icon: FileText,
      label: 'Submissões',
      value: submissions.length,
      color: 'text-[#4f8ef7]',
      bg: 'bg-[rgba(79,142,247,0.1)]',
    },
    {
      icon: TrendingUp,
      label: 'Aprovadas',
      value: submissions.filter((s) => s.status === 'approved').length,
      color: 'text-[#10b981]',
      bg: 'bg-[rgba(16,185,129,0.1)]',
    },
    {
      icon: Calendar,
      label: 'Eventos',
      value: events.length,
      color: 'text-[#f59e0b]',
      bg: 'bg-[rgba(245,158,11,0.1)]',
    },
  ];

  const handleSubmissionStatus = (id: string, status: 'approved' | 'rejected') => {
    setSubmissions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, status } : sub))
    );
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time && newEvent.location) {
      const event: CongressEvent = {
        id: `event-${Date.now()}`,
        title: newEvent.title || '',
        date: newEvent.date || '',
        time: newEvent.time || '',
        location: newEvent.location || '',
        description: newEvent.description || '',
        capacity: newEvent.capacity || 0,
        registered: 0,
      };
      setEvents([...events, event]);
      setNewEvent({ title: '', date: '', time: '', location: '', description: '', capacity: 0 });
      setShowEventForm(false);
    }
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const filteredRegistrations = registrations.filter((reg) =>
    `${reg.firstName} ${reg.lastName} ${reg.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch = `${sub.title} ${sub.authors}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterCategory === 'all' || sub.status === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const exportData = (type: 'registrations' | 'submissions') => {
    const data = type === 'registrations' ? registrations : submissions;
    const csv = [
      Object.keys(data[0]).join(','),
      ...data.map((item) => Object.values(item).join(',')),
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#07090f] text-white pt-16">
      <Navbar />

      {/* Header */}
      <div className="py-12 bg-gradient-to-b from-[#0c1018] to-[#07090f] border-b border-[rgba(79,142,247,0.14)]">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-5xl font-black">Dashboard Admin</h1>
              <p className="text-[#8899bb] mt-2">Bem-vindo, {user?.firstName}!</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-4 py-2 bg-[#4f8ef7] hover:bg-[#3d7ce8] text-white font-semibold rounded-lg transition-colors"
              >
                <Home size={20} />
                Home
              </button>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold rounded-lg transition-colors"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
          <p className="text-[#8899bb]">Gerenciar inscrições, submissões, eventos e visualizar estatísticas do CONECT!26</p>
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
                  className={`${stat.bg} border border-[rgba(79,142,247,0.14)] rounded-lg p-6 hover:border-[rgba(79,142,247,0.28)] transition-all`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Icon className={`${stat.color}`} size={28} />
                  </div>
                  <div className="text-4xl font-black mb-1">{stat.value}</div>
                  <div className="text-sm text-[#8899bb] font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Tabs */}
          <div className="mb-8 flex gap-4 border-b border-[rgba(79,142,247,0.14)] overflow-x-auto">
            {(['overview', 'registrations', 'submissions', 'events'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-semibold transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-[#4f8ef7] text-[#4f8ef7]'
                    : 'border-transparent text-[#8899bb] hover:text-white'
                }`}
              >
                {tab === 'overview' && 'Visão Geral'}
                {tab === 'registrations' && 'Inscrições'}
                {tab === 'submissions' && 'Submissões'}
                {tab === 'events' && 'Eventos'}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-8">
                  <h2 className="text-2xl font-bold mb-6 text-[#33d9f0]">Inscrições por Categoria</h2>
                  <div className="space-y-4">
                    {['Estudante IFMA', 'Estudante Outra IES', 'Profissional', 'Pesquisador/Professor'].map((cat) => (
                      <div key={cat} className="flex justify-between items-center">
                        <span className="text-[#8899bb]">{cat}</span>
                        <span className="font-bold">{registrations.filter(r => r.category === cat).length}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-8">
                  <h2 className="text-2xl font-bold mb-6 text-[#33d9f0]">Status das Submissões</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-green-400">Aprovadas</span>
                      <span className="font-bold">{submissions.filter(s => s.status === 'approved').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-yellow-400">Pendentes</span>
                      <span className="font-bold">{submissions.filter(s => s.status === 'pending').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-400">Rejeitadas</span>
                      <span className="font-bold">{submissions.filter(s => s.status === 'rejected').length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Registrations Tab */}
          {activeTab === 'registrations' && (
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 text-[#8899bb]" size={20} />
                  <input
                    type="text"
                    placeholder="Buscar por nome ou email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-[#0c1018] border border-[rgba(79,142,247,0.14)] rounded text-white placeholder-[#445577] focus:border-[#4f8ef7] outline-none"
                  />
                </div>
                <button
                  onClick={() => exportData('registrations')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 font-semibold rounded hover:bg-green-500/30 transition-colors"
                >
                  <Download size={20} />
                  Exportar CSV
                </button>
              </div>

              <div className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#0c1018] border-b border-[rgba(79,142,247,0.14)]">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Nome</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Categoria</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Instituição</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRegistrations.map((reg) => (
                        <tr key={reg.id} className="border-b border-[rgba(79,142,247,0.14)] hover:bg-[#0c1018] transition-colors">
                          <td className="px-6 py-4">{reg.firstName} {reg.lastName}</td>
                          <td className="px-6 py-4 text-[#8899bb]">{reg.email}</td>
                          <td className="px-6 py-4 text-[#8899bb]">{reg.category}</td>
                          <td className="px-6 py-4 text-[#8899bb]">{reg.institution}</td>
                          <td className="px-6 py-4 text-[#8899bb]">{reg.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Submissions Tab */}
          {activeTab === 'submissions' && (
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 text-[#8899bb]" size={20} />
                  <input
                    type="text"
                    placeholder="Buscar por título ou autor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-[#0c1018] border border-[rgba(79,142,247,0.14)] rounded text-white placeholder-[#445577] focus:border-[#4f8ef7] outline-none"
                  />
                </div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 bg-[#0c1018] border border-[rgba(79,142,247,0.14)] rounded text-white focus:border-[#4f8ef7] outline-none"
                >
                  <option value="all">Todos os Status</option>
                  <option value="pending">Pendentes</option>
                  <option value="approved">Aprovados</option>
                  <option value="rejected">Rejeitados</option>
                </select>
                <button
                  onClick={() => exportData('submissions')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 font-semibold rounded hover:bg-green-500/30 transition-colors"
                >
                  <Download size={20} />
                  Exportar CSV
                </button>
              </div>

              <div className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#0c1018] border-b border-[rgba(79,142,247,0.14)]">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Título</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Autores</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Área</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSubmissions.map((sub) => (
                        <tr key={sub.id} className="border-b border-[rgba(79,142,247,0.14)] hover:bg-[#0c1018] transition-colors">
                          <td className="px-6 py-4">{sub.title}</td>
                          <td className="px-6 py-4 text-[#8899bb]">{sub.authors}</td>
                          <td className="px-6 py-4 text-[#8899bb]">{sub.area}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded text-sm font-semibold ${
                              sub.status === 'approved' ? 'bg-green-400/20 text-green-400' :
                              sub.status === 'pending' ? 'bg-yellow-400/20 text-yellow-400' :
                              'bg-red-400/20 text-red-400'
                            }`}>
                              {sub.status === 'approved' ? 'Aprovada' : sub.status === 'pending' ? 'Pendente' : 'Rejeitada'}
                            </span>
                          </td>
                          <td className="px-6 py-4 flex gap-2">
                            {sub.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleSubmissionStatus(sub.id, 'approved')}
                                  className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-semibold rounded hover:bg-green-500/30 transition-colors"
                                >
                                  Aprovar
                                </button>
                                <button
                                  onClick={() => handleSubmissionStatus(sub.id, 'rejected')}
                                  className="px-3 py-1 bg-red-500/20 text-red-400 text-sm font-semibold rounded hover:bg-red-500/30 transition-colors"
                                >
                                  Rejeitar
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              <button
                onClick={() => setShowEventForm(!showEventForm)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4f8ef7] to-[#7c55e8] text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
              >
                <Plus size={20} />
                Novo Evento
              </button>

              {showEventForm && (
                <div className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Criar Novo Evento</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Título do evento"
                      value={newEvent.title || ''}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      className="px-4 py-2 bg-[#0c1018] border border-[rgba(79,142,247,0.14)] rounded text-white placeholder-[#445577] focus:border-[#4f8ef7] outline-none"
                    />
                    <input
                      type="date"
                      value={newEvent.date || ''}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      className="px-4 py-2 bg-[#0c1018] border border-[rgba(79,142,247,0.14)] rounded text-white focus:border-[#4f8ef7] outline-none"
                    />
                    <input
                      type="time"
                      value={newEvent.time || ''}
                      onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                      className="px-4 py-2 bg-[#0c1018] border border-[rgba(79,142,247,0.14)] rounded text-white focus:border-[#4f8ef7] outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Local"
                      value={newEvent.location || ''}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      className="px-4 py-2 bg-[#0c1018] border border-[rgba(79,142,247,0.14)] rounded text-white placeholder-[#445577] focus:border-[#4f8ef7] outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Capacidade"
                      value={newEvent.capacity || ''}
                      onChange={(e) => setNewEvent({ ...newEvent, capacity: parseInt(e.target.value) })}
                      className="px-4 py-2 bg-[#0c1018] border border-[rgba(79,142,247,0.14)] rounded text-white placeholder-[#445577] focus:border-[#4f8ef7] outline-none"
                    />
                    <textarea
                      placeholder="Descrição"
                      value={newEvent.description || ''}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      className="px-4 py-2 bg-[#0c1018] border border-[rgba(79,142,247,0.14)] rounded text-white placeholder-[#445577] focus:border-[#4f8ef7] outline-none md:col-span-2"
                    />
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={handleAddEvent}
                      className="px-6 py-2 bg-green-500/20 text-green-400 font-semibold rounded hover:bg-green-500/30 transition-colors"
                    >
                      Salvar
                    </button>
                    <button
                      onClick={() => setShowEventForm(false)}
                      className="px-6 py-2 bg-[rgba(79,142,247,0.1)] text-[#4f8ef7] font-semibold rounded hover:bg-[rgba(79,142,247,0.2)] transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                {events.map((event) => (
                  <div key={event.id} className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold">{event.title}</h3>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="p-2 hover:bg-[rgba(239,68,68,0.1)] rounded transition-colors"
                      >
                        <Trash2 size={18} className="text-red-400" />
                      </button>
                    </div>
                    <div className="space-y-2 text-sm text-[#8899bb]">
                      <p>Data: {event.date} às {event.time}</p>
                      <p>Local: {event.location}</p>
                      <p>Capacidade: {event.registered}/{event.capacity}</p>
                      <p className="text-[#4f8ef7]">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
