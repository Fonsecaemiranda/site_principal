
import React from 'react';
import { Link } from 'react-router-dom';
import FadeIn from './FadeIn';

interface AreaCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    features: string[];
    delay: number;
}

const AreaCard: React.FC<AreaCardProps> = ({ icon, title, description, features, delay }) => (
    <FadeIn direction="up" delay={delay}>
        <div className="group relative bg-white border border-gray-200/60 rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-xl hover:border-[#4A7BFF]/20 transition-all duration-500 h-full">
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#4A7BFF]/0 to-[#4A7BFF]/0 group-hover:from-[#4A7BFF]/5 group-hover:to-transparent transition-all duration-500 pointer-events-none"></div>

            <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-[#4A7BFF]/10 border border-[#4A7BFF]/20 flex items-center justify-center mb-6 group-hover:bg-[#4A7BFF]/20 group-hover:scale-110 transition-all duration-300">
                    {icon}
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 tracking-tight">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-[15px] leading-relaxed mb-6">
                    {description}
                </p>

                {/* Divider */}
                <div className="w-full h-px bg-gray-200 mb-6"></div>

                {/* Features */}
                <ul className="space-y-3">
                    {features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-gray-600 text-sm">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A7BFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </FadeIn>
);

const PracticeAreas: React.FC = () => {
    const areas = [
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4A7BFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            ),
            title: 'Direito Previdenciário',
            description: 'Atuamos na defesa dos seus direitos junto ao INSS, garantindo o acesso a benefícios e aposentadorias com agilidade e segurança jurídica.',
            features: [
                'Aposentadoria rural e urbana',
                'Auxílio-doença e BPC/LOAS',
                'Pensão por morte e invalidez',
                'Salário Maternidade',
            ],
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4A7BFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
            ),
            title: 'Direito Bancário',
            description: 'Protegemos seus direitos contra práticas abusivas de instituições financeiras, como cobranças indevidas e taxas ilegais.',
            features: [
                'Revisão de juros abusivos',
                'Empréstimo consignado indevido',
                'Negativação indevida',
                'Ações contra financeiras',
            ],
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4A7BFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                </svg>
            ),
            title: 'Direito do Consumidor',
            description: 'Defendemos o consumidor contra empresas que desrespeitam o Código de Defesa do Consumidor, buscando reparação justa e eficiente.',
            features: [
                'Cobranças indevidas',
                'Propaganda enganosa',
                'Defeito em produtos ou serviços',
                'Indenização por danos morais',
            ],
        },
    ];

    return (
        <section id="areas" className="relative py-24 md:py-32 px-4 bg-[#f9f5f1]">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <FadeIn direction="up">
                    <div className="text-center mb-16 md:mb-20">
                        <span className="text-[#4A7BFF] text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">
                            Áreas de Atuação
                        </span>
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gray-900 leading-tight mb-5">
                            Expertise Jurídica em <br className="hidden md:block" />
                            <span className="italic text-gray-400">Três Frentes Especializadas</span>
                        </h2>
                        <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                            Cada área conta com profissionais dedicados e conhecimento aprofundado para oferecer a melhor estratégia jurídica ao seu caso.
                        </p>
                    </div>
                </FadeIn>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {areas.map((area, idx) => (
                        <AreaCard key={idx} {...area} delay={idx * 150} />
                    ))}
                </div>

                {/* CTA Bottom */}
                <FadeIn direction="up" delay={500}>
                    <div className="mt-16 text-center">
                        <p className="text-gray-500 text-sm mb-6">
                            Saiba mais sobre como podemos ajudá-lo
                        </p>
                        <Link to="/areas-de-atuacao" className="group bg-[#4A7BFF] text-white px-8 py-4 rounded-xl font-medium text-base hover:bg-[#3A6BEF] transition-all shadow-lg shadow-[#4A7BFF]/20 inline-flex items-center justify-center gap-0 hover:gap-2">
                            <span>Conheça Todas as Áreas</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
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
                        </Link>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default PracticeAreas;
