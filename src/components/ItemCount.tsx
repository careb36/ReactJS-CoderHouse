import React, { useState } from 'react';

interface ItemCountProps {
  stock: number;
  initial: number;
  onAdd?: (quantity: number) => void;
}

const ItemCount: React.FC<ItemCountProps> = ({ stock, initial, onAdd }) => {
  const [count, setCount] = useState(initial);

  const increment = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAdd = () => {
    if (onAdd) {
      onAdd(count);
    }
  };

  return (
    <div className="item-count">
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
