import { useState, useRef, useCallback } from 'react';

const ESCENAS = [
  {
    id: 'cine',
    titulo: 'Color Grading Cinematográfico',
    tipo: 'Video Comercial',
    descripcion:
      'Del perfil plano desaturado (Log/RAW) de cámara de cine a una atmósfera cinematográfica con tonos de piel vivos y contraste profesional.',
    imagen:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
    antesLabel: 'RAW / Perfil Plano (Sin etalonar)',
    despuesLabel: 'Etalonado Oficial MVP LAB',
  },
  {
    id: 'gastronomia',
    titulo: 'Fotografía Gastronómica',
    tipo: 'Restaurantes & Locales',
    descripcion:
      'Realce de texturas, jugosidad y apetitosidad en alimentos, eliminando luces amarillentas y logrando fidelidad cromática para menú digital.',
    imagen:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    antesLabel: 'Foto Cruda de Cámara',
    despuesLabel: 'Retoque & Revelado Gourmet',
  },
  {
    id: 'producto',
    titulo: 'Publicidad de Producto & Bebidas',
    tipo: 'Marcas & E-commerce',
    descripcion:
      'Control preciso de reflejos, micro-detalles y balance de blancos de estudio para catálogos y campañas de alto impacto.',
    imagen:
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80',
    antesLabel: 'Iluminación Ambiente',
    despuesLabel: 'Iluminación de Estudio & Post',
  },
];

export default function AntesDespues() {
  const [escenaActiva, setEscenaActiva] = useState(0);
  const [posicion, setPosicion] = useState(50); // Porcentaje del deslizador (0 a 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const escena = ESCENAS[escenaActiva];

  const actualizarPosicionPorCoordenada = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const nuevoPorcentaje = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosicion(nuevoPorcentaje);
  }, []);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    actualizarPosicionPorCoordenada(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    actualizarPosicionPorCoordenada(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <section id="comparador" className="seccion-comparador">
      <div className="container">
        <div className="comparador-header">
          <span className="categoria-tag">El Valor Técnico</span>
          <h2>Antes y Después: Edición & Etalonado</h2>
          <p className="comparador-subtitulo">
            Desliza la barra para descubrir la diferencia real entre una captura cruda y un resultado pulido con corrección de color y postproducción profesional.
          </p>

          {/* Selector de escenas */}
          <div className="comparador-tabs">
            {ESCENAS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                className={`comparador-tab-btn ${escenaActiva === idx ? 'activo' : ''}`}
                onClick={() => {
                  setEscenaActiva(idx);
                  setPosicion(50);
                }}
              >
                <span>{item.tipo}</span>
              </button>
            ))}
          </div>
        </div>

        {/* CONTENEDOR PRINCIPAL DEL COMPARADOR */}
        <div className="comparador-card">
          <div
            className="comparador-viewport"
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            role="region"
            aria-label="Comparador interactivo de antes y después"
          >
            {/* CAPA DESPUÉS (FONDO COMPLETO - CON COLOR GRADING) */}
            <div className="comparador-capa capa-despues">
              <img
                src={escena.imagen}
                alt={`${escena.titulo} - Después`}
                className="comparador-img img-despues"
                draggable={false}
              />
              <span className="comparador-badge badge-despues">
                {escena.despuesLabel}
              </span>
            </div>

            {/* CAPA ANTES (RECORTADA POR EL DESLIZADOR - PLANO/RAW) */}
            <div
              className="comparador-capa capa-antes"
              style={{ width: `${posicion}%` }}
            >
              <img
                src={escena.imagen}
                alt={`${escena.titulo} - Antes`}
                className="comparador-img img-antes"
                draggable={false}
              />
              <span className="comparador-badge badge-antes">
                {escena.antesLabel}
              </span>
            </div>

            {/* LÍNEA DIVISORIA Y MANIJA INTERACTIVA */}
            <div
              className="comparador-linea"
              style={{ left: `${posicion}%` }}
              aria-hidden="true"
            >
              <div className="comparador-manija">
                <span className="manija-flechas">&#10094;&#10095;</span>
              </div>
            </div>

            {/* CONTROL INPUT NATIVO PARA ACCESIBILIDAD Y TÁCTIL */}
            <input
              type="range"
              min="0"
              max="100"
              value={posicion}
              onChange={(e) => setPosicion(Number(e.target.value))}
              className="comparador-range-invisible"
              aria-label="Control deslizante de comparación de imagen"
            />
          </div>

          {/* PIE CON DETALLES DE LA ESCENA */}
          <div className="comparador-info-footer">
            <div>
              <h3>{escena.titulo}</h3>
              <p>{escena.descripcion}</p>
            </div>
            <div className="comparador-presets">
              <button
                type="button"
                className="btn-preset"
                onClick={() => setPosicion(100)}
              >
                Ver Antes
              </button>
              <button
                type="button"
                className="btn-preset"
                onClick={() => setPosicion(50)}
              >
                50 / 50
              </button>
              <button
                type="button"
                className="btn-preset"
                onClick={() => setPosicion(0)}
              >
                Ver Después
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
