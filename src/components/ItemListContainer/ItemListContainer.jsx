import Item from '../Item/Item';
import getMockAPIData, { getProductsByCateg } from '../../data/mockAPI';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import './ItemListContainer.css';

export default function ItemListContainer( props ){
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const { categParam } = useParams();

  useEffect( () => {
    setIsLoading(true)
    
    if (categParam){
      getProductsByCateg(categParam)
      .then( productsByCateg => setProducts(productsByCateg))
      .catch( error => alert(error))
      .finally( () => setIsLoading(false))
    }
    else {    
      getMockAPIData()
      .then( (productList) => {
          console.log("Promesa terminada")
          setProducts(productList);
      })
      .catch( (error) => {
          console.log("Error solicitando los datos", error);
          alert("Algo salió mal buscando los productos")
      } )
      .finally( () => { 
          console.log("Esto se ejecuta siempre")
          setIsLoading(false)
      })
    }     
     
  }, [ categParam ])


  return (
    <div className="item-list-container" >
        <h2>{props.greeting}</h2>
        { isLoading 
          ? <p className="item-list-container__loading">Cargando...</p> 
          : ""
        }
        <div>
        <h4>Nuestros productos</h4>   
        <div  className="item-list">
        {
          products.map(item =>  <Item key={item.id} {...item} /> )
        }     
        </div>
      </div>
    </div>
  )
}

