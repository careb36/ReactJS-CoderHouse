import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { Product } from '../types';
import { getProducts, getProductsByCategory } from '../data/mockData';
import ItemList from '../components/ItemList';
// Importo el icono de loading desde Tabler Icons
import { IconLoader } from '@tabler/icons-react';

// Defino las props que recibe este componente contenedor
interface ItemListContainerProps {
  greeting: string;
}

// Este es el componente contenedor que maneja la lógica de estado para la lista de productos
// Es un "container component" que se encarga de hacer el fetch de datos y pasarlos al componente presentacional
const ItemListContainer: React.FC<ItemListContainerProps> = ({ greeting }) => {
  // Obtengo el categoryId de la URL usando useParams para filtrar productos por categoría
  const { categoryId } = useParams<{ categoryId?: string }>();

  // Estado para almacenar la lista de productos que voy a mostrar
  const [products, setProducts] = useState<Product[]>([]);
  // Estado para mostrar el loading mientras cargo los productos
  const [loading, setLoading] = useState(true);
  // Estado para manejar errores si algo sale mal al cargar los productos
  const [error, setError] = useState<string | null>(null);

  // useEffect para cargar los productos cuando cambia la categoría
  // El array de dependencias incluye categoryId para que se recargue cuando cambie la URL
  useEffect(() => {
    // Función async para hacer el fetch de productos
    const fetchProducts = async () => {
      try {
        // Pongo loading en true y limpio errores anteriores
        setLoading(true);
        setError(null);

        // Declaro la variable para los productos que voy a buscar
        let fetchedProducts: Product[];
        // Si hay categoryId, filtro por categoría, sino traigo todos los productos
        if (categoryId) {
          fetchedProducts = await getProductsByCategory(categoryId);
        } else {
          fetchedProducts = await getProducts();
        }

        // Actualizo el estado con los productos obtenidos
        setProducts(fetchedProducts);
      } catch (err) {
        // Si hay error, lo guardo en el estado para mostrarlo al usuario
        setError('Error al cargar los productos. Por favor, intenta nuevamente.');
        // También lo logueo en consola para debugging
        console.error('Error fetching products:', err);
      } finally {
        // Siempre pongo loading en false cuando termina, haya error o no
        setLoading(false);
      }
    };

    // Llamo a la función para cargar los productos
    fetchProducts();
  }, [categoryId]); // Dependencia: se ejecuta cuando cambia categoryId

  // Si está cargando, muestro el estado de loading con el saludo
  if (loading) {
    return (
      <div className="item-list-container">
        <h2>{greeting}</h2>
        <div className="loading">
          <p><IconLoader size={20} className="spinning" /> Cargando productos...</p>
        </div>
      </div>
    );
  }

  // Si hay error, muestro el mensaje de error con opción de reintentar
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

  // Si todo está bien, renderizo la lista de productos
  return (
    <div className="item-list-container">
      <h2>{greeting}</h2>
      <ItemList products={products} />
    </div>
  );
};

export default ItemListContainer;
