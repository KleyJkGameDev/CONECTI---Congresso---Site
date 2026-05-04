/**
 * PÁGINA: Perfil do Participante
 * 
 * Página com informações detalhadas do participante/palestrante:
 * - Foto de perfil com upload
 * - Dados pessoais
 * - Histórico de inscrições
 * - Submissões de artigos
 * - Certificados obtidos
 * - Informações de palestrante (se aplicável)
 * 
 * INTEGRAÇÃO COM BACKEND:
 * - Recuperar dados do participante via API
 * - Atualizar informações de perfil
 * - Gerenciar upload de foto (salvo em localStorage ou backend)
 * - Gerenciar inscrições e submissões
 */

import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, Building2, Award, FileText, Calendar, Camera, Upload, X, Download } from 'lucide-react';

interface Submission {
  id: string;
  title: string;
  status: 'Pendente' | 'Aprovado' | 'Rejeitado';
  submissionDate: string;
  area: string;
}

interface Certificate {
  id: string;
  event: string;
  date: string;
  hours: number;
}

interface ParticipantData {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  institution: string;
  category: string;
  bio?: string;
  profilePhoto?: string; // Base64 encoded image
  isSpeaker: boolean;
  registrations: Array<{
    eventId: string;
    eventName: string;
    registrationDate: string;
    status: 'Confirmado' | 'Pendente';
  }>;
  submissions: Submission[];
  certificates: Certificate[];
}

export default function ParticipantProfile() {
  const [activeTab, setActiveTab] = useState<'info' | 'submissions' | 'certificates'>('info');
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock data - em produção, virá da API
  const [participantData, setParticipantData] = useState<ParticipantData>({
    id: 'CONECT-1234567890',
    name: 'João Silva Santos',
    email: 'joao.silva@example.com',
    phone: '(98) 99999-8888',
    cpf: '123.456.789-00',
    institution: 'IFMA - Campus Santa Inês',
    category: 'Estudante IFMA / UFMA',
    bio: 'Estudante de Engenharia de Computação com interesse em Inteligência Artificial e Machine Learning',
    isSpeaker: false,
    registrations: [
      {
        eventId: 'CONECT-2026',
        eventName: 'CONECT!26 - Congresso de Engenharia de Computação',
        registrationDate: '2026-04-29',
        status: 'Confirmado',
      },
    ],
    submissions: [
      {
        id: 'SUB-001',
        title: 'Aplicação de IA em Diagnóstico Médico',
        status: 'Aprovado',
        submissionDate: '2026-04-15',
        area: 'Inteligência Artificial',
      },
      {
        id: 'SUB-002',
        title: 'Segurança em Aplicações Web Modernas',
        status: 'Pendente',
        submissionDate: '2026-04-28',
        area: 'Cibersegurança',
      },
    ],
    certificates: [
      {
        id: 'CERT-001',
        event: 'CONECT!26 - Congresso de Engenharia de Computacao',
        date: '2026-08-16',
        hours: 24,
      },
    ],
  });

  // Carregar foto de perfil do localStorage ao montar o componente
  useEffect(() => {
    const savedPhoto = localStorage.getItem('participantProfilePhoto');
    if (savedPhoto) {
      setProfilePhoto(savedPhoto);
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmado':
      case 'Aprovado':
        return 'text-green-400 bg-green-400/10';
      case 'Pendente':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'Rejeitado':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione um arquivo de imagem válido.');
        return;
      }

      // Validar tamanho (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('O arquivo é muito grande. Máximo 5MB.');
        return;
      }

      // Converter para Base64
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        setPhotoPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfilePhoto = () => {
    if (photoPreview) {
      // Salvar no localStorage
      localStorage.setItem('participantProfilePhoto', photoPreview);
      setProfilePhoto(photoPreview);
      setIsEditingPhoto(false);
      setPhotoPreview(null);
      alert('Foto de perfil atualizada com sucesso!');
    }
  };

  const removeProfilePhoto = () => {
    localStorage.removeItem('participantProfilePhoto');
    setProfilePhoto(null);
    setPhotoPreview(null);
    setIsEditingPhoto(false);
    alert('Foto de perfil removida.');
  };

  const cancelPhotoEdit = () => {
    setPhotoPreview(null);
    setIsEditingPhoto(false);
  };

  const downloadCertificate = (certId: string) => {
    // TODO: Implementar download de certificado
    alert(`Baixando certificado ${certId}...`);
  };

  return (
    <div className="min-h-screen bg-[#07090f] text-white">
      <Navbar />

      <section className="py-20 md:py-32 bg-[#07090f]">
        <div className="container max-w-4xl mx-auto px-6">
          {/* Profile Header */}
          <div className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-8 mb-8 animate-fade-in">
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mb-8">
              {/* Avatar with Photo Upload */}
              <div className="relative group">
                <div className="w-24 h-24 bg-gradient-to-br from-[#4f8ef7] to-[#7c55e8] rounded-full flex items-center justify-center text-4xl font-bold overflow-hidden">
                  {profilePhoto ? (
                    <img src={profilePhoto} alt="Foto de perfil" className="w-full h-full object-cover" />
                  ) : (
                    participantData.name.charAt(0)
                  )}
                </div>
                <button
                  onClick={() => setIsEditingPhoto(true)}
                  className="absolute bottom-0 right-0 bg-[#4f8ef7] p-2 rounded-full hover:bg-[#7c55e8] transition-colors shadow-lg"
                  title="Editar foto de perfil"
                >
                  <Camera className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-black mb-2">{participantData.name}</h1>
                <p className="text-[#4f8ef7] font-semibold mb-4">{participantData.category}</p>
                {participantData.bio && (
                  <p className="text-[#8899bb] leading-relaxed">{participantData.bio}</p>
                )}
              </div>

              {/* ID Badge */}
              <div className="bg-[rgba(79,142,247,0.1)] border border-[rgba(79,142,247,0.28)] rounded-lg p-4 text-center">
                <p className="text-xs text-[#8899bb] mb-1">ID do Participante</p>
                <p className="font-bold text-[#4f8ef7]">{participantData.id}</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#4f8ef7]" />
                <div>
                  <p className="text-xs text-[#8899bb]">E-mail</p>
                  <p className="font-semibold">{participantData.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#4f8ef7]" />
                <div>
                  <p className="text-xs text-[#8899bb]">Telefone</p>
                  <p className="font-semibold">{participantData.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-[#4f8ef7]" />
                <div>
                  <p className="text-xs text-[#8899bb]">Instituição</p>
                  <p className="font-semibold">{participantData.institution}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-[#4f8ef7]" />
                <div>
                  <p className="text-xs text-[#8899bb]">CPF</p>
                  <p className="font-semibold">{participantData.cpf}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Photo Upload Modal */}
          {isEditingPhoto && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-[#131a2a] border border-[rgba(79,142,247,0.28)] rounded-lg p-8 max-w-md w-full">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">Editar Foto de Perfil</h3>
                  <button onClick={cancelPhotoEdit} className="text-[#8899bb] hover:text-white">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Photo Preview */}
                {photoPreview ? (
                  <div className="mb-6">
                    <p className="text-sm text-[#8899bb] mb-3">Pré-visualização:</p>
                    <div className="w-full h-48 bg-[rgba(79,142,247,0.05)] rounded-lg overflow-hidden flex items-center justify-center">
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  </div>
                ) : (
                  <div className="mb-6">
                    <p className="text-sm text-[#8899bb] mb-3">Nenhuma imagem selecionada</p>
                    <div className="w-full h-48 bg-[rgba(79,142,247,0.05)] border border-dashed border-[rgba(79,142,247,0.28)] rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-[#8899bb] mx-auto mb-2" />
                        <p className="text-xs text-[#8899bb]">Selecione uma imagem</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />

                {/* Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full px-4 py-3 bg-[rgba(79,142,247,0.1)] border border-[rgba(79,142,247,0.28)] text-[#4f8ef7] font-bold rounded-lg hover:bg-[rgba(79,142,247,0.2)] transition-colors"
                  >
                    Selecionar Imagem
                  </button>

                  {photoPreview && (
                    <>
                      <button
                        onClick={saveProfilePhoto}
                        className="w-full px-4 py-3 bg-gradient-to-r from-[#4f8ef7] to-[#7c55e8] text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
                      >
                        Salvar Foto
                      </button>
                      {profilePhoto && (
                        <button
                          onClick={removeProfilePhoto}
                          className="w-full px-4 py-3 bg-red-500/20 text-red-400 border border-red-500/50 font-bold rounded-lg hover:bg-red-500/30 transition-colors"
                        >
                          Remover Foto Atual
                        </button>
                      )}
                    </>
                  )}

                  <button
                    onClick={cancelPhotoEdit}
                    className="w-full px-4 py-3 bg-[#131a2a] border border-[rgba(79,142,247,0.28)] text-white font-bold rounded-lg hover:bg-[#1a2335] transition-colors"
                  >
                    Cancelar
                  </button>
                </div>

                {/* Info */}
                <p className="text-xs text-[#8899bb] mt-4">
                  Formatos aceitos: JPG, PNG, GIF. Tamanho máximo: 5MB.
                </p>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-[rgba(79,142,247,0.14)]">
            {(['info', 'submissions', 'certificates'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-semibold transition-colors ${
                  activeTab === tab
                    ? 'text-[#4f8ef7] border-b-2 border-[#4f8ef7]'
                    : 'text-[#8899bb] hover:text-white'
                }`}
              >
                {tab === 'info' && 'Informações'}
                {tab === 'submissions' && 'Submissões'}
                {tab === 'certificates' && 'Certificados'}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'info' && (
            <div className="space-y-6">
              {/* Registrations */}
              <div className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-[#4f8ef7]" />
                  Inscrições em Eventos
                </h2>

                <div className="space-y-4">
                  {participantData.registrations.map((reg) => (
                    <div
                      key={reg.eventId}
                      className="p-4 bg-[rgba(79,142,247,0.05)] border border-[rgba(79,142,247,0.14)] rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg">{reg.eventName}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(reg.status)}`}>
                          {reg.status}
                        </span>
                      </div>
                      <p className="text-sm text-[#8899bb]">
                        Inscrito em: {new Date(reg.registrationDate).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'submissions' && (
            <div className="space-y-6">
              <div className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <FileText className="w-6 h-6 text-[#4f8ef7]" />
                  Submissões de Artigos
                </h2>

                <div className="space-y-4">
                  {participantData.submissions.length > 0 ? (
                    participantData.submissions.map((sub) => (
                      <div
                        key={sub.id}
                        className="p-4 bg-[rgba(79,142,247,0.05)] border border-[rgba(79,142,247,0.14)] rounded-lg"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg">{sub.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(sub.status)}`}>
                            {sub.status}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-[#8899bb]">
                          <span>Área: {sub.area}</span>
                          <span>Enviado em: {new Date(sub.submissionDate).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-[#8899bb]">Nenhuma submissão realizada ainda.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'certificates' && (
            <div className="space-y-6">
              <div className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Award className="w-6 h-6 text-[#4f8ef7]" />
                  Certificados
                </h2>

                <div className="space-y-4">
                  {participantData.certificates.length > 0 ? (
                    participantData.certificates.map((cert) => (
                      <div
                        key={cert.id}
                        className="p-4 bg-[rgba(79,142,247,0.05)] border border-[rgba(79,142,247,0.14)] rounded-lg flex justify-between items-center"
                      >
                        <div>
                          <h3 className="font-bold">{cert.event}</h3>
                          <p className="text-sm text-[#8899bb]">
                            {new Date(cert.date).toLocaleDateString('pt-BR')} • {cert.hours}h de carga horária
                          </p>
                        </div>
                        <button
                          onClick={() => downloadCertificate(cert.id)}
                          className="px-4 py-2 bg-[#4f8ef7] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Baixar
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-[#8899bb]">Nenhum certificado disponível ainda.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
