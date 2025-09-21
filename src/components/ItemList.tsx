import React from 'react';
import type { Product } from '../types';
import ItemCard from './ItemCard';

interface ItemListProps {
  products: Product[];
}

const ItemList: React.FC<ItemListProps> = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="no-products">
        <p>No se encontraron productos en esta categoría.</p>
      </div>
    );
  }

  return (
    <div className="item-list">
      {products.map((product) => (
        <ItemCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ItemList;
