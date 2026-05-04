/**
 * PÁGINA: Registro
 * 
 * Página de criação de conta com:
 * - Formulário de registro
 * - Validação de dados
 * - Link para login
 * - Redirecionamento após registro bem-sucedido
 */

import { useState } from 'react';
import { useLocation } from 'wouter';
import { AlertCircle, Loader2, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useAuth } from "@/contexts/AuthContext";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Register() {
  const [, navigate] = useLocation();
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validações
    if (!formData.firstName.trim()) {
      setError('Nome é obrigatório');
      return;
    }

    if (!formData.lastName.trim()) {
      setError('Sobrenome é obrigatório');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas nao conferem');
      return;
    }

    try {
      await register(formData.email, formData.password, formData.firstName, formData.lastName);
      setSuccess(true);
      setTimeout(() => navigate('/perfil'), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar conta');
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#07090f] text-white flex items-center justify-center">
        <Navbar />
        <div className="text-center p-6">
          <div className="inline-block mb-6 p-4 bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.28)] rounded-full">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-3xl font-black mb-2">Conta Criada com Sucesso!</h1>
          <p className="text-[#8899bb] mb-4">Redirecionando para seu perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090f] text-white">
      <Navbar />

      <section className="py-20 md:py-32 bg-[#07090f]">
        <div className="container max-w-md mx-auto px-6">
          <div className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-8">
            <h1 className="text-3xl font-black mb-2 text-center">Criar Conta</h1>
            <p className="text-[#8899bb] text-center mb-8">Registre-se no CONECT!26</p>

            {error && (
              <div className="mb-6 p-4 bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.28)] rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#ef4444] flex-shrink-0 mt-0.5" />
                <p className="text-[#ef4444] text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#8899bb] mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0c1018] border border-[rgba(79,142,247,0.14)] rounded-lg text-white placeholder-[#445577] focus:border-[#4f8ef7] focus:outline-none transition-colors"
                    placeholder="João"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#8899bb] mb-2">
                    Sobrenome
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0c1018] border border-[rgba(79,142,247,0.14)] rounded-lg text-white placeholder-[#445577] focus:border-[#4f8ef7] focus:outline-none transition-colors"
                    placeholder="Silva"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#8899bb] mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0c1018] border border-[rgba(79,142,247,0.14)] rounded-lg text-white placeholder-[#445577] focus:border-[#4f8ef7] focus:outline-none transition-colors"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#8899bb] mb-2">
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0c1018] border border-[rgba(79,142,247,0.14)] rounded-lg text-white placeholder-[#445577] focus:border-[#4f8ef7] focus:outline-none transition-colors pr-10"
                    placeholder="Minimo 6 caracteres"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-[#8899bb] hover:text-[#4f8ef7] transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#8899bb] mb-2">
                  Confirmar Senha
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0c1018] border border-[rgba(79,142,247,0.14)] rounded-lg text-white placeholder-[#445577] focus:border-[#4f8ef7] focus:outline-none transition-colors pr-10"
                    placeholder="Confirme sua senha"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-[#8899bb] hover:text-[#4f8ef7] transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#4f8ef7] to-[#7c55e8] text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Criando conta...
                  </>
                ) : (
                  'Criar Conta'
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-[rgba(79,142,247,0.14)]">
              <p className="text-[#8899bb] text-center text-sm">
                Ja tem conta?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="text-[#4f8ef7] hover:text-[#33d9f0] font-semibold transition-colors"
                >
                  Fazer login
                </button>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
