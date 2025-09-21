import React from 'react';
import { useCart } from '../contexts';
import type { CartItem } from '../contexts/CartContext';

interface CartItemProps {
  item: CartItem;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeItem, updateQuantity } = useCart();
  const { product, quantity } = item;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeItem(product.id);
    }
  };

  const handleRemove = () => {
    removeItem(product.id);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="cart-item-info">
        <h3 className="cart-item-name">{product.name}</h3>
        <p className="cart-item-description">{product.description}</p>
        <p className="cart-item-price">{formatPrice(product.price)}</p>
      </div>

      <div className="cart-item-controls">
        <div className="quantity-controls">
          <button
            type="button"
            className="quantity-btn"
            onClick={handleDecrement}
            aria-label="Disminuir cantidad"
          >
            -
          </button>

          <span className="quantity-display" aria-label={`Cantidad: ${quantity}`}>
            {quantity}
          </span>

          <button
            type="button"
            className="quantity-btn"
            onClick={handleIncrement}
            aria-label="Aumentar cantidad"
          >
            +
          </button>
        </div>

        <div className="cart-item-total">
          <p className="item-subtotal">
            Subtotal: {formatPrice(product.price * quantity)}
          </p>
        </div>

        <button
          type="button"
          className="remove-item-btn"
          onClick={handleRemove}
          aria-label={`Eliminar ${product.name} del carrito`}
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default CartItem;
