import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import ItemCount from './ItemCount';

interface ItemCardProps {
  product: Product;
}

const ItemCard: React.FC<ItemCardProps> = ({ product }) => {
  const [showItemCount, setShowItemCount] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  const handleAddToCart = (quantity: number) => {
    setShowItemCount(false);
    // Optional: Show a toast or notification here
    console.log(`Added ${quantity} ${product.name}(s) to cart`);
  };

  return (
    <div className="item-card">
      <div className="item-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="item-info">
        <h3>{product.name}</h3>
        <p className="item-description">{product.description}</p>
        <div className="item-price">
          <span className="price">{formatPrice(product.price)}</span>
        </div>
        <div className="item-stock">
          <span className={`stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {product.stock > 0 ? `Stock: ${product.stock}` : 'Sin stock'}
          </span>
        </div>

        {showItemCount ? (
          <ItemCount
            product={product}
            onAdd={handleAddToCart}
          />
        ) : (
          <div className="item-actions">
            <Link to={`/item/${product.id}`} className="item-link">
              Ver detalle
            </Link>
            {product.stock > 0 && (
              <button
                className="add-to-cart-btn-small"
                onClick={() => setShowItemCount(true)}
              >
                Agregar al carrito
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
