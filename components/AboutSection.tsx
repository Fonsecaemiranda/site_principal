
import React from 'react';
import FadeIn from './FadeIn';

const AboutSection: React.FC = () => {
  return (
    <section id="sobre" className="relative pt-40 pb-24 md:pb-32 px-4 bg-[#15253f] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#4A7BFF]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#4A7BFF]/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <FadeIn direction="up">
          <div className="text-center mb-16">
            <span className="text-[#4A7BFF] text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">
              Sobre o Escritório
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
              Tradição e Excelência <br className="hidden md:block" />
              <span className="italic text-gray-400">em Defesa dos Seus Direitos</span>
            </h2>
          </div>
        </FadeIn>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image */}
          <FadeIn direction="left">
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
              <img
                src="/fotos/Dr Angelysson.webp"
                alt="Dr. Angelylson Fonseca"
                className="w-full h-[500px] md:h-[620px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </FadeIn>

          {/* Text Content */}
          <FadeIn direction="right" delay={200}>
            <div className="space-y-6">
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                Fundado pelo <strong className="text-white">Dr. Angelylson Fonseca</strong>, o escritório Fonseca & Miranda nasceu do compromisso de oferecer representação jurídica de excelência para quem mais precisa. Desde sua fundação, o escritório se consolidou como referência nas áreas de <strong className="text-white">Direito Previdenciário, Bancário e do Consumidor</strong> no Amazonas.
              </p>

              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                Com uma equipe altamente qualificada e anos de experiência acumulada, já auxiliamos centenas de clientes na conquista de seus direitos — seja na obtenção de benefícios previdenciários, na defesa contra abusos bancários ou na proteção nas relações de consumo.
              </p>

              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                Nossa missão é tratar cada caso com a atenção e dedicação que merece, oferecendo atendimento humanizado, transparente e orientado por resultados. Acreditamos que o acesso à justiça é um direito de todos.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                <div>
                  <p className="text-3xl md:text-4xl font-bold text-[#4A7BFF]">1000+</p>
                  <p className="text-gray-400 text-sm mt-1">Clientes atendidos</p>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-bold text-[#4A7BFF]">5+</p>
                  <p className="text-gray-400 text-sm mt-1">Anos de experiência</p>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-bold text-[#4A7BFF]">95%</p>
                  <p className="text-gray-400 text-sm mt-1">Taxa de sucesso</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
