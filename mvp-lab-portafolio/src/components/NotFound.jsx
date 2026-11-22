import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './NotFound.css';

export default function NotFound({ onGoHome }) {
  const clipRef = useRef(null);
  const mouseRef = useRef(null);
  const coords = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    // Scroll arriba al montar
    window.scrollTo(0, 0);

    const updateMask = (cx, cy) => {
      if (!clipRef.current) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Tamaño del visor enfocado
      const size = Math.min(320, Math.max(190, Math.min(w, h) * 0.38));

      const left = Math.max(0, cx - size / 2);
      const top = Math.max(0, cy - size / 2);
      const right = Math.min(w, cx + size / 2);
      const bottom = Math.min(h, cy + size / 2);

      const s = (left / w) * 100;
      const o = (top / h) * 100;
      const a = (right / w) * 100;
      const l = (bottom / h) * 100;

      clipRef.current.style.clipPath = `polygon(
        0% 0%,
        0% 100%,
        ${s}% 100%,
        ${s}% ${o}%,
        ${a}% ${o}%,
        ${a}% ${l}%,
        ${s}% ${l}%,
        ${s}% 100%,
        100% 100%,
        100% 0%
      )`;
    };

    // Inicializar en el centro
    const initialX = window.innerWidth / 2;
    const initialY = window.innerHeight / 2;
    coords.current = { x: initialX, y: initialY };

    if (mouseRef.current) {
      gsap.set(mouseRef.current, {
        x: initialX,
        y: initialY,
        xPercent: -50,
        yPercent: -50,
      });
    }
    updateMask(initialX, initialY);

    // Animación suave del cursor / visor al mover el mouse o tocar pantalla
    const handlePointerMove = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY || (e.touches && e.touches[0]?.clientY);

      if (clientX === undefined || clientY === undefined) return;

      coords.current = { x: clientX, y: clientY };

      if (mouseRef.current) {
        gsap.to(mouseRef.current, {
          x: clientX,
          y: clientY,
          duration: 0.32,
          ease: 'power2.out',
          overwrite: 'auto',
          onUpdate: () => {
            const currentX = gsap.getProperty(mouseRef.current, 'x');
            const currentY = gsap.getProperty(mouseRef.current, 'y');
            updateMask(Number(currentX), Number(currentY));
          },
        });
      }
    };

    const handleResize = () => {
      updateMask(coords.current.x, coords.current.y);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleBackHome = (e) => {
    e.preventDefault();
    if (onGoHome) {
      onGoHome();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="error-page">
      {/* 1. CAPA DE FONDO: 404 GIGANTE EN VERDE (Debajo del desenfoque) */}
      <div className="error-bold" aria-hidden="true">
        <h1 className="error-bold-h1">404</h1>
      </div>

      {/* 2. TEXTO SUPERIOR CON LOGO Y NOMBRE (Debajo del desenfoque pero visible) */}
      <header className="error-header">
        <a href="/" onClick={handleBackHome} className="error-header-brand">
          <img src="/assets/logo.png" alt="Logo MVP LAB" className="error-logo-img" />
          <div className="error-header-text">
            <span className="error-logo-title">MVP LAB</span>
            <span className="error-logo-sub">Producción Audiovisual & Publicidad</span>
          </div>
        </a>
      </header>

      {/* 3. CAPA DE DESENFOQUE TOTAL CON RECORTE INTERACTIVO (Cutout) */}
      <div className="error-clip" ref={clipRef} aria-hidden="true"></div>

      {/* 4. CAPA POR ENCIMA DEL DESENFOQUE (Texto "Página no encontrada" y botón) */}
      <div className="error-overlay">
        <p className="error-sub-text">Página no encontrada</p>
        <a href="/" onClick={handleBackHome} className="btn-primario error-btn-home">
          Volver al inicio
        </a>
      </div>

      {/* 5. VISOR DE CÁMARA CINEMATOGRÁFICA INTERACTIVO */}
      <div className="error-mouse" ref={mouseRef} aria-hidden="true">
        {/* Esquinas tácticas en verde neón */}
        <span className="decor-corner corner-tl"></span>
        <span className="decor-corner corner-tr"></span>
        <span className="decor-corner corner-bl"></span>
        <span className="decor-corner corner-br"></span>

        {/* Retícula central (Crosshair) */}
        <div className="error-crosshair">
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <path d="M17 0V34" stroke="var(--color-acento)" strokeWidth="1.5" />
            <path d="M34 17L0 17" stroke="var(--color-acento)" strokeWidth="1.5" />
            <circle cx="17" cy="17" r="4" stroke="var(--color-acento)" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Metadatos de visor de cine */}
        <div className="viewfinder-meta meta-tl">
          <span className="rec-dot"></span>
          <span>REC</span>
        </div>
        <div className="viewfinder-meta meta-tr">
          <span>4K RAW</span>
        </div>
        <div className="viewfinder-meta meta-bl">
          <span>FPS: 24.00</span>
        </div>
        <div className="viewfinder-meta meta-br">
          <span>[ 404 : LOST ]</span>
        </div>
      </div>
    </div>
  );
}
