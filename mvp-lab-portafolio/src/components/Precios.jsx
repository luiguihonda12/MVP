import { useState } from 'react';
import JellyRadio from './JellyRadio';

const PLANES_COMBO = [
  {
    id: 'combo-basico',
    nombre: 'BÁSICO',
    precio: '$350.000',
    moneda: 'COP',
    popular: false,
    descripcion: 'Ideal para marcas, negocios o creadores que necesitan contenido fresco y rápido para redes.',
    caracteristicas: [
      '2 horas de cobertura.',
      '25 fotografías editadas.',
      '1 video resumen de 30–45 segundos.',
      'Formato vertical para redes sociales.',
      'Edición y corrección de color.',
    ],
    mensajeWa: 'Hola MVP LAB, me interesa el paquete BÁSICO ($350.000 COP) de Foto + Video.',
  },
  {
    id: 'combo-pro',
    nombre: 'PRO',
    precio: '$500.000',
    moneda: 'COP',
    popular: true,
    badge: 'MÁS POPULAR',
    descripcion: 'El combo más completo para negocios que buscan variedad y campañas con alto impacto visual.',
    caracteristicas: [
      '3 horas de cobertura.',
      '40 fotografías editadas.',
      '2 videos editados de 30–45 segundos.',
      'Formato vertical para redes sociales.',
      'Edición y corrección de color.',
    ],
    mensajeWa: 'Hola MVP LAB, me interesa el paquete PRO ($500.000 COP) de Foto + Video.',
  },
  {
    id: 'combo-premium',
    nombre: 'PREMIUM',
    precio: '$650.000',
    moneda: 'COP',
    popular: false,
    descripcion: 'Para producciones extensas con un amplio banco de contenido listo para publicar y pautar.',
    caracteristicas: [
      '4 horas de cobertura.',
      '60 fotografías editadas.',
      '3 videos editados de 30–60 segundos.',
      'Formato vertical para redes sociales.',
      'Edición y corrección de color.',
    ],
    mensajeWa: 'Hola MVP LAB, me interesa el paquete PREMIUM ($650.000 COP) de Foto + Video.',
  },
];

const PLANES_FOTO = [
  {
    id: 'foto-basico',
    nombre: 'BÁSICO',
    precio: '$180.000',
    moneda: 'COP',
    popular: false,
    descripcion: 'Cobertura fotográfica esencial para sesiones puntuales, retratos o pequeños eventos.',
    caracteristicas: [
      '25 fotografías editadas.',
      'Selección de los mejores momentos.',
      'Corrección de color, luz y encuadre.',
      'Entrega digital en alta resolución.',
    ],
    mensajeWa: 'Hola MVP LAB, me interesa el paquete BÁSICO de Solo Foto ($180.000 COP).',
  },
  {
    id: 'foto-pro',
    nombre: 'PRO',
    precio: '$280.000',
    moneda: 'COP',
    popular: true,
    badge: 'MÁS POPULAR',
    descripcion: 'Ideal para eventos medianos, sesiones gastronómicas, cartas y fotografía de producto.',
    caracteristicas: [
      '45 fotografías editadas.',
      'Registro de momentos importantes y detalles.',
      'Corrección de color, luz y encuadre.',
      'Entrega digital en alta resolución.',
    ],
    mensajeWa: 'Hola MVP LAB, me interesa el paquete PRO de Solo Foto ($280.000 COP).',
  },
  {
    id: 'foto-premium',
    nombre: 'PREMIUM',
    precio: '$380.000',
    moneda: 'COP',
    popular: false,
    descripcion: 'Cobertura fotográfica extendida para grandes eventos, celebraciones o catálogos completos.',
    caracteristicas: [
      '70 fotografías editadas.',
      'Cobertura más amplia del evento.',
      'Registro de asistentes, detalles y momentos especiales.',
      'Corrección de color, luz y encuadre.',
      'Entrega digital en alta resolución.',
    ],
    mensajeWa: 'Hola MVP LAB, me interesa el paquete PREMIUM de Solo Foto ($380.000 COP).',
  },
];

const OPCIONES_FILTRO = [
  { value: 'completo', label: '🎬 Completo (Foto + Video)' },
  { value: 'solo-foto', label: '📸 Solo Fotos' },
];

export default function Precios() {
  const [tipoFiltro, setTipoFiltro] = useState('completo'); // 'completo' | 'solo-foto'

  const planesActivos = tipoFiltro === 'completo' ? PLANES_COMBO : PLANES_FOTO;
  const tagTipo = tipoFiltro === 'completo' ? 'Foto + Video' : 'Solo Foto';

  return (
    <section id="precios" className="seccion-precios">
      <div className="container">
        {/* ENCABEZADO ÚNICO DE LA SECCIÓN */}
        <div className="precios-header">
          <span className="categoria-tag">Tarifas Transparentes</span>
          <h2>Nuestros Paquetes</h2>
          <p className="precios-subtitulo">
            Producción profesional para potenciar tu marca, negocio o evento con presupuestos claros y sin sorpresas.
          </p>

          {/* FILTRO SWITCH INTERACTIVO CON JELLY RADIO */}
          <div className="precios-filtro-wrapper">
            <JellyRadio
              items={OPCIONES_FILTRO}
              value={tipoFiltro}
              onChange={(val) => setTipoFiltro(val)}
              chipColor="#16161A"
              activeColor="#68CC03"
              textColor="#A1A1AA"
              activeTextColor="#0B0B0D"
              size="lg"
            />
          </div>
        </div>

        {/* GRID DE PLANES SEGÚN FILTRO SELECCIONADO */}
        <div className="precios-grid">
          {planesActivos.map((plan) => (
            <div
              key={plan.id}
              className={`precio-card ${plan.popular ? 'precio-card-popular' : ''}`}
            >
              {plan.popular && (
                <div className="precio-badge-popular">{plan.badge}</div>
              )}

              <div className="precio-card-top">
                <span className="precio-tag-combo">{tagTipo}</span>
                <h4 className="precio-plan-nombre">{plan.nombre}</h4>
                <p className="precio-plan-desc">{plan.descripcion}</p>

                <div className="precio-monto-wrap">
                  <span className="precio-monto">{plan.precio}</span>
                  <span className="precio-moneda">{plan.moneda}</span>
                </div>
              </div>

              <div className="precio-divisor"></div>

              <ul className="precio-lista">
                {plan.caracteristicas.map((item, idx) => (
                  <li key={idx} className="precio-item">
                    <span className="precio-check">✔</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/+573208362283?text=${encodeURIComponent(plan.mensajeWa)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn-precio ${plan.popular ? 'btn-primario' : 'btn-secundario'}`}
              >
                Elegir {plan.nombre}
              </a>
            </div>
          ))}
        </div>

        {/* NOTA AL PIE PARA PROYECTOS PERSONALIZADOS */}
        <div className="precios-footer-custom">
          <p>
            ¿Necesitas una producción a la medida, grabación en estudio o más días de rodaje?{' '}
            <a href="#contacto" className="precios-link-custom">
              Solicita una cotización personalizada aquí &rarr;
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
