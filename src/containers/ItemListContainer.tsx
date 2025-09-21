import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { Product } from '../types';
import { getProducts, getProductsByCategory } from '../data/mockData';
import ItemList from '../components/ItemList';

interface ItemListContainerProps {
  greeting: string;
}

const ItemListContainer: React.FC<ItemListContainerProps> = ({ greeting }) => {
  const { categoryId } = useParams<{ categoryId?: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        let fetchedProducts: Product[];
        if (categoryId) {
          fetchedProducts = await getProductsByCategory(categoryId);
        } else {
          fetchedProducts = await getProducts();
        }

        setProducts(fetchedProducts);
      } catch (err) {
        setError('Error al cargar los productos. Por favor, intenta nuevamente.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

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
      <ItemList products={products} />
    </div>
  );
};

export default ItemListContainer;
