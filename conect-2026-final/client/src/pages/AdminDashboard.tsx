/**
 * PÁGINA: Admin Dashboard
 * 
 * Dashboard administrativo com:
 * - Gerenciamento de usuários
 * - Gerenciamento de inscrições
 * - Gerenciamento de eventos
 * - Relatórios e estatísticas
 */

import { useState } from 'react';
import { useLocation } from 'wouter';
import { Users, FileText, Calendar, BarChart3, Plus, Edit2, Trash2, Home, LogOut, Eye, EyeOff } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

interface Registration {
  id: string;
  userId: string;
  userName: string;
  email: string;
  category: string;
  status: 'confirmed' | 'pending' | 'cancelled';
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

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'registrations' | 'events'>('overview');
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CongressEvent | null>(null);

  // Mock data
  const [users] = useState<User[]>([
    { id: '1', firstName: 'João', lastName: 'Silva', email: 'joao@email.com', createdAt: '2026-04-20' },
    { id: '2', firstName: 'Maria', lastName: 'Santos', email: 'maria@email.com', createdAt: '2026-04-21' },
    { id: '3', firstName: 'Pedro', lastName: 'Oliveira', email: 'pedro@email.com', createdAt: '2026-04-22' },
  ]);

  const [registrations] = useState<Registration[]>([
    { id: '1', userId: '1', userName: 'João Silva', email: 'joao@email.com', category: 'Estudante IFMA', status: 'confirmed', date: '2026-04-20' },
    { id: '2', userId: '2', userName: 'Maria Santos', email: 'maria@email.com', category: 'Profissional', status: 'confirmed', date: '2026-04-21' },
    { id: '3', userId: '3', userName: 'Pedro Oliveira', email: 'pedro@email.com', category: 'Pesquisador', status: 'pending', date: '2026-04-22' },
  ]);

  const [events, setEvents] = useState<CongressEvent[]>([
    { id: '1', title: 'Palestra: IA e Machine Learning', date: '2026-06-02', time: '09:00', location: 'Auditório Principal', description: 'Palestra sobre aplicações de IA', capacity: 100, registered: 85 },
    { id: '2', title: 'Workshop: Cibersegurança', date: '2026-06-03', time: '14:00', location: 'Sala 201', description: 'Workshop prático de segurança', capacity: 50, registered: 42 },
  ]);

  const [newEvent, setNewEvent] = useState<Partial<CongressEvent>>({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    capacity: 0,
  });

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

  const stats = [
    { label: 'Total de Usuários', value: users.length, icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Inscrições Confirmadas', value: registrations.filter(r => r.status === 'confirmed').length, icon: FileText, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Eventos Agendados', value: events.length, icon: Calendar, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Taxa de Ocupação', value: `${Math.round((registrations.length / 150) * 100)}%`, icon: BarChart3, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
  ];

  return (
    <div className="min-h-screen bg-[#07090f] text-white">
      <Navbar />

      <section className="py-20 md:py-32 bg-[#07090f]">
        <div className="container max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-5xl font-black mb-2">Dashboard Admin</h1>
              <p className="text-[#8899bb]">Gerenciar usuários, inscrições, eventos e visualizar relatórios</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 bg-[#4f8ef7] hover:bg-[#3d7ce8] text-white font-semibold rounded-lg transition-colors"
            >
              <Home size={20} />
              Voltar
            </button>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className={`${stat.bg} border border-[rgba(79,142,247,0.14)] rounded-lg p-6`}>
                  <div className="flex items-center justify-between mb-4">
                    <Icon className={`${stat.color}`} size={28} />
                  </div>
                  <div className="text-3xl font-black mb-1">{stat.value}</div>
                  <div className="text-sm text-[#8899bb] font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Tabs */}
          <div className="mb-8 flex gap-4 border-b border-[rgba(79,142,247,0.14)] overflow-x-auto">
            {(['overview', 'users', 'registrations', 'events'] as const).map((tab) => (
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
                {tab === 'users' && 'Usuários'}
                {tab === 'registrations' && 'Inscrições'}
                {tab === 'events' && 'Eventos'}
              </button>
            ))}
          </div>

          {/* Content */}
          {activeTab === 'overview' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Inscrições por Categoria</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#8899bb]">Estudante IFMA/UFMA</span>
                    <span className="font-bold">45</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8899bb]">Profissional</span>
                    <span className="font-bold">28</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8899bb]">Pesquisador</span>
                    <span className="font-bold">15</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Status das Inscrições</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-green-400">Confirmadas</span>
                    <span className="font-bold">80</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yellow-400">Pendentes</span>
                    <span className="font-bold">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-400">Canceladas</span>
                    <span className="font-bold">3</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0c1018] border-b border-[rgba(79,142,247,0.14)]">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Nome</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">E-mail</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Data de Cadastro</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-[rgba(79,142,247,0.14)] hover:bg-[#0c1018] transition-colors">
                        <td className="px-6 py-4">{user.firstName} {user.lastName}</td>
                        <td className="px-6 py-4 text-[#8899bb]">{user.email}</td>
                        <td className="px-6 py-4 text-[#8899bb]">{user.createdAt}</td>
                        <td className="px-6 py-4 flex gap-2">
                          <button className="p-2 hover:bg-[rgba(79,142,247,0.1)] rounded transition-colors">
                            <Eye size={18} className="text-[#4f8ef7]" />
                          </button>
                          <button className="p-2 hover:bg-[rgba(239,68,68,0.1)] rounded transition-colors">
                            <Trash2 size={18} className="text-red-400" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'registrations' && (
            <div className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0c1018] border-b border-[rgba(79,142,247,0.14)]">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Participante</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Categoria</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((reg) => (
                      <tr key={reg.id} className="border-b border-[rgba(79,142,247,0.14)] hover:bg-[#0c1018] transition-colors">
                        <td className="px-6 py-4">{reg.userName}</td>
                        <td className="px-6 py-4 text-[#8899bb]">{reg.category}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded text-sm font-semibold ${
                            reg.status === 'confirmed' ? 'bg-green-400/20 text-green-400' : 'bg-yellow-400/20 text-yellow-400'
                          }`}>
                            {reg.status === 'confirmed' ? 'Confirmada' : 'Pendente'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-[#8899bb]">{reg.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

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
      </section>

      <Footer />
    </div>
  );
}
