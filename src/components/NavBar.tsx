// Importo React para poder usar JSX y los componentes
import React from 'react';
import { NavLink } from 'react-router-dom';
// Importo el componente CartWidget que va dentro del navbar
import CartWidget from './CartWidget';
// Importo el icono de café desde Tabler Icons
import { IconCoffee } from '@tabler/icons-react';

// Creo el componente NavBar usando TypeScript (React.FC significa React Function Component)
const NavBar: React.FC = () => {
  return (
    // El elemento nav principal con la clase navbar para los estilos CSS
    <nav className="navbar">
      {/* Sección izquierda: logo y nombre de la marca */}
      <div className="navbar-brand">
        {/* Icono de café como logo usando Tabler Icons - más profesional que emoji */}
        <div className="logo">
          <IconCoffee size={32} stroke={2} />
        </div>
        {/* Nombre de mi tienda de café */}
        <NavLink to="/" className="brand-link">
          <h1>Caro Coffee</h1>
        </NavLink>
      </div>

      {/* Navegación principal - uso una lista para que sea semánticamente correcta */}
      <ul className="navbar-links">
        {/* Enlaces principales de mi tienda usando NavLink para routing */}
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? 'active' : ''}
            aria-current="page"
          >
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/category/cafes-premium"
            className={({ isActive }) => isActive ? 'active' : ''}
            aria-current="page"
          >
            Cafés Premium
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/category/equipos"
            className={({ isActive }) => isActive ? 'active' : ''}
            aria-current="page"
          >
            Equipos
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/category/suscripciones"
            className={({ isActive }) => isActive ? 'active' : ''}
            aria-current="page"
          >
            Suscripciones
          </NavLink>
        </li>
      </ul>

      {/* Componente del carrito de compras - lo incluyo acá como pidió la consigna */}
      <CartWidget />
    </nav>
  );
};

// Exporto el componente para poder usarlo en App.jsx
export default NavBar;
