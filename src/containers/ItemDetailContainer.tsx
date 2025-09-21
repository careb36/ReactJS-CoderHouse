import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { Product } from '../types';
import { getProductById } from '../services/firebase';
import ItemDetail from '../components/ItemDetail';

const ItemDetailContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError('ID de producto no válido');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const productId = parseInt(id, 10);
        const fetchedProduct = await getProductById(productId);

        if (!fetchedProduct) {
          setError('Producto no encontrado');
        } else {
          setProduct(fetchedProduct);
        }
      } catch (err) {
        setError('Error al cargar el producto. Por favor, intenta nuevamente.');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="item-detail-container">
        <div className="loading">
          <p>🔄 Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="item-detail-container">
        <div className="error">
          <p>❌ {error}</p>
          <a href="/">Volver al inicio</a>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="item-detail-container">
        <div className="error">
          <p>❌ Producto no encontrado</p>
          <a href="/">Volver al inicio</a>
        </div>
      </div>
    );
  }

  return (
    <div className="item-detail-container">
      <ItemDetail product={product} />
    </div>
  );
};

export default ItemDetailContainer;
