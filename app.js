let todosLosProyectos = [];

const galeriaGrid = document.getElementById("galeria-grid");
const botonesFiltro = document.querySelectorAll(".filtro-btn");
const modal = document.getElementById("proyecto-modal");
const modalMedia = document.getElementById("modal-media");
const modalCategoria = document.getElementById("modal-categoria");
const modalTitulo = document.getElementById("modal-titulo");
const modalDescripcion = document.getElementById("modal-descripcion");
const modalCerrar = document.getElementById("modal-cerrar");

async function cargarProyectos() {
  try {
    const respuesta = await fetch("proyectos.json");
    todosLosProyectos = await respuesta.json();
    renderizarProyectos(todosLosProyectos);
  } catch (error) {
    galeriaGrid.innerHTML =
      "<p>Error al cargar los proyectos. Asegúrate de abrir la página con un servidor local (Live Server).</p>";
    console.error(error);
  }
}

function renderizarProyectos(lista) {
  galeriaGrid.innerHTML = "";

  lista.forEach((proyecto) => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "proyecto-card";

    const etiquetaVideo = proyecto.videoUrl
      ? '<span class="indicador-video">▶ Video</span>'
      : "";

    tarjeta.innerHTML = `
      <div class="card-imagen-wrap">
        <img src="${proyecto.portada}" alt="${proyecto.titulo}" loading="lazy">
        ${etiquetaVideo}
      </div>
      <div class="card-body">
        <span class="categoria-tag">${proyecto.categoria}</span>
        <h3>${proyecto.titulo}</h3>
        <p>${proyecto.descripcion}</p>
      </div>
    `;

    tarjeta.addEventListener("click", () => abrirModal(proyecto));
    galeriaGrid.appendChild(tarjeta);
  });
}

botonesFiltro.forEach((boton) => {
  boton.addEventListener("click", () => {
    botonesFiltro.forEach((btn) => btn.classList.remove("activo"));
    boton.classList.add("activo");

    const categoria = boton.getAttribute("data-categoria");
    if (categoria === "todos") {
      renderizarProyectos(todosLosProyectos);
    } else {
      const filtrados = todosLosProyectos.filter(
        (item) => item.categoria.toLowerCase() === categoria,
      );
      renderizarProyectos(filtrados);
    }
  });
});

function abrirModal(proyecto) {
  modalCategoria.textContent = proyecto.categoria;
  modalTitulo.textContent = proyecto.titulo;
  modalDescripcion.textContent = proyecto.descripcion;

  if (proyecto.videoUrl) {
    modalMedia.innerHTML = `<iframe src="${proyecto.videoUrl}" allowfullscreen allow="autoplay; encrypted-media"></iframe>`;
  } else {
    modalMedia.innerHTML = `<img src="${proyecto.portada}" alt="${proyecto.titulo}">`;
  }

  modal.classList.add("abierto");
}

function cerrarModal() {
  modal.classList.remove("abierto");
  modalMedia.innerHTML = ""; // Detiene la reproducción del video al cerrar
}

modalCerrar.addEventListener("click", cerrarModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) cerrarModal();
});

cargarProyectos();

/* =========================================================
   LÓGICA DEL CARRUSEL DE PROYECTOS ANTERIORES
   ========================================================= */
const carruselTrack = document.getElementById('carrusel-track');
const carruselDots = document.getElementById('carrusel-dots');
const btnPrev = document.getElementById('carrusel-prev');
const btnNext = document.getElementById('carrusel-next');

let indiceSlide = 0;
let totalSlides = 0;
let intervaloCarrusel;

async function iniciarCarrusel() {
  try {
    const res = await fetch('carrusel.json');
    const slides = await res.json();
    totalSlides = slides.length;

    if (totalSlides === 0) return;

    carruselTrack.innerHTML = '';
    carruselDots.innerHTML = '';

    slides.forEach((slide, i) => {
      // Crear diapositiva
      const item = document.createElement('div');
      item.className = 'carrusel-slide';
      item.innerHTML = `
        <img src="${slide.imagen}" alt="${slide.titulo}" loading="lazy">
        <div class="carrusel-caption">
          <h3>${slide.titulo}</h3>
          <p>${slide.detalle}</p>
        </div>
      `;
      carruselTrack.appendChild(item);

      // Crear punto indicador
      const dot = document.createElement('button');
      dot.className = i === 0 ? 'carrusel-dot activo' : 'carrusel-dot';
      dot.setAttribute('aria-label', `Ir a foto ${i + 1}`);
      dot.addEventListener('click', () => irASlide(i));
      carruselDots.appendChild(dot);
    });

    iniciarAutoPlay();
  } catch (error) {
    console.error('Error cargando carrusel.json:', error);
  }
}

function irASlide(nuevoIndice) {
  indiceSlide = (nuevoIndice + totalSlides) % totalSlides;
  carruselTrack.style.transform = `translateX(-${indiceSlide * 100}%)`;

  const dots = document.querySelectorAll('.carrusel-dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('activo', i === indiceSlide);
  });
}

function iniciarAutoPlay() {
  clearInterval(intervaloCarrusel);
  intervaloCarrusel = setInterval(() => irASlide(indiceSlide + 1), 5000);
}

btnPrev.addEventListener('click', () => {
  irASlide(indiceSlide - 1);
  iniciarAutoPlay();
});

btnNext.addEventListener('click', () => {
  irASlide(indiceSlide + 1);
  iniciarAutoPlay();
});

iniciarCarrusel();

/* =========================================================
   ABRIR SHOWREEL PRINCIPAL AL HACER CLIC
   ========================================================= */
const btnAbrirReel = document.getElementById('btn-abrir-reel');

if (btnAbrirReel) {
  btnAbrirReel.addEventListener('click', () => {
    abrirModal({
      categoria: 'Showreel Oficial',
      titulo: 'MVP LAB — Producción Audiovisual & Publicidad',
      descripcion: 'Resumen de nuestros mejores proyectos en video comercial, fotografía de producto y campañas para marcas y locales.',
      videoUrl: 'https://www.youtube.com/embed/ID_DE_TU_SHOWREEL?autoplay=1'
    });
  });
}