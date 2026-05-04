import { useLocation } from "wouter";
import { AlertCircle, Home } from "lucide-react";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#07090f]">
      <div className="w-full max-w-lg mx-4 p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-[rgba(239,68,68,0.2)] rounded-full animate-pulse" />
            <AlertCircle className="relative h-16 w-16 text-[#ef4444]" />
          </div>
        </div>

        <h1 className="text-6xl font-black text-white mb-2">404</h1>

        <h2 className="text-2xl font-bold text-[#e4e8f5] mb-4">
          Página Não Encontrada
        </h2>

        <p className="text-[#8899bb] mb-8 leading-relaxed">
          Desculpe, a página que você está procurando não existe.
          <br />
          Ela pode ter sido movida ou deletada.
        </p>

        <button
          onClick={handleGoHome}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4f8ef7] to-[#7c55e8] text-white font-bold rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Home className="w-5 h-5" />
          Voltar à Home
        </button>
      </div>
    </div>
  );
}
