import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts';
import CartItem from './CartItem';

const Cart: React.FC = () => {
  const { state, clearCart } = useCart();
  const { items, total, itemCount } = state;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Tu carrito está vacío</h2>
        <p>¡Agrega algunos productos para comenzar!</p>
        <Link to="/" className="continue-shopping-btn">
          Continuar comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-header">
        <h2>Carrito de compras</h2>
        <button
          type="button"
          className="clear-cart-btn"
          onClick={clearCart}
          aria-label="Vaciar carrito"
        >
          Vaciar carrito
        </button>
      </div>

      <div className="cart-items">
        {items.map((item) => (
          <CartItem key={`${item.product.id}-${item.quantity}`} item={item} />
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total">
          <h3>Total: {formatPrice(total)}</h3>
          <p className="item-count">{itemCount} productos</p>
        </div>

        <div className="cart-actions">
          <Link to="/" className="continue-shopping-btn">
            Continuar comprando
          </Link>
          <button
            type="button"
            className="checkout-btn"
            disabled={items.length === 0}
          >
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
