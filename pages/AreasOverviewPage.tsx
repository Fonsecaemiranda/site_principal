
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import { useWhatsAppModal } from '../contexts/WhatsAppModalContext';

const areas = [
    {
        slug: '/advogado-previdenciario-manaus',
        title: 'Direito Previdenciário',
        subtitle: 'INSS · Aposentadorias · Benefícios',
        description: 'Garantimos seus direitos junto ao INSS. Atuamos em aposentadorias rurais e urbanas, auxílio-doença, BPC/LOAS, pensão por morte e revisão de benefícios negados ou calculados incorretamente.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
        highlights: [
            'Aposentadoria Rural e Urbana',
            'Auxílio-Doença e Invalidez',
            'BPC/LOAS',
            'Pensão por Morte',
            'Revisão de Benefícios',
            'Aposentadoria por Tempo de Contribuição',
        ],
        color: '#111',
        bgLight: '#F3F4F6',
    },
    {
        slug: '/advogado-bancario-manaus',
        title: 'Direito Bancário',
        subtitle: 'Bancos · Financeiras · Crédito',
        description: 'Combatemos práticas abusivas de bancos e instituições financeiras. Atuamos em revisão de juros, empréstimos consignados indevidos, negativação injusta e fraudes bancárias.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
            </svg>
        ),
        highlights: [
            'Revisão de Juros Abusivos',
            'Empréstimo Consignado Indevido',
            'Negativação Indevida SPC/Serasa',
            'Fraudes Bancárias',
            'Ações contra Financeiras',
            'Cartão de Crédito Clonado',
        ],
        color: '#111',
        bgLight: '#F3F4F6',
    },
    {
        slug: '/advogado-consumidor-manaus',
        title: 'Direito do Consumidor',
        subtitle: 'Concessionárias · Operadoras · Empresas',
        description: 'Defendemos consumidores contra empresas que desrespeitam seus direitos. Atuamos contra Amazonas Energia, Águas de Manaus, operadoras de telecomunicações e cobranças abusivas.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                <path d="m9 12 2 2 4-4" />
            </svg>
        ),
        highlights: [
            'Conta de Luz Abusiva',
            'Problemas com Água e Esgoto',
            'Internet Lenta e Operadoras',
            'Nome Sujo Indevido (SPC/Serasa)',
            'Indenização por Danos Morais',
            'Falhas em Serviços Essenciais',
        ],
        color: '#111',
        bgLight: '#F3F4F6',
    },
];

const AreasOverviewPage: React.FC = () => {
    const { open: openWhatsApp } = useWhatsAppModal();

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Áreas de Atuação | Advogado em Manaus | Fonseca & Miranda';
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', 'Conheça as áreas de atuação do escritório Fonseca & Miranda em Manaus: Direito Previdenciário, Bancário e do Consumidor. Consulta gratuita no Amazonas.');
        }
    }, []);

    return (
        <div className="min-h-screen selection:bg-[#f5a623] selection:text-white">
            <Header />

            {/* Hero */}
            <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-[#0d1023] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0d1023] via-[#111633] to-[#0d1023]"></div>
                {/* Decorative elements */}
                <div className="absolute top-20 right-10 w-72 h-72 bg-[#4A7BFF]/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#F5A623]/5 rounded-full blur-3xl"></div>

                <div className="max-w-5xl mx-auto px-4 relative z-10">
                    <FadeIn direction="up">
                        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H5" />
                                <path d="m12 19-7-7 7-7" />
                            </svg>
                            Voltar à Página Inicial
                        </Link>
                    </FadeIn>
                    <FadeIn direction="up" delay={100}>
                        <span className="text-[#4A7BFF] text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">
                            Áreas de Atuação
                        </span>
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
                            Como Podemos <br className="hidden md:block" />
                            <span className="italic text-gray-300">Ajudá-lo?</span>
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed">
                            Nosso escritório é referência em Manaus e no interior do Amazonas nas áreas de Direito Previdenciário, Bancário e do Consumidor. Escolha abaixo a área que mais se relaciona com o seu caso.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Areas Cards */}
            <section className="py-16 md:py-24 px-4 bg-[#f9f5f1]">
                <div className="max-w-6xl mx-auto space-y-8">
                    {areas.map((area, idx) => (
                        <FadeIn key={idx} direction="up" delay={idx * 150}>
                            <Link
                                to={area.slug}
                                className="group block bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-500 overflow-hidden"
                            >
                                <div className="flex flex-col lg:flex-row">
                                    {/* Left: Info */}
                                    <div className="flex-1 p-8 md:p-10 lg:p-12">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div
                                                className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                                                style={{ backgroundColor: area.bgLight, color: area.color }}
                                            >
                                                {area.icon}
                                            </div>
                                            <div>
                                                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight">
                                                    {area.title}
                                                </h2>
                                                <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                                                    {area.subtitle}
                                                </span>
                                            </div>
                                        </div>

                                        <p className="text-gray-500 text-[15px] leading-relaxed mb-8 max-w-xl">
                                            {area.description}
                                        </p>

                                        {/* Highlights Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {area.highlights.map((item, i) => (
                                                <div key={i} className="flex items-center gap-2.5 text-gray-600 text-sm">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={area.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                                                        <polyline points="20 6 9 17 4 12" />
                                                    </svg>
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right: CTA */}
                                    <div className="lg:w-64 p-8 lg:p-0 lg:flex lg:items-center lg:justify-center border-t lg:border-t-0 lg:border-l border-gray-100 bg-gray-50/50 group-hover:bg-gray-50 transition-colors">
                                        <div className="text-center">
                                            <div
                                                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110"
                                                style={{ backgroundColor: area.bgLight }}
                                            >
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={area.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300">
                                                    <path d="M5 12h14" />
                                                    <path d="m12 5 7 7-7 7" />
                                                </svg>
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">Saiba Mais</span>
                                            <p className="text-xs text-gray-400 mt-1">Ver detalhes</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </FadeIn>
                    ))}
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 md:py-20 px-4 bg-white">
                <div className="max-w-5xl mx-auto">
                    <FadeIn direction="up">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div>
                                <div className="text-3xl md:text-4xl font-bold text-[#4A7BFF] mb-2">500+</div>
                                <div className="text-sm text-gray-500">Clientes Atendidos</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-bold text-[#4A7BFF] mb-2">95%</div>
                                <div className="text-sm text-gray-500">Taxa de Sucesso</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-bold text-[#4A7BFF] mb-2">4</div>
                                <div className="text-sm text-gray-500">Unidades no Amazonas</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-bold text-[#4A7BFF] mb-2">3</div>
                                <div className="text-sm text-gray-500">Áreas Especializadas</div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-20 md:py-28 px-4 bg-[#f9f5f1]">
                <div className="max-w-3xl mx-auto text-center">
                    <FadeIn direction="up">
                        <h2 className="font-serif text-3xl md:text-4xl text-gray-900 leading-tight mb-6">
                            Não sabe qual área se encaixa no seu caso?
                        </h2>
                        <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10">
                            Fale conosco pelo WhatsApp e nossa equipe fará uma análise gratuita e personalizada da sua situação.
                        </p>
                        <button
                            onClick={openWhatsApp}
                            className="group inline-flex items-center gap-3 bg-green-500 text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:bg-green-600 transition-all shadow-xl shadow-green-500/25 hover:shadow-green-500/40"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Fale com um Especialista
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300">
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </button>
                    </FadeIn>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AreasOverviewPage;
