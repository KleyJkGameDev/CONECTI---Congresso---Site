/**
 * COMPONENTE: Breadcrumb
 * 
 * Navegação por breadcrumb para melhorar orientação do usuário
 * Mostra o caminho de navegação atual
 */

import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm mb-6">
      <a href="/" className="text-[#4f8ef7] hover:text-[#33d9f0] transition-colors">
        Início
      </a>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight size={16} className="text-[#445577]" />
          {item.href ? (
            <a href={item.href} className="text-[#4f8ef7] hover:text-[#33d9f0] transition-colors">
              {item.label}
            </a>
          ) : (
            <span className="text-[#8899bb]">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
