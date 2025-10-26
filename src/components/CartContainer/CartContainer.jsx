import { useContext, useMemo } from "react"
import cartContext from "../../context/cartContext"
import { createOrder } from "../../firebase/api";
import FormCheckout from "./FormCheckout";
import { Link } from "react-router";
import { useCurrency } from "../../context/currencyContext";

function CartContainer(){
  const { cart, clearCart, removeItem } = useContext(cartContext); 
  const { currency, convert, format } = useCurrency()

  const total = useMemo(() => {
    return cart.reduce((acc, it) => acc + convert(it.price) * (it.count ?? 1), 0)
  }, [cart, convert])

  async function handleCheckout(formData){
    try{
      const order = {
        buyer: { name: formData.username, email: formData.mail, phone: formData.phone },
        items: cart.map(i => ({ id: i.id, title: i.title, price: i.price, count: i.count })),
        total: Number(total.toFixed(2)),
        currency
      }
      const { id } = await createOrder(order.buyer, order.items, order.total)
      clearCart();
      alert(`¡Compra realizada! ID de la orden: ${id}`)
    }catch(e){
      alert(`No se pudo completar la compra: ${e.message ?? e}`)
    }
  }

  // renderizado condicional
  if ( cart.length === 0 ){
    return (
    <div>
      <h2>Carrito vacío</h2>
      <Link to="/"><button>Ir al catálogo</button></Link>
    </div>
    )
  }
  

  return(
    <section>
      <h2>Tu carrito de compras</h2>
      <div>
        <ul>
          {
            cart.map( itemInCart => <div key={itemInCart.id}>
              <h4>{itemInCart.title}</h4>
              <p>Precio: {format(convert(itemInCart.price))}</p>
              <p>Cantidad: {itemInCart.count} </p>
              <p>Subtotal: {format(convert(itemInCart.price) * (itemInCart.count ?? 1))}</p>
              <button onClick={ () => removeItem(itemInCart.id) }>🗑️</button>
            </div>)
          }
        </ul>
        <button onClick={clearCart}>Vaciar carrito</button>
      </div>
      <hr/>
      <div>
        <h3>Total de tu Compra: {format(total)}</h3>
        <p><small>Moneda: {currency}</small></p>
      </div>
      <div>
        <FormCheckout handleCheckout={handleCheckout} />
      </div>
    </section>
  )
}

export default CartContainer