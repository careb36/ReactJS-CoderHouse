import React from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../contexts';
import ItemList from '../components/ItemList';

interface ItemListContainerProps {
  greeting: string;
}

const ItemListContainer: React.FC<ItemListContainerProps> = ({ greeting }) => {
  const { categoryId } = useParams<{ categoryId?: string }>();
  const { state } = useProducts();
  const { products, categories, loading, error } = state;

  // Filter products by category if categoryId is provided
  const filteredProducts = categoryId
    ? products.filter(product => product.category === categoryId)
    : products;

  if (loading) {
    return (
      <div className="item-list-container">
        <h2>{greeting}</h2>
        <div className="loading">
          <p>🔄 Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="item-list-container">
        <h2>{greeting}</h2>
        <div className="error">
          <p>❌ {error}</p>
          <button onClick={() => window.location.reload()}>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="item-list-container">
      <h2>{greeting}</h2>
      <ItemList products={filteredProducts} />
    </div>
  );
};

export default ItemListContainer;
