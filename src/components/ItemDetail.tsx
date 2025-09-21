import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import ItemCount from './ItemCount';

interface ItemDetailProps {
  product: Product;
}

const ItemDetail: React.FC<ItemDetailProps> = ({ product }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  return (
    <div className="item-detail">
      <div className="item-detail-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="item-detail-info">
        <h1>{product.name}</h1>
        <p className="item-detail-description">{product.description}</p>
        <div className="item-detail-price">
          <span className="price">{formatPrice(product.price)}</span>
        </div>
        <div className="item-detail-stock">
          <span className={`stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {product.stock > 0 ? `Stock disponible: ${product.stock}` : 'Sin stock'}
          </span>
        </div>
        <div className="item-detail-category">
          <span>Categoría: {product.category}</span>
        </div>
        {product.stock > 0 && (
          <div className="item-detail-actions">
            <ItemCount stock={product.stock} initial={1} />
          </div>
        )}
        <div className="item-detail-navigation">
          <Link to="/" className="back-link">
            ← Volver al catálogo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
