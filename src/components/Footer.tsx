import React from 'react';
// Importo los iconos desde Tabler Icons para las certificaciones y redes sociales
import { IconLeaf, IconHeartHandshake, IconMail, IconPhone, IconClock, IconBrandInstagram, IconBrandFacebook, IconBrandWhatsapp } from '@tabler/icons-react';

// Componente Footer que muestra la información de la empresa y enlaces útiles
// Es la parte inferior de la página con información de contacto y políticas
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      {/* Contenido principal del footer dividido en secciones */}
      <div className="footer-content">
        {/* Sección principal con información de la empresa */}
        <div className="footer-section">
          <h3>Caro Coffee</h3>
          <p>Importadores y tostadores de café de especialidad desde 2025. Comprometidos con la calidad y el comercio justo.</p>
          {/* Certificaciones de la empresa usando Tabler Icons */}
          <div className="certifications">
            <span className="cert"><IconLeaf size={16} /> Orgánico</span>
            <span className="cert"><IconHeartHandshake size={16} /> Comercio Justo</span>
          </div>
        </div>

        {/* Sección con enlaces de información general */}
        <div className="footer-section">
          <h4>Información</h4>
          <ul>
            <li><a href="#sobre-nosotros">Sobre Nosotros</a></li>
            <li><a href="#guia-preparacion">Guía de Preparación</a></li>
            <li><a href="#origen-cafe">Origen del Café</a></li>
            <li><a href="#blog">Blog</a></li>
          </ul>
        </div>

        {/* Sección con enlaces de servicio al cliente */}
        <div className="footer-section">
          <h4>Servicio al Cliente</h4>
          <ul>
            <li><a href="#envios">Envíos y Devoluciones</a></li>
            <li><a href="#preguntas-frecuentes">Preguntas Frecuentes</a></li>
            <li><a href="#programa-fidelidad">Programa de Fidelidad</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </div>

        {/* Sección de contacto con información y redes sociales */}
        <div className="footer-section">
          <h4>Contacto</h4>
          <div className="contact-info">
            <p><strong>Atención al Cliente</strong></p>
            <p><IconMail size={16} /> hola@carocoffee.com</p>
            <p><IconPhone size={16} /> +54 11 2345-6789</p>
            <p><IconClock size={16} /> Lun-Vie 9:00-18:00</p>
          </div>
          {/* Enlaces a redes sociales usando Tabler Icons con aria-label para accesibilidad */}
          <div className="social-links">
            <a href="#" aria-label="Instagram"><IconBrandInstagram size={20} /></a>
            <a href="#" aria-label="Facebook"><IconBrandFacebook size={20} /></a>
            <a href="#" aria-label="WhatsApp"><IconBrandWhatsapp size={20} /></a>
          </div>
        </div>
      </div>

      {/* Parte inferior del footer con copyright y enlaces legales */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; 2025 Caro Coffee S.A. Todos los derechos reservados.</p>
          {/* Enlaces a políticas legales */}
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
