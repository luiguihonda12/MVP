import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import HoloMosaic from './components/HoloMosaic';
import Header from './components/Header';
import Hero from './components/Hero';
import Carrusel from './components/Carrusel';
import Portafolio from './components/Portafolio';
import AntesDespues from './components/AntesDespues';
import Servicios from './components/Servicios';
import Proceso from './components/Proceso';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import Lightbox from './components/Lightbox';

export default function App() {
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    proyectos: [],
    currentIndex: 0,
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    window.lenis = lenis;

    // Sincronizar el loop de render con GSAP Ticker
    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Desplazamiento suave para enlaces ancla (#portafolio, #servicios, etc.)
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        const targetId = anchor.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl, { offset: -70, duration: 1.2 });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  const abrirLightbox = (proyectos, index = 0) => {
    setLightboxState({
      isOpen: true,
      proyectos,
      currentIndex: index,
    });
  };

  const cerrarLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  const navegarLightbox = (nuevoIndex) => {
    setLightboxState((prev) => ({ ...prev, currentIndex: nuevoIndex }));
  };

  const abrirShowreel = () => {
    abrirLightbox(
      [
        {
          id: 'showreel',
          categoriaNombre: 'Showreel Oficial',
          titulo: 'MVP LAB — Producción Audiovisual & Publicidad',
          descripcion:
            'Resumen de nuestros mejores proyectos en video comercial, fotografía de producto y campañas para marcas y locales.',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
          portada:
            'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
        },
      ],
      0
    );
  };

  return (
    <>
      {/* Fondo HoloMosaic interactivo de React Bits */}
      <div className="holo-bg-fixed" aria-hidden="true">
        <HoloMosaic
          color="#121118"
          metalColor="#68CC03"
          spectrum="pearl"
          saturation={0.35}
          glitter={0.8}
          intensity={1.3}
          speed={0.4}
          tileSize={1.1}
          gap={0.06}
          roundness={0.18}
          bevel={0.3}
          intro={false}
          mouseInteraction={true}
          flipOnClick={true}
        />
      </div>

      <Header />
      <main>
        <Hero onOpenReel={abrirShowreel} />
        <Carrusel />
        <Portafolio onOpenLightbox={abrirLightbox} />
        <AntesDespues />
        <Servicios />
        <Proceso />
        <Contacto />
      </main>
      <Footer />
      <Lightbox
        isOpen={lightboxState.isOpen}
        proyectos={lightboxState.proyectos}
        currentIndex={lightboxState.currentIndex}
        onClose={cerrarLightbox}
        onNavigate={navegarLightbox}
      />
    </>
  );
}
