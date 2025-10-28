import { useState } from "react";

/**
 * ButtonAddToCart - Legacy demo component showing React state management.
 * Note: This component is not used in the current cart implementation.
 * The actual cart functionality is handled by CartContext.
 * 
 * @deprecated Use Item component with CartContext instead
 */
export default function ButtonAddToCart(){
  const [statusInCart, setStatusInCart] = useState("No agregaste este item al carrito.")
  
  function handleClick(){
    alert("Gracias por agregarme al carrito")
    setStatusInCart("Item agregado al carrito!🙂")
  }

  return (
    <div className="button-cart">
      <button onClick={handleClick}>Agregar al carrito</button>
      <br/>
      <small>{statusInCart}</small>
    </div>
  )
}
