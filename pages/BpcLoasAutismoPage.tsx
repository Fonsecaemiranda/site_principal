
import React, { useEffect, useState } from 'react';
import { useWhatsAppModal } from '../contexts/WhatsAppModalContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

/* ─── Componentes auxiliares ─── */

const bpcFaqItems = [
    {
        q: "Toda criança autista tem direito ao BPC/LOAS?",
        a: "Não automaticamente. A criança precisa ter o diagnóstico de TEA (Transtorno do Espectro Autista) comprovado por laudo médico e a família precisa comprovar renda per capita de até 1/4 do salário mínimo (R$ 379,50 em 2024). O grau do autismo pode influenciar na avaliação, mas não é impedimento para o benefício."
    },
    {
        q: "O autismo leve (nível 1) também garante o BPC?",
        a: "Sim. Após a Lei Berenice Piana (Lei 12.764/2012), o autismo em qualquer grau é considerado deficiência para fins legais. O que importa é demonstrar que o TEA gera impedimentos de longo prazo que limitam a participação plena na sociedade. Um advogado pode ajudar a apresentar essa documentação da forma correta."
    },
    {
        q: "O BPC é vitalício? E se a renda familiar mudar?",
        a: "O BPC é revogável. A cada 2 anos o INSS realiza revisões para verificar se as condições ainda se mantêm. Se a renda familiar aumentar acima do limite legal, o benefício pode ser suspenso. Por isso é importante acompanhar as revisões com orientação jurídica."
    },
    {
        q: "Posso receber BPC e outro benefício ao mesmo tempo?",
        a: "Em geral não — o BPC não pode ser acumulado com outros benefícios previdenciários (aposentadoria, pensão por morte, auxílio-doença). Mas existem exceções legais, como o acúmulo com a bolsa família e outros programas assistenciais. Consulte um advogado para analisar o seu caso específico."
    },
    {
        q: "Quanto tempo leva para receber o BPC após a entrada?",
        a: "O prazo legal é de 45 dias após o pedido. Na prática, o INSS costuma levar entre 90 e 180 dias. Casos com negativa e recurso podem levar mais tempo. Se houver judicialização, é possível conseguir uma tutela antecipada que antecipa o pagamento antes do fim do processo."
    },
];

const BpcFaqAccordion: React.FC = () => {
    const [openIdx, setOpenIdx] = useState<number | null>(null);
    return (
        <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
            {bpcFaqItems.map((item, i) => {
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
                                    <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </span>
                        </button>
                        <div style={{ maxHeight: isOpen ? '300px' : '0', overflow: 'hidden', transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)' }}>
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
    <div className="my-6 bg-[#4A7BFF]/5 border-l-4 border-[#4A7BFF] rounded-r-2xl p-5">
        <p className="font-bold text-gray-800 mb-2 flex items-center gap-2">
            <span>{icon}</span> {title}
        </p>
        <div className="text-gray-600 text-sm leading-relaxed">{children}</div>
    </div>
);

const CheckItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-start gap-3 py-3 text-sm text-gray-700">
        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center mt-0.5">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
            </svg>
        </span>
        {children}
    </li>
);

const XItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-start gap-3 py-3 text-sm text-gray-700">
        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center mt-0.5">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
            </svg>
        </span>
        {children}
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

/* ─── Componente principal ─── */

const BpcLoasAutismoPage: React.FC = () => {
    const { open: openWhatsApp } = useWhatsAppModal();

    useEffect(() => {
        const PAGE_URL = 'https://fonsecaemiranda.com.br/bpc-loas-autismo-inss';
        const PAGE_TITLE = 'BPC/LOAS para Autista: Como Garantir R$ 1.518/mês pelo INSS | Fonseca & Miranda';
        const PAGE_DESC = 'Guia completo sobre BPC/LOAS para crianças e adultos com autismo (TEA) no Amazonas. Requisitos, documentos, como recorrer da negativa do INSS e quanto tempo leva. Consultoria gratuita em Manaus.';
        const PAGE_IMAGE = 'https://fonsecaemiranda.com.br/hero-autismo-mae.png';

        /* ── Title & Meta ── */
        document.title = PAGE_TITLE;

        const setMeta = (sel: string, attr: string, val: string) => {
            let el = document.querySelector(sel) as HTMLMetaElement | null;
            if (!el) { el = document.createElement('meta'); document.head.appendChild(el); }
            el.setAttribute(attr, val);
        };

        setMeta('meta[name="description"]', 'content', PAGE_DESC);
        setMeta('meta[name="keywords"]', 'content',
            'BPC LOAS autismo, BPC autista INSS, benefício autismo INSS, como receber BPC criança autista, LOAS TEA Manaus, BPC LOAS Amazonas, salário mínimo autismo, BPC autismo negado recurso, laudo autismo INSS, direito autista INSS, advocacia previdenciária Manaus');
        setMeta('meta[name="robots"]', 'content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

        /* ── Canonical ── */
        let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
        const canonicalCreated = !canonical;
        if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
        canonical.href = PAGE_URL;

        /* ── Open Graph (WhatsApp / Facebook) ── */
        setMeta('meta[property="og:type"]', 'content', 'article');
        setMeta('meta[property="og:title"]', 'content', PAGE_TITLE);
        setMeta('meta[property="og:description"]', 'content', PAGE_DESC);
        setMeta('meta[property="og:image"]', 'content', PAGE_IMAGE);
        setMeta('meta[property="og:url"]', 'content', PAGE_URL);
        setMeta('meta[property="og:locale"]', 'content', 'pt_BR');
        setMeta('meta[property="og:site_name"]', 'content', 'Fonseca & Miranda Advocacia');
        setMeta('meta[property="article:published_time"]', 'content', '2024-03-01T00:00:00-04:00');
        setMeta('meta[property="article:modified_time"]', 'content', new Date().toISOString());
        setMeta('meta[property="article:author"]', 'content', 'Fonseca & Miranda Advocacia');
        setMeta('meta[property="article:section"]', 'content', 'Direito Previdenciário');
        setMeta('meta[property="article:tag"]', 'content', 'BPC LOAS, autismo, TEA, INSS, Direito Previdenciário');

        /* ── Twitter Card ── */
        setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
        setMeta('meta[name="twitter:title"]', 'content', PAGE_TITLE);
        setMeta('meta[name="twitter:description"]', 'content', PAGE_DESC);
        setMeta('meta[name="twitter:image"]', 'content', PAGE_IMAGE);

        /* ── JSON-LD Schemas ── */
        const schemas = [
            /* 1. Article */
            {
                "@context": "https://schema.org",
                "@type": "Article",
                "@id": `${PAGE_URL}#article`,
                "headline": "BPC/LOAS para Autistas: Como Garantir R$ 1.518 por Mês pelo INSS",
                "description": PAGE_DESC,
                "image": { "@type": "ImageObject", "url": PAGE_IMAGE, "width": 900, "height": 500 },
                "datePublished": "2024-03-01T00:00:00-04:00",
                "dateModified": new Date().toISOString(),
                "inLanguage": "pt-BR",
                "keywords": ["BPC LOAS autismo", "BPC autista INSS", "TEA benefício INSS", "autismo Manaus", "direito autista INSS"],
                "wordCount": 2200,
                "articleSection": "Direito Previdenciário",
                "author": { "@type": "Organization", "name": "Fonseca & Miranda Advocacia", "url": "https://fonsecaemiranda.com.br" },
                "publisher": {
                    "@type": "Organization",
                    "name": "Fonseca & Miranda Advocacia",
                    "url": "https://fonsecaemiranda.com.br",
                    "logo": { "@type": "ImageObject", "url": "https://fonsecaemiranda.com.br/logos/favicon.webp" }
                },
                "mainEntityOfPage": { "@type": "WebPage", "@id": PAGE_URL },
                "about": [
                    { "@type": "Thing", "name": "Benefício de Prestação Continuada", "sameAs": "https://pt.wikipedia.org/wiki/Benef%C3%ADcio_de_Presta%C3%A7%C3%A3o_Continuada" },
                    { "@type": "Thing", "name": "Transtorno do Espectro Autista", "sameAs": "https://pt.wikipedia.org/wiki/Transtorno_do_espectro_autista" }
                ]
            },
            /* 2. FAQPage — ativa "People Also Ask" no Google */
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "Toda criança autista tem direito ao BPC/LOAS?",
                        "acceptedAnswer": { "@type": "Answer", "text": "Não automaticamente. A criança precisa ter diagnóstico de TEA comprovado por laudo médico e a família precisa comprovar renda per capita de até 1/4 do salário mínimo (R$ 379,50 em 2024). O grau do autismo pode influenciar na avaliação, mas não é impedimento para o benefício." }
                    },
                    {
                        "@type": "Question",
                        "name": "O autismo leve (nível 1) também garante o BPC?",
                        "acceptedAnswer": { "@type": "Answer", "text": "Sim. Após a Lei Berenice Piana (Lei 12.764/2012), o autismo em qualquer grau é considerado deficiência para fins legais. O que importa é demonstrar que o TEA gera impedimentos de longo prazo que limitam a participação plena na sociedade." }
                    },
                    {
                        "@type": "Question",
                        "name": "O que fazer se o INSS negar o BPC para meu filho autista?",
                        "acceptedAnswer": { "@type": "Answer", "text": "Não aceite a negativa como definitiva. Você tem 30 dias para apresentar recurso administrativo. Reforce o laudo médico com descrição dos impactos funcionais do autismo, acrescente relatórios de terapeutas e, se necessário, ingresse com ação judicial. Na Justiça, é possível receber parcelas retroativas." }
                    },
                    {
                        "@type": "Question",
                        "name": "Qual é o valor do BPC/LOAS para autistas em 2024?",
                        "acceptedAnswer": { "@type": "Answer", "text": "O valor do BPC/LOAS em 2024 é de R$ 1.518,00, equivalente a 1 salário mínimo. O benefício é pago mensalmente pelo Governo Federal através do INSS e não exige contribuição prévia." }
                    },
                    {
                        "@type": "Question",
                        "name": "O BPC para autista é vitalício?",
                        "acceptedAnswer": { "@type": "Answer", "text": "O BPC é revogável. A cada 2 anos o INSS realiza revisões para verificar se as condições ainda se mantêm. Se a renda familiar aumentar acima do limite legal, o benefício pode ser suspenso. É importante acompanhar as revisões com orientação jurídica." }
                    }
                ]
            },
            /* 3. BreadcrumbList */
            {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://fonsecaemiranda.com.br/" },
                    { "@type": "ListItem", "position": 2, "name": "Direito Previdenciário", "item": "https://fonsecaemiranda.com.br/advogado-previdenciario-manaus" },
                    { "@type": "ListItem", "position": 3, "name": "BPC/LOAS para Autistas", "item": PAGE_URL }
                ]
            },
            /* 4. LegalService — reforça autoridade local */
            {
                "@context": "https://schema.org",
                "@type": "LegalService",
                "name": "Fonseca & Miranda Advocacia — BPC/LOAS para Autistas",
                "url": PAGE_URL,
                "description": "Assistência jurídica especializada em BPC/LOAS para pessoas com autismo (TEA) no Amazonas. Análise gratuita.",
                "areaServed": [
                    { "@type": "City", "name": "Manaus" },
                    { "@type": "City", "name": "Maués" },
                    { "@type": "City", "name": "Nova Olinda do Norte" },
                    { "@type": "City", "name": "Careiro" }
                ],
                "telephone": "+55-92-98292-6890",
                "priceRange": "Consulta Gratuita",
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "BPC/LOAS para Autistas",
                    "itemListElement": [
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Análise de elegibilidade ao BPC/LOAS para TEA" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Recurso contra negativa do INSS" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ação judicial para BPC autismo" } }
                    ]
                }
            }
        ];

        const scriptTags: HTMLScriptElement[] = schemas.map(schema => {
            const tag = document.createElement('script');
            tag.type = 'application/ld+json';
            tag.setAttribute('data-page', 'bpc-loas-autismo');
            tag.text = JSON.stringify(schema);
            document.head.appendChild(tag);
            return tag;
        });

        return () => {
            scriptTags.forEach(tag => { if (tag.parentNode) tag.parentNode.removeChild(tag); });
            if (canonicalCreated && canonical?.parentNode) canonical.parentNode.removeChild(canonical);
        };
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
                        <span className="text-white/60">BPC/LOAS para Autistas</span>
                    </nav>

                    <SectionLabel>Direito Previdenciário · BPC/LOAS · TEA</SectionLabel>

                    <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-4 sm:mb-6">
                        Seu Filho Autista Tem Direito a{' '}
                        <span className="text-[#F5A623]">R$ 1.518 por Mês</span>{' '}
                        e o INSS Provavelmente Não Vai Te Contar
                    </h1>

                    <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                        O BPC/LOAS é um benefício garantido por lei para crianças e adultos com autismo em famílias de baixa renda.
                        Mas mais de 60% dos pedidos são negados na primeira tentativa — muitas vezes por erros que um advogado pode corrigir.
                    </p>

                    {/* Meta */}
                    <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1.5 sm:gap-4 text-white/40 text-xs border-t border-white/10 pt-4 pb-0">
                        <span className="flex items-center gap-1.5">
                            <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            Fonseca &amp; Miranda Advocacia
                        </span>
                        <span className="flex items-center gap-1.5">
                            <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Leitura: ~9 minutos
                        </span>
                        <span className="flex items-center gap-1.5">
                            <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Revisado por advogado previdenciário
                        </span>
                    </div>
                </div>

                {/* Imagem hero */}
                <div className="max-w-3xl mx-auto mt-8 overflow-hidden">
                    <img
                            src="/hero-autismo-mae.png"
                            alt="Mãe brasileira abraçando filho com autismo — BPC LOAS para autistas no INSS"
                            className="w-full h-44 sm:h-64 md:h-96 object-cover"
                            loading="eager"
                        />
                </div>
            </section>

            {/* ══════════════════════════════════════════
          Corpo do artigo
      ══════════════════════════════════════════ */}
            <article className="max-w-3xl mx-auto px-4 py-8 md:py-12">

                {/* Stat strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 sm:mb-12">
                    <StatCard value="R$ 1.518" label="valor do benefício em 2024" color="bg-blue-50" icon="💰" />
                    <StatCard value="+60%" label="dos pedidos negados na 1ª tentativa" color="bg-red-50" icon="⚠️" />
                    <StatCard value="5 anos" label="de retroativo possível via Justiça" color="bg-green-50" icon="⚖️" />
                </div>

                {/* ── INTERESSE ── */}
                <div className="prose prose-gray max-w-none">

                    <SectionLabel>O que é o BPC/LOAS</SectionLabel>
                    <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-4 leading-snug">
                        O que é o BPC/LOAS e por que o Autismo Dá Direito a Ele?
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        O <strong>Benefício de Prestação Continuada (BPC)</strong>, também conhecido como LOAS
                        (Lei Orgânica da Assistência Social), é um benefício pago pelo Governo Federal no valor de
                        <strong> 1 salário mínimo</strong> (R$ 1.518 em 2024) para pessoas com deficiência de baixa renda.
                        Ele não é previdenciário — você não precisa ter contribuído para o INSS para receber.
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        Desde a aprovação da <strong>Lei Berenice Piana (Lei 12.764/2012)</strong>, o Transtorno do Espectro Autista
                        (TEA) é oficialmente reconhecido como deficiência. Isso significa que toda criança, adolescente ou adulto
                        com diagnóstico de autismo pode ter direito ao BPC, desde que a família comprove baixa renda.
                    </p>

                    <CalloutBox icon="📋" title="Base legal">
                        O BPC está previsto no <strong>Art. 203 da Constituição Federal</strong> e regulamentado pela
                        <strong> Lei 8.742/93 (LOAS)</strong>. A equiparação do autismo à deficiência está na
                        <strong> Lei 12.764/2012</strong>, confirmada pelo STJ em inúmeros precedentes favoráveis às famílias.
                    </CalloutBox>

                    <ArticleImage
                        src="/autismo-terapia.png"
                        alt="Criança autista fazendo terapia ocupacional com peças coloridas"
                        caption="O diagnóstico de TEA em qualquer grau garante o enquadramento como pessoa com deficiência para fins do BPC/LOAS."
                    />

                    {/* ── Quem tem direito ── */}
                    <SectionLabel>Quem tem direito</SectionLabel>
                    <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-4 leading-snug">
                        Quem Pode Receber o BPC para Autista?
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Muitas famílias acreditam que só têm direito ao benefício se o autismo for grave. Isso é um equívoco.
                        A lei não exige grau específico — o que importa é demonstrar que o TEA gera impedimentos de longo prazo
                        na vida da pessoa.
                    </p>

                    <p className="text-gray-600 leading-relaxed mb-4">
                        Os dois requisitos fundamentais para o BPC são:
                    </p>

                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                        {[
                            { icon: "🧩", tipo: "Deficiência comprovada", desc: "Diagnóstico formal de TEA em qualquer grau (nível 1, 2 ou 3), emitido por médico especialista (neurologista, psiquiatra ou pediatra do desenvolvimento)." },
                            { icon: "💵", tipo: "Renda familiar baixa", desc: "A renda por pessoa na família deve ser de até 1/4 do salário mínimo (R$ 379,50 em 2024). Em casos excepcionais, a Justiça aceita renda de até meio salário mínimo." },
                            { icon: "👨‍👩‍👦", tipo: "Quem é 'família' para o INSS", desc: "O INSS considera: cônjuge, companheiro(a), pais, filhos, irmãos e seus cônjuges que morem na mesma casa. Avós e tios geralmente não entram." },
                            { icon: "🔢", tipo: "Qualquer grau de autismo", desc: "TEA nível 1 ('leve'), nível 2 ('moderado') ou nível 3 ('severo') — todos têm enquadramento legal. A documentação médica precisa detalhar os impactos funcionais." },
                            { icon: "🧑", tipo: "Adultos com autismo", desc: "O BPC não é exclusivo de crianças. Adultos com TEA que nunca contribuíram para o INSS e atendem aos requisitos de renda também têm direito." },
                            { icon: "📍", tipo: "Residentes em qualquer município", desc: "O benefício é federal. Vale para moradores de Manaus, Maués, Nova Olinda do Norte, Careiro e qualquer cidade do Amazonas." },
                        ].map((item) => (
                            <div key={item.tipo} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <p className="text-2xl mb-2">{item.icon}</p>
                                <p className="font-bold text-gray-800 text-sm mb-1">{item.tipo}</p>
                                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <CalloutBox icon="⚠️" title="Atenção: renda per capita">
                        O INSS divide a renda total da família pelo número de pessoas que moram na casa.
                        Por exemplo: se 4 pessoas moram juntas e somam R$ 1.600 por mês, a renda per capita é R$ 400 —
                        acima do limite de R$ 379,50. Mas na Justiça, juízes têm aceito flexibilizar esse cálculo
                        para incluir gastos com o tratamento do autismo. Consulte um advogado antes de desistir.
                    </CalloutBox>

                    {/* Documentos */}
                    <ArticleImage
                        src="/documentos-bpc.png"
                        alt="Documentos brasileiros do INSS e laudo médico de autismo sobre a mesa"
                        caption="A organização dos documentos é o primeiro passo para evitar uma negativa do INSS."
                    />

                    <SectionLabel>Como solicitar</SectionLabel>
                    <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-4 leading-snug">
                        Documentos Necessários para Pedir o BPC para Autista
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        A documentação é onde a maioria dos pedidos tropeça. Documentos incompletos ou redigidos de forma vaga
                        são a principal causa de negativas. Veja o que você vai precisar:
                    </p>
                    <ul className="list-none p-0 mb-8 divide-y divide-gray-100 bg-gray-50 rounded-xl overflow-hidden px-4">
                        <CheckItem>Documento de identidade e CPF do responsável e da criança/adulto com TEA</CheckItem>
                        <CheckItem><strong>Laudo médico detalhado</strong> com diagnóstico de TEA (CID F84), assinado por neurologista, psiquiatra ou médico especialista</CheckItem>
                        <CheckItem>Comprovante de residência atualizado de todos os membros da família</CheckItem>
                        <CheckItem>Comprovantes de renda de todos os moradores da casa (holerites, declaração de autônomo, extrato do CNIS)</CheckItem>
                        <CheckItem>Carteira de vacinação ou certidão de nascimento da criança</CheckItem>
                        <CheckItem>Relatórios de acompanhamento terapêutico (terapeuta ocupacional, fonoaudiólogo, psicólogo)</CheckItem>
                        <CheckItem>Documentos escolares que indiquem necessidades especiais ou acompanhamento especializado</CheckItem>
                        <CheckItem>Número do NIS (Número de Identificação Social) — caso já possua cadastro no CadÚnico</CheckItem>
                    </ul>

                    <CalloutBox icon="💡" title="Dica importante sobre o laudo médico">
                        O laudo precisa ir além do diagnóstico. Ele deve descrever <strong>como o autismo impacta a vida diária</strong>:
                        dificuldades de comunicação, necessidade de suporte constante, limitações motoras, comportamentos que
                        impedem a independência. Um laudo genérico é frequentemente rejeitado pelo INSS.
                    </CalloutBox>

                </div>

                {/* ══════════════════════════════════════════
            DESEJO — Negativas e solução
        ══════════════════════════════════════════ */}
                <div className="mt-16">
                    <ArticleImage
                        src="/negativa-inss-recurso.png"
                        alt="Mãe brasileira revisando carta de negativa do INSS para BPC de filho autista"
                        caption="A negativa do INSS não é o fim do caminho. Na maioria dos casos, é possível reverter judicialmente."
                    />

                    <SectionLabel>Por que o INSS nega</SectionLabel>
                    <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-4 leading-snug">
                        Por que o INSS Nega o BPC para Autistas e o que Você Pode Fazer a Respeito
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        A negativa do INSS é mais comum do que deveria ser. Veja os motivos mais frequentes:
                    </p>

                    <ul className="list-none p-0 mb-8 divide-y divide-red-50 bg-red-50/50 rounded-xl overflow-hidden px-4">
                        <XItem>Laudo médico genérico, sem descrição dos impactos funcionais do autismo no dia a dia</XItem>
                        <XItem>Renda per capita calculada acima do limite de 1/4 do salário mínimo</XItem>
                        <XItem>Perito do INSS com avaliação superficial ou sem especialização em TEA</XItem>
                        <XItem>Documentação incompleta ou entregue fora do prazo</XItem>
                        <XItem>Ausência de relatórios dos terapeutas que acompanham a criança</XItem>
                        <XItem>Cadastro Único (CadÚnico) desatualizado ou inexistente</XItem>
                    </ul>

                    <div className="bg-[#0d1023] rounded-2xl p-6 md:p-8 my-8 text-white">
                        <p className="text-[#F5A623] text-sm font-bold uppercase tracking-widest mb-3">A verdade que o INSS não te conta</p>
                        <p className="text-xl font-serif leading-relaxed">
                            "A maioria das negativas de BPC para autistas pode ser{' '}
                            <strong className="text-white">revertida na Justiça</strong>.
                            Temos conseguido que juízes reconheçam o direito ao benefício mesmo quando a renda está
                            acima do limite legal, considerando os gastos com terapias e tratamentos do TEA."
                        </p>
                        <p className="text-white/50 text-sm mt-4">— Dr. Angelylson Fonseca, Advogado Previdenciário</p>
                    </div>

                    <SectionLabel>O que fazer após a negativa</SectionLabel>
                    <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-4 leading-snug">
                        Recebi uma Negativa. Quais São os Próximos Passos?
                    </h2>

                    <div className="space-y-4 mb-10">
                        {[
                            {
                                step: "01",
                                title: "Não aceite a negativa como definitiva",
                                desc: "A carta de indeferimento do INSS tem prazo para recurso administrativo (30 dias). Você pode contestar antes mesmo de ir à Justiça, sem custo."
                            },
                            {
                                step: "02",
                                title: "Reforce a documentação médica",
                                desc: "Peça ao médico um laudo mais detalhado, descrevendo os impactos do autismo na rotina da criança. Acrescente relatórios de fonoaudiólogo, terapeuta ocupacional e psicólogo."
                            },
                            {
                                step: "03",
                                title: "Comprove os gastos com o tratamento",
                                desc: "Notas fiscais de terapias, remédios, transportes para consultas. Esses gastos podem ser usados na Justiça para flexibilizar o critério de renda per capita."
                            },
                            {
                                step: "04",
                                title: "Consulte um advogado especialista",
                                desc: "Com orientação jurídica, as chances de aprovação aumentam muito. Um advogado previdenciário sabe quais argumentos funcionam para cada perfil de caso."
                            },
                            {
                                step: "05",
                                title: "Ingresse com ação judicial se necessário",
                                desc: "Na Justiça Federal, é possível não só garantir o benefício, mas também receber todas as parcelas atrasadas desde a data do pedido administrativo."
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
                        src="/advogado-familia.png"
                        alt="Família brasileira em consulta com advogado previdenciário para BPC LOAS autismo"
                        caption="Um advogado especialista conhece os caminhos para contornar os critérios mais rígidos do INSS."
                    />

                    <SectionLabel>Por que nos escolher</SectionLabel>
                    <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-4 leading-snug">
                        Por que o Fonseca &amp; Miranda é o Escritório Certo para o Seu Caso?
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        Somos especializados em Direito Previdenciário com atuação em{' '}
                        <strong>Manaus, Maués, Nova Olinda do Norte e Careiro</strong>.
                        Conhecemos de perto a realidade das famílias do Amazonas que enfrentam o INSS sozinhas.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                        {[
                            { num: "500+", label: "famílias atendidas" },
                            { num: "4", label: "cidades de atuação" },
                            { num: "10+", label: "anos de experiência" },
                            { num: "100%", label: "foco previdenciário" },
                        ].map((item) => (
                            <div key={item.label} className="bg-[#0d1023] rounded-2xl p-4 text-center">
                                <p className="text-2xl font-black text-[#F5A623]">{item.num}</p>
                                <p className="text-white/60 text-xs mt-1 leading-tight">{item.label}</p>
                            </div>
                        ))}
                    </div>

                </div>

                {/* ══════════════════════════════════════════
            AÇÃO — CTA principal
        ══════════════════════════════════════════ */}
                <div className="mt-12 sm:mt-16 bg-gradient-to-br from-[#0d1023] to-[#15253f] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-center shadow-2xl">
                    <span className="inline-block bg-[#F5A623]/20 text-[#F5A623] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                        Análise 100% Gratuita
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-white mb-3 sm:mb-4 leading-snug">
                        Seu Filho Autista Pode Ter Direito ao BPC. Descubra Agora.
                    </h2>
                    <p className="text-white/60 text-sm sm:text-base mb-6 sm:mb-8 max-w-lg mx-auto leading-relaxed">
                        O INSS negou o benefício ou você ainda não tentou dar entrada?
                        Nossa equipe analisa seu caso <strong className="text-white">gratuitamente</strong> e sem compromisso.
                    </p>
                    <button
                        onClick={openWhatsApp}
                        className="group w-full sm:w-auto bg-[#25D366] text-white px-6 sm:px-8 py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-[#1ebe59] transition-all shadow-lg shadow-[#25D366]/30 flex items-center justify-center gap-3 mx-auto"
                        aria-label="Falar com advogado especialista em BPC LOAS para autismo pelo WhatsApp"
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
                        Perguntas Frequentes sobre o BPC/LOAS para Autistas
                    </h2>
                    <BpcFaqAccordion />
                </div>

                {/* CTA final secundário */}
                <div className="mt-10 sm:mt-12 border border-[#4A7BFF]/20 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
                    <div className="flex-1 text-center sm:text-left">
                        <p className="font-bold text-gray-800 mb-1">Ainda tem dúvidas?</p>
                        <p className="text-gray-500 text-sm">Nossa equipe responde todas as perguntas sobre o caso do seu filho de forma gratuita e sem compromisso.</p>
                    </div>
                    <button
                        onClick={openWhatsApp}
                        className="w-full sm:w-auto flex-shrink-0 bg-[#1a56db] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#1447c0] transition-colors"
                        aria-label="Entrar em contato com advogado especialista em BPC LOAS"
                    >
                        Consulta Gratuita →
                    </button>
                </div>

                {/* Links internos */}
                <div className="mt-12 pt-8 border-t border-gray-100">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-4 font-semibold">Veja também</p>
                    <div className="flex flex-wrap gap-3">
                        {[
                            { label: "Salário-Maternidade", href: "/salario-maternidade-inss" },
                            { label: "Aposentadoria Rural", href: "/advogado-previdenciario-manaus" },
                            { label: "Auxílio-Doença", href: "/advogado-previdenciario-manaus" },
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

export default BpcLoasAutismoPage;
