import React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// 📁 FOTOS LOCAIS — pasta: public/Fotos carrossel/
//    Assim que adicionar fotos na pasta, liste os nomes dos arquivos aqui:
//    Exemplo: '/Fotos carrossel/foto1.jpg', '/Fotos carrossel/foto2.webp'
// ─────────────────────────────────────────────────────────────────────────────
const localImages: string[] = [
    '/Fotos carrossel/clientes 01.webp',
    '/Fotos carrossel/clientes 02.webp',
    '/Fotos carrossel/clientes 03.webp',
    '/Fotos carrossel/clientes 04.webp',
    '/Fotos carrossel/clientes 05.webp',
    '/Fotos carrossel/clientes 06.webp',
    '/Fotos carrossel/clientes-07.webp',
    '/Fotos carrossel/clientes-08.webp',
    '/Fotos carrossel/clientes-09.webp',
    '/Fotos carrossel/clientes-10.webp',
    '/Fotos carrossel/clientes-11.webp',
    '/Fotos carrossel/clientes-12.webp',
    '/Fotos carrossel/clientes-13.webp',
    '/Fotos carrossel/clientes-14.webp',
];

// Imagens de fallback (Unsplash) — usadas enquanto não há fotos na pasta
const fallbackImages = [
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1593115057322-e94b77572f20?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=600&fit=crop',
];

// Usa fotos locais se existirem, senão usa fallback
const images = localImages.length > 0 ? localImages : fallbackImages;

// Duplica para loop contínuo perfeito
const duplicatedImages = [...images, ...images];

const ImageAutoSlider: React.FC = () => {
    return (
        <section className="w-full bg-[#0c1a2e] py-16 pb-32 overflow-hidden">
            {/* Título da seção */}
            <div className="text-center mb-10 px-4">
                <p className="text-[#C5A55A] uppercase tracking-widest text-sm font-semibold mb-2">
                    Nossa Estrutura
                </p>
                <h2 className="text-white text-2xl md:text-3xl font-bold">
                    Conheça o Escritório
                </h2>
            </div>

            {/* Container do slider com máscara de fade nas bordas */}
            <div className="relative w-full slider-mask">
                <div className="flex gap-5 w-max image-slider-track">
                    {duplicatedImages.map((src, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 w-52 h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-2xl overflow-hidden shadow-xl shadow-black/40 group"
                        >
                            <img
                                src={src}
                                alt={`Foto do escritório ${(i % images.length) + 1}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA discreta abaixo */}
            <div className="text-center mt-10">
                <p className="text-gray-400 text-sm">
                    Estrutura moderna dedicada à defesa dos seus direitos
                </p>
            </div>
        </section>
    );
};

export default ImageAutoSlider;
