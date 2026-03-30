
import React, { useEffect, useState } from 'react';
import { useWhatsAppModal } from '../contexts/WhatsAppModalContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

/* ─── Componentes auxiliares ─── */

const faqItems = [
    {
        q: "Mulher desempregada tem direito ao salário-maternidade?",
        a: "Sim, desde que ainda esteja dentro do período de graça do INSS (geralmente 12 meses após o último emprego). Em alguns casos, o prazo pode ser estendido para até 36 meses."
    },
    {
        q: "A trabalhadora rural precisa pagar contribuição para ter direito?",
        a: "Não. A trabalhadora rural em regime de economia familiar (segurada especial) não precisa contribuir mensalmente para o INSS. Basta comprovar que trabalha na agricultura por pelo menos 10 meses."
    },
    {
        q: "Posso receber o salário-maternidade se adotei uma criança maior?",
        a: "Sim. O benefício é concedido para adoção de crianças de qualquer idade, pelo período de 120 dias, sem distinção."
    },
    {
        q: "O que acontece se o INSS calcular o valor errado?",
        a: "Você pode contestar e receber a diferença retroativamente. Em muitos casos, o INSS paga valores inferiores ao que a segurada tem direito, especialmente para autônomas e MEI."
    },
    {
        q: "Quanto tempo leva o processo na Justiça?",
        a: "Depende da comarca, mas ações de salário-maternidade costumam ser resolvidas em 6 a 18 meses. Em muitos casos, conseguimos uma tutela antecipada e o benefício começa a ser pago antes do fim do processo."
    },
];

const FaqAccordion: React.FC = () => {
    const [openIdx, setOpenIdx] = useState<number | null>(null);
    return (
        <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
            {faqItems.map((item, i) => {
                const isOpen = openIdx === i;
                return (
                    <div key={i}>
                        <button
                            onClick={() => setOpenIdx(isOpen ? null : i)}
                            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
                            aria-expanded={isOpen}
                            aria-label={item.q}
                        >
                            <span className="font-semibold text-gray-800 text-sm leading-snug pr-2">{item.q}</span>
                            <span
                                className="flex-shrink-0 w-7 h-7 rounded-full bg-[#4A7BFF]/10 text-[#4A7BFF] flex items-center justify-center"
                                style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </span>
                        </button>
                        <div style={{
                            maxHeight: isOpen ? '300px' : '0',
                            overflow: 'hidden',
                            transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}>
                            <p className="px-5 pb-5 pt-3 text-gray-500 text-sm leading-relaxed border-t border-gray-100">
                                {item.a}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};


const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="inline-block bg-[#4A7BFF]/10 text-[#4A7BFF] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
        {children}
    </span>
);

const CalloutBox: React.FC<{ icon: string; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-[#f0f6ff] border-l-4 border-[#4A7BFF] rounded-xl p-5 my-6">
        <div className="flex items-start gap-3">
            <span className="text-2xl">{icon}</span>
            <div>
                <p className="font-bold text-gray-800 mb-1">{title}</p>
                <div className="text-gray-600 text-sm leading-relaxed">{children}</div>
            </div>
        </div>
    </div>
);

const CheckItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
        <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
        </span>
        <span className="text-gray-700 text-sm leading-relaxed">{children}</span>
    </li>
);

const XItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-start gap-3 py-3 border-b border-red-50 last:border-0">
        <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
            <svg className="w-3 h-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </span>
        <span className="text-gray-700 text-sm leading-relaxed">{children}</span>
    </li>
);

const ArticleImage: React.FC<{ src: string; alt: string; caption: string }> = ({ src, alt, caption }) => (
    <figure className="my-8 rounded-2xl overflow-hidden shadow-md">
        <img src={src} alt={alt} className="w-full h-44 sm:h-56 md:h-72 object-cover" loading="lazy" />
        <figcaption className="bg-gray-50 px-4 py-2 text-xs text-gray-500 italic border-t border-gray-100">
            📷 {caption}
        </figcaption>
    </figure>
);

const StatCard: React.FC<{ value: string; label: string; color: string; icon: string }> = ({ value, label, color, icon }) => (
    <div className={`${color} rounded-xl p-4 flex items-center gap-4 sm:flex-col sm:items-center sm:text-center sm:p-5`}>
        <span className="text-2xl flex-shrink-0">{icon}</span>
        <div className="flex-1 sm:flex-none">
            <p className="text-xl sm:text-2xl font-black text-gray-900 leading-none">{value}</p>
            <p className="text-xs text-gray-500 mt-1 leading-tight">{label}</p>
        </div>
    </div>
);

/* ─── Página principal ─── */

const SalarioMaternidadePage: React.FC = () => {
    const { open: openWhatsApp } = useWhatsAppModal();

    useEffect(() => {
        document.title = 'Salário-Maternidade pelo INSS: Quem Tem Direito e Como Receber | Fonseca & Miranda';
        const meta = document.querySelector('meta[name="description"]');
        if (meta) meta.setAttribute('content',
            'Saiba tudo sobre o salário-maternidade do INSS: quem tem direito, como calcular, documentos necessários e o que fazer quando o benefício é negado. Advogado especialista em Manaus e interior do AM.'
        );
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* ══════════════════════════════════════════
          ATENÇÃO — Hero impactante
      ══════════════════════════════════════════ */}
            <section className="pt-24 md:pt-36 pb-0 bg-gradient-to-b from-[#0d1023] to-[#15253f]">
                <div className="max-w-3xl mx-auto px-4">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-xs text-white/40 mb-6" aria-label="Breadcrumb">
                        <a href="/" className="hover:text-white/70 transition-colors">Início</a>
                        <span>/</span>
                        <a href="/advogado-previdenciario-manaus" className="hover:text-white/70 transition-colors">Direito Previdenciário</a>
                        <span>/</span>
                        <span className="text-white/70">Salário-Maternidade</span>
                    </nav>

                    <SectionLabel>Direito Previdenciário · INSS</SectionLabel>

                    <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-4 sm:mb-6">
                        O INSS Negou Seu <span className="text-[#F5A623]">Salário-Maternidade</span>? Isso Pode Ser Ilegal — e Você Tem Direito a Receber
                    </h1>

                    <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                        Milhares de mães no Amazonas perdem o benefício todo ano por falta de informação ou por erros do próprio INSS.
                        Entenda seus direitos e saiba como garantir o que é seu por lei.
                    </p>

                    {/* Meta do artigo estilo G1 */}
                    <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1.5 sm:gap-4 text-white/40 text-xs border-t border-white/10 pt-4 pb-0">
                        <span className="flex items-center gap-1.5">
                            <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            Fonseca &amp; Miranda Advocacia
                        </span>
                        <span className="flex items-center gap-1.5">
                            <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Leitura: ~8 minutos
                        </span>
                        <span className="flex items-center gap-1.5">
                            <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Revisado por advogado previdenciário
                        </span>
                    </div>
                </div>

                {/* Imagem hero */}
                <div className="max-w-3xl mx-auto px-4 mt-8">
                    <div className="rounded-t-2xl overflow-hidden shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=900&h=500&fit=crop&q=80"
                            alt="Mãe segurando bebê recém-nascido — salário-maternidade INSS"
                            className="w-full h-44 sm:h-64 md:h-96 object-cover"
                            loading="eager"
                        />
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
          Corpo do artigo
      ══════════════════════════════════════════ */}
            <article className="max-w-3xl mx-auto px-4 py-8 md:py-12">

                {/* Stat strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 sm:mb-12">
                    <StatCard value="120 dias" label="de lincença garantida por lei" color="bg-blue-50" icon="📅" />
                    <StatCard value="R$ 1.518" label="valor mínimo do benefício" color="bg-green-50" icon="💰" />
                    <StatCard value="+30%" label="dos pedidos são negados ou pagos errado" color="bg-red-50" icon="⚠️" />
                </div>

                {/* ── INTERESSE ── */}
                <div className="prose prose-gray max-w-none">

                    <SectionLabel>O que é o salário-maternidade</SectionLabel>
                    <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-4 leading-snug">
                        O que é o Salário-Maternidade e por que ele Existe?
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        O <strong>salário-maternidade</strong> é um benefício previdenciário pago pelo INSS que garante à mãe
                        (ou ao responsável legal pelo bebê) uma renda durante o período em que precisa se afastar do trabalho
                        para cuidar do filho recém-nascido, adotado ou que ficou sob guarda judicial.
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        É um direito constitucional. Não é um favor, nem um benefício extra. É uma obrigação do Estado
                        proteger a maternidade e garantir condições dignas para mãe e filho nesse momento tão especial e delicado da vida da mulher.
                    </p>

                    <CalloutBox icon="⚖️" title="Base legal">
                        O salário-maternidade está previsto no <strong>Art. 7º, XVIII da Constituição Federal</strong> e regulamentado
                        pela <strong>Lei 8.213/91</strong> (Lei de Benefícios da Previdência Social), artigos 71 a 73.
                    </CalloutBox>

                    <ArticleImage
                        src="https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=800&h=400&fit=crop&q=80"
                        alt="Mãe com bebê no colo, em casa, durante licença-maternidade"
                        caption="A licença-maternidade garante à mãe tempo e renda para cuidar do bebê nos primeiros meses de vida."
                    />

                    {/* ── Quem tem direito ── */}
                    <SectionLabel>Quem tem direito</SectionLabel>
                    <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-4 leading-snug">
                        Quem Pode Receber o Salário-Maternidade?
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Essa é a grande dúvida. E também a principal fonte de injustiças. Muita gente acredita que só
                        trabalhadora com carteira assinada tem direito. <strong>Isso é um mito.</strong>
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        O benefício pode ser concedido para diferentes categorias de seguradas:
                    </p>

                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                        {[
                            { icon: "👩‍💼", tipo: "Empregada CLT", desc: "Pago diretamente pela empresa, que é ressarcida pelo INSS. A trabalhadora tem 120 dias a partir do nascimento." },
                            { icon: "🌾", tipo: "Trabalhadora Rural", desc: "Mesmo sem contribuições em dinheiro, a trabalhadora rural tem direito pelo regime de economia familiar. Documentação é essencial." },
                            { icon: "🏠", tipo: "Doméstica", desc: "A empregada doméstica registrada tem os mesmos direitos da CLT. O benefício é pago pelo INSS." },
                            { icon: "💼", tipo: "Contribuinte Individual (MEI, autônoma)", desc: "Tem direito se tiver contribuído pelo menos 10 meses antes do nascimento. O salário é calculado com base nas contribuições." },
                            { icon: "📋", tipo: "Desempregada no período de graça", desc: "Quem perdeu o emprego mas ainda está no prazo de carência do INSS (geralmente até 12 meses) mantém o direito." },
                            { icon: "🤝", tipo: "Adotante ou guardiã", desc: "Quem adotou ou recebeu criança sob guarda judicial também tem direito ao benefício, independentemente da idade da criança." },
                        ].map((item) => (
                            <div key={item.tipo} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <p className="text-2xl mb-2">{item.icon}</p>
                                <p className="font-bold text-gray-800 text-sm mb-1">{item.tipo}</p>
                                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <CalloutBox icon="🌾" title="Atenção: trabalhadoras rurais do Amazonas">
                        No interior do Amazonas, muitas mulheres que trabalham na agricultura familiar, pesca ou extrativismo
                        têm direito ao salário-maternidade <strong>mesmo sem carteira assinada e sem contribuição em dinheiro</strong>.
                        Basta comprovar o trabalho rural por pelo menos 10 meses.
                    </CalloutBox>

                    {/* ── Quanto vale ── */}
                    <ArticleImage
                        src="https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&h=400&fit=crop&q=80"
                        alt="Calculadora e documentos sobre mesa para calcular o salário-maternidade pelo INSS"
                        caption="O cálculo do salário-maternidade varia conforme a categoria da trabalhadora e o tipo de vínculo com o INSS."
                    />

                    <SectionLabel>Valor e duração</SectionLabel>
                    <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-4 leading-snug">
                        Quanto Vale e por Quanto Tempo?
                    </h2>

                    {/* Mobile: cards empilhados */}
                    <div className="md:hidden space-y-3 mb-6">
                        {[
                            { cat: "Empregada CLT", val: "Último salário", dur: "120 dias" },
                            { cat: "Doméstica", val: "Último salário", dur: "120 dias" },
                            { cat: "Trabalhadora Rural", val: "1 salário mínimo (R$ 1.518)", dur: "120 dias" },
                            { cat: "Contribuinte Individual / MEI", val: "Média dos 12 últimos salários de contribuição", dur: "120 dias" },
                            { cat: "Segurada especial", val: "1 salário mínimo (R$ 1.518)", dur: "120 dias" },
                        ].map((row) => (
                            <div key={row.cat} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-800 text-sm mb-1">{row.cat}</p>
                                        <p className="text-gray-500 text-xs leading-relaxed">{row.val}</p>
                                    </div>
                                    <span className="flex-shrink-0 bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap">{row.dur}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop: tabela tradicional */}
                    <div className="hidden md:block overflow-x-auto mb-6">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="bg-[#0d1023] text-white">
                                    <th className="text-left px-4 py-3 rounded-tl-xl">Categoria</th>
                                    <th className="text-left px-4 py-3">Valor</th>
                                    <th className="text-left px-4 py-3 rounded-tr-xl">Duração</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { cat: "Empregada CLT", val: "Último salário", dur: "120 dias" },
                                    { cat: "Doméstica", val: "Último salário", dur: "120 dias" },
                                    { cat: "Trabalhadora Rural", val: "1 salário mínimo (R$ 1.518)", dur: "120 dias" },
                                    { cat: "Contribuinte Individual / MEI", val: "Média dos 12 últimos salários de contribuição", dur: "120 dias" },
                                    { cat: "Segurada especial", val: "1 salário mínimo (R$ 1.518)", dur: "120 dias" },
                                ].map((row, i) => (
                                    <tr key={row.cat} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                        <td className="px-4 py-3 font-medium text-gray-800 border-b border-gray-100">{row.cat}</td>
                                        <td className="px-4 py-3 text-gray-600 border-b border-gray-100">{row.val}</td>
                                        <td className="px-4 py-3 text-gray-600 border-b border-gray-100">
                                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">{row.dur}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <p className="text-gray-500 text-xs italic mb-8">
                        * O teto do INSS em 2024 é de R$ 7.786,02. Salários acima desse valor têm o benefício limitado ao teto.
                    </p>

                    {/* ── Documentos necessários ── */}
                    <SectionLabel>Como solicitar</SectionLabel>
                    <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-4 leading-snug">
                        Documentos Necessários para Dar Entrada no Benefício
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Ter os documentos certos é o primeiro passo para evitar uma negativa. Veja o que você vai precisar:
                    </p>
                    <ul className="list-none p-0 mb-8 divide-y divide-gray-100 bg-gray-50 rounded-xl overflow-hidden px-4">
                        <CheckItem>RG e CPF da mãe (ou responsável legal)</CheckItem>
                        <CheckItem>Certidão de nascimento do bebê ou certidão de adoção/guarda</CheckItem>
                        <CheckItem>Carteira de trabalho (para empregadas CLT e domésticas)</CheckItem>
                        <CheckItem>Número do NIT/PIS/PASEP</CheckItem>
                        <CheckItem>Declaração de que não está em emprego formal (para contribuintes individuais)</CheckItem>
                        <CheckItem>Documentos de comprovação de trabalho rural: notas de venda de produção, DAP/CAF, declaração do sindicato, fotografias, testemunhas</CheckItem>
                        <CheckItem>Extrato do CNIS (Cadastro Nacional de Informações Sociais)</CheckItem>
                    </ul>

                    <CalloutBox icon="💡" title="Dica importante">
                        O prazo para dar entrada no salário-maternidade é de <strong>até 5 anos após o nascimento</strong>. Quanto antes você solicitar,
                        menor o risco de perder parcelas retroativas e mais fácil será reunir os documentos.
                    </CalloutBox>

                </div>

                {/* ══════════════════════════════════════════
            DESEJO — Problemas e solução
        ══════════════════════════════════════════ */}
                <div className="mt-16">
                    <ArticleImage
                        src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop&q=80"
                        alt="Martelo de juiz sobre mesa representando recurso judicial contra negativa do INSS"
                        caption="Quando o INSS nega o benefício de forma indevida, é possível recorrer administrativamente ou na Justiça."
                    />

                    <SectionLabel>Por que o INSS nega</SectionLabel>
                    <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-4 leading-snug">
                        Por que o INSS Nega o Salário-Maternidade e o que Você Pode Fazer a Respeito
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        Todo ano, milhares de mulheres no Brasil têm seus pedidos de salário-maternidade reprovados pelo INSS.
                        Os motivos mais comuns são:
                    </p>

                    <ul className="list-none p-0 mb-8 divide-y divide-red-50 bg-red-50/50 rounded-xl overflow-hidden px-4">
                        <XItem>Carência incompleta: segurada especial sem 10 meses comprovados de trabalho rural</XItem>
                        <XItem>Documentação rural insuficiente ou mal organizada</XItem>
                        <XItem>Período de graça expirado (passou mais de 12 meses sem contribuir)</XItem>
                        <XItem>Erro cadastral no sistema do INSS (nome errado, CPF duplicado, vínculo não registrado)</XItem>
                        <XItem>MEI ou autônoma com contribuições em atraso ou inferiores ao mínimo</XItem>
                        <XItem>Qualidade de segurada perdida antes do nascimento do bebê</XItem>
                    </ul>

                    <div className="bg-[#0d1023] rounded-2xl p-6 md:p-8 my-8 text-white">
                        <p className="text-[#F5A623] text-sm font-bold uppercase tracking-widest mb-3">A verdade que o INSS não te conta</p>
                        <p className="text-xl font-serif leading-relaxed">
                            "A maioria das negativas de salário-maternidade pode ser <strong className="text-white">revertida judicialmente</strong>.
                            O INSS frequentemente aplica critérios mais rígidos do que a lei determina, principalmente em casos de trabalhadoras rurais."
                        </p>
                        <p className="text-white/50 text-sm mt-4">— Dr. Angelylson Fonseca, Advogado Previdenciário</p>
                    </div>

                    <SectionLabel>O que fazer após a negativa</SectionLabel>
                    <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-4 leading-snug">
                        Recebi uma Negativa. E Agora?
                    </h2>

                    <div className="space-y-4 mb-10">
                        {[
                            {
                                step: "01",
                                title: "Não aceite a negativa como definitiva",
                                desc: "A carta de negativa do INSS tem um prazo para recurso administrativo. Você tem direito a contestar a decisão antes mesmo de ir à Justiça."
                            },
                            {
                                step: "02",
                                title: "Reúna todos os documentos disponíveis",
                                desc: "Fotografias antigas, declarações de vizinhos, notas de compra de insumos rurais, cartas de banco. Qualquer coisa pode servir como prova de trabalho rural."
                            },
                            {
                                step: "03",
                                title: "Consulte um advogado especialista em previdenciário",
                                desc: "Com um advogado especializado, você aumenta muito suas chances de sucesso tanto no recurso administrativo quanto em eventual ação judicial."
                            },
                            {
                                step: "04",
                                title: "Ingresse com ação judicial se necessário",
                                desc: "Na Justiça Federal, é possível não só garantir o benefício, mas também receber todas as parcelas atrasadas com correção monetária e juros."
                            },
                        ].map((item) => (
                            <div key={item.step} className="flex gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-xl border border-gray-100">
                                <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#4A7BFF] text-white text-xs sm:text-sm font-black flex items-center justify-center">
                                    {item.step}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800 mb-1">{item.title}</p>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <ArticleImage
                        src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop&q=80"
                        alt="Advogado orientando cliente sobre salário-maternidade em consulta jurídica"
                        caption="Um advogado especialista pode identificar documentos que você nem sabia que serviam como prova para o INSS."
                    />

                    <SectionLabel>Por que nos escolher</SectionLabel>
                    <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-4 leading-snug">
                        Por que o Fonseca &amp; Miranda é o Escritório Certo para o Seu Caso?
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        Somos um escritório especializado em Direito Previdenciário com atuação em <strong>Manaus, Maués, Nova Olinda do Norte e Careiro</strong>.
                        Entendemos a realidade do trabalhador rural e urbano do Amazonas como ninguém.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                        {[
                            { num: "1.000+", label: "casos previdenciários", color: "bg-blue-50" },
                            { num: "95%", label: "de taxa de sucesso", color: "bg-green-50" },
                            { num: "3", label: "cidades atendidas no AM", color: "bg-yellow-50" },
                            { num: "0", label: "custo na consulta inicial", color: "bg-purple-50" },
                        ].map((s) => (
                            <div key={s.label} className={`${s.color} rounded-xl p-4 text-center`}>
                                <p className="text-2xl font-black text-gray-900">{s.num}</p>
                                <p className="text-xs text-gray-500 mt-1 leading-tight">{s.label}</p>
                            </div>
                        ))}
                    </div>

                    <ul className="list-none p-0 mb-8 divide-y divide-gray-100 bg-gray-50 rounded-xl overflow-hidden px-4">
                        <CheckItem>Atendimento humanizado e transparente — sem jurês e sem enrolação</CheckItem>
                        <CheckItem>Conhecemos as peculiaridades do trabalhador rural do Amazonas</CheckItem>
                        <CheckItem>Atuamos tanto no INSS (recurso administrativo) quanto na Justiça Federal</CheckItem>
                        <CheckItem>Recuperamos parcelas atrasadas dos últimos 5 anos</CheckItem>
                        <CheckItem>Honorários só em caso de êxito — você não paga se não ganhar</CheckItem>
                    </ul>

                </div>

                {/* ══════════════════════════════════════════
            AÇÃO — CTA
        ══════════════════════════════════════════ */}
                <div className="mt-12 sm:mt-16 bg-gradient-to-br from-[#0d1023] to-[#15253f] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-center shadow-2xl">
                    <span className="inline-block bg-[#F5A623]/20 text-[#F5A623] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                        Consulta 100% Gratuita
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-white mb-3 sm:mb-4 leading-snug">
                        Não Perca o Seu Salário-Maternidade. Fale com um Especialista Agora.
                    </h2>
                    <p className="text-white/60 text-sm sm:text-base mb-6 sm:mb-8 max-w-lg mx-auto leading-relaxed">
                        Teve seu benefício negado ou acha que está recebendo o valor errado?
                        Nossa equipe analisa seu caso <strong className="text-white">gratuitamente</strong> e sem compromisso.
                    </p>
                    <button
                        onClick={openWhatsApp}
                        className="group w-full sm:w-auto bg-[#25D366] text-white px-6 sm:px-8 py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-[#1ebe59] transition-all shadow-lg shadow-[#25D366]/30 flex items-center justify-center gap-3 mx-auto"
                        aria-label="Falar com advogado especialista em salário-maternidade pelo WhatsApp"
                    >
                        <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Entrar em Contato
                    </button>

                    <p className="text-white/30 text-xs mt-4">
                        📲 Respondemos em até 1 hora útil · Atendimento em Manaus, Maués, Nova Olinda do Norte e Careiro
                    </p>
                </div>

                {/* Perguntas frequentes */}
                <div className="mt-16">
                    <SectionLabel>Dúvidas frequentes</SectionLabel>
                    <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-6 leading-snug">
                        Perguntas Frequentes sobre o Salário-Maternidade
                    </h2>
                    <FaqAccordion />
                </div>

                {/* CTA final secundário */}
                <div className="mt-10 sm:mt-12 border border-[#4A7BFF]/20 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
                    <div className="flex-1 text-center sm:text-left">
                        <p className="font-bold text-gray-800 mb-1">Ainda tem dúvidas?</p>
                        <p className="text-gray-500 text-sm">Nosso escritório responde todas as perguntas sobre seu caso de forma gratuita e sem compromisso.</p>
                    </div>
                    <button
                        onClick={openWhatsApp}
                        className="w-full sm:w-auto flex-shrink-0 bg-[#1a56db] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#1447c0] transition-colors"
                        aria-label="Entrar em contato com advogado previdenciário"
                    >
                        Consulta Gratuita →
                    </button>
                </div>

                {/* Links internos */}
                <div className="mt-12 pt-8 border-t border-gray-100">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-4 font-semibold">Veja também</p>
                    <div className="flex flex-wrap gap-3">
                        {[
                            { label: "Aposentadoria Rural", href: "/advogado-previdenciario-manaus" },
                            { label: "Auxílio-Doença", href: "/advogado-previdenciario-manaus" },
                            { label: "BPC/LOAS", href: "/advogado-previdenciario-manaus" },
                            { label: "Pensão por Morte", href: "/advogado-previdenciario-manaus" },
                        ].map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="bg-gray-100 hover:bg-[#4A7BFF]/10 text-gray-600 hover:text-[#4A7BFF] px-4 py-2 rounded-full text-sm font-medium transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>

            </article>

            <Footer />
        </div>
    );
};

export default SalarioMaternidadePage;
