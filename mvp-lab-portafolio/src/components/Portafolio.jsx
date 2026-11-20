import { useState, useMemo, useEffect, useRef } from 'react';
import gsap from 'gsap';
import JellyRadio from './JellyRadio';
import proyectosData from '../data/proyectos.json';

const PESTANAS = [
  { id: 'todos', label: 'Todos' },
  { id: 'eventos', label: 'Eventos y Fiestas' },
  { id: 'producto', label: 'Producto' },
  { id: 'reels', label: 'Contenido para Redes / Reels' },
];

export default function Portafolio({ onOpenLightbox }) {
  const [filtroActivo, setFiltroActivo] = useState('todos');

  // Calcular conteo por categoría para badges informativos
  const conteoPorCategoria = useMemo(() => {
    const conteo = { todos: proyectosData.length };
    PESTANAS.forEach((p) => {
      if (p.id !== 'todos') {
        conteo[p.id] = proyectosData.filter((item) => item.categoria === p.id).length;
      }
    });
    return conteo;
  }, []);

  // Proyectos filtrados según la pestaña activa
  const proyectosFiltrados = useMemo(() => {
    if (filtroActivo === 'todos') return proyectosData;
    return proyectosData.filter((item) => item.categoria === filtroActivo);
  }, [filtroActivo]);

  const galeriaRef = useRef(null);

  useEffect(() => {
    if (galeriaRef.current && galeriaRef.current.children.length > 0) {
      gsap.fromTo(
        galeriaRef.current.children,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out' }
      );
    }
  }, [filtroActivo]);

  // Opciones para el JellyRadio con conteo
  const jellyItems = useMemo(
    () =>
      PESTANAS.map((tab) => ({
        value: tab.id,
        label: tab.label,
        badge: conteoPorCategoria[tab.id] || 0,
      })),
    [conteoPorCategoria]
  );

  return (
    <section id="portafolio" className="seccion-portafolio">
      <div className="container">
        <div className="portafolio-header">
          <div>
            <span className="categoria-tag">Nuestro Trabajo</span>
            <h2>Portafolio</h2>
            <p className="portafolio-subtitulo">
              Explora producciones recientes organizadas por categoría o haz clic para verlas en pantalla completa.
            </p>
          </div>

          {/* Filtros dinámicos con efecto Jelly Radio de React Bits */}
          <div className="filtros-wrapper">
            <JellyRadio
              items={jellyItems}
              value={filtroActivo}
              onChange={(nuevoFiltro) => setFiltroActivo(nuevoFiltro)}
              chipColor="#16161A"
              activeColor="#68CC03"
              textColor="#A1A1AA"
              activeTextColor="#0B0B0D"
              ariaLabel="Filtros del portafolio"
            />
          </div>
        </div>

        {/* Cuadrícula asimétrica (Masonry) */}
        <div className="galeria-masonry" ref={galeriaRef}>
          {proyectosFiltrados.map((proyecto, idx) => (
            <div
              key={proyecto.id || idx}
              className={`masonry-item aspect-${proyecto.aspectRatio || 'horizontal'}`}
              onClick={() => onOpenLightbox(proyectosFiltrados, idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenLightbox(proyectosFiltrados, idx);
                }
              }}
              aria-label={`Ver proyecto: ${proyecto.titulo}`}
            >
              <div className="masonry-card">
                <img
                  src={proyecto.portada}
                  alt={proyecto.titulo}
                  loading="lazy"
                  className="masonry-imagen"
                />

                {/* Badge flotante de Video en miniatura */}
                {proyecto.videoUrl && (
                  <span className="indicador-video">
                    <span>&#9654;</span> Video
                  </span>
                )}

                {/* Capa interactiva de hover */}
                <div className="masonry-overlay">
                  <div className="overlay-top">
                    <span className="categoria-tag-mini">
                      {proyecto.categoriaNombre || proyecto.categoria}
                    </span>
                    <span className="lightbox-icon-hint" title="Ver en pantalla completa">
                      &#x26F6;
                    </span>
                  </div>

                  <div className="overlay-bottom">
                    <h3>{proyecto.titulo}</h3>
                    <p>{proyecto.descripcion}</p>
                    <span className="btn-ver-lightbox">
                      {proyecto.videoUrl ? 'Reproducir video' : 'Ver pantalla completa'} &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
