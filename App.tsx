/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AwardSection from './components/AwardSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import WorksGallery from './components/WorksGallery';
import TestimonialsSection from './components/TestimonialsSection';
import SocialSection from './components/SocialSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import OpeningIntro from './components/OpeningIntro';
import LateralAIAssistant from './components/LateralAIAssistant';
import ImageLightboxModal from './components/ImageLightboxModal';

const App: React.FC = () => {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#FAF8F5] text-[#1F2220] selection:bg-[#1D2F29] selection:text-[#FAF8F5] cursor-default overflow-x-hidden">
      {/* 1. Opening Animation (SVG Paint Roller revealing logo with fresh paint texture) */}
      <OpeningIntro onComplete={() => setIntroFinished(true)} />

      {/* 2. Fixed Architectural Navigation */}
      <Navbar />

      {/* 3. Agente Cobalto IA & Acesso Rápido ao WhatsApp (Lateral) */}
      <LateralAIAssistant />

      {/* 4. Global Image Lightbox Modal */}
      <ImageLightboxModal />

      {/* 5. Main Content */}
      <main>
        {/* Hero Section with Top 3 Badge and Interactive Brush Reveal Image */}
        <HeroSection />

        {/* Oficial: Prêmio Pintor Destaque Nacional (Julho 2026 - ABRAPP / MBPM) */}
        <AwardSection />

        {/* Sobre o Profissional / Apresentação Técnica */}
        <AboutSection />

        {/* Serviços Especializados (Pintura residencial e predial, Revitalização, Limpeza pós Obra, Aplicação de pedras naturais e Serviço Personalizado) */}
        <ServicesSection />

        {/* Antes e Depois com Slider Arrastável */}
        <BeforeAfterSlider />

        {/* Obras Realizadas (Galeria com Filtros e Lightbox em Tela Cheia) */}
        <WorksGallery />

        {/* Avaliações e Depoimentos de Clientes */}
        <TestimonialsSection />

        {/* Faixa Acompanhe no Instagram & YouTube */}
        <SocialSection />

        {/* Seção de Contato Direto & WhatsApp */}
        <ContactSection />
      </main>

      {/* 6. Rodapé Institucional */}
      <Footer />
    </div>
  );
};

export default App;
