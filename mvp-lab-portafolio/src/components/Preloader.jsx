import { useEffect, useState } from 'react';
import './Preloader.css';

export default function Preloader({ onFinish }) {
  const [progreso, setProgreso] = useState(0);
  const [ocultando, setOcultando] = useState(false);

  useEffect(() => {
    // Incremento suave del porcentaje de carga (0% a 100%)
    const inicio = Date.now();
    const duracion = 1800; // 1.8 segundos de carga visual elegante

    const intervalo = setInterval(() => {
      const transcurrido = Date.now() - inicio;
      const pct = Math.min(100, Math.round((transcurrido / duracion) * 100));
      setProgreso(pct);

      if (pct >= 100) {
        clearInterval(intervalo);
        // Pequeña pausa al 100% para apreciar el logo lleno, luego fade-out
        setTimeout(() => {
          setOcultando(true);
          setTimeout(() => {
            if (onFinish) onFinish();
          }, 600); // Duración de la animación de fade-out
        }, 300);
      }
    }, 20);

    return () => clearInterval(intervalo);
  }, [onFinish]);

  return (
    <div className={`preloader-overlay ${ocultando ? 'preloader-fade-out' : ''}`}>
      <div className="preloader-content">
        {/* CONTENEDOR DEL LOGO ÚNICO CON SILUETA Y LLENADO VERTICAL */}
        <div className="preloader-logo-wrapper">
          {/* 1. Silueta / Contorno tenue de fondo */}
          <div className="preloader-logo-silhouette" />

          {/* 2. Capa verde neón que se revela de abajo a arriba según el progreso */}
          <div
            className="preloader-logo-fill"
            style={{
              clipPath: `inset(${100 - progreso}% 0 0 0)`,
              WebkitClipPath: `inset(${100 - progreso}% 0 0 0)`,
            }}
          />

          {/* Glow o resplandor neón pulsante */}
          <div
            className="preloader-logo-glow"
            style={{ opacity: Math.max(0.15, progreso / 100) }}
          />
        </div>
      </div>
    </div>
  );
}
