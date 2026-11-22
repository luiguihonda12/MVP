export default function Footer({ onNavigate404 }) {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div>
          <strong className="logo">MVP LAB</strong>
          <p>CHIA, CUNDINAMARCA · PRUEBA@MVP.COM</p>
        </div>
        <div className="redes">
          <a href="https://www.instagram.com/mvp_lab_/" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href="https://wa.me/+573208362283" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          {onNavigate404 && (
            <button
              type="button"
              onClick={onNavigate404}
              className="footer-link-404"
              title="Ver página 404"
            >
              404
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
