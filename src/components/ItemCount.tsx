import React, { useState } from 'react';

// Defino las props que recibe este componente
interface ItemCountProps {
  stock: number;
  initial: number;
  onAdd?: (quantity: number) => void;
}

// Este componente permite al usuario seleccionar la cantidad de un producto
// Tiene botones para incrementar/decrementar y un botón para agregar al carrito
const ItemCount: React.FC<ItemCountProps> = ({ stock, initial, onAdd }) => {
  // Estado para la cantidad actual que el usuario quiere comprar
  const [count, setCount] = useState(initial);

  // Función para incrementar la cantidad (máximo hasta el stock disponible)
  const increment = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  // Función para decrementar la cantidad (mínimo 1)
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  // Función para manejar cuando el usuario hace click en "Agregar al carrito"
  const handleAdd = () => {
    if (onAdd) {
      onAdd(count);
    }
  };

  // Renderizo el componente con los controles de cantidad y el botón de agregar
  return (
    <div className="item-count">
      {/* Controles para incrementar/decrementar la cantidad */}
      <div className="count-controls">
        <button
          type="button"
          onClick={decrement}
          disabled={count <= 1}
          className="count-btn"
        >
          -
        </button>
        <span className="count-display">{count}</span>
        <button
          type="button"
          onClick={increment}
          disabled={count >= stock}
          className="count-btn"
        >
          +
        </button>
      </div>
      {/* Botón principal para agregar al carrito */}
      <button
        type="button"
        onClick={handleAdd}
        disabled={stock === 0}
        className="add-to-cart-btn"
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;
