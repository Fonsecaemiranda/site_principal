
import React from 'react';
import FadeIn from './FadeIn';

interface Office {
    city: string;
    address: string;
    cep: string;
    mapQuery: string;
    mapsUrl?: string;
}

const offices: Office[] = [
    {
        city: 'Maués',
        address: 'Rua Padre Demétrios, 662, Ramalho Júnior, Maués - AM',
        cep: '69.190-000',
        mapQuery: '-3.3862374,-57.719635',
        mapsUrl: 'https://www.google.com/maps/place/3%C2%B023\'10.5%22S+57%C2%B043\'10.7%22W/@-3.3862374,-57.7222099,17z',
    },
    {
        city: 'Nova Olinda do Norte',
        address: 'Avenida 13 de Maio, SN, Centro, Nova Olinda do Norte - AM',
        cep: '69.230-000',
        mapQuery: 'Fonseca+e+Miranda+Advocacia+Previdenciaria+Nova+Olinda+Norte+AM',
        mapsUrl: 'https://www.google.com/maps/place/FONSECA+E+MIRANDA+ADVOCACIA+PREVIDENCI%C3%81RIA/@-3.888762,-59.0909127,19.5z/data=!4m12!1m5!3m4!2zM8KwNTMnMTkuMCJTIDU5wrAwNScyNi44Ilc!8m2!3d-3.8885992!4d-59.0907707!3m5!1s0x926853bafa103bc7:0x892a3d79eb4cdd09!8m2!3d-3.8884642!4d-59.0907413!16s%2Fg%2F11xmflph63?hl=pt-BR&entry=ttu&g_ep=EgoyMDI2MDIyMi4wIKXMDSoASAFQAw%3D%3D',
    },
    {
        city: 'Careiro',
        address: 'Rua Beira Rio, SN, Distrito do Araçá, Careiro - AM',
        cep: '69.250-000',
        mapQuery: 'Distrito+do+Araçá,Careiro,AM',
    },
];

const LocationsSection: React.FC = () => {
    return (
        <section id="unidades" className="py-24 md:py-32 px-4 bg-[#f9f5f1]">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <FadeIn direction="up">
                    <div className="text-center mb-16">
                        <span className="text-[#4A7BFF] text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">
                            Nossos Escritórios
                        </span>
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gray-900 leading-tight">
                            Onde Estamos
                        </h2>
                        <p className="text-gray-500 text-base md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
                            Possuímos unidades estratégicas no interior do Amazonas para atender você de perto.
                        </p>
                    </div>
                </FadeIn>

                {/* Office Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {offices.map((office, idx) => (
                        <FadeIn key={office.city} direction="up" delay={idx * 150}>
                            <div className="bg-[#15253f] rounded-2xl overflow-hidden border border-white/5 hover:border-[#4A7BFF]/30 transition-all duration-500 group h-full flex flex-col">
                                {/* Map */}
                                <div className="h-[220px] w-full relative overflow-hidden">
                                    <iframe
                                        title={`Mapa ${office.city}`}
                                        src={`https://www.google.com/maps?q=${office.mapQuery}&output=embed&z=15`}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className=""
                                    />
                                </div>

                                {/* Info */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-[#4A7BFF]/10 flex items-center justify-center flex-shrink-0">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4A7BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                                <circle cx="12" cy="10" r="3" />
                                            </svg>
                                        </div>
                                        <h3 className="text-white text-xl font-semibold tracking-tight">
                                            {office.city}
                                        </h3>
                                    </div>

                                    <p className="text-gray-400 text-sm leading-relaxed flex-1">
                                        {office.address}
                                    </p>
                                    <span className="text-gray-500 text-xs mt-2 block">
                                        CEP: {office.cep}
                                    </span>

                                    {/* Google Maps Link */}
                                    <a
                                        href={office.mapsUrl ?? `https://www.google.com/maps/search/?api=1&query=${office.mapQuery}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Ver unidade de ${office.city} no Google Maps`}
                                        className="mt-5 inline-flex items-center gap-2 text-[#4A7BFF] text-sm font-medium hover:text-[#6b9aff] transition-colors group/link"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                            <polyline points="15 3 21 3 21 9" />
                                            <line x1="10" y1="14" x2="21" y2="3" />
                                        </svg>
                                        Ver no Google Maps
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover/link:translate-x-1 transition-transform duration-300">
                                            <path d="M5 12h14" />
                                            <path d="m12 5 7 7-7 7" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LocationsSection;
