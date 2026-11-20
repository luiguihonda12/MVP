import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SpecularButton from './SpecularButton';

export default function Hero({ onOpenReel }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.badge', {
        opacity: 0,
        y: -15,
        duration: 0.6,
      })
      .from('h1', {
        opacity: 0,
        y: 25,
        duration: 0.8,
      }, '-=0.3')
      .from('p', {
        opacity: 0,
        y: 20,
        duration: 0.7,
      }, '-=0.4')
      .from('.hero-acciones a, .hero-acciones .specular-button', {
        opacity: 0,
        y: 15,
        stagger: 0.15,
        duration: 0.5,
      }, '-=0.3')
      .from('.showreel-wrapper', {
        opacity: 0,
        scale: 0.96,
        duration: 0.8,
      }, '-=0.4');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="container">
        <span className="badge">Producción Audiovisual & Publicidad</span>
        <h1>Dónde las ideas juegan en una liga mayor</h1>
        <p>
          Grabación de video comercial, fotografía de producto y campañas publicitarias para marcas, servicios y locales.
        </p>
        <div className="hero-acciones">
          <a href="#portafolio" className="btn-primario">
            Ver trabajos
          </a>
          <SpecularButton
            href="https://wa.me/+573208362283?text=Hola%20MVP%20LAB,%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto"
            target="_blank"
            rel="noopener noreferrer"
            size="md"
            radius={8}
            tint="#16161A"
            tintOpacity={0.65}
            lineColor="#68CC03"
            baseColor="#2A2A32"
            textColor="#FFFFFF"
            intensity={1.5}
            idleIntensity={0.45}
            thickness={1.4}
            glow={1.3}
            autoAnimate={true}
            speed={0.35}
          >
            Hablar por WhatsApp
          </SpecularButton>
        </div>
      </div>

      {/* CONTENEDOR SHOWREEL */}
      <div
        className="showreel-wrapper"
        id="btn-abrir-reel"
        onClick={onOpenReel}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpenReel();
          }
        }}
      >
        <video
          className="showreel-media"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80"
        >
          <source src="/assets/showreel-preview.mp4" type="video/mp4" />
        </video>

        <div className="showreel-overlay">
          <button className="play-btn" aria-label="Reproducir Showreel" type="button">
            <span>&#9654;</span>
          </button>
          <span className="showreel-texto">Ver Showreel MVP LAB (0:30)</span>
        </div>
      </div>
    </section>
  );
}
