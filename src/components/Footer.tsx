import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Caro Coffee</h3>
          <p>Importadores y tostadores de café de especialidad desde 2025. Comprometidos con la calidad y el comercio justo.</p>
          <div className="certifications">
            <span className="cert">🌱 Orgánico</span>
            <span className="cert">🤝 Comercio Justo</span>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Información</h4>
          <ul>
            <li><a href="#sobre-nosotros">Sobre Nosotros</a></li>
            <li><a href="#guia-preparacion">Guía de Preparación</a></li>
            <li><a href="#origen-cafe">Origen del Café</a></li>
            <li><a href="#blog">Blog</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Servicio al Cliente</h4>
          <ul>
            <li><a href="#envios">Envíos y Devoluciones</a></li>
            <li><a href="#preguntas-frecuentes">Preguntas Frecuentes</a></li>
            <li><a href="#programa-fidelidad">Programa de Fidelidad</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contacto</h4>
          <div className="contact-info">
            <p><strong>Atención al Cliente</strong></p>
            <p>📧 hola@carocoffee.com</p>
            <p>📱 +54 11 2345-6789</p>
            <p>⏰ Lun-Vie 9:00-18:00</p>
          </div>
          <div className="social-links">
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="Facebook">�</a>
            <a href="#" aria-label="WhatsApp">💬</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; 2025 Caro Coffee S.A. Todos los derechos reservados.</p>
          <div className="legal-links">
            <a href="#privacidad">Política de Privacidad</a>
            <a href="#terminos">Términos y Condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;