
import React from 'react';
import { Link } from 'react-router-dom';
import FadeIn from './FadeIn';

const Card: React.FC<{ title: string; label: string; image: string; delay: number; href: string }> = ({ title, label, image, delay, href }) => (
  <FadeIn delay={delay} direction="up">
    <Link to={href} className="group cursor-pointer flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-lg h-full">
      <div className="p-8 flex justify-between items-start">
        <div className="space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">{label}</span>
          <h2 className="text-2xl md:text-xl lg:text-2xl font-medium leading-tight max-w-[200px] text-gray-900">{title}</h2>
        </div>
        <div className="p-2 border border-gray-100 rounded-full group-hover:bg-[#4A7BFF] group-hover:text-white transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17l10-10M7 7h10v10" />
          </svg>
        </div>
      </div>
      <div className="flex-1 min-h-[250px] md:min-h-[200px] lg:min-h-[280px] overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
    </Link>
  </FadeIn>
);

const InfoCards: React.FC = () => {
  const cards = [
    {
      label: "Previdenciário",
      title: "Garanta Seus Direitos Junto ao INSS",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=800&fit=crop",
      href: "/advogado-previdenciario-manaus"
    },
    {
      label: "Bancário",
      title: "Defesa Contra Abusos de Bancos",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=800&fit=crop",
      href: "/advogado-bancario-manaus"
    },
    {
      label: "Consumidor",
      title: "Proteção nas Relações de Consumo",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=800&fit=crop",
      href: "/advogado-consumidor-manaus"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, idx) => (
        <Card key={idx} {...card} delay={idx * 150} />
      ))}
    </div>
  );
};

export default InfoCards;
