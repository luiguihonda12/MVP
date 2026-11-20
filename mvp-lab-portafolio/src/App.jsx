import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Carrusel from './components/Carrusel';
import Portafolio from './components/Portafolio';
import Servicios from './components/Servicios';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import Modal from './components/Modal';

export default function App() {
  const [proyectoModal, setProyectoModal] = useState(null);

  const abrirShowreel = () => {
    setProyectoModal({
      categoria: 'Showreel Oficial',
      titulo: 'MVP LAB — Producción Audiovisual & Publicidad',
      descripcion:
        'Resumen de nuestros mejores proyectos en video comercial, fotografía de producto y campañas para marcas y locales.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    });
  };

  const cerrarModal = () => {
    setProyectoModal(null);
  };

  return (
    <>
      <Header />
      <main>
        <Hero onOpenReel={abrirShowreel} />
        <Carrusel />
        <Portafolio onSelectProyecto={setProyectoModal} />
        <Servicios />
        <Contacto />
      </main>
      <Footer />
      <Modal proyecto={proyectoModal} onClose={cerrarModal} />
    </>
  );
}
