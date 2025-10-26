import Item from '../Item/Item';
import { getProducts, getProductByCategory  } from '../../firebase/api';

import { useEffect, useState } from 'react';
import './ItemListContainer.css'
import { useParams } from 'react-router';
function ItemListContainer( props ){  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categParam, categoryId } = useParams();
  const category = categParam ?? categoryId;

  useEffect( () =>{
    setLoading(true);
    setError(null);
    const promesaDatos = category ? getProductByCategory(category) : getProducts();
    promesaDatos
      .then( (respuesta) => setProducts(respuesta))
      .catch( (e) => setError(e.message || 'Error cargando productos'))
      .finally(() => setLoading(false));
  }, [category])
  
  return (
    <section className="item-list-container">
      <h2>{props.greeting}</h2>
      <div>
        { loading && <p className="item-list-container__loading">Cargando productos...</p> }
        { error && <p role="alert">{error}</p> }
        { !loading && !error && products.length === 0 && <p>No hay productos disponibles</p> }

        { !loading && !error && products.length > 0 && (
          <div>
            <h4>Nuestros productos</h4>   
            <div className="item-list">
              { products.map(item =>  <Item {...item} key={item.id}  /> )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ItemListContainer;