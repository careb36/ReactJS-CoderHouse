import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import ItemCount from './ItemCount';

// Defino las props que recibe este componente
interface ItemDetailProps {
  product: Product;
}

// Este componente muestra el detalle completo de un producto
// Incluye imagen, descripción, precio, stock y el componente ItemCount para agregar al carrito
const ItemDetail: React.FC<ItemDetailProps> = ({ product }) => {
  // Función para formatear el precio en pesos argentinos
  // Uso Intl.NumberFormat para que se vea profesional
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  // Renderizo el detalle completo del producto
  return (
    <div className="item-detail">
      {/* Contenedor de la imagen del producto */}
      <div className="item-detail-image">
        <img src={product.image} alt={product.name} />
      </div>
      {/* Contenedor con toda la información del producto */}
      <div className="item-detail-info">
        <h1>{product.name}</h1>
        <p className="item-detail-description">{product.description}</p>
        {/* Precio formateado en pesos argentinos */}
        <div className="item-detail-price">
          <span className="price">{formatPrice(product.price)}</span>
        </div>
        {/* Muestro el stock disponible o "Sin stock" */}
        <div className="item-detail-stock">
          <span className={`stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {product.stock > 0 ? `Stock disponible: ${product.stock}` : 'Sin stock'}
          </span>
        </div>
        {/* Muestro la categoría del producto */}
        <div className="item-detail-category">
          <span>Categoría: {product.category}</span>
        </div>
        {/* Solo muestro el ItemCount si hay stock disponible */}
        {product.stock > 0 && (
          <div className="item-detail-actions">
            <ItemCount stock={product.stock} initial={1} />
          </div>
        )}
        {/* Link para volver al catálogo principal */}
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
