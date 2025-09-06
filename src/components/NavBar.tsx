// Importo React para poder usar JSX y los componentes
import React from 'react';
// Importo el componente CartWidget que va dentro del navbar
import CartWidget from './CartWidget';

// Creo el componente NavBar usando TypeScript (React.FC significa React Function Component)
const NavBar: React.FC = () => {
  return (
    // El elemento nav principal con la clase navbar para los estilos CSS
    <nav className="navbar">
      {/* Sección izquierda: logo y nombre de la marca */}
      <div className="navbar-brand">
        {/* Icono de café como logo - elegí el emoji porque es simple y funcional */}
        <div className="logo">☕</div>
        {/* Nombre de mi tienda de café */}
        <h1>Caro Coffee</h1>
      </div>
      
      {/* Navegación principal - uso una lista para que sea semánticamente correcta */}
      <ul className="navbar-links">
        {/* Enlaces principales de mi tienda - por ahora usan # pero después los conectaré */}
        <li><a href="#inicio">Inicio</a></li>
        <li><a href="#cafes">Cafés Premium</a></li>
        <li><a href="#equipos">Equipos</a></li>
        <li><a href="#suscripciones">Suscripciones</a></li>
        <li><a href="#nosotros">Nosotros</a></li>
      </ul>
      
      {/* Componente del carrito de compras - lo incluyo acá como pidió la consigna */}
      <CartWidget />
    </nav>
  );
};

// Exporto el componente para poder usarlo en App.jsx
export default NavBar;