
import { Link } from "react-router";
import CartWidget from "./CartWidget"
import './NavBar.css';

function NavBar() {
  return (
    <nav className="nav-menu">
      <Link to="/">
        <span className="nav-logo">☕ Caro Coffee</span>
      </Link>
      <ul className="nav-links">
        <li>
          <Link to="/category/cafes-especialidad">Caf�s Especialidad</Link>
        </li>
        <li>
           <Link to="/category/equipos">Equipos</Link>
        </li>
        <li>
          <Link to="/category/accesorios">Accesorios</Link>
        </li>   
         <li>
          <Link to="/category/suscripciones">Suscripciones</Link>
        </li>      
      </ul>
      <Link to="/cart">
       <span><CartWidget /></span>
      </Link>
    </nav>
  )
}

export default NavBar



