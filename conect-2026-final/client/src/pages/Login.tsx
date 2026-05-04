/**
 * PÁGINA: Login
 * 
 * Página de autenticação com:
 * - Formulário de login
 * - Link para registro
 * - Validação de credenciais
 * - Redirecionamento após login bem-sucedido
 */

import { useState } from 'react';
import { useLocation } from 'wouter';
import { AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Login() {
  const [, navigate] = useLocation();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      navigate('/perfil');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    }
  };

  return (
    <div className="min-h-screen bg-[#07090f] text-white">
      <Navbar />

      <section className="py-20 md:py-32 bg-[#07090f]">
        <div className="container max-w-md mx-auto px-6">
          <div className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-8">
            <h1 className="text-3xl font-black mb-2 text-center">Fazer Login</h1>
            <p className="text-[#8899bb] text-center mb-8">Acesse sua conta do CONECT!26</p>

            {error && (
              <div className="mb-6 p-4 bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.28)] rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#ef4444] flex-shrink-0 mt-0.5" />
                <p className="text-[#ef4444] text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#8899bb] mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0c1018] border border-[rgba(79,142,247,0.14)] rounded-lg text-white placeholder-[#445577] focus:border-[#4f8ef7] focus:outline-none transition-colors pr-10"
                    placeholder="Sua senha"
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#4f8ef7] to-[#7c55e8] text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-[rgba(79,142,247,0.14)]">
              <p className="text-[#8899bb] text-center text-sm">
                Nao tem conta?{' '}
                <button
                  onClick={() => navigate('/registro')}
                  className="text-[#4f8ef7] hover:text-[#33d9f0] font-semibold transition-colors"
                >
                  Criar conta
                </button>
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-[rgba(79,142,247,0.05)] border border-[rgba(79,142,247,0.14)] rounded-lg">
            <p className="text-[#8899bb] text-sm">
              Dados de teste: email: <strong>teste@conect.com</strong> | senha: <strong>123456</strong>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
