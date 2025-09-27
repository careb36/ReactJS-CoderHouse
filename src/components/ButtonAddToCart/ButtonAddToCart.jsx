// * Estado de componentes
import { useState } from "react";

export default function ButtonAddToCart(  ){
  //let statusInCart = "No agregaste este item al carrito."
  let [statusInCart, setStatusInCart] = useState("No agregaste este item al carrito.")
  
  function handleClick(){
    alert("Gracias por agregarme al carrito")
    // MAL 👇
    //statusInCart = "Item agregado al carrito!🙂" 
    setStatusInCart("Item agregado al carrito!🙂")
  }

  return (
    <div className="button-cart">
      {/* Pasamos como event handle SOLO EL NOMBRE de la funcion */}
      <button onClick={ handleClick } > Agregar al carrito</button>
      <br/>
      <small> {statusInCart} </small>
    </div>
  )
}
