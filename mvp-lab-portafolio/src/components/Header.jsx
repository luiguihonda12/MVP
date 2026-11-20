export default function Header() {
  return (
    <header className="header">
      <div className="container header-content">
        <a href="#" className="logo">
          <img src="/assets/logo.png" alt="Logo MVP LAB" className="logo-img" />
          <span>MVP LAB</span>
        </a>

        <nav className="nav">
          <a href="#portafolio">Portafolio</a>
          <a href="#servicios">Servicios</a>
          <a href="#contacto">Contacto</a>
          <a
            href="https://wa.me/+573208362283"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primario"
          >
            Cotizar proyecto
          </a>
        </nav>
      </div>
    </header>
  );
}
