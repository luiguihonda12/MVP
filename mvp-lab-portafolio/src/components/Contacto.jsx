import { useState } from 'react';
import SpecularButton from './SpecularButton';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });

  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCargando(true);

    // Simulación de envío de formulario
    setTimeout(() => {
      setCargando(false);
      setEnviado(true);
    }, 600);
  };

  const resetForm = () => {
    setFormData({ nombre: '', email: '', mensaje: '' });
    setEnviado(false);
  };

  // URL con mensaje personalizado para WhatsApp
  const mensajeWhatsApp = encodeURIComponent(
    `Hola MVP LAB, mi nombre es ${formData.nombre.trim() || 'un cliente'}${
      formData.email ? ` (${formData.email})` : ''
    }. ${formData.mensaje.trim() ? `Mensaje: ${formData.mensaje}` : 'Me gustaría cotizar un proyecto.'}`
  );

  return (
    <section id="contacto" className="seccion-contacto">
      <div className="container">
        <div className="contacto-header">
          <span className="categoria-tag">Hablemos</span>
          <h2>Contacto</h2>
          <p className="contacto-subtitulo">
            ¿Tienes una idea o proyecto en mente? Escríbenos directamente o déjanos un mensaje y te responderemos en breve.
          </p>
        </div>

        <div className="contacto-grid">
          {/* COLUMNA IZQUIERDA: WHATSAPP Y DATOS DIRECTOS */}
          <div className="contacto-info-panel">
            <div className="contacto-card-destacada">
              <div className="whatsapp-badge">
                <span className="dot-en-linea"></span>
                <span>Atención Inmediata</span>
              </div>

              <h3>Chat Directo por WhatsApp</h3>
              <p>
                La forma más rápida de cotizar y resolver dudas en tiempo real con nuestro equipo de producción.
              </p>

              <SpecularButton
                href="https://wa.me/+573208362283?text=Hola%20MVP%20LAB,%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto"
                target="_blank"
                rel="noopener noreferrer"
                size="md"
                radius={10}
                tint="#25D366"
                tintOpacity={0.15}
                lineColor="#25D366"
                baseColor="#1c2b20"
                textColor="#FFFFFF"
                intensity={1.5}
                idleIntensity={0.5}
                thickness={1.4}
                glow={1.3}
                autoAnimate={true}
                speed={0.35}
                className="specular-btn-whatsapp"
              >
                <svg
                  className="whatsapp-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="20"
                  height="20"
                  aria-hidden="true"
                >
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.158.571 4.184 1.57 5.942l-1.578 5.766 5.914-1.551c1.71 1.047 3.737 1.643 5.894 1.643 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm0 21.782c-1.892 0-3.65-.544-5.141-1.481l-.369-.233-3.818 1.002 1.02-3.722-.246-.391c-1.049-1.668-1.646-3.639-1.646-5.757 0-5.392 4.388-9.78 9.78-9.78 5.391 0 9.78 4.388 9.78 9.78 0 5.392-4.389 9.782-9.56 9.782z" />
                </svg>
                <span>Chatear por WhatsApp</span>
              </SpecularButton>
            </div>

            <div className="contacto-datos-lista">
              <div className="contacto-dato-item">
                <span className="dato-icono">📍</span>
                <div>
                  <strong>Ubicación</strong>
                  <p>Chía, Cundinamarca, Colombia</p>
                </div>
              </div>

              <div className="contacto-dato-item">
                <span className="dato-icono">✉️</span>
                <div>
                  <strong>Correo Electrónico</strong>
                  <p>prueba@mvp.com</p>
                </div>
              </div>

              <div className="contacto-dato-item">
                <span className="dato-icono">⏱️</span>
                <div>
                  <strong>Tiempo de Respuesta</strong>
                  <p>Menos de 24 horas hábiles</p>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: FORMULARIO */}
          <div className="contacto-form-panel">
            {enviado ? (
              <div className="contacto-exito-box">
                <div className="exito-icono">✓</div>
                <h3>¡Mensaje enviado con éxito!</h3>
                <p>
                  Gracias por escribirnos, <strong>{formData.nombre}</strong>. Revisaremos tu solicitud y te contactaremos en {formData.email}.
                </p>

                <div className="exito-acciones">
                  <a
                    href={`https://wa.me/+573208362283?text=${mensajeWhatsApp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp-secundario"
                  >
                    Enviar copia a WhatsApp
                  </a>
                  <button type="button" className="btn-secundario" onClick={resetForm}>
                    Enviar otro mensaje
                  </button>
                </div>
              </div>
            ) : (
              <form className="contacto-form" onSubmit={handleSubmit}>
                <h3>Envíanos un mensaje</h3>
                <p className="form-instruccion">
                  Completa los datos a continuación y nos pondremos en contacto contigo.
                </p>

                <div className="form-grupo">
                  <label htmlFor="nombre">Nombre completo *</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Ej. Juan Pérez"
                  />
                </div>

                <div className="form-grupo">
                  <label htmlFor="email">Correo electrónico *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nombre@ejemplo.com"
                  />
                </div>

                <div className="form-grupo">
                  <label htmlFor="mensaje">Mensaje *</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows="4"
                    required
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="Cuéntanos brevemente sobre tu marca, el tipo de servicio que buscas (video, foto o publicidad) o tus objetivos..."
                  ></textarea>
                </div>

                <button type="submit" className="btn-primario btn-submit" disabled={cargando}>
                  {cargando ? 'Enviando...' : 'Enviar mensaje'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
