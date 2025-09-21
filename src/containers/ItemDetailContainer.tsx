import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { Product } from '../types';
import { getProductById } from '../data/mockData';
import ItemDetail from '../components/ItemDetail';
// Importo el icono de loading desde Tabler Icons
import { IconLoader } from '@tabler/icons-react';

// Este componente contenedor maneja la lógica para mostrar el detalle de un producto específico
// Obtiene el ID del producto de la URL y lo busca en los datos
const ItemDetailContainer: React.FC = () => {
  // Obtengo el ID del producto desde la URL usando useParams
  const { id } = useParams<{ id: string }>();
  // Estado para almacenar el producto que voy a mostrar
  const [product, setProduct] = useState<Product | null>(null);
  // Estado para mostrar loading mientras busco el producto
  const [loading, setLoading] = useState(true);
  // Estado para manejar errores si no encuentro el producto
  const [error, setError] = useState<string | null>(null);

  // useEffect para buscar el producto cuando cambia el ID en la URL
  useEffect(() => {
    // Función async para buscar el producto por ID
    const fetchProduct = async () => {
      // Si no hay ID, muestro error y salgo
      if (!id) {
        setError('ID de producto no válido');
        setLoading(false);
        return;
      }

      try {
        // Pongo loading en true y limpio errores anteriores
        setLoading(true);
        setError(null);

        // Convierto el ID de string a número para buscar el producto
        const productId = parseInt(id, 10);
        const fetchedProduct = await getProductById(productId);

        // Si no encontré el producto, muestro error
        if (!fetchedProduct) {
          setError('Producto no encontrado');
        } else {
          // Si lo encontré, lo guardo en el estado
          setProduct(fetchedProduct);
        }
      } catch (err) {
        // Si hay error, lo guardo para mostrar al usuario
        setError('Error al cargar el producto. Por favor, intenta nuevamente.');
        // También lo logueo en consola para debugging
        console.error('Error fetching product:', err);
      } finally {
        // Siempre pongo loading en false cuando termina
        setLoading(false);
      }
    };

    // Llamo a la función para buscar el producto
    fetchProduct();
  }, [id]); // Dependencia: se ejecuta cuando cambia el ID

  // Si está cargando, muestro el estado de loading
  if (loading) {
    return (
      <div className="item-detail-container">
        <div className="loading">
          <p><IconLoader size={20} className="spinning" /> Cargando producto...</p>
        </div>
      </div>
    );
  }

  // Si hay error, muestro el mensaje de error con link para volver al inicio
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

  // Si no hay producto (por si acaso), muestro error
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

  // Si todo está bien, renderizo el componente ItemDetail con el producto
  return (
    <div className="item-detail-container">
      <ItemDetail product={product} />
    </div>
  );
};

export default ItemDetailContainer;
