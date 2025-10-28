import { Link, NavLink } from 'react-router-dom'
import { FaUser, FaCoffee, FaHeart } from 'react-icons/fa'
import CartWidget from './CartWidget'
import './NavBar.css'
import { useCurrency } from '../../context/currencyContext'
import SearchBar from './SearchBar'
import { useWishlist } from '../../hooks/useWishlist'

/**
 * NavBar - Main navigation component for the coffee e-commerce.
 * Features: category links, search, favorites, currency selector, and cart widget.
 * Uses sticky positioning and glassmorphism effect for professional appearance.
 * 
 * @returns {JSX.Element} Navigation bar with all interactive elements
 */
function NavBar(){
  const { currency, setCurrency } = useCurrency()
  const { list } = useWishlist()

  return (
    <nav className="nav-menu" role="navigation" aria-label="Menú principal">
      <div className="nav-container">
        <Link to="/" className="nav-brand" aria-label="Ir al inicio - Café Especialidad">
          <FaCoffee className="nav-brand__icon" aria-hidden="true" />
          <span className="nav-brand__text">Café Especialidad</span>
        </Link>

        <ul className="nav-links" role="menubar">
          <li role="none">
            <NavLink 
              to="/category/grano" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              role="menuitem"
            >
              Café en Grano
            </NavLink>
          </li>
          <li role="none">
            <NavLink 
              to="/category/molido" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              role="menuitem"
            >
              Molido
            </NavLink>
          </li>
          <li role="none">
            <NavLink 
              to="/category/capsulas" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              role="menuitem"
            >
              Cápsulas
            </NavLink>
          </li>
          <li role="none">
            <NavLink 
              to="/category/accesorios" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              role="menuitem"
            >
              Accesorios
            </NavLink>
          </li>
        </ul>

        <div className="nav-actions">
          <SearchBar />
          
          <Link to="/favorites" className="nav-icon-btn" aria-label="Ver favoritos" title="Favoritos">
            <FaHeart aria-hidden="true" />
            {list?.length > 0 && (
              <span className="nav-icon-badge" aria-label={`${list.length} productos favoritos`}>
                {list.length}
              </span>
            )}
          </Link>

          <button className="nav-icon-btn" aria-label="Mi cuenta" title="Mi cuenta">
            <FaUser aria-hidden="true" />
          </button>

          <select
            className="nav-currency"
            aria-label="Seleccionar moneda"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            title="Cambiar moneda"
          >
            <option value="UYU">$ UYU</option>
            <option value="USD">$ USD</option>
          </select>

          <CartWidget />
        </div>
      </div>
    </nav>
  )
}

export default NavBar
