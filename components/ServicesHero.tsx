
import React from 'react';
import FadeIn from './FadeIn';

const ServicesHero: React.FC = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <FadeIn direction="up">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-none mb-10">
              Our Expert Skin <br /> Care Services
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button className="bg-[#A35F3D] text-white px-8 py-3 rounded-full font-medium hover:bg-[#8e5234] transition-colors">
                Book a Consultation
              </button>
              <button className="bg-transparent border border-[#5D3A26]/20 text-[#5D3A26] px-8 py-3 rounded-full font-medium hover:bg-[#5D3A26]/5 transition-colors">
                About Epidermis
              </button>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={200} direction="up">
          <div className="rounded-[3rem] overflow-hidden shadow-2xl">
            <img
              src="https://picsum.photos/id/453/1600/900"
              alt="Skincare treatment"
              className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ServicesHero;
