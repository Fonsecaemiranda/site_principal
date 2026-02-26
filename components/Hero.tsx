
import React, { useState, useEffect } from 'react';
import { SeloRotativo } from './SeloRotativo';
import { useWhatsAppModal } from '../contexts/WhatsAppModalContext';

const Hero: React.FC = () => {
  const { open: openWhatsApp } = useWhatsAppModal();
  const bgImages = [
    '/fotos/plano-de-fundo.webp',
    '/fotos/Direito-bancario.webp'
  ];

  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden">
      {/* Background Images with Crossfade */}
      {bgImages.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentBg ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url('${img}')` }}
        />
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 bg-[#0A1628]/80 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent z-0"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl px-4 md:px-8 grid md:grid-cols-12 gap-8 items-center h-full">
        <div className="md:col-span-8 flex flex-col gap-8 relative z-20">
          <div className="animate-[fadeInLeft_0.8s_ease-out_forwards]">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
              ESPECIALISTAS EM DIREITO PREVIDENCIÁRIO E <span className="italic text-gray-300">BANCÁRIO</span>
            </h1>
            <p className="mt-6 text-gray-300 text-sm md:text-base leading-relaxed max-w-xl">
              Defendemos seus direitos contra bancos e garantimos sua aposentadoria rural ou benefício previdenciário com agilidade e segurança.
            </p>
            <div className="mt-8">
              <button onClick={openWhatsApp} className="group w-full md:w-auto bg-[#1a56db] text-white px-8 py-4 rounded-md font-medium text-lg hover:bg-[#1447c0] transition-all shadow-lg shadow-[#1a56db]/25 flex items-center justify-center gap-0 hover:gap-2">
                <span>Agende uma Consulta Gratuita</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-300"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="md:col-span-4 hidden md:flex justify-center items-center relative z-20">
          <SeloRotativo />
        </div>
      </div>
    </section>
  );
};

export default Hero;
