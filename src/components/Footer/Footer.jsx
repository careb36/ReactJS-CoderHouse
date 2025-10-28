import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebook, FaEnvelope, FaCoffee, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import './Footer.css'
// Importar configuración centralizada
import { CONTACT } from '../../config/contact'

export default function Footer(){
  const year = new Date().getFullYear()
  // Construir URL de Instagram dependiendo del handle (sanitizando)
  const rawHandle = (CONTACT.instagramHandle || '').trim()
  const cleanHandle = rawHandle.startsWith('@') ? rawHandle.slice(1) : rawHandle
  const instagramUrl = cleanHandle
    ? `https://instagram.com/${cleanHandle}`
    : 'https://instagram.com'

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-section">
            <div className="footer-brand">
              <FaCoffee className="footer-brand__icon" />
              <span className="footer-brand__text">Café Especialidad</span>
            </div>
            <p className="footer-description">
              Café premium de especialidad, obtenido éticamente y tostado a la perfección.
            </p>
            <div className="footer-social">
              <a href={instagramUrl} aria-label="Instagram" title="Instagram" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={20} />
              </a>
              <a href="https://facebook.com" aria-label="Facebook" title="Facebook" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={20} />
              </a>
              <a href={`mailto:${CONTACT.email}`} aria-label="Enviar email" title={`Enviar email a ${CONTACT.email}`}>
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div className="footer-section">
            <h3 className="footer-title">Tienda</h3>
            <ul className="footer-links">
              <li><Link to="/">Todos los Cafés</Link></li>
              <li><Link to="/category/grano">Café en Grano</Link></li>
              <li><Link to="/category/molido">Molido</Link></li>
              <li><Link to="/category/capsulas">Cápsulas</Link></li>
              <li><Link to="/category/accesorios">Accesorios</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="footer-section">
            <h3 className="footer-title">Compañía</h3>
            <ul className="footer-links">
              <li><Link to="/about">Acerca de Nosotros</Link></li>
              <li><Link to="/contact">Contacto</Link></li>
              <li><Link to="/faq">Preguntas Frecuentes</Link></li>
              <li><Link to="/shipping">Envíos</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="footer-title">Contacto</h3>
            <ul className="footer-contact">
              <li>
                <FaMapMarkerAlt />
                <span>{CONTACT.location}</span>
              </li>
              <li>
                <FaPhone />
                <span>{CONTACT.phone}</span>
              </li>
              <li>
                <FaEnvelope />
                <span>{CONTACT.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {year} Café Especialidad · Todos los derechos reservados
          </p>
          <div className="footer-legal">
            <Link to="/privacy">Política de Privacidad</Link>
            <Link to="/terms">Términos de Servicio</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
