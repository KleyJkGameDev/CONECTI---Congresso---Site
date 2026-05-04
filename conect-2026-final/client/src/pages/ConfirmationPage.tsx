/**
 * PÁGINA: Confirmação de Inscrição
 * 
 * Página exibida após a inscrição bem-sucedida com:
 * - Mensagem de confirmação
 * - QR code para acesso ao evento
 * - Informações do participante (recuperadas do localStorage)
 * - Botão para download do comprovante
 * - Botão para adicionar o evento à agenda
 * 
 * INTEGRAÇÃO COM BACKEND:
 * - Recebe dados da inscrição via localStorage
 * - Gera QR code com ID único da inscrição
 * - Permite download do comprovante em PDF
 * - Integração com Google Calendar para adicionar evento
 */

import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { QRCodeSVG } from 'qrcode.react';
import { Calendar, Download, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface RegistrationData {
  id: string;
  firstName: string;
  lastName: string;
  name?: string;
  email: string;
  cpf: string;
  phone?: string;
  category: string;
  institution: string;
  area?: string;
  registrationDate: string;
  timestamp?: string;
}

export default function ConfirmationPage() {
  const [, navigate] = useLocation();
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  const [calendarAdded, setCalendarAdded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Recuperar dados da inscrição do localStorage
      const savedData = localStorage.getItem('registrationData');
      
      if (savedData) {
        const data = JSON.parse(savedData);
        
        // Validar se os dados essenciais existem
        if (!data.firstName || !data.lastName || !data.email) {
          console.warn('Dados de inscrição incompletos');
          setError('Dados de inscrição incompletos. Redirecionando...');
          setTimeout(() => navigate('/'), 2000);
          return;
        }
        
        const fullName = `${data.firstName} ${data.lastName}`;
        setRegistrationData({
          ...data,
          name: fullName,
          id: `CONECT-${Date.now()}`,
          registrationDate: new Date().toLocaleDateString('pt-BR'),
        });
      } else {
        // Se não houver dados, redirecionar para home
        console.warn('Nenhum dado de inscrição encontrado no localStorage');
        setError('Nenhuma inscrição encontrada. Redirecionando...');
        setTimeout(() => navigate('/'), 2000);
      }
    } catch (error) {
      console.error('Erro ao recuperar dados do localStorage:', error);
      setError('Erro ao carregar dados. Redirecionando...');
      localStorage.removeItem('registrationData');
      setTimeout(() => navigate('/'), 2000);
    }
  }, [navigate]);

  const downloadCertificate = () => {
    if (!registrationData) return;

    const element = document.getElementById('certificate');
    if (element) {
      const canvas = element.querySelector('canvas') as HTMLCanvasElement;
      if (canvas) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `CONECT-2026-${registrationData.id}.png`;
        link.click();
      }
    }
  };

  const addToCalendar = () => {
    if (!registrationData) return;

    // Dados do evento
    const eventTitle = 'CONECT!26 - Congresso de Engenharia de Computação';
    const eventDate = '2026-06-02'; // Data do evento
    const eventStartTime = '08:00';
    const eventEndTime = '18:00';
    const eventLocation = 'Santa Inês, Maranhão, Brasil';
    const eventDescription = `Inscrição confirmada para ${registrationData.name}\nID: ${registrationData.id}\nCategoria: ${registrationData.category}\nÁrea: ${registrationData.area || 'Não especificada'}`;

    // Criar URL do Google Calendar
    const startDateTime = `${eventDate.replace(/-/g, '')}T${eventStartTime.replace(/:/g, '')}00`;
    const endDateTime = `${eventDate.replace(/-/g, '')}T${eventEndTime.replace(/:/g, '')}00`;
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDateTime}/${endDateTime}&location=${encodeURIComponent(eventLocation)}&details=${encodeURIComponent(eventDescription)}`;

    // Abrir Google Calendar em nova aba
    window.open(googleCalendarUrl, '_blank');

    // Também criar arquivo .ics para download (compatível com Outlook, Apple Calendar, etc.)
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//CONECT//CONECT 2026//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
DTSTART:${startDateTime}Z
DTEND:${endDateTime}Z
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
UID:${registrationData.id}@conect.ifma.edu.br
CREATED:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DESCRIPTION:${eventDescription}
LOCATION:${eventLocation}
SUMMARY:${eventTitle}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `CONECT-2026-${registrationData.id}.ics`;
    link.click();

    setCalendarAdded(true);
    setTimeout(() => setCalendarAdded(false), 3000);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#07090f] text-white flex items-center justify-center">
        <div className="text-center p-6 bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.28)] rounded-lg max-w-md">
          <AlertCircle className="w-12 h-12 text-[#ef4444] mx-auto mb-4" />
          <p className="text-lg text-[#ef4444]">{error}</p>
        </div>
      </div>
    );
  }

  if (!registrationData) {
    return (
      <div className="min-h-screen bg-[#07090f] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block mb-4">
            <div className="w-12 h-12 border-4 border-[#4f8ef7] border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-lg text-[#8899bb]">Carregando informações...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090f] text-white">
      <Navbar />

      <section className="py-20 md:py-32 bg-[#07090f]">
        <div className="container max-w-2xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-block mb-6 p-4 bg-[rgba(79,142,247,0.1)] border border-[rgba(79,142,247,0.28)] rounded-full">
              <svg className="w-12 h-12 text-[#33d9f0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Inscrição Confirmada!
            </h1>
            <p className="text-lg text-[#8899bb] mb-2">
              Bem-vindo ao CONECT!26
            </p>
            <p className="text-sm text-[#4f8ef7]">
              ID de Inscrição: {registrationData.id}
            </p>
          </div>

          {/* QR Code Section */}
          <div className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-8 mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-4">Seu QR Code de Acesso</h2>
              <div className="bg-[rgba(51,217,240,0.1)] border border-[rgba(51,217,240,0.28)] rounded-lg p-4 mb-4">
                <p className="text-[#33d9f0] text-sm font-semibold mb-2">Como usar seu QR Code:</p>
                <ul className="text-[#8899bb] text-sm space-y-1 text-left">
                  <li>✓ Apresente este codigo no credenciamento do evento</li>
                  <li>✓ Baixe e guarde a imagem para acessar offline</li>
                  <li>✓ Voce pode compartilhar este codigo apenas com voce mesmo</li>
                  <li>✓ O codigo e unico e intransferivel</li>
                </ul>
              </div>
              <p className="text-[#8899bb] text-sm">Apresente este codigo na entrada do evento para validar sua inscricao</p>
            </div>

            <div id="certificate" className="flex justify-center mb-6 bg-white p-4 rounded-lg">
              <QRCodeSVG
                value={`CONECT-2026-${registrationData.id}`}
                size={256}
                level="H"
                includeMargin={true}
                fgColor="#000000"
                bgColor="#ffffff"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={downloadCertificate}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#4f8ef7] to-[#7c55e8] text-white font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Baixar QR Code
              </button>
              <button
                onClick={addToCalendar}
                className={`flex-1 px-6 py-3 font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${
                  calendarAdded
                    ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                    : 'bg-[rgba(79,142,247,0.1)] border border-[rgba(79,142,247,0.28)] text-[#4f8ef7] hover:bg-[rgba(79,142,247,0.2)]'
                }`}
              >
                <Calendar className="w-5 h-5" />
                {calendarAdded ? 'Adicionado!' : 'Adicionar à Agenda'}
              </button>
            </div>
          </div>

          {/* Registration Details */}
          <div className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Informações da Inscrição</h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-[rgba(79,142,247,0.14)]">
                <span className="text-[#8899bb]">Nome</span>
                <span className="font-semibold">{registrationData.name}</span>
              </div>

              <div className="flex justify-between items-center pb-4 border-b border-[rgba(79,142,247,0.14)]">
                <span className="text-[#8899bb]">E-mail</span>
                <span className="font-semibold">{registrationData.email}</span>
              </div>

              {registrationData.phone && (
                <div className="flex justify-between items-center pb-4 border-b border-[rgba(79,142,247,0.14)]">
                  <span className="text-[#8899bb]">Telefone</span>
                  <span className="font-semibold">{registrationData.phone}</span>
                </div>
              )}

              <div className="flex justify-between items-center pb-4 border-b border-[rgba(79,142,247,0.14)]">
                <span className="text-[#8899bb]">CPF</span>
                <span className="font-semibold">{registrationData.cpf}</span>
              </div>

              <div className="flex justify-between items-center pb-4 border-b border-[rgba(79,142,247,0.14)]">
                <span className="text-[#8899bb]">Categoria</span>
                <span className="font-semibold text-[#4f8ef7]">{registrationData.category}</span>
              </div>

              {registrationData.area && (
                <div className="flex justify-between items-center pb-4 border-b border-[rgba(79,142,247,0.14)]">
                  <span className="text-[#8899bb]">Área de Interesse</span>
                  <span className="font-semibold">{registrationData.area}</span>
                </div>
              )}

              <div className="flex justify-between items-center pb-4 border-b border-[rgba(79,142,247,0.14)]">
                <span className="text-[#8899bb]">Instituição</span>
                <span className="font-semibold">{registrationData.institution}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#8899bb]">Data de Inscrição</span>
                <span className="font-semibold">{registrationData.registrationDate}</span>
              </div>
            </div>
          </div>

          {/* Important Info */}
          <div className="bg-[rgba(79,142,247,0.1)] border border-[rgba(79,142,247,0.28)] rounded-lg p-6 mb-8">
            <h3 className="font-bold mb-4 text-[#4f8ef7]">Informações Importantes</h3>
            <ul className="space-y-3 text-sm text-[#8899bb]">
              <li className="flex items-start gap-3">
                <span className="text-[#4f8ef7] font-bold">•</span>
                <span>Guarde seu ID de inscrição: <strong>{registrationData.id}</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#4f8ef7] font-bold">•</span>
                <span>Chegue 15 minutos antes do início do evento</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#4f8ef7] font-bold">•</span>
                <span>Leve um documento de identificação</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#4f8ef7] font-bold">•</span>
                <span>Certificado será enviado por e-mail após o evento</span>
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/"
              className="flex-1 px-6 py-3 bg-[#131a2a] border border-[rgba(79,142,247,0.28)] text-white font-bold rounded-lg hover:bg-[#1a2335] transition-colors text-center"
            >
              Voltar para Home
            </a>
            <a
              href="/perfil"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#4f8ef7] to-[#7c55e8] text-white font-bold rounded-lg hover:opacity-90 transition-opacity text-center"
            >
              Ir para Meu Perfil
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
