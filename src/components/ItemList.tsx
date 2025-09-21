import React from 'react';
import type { Product } from '../types';
import ItemCard from './ItemCard';

// Defino las props que recibe este componente
interface ItemListProps {
  products: Product[];
}

// Este componente renderiza una lista de productos usando el componente ItemCard
// Es un componente presentacional que recibe un array de productos y los muestra
const ItemList: React.FC<ItemListProps> = ({ products }) => {
  // Si no hay productos, muestro un mensaje informativo
  if (products.length === 0) {
    return (
      <div className="no-products">
        <p>No se encontraron productos en esta categoría.</p>
      </div>
    );
  }

  // Si hay productos, los renderizo usando map con la key correcta (product.id)
  return (
    <div className="item-list">
      {products.map((product) => (
        <ItemCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ItemList;
