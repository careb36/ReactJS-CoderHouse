import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';

// Defino las props que recibe este componente
interface ItemCardProps {
  product: Product;
}

// Este componente muestra la información de un producto individual
// Es un componente presentacional que recibe un producto y lo muestra de forma bonita
const ItemCard: React.FC<ItemCardProps> = ({ product }) => {
  // Función para formatear el precio en pesos argentinos
  // Uso Intl.NumberFormat para que se vea profesional con el formato de moneda
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  // Renderizo la card del producto con toda la información
  return (
    <div className="item-card">
      {/* Contenedor de la imagen del producto */}
      <div className="item-image">
        <img src={product.image} alt={product.name} />
      </div>
      {/* Contenedor con toda la información del producto */}
      <div className="item-info">
        <h3>{product.name}</h3>
        <p className="item-description">{product.description}</p>
        {/* Precio formateado en pesos argentinos */}
        <div className="item-price">
          <span className="price">{formatPrice(product.price)}</span>
        </div>
        {/* Muestro el stock disponible o "Sin stock" si no hay */}
        <div className="item-stock">
          <span className={`stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {product.stock > 0 ? `Stock: ${product.stock}` : 'Sin stock'}
          </span>
        </div>
        {/* Link para ver el detalle completo del producto */}
        <Link to={`/item/${product.id}`} className="item-link">
          Ver detalle
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;
