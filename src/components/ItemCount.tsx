import React, { useState } from 'react';
import { useCart } from '../contexts';
import type { Product } from '../types';

interface ItemCountProps {
  product: Product;
  initial?: number;
  onAdd?: (quantity: number) => void;
}

const ItemCount: React.FC<ItemCountProps> = ({
  product,
  initial = 1,
  onAdd
}) => {
  const [quantity, setQuantity] = useState(initial);
  const { addItem, getItemQuantity } = useCart();

  const currentCartQuantity = getItemQuantity(product.id);
  const availableStock = product.stock - currentCartQuantity;

  const handleIncrement = () => {
    if (quantity < availableStock) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }

    if (onAdd) {
      onAdd(quantity);
    }

    // Reset quantity after adding to cart
    setQuantity(1);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  return (
    <div className="item-count">
      <div className="item-count-controls">
        <button
          type="button"
          className="count-btn"
          onClick={handleDecrement}
          disabled={quantity <= 1}
          aria-label="Disminuir cantidad"
        >
          -
        </button>

        <span className="count-display" aria-label={`Cantidad: ${quantity}`}>
          {quantity}
        </span>

        <button
          type="button"
          className="count-btn"
          onClick={handleIncrement}
          disabled={quantity >= availableStock}
          aria-label="Aumentar cantidad"
        >
          +
        </button>
      </div>

      <div className="item-count-info">
        <p className="stock-info">
          {availableStock > 0
            ? `Stock disponible: ${availableStock}`
            : 'Sin stock disponible'
          }
        </p>

        <p className="total-price">
          Total: {formatPrice(product.price * quantity)}
        </p>
      </div>

      <button
        type="button"
        className="add-to-cart-btn"
        onClick={handleAddToCart}
        disabled={availableStock <= 0 || quantity > availableStock}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;
