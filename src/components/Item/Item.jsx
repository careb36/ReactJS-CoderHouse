import { useState } from "react";
import './Item.css';
import { Link } from "react-router";
import { useCurrency } from '../../context/currencyContext'

function Item( props ) {
  const [state, setState] = useState("No agregado al carrito aún")
  const { format } = useCurrency()

 /*  useEffect(
    () =>{      
        console.log("Obteniendo datos de la Base de Datos/API...🗂️")
    }, 
    []
  )
 
  useEffect(() => {
    const botonDOM = document.getElementById("item-DOM")
    console.log(botonDOM)
  }, [])
   */

  function agregarAlCarrito(){
    alert("Agregaste correctamente al carrito!");   
    setState(`Item agregado al carrito a la hora: ${ new Date().toUTCString()}` )
  }
  
  return (
    <div className="item-card">
      <h3 className="item-card-title">{props.title}</h3>
       <img 
        className="item-card-img"
        height="250"
        src={props.imgURL}
        alt={props.title}
      /> 
      <h3 className="item-card-price">Precio: {format(props.price)}</h3>      
      <hr/>
      <p className="item-card-content">{props.description}</p>
      <div className="item-card-buttons">
        
      <Link to={`/item/${props.id}`}>
        <button>
          Ver Detalle
        </button>
      </Link>
      <button id="item-DOM" onClick={ agregarAlCarrito } >
        Agregar al carrito
      </button>
      </div>
      <br/>
      <small className="item-card-footer">{state}</small>

    </div>
  )
}

export default Item;