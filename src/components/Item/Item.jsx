import { useState, useContext, useMemo } from "react";
import './Item.css';
import { Link } from "react-router-dom";
import { FaShoppingCart, FaEye } from 'react-icons/fa';
import { useCurrency } from '../../context/currencyContext'
import { useProductImage } from '../../hooks/useProductImage'
import cartContext from '../../context/cartContext'
import { useWishlist } from '../../hooks/useWishlist'

function Item( props ) {
  const [isAdded, setIsAdded] = useState(false)
  const { format, convert } = useCurrency()
  const { url } = useProductImage(props)
  const { addItem } = useContext(cartContext)
  const { isFavorite, toggle } = useWishlist()

  // Memoize expensive calculations
  const { convertedPrice, hasStock } = useMemo(() => ({
    convertedPrice: convert(props.price),
    hasStock: (props.stock ?? 0) > 0
  }), [props.price, props.stock, convert])

  const disabled = !hasStock

  function agregarAlCarrito(){
    if (disabled) return
    const payload = { id: props.id, title: props.title, price: props.price, stock: props.stock, imgURL: props.imgURL }
    addItem(payload, 1)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }
  
  return (
    <div className="item-card">
      <div className="item-card__image-wrapper">
        <img
          className="item-card__image"
          loading="lazy"
          src={url}
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/placeholder.svg' }}
          alt={props.title}
        />
        {disabled && <div className="item-card__badge item-card__badge--out">Sin Stock</div>}
        {isAdded && <div className="item-card__badge item-card__badge--added">¡Agregado!</div>}
        <button
          type="button"
          className={`item-card__fav ${isFavorite(props.id) ? 'is-active' : ''}`}
          aria-pressed={isFavorite(props.id)}
          aria-label={isFavorite(props.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          onClick={() => toggle(props.id)}
          title={isFavorite(props.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <span aria-hidden="true">♥</span>
        </button>
      </div>

      <div className="item-card__content">
        <h3 className="item-card__title">{props.title}</h3>
        <p className="item-card__description">{props.description}</p>
        <p className="item-card__price">{format(convertedPrice)}</p>
      </div>

      <div className="item-card__actions">
        <Link to={`/item/${props.id}`} className="btn-item btn-item--secondary">
          <FaEye /> Ver Detalle
        </Link>
        <button
          className="btn-item btn-item--primary"
          onClick={agregarAlCarrito}
          disabled={disabled}
        >
          <FaShoppingCart /> {disabled ? 'Agotado' : 'Agregar'}
        </button>
      </div>

    </div>
  )
}

export default Item;