import ItemCount from "../ItemCount/ItemCount" 
import { useParams } from "react-router" 
import { getProductById } from "../../data/mockAPI";  
import { useEffect, useState } from "react";  
function ItemDetailContainer() {  
  const { idParam } =  useParams();  
  const [product,setProduct] = useState( { loading: true} );  
 
  useEffect( () = 
    getProductById(idParam)  
    .then( response = 
    .catch( error = 
  }, [])  
 
  const handleAddToCart = (quantity) = 
    alert(`Agregado ${quantity} unidades de ${product.title} al carrito`);  
  };  
 
  // If con early return 
  if ( product.loading ){ 
