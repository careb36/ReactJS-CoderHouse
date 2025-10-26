import { Link } from "react-router"
import CartWidget from "./CartWidget"
import './NavBar.css';

import { useCurrency } from '../../context/currencyContext'

function NavBar(){
  const { currency, setCurrency } = useCurrency()
  return (
    <nav className="nav-menu">

        <Link to="/">
           <span className="nav-logo">Café Especialidad</span>
        </Link>

      <ul className="nav-links">
        <li>
         <Link to="/category/grano">Café en grano</Link>
        </li>
        <li>
         <Link to="/category/molido">Molido</Link>
        </li>
        <li>
         <Link to="/category/capsulas">Cápsulas</Link>
        </li>
        <li>
         <Link to="/category/accesorios">Accesorios</Link>
        </li>        
      </ul>
      <div style={{ display:'inline-flex', gap: 8, alignItems: 'center' }}>
        <label>
          Moneda:
          <select aria-label="Seleccionar moneda" value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="UYU">UYU</option>
            <option value="USD">USD</option>
          </select>
        </label>
        <span><CartWidget/></span>
      </div>
    </nav>
  )
}

export default NavBar