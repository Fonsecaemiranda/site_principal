
import React from 'react';
import FadeIn from './FadeIn';

const Footer: React.FC = () => {

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If not on homepage, navigate then scroll
      window.location.href = `/#${id}`;
    }
  };

  return (
    <footer className="bg-[#0d1023] text-[#F9F5F1] py-20 px-4 md:px-12 rounded-t-[3rem] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">

          {/* Brand */}
          <FadeIn direction="up" delay={0}>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <img src="/logos/LOGO F&M ADV  - ORIGINAL.webp" alt="Fonseca & Miranda" className="w-12 h-12 object-contain" />
                <div className="flex flex-col items-start leading-none">
                  <span className="font-['Montserrat'] font-normal text-xl text-white tracking-widest mb-1">
                    Fonseca & Miranda
                  </span>
                  <div className="font-['Montserrat'] font-bold text-xs tracking-wide uppercase">
                    <span className="text-white">Advocacia </span>
                    <span className="text-[#F5A623]">Previdenciária</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Defendemos seus direitos com dedicação, transparência e expertise jurídica.
              </p>
            </div>
          </FadeIn>

          {/* Links Rápidos */}
          <FadeIn direction="up" delay={100}>
            <div>
              <h4 className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-6">Links Rápidos</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li>
                  <button onClick={() => scrollTo('sobre')} className="hover:text-white transition-colors text-[#F9F5F1]/70">
                    Sobre o Escritório
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('areas')} className="hover:text-white transition-colors text-[#F9F5F1]/70">
                    Áreas de Atuação
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('equipe')} className="hover:text-white transition-colors text-[#F9F5F1]/70">
                    Nossa Equipe
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('unidades')} className="hover:text-white transition-colors text-[#F9F5F1]/70">
                    Unidades
                  </button>
                </li>
              </ul>
            </div>
          </FadeIn>

          {/* Áreas de Atuação */}
          <FadeIn direction="up" delay={200}>
            <div>
              <h4 className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-6">Áreas de Atuação</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li>
                  <a href="/advogado-previdenciario-manaus" className="hover:text-white transition-colors text-[#F9F5F1]/70">
                    Direito Previdenciário
                  </a>
                </li>
                <li>
                  <a href="/advogado-bancario-manaus" className="hover:text-white transition-colors text-[#F9F5F1]/70">
                    Direito Bancário
                  </a>
                </li>
                <li>
                  <a href="/advogado-consumidor-manaus" className="hover:text-white transition-colors text-[#F9F5F1]/70">
                    Direito do Consumidor
                  </a>
                </li>
              </ul>
            </div>
          </FadeIn>

          {/* Contato */}
          <FadeIn direction="up" delay={300}>
            <div>
              <h4 className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-6">Contato</h4>
              <ul className="space-y-5 text-sm">
                <li className="flex items-center gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <a href="tel:+5592982926890" className="text-[#F9F5F1]/70 hover:text-white transition-colors">
                    (92) 98292-6890
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <a href="mailto:aposentar@ruralprev.com" className="text-[#F9F5F1]/70 hover:text-white transition-colors">
                    aposentar@ruralprev.com
                  </a>
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>

        {/* Footer Bottom */}
        <FadeIn direction="up" delay={400}>
          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-white text-sm">
              © 2026 Fonseca & Miranda. Todos os direitos reservados. OAB/AM 16.065.
            </div>
            <p className="text-gray-300 text-sm">
              Desenvolvido por{' '}
              <a
                href="https://www.kvgroupbr.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-200 transition-colors duration-300 font-semibold"
              >
                KV <span className="text-yellow-400 font-bold">Group</span>
              </a>
            </p>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
};

export default Footer;
