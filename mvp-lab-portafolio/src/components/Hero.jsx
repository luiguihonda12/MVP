export default function Hero({ onOpenReel }) {
  return (
    <section className="hero">
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
          <a
            href="#contacto"
            className="btn-secundario"
          >
            Hablar por WhatsApp
          </a>
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
