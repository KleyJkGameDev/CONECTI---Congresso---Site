/**
 * COMPONENTE: Submission
 * 
 * Seção de submissão de artigos com:
 * - Formulário com validação completa
 * - Upload de arquivo PDF
 * - Seleção de área de pesquisa
 * - Feedback visual de sucesso/erro
 * 
 * INTEGRAÇÃO COM BACKEND:
 * - Enviar dados para POST /api/submissoes
 * - Arquivo PDF deve ser enviado como FormData
 */

import { useState } from 'react';
import { useLocation } from 'wouter';
import { Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface SubmissionFormData {
  title: string;
  authors: string;
  email: string;
  institution: string;
  area: string;
  abstract: string;
  file: File | null;
}

interface SubmissionStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export default function Submission() {
  const [, navigate] = useLocation();
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [formData, setFormData] = useState<SubmissionFormData>({
    title: '',
    authors: '',
    email: '',
    institution: '',
    area: '',
    abstract: '',
    file: null,
  });

  const [status, setStatus] = useState<SubmissionStatus>({
    type: 'idle',
    message: '',
  });

  const [fileName, setFileName] = useState<string>('');

  const areas = [
    'Inteligência Artificial',
    'Cibersegurança',
    'Cloud & DevOps',
    'IoT & Embarcados',
    'Mobile',
    'Pesquisa Científica',
    'Outro',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setStatus({
          type: 'error',
          message: 'Por favor, selecione um arquivo PDF válido.',
        });
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setStatus({
          type: 'error',
          message: 'O arquivo não pode exceder 10MB.',
        });
        return;
      }
      setFormData((prev) => ({
        ...prev,
        file,
      }));
      setFileName(file.name);
      setStatus({ type: 'idle', message: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title || !formData.authors || !formData.email || !formData.institution || !formData.area || !formData.abstract || !formData.file) {
      setStatus({
        type: 'error',
        message: 'Por favor, preencha todos os campos e selecione um arquivo PDF.',
      });
      return;
    }

    // Verificar se usuário está autenticado
    if (!isAuthenticated) {
      localStorage.setItem('pendingSubmission', JSON.stringify(formData));
      setShowAuthModal(true);
      return;
    }

    setStatus({ type: 'loading', message: 'Enviando submissão...' });

    try {
      // TODO: Substituir por chamada real à API
      // const formDataToSend = new FormData();
      // formDataToSend.append('title', formData.title);
      // formDataToSend.append('authors', formData.authors);
      // formDataToSend.append('email', formData.email);
      // formDataToSend.append('institution', formData.institution);
      // formDataToSend.append('area', formData.area);
      // formDataToSend.append('abstract', formData.abstract);
      // formDataToSend.append('file', formData.file);
      // formDataToSend.append('timestamp', new Date().toISOString());
      //
      // const response = await fetch('/api/submissoes', {
      //   method: 'POST',
      //   body: formDataToSend,
      // });
      //
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message);

      // Simulação local
      console.log('Dados de submissão:', {
        title: formData.title,
        authors: formData.authors,
        email: formData.email,
        institution: formData.institution,
        area: formData.area,
        abstract: formData.abstract,
        fileName: formData.file?.name,
        timestamp: new Date().toISOString(),
      });

      setStatus({
        type: 'success',
        message: '[SIMULADO] Submissão recebida! Em breve a comissão científica analisará seu trabalho. Você receberá um e-mail de confirmação em até 48h úteis.',
      });

      setFormData({
        title: '',
        authors: '',
        email: '',
        institution: '',
        area: '',
        abstract: '',
        file: null,
      });
      setFileName('');
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Erro ao enviar submissão. Tente novamente.',
      });
    }
  };

  return (
    <section id="submissao" className="py-20 md:py-32 bg-[#0c1018] animate-fade-in">
      <div className="container max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-[#4f8ef7] mb-4">
            // Submissão de Artigos
          </div>
          <div className="accent-bar" />
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Compartilhe sua
            <br />
            Pesquisa com o CONECT!26
          </h2>
          <p className="text-[#8899bb] font-light max-w-2xl">
            Submeta artigos, TCCs ou projetos de pesquisa. A comissão científica avaliará e você
            receberá o resultado por e-mail em até 48h úteis.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-8">
          {/* Status Messages */}
          {status.type !== 'idle' && (
            <div
              className={`mb-6 p-4 rounded-lg flex gap-3 ${
                status.type === 'success'
                  ? 'bg-[rgba(51,217,240,0.1)] border border-[rgba(51,217,240,0.28)]'
                  : status.type === 'error'
                    ? 'bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.28)]'
                    : 'bg-[rgba(79,142,247,0.1)] border border-[rgba(79,142,247,0.28)]'
              }`}
            >
              {status.type === 'success' ? (
                <CheckCircle className="text-[#33d9f0] flex-shrink-0" size={20} />
              ) : status.type === 'error' ? (
                <AlertCircle className="text-[#ef4444] flex-shrink-0" size={20} />
              ) : (
                <div className="animate-spin">
                  <div className="w-5 h-5 border-2 border-[#4f8ef7] border-t-transparent rounded-full" />
                </div>
              )}
              <p
                className={`text-sm ${
                  status.type === 'success'
                    ? 'text-[#33d9f0]'
                    : status.type === 'error'
                      ? 'text-[#ef4444]'
                      : 'text-[#4f8ef7]'
                }`}
              >
                {status.message}
              </p>
            </div>
          )}

          {/* Form Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Título */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-white mb-2">
                Título do Trabalho
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ex: Aplicação de IA em Diagnóstico Médico"
                className="w-full px-4 py-3 bg-[#07090f] border border-[rgba(79,142,247,0.14)] rounded-lg text-white placeholder-[#445577] focus:outline-none focus:border-[#4f8ef7] transition-colors"
              />
            </div>

            {/* Autores */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-white mb-2">
                Autores (separados por vírgula)
              </label>
              <input
                type="text"
                name="authors"
                value={formData.authors}
                onChange={handleInputChange}
                placeholder="Ex: João Silva, Maria Santos"
                className="w-full px-4 py-3 bg-[#07090f] border border-[rgba(79,142,247,0.14)] rounded-lg text-white placeholder-[#445577] focus:outline-none focus:border-[#4f8ef7] transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                E-mail de Contato
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="seu@email.com"
                className="w-full px-4 py-3 bg-[#07090f] border border-[rgba(79,142,247,0.14)] rounded-lg text-white placeholder-[#445577] focus:outline-none focus:border-[#4f8ef7] transition-colors"
              />
            </div>

            {/* Instituição */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Instituição
              </label>
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleInputChange}
                placeholder="Ex: IFMA, UFMA"
                className="w-full px-4 py-3 bg-[#07090f] border border-[rgba(79,142,247,0.14)] rounded-lg text-white placeholder-[#445577] focus:outline-none focus:border-[#4f8ef7] transition-colors"
              />
            </div>

            {/* Área */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-white mb-2">
                Área de Pesquisa
              </label>
              <select
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#07090f] border border-[rgba(79,142,247,0.14)] rounded-lg text-white focus:outline-none focus:border-[#4f8ef7] transition-colors"
              >
                <option value="">Selecione uma área</option>
                {areas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>

            {/* Resumo */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-white mb-2">
                Resumo (máx. 300 caracteres)
              </label>
              <textarea
                name="abstract"
                value={formData.abstract}
                onChange={handleInputChange}
                placeholder="Descreva brevemente o conteúdo do seu trabalho..."
                maxLength={300}
                rows={4}
                className="w-full px-4 py-3 bg-[#07090f] border border-[rgba(79,142,247,0.14)] rounded-lg text-white placeholder-[#445577] focus:outline-none focus:border-[#4f8ef7] transition-colors resize-none"
              />
              <div className="text-xs text-[#8899bb] mt-1">
                {formData.abstract.length}/300 caracteres
              </div>
            </div>

            {/* Upload PDF */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-white mb-2">
                Arquivo PDF (máx. 10MB)
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="pdf-upload"
                />
                <label
                  htmlFor="pdf-upload"
                  className="flex items-center justify-center gap-3 w-full px-4 py-6 border-2 border-dashed border-[rgba(79,142,247,0.28)] rounded-lg cursor-pointer hover:border-[#4f8ef7] transition-colors bg-[rgba(79,142,247,0.05)]"
                >
                  <Upload size={20} className="text-[#4f8ef7]" />
                  <div className="text-center">
                    <p className="text-white font-semibold">
                      {fileName || 'Clique ou arraste um arquivo PDF'}
                    </p>
                    <p className="text-xs text-[#8899bb]">PDF até 10MB</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status.type === 'loading'}
            className="w-full px-6 py-4 bg-gradient-to-r from-[#4f8ef7] to-[#7c55e8] text-white font-bold rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status.type === 'loading' ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Enviando...
              </>
            ) : (
              'Enviar Submissão'
            )}
          </button>
        </form>

        {/* Info Box */}
        <div className="mt-8 p-6 bg-[rgba(79,142,247,0.05)] border border-[rgba(79,142,247,0.14)] rounded-lg">
          <h4 className="text-white font-bold mb-3">Informações Importantes</h4>
          <ul className="space-y-2 text-sm text-[#8899bb]">
            <li>Prazo de submissão: até 05/08/2026</li>
            <li>Resultado: até 48h úteis após submissão</li>
            <li>Formato: PDF com no máximo 10MB</li>
            <li>Você receberá confirmação por e-mail</li>
          </ul>
        </div>
      </div>
      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Autenticacao Necessaria</h2>
            <p className="text-[#8899bb] mb-6">Para submeter seu artigo, voce precisa fazer login ou criar uma conta.</p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowAuthModal(false);
                  navigate('/login');
                }}
                className="flex-1 px-4 py-2 bg-[#4f8ef7] hover:bg-[#3d7ce8] text-white font-semibold rounded-lg transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setShowAuthModal(false);
                  navigate('/registro');
                }}
                className="flex-1 px-4 py-2 bg-[rgba(79,142,247,0.1)] border border-[rgba(79,142,247,0.28)] text-[#4f8ef7] font-semibold rounded-lg hover:bg-[rgba(79,142,247,0.2)] transition-colors"
              >
                Registrar
              </button>
            </div>
            <button
              onClick={() => setShowAuthModal(false)}
              className="w-full mt-3 px-4 py-2 text-[#8899bb] hover:text-white font-semibold rounded-lg transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
