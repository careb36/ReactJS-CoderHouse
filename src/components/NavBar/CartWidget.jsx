import { useContext } from "react"
import cartContext from "../../context/cartContext"
import { Link } from "react-router"

function CartWidget(){
  const { countItems } = useContext(cartContext)
  return (
    <Link to="/cart">
      <i>🛒 <span> { countItems() } </span> </i>
    </Link>
  )
}

export default CartWidget




