// Importo React para usar JSX
import React from 'react';

// Componente del widget del carrito - todavía no tiene funcionalidad pero muestra la estructura
const CartWidget: React.FC = () => {
  return (
    // Contenedor del widget con clase para CSS
    <div className="cart-widget">
      {/* Icono del carrito - uso emoji por simplicidad */}
      <span className="cart-icon">🛒</span>
      {/* Contador de productos - por ahora está hardcodeado en 0 pero después será dinámico */}
      <span className="cart-count">3</span>
    </div>
  );
};

// Exporto para usar en NavBar
export default CartWidget;