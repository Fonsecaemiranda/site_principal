
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import InfoCards from '../components/InfoCards';
import AboutSection from '../components/AboutSection';
import PracticeAreas from '../components/PracticeAreas';
import TeamSection from '../components/TeamSection';
import LocationsSection from '../components/LocationsSection';
import ImageAutoSlider from '../components/ui/ImageAutoSlider';

import Footer from '../components/Footer';

const HomePage: React.FC = () => {
    useEffect(() => {
        document.title = 'Advogado Previdenciário e Bancário em Manaus | Fonseca & Miranda Advocacia';
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', 'Escritório de advocacia em Manaus especializado em Direito Previdenciário, Bancário e do Consumidor. Aposentadoria rural, Salário Maternidade, defesa contra bancos e ações contra concessionárias no Amazonas. Consulta gratuita.');
        }
    }, []);

    return (
        <>
            <Header />
            <main>
                <Hero />
                <section className="relative z-20 -mt-24 bg-[#15253f] pb-16">
                    <div className="px-4 md:px-8 max-w-7xl mx-auto">
                        <InfoCards />
                    </div>
                </section>
                <div className="relative z-0 -mt-16">
                    <AboutSection />
                </div>
                <PracticeAreas />
                <TeamSection />
                <LocationsSection />
                <ImageAutoSlider />

            </main>
            <div className="relative z-10 -mt-20">
                <Footer />
            </div>
        </>
    );
};

export default HomePage;
