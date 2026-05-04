/**
 * COMPONENTE: Modal
 * 
 * Modal de confirmação que aparece após sucesso em inscrição ou submissão
 * Bloqueia interação com o resto da página
 */

interface ModalProps {
  icon: string;
  title: string;
  message: string;
  onClose: () => void;
}

export function Modal({ icon, title, message, onClose }: ModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#131a2a] border border-[rgba(79,142,247,0.14)] rounded-lg p-8 max-w-md text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-6xl mb-4">{icon}</div>
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-[#8899bb] mb-6">{message}</p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-gradient-to-r from-[#4f8ef7] to-[#7c55e8] text-white font-bold rounded-lg hover:opacity-90 transition-all"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
