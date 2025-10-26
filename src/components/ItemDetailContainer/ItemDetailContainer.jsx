import { useEffect, useState, useContext } from "react";
import { getProductById } from "../../firebase/api";
import { useParams, Link } from "react-router"
import './ItemDetailContainer.css';
import cartContext from "../../context/cartContext";
import ItemCount from "../ItemCount";
import { useCurrency } from "../../context/currencyContext";

export default function ItemDetailContainer() {
  const { idParam, id } = useParams();  
  const [ item, setItem] = useState(null)
  const [added, setAdded] = useState(false)
  const { addToCart } = useContext(cartContext)
  const { currency, format } = useCurrency()

  useEffect( () => {
      const productId = idParam ?? id
      if (!productId) return
      getProductById(productId).then( res => setItem(res)); 
  }, [idParam, id])

  function onAdd(count){
    if (!item) return
    addToCart(item, count)
    setAdded(true)
  }

  return (
     <div className="item-detail">      
     {
      item 
      ?  <div>
        <h2 className="item-detail-title">{item.title}</h2>

        <div className="item-detail-content">
          <img  
            className="item-detail-img"            
            src={item.imgURL}
            alt={item.title}
            /> 
            <div>
              <p className="item-detail-description">{item.description}</p>
              <h3 className="item-detail-price">Precio: {format(item.price)}</h3>
              {added 
                ? <Link to="/cart"><button>Ir al Carrito</button></Link>
                : <ItemCount stock={item.stock ?? 0} initial={1} onAdd={onAdd} />
              }
            </div>            
        </div>
        </div>
      :
      <p>Cargando producto...</p>
     
      }
      </div>
  )
}