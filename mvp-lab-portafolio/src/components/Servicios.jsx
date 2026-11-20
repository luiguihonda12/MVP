import { useState } from 'react';

const SERVICIOS = [
  {
    id: 'video',
    icono: '🎬',
    titulo: 'Video Comercial & Reels',
    subtitulo: 'Producción Audiovisual',
    descripcion:
      'Producción, dirección y edición de video en alta definición para redes sociales, pauta digital y comerciales.',
    detalles: [
      'Grabación 4K y tomas cinematográficas',
      'Edición dinámica para Reels, TikTok y redes sociales',
      'Colorización y diseño de sonido',
    ],
  },
  {
    id: 'fotografia',
    icono: '📸',
    titulo: 'Fotografía Profesional',
    subtitulo: 'Imagen de Producto y Marca',
    descripcion:
      'Sesiones de producto, gastronomía, espacios comerciales y retratos corporativos con iluminación de estudio.',
    detalles: [
      'Fotografía de catálogo, e-commerce y menú',
      'Retoque digital en alta resolución',
    ],
  },
  {
    id: 'publicidad',
    icono: '🚀',
    titulo: 'Creación de Publicidad',
    subtitulo: 'Estrategia y Conversión',
    descripcion:
      'Conceptualización visual y piezas publicitarias diseñadas para atraer clientes y posicionar tu negocio.',
    detalles: [
      'Guiones y conceptualización visual creativa',
      'Estrategia enfocada en captación y ventas',
      'Piezas adaptadas a campañas y pauta digital',
    ],
  },
];

export default function Servicios() {
  // Estado para voltear tarjetas en dispositivos táctiles o al hacer clic
  const [tarjetasVolteadas, setTarjetasVolteadas] = useState({});

  const toggleVoltear = (id) => {
    setTarjetasVolteadas((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="servicios" className="seccion-servicios">
      <div className="container">
        <h2>¿Qué hacemos?</h2>
        <p className="servicios-subtitulo">
          Pasa el cursor o toca cada tarjeta para conocer los detalles
        </p>

        <div className="servicios-grid">
          {SERVICIOS.map((servicio) => {
            const estaVolteada = !!tarjetasVolteadas[servicio.id];

            return (
              <div
                key={servicio.id}
                className={`flip-card ${estaVolteada ? 'flipped' : ''}`}
                onClick={() => toggleVoltear(servicio.id)}
                role="button"
                tabIndex={0}
                aria-label={`Servicio: ${servicio.titulo}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleVoltear(servicio.id);
                  }
                }}
              >
                <div className="flip-card-inner">
                  {/* CARA FRONTAL: TÍTULO Y PRESENTACIÓN */}
                  <div className="flip-card-front">
                    <div className="flip-card-icono">{servicio.icono}</div>
                    <div>
                      <span className="categoria-tag">{servicio.subtitulo}</span>
                      <h3>{servicio.titulo}</h3>
                    </div>
                    <span className="flip-card-hint">
                      Ver detalle <span>↻</span>
                    </span>
                  </div>

                  {/* CARA POSTERIOR: INFORMACIÓN DETALLADA */}
                  <div className="flip-card-back">
                    <div className="flip-card-back-header">
                      <span className="categoria-tag">{servicio.subtitulo}</span>
                      <h3>{servicio.titulo}</h3>
                    </div>

                    <div className="flip-card-back-body">
                      <p>{servicio.descripcion}</p>
                      <ul className="flip-card-detalles">
                        {servicio.detalles.map((detalle, idx) => (
                          <li key={idx}>{detalle}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flip-card-back-footer">
                      <span>Toca o retira el cursor para volver ↺</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
