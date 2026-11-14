import { useEffect } from 'react';

export default function Modal({ proyecto, onClose }) {
  useEffect(() => {
    if (!proyecto) return;

    // Bloquear el scroll del body mientras el modal esté abierto
    const scrollOriginal = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = scrollOriginal;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [proyecto, onClose]);

  if (!proyecto) return null;

  return (
    <div
      className="modal abierto"
      id="proyecto-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-titulo"
    >
      <div className="modal-contenido">
        <button
          className="modal-cerrar"
          id="modal-cerrar"
          aria-label="Cerrar"
          onClick={onClose}
          type="button"
        >
          &times;
        </button>

        <div className="modal-media" id="modal-media">
          {proyecto.videoUrl ? (
            <iframe
              src={proyecto.videoUrl}
              title={proyecto.titulo}
              allowFullScreen
              allow="autoplay; encrypted-media"
            />
          ) : (
            <img src={proyecto.portada} alt={proyecto.titulo} />
          )}
        </div>

        <div className="modal-info">
          <span className="categoria-tag" id="modal-categoria">
            {proyecto.categoria}
          </span>
          <h3 id="modal-titulo">{proyecto.titulo}</h3>
          <p id="modal-descripcion">{proyecto.descripcion}</p>
        </div>
      </div>
    </div>
  );
}
