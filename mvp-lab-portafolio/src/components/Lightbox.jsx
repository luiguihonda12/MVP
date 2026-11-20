import { useEffect, useCallback } from 'react';

export default function Lightbox({ isOpen, proyectos, currentIndex, onClose, onNavigate }) {
  const total = proyectos?.length || 0;
  const proyectoActual = total > 0 ? proyectos[currentIndex] : null;

  const handlePrev = useCallback(() => {
    if (total > 1) {
      const prevIndex = (currentIndex - 1 + total) % total;
      onNavigate(prevIndex);
    }
  }, [currentIndex, total, onNavigate]);

  const handleNext = useCallback(() => {
    if (total > 1) {
      const nextIndex = (currentIndex + 1) % total;
      onNavigate(nextIndex);
    }
  }, [currentIndex, total, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    // Bloquear scroll del documento y pausar Lenis
    const scrollAnterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.lenis?.stop();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = scrollAnterior;
      window.lenis?.start();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !proyectoActual) return null;

  return (
    <div
      className="lightbox-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Vista previa a pantalla completa"
    >
      {/* BARRA SUPERIOR: CONTADOR Y BOTÓN DE CIERRE */}
      <div className="lightbox-topbar">
        {total > 1 && (
          <div className="lightbox-contador">
            <span>{currentIndex + 1}</span> / <span>{total}</span>
          </div>
        )}
        <button
          className="lightbox-btn-cerrar"
          onClick={onClose}
          aria-label="Cerrar vista previa (Esc)"
          type="button"
        >
          &times;
        </button>
      </div>

      {/* BOTÓN NAVEGACIÓN ANTERIOR */}
      {total > 1 && (
        <button
          className="lightbox-nav-btn lightbox-prev"
          onClick={handlePrev}
          aria-label="Proyecto anterior (Flecha izquierda)"
          type="button"
        >
          &#10094;
        </button>
      )}

      {/* ÁREA CENTRAL DE CONTENIDO (PANTALLA COMPLETA) */}
      <div className="lightbox-content-wrapper">
        <div className="lightbox-media-container">
          {proyectoActual.videoUrl ? (
            <div className="lightbox-video-frame">
              <iframe
                src={proyectoActual.videoUrl}
                title={proyectoActual.titulo}
                allowFullScreen
                allow="autoplay; encrypted-media; picture-in-picture"
              />
            </div>
          ) : (
            <img
              src={proyectoActual.portada}
              alt={proyectoActual.titulo}
              className="lightbox-imagen-hd"
            />
          )}
        </div>

        {/* BARRA INFERIOR DE INFORMACIÓN */}
        <div className="lightbox-info-bar">
          <div className="lightbox-info-text">
            <span className="categoria-tag">
              {proyectoActual.categoriaNombre || proyectoActual.categoria}
            </span>
            <h3>{proyectoActual.titulo}</h3>
            <p>{proyectoActual.descripcion}</p>
          </div>
        </div>
      </div>

      {/* BOTÓN NAVEGACIÓN SIGUIENTE */}
      {total > 1 && (
        <button
          className="lightbox-nav-btn lightbox-next"
          onClick={handleNext}
          aria-label="Proyecto siguiente (Flecha derecha)"
          type="button"
        >
          &#10095;
        </button>
      )}
    </div>
  );
}
