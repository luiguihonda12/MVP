import { useState } from 'react';
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
