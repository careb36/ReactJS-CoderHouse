// Importo React para usar JSX
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts';

// Componente del widget del carrito con funcionalidad completa
const CartWidget: React.FC = () => {
  const { state } = useCart();
  const { itemCount } = state;

  return (
    // Contenedor del widget con clase para CSS - ahora es un Link
    <Link to="/cart" className="cart-widget" aria-label="Ir al carrito de compras">
      {/* Icono del carrito - uso emoji por simplicidad */}
      <span className="cart-icon">🛒</span>
      {/* Contador de productos - ahora es dinámico */}
      {itemCount > 0 && (
        <span className="cart-count">{itemCount}</span>
      )}
    </Link>
  );
};

// Exporto para usar en NavBar
export default CartWidget;
