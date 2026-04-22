/**
 * COMPONENTE: Toast
 * 
 * Notificação temporária que aparece no canto inferior direito
 * Desaparece automaticamente após 4 segundos
 */

import { useEffect } from 'react';

interface ToastProps {
  type: 'success' | 'error';
  title: string;
  message: string;
  onClose: () => void;
}

export function Toast({ type, title, message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4200);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-900' : 'bg-red-900';
  const borderColor = type === 'success' ? 'border-green-700' : 'border-red-700';
  const icon = type === 'success' ? '✅' : '❌';

  return (
    <div
      className={`fixed bottom-6 right-6 p-4 rounded-lg border ${bgColor} ${borderColor} text-white shadow-lg animate-fade-in z-50`}
    >
      <div className="flex gap-3">
        <span className="text-xl">{icon}</span>
        <div>
          <strong>{title}</strong>
          <p className="text-sm opacity-90">{message}</p>
        </div>
      </div>
    </div>
  );
}
