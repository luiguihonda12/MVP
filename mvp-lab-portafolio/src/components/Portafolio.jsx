import { useState } from 'react';
import proyectosData from '../data/proyectos.json';

const CATEGORIAS = [
  { id: 'todos', label: 'Todos' },
  { id: 'marca', label: 'Marca' },
  { id: 'servicio', label: 'Servicio' },
  { id: 'local', label: 'Local' },
];

export default function Portafolio({ onSelectProyecto }) {
  const [filtroActivo, setFiltroActivo] = useState('todos');

  const proyectosFiltrados =
    filtroActivo === 'todos'
      ? proyectosData
      : proyectosData.filter(
          (item) => item.categoria.toLowerCase() === filtroActivo
        );

  return (
    <section id="portafolio" className="seccion-portafolio">
      <div className="container">
        <div className="portafolio-header">
          <h2>Nuestros Proyectos</h2>

          {/* Botones de filtro por categoría */}
          <div className="filtros">
            {CATEGORIAS.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`filtro-btn ${filtroActivo === cat.id ? 'activo' : ''}`}
                onClick={() => setFiltroActivo(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cuadrícula de tarjetas */}
        <div className="galeria-grid">
          {proyectosFiltrados.map((proyecto, idx) => (
            <article
              key={idx}
              className="proyecto-card"
              onClick={() => onSelectProyecto(proyecto)}
            >
              <div className="card-imagen-wrap">
                <img
                  src={proyecto.portada}
                  alt={proyecto.titulo}
                  loading="lazy"
                />
                {proyecto.videoUrl && (
                  <span className="indicador-video">&#9654; Video</span>
                )}
              </div>
              <div className="card-body">
                <span className="categoria-tag">{proyecto.categoria}</span>
                <h3>{proyecto.titulo}</h3>
                <p>{proyecto.descripcion}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
