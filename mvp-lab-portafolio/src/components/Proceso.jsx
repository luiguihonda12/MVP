export default function Proceso() {
  const pasos = [
    {
      numero: '01',
      icono: '💡',
      titulo: 'Nos cuentas tu idea',
      descripcion:
        'Hablamos por WhatsApp o videollamada. Definimos tus objetivos, el público de tu marca y el estilo visual que necesitas sin rodeos ni cotizaciones lentas.',
      beneficio: 'Asesoría directa y respuesta en 24h',
    },
    {
      numero: '02',
      icono: '🎬',
      titulo: 'Producimos y editamos',
      descripcion:
        'Nos encargamos de todo el rodaje, iluminación cinematográfica, dirección en locación, edición dinámica, colorización y diseño sonoro profesional.',
      beneficio: 'Tú te relajas, nosotros operamos',
    },
    {
      numero: '03',
      icono: '🚀',
      titulo: 'Recibes material listo para vender',
      descripcion:
        'Te entregamos las piezas en alta definición optimizadas para Reels, TikTok, Web o Pauta publicitaria, diseñadas para captar clientes y generar conversión.',
      beneficio: 'Formatos listos para publicar y pautar',
    },
  ];

  return (
    <section id="proceso" className="seccion-proceso">
      <div className="container">
        <div className="proceso-header">
          <span className="categoria-tag">Sin Complicaciones</span>
          <h2>Cómo trabajamos en 3 pasos</h2>
          <p className="proceso-subtitulo">
            Olvídate de trámites lentos o tecnicismos confusos. Convertimos tu idea en contenido audiovisual de alto impacto de la forma más sencilla.
          </p>
        </div>

        <div className="proceso-grid">
          {pasos.map((paso, index) => (
            <div key={paso.numero} className="proceso-card">
              <div className="proceso-card-top">
                <span className="proceso-numero">{paso.numero}</span>
                <span className="proceso-icono">{paso.icono}</span>
              </div>

              <h3>{paso.titulo}</h3>
              <p className="proceso-descripcion">{paso.descripcion}</p>

              <div className="proceso-beneficio-tag">
                <span className="proceso-check">✔</span>
                <span>{paso.beneficio}</span>
              </div>

              {index < pasos.length - 1 && (
                <div className="proceso-conector-flecha" aria-hidden="true">
                  ➔
                </div>
              )}
            </div>
          ))}
        </div>

        {/* BANNER CTA INFERIOR */}
        <div className="proceso-cta-banner">
          <div className="proceso-cta-texto">
            <h3>¿Listo para llevar tu marca al siguiente nivel?</h3>
            <p>Cuéntanos qué tienes en mente y armemos un plan a la medida de tu presupuesto.</p>
          </div>
          <a href="#contacto" className="btn-primario">
            Iniciar mi proyecto
          </a>
        </div>
      </div>
    </section>
  );
}
