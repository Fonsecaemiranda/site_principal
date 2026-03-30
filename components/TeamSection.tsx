
import React from 'react';
import FadeIn from './FadeIn';

interface TeamMemberProps {
    name: string;
    role: string;
    description: string;
    image: string;
    imagePosition?: string;
    linkedin?: string;
    email?: string;
    delay: number;
}

const TeamMemberCard: React.FC<TeamMemberProps> = ({ name, role, description, image, imagePosition = 'center 15%', linkedin, email, delay }) => (
    <FadeIn direction="up" delay={delay}>
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 h-full flex flex-col">
            {/* Photo */}
            <div className="relative overflow-hidden h-[420px] bg-gray-100">
                <img
                    src={image}
                    alt={name}
                    style={{ objectPosition: imagePosition }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Info */}
            <div className="p-6 md:p-8 flex flex-col flex-1">
                <h3 className="text-xl font-semibold text-gray-900 tracking-tight">{name}</h3>
                <p className="text-[#4A7BFF] text-sm font-medium mt-1 mb-4">{role}</p>
                <p className="text-gray-500 text-[14px] leading-relaxed flex-1">{description}</p>

            </div>
        </div>
    </FadeIn>
);

const TeamSection: React.FC = () => {
    const members: Omit<TeamMemberProps, 'delay'>[] = [
        {
            name: 'Dr. Angelylson Fonseca',
            role: 'Fundador e Sócio-Diretor',
            description: 'Advogado com vasta experiência em Direito Previdenciário e Bancário. Fundou o escritório Fonseca & Miranda com o objetivo de oferecer representação jurídica de excelência e atendimento humanizado.',
            image: '/fotos/Dr Angelysson.webp',
            linkedin: '#',
            email: 'contato@fonsecaemiranda.com.br',
        },
        {
            name: 'Bruna Victoria Alves Vasconcelos',
            role: 'Assistente Jurídico',
            description: 'Atua na área técnica administrativa e judicial, com foco no atendimento ao cliente, triagem de casos, redação de documentos, expedição de ofícios e apoio nas demandas do escritório.',
            image: '/fotos/Bruna Victoria.webp',
            imagePosition: 'center 10%',
            linkedin: '#',
            email: 'contato@fonsecaemiranda.com.br',
        },
        {
            name: 'Kaio Gabriel Soares Vieira',
            role: 'Estagiário',
            description: 'Atua na área técnica administrativa e judicial, com foco em atendimento ao cliente, abertura de processos, redação de documentos, gestão de agenda, captação de clientes e utilização de sistemas jurídicos.',
            image: '/fotos/Kaio.webp',
            imagePosition: 'center 10%',
            linkedin: '#',
            email: 'contato@fonsecaemiranda.com.br',
        },
    ];

    return (
        <section id="equipe" className="relative py-24 md:py-32 px-4 bg-[#f9f5f1]">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <FadeIn direction="up">
                    <div className="text-center mb-16 md:mb-20">
                        <span className="text-[#4A7BFF] text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">
                            Nosso Time
                        </span>
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gray-900 leading-tight mb-5">
                            Nossa Equipe
                        </h2>
                        <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                            Conheça os profissionais que fazem do Fonseca & Miranda um escritório de excelência. Nossa equipe conta com especialistas em diversas áreas do Direito.
                        </p>
                    </div>
                </FadeIn>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {members.map((member, idx) => (
                        <TeamMemberCard key={idx} {...member} delay={idx * 150} />
                    ))}
                </div>


            </div>
        </section>
    );
};

export default TeamSection;
