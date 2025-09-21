// Importo React para usar JSX
import React from 'react';

// Componente del widget del carrito - muestra la estructura básica para Entrega 2
// En futuras entregas se conectará con el contexto del carrito para mostrar la cantidad real
const CartWidget: React.FC = () => {
  return (
    // Contenedor del widget con clase para CSS
    <div className="cart-widget">
      {/* Icono del carrito - uso emoji por simplicidad */}
      <span className="cart-icon">🛒</span>
      {/* Contador de productos - hardcodeado por ahora, será dinámico en Entrega 3 */}
      <span className="cart-count">0</span>
    </div>
  );
};

// Exporto para usar en NavBar
export default CartWidget;
