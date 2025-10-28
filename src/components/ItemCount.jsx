import { useState } from 'react'
import './ItemCount.css'

/**
 * ItemCount - Quantity selector component with stock validation.
 * Features increment/decrement buttons and "Add to Cart" action.
 * Validates minimum (1) and maximum (stock) values.
 * 
 * @param {Object} props
 * @param {number} props.stock - Maximum available quantity
 * @param {number} props.initial - Initial count value (default: 1)
 * @param {Function} props.onAdd - Callback when adding to cart
 * @returns {JSX.Element} Quantity selector with controls
 */
export default function ItemCount({ stock = 0, initial = 1, onAdd }){
  const [count, setCount] = useState(initial)

  function inc(){ setCount(c => Math.min(c + 1, stock)) }
  function dec(){ setCount(c => Math.max(c - 1, 1)) }

  const disabled = stock <= 0

  return (
    <div className="item-count">
      <button className="item-count__btn" aria-label="Disminuir" onClick={dec} disabled={disabled || count <= 1}>-</button>
      <span className="item-count__value" aria-live="polite">{count}</span>
      <button className="item-count__btn" aria-label="Aumentar" onClick={inc} disabled={disabled || count >= stock}>+</button>
      <button className="item-count__add" onClick={() => onAdd?.(count)} disabled={disabled}>
        Agregar al Carrito
      </button>
      {disabled && <small className="item-count__hint">Sin stock</small>}
    </div>
  )
}
