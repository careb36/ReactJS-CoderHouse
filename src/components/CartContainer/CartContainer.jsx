import { useContext, useMemo, useState } from "react"
import cartContext from "../../context/cartContext"
import { createOrder } from "../../firebase/api";
import CheckoutForm from "./CheckoutForm.jsx";
import { Link } from "react-router-dom";
import { useCurrency } from "../../context/currencyContext";
import { FaTrash } from "react-icons/fa";
import './CartContainer.css'
import { getCouponDiscountPercent } from '../../config/shop'

function CartContainer(){
  const { cart, clear, removeItem, incrementItem, decrementItem } = useContext(cartContext);
  const { currency, convert, format } = useCurrency()
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)

  const subtotal = useMemo(() => {
    return cart.reduce((acc, it) => acc + convert(it.price) * (it.count ?? 1), 0)
  }, [cart, convert])

  const discountPercent = useMemo(() => getCouponDiscountPercent(couponApplied ? coupon : ''), [couponApplied, coupon])

  const discount = useMemo(() => {
    if (!couponApplied || discountPercent <= 0) return 0
    return subtotal * (discountPercent / 100)
  }, [couponApplied, subtotal, discountPercent])

  const total = useMemo(() => subtotal - discount, [subtotal, discount])

  function applyCoupon(){
    const code = String(coupon || '').trim().toUpperCase()
    const percent = getCouponDiscountPercent(code)
    if (percent > 0){
      setCouponApplied(true)
      setCoupon(code)
      alert(`Cupón aplicado: ${percent}% de descuento`)
    } else if (!code){
      setCouponApplied(false)
    } else {
      alert('Cupón inválido')
      setCouponApplied(false)
    }
  }

  async function handleCheckout(formData){
    try{
      const order = {
        buyer: { name: formData.username, email: formData.mail, phone: formData.phone },
        items: cart.map(i => ({ id: i.id, title: i.title, price: i.price, count: i.count })),
        total: Number(total.toFixed(2)),
        currency,
        coupon: couponApplied ? coupon : undefined,
        discount: Number(discount.toFixed(2))
      }
      const { id } = await createOrder(order.buyer, order.items, order.total)
      clear();
      alert(`¡Compra realizada! ID de la orden: ${id}`)
    }catch(e){
      console.error('Error en checkout:', e)
      alert(`No se pudo completar la compra: ${e.message ?? e}`)
    }
  }

  if ( cart.length === 0 ){
    return (
    <div className="cart cart--empty">
      <h2>Carrito vacío</h2>
      <Link to="/"><button>Ir al catálogo</button></Link>
    </div>
    )
  }
  

  return(
    <section className="cart">
      <div>
        <div className="cart__header">
          <h2>Tu carrito de compras</h2>
          <div className="cart__buttons">
            <button onClick={clear}>Vaciar carrito</button>
            <Link to="/"><button>Seguir comprando</button></Link>
          </div>
        </div>
        <div className="cart__items">
          {
            cart.map( itemInCart => (
              <div className="cart-item" key={itemInCart.id}>
                <div className="cart-item__info">
                  {itemInCart.imgURL && (
                    <img className="cart-item__thumb" src={itemInCart.imgURL} alt={itemInCart.title} onError={(e) => { e.currentTarget.style.display='none' }} />
                  )}
                  <div>
                    <h4>{itemInCart.title}</h4>
                    <p className="cart-item__meta">Precio: {format(convert(itemInCart.price))}</p>
                    <div className="cart-item__qty">
                      <button aria-label="Disminuir" onClick={() => decrementItem(itemInCart.id)}>-</button>
                      <span aria-live="polite">{itemInCart.count}</span>
                      <button aria-label="Aumentar" onClick={() => incrementItem(itemInCart.id)}>+</button>
                    </div>
                    <p><strong>Subtotal: {format(convert(itemInCart.price) * (itemInCart.count ?? 1))}</strong></p>
                  </div>
                </div>
                <div className="cart-item__actions">
                  <button onClick={ () => removeItem(itemInCart.id) } aria-label="Eliminar item">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <aside className="cart__summary">
        <h3>Resumen de compra</h3>
        <div className="cart__summary-line"><span>Items</span><span>{cart.reduce((a,i)=>a+(i.count??0),0)}</span></div>
        <div className="cart__summary-line"><span>Subtotal</span><span>{format(subtotal)}</span></div>
        {couponApplied && (<div className="cart__summary-line"><span>Descuento ({discountPercent}%)</span><span>-{format(discount)}</span></div>)}
        <div className="cart__summary-line"><span>Total</span><span>{format(total)}</span></div>
        <div className="cart__summary-line" style={{ gap: 8 }}>
          <input placeholder="Cupón (COFFEE10, BIENVENIDA5)" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
          <button onClick={applyCoupon}>Aplicar</button>
        </div>
        <CheckoutForm handleCheckout={handleCheckout} />
      </aside>
    </section>
  )
}

export default CartContainer