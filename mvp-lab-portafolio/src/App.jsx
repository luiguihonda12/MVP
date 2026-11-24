import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import FaultyTerminal from './components/FaultyTerminal';
import Header from './components/Header';
import Hero from './components/Hero';
import Carrusel from './components/Carrusel';
import Portafolio from './components/Portafolio';
import AntesDespues from './components/AntesDespues';
import Servicios from './components/Servicios';
import Proceso from './components/Proceso';
import Precios from './components/Precios';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import Lightbox from './components/Lightbox';
import NotFound from './components/NotFound';
import Preloader from './components/Preloader';

export default function App() {
  const [cargando, setCargando] = useState(true);
  const [is404, setIs404] = useState(() => {
    const p = window.location.pathname;
    return p === '/404' || (p !== '/' && p !== '' && !p.startsWith('/#'));
  });

  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    proyectos: [],
    currentIndex: 0,
  });

  useEffect(() => {
    const checkPath = () => {
      const p = window.location.pathname;
      setIs404(p === '/404' || (p !== '/' && p !== '' && !p.startsWith('/#')));
    };

    window.addEventListener('popstate', checkPath);
    return () => window.removeEventListener('popstate', checkPath);
  }, []);

  useEffect(() => {
    if (is404) return;

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

    // Desplazamiento suave para enlaces ancla (#portafolio, #servicios, #precios, etc.)
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
  }, [is404]);

  const irAInicio = () => {
    window.history.pushState({}, '', '/');
    setIs404(false);
    window.scrollTo(0, 0);
  };

  const irA404 = () => {
    window.history.pushState({}, '', '/404');
    setIs404(true);
    window.scrollTo(0, 0);
  };

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

  // Si estamos en la ruta 404, mostrar la vista NotFound inspirada en Dondre Green
  if (is404) {
    return <NotFound onGoHome={irAInicio} />;
  }

  return (
    <>
      {/* Pantalla de carga (Preloader) con logo animado y llenado vertical verde */}
      {cargando && <Preloader onFinish={() => setCargando(false)} />}

      {/* Fondo FaultyTerminal interactivo de React Bits (@react-bits/FaultyTerminal-JS-CSS) */}
      <div className="terminal-bg-fixed" aria-hidden="true">
        <FaultyTerminal
          tint="#68CC03"
          scale={1}
          gridMul={[2, 1]}
          digitSize={1.4}
          timeScale={0.3}
          scanlineIntensity={0.25}
          glitchAmount={0.8}
          flickerAmount={0.6}
          noiseAmp={0.8}
          mouseReact={true}
          mouseStrength={0.35}
          mouseGlow={0.6}
          brightness={0.85}
          vignette={0.45}
          curvature={0.15}
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
        <Precios />
        <Contacto />
      </main>
      <Footer onNavigate404={irA404} />
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
