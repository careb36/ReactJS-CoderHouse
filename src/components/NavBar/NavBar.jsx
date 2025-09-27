
import { Link } from "react-router";
import CartWidget from "./CartWidget"
import './NavBar.css';

function NavBar() {
  return (
    <nav className="nav-menu">
      <Link to="/">
        <span className="nav-logo">miTienda</span>
      </Link>
      <ul className="nav-links">
        <li>
          <Link to="/category/accessories">
          Accesorios
          </Link>
        </li>
        <li>
           <Link to="/category/home">
            Hogar
          </Link>
        </li>
        <li>
          <Link to="/category/clothing">
            Vestimenta
          </Link>
        </li>   
         <li>
          <Link to="/category/asd">
            Zapatillas
          </Link>
        </li>      
      </ul>
      <Link to="/cart">
       <span><CartWidget /></span>
      </Link>
    </nav>
  )
}

export default NavBar