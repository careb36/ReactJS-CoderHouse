import { useState } from 'react'

export default function ItemCount({ stock = 0, initial = 1, onAdd }){
  const [count, setCount] = useState(initial)

  function inc(){ setCount(c => Math.min(c + 1, stock)) }
  function dec(){ setCount(c => Math.max(c - 1, 1)) }

  const disabled = stock <= 0

  return (
    <div style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
      <button aria-label="Disminuir" onClick={dec} disabled={disabled || count <= 1}>-</button>
      <span aria-live="polite">{count}</span>
      <button aria-label="Aumentar" onClick={inc} disabled={disabled || count >= stock}>+</button>
      <button onClick={() => onAdd?.(count)} disabled={disabled}>
        Agregar al Carrito
      </button>
      {disabled && <small style={{ marginLeft: 8 }}>Sin stock</small>}
    </div>
  )
}
