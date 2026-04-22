/**
 * COMPONENTE: Navbar
 * 
 * Responsável pela navegação principal do site CONECT 2025.
 * Inclui:
 * - Logo com gradiente
 * - Links de navegação (desktop)
 * - Menu hamburger responsivo (mobile)
 * - Shadow ao fazer scroll
 * 
 * INTEGRAÇÃO COM BACKEND:
 * - Futuramente, links podem apontar para rotas de autenticação
 * - O menu pode incluir opções de logout após autenticação
 */

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detectar scroll para adicionar sombra
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar menu ao clicar em um link
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const navLinks = [
    { href: '#sobre', label: 'Sobre' },
    { href: '#cronograma', label: 'Cronograma' },
    { href: '#palestrantes', label: 'Palestrantes' },
    { href: '#submissao', label: 'Submissão' },
    { href: '#local', label: 'Local' },
    { href: '#faq', label: 'FAQ' },
    { href: '/guia', label: 'Guia' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-16 px-6 lg:px-10 flex items-center justify-between transition-all duration-300 ${
        isScrolled
          ? 'bg-black/88 backdrop-blur-lg shadow-lg border-b border-[rgba(79,142,247,0.14)]'
          : 'bg-black/50 backdrop-blur-sm border-b border-[rgba(79,142,247,0.14)]'
      }`}
    >
      {/* Logo */}
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="text-xl lg:text-2xl font-black tracking-tighter cursor-pointer grad-text"
      >
        CONECT!26
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden lg:flex gap-8 list-none">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-sm font-semibold uppercase tracking-wider text-[#8899bb] hover:text-[#4f8ef7] transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Desktop CTA Button */}
      <a
        href="#inscricao"
        className="hidden lg:inline-block px-5 py-2 bg-gradient-to-r from-[#4f8ef7] to-[#7c55e8] text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
      >
        → Inscrever-se
      </a>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-2 text-white hover:text-[#4f8ef7] transition-colors"
        aria-label="Menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-lg border-b border-[rgba(79,142,247,0.14)] lg:hidden">
          <ul className="flex flex-col list-none p-6 gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleLinkClick}
                  className="text-sm font-semibold uppercase tracking-wider text-[#8899bb] hover:text-[#4f8ef7] transition-colors block"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="border-t border-[rgba(79,142,247,0.14)] pt-4 mt-4">
              <a
                href="#inscricao"
                onClick={handleLinkClick}
                className="text-sm font-bold text-[#4f8ef7] hover:text-[#33d9f0] transition-colors"
              >
                → Inscrever-se agora
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
