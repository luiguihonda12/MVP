import { useState, useEffect, useRef } from 'react';
import carruselData from '../data/carrusel.json';

export default function Carrusel() {
  const [indiceSlide, setIndiceSlide] = useState(0);
  const totalSlides = carruselData.length;
  const intervaloRef = useRef(null);

  const irASlide = (nuevoIndice) => {
    setIndiceSlide((nuevoIndice + totalSlides) % totalSlides);
  };

  const reiniciarAutoPlay = () => {
    if (intervaloRef.current) clearInterval(intervaloRef.current);
    intervaloRef.current = setInterval(() => {
      setIndiceSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
  };

  useEffect(() => {
    reiniciarAutoPlay();
    return () => {
      if (intervaloRef.current) clearInterval(intervaloRef.current);
    };
  }, [totalSlides]);

  const handlePrev = () => {
    irASlide(indiceSlide - 1);
    reiniciarAutoPlay();
  };

  const handleNext = () => {
    irASlide(indiceSlide + 1);
    reiniciarAutoPlay();
  };

  const handleDotClick = (index) => {
    irASlide(index);
    reiniciarAutoPlay();
  };

  return (
    <section className="seccion-carrusel">
      <div className="container">
        <div className="carrusel-header">
          <div>
            <span className="categoria-tag">Trayectoria</span>
            <h2>Proyectos Anteriores</h2>
          </div>
          <div className="carrusel-controles">
            <button
              className="carrusel-btn"
              onClick={handlePrev}
              aria-label="Anterior"
              type="button"
            >
              &#10094;
            </button>
            <button
              className="carrusel-btn"
              onClick={handleNext}
              aria-label="Siguiente"
              type="button"
            >
              &#10095;
            </button>
          </div>
        </div>

        <div className="carrusel-viewport">
          <div
            className="carrusel-track"
            style={{ transform: `translateX(-${indiceSlide * 100}%)` }}
          >
            {carruselData.map((slide, i) => (
              <div className="carrusel-slide" key={i}>
                <img src={slide.imagen} alt={slide.titulo} loading="lazy" />
                <div className="carrusel-caption">
                  <h3>{slide.titulo}</h3>
                  <p>{slide.detalle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="carrusel-dots">
          {carruselData.map((_, i) => (
            <button
              key={i}
              className={`carrusel-dot ${i === indiceSlide ? 'activo' : ''}`}
              aria-label={`Ir a foto ${i + 1}`}
              onClick={() => handleDotClick(i)}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
