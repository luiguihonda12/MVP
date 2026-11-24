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
          <a href="#precios">Precios</a>
          <a href="#contacto" className="btn-primario">
            Contacto
          </a>
        </nav>
      </div>
    </header>
  );
}
