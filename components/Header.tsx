
import React, { useState } from 'react';
import { useWhatsAppModal } from '../contexts/WhatsAppModalContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { open: openWhatsApp } = useWhatsAppModal();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50">
      <div className="bg-[#0d1023] backdrop-blur-md rounded-full px-4 md:px-6 py-3 flex items-center justify-between shadow-sm border border-white/10">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <img
            src="/logos/LOGO F&M ADV  - ORIGINAL.webp"
            alt="Fonseca & Miranda"
            className="w-10 h-10 object-contain"
          />
          <div className="flex flex-col items-start leading-none">
            <span className="font-['Montserrat'] font-normal text-lg md:text-xl text-white tracking-widest mb-1">
              Fonseca & Miranda
            </span>
            <div className="font-['Montserrat'] font-bold text-[10px] md:text-xs tracking-wide uppercase">
              <span className="text-white">Advocacia </span>
              <span className="text-[#F5A623]">Previdenciária</span>
            </div>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white">
          <a href="/#sobre" className="hover:opacity-60 transition-opacity">Sobre</a>
          <a href="/#areas" className="hover:opacity-60 transition-opacity">Áreas de Atuação</a>
          <a href="/#equipe" className="hover:opacity-60 transition-opacity">Equipe</a>
          <a href="/#unidades" className="hover:opacity-60 transition-opacity">Unidades</a>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <button onClick={openWhatsApp} className="bg-[#0076de] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#0062b8] transition-colors">
            Fale Conosco
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden bg-[#0076de] p-2 rounded-full text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isMenuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-[#0d1023] rounded-3xl p-6 shadow-xl md:hidden flex flex-col gap-4 text-center text-white border border-white/10">
          <a href="/#sobre" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium py-2 border-b border-gray-100">Sobre</a>
          <a href="/#areas" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium py-2 border-b border-gray-100">Áreas de Atuação</a>
          <a href="/#equipe" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium py-2 border-b border-gray-100">Equipe</a>
          <a href="/#unidades" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium py-2 border-b border-gray-100">Unidades</a>
          <button onClick={() => { setIsMenuOpen(false); openWhatsApp(); }} className="bg-[#0076de] text-white px-6 py-3 rounded-full text-base font-medium mt-4 w-full">
            Fale Conosco
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;
