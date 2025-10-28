import { useContext } from "react"
import cartContext from "../../context/cartContext"
import { Link } from "react-router-dom"
import { FaShoppingCart } from "react-icons/fa"

/**
 * CartWidget - Displays shopping cart icon with product count badge.
 * Shows badge only when cart has items.
 * 
 * @returns {JSX.Element} Cart icon with dynamic badge
 */
function CartWidget(){
  const { totalUnits } = useContext(cartContext)
  
  return (
    <Link 
      to="/cart" 
      className="nav-icon-btn nav-cart-widget" 
      aria-label={`Ver carrito - ${totalUnits} ${totalUnits === 1 ? 'producto' : 'productos'}`}
      title="Ir al carrito"
    >
      <FaShoppingCart className="nav-cart-icon" aria-hidden="true" />
      {totalUnits > 0 && (
        <span className="nav-icon-badge" aria-label={`${totalUnits} productos en el carrito`}>
          {totalUnits}
        </span>
      )}
    </Link>
  )
}

export default CartWidget
